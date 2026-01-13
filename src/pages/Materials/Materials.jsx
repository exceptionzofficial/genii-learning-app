import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Grid, List, Loader2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PDFCard from '../../components/PDFCard/PDFCard';
import { contentAPI } from '../../services/api';
import { SUBJECTS, CLASSES } from '../../data/mockData';
import './Materials.css';

function Materials() {
    const { selectedClass, setSelectedClass, selectedBoard } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch materials from API
    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await contentAPI.getPDFs(selectedClass, selectedBoard);

                if (response.success) {
                    setMaterials(response.data);
                } else {
                    setError(response.message || 'Failed to fetch materials');
                }
            } catch (err) {
                console.error('Error fetching materials:', err);
                setError('Failed to load materials. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchMaterials();
    }, [selectedClass, selectedBoard]);

    const subjects = SUBJECTS[selectedClass] || [];

    const filteredMaterials = useMemo(() => {
        return materials.filter(pdf => {
            const matchesSearch = pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (pdf.description || '').toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSubject = selectedSubject === 'all' || pdf.subject === selectedSubject;
            return matchesSearch && matchesSubject;
        });
    }, [materials, searchQuery, selectedSubject]);

    // Transform API data to match PDFCard expected format
    const transformedMaterials = filteredMaterials.map(pdf => ({
        id: pdf._id,
        title: pdf.title,
        description: pdf.description || `${pdf.chapters || 0} chapters, ${pdf.pages || 0} pages`,
        subject: pdf.subject,
        thumbnail: pdf.thumbnailUrl || '/images/pdf-thumbnail.png',
        chapters: pdf.chapters || 0,
        pages: pdf.pages || 0,
        previewPages: pdf.previewPages || 5,
        fileUrl: pdf.fileUrl,
        classId: pdf.classId,
        board: pdf.board
    }));

    return (
        <div className="materials-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <h1 className="hero-title">Study Materials</h1>
                    <p className="page-description">
                        Browse our collection of comprehensive PDFs. Preview the first 5 pages before purchase.
                    </p>
                </div>
            </div>

            <div className="container materials-container">
                {/* Filters Section */}
                <div className="filters-section">
                    {/* Class Tabs */}
                    <div className="class-tabs">
                        {CLASSES.map((cls) => (
                            <button
                                key={cls.id}
                                className={`class-tab ${selectedClass === cls.id ? 'class-tab-active' : ''}`}
                                onClick={() => {
                                    setSelectedClass(cls.id);
                                    setSelectedSubject('all');
                                }}
                            >
                                {cls.name}
                            </button>
                        ))}
                    </div>

                    {/* Search and Filters */}
                    <div className="filters-row">
                        {/* Search */}
                        <div className="search-box">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search materials..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        {/* Subject Filter */}
                        <div className="subject-filter">
                            <Filter size={16} className="filter-icon" />
                            <select
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Subjects</option>
                                {subjects.map((subject) => (
                                    <option key={subject} value={subject}>{subject}</option>
                                ))}
                            </select>
                        </div>

                        {/* View Toggle */}
                        <div className="view-toggle">
                            <button
                                className={`view-btn ${viewMode === 'grid' ? 'view-btn-active' : ''}`}
                                onClick={() => setViewMode('grid')}
                                aria-label="Grid view"
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                className={`view-btn ${viewMode === 'list' ? 'view-btn-active' : ''}`}
                                onClick={() => setViewMode('list')}
                                aria-label="List view"
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Info */}
                <div className="results-info">
                    <span>Showing {transformedMaterials.length} materials for {CLASSES.find(c => c.id === selectedClass)?.name}</span>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="loading-state">
                        <Loader2 size={40} className="spin" />
                        <p>Loading materials...</p>
                    </div>
                ) : error ? (
                    <div className="error-state">
                        <AlertCircle size={40} />
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Try Again</button>
                    </div>
                ) : transformedMaterials.length > 0 ? (
                    <div className={`materials-grid ${viewMode === 'list' ? 'materials-list' : ''}`}>
                        {transformedMaterials.map((pdf) => (
                            <PDFCard key={pdf.id} pdf={pdf} />
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <p>No materials found matching your criteria.</p>
                    </div>
                )}
            </div>

            <style>{`
                .loading-state, .error-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 60px 20px;
                    text-align: center;
                    color: var(--text-secondary);
                }

                .loading-state .spin {
                    animation: spin 1s linear infinite;
                    color: var(--primary-500);
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .error-state {
                    color: #e74c3c;
                }

                .error-state button {
                    margin-top: 16px;
                    padding: 10px 24px;
                    background: var(--primary-500);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}

export default Materials;
