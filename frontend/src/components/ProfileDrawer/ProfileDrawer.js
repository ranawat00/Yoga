import './ProfileDrawer.css';
import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { updateDetails } from '../../api/auth';

export default function ProfileDrawer() {
  const { 
    user, 
    setUser, 
    isProfileOpen, 
    setIsProfileOpen, 
    setView,
    handleLogout, 
    addNotification 
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

  if (!isProfileOpen || !user) return null;

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
        </div>

        {/* Footer Actions */}
        <div className="profile-drawer-footer">
          <button className="btn-profile-logout" onClick={() => { handleLogout(); setIsProfileOpen(false); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}
