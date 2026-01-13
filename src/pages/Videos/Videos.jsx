import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Loader2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import VideoCard from '../../components/VideoCard/VideoCard';
import { contentAPI } from '../../services/api';
import { SUBJECTS, CLASSES } from '../../data/mockData';
import './Videos.css';

function Videos() {
    const { selectedClass, setSelectedClass, selectedBoard } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch videos from API
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await contentAPI.getVideos(selectedClass, selectedBoard);

                if (response.success) {
                    setVideos(response.data);
                } else {
                    setError(response.message || 'Failed to fetch videos');
                }
            } catch (err) {
                console.error('Error fetching videos:', err);
                setError('Failed to load videos. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [selectedClass, selectedBoard]);

    const subjects = SUBJECTS[selectedClass] || [];

    const filteredVideos = useMemo(() => {
        return videos.filter(video => {
            const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (video.description || '').toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSubject = selectedSubject === 'all' || video.subject === selectedSubject;
            return matchesSearch && matchesSubject;
        });
    }, [videos, searchQuery, selectedSubject]);

    // Transform API data to match VideoCard expected format
    const transformedVideos = filteredVideos.map(video => ({
        id: video._id,
        title: video.title,
        description: video.description || `${video.lessons || 0} lessons`,
        subject: video.subject,
        thumbnail: video.thumbnailUrl || '/images/video-thumbnail.png',
        lessons: video.lessons || 0,
        duration: video.duration || 'N/A',
        instructor: 'Genii Books',
        fileUrl: video.fileUrl,
        classId: video.classId,
        board: video.board
    }));

    return (
        <div className="videos-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <h1 className="hero-title">Video Courses</h1>
                    <p className="page-description">
                        Learn from experienced teachers with our high-quality video content
                    </p>
                </div>
            </div>

            <div className="container videos-container">
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
                                placeholder="Search courses..."
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
                    </div>
                </div>

                {/* Results Info */}
                <div className="results-info">
                    <span>Showing {transformedVideos.length} courses for {CLASSES.find(c => c.id === selectedClass)?.name}</span>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="loading-state">
                        <Loader2 size={40} className="spin" />
                        <p>Loading videos...</p>
                    </div>
                ) : error ? (
                    <div className="error-state">
                        <AlertCircle size={40} />
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Try Again</button>
                    </div>
                ) : transformedVideos.length > 0 ? (
                    <div className="videos-grid">
                        {transformedVideos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <p>No courses found matching your criteria.</p>
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

export default Videos;
