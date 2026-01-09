import { Play, Clock, BookOpen, Lock, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './VideoCard.css';

function VideoCard({ video, showUnlockButton = true }) {
    const { openVideoPreview, openRegistrationModal, isClassPackagePurchased, selectedClass } = useApp();

    const isUnlocked = isClassPackagePurchased(selectedClass, 'videos');

    const handlePreview = () => {
        openVideoPreview(video);
    };

    const handleUnlock = () => {
        openRegistrationModal({
            id: video.id,
            name: video.title,
            type: 'single-video',
            price: 299, // Individual video price (placeholder)
        });
    };

    return (
        <div className="video-card">
            {/* Thumbnail */}
            <div className="video-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
                <div className="video-overlay">
                    <button className="play-btn" onClick={handlePreview}>
                        <Play size={24} fill="currentColor" />
                    </button>
                </div>
                <span className="video-duration">
                    <Clock size={12} />
                    <span>{video.duration}</span>
                </span>
                {!isUnlocked && (
                    <div className="video-lock">
                        <Lock size={16} />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="video-content">
                <span className="video-subject">{video.subject}</span>
                <h3 className="video-title">{video.title}</h3>

                <div className="video-meta">
                    <span className="video-meta-item">
                        <BookOpen size={14} />
                        <span>{video.lessons} Lessons</span>
                    </span>
                    <span className="video-instructor">By {video.instructor}</span>
                </div>

                <p className="video-description">{video.description}</p>

                {/* Actions */}
                {showUnlockButton && (
                    <div className="video-actions">
                        {isUnlocked ? (
                            <button className="btn btn-secondary btn-sm" onClick={handlePreview}>
                                <CheckCircle size={16} />
                                <span>Watch Now</span>
                            </button>
                        ) : (
                            <button className="btn btn-primary btn-sm" onClick={handleUnlock}>
                                <Lock size={16} />
                                <span>Unlock Course</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideoCard;
