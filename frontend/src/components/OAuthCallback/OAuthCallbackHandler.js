import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { setUser } from '../../redux/slices/authSlice';
import { setView, addNotification } from '../../redux/slices/uiSlice';

/**
 * OAuthCallbackHandler
 * Mounts invisibly on the Home page and listens for Google OAuth
 * token fragments in the URL hash (e.g. /#access_token=...).
 * 
 * If the token is found → tries to fetch user info and log them in.
 * Cleans the URL hash after processing.
 */
const OAuthCallbackHandler = () => {
  const dispatch = useAppDispatch();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || !hash.includes('access_token=')) return;

    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const accessToken = params.get('access_token');
    const errorParam = params.get('error');

    // Clean the URL hash immediately so it doesn't persist on refresh
    window.history.replaceState(null, '', window.location.pathname);

    if (errorParam) {
      setError('Google sign-in was cancelled or failed. Please try again.');
      dispatch(addNotification({ message: 'Google sign-in cancelled.', type: 'error' }));
      setTimeout(() => dispatch(setView('login')), 2500);
      return;
    }

    if (!accessToken) return;

    setProcessing(true);

    // Fetch Google user info using the access token
    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(res => res.json())
      .then(async (profile) => {
        if (!profile.email) throw new Error('No email from Google');

        // Call our backend to create/login the user via Google
        const backendRes = await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: profile.email,
            name: profile.name || profile.email.split('@')[0],
            googleId: profile.sub,
            picture: profile.picture
          })
        });

        const data = await backendRes.json();

        if (data.success) {
          localStorage.setItem('token', data.token);
          if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
          dispatch(setUser(data.user));
          dispatch(setView('home'));
          dispatch(addNotification({ message: `Welcome, ${data.user.name}! 🎉`, type: 'success' }));
        } else {
          setError(data.message || 'Google sign-in failed. Please try again.');
          dispatch(addNotification({ message: data.message || 'Google sign-in failed.', type: 'error' }));
          setTimeout(() => dispatch(setView('login')), 3000);
        }
      })
      .catch((err) => {
        console.error('Google OAuth error:', err);
        setError('Failed to sign in with Google. Please try again.');
        dispatch(addNotification({ message: 'Google sign-in failed. Please try again.', type: 'error' }));
        setTimeout(() => dispatch(setView('login')), 3000);
      })
      .finally(() => setProcessing(false));
  }, [dispatch]);

  if (!processing && !error) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#050508',
      backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,230,118,0.1) 0%, transparent 60%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '2rem 1.5rem',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        {/* Google Logo */}
        <div style={{
          width: 56, height: 56,
          borderRadius: '16px',
          background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          flexShrink: 0,
        }}>
          <svg viewBox="0 0 24 24" width="30" height="30">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
        </div>

        {processing ? (
          <>
            {/* Spinner */}
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '3.5px solid rgba(0,230,118,0.15)',
              borderTopColor: '#00e676',
              animation: 'spin 0.85s linear infinite',
              flexShrink: 0,
            }} />
            <p style={{ color: '#ffffff', fontSize: 'clamp(1rem, 4vw, 1.15rem)', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
              Signing you in with Google...
            </p>
            <p style={{ color: '#71717a', fontSize: 'clamp(0.8rem, 3.5vw, 0.9rem)', margin: 0 }}>
              Please wait a moment
            </p>
          </>
        ) : error ? (
          <>
            <div style={{ fontSize: 'clamp(2rem, 8vw, 2.5rem)' }}>⚠️</div>
            <p style={{ color: '#ffffff', fontSize: 'clamp(0.95rem, 4vw, 1.05rem)', fontWeight: 700, margin: 0, lineHeight: 1.4 }}>
              {error}
            </p>
            <p style={{ color: '#71717a', fontSize: 'clamp(0.78rem, 3vw, 0.85rem)', margin: 0 }}>
              Redirecting you back to login...
            </p>
            <button
              onClick={() => { setError(null); dispatch(setView('login')); }}
              style={{
                marginTop: '0.5rem',
                background: 'linear-gradient(135deg, #00e676, #00b09b)',
                border: 'none',
                borderRadius: '12px',
                color: '#000',
                fontWeight: 800,
                padding: 'clamp(0.6rem, 2.5vw, 0.75rem) clamp(1.25rem, 5vw, 1.75rem)',
                fontSize: 'clamp(0.88rem, 3.5vw, 0.95rem)',
                cursor: 'pointer',
                boxShadow: '0 0 24px rgba(0,230,118,0.35)',
                width: '100%',
                maxWidth: '260px',
                transition: 'transform 0.15s ease',
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              ← Back to Login
            </button>
          </>
        ) : null}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default OAuthCallbackHandler;
