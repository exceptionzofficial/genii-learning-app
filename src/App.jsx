import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

// Pages
import Home from './pages/Home/Home';
import Materials from './pages/Materials/Materials';
import Videos from './pages/Videos/Videos';
import Pricing from './pages/Pricing/Pricing';
import HardCopy from './pages/HardCopy/HardCopy';
import MyDownloads from './pages/MyDownloads/MyDownloads';
import Profile from './pages/Profile/Profile';

// Styles
import './App.css';

function ModalManager() {
  const { modalType, modalContent } = useApp();

  if (modalType === 'registration') {
    return (
      <Modal title="Complete Your Purchase">
        <RegistrationForm />
      </Modal>
    );
  }

  if (modalType === 'pdfPreview' && modalContent) {
    return (
      <Modal title="PDF Preview" size="large">
        <div className="pdf-preview-modal">
          {/* PDF Header Info */}
          <div className="preview-header">
            <div className="preview-book-info">
              <img src={modalContent.thumbnail} alt={modalContent.title} className="preview-cover" />
              <div className="preview-details">
                <span className="preview-badge">{modalContent.subject}</span>
                <h3>{modalContent.title}</h3>
                <p>{modalContent.description}</p>
                <div className="preview-meta">
                  <span>{modalContent.chapters} Chapters</span>
                  <span>{modalContent.pages} Pages</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Notice */}
          <div className="preview-notice">
            <span className="notice-icon">📖</span>
            <span>Previewing first 5 pages of {modalContent.pages} total pages</span>
          </div>

          {/* PDF Pages Preview */}
          <div className="preview-pages-container">
            <div className="preview-pages">
              {[1, 2, 3, 4, 5].map((page) => (
                <div key={page} className="preview-page">
                  <div className="page-content">
                    <img src={modalContent.thumbnail} alt={`Page ${page}`} />
                    <div className="page-overlay">
                      <span className="zoom-hint">Click to zoom</span>
                    </div>
                  </div>
                  <span className="page-number">Page {page}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Footer with CTA */}
          <div className="preview-footer">
            <div className="footer-content">
              <div className="footer-text">
                <h4>Like what you see?</h4>
                <p>Get full access to all {modalContent.pages} pages with detailed explanations</p>
              </div>
              <button className="btn btn-primary btn-lg preview-buy-btn">
                Buy Now - Access Full PDF
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  if (modalType === 'videoPreview' && modalContent) {
    return (
      <Modal title={modalContent.title} size="large">
        <div className="video-preview-modal">
          <div className="video-player-placeholder">
            <img src={modalContent.thumbnail} alt={modalContent.title} />
            <div className="video-overlay-info">
              <p>Video Preview</p>
              <span>{modalContent.duration}</span>
            </div>
          </div>
          <div className="video-info">
            <h3>{modalContent.title}</h3>
            <p className="video-instructor">Instructor: {modalContent.instructor}</p>
            <p className="video-description">{modalContent.description}</p>
            <div className="video-stats">
              <span>{modalContent.lessons} Lessons</span>
              <span>{modalContent.duration}</span>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  return null;
}

function AppContent() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/hard-copy" element={<HardCopy />} />
          <Route path="/my-downloads" element={<MyDownloads />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
      <ModalManager />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
