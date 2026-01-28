import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import PDFPreviewModal from './components/PDFPreviewModal/PDFPreviewModal';
import CheckoutModal from './components/CheckoutModal/CheckoutModal';

// Pages
import Home from './pages/Home/Home';
import Materials from './pages/Materials/Materials';
import Videos from './pages/Videos/Videos';
import HardCopy from './pages/HardCopy/HardCopy';
import MyDownloads from './pages/MyDownloads/MyDownloads';
import Profile from './pages/Profile/Profile';
import Notifications from './pages/Notifications/Notifications';

// Styles
import './App.css';

function ModalManager() {
  const {
    modalType,
    modalContent,
    closeModal,
    openLoginModal,
    openCheckoutModal,
    isAuthenticated
  } = useApp();
  const [showLogin, setShowLogin] = useState(true);

  if (modalType === 'login') {
    return (
      <Modal title="Login">
        {showLogin ? (
          <LoginForm onSwitchToRegister={() => setShowLogin(false)} />
        ) : (
          <RegistrationForm onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </Modal>
    );
  }

  if (modalType === 'registration') {
    return (
      <Modal title="Create Account">
        <RegistrationForm onSwitchToLogin={() => {
          closeModal();
          openLoginModal();
        }} />
      </Modal>
    );
  }

  if (modalType === 'checkout' && modalContent) {
    return (
      <Modal title="Checkout">
        <CheckoutModal item={modalContent} onClose={closeModal} />
      </Modal>
    );
  }

  if (modalType === 'pdfPreview' && modalContent) {
    const handleBuy = () => {
      closeModal();
      if (isAuthenticated) {
        // User is logged in - open checkout
        openCheckoutModal({
          id: modalContent.id || modalContent.contentId,
          name: modalContent.title,
          type: 'single-pdf',
          price: modalContent.price !== undefined ? modalContent.price : 199,
        });
      } else {
        // User not logged in - open login modal
        openLoginModal();
      }
    };

    return (
      <PDFPreviewModal
        pdf={modalContent}
        onClose={closeModal}
        onBuy={handleBuy}
      />
    );
  }

  if (modalType === 'videoPreview' && modalContent) {
    return (
      <Modal title={modalContent.title} size="large">
        <div className="video-preview-modal">
          <div className="video-player-container">
            {modalContent.fileUrl ? (
              <video
                controls
                className="video-player"
                poster={modalContent.thumbnail}
              >
                <source src={modalContent.fileUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="video-player-placeholder">
                <img src={modalContent.thumbnail} alt={modalContent.title} />
                <div className="video-overlay-info">
                  <p>Video Preview</p>
                  <span>{modalContent.duration}</span>
                </div>
              </div>
            )}
          </div>
          <div className="video-info">
            <h3>{modalContent.title}</h3>
            <p className="video-instructor">Instructor: {modalContent.instructor || 'Genii Books'}</p>
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
          <Route path="/hard-copy" element={<HardCopy />} />
          <Route path="/my-downloads" element={<MyDownloads />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
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
