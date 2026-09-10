import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPayPalOrder, capturePayPalOrder, checkPayPalOrderStatus } from '../../api/payment';
import { PayPalLogo } from './PaymentLogos';

const CardIcon = ({ size = 18, color = '#FFFFFF' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

export default function PayPalButton({
  amount,
  currency = 'USD',
  description = 'Yoga Healers Purchase',
  onSuccess,
  onError,
  onCancel,
  disabled = false,
  onDisabledClick,
  onBeforeRedirect
}) {
  const [activeButton, setActiveButton] = useState(null); // 'paypal' | 'card' | null
  const [errorMessage, setErrorMessage] = useState(null);
  const [checkoutSession, setCheckoutSession] = useState(null); // { orderId, approvalUrl, fundingSource }
  const [isVerifying, setIsVerifying] = useState(false);

  const callbacksRef = useRef({ onSuccess, onError, onCancel, onDisabledClick, onBeforeRedirect });
  const windowCheckTimerRef = useRef(null);
  const handleCaptureRef = useRef(null);
  const isVerifyingRef = useRef(false);

  useEffect(() => {
    callbacksRef.current = { onSuccess, onError, onCancel, onDisabledClick, onBeforeRedirect };
  }, [onSuccess, onError, onCancel, onDisabledClick, onBeforeRedirect]);

  useEffect(() => {
    isVerifyingRef.current = isVerifying;
  }, [isVerifying]);

  // Capture payment after user completes payment on the actual PayPal page
  const handleCapture = useCallback(async (orderId, isSilent = false) => {
    if (isVerifyingRef.current || !orderId) return;
    setIsVerifying(true);
    if (!isSilent) setErrorMessage(null);

    try {
      // 1. First check if order is approved or already completed
      let isReadyToCapture = true;
      try {
        const statusRes = await checkPayPalOrderStatus(orderId);
        if (statusRes && statusRes.success && statusRes.status) {
          if (statusRes.status === 'COMPLETED') {
            if (windowCheckTimerRef.current) clearInterval(windowCheckTimerRef.current);
            setCheckoutSession(null);
            if (callbacksRef.current.onSuccess) {
              callbacksRef.current.onSuccess({
                id: orderId,
                orderId: orderId,
                status: 'COMPLETED',
                details: statusRes.data
              });
            }
            return;
          }
          if (statusRes.status === 'CREATED') {
            isReadyToCapture = false;
          }
        }
      } catch (checkErr) {
        // Continue to capture call
      }

      if (!isReadyToCapture && isSilent) {
        // User hasn't finished approving yet, continue waiting silently
        return;
      }

      // 2. Call capture endpoint
      const captureRes = await capturePayPalOrder(orderId);
      if (!captureRes || !captureRes.success) {
        const errMsg =
          (captureRes && captureRes.error && captureRes.error.details && captureRes.error.details[0] && captureRes.error.details[0].description) ||
          (captureRes && captureRes.message) ||
          'Payment not yet confirmed on PayPal.';

        if (isSilent) {
          return; // Ignore in background polling/focus
        }
        throw new Error(
          errMsg.includes('not yet approved')
            ? 'Payment not yet approved on PayPal. Please complete checkout in the PayPal window, then tap Confirm & Complete.'
            : errMsg
        );
      }

      if (windowCheckTimerRef.current) clearInterval(windowCheckTimerRef.current);
      setCheckoutSession(null);

      if (callbacksRef.current.onSuccess) {
        callbacksRef.current.onSuccess({
          id: captureRes.captureId || orderId,
          orderId: orderId,
          status: captureRes.status || 'COMPLETED',
          details: captureRes.data
        });
      }
    } catch (err) {
      if (!isSilent) {
        console.error('PayPal capture error:', err);
        setErrorMessage(
          err.message || 'Payment not yet confirmed on PayPal. Please complete payment in the PayPal window.'
        );
        if (callbacksRef.current.onError) {
          callbacksRef.current.onError(err);
        }
      }
    } finally {
      setIsVerifying(false);
    }
  }, []);

  useEffect(() => {
    handleCaptureRef.current = handleCapture;
  }, [handleCapture]);

  // Clean up timer and tab focus listener on unmount
  useEffect(() => {
    const onWindowFocus = () => {
      if (checkoutSession && checkoutSession.orderId && !isVerifyingRef.current) {
        // Check silently when user switches back from PayPal tab
        handleCapture(checkoutSession.orderId, true);
      }
    };

    window.addEventListener('focus', onWindowFocus);
    return () => {
      window.removeEventListener('focus', onWindowFocus);
      if (windowCheckTimerRef.current) {
        clearInterval(windowCheckTimerRef.current);
      }
    };
  }, [checkoutSession, handleCapture]);

  // Open the ACTUAL PayPal Sandbox page directly
  const handleOpenActualPayPal = async (fundingSource = 'paypal') => {
    if (disabled) {
      if (callbacksRef.current.onDisabledClick) {
        callbacksRef.current.onDisabledClick();
      }
      return;
    }

    if (activeButton || isVerifying) return;
    setActiveButton(fundingSource);
    setErrorMessage(null);

    // Check if user is in mobile / phone view
    const isMobile =
      typeof window !== 'undefined' &&
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth <= 768);

    let popupWin = null;
    const width = 500;
    const height = 700;
    const left = typeof window !== 'undefined' ? window.screenX + Math.max(0, (window.outerWidth - width) / 2) : 100;
    const top = typeof window !== 'undefined' ? window.screenY + Math.max(0, (window.outerHeight - height) / 2) : 100;

    // Only open popup on desktop; on phone view, we navigate the current mobile viewport
    // so PayPal loads 100% responsive according to the phone screen
    // Open in a normal new tab so the user can easily Inspect (F12) Console & Network
    try {
      popupWin = window.open('about:blank', '_blank');
    } catch (e) {
      console.warn('Tab creation error:', e);
    }

    // Show initial loading screen inside the opened window while the order is generated
    if (popupWin && !popupWin.closed) {
      try {
        popupWin.document.title = 'PayPal Checkout';
        popupWin.document.body.innerHTML = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>PayPal Checkout</title>
            <style>
              body {
                margin: 0;
                padding: 24px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-color: #f7f9fa;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                text-align: center;
                box-sizing: border-box;
              }
              .loader-card {
                background: #ffffff;
                padding: 36px 28px;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                max-width: 380px;
                width: 100%;
              }
              .spinner {
                width: 44px;
                height: 44px;
                border: 4px solid #e0e0e0;
                border-top: 4px solid #0070ba;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
                margin: 0 auto 20px;
              }
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              h3 { margin: 0 0 10px; color: #003087; font-size: 20px; font-weight: 700; }
              p { margin: 0; color: #687173; font-size: 14px; line-height: 1.5; }
            </style>
          </head>
          <body>
            <div class="loader-card">
              <div class="spinner"></div>
              <h3>Connecting to PayPal...</h3>
              <p>Please wait while we open your secure PayPal Sandbox checkout.</p>
            </div>
          </body>
          </html>
        `;
      } catch (e) {
        // Cross-domain or write error ignored
      }
    }

    try {
      const formattedAmount = parseFloat(amount || 0).toFixed(2);
      if (parseFloat(formattedAmount) <= 0) {
        throw new Error('Invalid payment amount');
      }

      // STEP 2: Create order on backend (official PayPal Sandbox REST API v2)
      const res = await createPayPalOrder(formattedAmount, currency);
      if (!res || !res.success || !res.orderId) {
        throw new Error((res && res.message) || 'Failed to initialize PayPal order');
      }

      const orderId = res.orderId;
      let actualPayPalUrl = res.approvalUrl || `https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`;
      if (fundingSource === 'card') {
        actualPayPalUrl += '&fundingSource=card';
      }

      // Trigger before-redirect hook to preserve pending registration/order data
      if (callbacksRef.current.onBeforeRedirect) {
        callbacksRef.current.onBeforeRedirect();
      }

      // STEP 3: Navigate to the ACTUAL PayPal Sandbox URL
      if (isMobile) {
        // Direct navigation in the current phone viewport guarantees PayPal renders 100% responsive to phone view
        window.location.href = actualPayPalUrl;
        return;
      }

      if (popupWin && !popupWin.closed) {
        popupWin.location.href = actualPayPalUrl;
        popupWin.focus();
      } else {
        // Fallback: If popup was suppressed, navigate directly
        window.location.href = actualPayPalUrl;
      }

      // STEP 4: Store active checkout session
      setCheckoutSession({ orderId, approvalUrl: actualPayPalUrl, fundingSource });

      // STEP 5: Watch for window close or return redirect: auto-capture
      if (popupWin) {
        if (windowCheckTimerRef.current) clearInterval(windowCheckTimerRef.current);
        windowCheckTimerRef.current = setInterval(() => {
          try {
            // If window was closed by user or after redirect: attempt capture
            if (popupWin.closed) {
              clearInterval(windowCheckTimerRef.current);
              if (handleCaptureRef.current) {
                handleCaptureRef.current(orderId, false);
              }
              return;
            }

            // If popup redirected back to our domain after PayPal approval
            try {
              if (
                popupWin.location &&
                popupWin.location.href &&
                (popupWin.location.href.includes('paypal_status=') ||
                  popupWin.location.href.includes('token='))
              ) {
                popupWin.close();
                clearInterval(windowCheckTimerRef.current);
                if (handleCaptureRef.current) {
                  handleCaptureRef.current(orderId, false);
                }
                return;
              }
            } catch (crossOriginErr) {
              // Ignore cross-origin error while on sandbox.paypal.com
            }
          } catch (e) {
            // error
          }
        }, 1200);
      }
    } catch (err) {
      if (popupWin && !popupWin.closed) {
        popupWin.close();
      }
      console.error('PayPal open error:', err);
      setErrorMessage(err.message || 'Could not connect to PayPal Sandbox. Please try again.');
      if (callbacksRef.current.onError) {
        callbacksRef.current.onError(err);
      }
    } finally {
      setActiveButton(null);
    }
  };

  return (
    <div
      className="paypal-smart-button-wrapper"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none'
      }}
    >
      {/* Error Notice */}
      {errorMessage && (
        <div
          style={{
            padding: '10px 14px',
            background: '#FFF5F5',
            border: '1px solid #FEB2B2',
            borderRadius: '8px',
            color: '#C53030',
            fontSize: '0.84rem',
            lineHeight: 1.4,
            textAlign: 'center',
            boxShadow: '0 2px 6px rgba(197, 48, 48, 0.08)'
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* Active PayPal Session Status (shown when the actual PayPal page is open) */}
      {checkoutSession && (
        <div
          style={{
            padding: '12px 14px',
            background: '#F0F7FD',
            border: '1px solid #BEE3F8',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            textAlign: 'center',
            animation: 'fadeIn 0.2s ease-in-out'
          }}
        >
          <div style={{ fontSize: '0.86rem', color: '#2B6CB0', fontWeight: 700 }}>
            ⏳ Actual PayPal checkout page is open.
          </div>
          <p style={{ margin: 0, fontSize: '0.78rem', color: '#4A5568', lineHeight: 1.4 }}>
            Complete your payment in PayPal, then return here to complete:
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => handleCapture(checkoutSession.orderId, false)}
              disabled={isVerifying}
              style={{
                flex: 1,
                minHeight: '40px',
                padding: '8px 12px',
                background: '#0079C1',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: isVerifying ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              {isVerifying ? (
                <>
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#FFFFFF',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }}
                  />
                  <span>Verifying...</span>
                </>
              ) : (
                '✓ Confirm & Complete'
              )}
            </button>
            <a
              href={checkoutSession.approvalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 12px',
                background: '#EDF2F7',
                color: '#4A5568',
                border: '1px solid #CBD5E0',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.82rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap'
              }}
            >
              Reopen PayPal ↗
            </a>
          </div>
        </div>
      )}

      {/* 1. ACTUAL YELLOW PAYPAL BUTTON */}
      <button
        type="button"
        id="paypal-button-yellow"
        onClick={() => handleOpenActualPayPal('paypal')}
        disabled={activeButton !== null || isVerifying}
        style={{
          width: '100%',
          minHeight: '46px',
          height: '46px',
          padding: '0 16px',
          background: '#FFC439',
          color: '#003087',
          border: 'none',
          borderRadius: '8px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.65 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
          transition: 'background 0.15s ease',
          touchAction: 'manipulation',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          if (!disabled) e.currentTarget.style.background = '#F2BA32';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#FFC439';
        }}
      >
        {activeButton === 'paypal' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(0, 48, 135, 0.25)',
                borderTopColor: '#003087',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }}
            />
            <span>Opening Actual PayPal Page...</span>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PayPalLogo height={24} />
          </div>
        )}
      </button>

      {/* 2. ACTUAL BLACK "DEBIT OR CREDIT CARD" BUTTON */}
      <button
        type="button"
        id="paypal-button-black"
        onClick={() => handleOpenActualPayPal('card')}
        disabled={activeButton !== null || isVerifying}
        style={{
          width: '100%',
          minHeight: '46px',
          height: '46px',
          padding: '0 16px',
          background: '#2C2E2F',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '8px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.65 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)',
          fontWeight: 600,
          fontSize: '0.92rem',
          transition: 'background 0.15s ease',
          touchAction: 'manipulation',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          if (!disabled) e.currentTarget.style.background = '#1E1F20';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#2C2E2F';
        }}
      >
        {activeButton === 'card' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255, 255, 255, 0.25)',
                borderTopColor: '#FFFFFF',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }}
            />
            <span>Opening Actual PayPal Card Page...</span>
          </div>
        ) : (
          <>
            <CardIcon size={18} color="#FFFFFF" />
            <span>Debit or Credit Card</span>
          </>
        )}
      </button>

      {/* Footer Branding */}
      <div
        style={{
          marginTop: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          fontSize: '0.72rem',
          color: '#718096'
        }}
      >
        <span>Powered by</span>
        <span style={{ fontWeight: 800, fontStyle: 'italic', color: '#003087' }}>
          Pay<span style={{ color: '#0079C1' }}>Pal</span>
        </span>
        <span>• Sandbox</span>
      </div>
    </div>
  );
}
