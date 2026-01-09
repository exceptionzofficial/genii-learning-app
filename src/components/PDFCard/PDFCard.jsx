import { FileText, Eye, BookOpen, ShoppingCart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './PDFCard.css';

function PDFCard({ pdf, showBuyButton = true }) {
    const { openPDFPreview, openRegistrationModal, isItemPurchased, isClassPackagePurchased, selectedClass } = useApp();

    const isPurchased = isItemPurchased(pdf.id) || isClassPackagePurchased(selectedClass, 'pdfs');

    const handlePreview = () => {
        openPDFPreview(pdf);
    };

    const handleBuy = () => {
        openRegistrationModal({
            id: pdf.id,
            name: pdf.title,
            type: 'single-pdf',
            price: 199, // Individual PDF price (placeholder)
        });
    };

    return (
        <div className="pdf-card">
            {/* Thumbnail */}
            <div className="pdf-thumbnail">
                <img src={pdf.thumbnail} alt={pdf.title} />
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
                        {isPurchased ? (
                            <button className="btn btn-secondary btn-sm">
                                <FileText size={16} />
                                <span>Download</span>
                            </button>
                        ) : (
                            <button className="btn btn-primary btn-sm" onClick={handleBuy}>
                                <ShoppingCart size={16} />
                                <span>Buy Now</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PDFCard;
