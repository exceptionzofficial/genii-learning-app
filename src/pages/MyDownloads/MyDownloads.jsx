import { Download, FileText, Calendar, Package } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLASSES } from '../../data/mockData';
import './MyDownloads.css';

function MyDownloads() {
    const { purchasedItems, isAuthenticated } = useApp();

    // Filter to only show PDF-related purchases
    const pdfPurchases = purchasedItems.filter(
        item => item.packageType === 'pdfs' || item.packageType === 'bundle' || item.type === 'single-pdf'
    );

    if (!isAuthenticated || purchasedItems.length === 0) {
        return (
            <div className="downloads-page">
                <div className="page-header">
                    <div className="container">
                        <h1 className="page-title">My Downloads</h1>
                        <p className="page-description">
                            Access your purchased materials here
                        </p>
                    </div>
                </div>

                <div className="container">
                    <div className="empty-state">
                        <div className="empty-icon">
                            <Package size={48} />
                        </div>
                        <h2>No Purchases Yet</h2>
                        <p>You haven't purchased any materials yet. Browse our collection and get started!</p>
                        <a href="/materials" className="btn btn-primary">
                            Browse Materials
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="downloads-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">My Downloads</h1>
                    <p className="page-description">
                        Access and download your purchased materials
                    </p>
                </div>
            </div>

            <div className="container downloads-container">
                {/* Purchase Summary */}
                <div className="purchase-summary">
                    <h2>Your Purchases</h2>
                    <p>You have access to {purchasedItems.length} item(s)</p>
                </div>

                {/* Downloads List */}
                <div className="downloads-list">
                    {pdfPurchases.map((purchase) => {
                        const classInfo = CLASSES.find(c => c.id === purchase.classId);
                        return (
                            <div key={purchase.id} className="download-card">
                                <div className="download-info">
                                    <div className="download-icon">
                                        <FileText size={24} />
                                    </div>
                                    <div className="download-details">
                                        <h3>{purchase.packageName || purchase.name}</h3>
                                        <p className="download-class">{classInfo?.name || purchase.classId}</p>
                                        <div className="download-meta">
                                            <span>
                                                <Calendar size={14} />
                                                Purchased: {purchase.purchaseDate ? new Date(purchase.purchaseDate).toLocaleDateString() : (purchase.purchasedAt ? new Date(purchase.purchasedAt).toLocaleDateString() : 'Recently')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="download-actions">
                                    <button className="btn btn-primary btn-sm">
                                        <Download size={16} />
                                        <span>Download All</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Note for bundle purchases */}
                {purchasedItems.some(p => p.packageType === 'bundle') && (
                    <div className="bundle-note">
                        <p>
                            Your bundle purchase also includes video access.
                            Head to the <a href="/videos">Videos</a> section to start watching.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyDownloads;
