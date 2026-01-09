import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import VideoCard from '../../components/VideoCard/VideoCard';
import { VIDEO_COURSES, SUBJECTS, CLASSES } from '../../data/mockData';
import './Videos.css';

function Videos() {
    const { selectedClass, setSelectedClass } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('all');

    const videos = VIDEO_COURSES[selectedClass] || [];
    const subjects = SUBJECTS[selectedClass] || [];

    const filteredVideos = useMemo(() => {
        return videos.filter(video => {
            const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                video.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSubject = selectedSubject === 'all' || video.subject === selectedSubject;
            return matchesSearch && matchesSubject;
        });
    }, [videos, searchQuery, selectedSubject]);

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
                    <span>Showing {filteredVideos.length} courses for {CLASSES.find(c => c.id === selectedClass)?.name}</span>
                </div>

                {/* Videos Grid */}
                {filteredVideos.length > 0 ? (
                    <div className="videos-grid">
                        {filteredVideos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <p>No courses found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Videos;
