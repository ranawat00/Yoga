import './Notification.css';
import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function Notification() {
  const { notifications, removeNotification } = useApp();
  return (
    <div className="notifications-container">
      {notifications.map((notif) => (
        <Toast
          key={notif.id}
          notif={notif}
          onClose={() => removeNotification(notif.id)}
        />
      ))}
    </div>
  );
}

function Toast({ notif, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification-toast ${notif.type === 'error' ? 'error' : ''}`}>
      {notif.type === 'error' ? (
        <svg className="toast-icon error-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E74C3C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      ) : (
        <svg className="toast-icon success-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )}
      <span className="notification-message">{notif.message}</span>
      <button className="notification-close" onClick={onClose} aria-label="Close notification">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}
