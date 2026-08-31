import React, { useEffect } from 'react';
import './YHOClubPage.css';
import Logo from '../../common/Logo/Logo';
import MediaLogos from '../../components/MediaLogos/MediaLogos';
import { useApp } from '../../hooks/useApp';

export default function YHOClubPage() {
  const { setIsAuthOpen, setAuthRole, handleSocialAuth } = useApp();

  // Listen for Google OAuth callback responses or popup messages
  useEffect(() => {
    // 1. Check if current window received Google token in URL hash
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
              // Clear hash from URL
              window.history.replaceState(null, null, window.location.pathname);
            }
          })
          .catch((err) => console.error('Error fetching Google user:', err));
      }
    }

    // 2. Listen for postMessage sent from Google OAuth popup window
    const handleMessage = async (event) => {
      if (event.data && event.data.type === 'GOOGLE_AUTH_SUCCESS' && event.data.user) {
        const { email, name, sub } = event.data.user;
        await handleSocialAuth('google', {
          email,
          name,
          id: sub
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleSocialAuth]);

  const handleGoogleSignIn = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '651592002683-v97jd6mn9ha5g16ve8iv4jg3q340cv07.apps.googleusercontent.com';
    
    if (clientId) {
      const redirectUri = encodeURIComponent(`${window.location.origin}`);
      const scope = encodeURIComponent('openid profile email');
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}&prompt=select_account`;
      
      // Device-responsive viewport and userAgent check
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 640;
      
      if (isMobile) {
        // Direct redirect on mobile devices to prevent popup blocking and screen overflow/clip issues
        window.location.href = googleAuthUrl;
      } else {
        // Centered responsive popup for desktop and tablet screens
        const width = Math.min(500, Math.floor(window.innerWidth * 0.9));
        const height = Math.min(650, Math.floor(window.innerHeight * 0.9));
        const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
        const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);
        
        window.open(googleAuthUrl, 'GoogleSignIn', `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,status=1`);
      }
    }
  };

  const handleFacebookSignIn = () => {
    const appId = process.env.REACT_APP_FACEBOOK_APP_ID;
    
    if (appId) {
      const redirectUri = encodeURIComponent(`${window.location.origin}/yho-club`);
      const fbAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=email,public_profile`;
      
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 640;
      
      if (isMobile) {
        window.location.href = fbAuthUrl;
      } else {
        const width = Math.min(500, Math.floor(window.innerWidth * 0.9));
        const height = Math.min(650, Math.floor(window.innerHeight * 0.9));
        const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
        const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);
        
        window.open(fbAuthUrl, 'FacebookSignIn', `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,status=1`);
      }
    } else {
      const userEmail = prompt('Enter your Facebook Account email address:', 'user@facebook.com');
      if (userEmail) {
        const nameParts = userEmail.split('@')[0].split('.');
        const formattedName = nameParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
        
        handleSocialAuth('facebook', {
          email: userEmail,
          name: formattedName,
          id: `facebook_${Date.now()}`
        });
      }
    }
  };

  const handleStudentLogin = () => {
    setAuthRole('student');
    setIsAuthOpen(true);
  };

  const handleParentLogin = () => {
    setAuthRole('parent');
    setIsAuthOpen(true);
  };

  return (
    <div className="yho-club-page">
      {/* Ambient Background Glows */}
      <div className="yho-bg-glow-top"></div>
      <div className="yho-bg-glow-center"></div>

      <div className="yho-club-container">
        {/* Brand Logo inside glass badge */}
        <div className="yho-logo-wrapper">
          <div className="yho-logo-glass-badge">
            <Logo size={90} />
          </div>
        </div>

        {/* Header Text Section */}
        <div className="yho-header">
          <div className="yho-welcome-pill">
            <span className="yho-welcome-text">WELCOME TO</span>
          </div>
          <h1 className="yho-main-title">YHO Club</h1>
          <h2 className="yho-sub-tagline">BE GENTLE WITH YOUR JOURNEY</h2>
        </div>

        {/* Primary Action Buttons */}
        <div className="yho-actions-group">
          <button 
            className="yho-btn yho-btn-student" 
            onClick={handleStudentLogin}
          >
            <div className="btn-content-inner">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
              </svg>
              <span>STUDENT LOG IN</span>
            </div>
          </button>
          
          <button 
            className="yho-btn yho-btn-parent" 
            onClick={handleParentLogin}
          >
            <div className="btn-content-inner">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>PARENTS LOG IN</span>
            </div>
          </button>
        </div>

        {/* Social Sign Up / Log In Buttons */}
        <div className="yho-social-group">
          <div className="yho-social-divider">
            <span>OR SIGN UP WITH</span>
          </div>
          <div className="yho-social-buttons">
            <button 
              className="yho-social-btn yho-btn-google" 
              onClick={handleGoogleSignIn}
            >
              <svg className="yho-social-icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>

            <button 
              className="yho-social-btn yho-btn-facebook" 
              onClick={handleFacebookSignIn}
            >
              <svg className="yho-social-icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>
          </div>
        </div>

        {/* Inspirational Safe Space Quote Card */}
        <div className="yho-quote-card">
          <span className="yho-quote-icon">“</span>
          <p className="yho-safe-space-quote">
            In this safe space, your story matters, your feelings are valid, and we are truly listening
          </p>
        </div>
      </div>

      {/* As Featured On: MediaLogos component */}
      <div className="yho-media-logos-wrapper">
        <MediaLogos />
      </div>
    </div>
  );
}
