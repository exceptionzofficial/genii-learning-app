import { FileText, Eye, BookOpen, ShoppingCart, Download, IndianRupee } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './PDFCard.css';

function PDFCard({ pdf, showBuyButton = true }) {
    const {
        openPDFPreview,
        openLoginModal,
        openCheckoutModal,
        isItemPurchased,
        isAuthenticated
    } = useApp();

    // Get price from content or use default
    const pdfPrice = pdf.price !== undefined ? pdf.price : 199;

    const isPurchased = isItemPurchased(pdf.id || pdf.contentId);

    const handlePreview = () => {
        openPDFPreview(pdf);
    };

    const handleBuy = () => {
        if (isAuthenticated) {
            // User is logged in - proceed to checkout with actual price
            openCheckoutModal({
                id: pdf.id || pdf.contentId,
                name: pdf.title,
                type: 'single-pdf',
                price: pdfPrice,
            });
        } else {
            // User not logged in - open login modal
            openLoginModal();
        }
    };

    const handleDownload = () => {
        if (pdf.fileUrl) {
            // Open PDF in new tab or trigger download
            window.open(pdf.fileUrl, '_blank');
        } else {
            alert('PDF file is not available for download yet.');
        }
    };

    return (
        <div className="pdf-card">
            {/* Purchased Badge */}
            {isPurchased && (
                <div className="purchased-badge">
                    <span>✓ Purchased</span>
                </div>
            )}

            {/* Price/Free Badge */}
            {!isPurchased && (
                <div className={`price-badge ${pdf.isFree ? 'free' : ''}`}>
                    <span>{pdf.isFree ? 'FREE' : `₹${pdfPrice}`}</span>
                </div>
            )}

            {/* Thumbnail */}
            <div className="pdf-thumbnail">
                <img src={pdf.thumbnail || pdf.thumbnailUrl} alt={pdf.title} />
                <div className="pdf-overlay">
                    <button className="preview-btn" onClick={handlePreview}>
                        <Eye size={18} />
                        <span>Preview</span>
                    </button>
                </div>
                <span className="pdf-badge">{pdf.subject}</span>
            </div>

            {/* Content */}
            <div className="pdf-content">
                <h3 className="pdf-title">{pdf.title}</h3>
                <p className="pdf-description">{pdf.description}</p>

                <div className="pdf-meta">
                    <span className="pdf-meta-item">
                        <BookOpen size={14} />
                        <span>{pdf.chapters} Chapters</span>
                    </span>
                    <span className="pdf-meta-item">
                        <FileText size={14} />
                        <span>{pdf.pages} Pages</span>
                    </span>
                </div>

                {/* Actions */}
                {showBuyButton && (
                    <div className="pdf-actions">
                        {isPurchased || pdf.isFree ? (
                            <button className={`btn btn-sm ${pdf.isFree && !isPurchased ? 'btn-primary' : 'btn-success'}`} onClick={handleDownload}>
                                <Download size={16} />
                                <span>{pdf.isFree && !isPurchased ? 'Download Free PDF' : 'Download PDF'}</span>
                            </button>
                        ) : (
                            <button className="btn btn-primary btn-sm" onClick={handleBuy}>
                                <ShoppingCart size={16} />
                                <span>Buy ₹{pdfPrice}</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PDFCard;
