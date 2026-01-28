import { Play, Clock, BookOpen, Lock, CheckCircle, ShoppingCart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './VideoCard.css';

function VideoCard({ video, showUnlockButton = true }) {
    const {
        openVideoPreview,
        openLoginModal,
        openCheckoutModal,
        isItemPurchased,
        isAuthenticated
    } = useApp();

    // Get price from content or use default
    const videoPrice = video.price !== undefined ? video.price : 299;

    const isUnlocked = isItemPurchased(video.id || video.contentId);

    const handlePreview = () => {
        openVideoPreview(video);
    };

    const handleUnlock = () => {
        if (isAuthenticated) {
            // User is logged in - proceed to checkout with actual price
            openCheckoutModal({
                id: video.id || video.contentId,
                name: video.title,
                type: 'single-video',
                price: videoPrice,
            });
        } else {
            // User not logged in - open login modal
            openLoginModal();
        }
    };

    return (
        <div className="video-card">
            {/* Purchased Badge */}
            {isUnlocked && (
                <div className="purchased-badge">
                    <span>✓ Purchased</span>
                </div>
            )}

            {/* Price/Free Badge */}
            {!isUnlocked && (
                <div className={`price-badge ${video.isFree ? 'free' : ''}`}>
                    <span>{video.isFree ? 'FREE' : `₹${videoPrice}`}</span>
                </div>
            )}

            {/* Thumbnail */}
            <div className="video-thumbnail">
                <img src={video.thumbnail || video.thumbnailUrl} alt={video.title} />
                <div className="video-overlay">
                    <button className="play-btn" onClick={handlePreview}>
                        <Play size={24} fill="currentColor" />
                    </button>
                </div>
                <span className="video-duration">
                    <Clock size={12} />
                    <span>{video.duration}</span>
                </span>
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
                    <span className="video-instructor">By {video.instructor || 'Genii Books'}</span>
                </div>

                <p className="video-description">{video.description}</p>

                {/* Actions */}
                {showUnlockButton && (
                    <div className="video-actions">
                        {isUnlocked || video.isFree ? (
                            <button className={`btn btn-sm ${video.isFree && !isUnlocked ? 'btn-primary' : 'btn-success'}`} onClick={handlePreview}>
                                <Play size={16} />
                                <span>{video.isFree && !isUnlocked ? 'Watch Free' : 'Watch Now'}</span>
                            </button>
                        ) : (
                            <button className="btn btn-primary btn-sm" onClick={handleUnlock}>
                                <ShoppingCart size={16} />
                                <span>Buy ₹{videoPrice}</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideoCard;
