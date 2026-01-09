import { useState, useMemo } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PDFCard from '../../components/PDFCard/PDFCard';
import { PDF_MATERIALS, SUBJECTS, CLASSES } from '../../data/mockData';
import './Materials.css';

function Materials() {
    const { selectedClass, setSelectedClass } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [viewMode, setViewMode] = useState('grid');

    const materials = PDF_MATERIALS[selectedClass] || [];
    const subjects = SUBJECTS[selectedClass] || [];

    const filteredMaterials = useMemo(() => {
        return materials.filter(pdf => {
            const matchesSearch = pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pdf.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSubject = selectedSubject === 'all' || pdf.subject === selectedSubject;
            return matchesSearch && matchesSubject;
        });
    }, [materials, searchQuery, selectedSubject]);

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
                    <span>Showing {filteredMaterials.length} materials for {CLASSES.find(c => c.id === selectedClass)?.name}</span>
                </div>

                {/* Materials Grid */}
                {filteredMaterials.length > 0 ? (
                    <div className={`materials-grid ${viewMode === 'list' ? 'materials-list' : ''}`}>
                        {filteredMaterials.map((pdf) => (
                            <PDFCard key={pdf.id} pdf={pdf} />
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <p>No materials found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Materials;
