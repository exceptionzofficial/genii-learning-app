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
      <Modal title={`Preview: ${modalContent.title}`} size="large">
        <div className="pdf-preview-modal">
          <div className="preview-info">
            <p>This is a preview of the first 5 pages</p>
            <p className="preview-subject">{modalContent.subject} • {modalContent.chapters} Chapters</p>
          </div>
          <div className="preview-pages">
            {[1, 2, 3, 4, 5].map((page) => (
              <div key={page} className="preview-page">
                <img src={modalContent.thumbnail} alt={`Page ${page}`} />
                <span className="page-number">Page {page}</span>
              </div>
            ))}
          </div>
          <div className="preview-footer">
            <p>Like what you see? Purchase to access all {modalContent.pages} pages</p>
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
