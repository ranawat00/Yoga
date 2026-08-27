import React, { useEffect } from 'react';
import './ToastNotification.css';

const ToastNotification = ({ type = 'success', title, message, onClose, autoCloseTime = 4000 }) => {
  useEffect(() => {
    if (!autoCloseTime) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, autoCloseTime);

    return () => clearTimeout(timer);
  }, [autoCloseTime, onClose]);

  const isSuccess = type === 'success';

  return (
    <div className={`toast-notification-card ${type}`}>
      <div className="toast-icon-badge">
        {isSuccess ? (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        )}
      </div>

      <div className="toast-content">
        <h4 className="toast-title">{title || (isSuccess ? 'Success' : 'Error')}</h4>
        <p className="toast-message">{message}</p>
      </div>

      <button className="toast-close-btn" onClick={onClose} aria-label="Close notification">
        ✕
      </button>

      <div className="toast-progress-bar"></div>
    </div>
  );
};

export default ToastNotification;
