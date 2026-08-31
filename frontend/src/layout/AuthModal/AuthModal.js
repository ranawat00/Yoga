import React, { useState } from 'react';
import { useApp } from '../../hooks/useApp';
import Logo from '../../common/Logo/Logo';
import './AuthModal.css';

export default function AuthModal() {
  const { 
    isAuthOpen, 
    setIsAuthOpen, 
    handleLogin, 
    handleSignup, 
    handleForgotPassword,
    authRole,
    setAuthRole 
  } = useApp();
  
  const [activeTab, setActiveTab] = useState('login'); // 'login', 'signup', or 'forgot'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [schoolName, setSchoolName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [referralId, setReferralId] = useState('');

  const handleGoogleSignIn = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '651592002683-v97jd6mn9ha5g16ve8iv4jg3q340cv07.apps.googleusercontent.com';
    
    if (clientId) {
      const redirectUri = encodeURIComponent(`${window.location.origin}`);
      const scope = encodeURIComponent('openid profile email');
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}&prompt=select_account`;
      
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 640;
      
      if (isMobile) {
        window.location.href = googleAuthUrl;
      } else {
        const width = Math.min(500, Math.floor(window.innerWidth * 0.9));
        const height = Math.min(650, Math.floor(window.innerHeight * 0.9));
        const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
        const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);
        
        window.open(googleAuthUrl, 'GoogleSignIn', `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,status=1`);
      }
    }
  };

  if (!isAuthOpen) return null;

  const handleClose = () => {
    setIsAuthOpen(false);
    setAuthRole('user');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === 'login') {
      await handleLogin(email, password, authRole);
    } else if (activeTab === 'signup') {
      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match. Please verify both passwords.');
        return;
      }
      setPasswordError('');
      await handleSignup(name, email, password, authRole, schoolName, studentId, referralId, studentName, phone);
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
    setPhone('');
    setPassword('');
    setShowPassword(false);
    setConfirmPassword('');
    setShowConfirmPassword(false);
    setPasswordError('');
    setSchoolName('');
    setStudentId('');
    setStudentName('');
    setReferralId('');
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
    <div className="auth-modal-overlay" onClick={handleClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="auth-modal-close" onClick={handleClose} aria-label="Close Authentication">
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
            <label htmlFor="auth-email">
              {authRole === 'student' && activeTab !== 'forgot' ? 'Student Email Address' : 'Email Address'}
            </label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input 
                type="email" 
                id="auth-email" 
                placeholder={authRole === 'student' && activeTab !== 'forgot' ? 'student@school.edu' : 'you@example.com'}
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>

          {/* Mobile Number Field (for Sign Up) */}
          {activeTab === 'signup' && (
            <div className="form-group animate-slide-down">
              <label htmlFor="auth-phone">Mobile Number <span className="required-star" style={{ color: '#ef4444' }}>*</span></label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <input 
                  type="tel" 
                  id="auth-phone" 
                  placeholder="Enter your mobile number"
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                />
              </div>
            </div>
          )}

          {/* College / University Name (only for Student Sign Up) */}
          {activeTab === 'signup' && authRole === 'student' && (
            <div className="form-group animate-slide-down">
              <label htmlFor="auth-school">College / University Name <span className="required-star" style={{ color: '#ef4444' }}>*</span></label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                </svg>
                <input 
                  type="text" 
                  id="auth-school" 
                  placeholder="Enter College or University name"
                  value={schoolName} 
                  onChange={(e) => setSchoolName(e.target.value)} 
                  required 
                />
              </div>
            </div>
          )}

          {/* Student ID / Roll Number (only for Student Sign Up) */}
          {activeTab === 'signup' && authRole === 'student' && (
            <div className="form-group animate-slide-down">
              <label htmlFor="auth-studentid">Student ID / Roll Number <span className="required-star" style={{ color: '#ef4444' }}>*</span></label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                  <line x1="7" y1="8" x2="17" y2="8"></line>
                  <line x1="7" y1="12" x2="13" y2="12"></line>
                  <line x1="7" y1="16" x2="9" y2="16"></line>
                </svg>
                <input 
                  type="text" 
                  id="auth-studentid" 
                  placeholder="Enter student ID or roll number"
                  value={studentId} 
                  onChange={(e) => setStudentId(e.target.value)} 
                  required 
                />
              </div>
            </div>
          )}

          {/* Referral ID (only for Student Sign Up) */}
          {activeTab === 'signup' && authRole === 'student' && (
            <div className="form-group animate-slide-down">
              <label htmlFor="auth-referralid">Referral ID <span className="required-star" style={{ color: '#ef4444' }}>*</span></label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <polyline points="17 11 19 13 23 9"></polyline>
                </svg>
                <input 
                  type="text" 
                  id="auth-referralid" 
                  placeholder="Enter Referral Code / ID"
                  value={referralId} 
                  onChange={(e) => setReferralId(e.target.value)} 
                  required 
                />
              </div>
            </div>
          )}

          {/* Linked Student Details for Parents (Sign Up ONLY) */}
          {activeTab === 'signup' && authRole === 'parent' && (
            <>
              <div className="form-group animate-slide-down">
                <label htmlFor="auth-parent-studentname">
                  Registered Student's Full Name <span className="required-star" style={{ color: '#ef4444' }}>*</span>
                </label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <input 
                    type="text" 
                    id="auth-parent-studentname" 
                    placeholder="Enter student's registered full name"
                    value={studentName} 
                    onChange={(e) => setStudentName(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="form-group animate-slide-down">
                <label htmlFor="auth-parent-studentid">
                  Registered Student ID / Roll Number <span className="required-star" style={{ color: '#ef4444' }}>*</span>
                </label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                    <line x1="7" y1="8" x2="17" y2="8"></line>
                    <line x1="7" y1="12" x2="13" y2="12"></line>
                  </svg>
                  <input 
                    type="text" 
                    id="auth-parent-studentid" 
                    placeholder="Enter student ID or roll number"
                    value={studentId} 
                    onChange={(e) => setStudentId(e.target.value)} 
                    required 
                  />
                </div>
              </div>
            </>
          )}

          {/* Password Field with Eye Toggle */}
          {activeTab !== 'forgot' && (
            <div className="form-group">
              <label htmlFor="auth-password">Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  id="auth-password" 
                  placeholder="••••••••"
                  value={password} 
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }} 
                  className="has-toggle"
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Confirm Password Field with Eye Toggle (Sign Up ONLY) */}
          {activeTab === 'signup' && (
            <div className="form-group animate-slide-down">
              <label htmlFor="auth-confirm-password">Confirm Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  id="auth-confirm-password" 
                  placeholder="••••••••"
                  value={confirmPassword} 
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }} 
                  className="has-toggle"
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Password Match Error Display */}
          {passwordError && (
            <div className="animate-slide-down" style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '600', marginTop: '-0.2rem' }}>
              ⚠️ {passwordError}
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

          {activeTab !== 'forgot' && (
            <>
              <div className="auth-social-divider-modal">
                <div className="auth-divider-line"></div>
                <span>OR</span>
                <div className="auth-divider-line"></div>
              </div>

              <button 
                type="button" 
                className="auth-google-btn-modal"
                onClick={handleGoogleSignIn}
              >
                <svg className="yho-social-icon" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </>
          )}
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
