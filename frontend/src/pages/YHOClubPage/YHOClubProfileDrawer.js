import React, { useState, useEffect } from 'react';
import './YHOClubProfileDrawer.css';
import { useApp } from '../../hooks/useApp';

export default function YHOClubProfileDrawer({ isOpen, onClose }) {
  const { user, handleLogout } = useApp();
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'profile-details'

  // Reset to menu view whenever drawer is opened/closed
  useEffect(() => {
    if (!isOpen) setActiveTab('menu');
  }, [isOpen]);

  // Close on Escape key press and freeze background scrolling when open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const studentId = user?.studentId || (user?._id ? `YHO-${user._id.slice(-6).toUpperCase()}` : 'YHO-2026-STU');

  const onLogoutClick = async () => {
    onClose();
    await handleLogout();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Active Member';
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return 'Active Member';
    }
  };

  return (
    <>
      {/* Dark backdrop overlay */}
      <div className="yhod-backdrop" onClick={onClose} aria-hidden="true" />

      {/* Drawer panel sliding in from right side */}
      <aside className="yhod-drawer" aria-label="YHO Club Student Profile Drawer">
        {/* Top Header */}
        <div className="yhod-header">
          {activeTab === 'profile-details' ? (
            <div className="yhod-header-left">
              <button
                type="button"
                className="yhod-back-btn"
                onClick={() => setActiveTab('menu')}
                aria-label="Back to menu"
              >
                ← Back
              </button>
              <h3 className="yhod-title">Profile Details</h3>
            </div>
          ) : (
            <div className="yhod-header-left">
              <span className="yhod-portal-badge">YHO CLUB PORTAL</span>
              <h3 className="yhod-title">Student Dashboard</h3>
            </div>
          )}

          <button
            type="button"
            className="yhod-close-btn"
            onClick={onClose}
            aria-label="Close profile drawer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="yhod-body">
          {activeTab === 'menu' ? (
            <>
              {/* Mini Profile Summary Card */}
              <div className="yhod-profile-card">
                <div className="yhod-avatar-wrap">
                  {user?.picture ? (
                    <img src={user.picture} alt={user.name} className="yhod-avatar-img" />
                  ) : (
                    <div className="yhod-avatar-fallback">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                    </div>
                  )}
                  <span className="yhod-status-dot" title="Active Student Member" />
                </div>

                <div className="yhod-user-meta">
                  <h4 className="yhod-user-name">{user?.name || 'Student Member'}</h4>
                  <p className="yhod-user-email">{user?.email}</p>
                  
                  <div className="yhod-id-pill">
                    <span className="yhod-id-label">STUDENT ID</span>
                    <span className="yhod-id-val">{studentId}</span>
                  </div>
                </div>
              </div>

              {/* Menu List */}
              <div className="yhod-menu-section">
                <h5 className="yhod-section-label">ACCOUNT & OPTIONS</h5>

                {/* Profile Option — Opens full profile details */}
                <button
                  type="button"
                  className="yhod-menu-item yhod-menu-item--highlight"
                  onClick={() => setActiveTab('profile-details')}
                >
                  <div className="yhod-item-icon">👤</div>
                  <div className="yhod-item-text">
                    <span className="yhod-item-title">Profile</span>
                    <span className="yhod-item-sub">View personal & student account details</span>
                  </div>
                  <span className="yhod-item-arrow">→</span>
                </button>

                {/* Talk to a Life Coach */}
                <button
                  type="button"
                  className="yhod-menu-item"
                  onClick={() => {
                    onClose();
                    window.scrollTo({ top: 900, behavior: 'smooth' });
                  }}
                >
                  <div className="yhod-item-icon">💬</div>
                  <div className="yhod-item-text">
                    <span className="yhod-item-title">Talk to a Life Coach</span>
                    <span className="yhod-item-sub">24/7 dedicated peer & mental support</span>
                  </div>
                  <span className="yhod-item-arrow">→</span>
                </button>
              </div>

              {/* Safe Campus Commitment Box */}
              <div className="yhod-commitment-box">
                <div className="yhod-commitment-header">
                  <span className="yhod-commitment-icon">🛡️</span>
                  <span className="yhod-commitment-title">Safe Campus Commitment</span>
                </div>
                <p className="yhod-commitment-desc">
                  Your student conversations and wellbeing records are completely encrypted and confidential.
                </p>
              </div>
            </>
          ) : (
            /* Detailed Profile View */
            <div className="yhod-details-view animate-fade-in">
              {/* Profile Card Header */}
              <div className="yhod-details-header-card">
                <div className="yhod-details-avatar-large">
                  {user?.picture ? (
                    <img src={user.picture} alt={user.name} className="yhod-details-avatar-img" />
                  ) : (
                    <span>{user?.name ? user.name.charAt(0).toUpperCase() : 'S'}</span>
                  )}
                </div>
                <h4 className="yhod-details-name">{user?.name || 'Student Member'}</h4>
                <span className="yhod-details-role-badge">🎓 Verified Student Member</span>
              </div>

              {/* Profile Fields List */}
              <div className="yhod-fields-list">
                <div className="yhod-field-row">
                  <span className="yhod-field-label">Student ID</span>
                  <span className="yhod-field-value yhod-field-value--highlight">{studentId}</span>
                </div>

                <div className="yhod-field-row">
                  <span className="yhod-field-label">Email Address</span>
                  <span className="yhod-field-value">{user?.email || '—'}</span>
                </div>

                <div className="yhod-field-row">
                  <span className="yhod-field-label">Phone Number</span>
                  <span className="yhod-field-value">{user?.phone || 'Not provided'}</span>
                </div>

                <div className="yhod-field-row">
                  <span className="yhod-field-label">School / Institution</span>
                  <span className="yhod-field-value">{user?.schoolName || 'Not specified'}</span>
                </div>

                <div className="yhod-field-row">
                  <span className="yhod-field-label">Status</span>
                  <span className="yhod-field-value yhod-status-active-badge">● Active</span>
                </div>

                <div className="yhod-field-row">
                  <span className="yhod-field-label">Member Since</span>
                  <span className="yhod-field-value">{formatDate(user?.createdAt)}</span>
                </div>
              </div>

              <button
                type="button"
                className="yhod-back-to-menu-btn"
                onClick={() => setActiveTab('menu')}
              >
                ← Back to Menu
              </button>
            </div>
          )}
        </div>

        {/* Footer with Log Out */}
        <div className="yhod-footer">
          <button
            type="button"
            className="yhod-logout-btn"
            onClick={onLogoutClick}
          >
            <span className="yhod-logout-icon">🚪</span>
            <span>Log Out Student</span>
          </button>
        </div>
      </aside>
    </>
  );
}
