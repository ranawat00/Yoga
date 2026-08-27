import React, { useState } from 'react';
import ToastNotification from '../Toast/ToastNotification';
import './AdminAuthView.css';

const AdminAuthView = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminSecretKey: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { type, title, message }

  const triggerToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (toast) setToast(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    if (!formData.email || !formData.password) {
      triggerToast('error', 'Missing Information', 'Please fill in all required fields.');
      return;
    }

    if (!isLogin) {
      if (!formData.name) {
        triggerToast('error', 'Validation Error', 'Please enter your full name.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        triggerToast('error', 'Password Mismatch', 'Passwords do not match.');
        return;
      }
      if (formData.password.length < 6) {
        triggerToast('error', 'Weak Password', 'Password must be at least 6 characters long.');
        return;
      }
    }

    setLoading(true);

    const endpoint = isLogin ? '/api/auth/admin/login' : '/api/auth/admin/register';
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          adminSecretKey: formData.adminSecretKey
        };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (data.success) {
        triggerToast(
          'success', 
          isLogin ? 'Login Successful!' : 'Account Created!', 
          isLogin ? `Welcome back, ${data.user?.name || 'Admin'}!` : 'Admin account created successfully! Redirecting...'
        );
        if (data.token) {
          localStorage.setItem('adminToken', data.token);
        }
        if (data.user) {
          localStorage.setItem('adminUser', JSON.stringify(data.user));
        }
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(data.user);
        }, 1000);
      } else {
        triggerToast('error', 'Authentication Failed', data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Admin Auth Error:', err);
      triggerToast('error', 'Connection Error', 'Unable to reach authentication server. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-container">
      {/* Toast Notification Container */}
      {toast && (
        <div className="toast-notification-container">
          <ToastNotification
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        </div>
      )}

      <div className="admin-auth-card">
        {/* Header */}
        <div className="admin-auth-header">
          <div className="brand-logo-icon">🧘‍♀️</div>
          <h2>Yoga Healers</h2>
          <p className="auth-subtitle">Admin Control Panel Authentication</p>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tab-bar">
          <button
            type="button"
            className={`tab-btn ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true);
              setToast(null);
            }}
          >
            Admin Login
          </button>
          <button
            type="button"
            className={`tab-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false);
              setToast(null);
            }}
          >
            Admin Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="admin-auth-form">
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. Master Administrator"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <label htmlFor="email">Admin Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="admin@yogahealers.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {!isLogin && (
            <>
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔑</span>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    title={showConfirmPassword ? "Hide password" : "Show password"}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="adminSecretKey">Admin Security Key (Optional)</label>
                <div className="input-wrapper">
                  <span className="input-icon">🛡️</span>
                  <input
                    type="text"
                    id="adminSecretKey"
                    name="adminSecretKey"
                    placeholder="Enter security key if required"
                    value={formData.adminSecretKey}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              <span className="btn-spinner"></span>
            ) : isLogin ? (
              'Sign In to Admin Board →'
            ) : (
              'Create Admin Account →'
            )}
          </button>
        </form>

        <div className="auth-footer-note">
          <span>🔒 End-to-end encrypted admin authentication</span>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthView;
