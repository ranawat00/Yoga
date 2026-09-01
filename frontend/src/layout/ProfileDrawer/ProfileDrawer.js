import './ProfileDrawer.css';
import React, { useState, useEffect } from 'react';
import { useApp } from '../../hooks/useApp';
import { updateDetails } from '../../api/auth';
import Logo from '../../common/Logo/Logo';

export default function ProfileDrawer() {
  const { 
    user, 
    setUser, 
    isProfileOpen, 
    setIsProfileOpen, 
    setView,
    handleLogout,
    handleLogoutAll,
    addNotification,
    setAuthRole
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Synchronize form values with user profile
  useEffect(() => {
    if (user) {
      setEditForm({ name: user.name, email: user.email });
    }
  }, [user]);

  if (!isProfileOpen) return null;

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editForm.name.trim() || !editForm.email.trim()) {
      addNotification('Name and email cannot be empty.', 'error');
      return;
    }

    setUpdatingProfile(true);
    try {
      const res = await updateDetails(editForm.name, editForm.email);
      if (res.success) {
        setUser(res.user);
        setIsEditing(false);
        addNotification('Profile updated successfully!', 'success');
      } else {
        addNotification(res.message || 'Failed to update profile.', 'error');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      addNotification('Connection error. Please try again.', 'error');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Drawer Backdrop Overlay */}
      <div className="profile-drawer-backdrop" onClick={() => setIsProfileOpen(false)}></div>

      {/* Drawer Content */}
      <div className="profile-drawer animate-drawer-slide">
        {/* Header */}
        <div className="profile-drawer-header">
          <h3>Your Profile</h3>
          <button className="profile-drawer-close-btn" onClick={() => setIsProfileOpen(false)} aria-label="Close Profile">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {user && user.role !== 'student' ? (
          <>
            <div className="profile-drawer-body">
              {/* User Details Box */}
              <div className="profile-user-card">
                <div className="profile-avatar-gradient">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                
                {!isEditing ? (
                  <div className="profile-details-info">
                    <h4>{user.name}</h4>
                    <p className="profile-email-text">{user.email}</p>
                    <p className="profile-date-joined">Joined: {formatDate(user.createdAt)}</p>
                    <button className="btn-edit-profile-trigger" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleEditSubmit} className="profile-edit-form animate-fade-in">
                    <div className="form-group-profile">
                      <label htmlFor="edit-name">Name</label>
                      <input
                        id="edit-name"
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group-profile">
                      <label htmlFor="edit-email">Email</label>
                      <input
                        id="edit-email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="edit-profile-actions">
                      <button type="button" className="btn-cancel-edit" onClick={() => setIsEditing(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-save-profile" disabled={updatingProfile}>
                        {updatingProfile ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Divider */}
              <div className="drawer-section-divider"></div>

              {/* Clickable Order History Option */}
              <div className="profile-orders-section">
                <button 
                  className="btn-profile-orders-link" 
                  onClick={() => {
                    setIsProfileOpen(false);
                    setView('orders');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span className="icon-orders-link">📦</span>
                  <div className="orders-link-text">
                    <span className="link-title">Order History</span>
                    <span className="link-subtitle">View and track all your past orders</span>
                  </div>
                  <span className="arrow-orders-link">→</span>
                </button>
              </div>

              {/* YHO Club Option */}
              <div 
                className="profile-yho-club-card"
                onClick={() => {
                  setIsProfileOpen(false);
                  setView('yho-club');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="yho-club-info">
                  <div className="yho-club-badge-logo">
                    <Logo size={34} />
                  </div>
                  <div className="yho-club-text">
                    <span className="yho-club-title">YHO Club</span>
                    <span className="yho-club-desc">Student & Parent Portal</span>
                  </div>
                </div>
                <span className="arrow-orders-link">→</span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="profile-drawer-footer">
              <button className="btn-profile-logout-all" onClick={() => { handleLogoutAll(); setIsProfileOpen(false); }}>
                <span style={{ marginRight: '8px' }}>🌐</span>
                Logout All Devices
              </button>
              <button className="btn-profile-logout" onClick={() => { handleLogout(); setIsProfileOpen(false); }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Log Out
              </button>
            </div>
          </>
        ) : (
          <div className="profile-drawer-body">
            {user && user.role === 'student' ? (
              <div className="profile-guest-card animate-fade-in" style={{ borderColor: 'rgba(99, 102, 241, 0.3)', background: 'linear-gradient(145deg, #f8fafc, #eef2ff)' }}>
                <div className="profile-guest-avatar" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff' }}>
                  🎓
                </div>
                <h4 className="profile-guest-title" style={{ color: '#1e1b4b' }}>Logged in on Student Portal</h4>
                <p className="profile-guest-desc" style={{ color: '#475569', fontWeight: 600, marginBottom: '4px' }}>
                  {user.name}
                </p>
                <p className="profile-guest-desc" style={{ color: '#64748b', fontSize: '0.84rem' }}>
                  {user.email} {user.studentId ? `• ID: ${user.studentId}` : ''}
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', marginTop: '14px' }}>
                  <button 
                    className="profile-guest-login-btn" 
                    style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
                    onClick={() => {
                      setIsProfileOpen(false);
                      setView('yho-club');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Open YHO Club Portal →
                  </button>
                  <button 
                    className="btn-profile-logout"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '4px' }}
                    onClick={() => {
                      handleLogout();
                      setIsProfileOpen(false);
                    }}
                  >
                    Log Out Student
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-guest-card animate-fade-in">
                <div className="profile-guest-avatar">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h4 className="profile-guest-title">Welcome, Guest</h4>
                <p className="profile-guest-desc">
                  Log in to track your orders, book healing workshops, and get your satvic health score.
                </p>
                <button 
                  className="profile-guest-login-btn" 
                  onClick={() => {
                    setAuthRole('user');
                    setIsProfileOpen(false);
                    setView('login');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Log In / Sign Up
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="drawer-section-divider"></div>

            {/* YHO Club Card */}
            <div 
              className="profile-yho-club-card"
              onClick={() => {
                setIsProfileOpen(false);
                setView('yho-club');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="yho-club-info">
                <div className="yho-club-badge-logo">
                  <Logo size={34} />
                </div>
                <div className="yho-club-text">
                  <span className="yho-club-title">YHO Club</span>
                  <span className="yho-club-desc">Student & Parent Mental Wellness Space</span>
                </div>
              </div>
              <span className="arrow-orders-link">→</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
