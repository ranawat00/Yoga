import React from 'react';
import './LogoutModal.css';

const LogoutModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay" onClick={onClose}>
      <div className="logout-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="logout-modal-close-btn" onClick={onClose} title="Close">
          ✕
        </button>

        <div className="logout-modal-icon-badge">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </div>

        <h3 className="logout-modal-title">Confirm Logout</h3>
        <p className="logout-modal-desc">
          Are you sure you want to log out of your Admin session? You will need to log back in to access the control panel.
        </p>

        <div className="logout-modal-actions">
          <button 
            type="button" 
            className="logout-modal-btn cancel-btn" 
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button 
            type="button" 
            className="logout-modal-btn confirm-btn" 
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? <span className="btn-spinner"></span> : 'Yes, Log Out'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
