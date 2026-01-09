import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './Modal.css';

function Modal({ children, title, size = 'medium' }) {
    const { isModalOpen, closeModal } = useApp();

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isModalOpen, closeModal]);

    if (!isModalOpen) return null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div
                className={`modal-container modal-${size}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                {title && (
                    <div className="modal-header">
                        <h3 className="modal-title">{title}</h3>
                        <button
                            className="modal-close"
                            onClick={closeModal}
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}

                {/* Modal Body */}
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
