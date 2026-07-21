import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Logo from '../Logo/Logo';
import './AuthModal.css';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, handleLogin, handleSignup, handleForgotPassword } = useApp();
  const [activeTab, setActiveTab] = useState('login'); // 'login', 'signup', or 'forgot'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === 'login') {
      await handleLogin(email, password);
    } else if (activeTab === 'signup') {
      await handleSignup(name, email, password);
    } else if (activeTab === 'forgot') {
      const success = await handleForgotPassword(email);
      if (success) {
        setActiveTab('login');
        setEmail('');
      }
    }
  };

  const handleSwitchTab = (tab) => {
    setActiveTab(tab);
    setName('');
    setEmail('');
    setPassword('');
  };

  const getHeaderTitle = () => {
    if (activeTab === 'login') return 'Welcome Back';
    if (activeTab === 'signup') return 'Join the Revolution';
    return 'Reset Password';
  };

  const getHeaderSubtitle = () => {
    if (activeTab === 'login') return 'Login to continue your drug-free health journey';
    if (activeTab === 'signup') return 'Start your journey back to nature\'s design';
    return 'Enter your email address to receive a password reset link';
  };

  const getSubmitBtnText = () => {
    if (activeTab === 'login') return 'Log In';
    if (activeTab === 'signup') return 'Create Account';
    return 'Send Reset Link';
  };

  return (
    <div className="auth-modal-overlay" onClick={() => setIsAuthOpen(false)}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="auth-modal-close" onClick={() => setIsAuthOpen(false)} aria-label="Close Authentication">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Modal Header */}
        <div className="auth-modal-header">
          <div className="logo-brand">
            <Logo size={50} />
          </div>
          <h2 className="auth-title">{getHeaderTitle()}</h2>
          <p className="auth-subtitle">{getHeaderSubtitle()}</p>
        </div>

        {/* Tab Switches */}
        {activeTab !== 'forgot' && (
          <div className="auth-tabs">
            <button 
              type="button" 
              className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => handleSwitchTab('login')}
            >
              Log In
            </button>
            <button 
              type="button" 
              className={`auth-tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => handleSwitchTab('signup')}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Auth Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {activeTab === 'signup' && (
            <div className="form-group">
              <label htmlFor="auth-name">Full Name</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input 
                  type="text" 
                  id="auth-name" 
                  placeholder="Enter your name"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-email">Email Address</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input 
                type="email" 
                id="auth-email" 
                placeholder="you@example.com"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>

          {activeTab !== 'forgot' && (
            <div className="form-group">
              <label htmlFor="auth-password">Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input 
                  type="password" 
                  id="auth-password" 
                  placeholder="••••••••"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>
          )}

          {activeTab === 'login' && (
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#forgot" className="forgot-link" onClick={(e) => { e.preventDefault(); setActiveTab('forgot'); }}>Forgot Password?</a>
            </div>
          )}

          <button type="submit" className="auth-submit-btn">
            {getSubmitBtnText()}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="auth-modal-footer">
          {activeTab === 'forgot' ? (
            <p>Remembered your password? <span className="toggle-action" onClick={() => handleSwitchTab('login')}>Log In</span></p>
          ) : activeTab === 'login' ? (
            <p>Don't have an account? <span className="toggle-action" onClick={() => handleSwitchTab('signup')}>Sign Up</span></p>
          ) : (
            <p>Already have an account? <span className="toggle-action" onClick={() => handleSwitchTab('login')}>Log In</span></p>
          )}
        </div>
      </div>
    </div>
  );
}
