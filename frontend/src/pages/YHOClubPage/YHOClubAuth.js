import React, { useState, useEffect, useRef } from 'react';
import './YHOClubAuth.css';
import { useApp } from '../../hooks/useApp';
import { searchInstitutionsAPI } from '../../api/institutions';

export default function YHOClubAuth() {
  const { 
    handleSocialAuth, 
    handleLogin, 
    handleSignup 
  } = useApp();

  const [isLogin, setIsLogin] = useState(true);
  const [studentStep, setStudentStep] = useState(1); // 1: Personal Info, 2: Credentials, 3: Search Institute

  // Step 1: Name, Student ID / Roll No, Phone
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [phone, setPhone] = useState('');

  // Step 2: Email, Password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Step 3: School / University Search, Referral
  const [schoolName, setSchoolName] = useState('');
  const [referralId, setReferralId] = useState('');

  // Institution auto-complete state
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeoutRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Debounced Institution Search for Step 3
  useEffect(() => {
    if (!isLogin && studentStep === 3 && schoolName.trim().length >= 1 && showSuggestions) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      searchTimeoutRef.current = setTimeout(async () => {
        setIsSearching(true);
        const results = await searchInstitutionsAPI(schoolName);
        setSearchSuggestions(results);
        setIsSearching(false);
      }, 300);
    } else {
      setSearchSuggestions([]);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [schoolName, isLogin, studentStep, showSuggestions]);

  const handleSelectInstitution = (instName) => {
    setSchoolName(instName);
    setShowSuggestions(false);
  };

  // Google OAuth callback listener
  useEffect(() => {
    if (window.location.hash && window.location.hash.includes('access_token=')) {
      const params = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = params.get('access_token');
      if (accessToken) {
        fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`)
          .then((res) => res.json())
          .then((googleUser) => {
            if (window.opener) {
              window.opener.postMessage(
                { type: 'GOOGLE_AUTH_SUCCESS', user: googleUser },
                '*'
              );
              window.close();
            } else {
              handleSocialAuth('google', {
                email: googleUser.email,
                name: googleUser.name,
                id: googleUser.sub
              });
              window.history.replaceState(null, null, window.location.pathname);
            }
          })
          .catch((err) => console.error('Error fetching Google user:', err));
      }
    }

    const handleMessage = (event) => {
      if (event.data && event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        const googleUser = event.data.user;
        handleSocialAuth('google', {
          email: googleUser.email,
          name: googleUser.name,
          id: googleUser.sub
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleSocialAuth]);

  // Social Sign-in handlers
  const handleGoogleSignIn = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '1029384756-dummyclientid.apps.googleusercontent.com';
    const redirectUri = window.location.origin;
    const scope = encodeURIComponent('email profile openid');
    const responseType = 'token';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&prompt=select_account`;

    // Mark that Google auth was initiated from YHO Club so we redirect back after OAuth
    sessionStorage.setItem('yho_google_auth', 'true');

    // Full-page redirect — no popup window
    window.location.href = authUrl;
  };

  const handleFacebookSignIn = () => {
    if (window.FB) {
      window.FB.login((response) => {
        if (response.authResponse) {
          window.FB.api('/me', { fields: 'name,email,picture' }, (userInfo) => {
            handleSocialAuth('facebook', userInfo);
          });
        }
      }, { scope: 'public_profile,email' });
    } else {
      const fallbackUser = {
        name: 'Student Member',
        email: 'student.member@example.com',
        id: 'fb_' + Date.now()
      };
      handleSocialAuth('facebook', fallbackUser);
    }
  };

  // Step 1 Validation -> Proceed to Step 2
  const handleStep1Next = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!studentId.trim()) {
      setErrorMsg('Please enter your Student ID or Roll Number.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMsg('Please enter a valid contact phone number.');
      return;
    }

    setStudentStep(2);
  };

  // Step 2 Validation -> Proceed to Step 3
  const handleStep2Next = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please provide a valid student email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setStudentStep(3);
  };

  // Submission handler for either Login or final Step 3 Sign Up
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (isLogin) {
      if (!email.trim() || !password) {
        setErrorMsg('Please enter your student email and password.');
        return;
      }

      setIsLoading(true);
      try {
        await handleLogin(email, password, 'student');
      } catch (err) {
        console.error(err);
        setErrorMsg(err.message || 'Login failed. Please check your student credentials.');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Sign Up Step 3 submission
    if (!schoolName.trim()) {
      setErrorMsg('Please search and select or enter your College or University name.');
      return;
    }

    setIsLoading(true);

    try {
      await handleSignup(
        name, 
        email, 
        password, 
        'student', 
        schoolName, 
        studentId, 
        referralId, 
        '', 
        phone
      );
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="yho-club-page-wrapper">
      {/* Ambient Background Glow Elements */}
      <div className="yho-bg-glow-orb orb-top-left"></div>
      <div className="yho-bg-glow-orb orb-bottom-right"></div>

      {/* Main Card Content Container */}
      <div className="yho-club-card">
        {/* Brand Logo Header */}
        <div className="yho-logo-brand-block">
          <div className="yho-brand-top">
            <span className="yho-brand-text">YH</span>
            <span className="yho-brand-target-o">
              <span className="target-outer-ring"></span>
              <span className="target-inner-dot"></span>
            </span>
          </div>
          <div className="yho-brand-bottom">
            CLUB
          </div>
        </div>

        {/* Main Body Content Container */}
        <div className="yho-card-content-body">
          <h2 className="yho-card-headline">
            {isLogin 
              ? 'Log In to Student Portal' 
              : studentStep === 1 
              ? 'Step 1: Student Information' 
              : studentStep === 2 
              ? 'Step 2: Account Credentials' 
              : 'Step 3: Search Your Institute'}
          </h2>
          <p className="yho-card-subtext">
            {isLogin 
              ? 'Enter your credentials to access your student portal' 
              : 'In this safe space, your story matters, your feelings are valid, and we are truly listening'}
          </p>

          {/* Registration 3-Step Indicator */}
          {!isLogin && (
            <div className="yho-step-indicator-bar">
              <div className={`yho-step-pill ${studentStep === 1 ? 'active' : studentStep > 1 ? 'completed' : ''}`}>
                <span className="yho-step-dot">1</span> Details
              </div>
              <span className="yho-step-arrow">›</span>
              <div className={`yho-step-pill ${studentStep === 2 ? 'active' : studentStep > 2 ? 'completed' : ''}`}>
                <span className="yho-step-dot">2</span> Login Info
              </div>
              <span className="yho-step-arrow">›</span>
              <div className={`yho-step-pill ${studentStep === 3 ? 'active' : ''}`}>
                <span className="yho-step-dot">3</span> Institute
              </div>
            </div>
          )}

          {/* Social Sign-In Buttons */}
          {isLogin && (
            <>
              <div className="yho-social-options-list">
                <button 
                  type="button" 
                  className="yho-social-option-btn"
                  onClick={handleGoogleSignIn}
                >
                  <svg className="social-icon-svg" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button 
                  type="button" 
                  className="yho-social-option-btn"
                  onClick={handleFacebookSignIn}
                >
                  <svg className="social-icon-svg" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Continue with Facebook</span>
                </button>
              </div>

              <div className="yho-divider-line">
                <span>or</span>
              </div>
            </>
          )}

          {errorMsg && (
            <div className="yho-inline-error-alert" style={{ marginBottom: '1rem', width: '100%' }}>
              {errorMsg}
            </div>
          )}

          {/* LOGIN FORM */}
          {isLogin ? (
            <form onSubmit={handleFinalSubmit} className="yho-form-group">
              <div className="yho-field-block">
                <label className="yho-field-label">Student Email Address *</label>
                <input 
                  type="email" 
                  className="yho-text-input" 
                  placeholder="student@example.com"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>

              <div className="yho-field-block">
                <label className="yho-field-label">Password *</label>
                <input 
                  type="password" 
                  className="yho-text-input" 
                  placeholder="••••••••"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="yho-cyan-submit-btn" 
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In to Student Portal'}
              </button>
            </form>
          ) : (
            /* MULTI-STEP SIGN UP FORM */
            <div className="yho-form-group">
              {/* STEP 1: Details */}
              {studentStep === 1 && (
                <form onSubmit={handleStep1Next} className="yho-form-group">
                  <div className="yho-field-block">
                    <label className="yho-field-label">Student Full Name *</label>
                    <input 
                      type="text" 
                      className="yho-text-input" 
                      placeholder="e.g. Rahul Sharma" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="yho-field-block">
                    <label className="yho-field-label">Student ID / Roll Number *</label>
                    <input 
                      type="text" 
                      className="yho-text-input" 
                      placeholder="e.g. STU-98214" 
                      value={studentId} 
                      onChange={(e) => setStudentId(e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="yho-field-block">
                    <label className="yho-field-label">Phone Number *</label>
                    <input 
                      type="tel" 
                      className="yho-text-input" 
                      placeholder="+91 9876543210" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      required 
                    />
                  </div>

                  <button type="submit" className="yho-cyan-submit-btn">
                    Continue to Step 2 →
                  </button>
                </form>
              )}

              {/* STEP 2: Login Info */}
              {studentStep === 2 && (
                <form onSubmit={handleStep2Next} className="yho-form-group">
                  <div className="yho-field-block">
                    <label className="yho-field-label">Student Email Address *</label>
                    <input 
                      type="email" 
                      className="yho-text-input" 
                      placeholder="student@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="yho-field-block">
                    <label className="yho-field-label">Choose Password *</label>
                    <input 
                      type="password" 
                      className="yho-text-input" 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                    />
                    <p className="yho-input-hint-text">
                      Min. 6 characters. Must contain number or symbol.
                    </p>
                  </div>

                  <div className="yho-step-nav-buttons">
                    <button 
                      type="button" 
                      className="yho-step-back-btn"
                      onClick={() => { setErrorMsg(''); setStudentStep(1); }}
                    >
                      ← Back
                    </button>
                    <button 
                      type="submit" 
                      className="yho-cyan-submit-btn"
                      style={{ marginTop: 0 }}
                    >
                      Continue to Step 3 →
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Search Institute */}
              {studentStep === 3 && (
                <form onSubmit={handleFinalSubmit} className="yho-form-group">
                  <div className="yho-field-block" style={{ position: 'relative' }}>
                    <label className="yho-field-label">Search College / University / Institute *</label>
                    <input 
                      type="text" 
                      className="yho-text-input" 
                      placeholder="Type to search institute..." 
                      value={schoolName} 
                      onChange={(e) => {
                        setSchoolName(e.target.value);
                        setShowSuggestions(true);
                      }} 
                      onFocus={() => setShowSuggestions(true)}
                      required 
                    />
                    {isSearching && (
                      <div className="yho-input-spinner">Searching...</div>
                    )}
                    {showSuggestions && searchSuggestions.length > 0 && (
                      <ul className="yho-suggestions-list">
                        {searchSuggestions.map((inst, index) => (
                          <li 
                            key={index} 
                            onClick={() => handleSelectInstitution(inst.name || inst)}
                          >
                            {inst.name || inst}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="yho-field-block">
                    <label className="yho-field-label">Referral Code (Optional)</label>
                    <input 
                      type="text" 
                      className="yho-text-input" 
                      placeholder="e.g. YHO-REF-2026" 
                      value={referralId} 
                      onChange={(e) => setReferralId(e.target.value)} 
                    />
                  </div>

                  <div className="yho-step-nav-buttons">
                    <button 
                      type="button" 
                      className="yho-step-back-btn"
                      onClick={() => { setErrorMsg(''); setStudentStep(2); }}
                    >
                      ← Back
                    </button>
                    <button 
                      type="submit" 
                      className="yho-cyan-submit-btn" 
                      disabled={isLoading}
                      style={{ marginTop: 0 }}
                    >
                      {isLoading ? 'Creating Account...' : 'Complete Sign Up'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Toggle between Log In and Sign Up */}
          <div className="yho-card-footer-row">
            <span>{isLogin ? "Don't have an account? " : "Already a member? "}</span>
            <button 
              type="button" 
              className="yho-toggle-mode-link" 
              onClick={() => {
                setIsLogin(!isLogin);
                setStudentStep(1);
                setErrorMsg('');
              }}
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
