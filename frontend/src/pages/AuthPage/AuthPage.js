import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../hooks/useApp';
import Logo from '../../common/Logo/Logo';
import { searchInstitutionsAPI } from '../../api/institutions';
import './AuthPage.css';

export default function AuthPage() {
  const { 
    view,
    setView,
    handleLogin, 
    handleSignup, 
    handleForgotPassword,
    authRole,
    setAuthRole 
  } = useApp();
  
  const [activeTab, setActiveTab] = useState(view === 'signup' ? 'signup' : 'login'); // 'login', 'signup', or 'forgot'

  // Sync if route view changes externally
  useEffect(() => {
    if (view === 'login' || view === 'signup') {
      setActiveTab(view);
    }
  }, [view]);
  const [studentStep, setStudentStep] = useState(1); // 1: Email & Terms, 2: Account Details & Password
  const [showInviteInput, setShowInviteInput] = useState(false);
  const [keepInLoop, setKeepInLoop] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [stepError, setStepError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [schoolName, setSchoolName] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeoutRef = useRef(null);

  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [referralId, setReferralId] = useState('');

  // Debounced Search Effect for Institutions
  useEffect(() => {
    if (studentStep === 2 && schoolName.trim().length > 1 && showSuggestions) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      searchTimeoutRef.current = setTimeout(async () => {
        setIsSearching(true);
        const results = await searchInstitutionsAPI(schoolName);
        setSearchSuggestions(results);
        setIsSearching(false);
      }, 300); // 300ms debounce
    } else {
      setSearchSuggestions([]);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [schoolName, studentStep, showSuggestions]);

  const handleSelectInstitution = (name) => {
    setSchoolName(name);
    setShowSuggestions(false);
  };

  const handleStudentStep1Continue = (e) => {
    e.preventDefault();
    
    if (activeTab === 'login') {
      if (!email || !email.includes('@')) {
        setStepError('Please enter a valid email address.');
        return;
      }
      setStepError('');
      // In login, we don't have multiple steps, so just submit or we wouldn't use this.
      // Wait, in login, step 1 is the ONLY step. So we should actually just submit.
      // But wait, login uses handleSubmit directly!
    } else {
      if (!name || !studentId || !phone) {
        setStepError('Please fill in all your details to continue.');
        return;
      }
      setStepError('');
      setStudentStep(2);
    }
  };

  const handleStudentStep2Continue = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStepError('Please enter a valid email address.');
      return;
    }
    
    if (password !== confirmPassword) {
      setStepError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setStepError('Please agree to the Terms of Service & Privacy Policy to continue.');
      return;
    }
    
    setStepError('');
    setStudentStep(3);
  };

  const handleGoogleSignIn = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '651592002683-v97jd6mn9ha5g16ve8iv4jg3q340cv07.apps.googleusercontent.com';
    
    if (clientId) {
      const redirectUri = encodeURIComponent(`${window.location.origin}`);
      const scope = encodeURIComponent('openid profile email');
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}&prompt=select_account`;
      
      const popupWidth = 500;
      const popupHeight = 650;
      // Use screen dimensions to properly center the popup on the display
      const left = Math.round((window.screen.width - popupWidth) / 2);
      const top = Math.round((window.screen.height - popupHeight) / 2);
      
      const popup = window.open(
        googleAuthUrl,
        'GoogleSignIn',
        `width=${popupWidth},height=${popupHeight},left=${left},top=${top},scrollbars=yes,status=1,resizable=yes`
      );
      
      // Fallback: if popup was blocked, do full redirect
      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        window.location.href = googleAuthUrl;
      }
    }
  };





  const handleClose = () => {
    setView('home');
    setAuthRole('user');
    setStudentStep(1);
    setShowInviteInput(false);
    setKeepInLoop(false);
    setAgreeTerms(false);
    setStepError('');
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
    if (tab === 'login' || tab === 'signup') {
      setView(tab);
    }
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

  if (authRole === 'student') {
    return (
      <div className="auth-page-container student-theme">
        <div className="auth-modal-card student-stepwise-card">
          
          {/* Top Navigation: Back Arrow */}
          <button 
            className="student-back-btn" 
            onClick={() => {
              if (studentStep > 1 && activeTab === 'signup') {
                setStudentStep(studentStep - 1);
              } else {
                handleClose();
              }
            }}
            aria-label="Go Back"
            style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', zIndex: 10 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>

          {/* Removed Log In / Sign Up Tabs */}

          {activeTab === 'login' ? (
            /* ================= LOGIN FLOW ================= */
            <div className="student-step-container animate-fade-in" style={{ paddingTop: '5rem' }}>

              {/* Heading */}
              <h1 style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                marginBottom: '0.45rem',
                textAlign: 'center'
              }}>
                Welcome Back
              </h1>
              <p style={{ color: '#71717a', fontSize: '0.85rem', marginBottom: '2rem', fontWeight: 400, textAlign: 'center', whiteSpace: 'nowrap' }}>
                Log in to continue your yoga journey
              </p>

              <form onSubmit={handleSubmit} className="student-step-form">
                <div className="student-input-group">
                  <label htmlFor="student-email-login" className="student-input-label">Email</label>
                  <input 
                    type="email" 
                    id="student-email-login"
                    className="student-email-field"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                
                <div className="student-input-group">
                  <label htmlFor="student-pass-login" className="student-input-label">Password</label>
                  <div className="input-wrapper" style={{ display: 'flex' }}>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      id="student-pass-login" 
                      placeholder="••••••••"
                      className="student-email-field has-toggle"
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                    />
                    <button 
                      type="button" 
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div style={{ textAlign: 'right', marginTop: '-0.4rem', marginBottom: '1.2rem' }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('forgot')}
                    style={{ background: 'none', border: 'none', color: '#00e676', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                  >
                    Forgot password?
                  </button>
                </div>

                <button type="submit" className="student-continue-btn">
                  Log In
                </button>
              </form>
              
              <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.88rem', color: '#52525b' }}>
                Don't have an account?{' '}
                <button type="button" onClick={() => handleSwitchTab('signup')} style={{ background: 'none', border: 'none', color: '#00e676', fontWeight: 700, cursor: 'pointer', padding: 0 }}>Sign Up</button>
              </div>
            </div>
          ) : (
            /* ================= SIGNUP FLOW ================= */
            studentStep === 1 ? (
              /* SIGNUP STEP 1: Details & Password */
              <div className="student-step-container animate-fade-in" style={{ paddingTop: '4rem' }}>
                <h1 className="student-step-title" style={{ marginBottom: '1.5rem', whiteSpace: 'nowrap', fontSize: '1.85rem' }}>
                  Create your account
                </h1>

                <form onSubmit={handleStudentStep1Continue} className="student-step-form">
                  <div className="student-input-group">
                    <label htmlFor="student-name-signup" className="student-input-label">Full Name</label>
                    <input 
                      type="text" 
                      id="student-name-signup"
                      className="student-email-field"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="student-input-group">
                    <label htmlFor="student-id-signup" className="student-input-label">Student ID / Roll Number</label>
                    <input 
                      type="text" 
                      id="student-id-signup"
                      className="student-email-field"
                      placeholder="Enter student ID or roll number"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="student-input-group">
                    <label htmlFor="student-phone-signup" className="student-input-label">Mobile Number</label>
                    <input 
                      type="tel" 
                      id="student-phone-signup"
                      className="student-email-field"
                      placeholder="Enter your mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  {stepError && (
                    <div className="student-step-error">⚠️ {stepError}</div>
                  )}

                  <button type="submit" className="student-continue-btn" style={{ marginTop: '1rem' }}>
                    Continue
                  </button>
                </form>
                
                <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.92rem', color: '#a1a1aa' }}>
                  Already have an account? <button type="button" onClick={() => handleSwitchTab('login')} style={{ background: 'none', border: 'none', color: '#00e676', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Log In</button>
                </div>
                
                <div className="student-step-indicator">Step 1 of 3</div>
              </div>
            ) : studentStep === 2 ? (
              /* SIGNUP STEP 2: Email & Password */
              <div className="student-step-container animate-fade-in" style={{ paddingTop: '4rem' }}>
                <h1 className="student-step-title" style={{ marginBottom: '1.5rem', whiteSpace: 'nowrap', fontSize: '1.6rem' }}>
                  Enter your email to get started
                </h1>

                <form onSubmit={handleStudentStep2Continue} className="student-step-form">
                  <div className="student-input-group">
                    <label htmlFor="student-email-signup" className="student-input-label">Student Email Address</label>
                    <input 
                      type="email" 
                      id="student-email-signup"
                      className="student-email-field"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="student-input-group">
                    <label htmlFor="student-pass-signup" className="student-input-label">Password</label>
                    <div className="input-wrapper" style={{ display: 'flex' }}>
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        id="student-pass-signup" 
                        placeholder="••••••••"
                        className="student-email-field has-toggle"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                      />
                      <button 
                        type="button" 
                        className="password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <div className="student-input-group">
                    <label htmlFor="student-confpass-signup" className="student-input-label">Confirm Password</label>
                    <div className="input-wrapper" style={{ display: 'flex' }}>
                      <input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        id="student-confpass-signup" 
                        placeholder="••••••••"
                        className="student-email-field has-toggle"
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                      />
                      <button 
                        type="button" 
                        className="password-toggle-btn"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  {/* Invite Code Toggle Link */}
                  <div className="student-invite-toggle-wrap">
                    <button 
                      type="button" 
                      className="student-invite-link"
                      onClick={() => setShowInviteInput(!showInviteInput)}
                    >
                      I have an invite code
                    </button>
                    {showInviteInput && (
                      <div className="student-invite-input-animate">
                        <div style={{ position: 'relative' }}>
                          <input 
                            type="text" 
                            className="student-invite-field"
                            placeholder="Enter your referral / invite code"
                            value={referralId}
                            onChange={async (e) => {
                              const val = e.target.value.toUpperCase();
                              setReferralId(val);
                              if (val.length >= 5) {
                                try {
                                  const res = await fetch('/api/referrals/validate', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ referralId: val })
                                  });
                                  const data = await res.json();
                                  setStepError(data.valid ? '' : data.message);
                                  if (data.valid && data.data?.collegeName) {
                                    setSchoolName(data.data.collegeName);
                                  }
                                } catch {}
                              } else {
                                setStepError('');
                              }
                            }}
                            style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}
                          />
                          {referralId && !stepError && (
                            <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#00e676', fontSize: '1rem' }}>✓</span>
                          )}
                        </div>
                        {stepError && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.4rem', marginBottom: 0 }}>{stepError}</p>}
                        {!stepError && referralId.length >= 5 && schoolName && (
                          <p style={{ color: '#00e676', fontSize: '0.8rem', marginTop: '0.4rem', marginBottom: 0 }}>✓ Valid code for {schoolName}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Checkbox Options */}
                  <div className="student-checkbox-group">
                    <div className="student-checkbox-row" onClick={() => setKeepInLoop(!keepInLoop)}>
                      <div className={`student-radio-icon ${keepInLoop ? 'checked' : ''}`}>
                        <div className="radio-inner-dot"></div>
                      </div>
                      <span className="student-checkbox-label">Keep me in the loop with emails about updates & more</span>
                    </div>
                    <div className="student-checkbox-row" onClick={() => setAgreeTerms(!agreeTerms)}>
                      <div className={`student-radio-icon ${agreeTerms ? 'checked' : ''}`}>
                        <div className="radio-inner-dot"></div>
                      </div>
                      <span className="student-checkbox-label">
                        By clicking Continue, you agree to our <a href="#terms" onClick={(e) => e.stopPropagation()}>Terms of Service</a> & <a href="#privacy" onClick={(e) => e.stopPropagation()}>Privacy Policy</a>
                      </span>
                    </div>
                  </div>

                  {stepError && (
                    <div className="student-step-error">⚠️ {stepError}</div>
                  )}

                  <button type="submit" className="student-continue-btn" style={{ marginTop: '1rem' }}>
                    Continue
                  </button>
                </form>
                
                <div className="student-step-indicator">Step 2 of 3</div>
              </div>
            ) : (
              /* SIGNUP STEP 3: Institution Search */
              <div className="student-step-container animate-fade-in" style={{ paddingTop: '4rem' }}>
                <h1 className="student-step-title" style={{ marginBottom: '0.5rem' }}>
                  Where do you study?
                </h1>
                <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Use the search below to select your institution
                </p>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!schoolName || schoolName.trim() === '') {
                      setStepError('Please select or search your institution to continue.');
                      return;
                    }
                    setStepError('');
                    handleSubmit(e); // This creates the account
                  }} 
                  className="student-step-form"
                >
                  <div className="student-search-input-group" style={{ position: 'relative' }}>
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input 
                      type="text" 
                      className="student-search-field"
                      placeholder="Search your institution"
                      value={schoolName}
                      onChange={(e) => {
                        setSchoolName(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      required
                      autoFocus
                    />
                    {/* Dropdown Menu */}
                    {showSuggestions && (searchSuggestions.length > 0 || isSearching) && (
                      <ul className="institution-dropdown-list">
                        {isSearching ? (
                          <li className="institution-dropdown-item loading">Searching...</li>
                        ) : (
                          searchSuggestions.map((inst, index) => (
                            <li 
                              key={index} 
                              className="institution-dropdown-item"
                              onClick={() => handleSelectInstitution(inst.name)}
                            >
                              <span className="inst-name">{inst.name}</span>
                              {inst.country && <span className="inst-country">{inst.country}</span>}
                            </li>
                          ))
                        )}
                      </ul>
                    )}
                  </div>

                  {stepError && (
                    <div className="student-step-error">
                      ⚠️ {stepError}
                    </div>
                  )}

                  <button type="submit" className="student-continue-btn" style={{ marginTop: '1.5rem' }}>
                    Create Student Account
                  </button>
                </form>
                <div className="student-step-indicator">Step 3 of 3</div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  // Standard View for regular Users & Parents
  return (
    <div className="auth-page-container default-theme">
      <div className="auth-modal-card">
        {/* Back Button */}
        <button 
          className="default-back-btn" 
          onClick={handleClose} 
          aria-label="Go Back"
          style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0.35rem' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        {/* Modal Header */}
        <div className="auth-modal-header" style={{ paddingTop: '2.5rem' }}>
          <div className="logo-brand">
            <Logo size={50} />
          </div>
          <h2 className="auth-title">{getHeaderTitle()}</h2>
          <p className="auth-subtitle">{getHeaderSubtitle()}</p>
        </div>

        {/* Removed Tab Switches */}

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
                placeholder="you@example.com"
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

              <div className="auth-social-buttons-modal">
                <button 
                  type="button" 
                  className="auth-google-btn-modal"
                  onClick={handleGoogleSignIn}
                  style={{ width: '100%' }}
                >
                  <svg className="yho-social-icon" viewBox="0 0 24 24" width="18" height="18">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google</span>
                </button>
              </div>
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
