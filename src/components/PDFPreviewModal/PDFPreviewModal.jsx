import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2, Download, X, Loader2, AlertCircle } from 'lucide-react';
import './PDFPreviewModal.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PDFPreviewModal({ pdf, onClose, onBuy }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [numPages, setNumPages] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const totalPages = pdf.pages || numPages || 10;
    const maxPreviewPages = pdf.isFree ? totalPages : (pdf.previewPages || 5);

    const handleDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setLoading(false);
        setError(null);
    };

    const handleDocumentLoadError = (error) => {
        console.error('PDF load error:', error);
        setLoading(false);
        setError('Failed to load PDF. The file may be unavailable.');
    };

    const handleZoomIn = () => {
        if (zoom < 2) setZoom(zoom + 0.25);
    };

    const handleZoomOut = () => {
        if (zoom > 0.5) setZoom(zoom - 0.25);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        const maxPage = Math.min(maxPreviewPages, numPages || maxPreviewPages);
        if (currentPage < maxPage) setCurrentPage(currentPage + 1);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const displayPages = Math.min(maxPreviewPages, numPages || maxPreviewPages);

    return (
        <div className={`pdf-preview-overlay ${isFullscreen ? 'fullscreen' : ''}`}>
            <div className="pdf-preview-container">
                {/* Header */}
                <div className="pdf-preview-header">
                    <div className="header-info">
                        <span className="subject-badge">{pdf.subject}</span>
                        <h3>{pdf.title}</h3>
                    </div>
                    <div className="header-actions">
                        <button className="icon-btn" onClick={toggleFullscreen} title="Toggle fullscreen">
                            <Maximize2 size={18} />
                        </button>
                        <button className="icon-btn close-btn" onClick={onClose} title="Close">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* PDF Viewer */}
                <div className="pdf-viewer-wrapper">
                    {/* Toolbar */}
                    <div className="pdf-toolbar">
                        <div className="toolbar-section">
                            <button
                                className="toolbar-btn"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <span className="page-indicator">
                                Page {currentPage} of {displayPages}
                                <span className="total-hint"> (Preview of {totalPages})</span>
                            </span>
                            <button
                                className="toolbar-btn"
                                onClick={handleNextPage}
                                disabled={currentPage >= displayPages}
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>

                        <div className="toolbar-section zoom-controls">
                            <button className="toolbar-btn" onClick={handleZoomOut} disabled={zoom <= 0.5}>
                                <ZoomOut size={18} />
                            </button>
                            <span className="zoom-level">{Math.round(zoom * 100)}%</span>
                            <button className="toolbar-btn" onClick={handleZoomIn} disabled={zoom >= 2}>
                                <ZoomIn size={18} />
                            </button>
                        </div>
                    </div>

                    {/* PDF Content Area */}
                    <div className="pdf-content-area">
                        {pdf.fileUrl ? (
                            <div className="pdf-document-wrapper">
                                <Document
                                    file={pdf.fileUrl}
                                    onLoadSuccess={handleDocumentLoadSuccess}
                                    onLoadError={handleDocumentLoadError}
                                    loading={
                                        <div className="pdf-loading">
                                            <Loader2 size={40} className="spin" />
                                            <p>Loading PDF...</p>
                                        </div>
                                    }
                                    error={
                                        <div className="pdf-error">
                                            <AlertCircle size={40} />
                                            <p>Failed to load PDF</p>
                                        </div>
                                    }
                                >
                                    {!loading && !error && (
                                        <Page
                                            pageNumber={currentPage}
                                            scale={zoom}
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                            loading={
                                                <div className="page-loading">
                                                    <Loader2 size={24} className="spin" />
                                                </div>
                                            }
                                        />
                                    )}
                                </Document>

                                {/* Preview watermark overlay */}
                                {!loading && !error && !pdf.isFree && (
                                    <div className="preview-watermark-overlay">
                                        <span>PREVIEW</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Fallback when no PDF URL
                            <div className="pdf-no-file">
                                <AlertCircle size={48} />
                                <h4>PDF Not Available</h4>
                                <p>The PDF file has not been uploaded yet.</p>
                            </div>
                        )}
                    </div>

                    {/* Page Navigation Dots */}
                    <div className="page-dots">
                        {[...Array(displayPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`page-dot ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => setCurrentPage(index + 1)}
                                title={`Page ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="pdf-preview-footer">
                    <div className="footer-info">
                        <p className="preview-limit">
                            📖 {pdf.isFree ? `Viewing all ${totalPages} pages` : `Previewing first ${displayPages} of ${totalPages} pages`}
                        </p>
                        {!pdf.isFree && (
                            <p className="unlock-text">
                                Purchase to unlock all {totalPages} pages
                            </p>
                        )}
                    </div>
                    <div className="footer-actions">
                        {pdf.isFree ? (
                            <button className="btn btn-primary btn-lg" onClick={() => window.open(pdf.fileUrl, '_blank')}>
                                <Download size={18} />
                                <span>Download PDF</span>
                            </button>
                        ) : (
                            <button className="btn btn-primary btn-lg" onClick={onBuy}>
                                <Download size={18} />
                                <span>Get Full Access</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PDFPreviewModal;
