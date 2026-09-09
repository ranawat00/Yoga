import React, { useState, useRef, useEffect } from 'react';
import { RazorpayIcon } from './PaymentLogos';
import { createOrder, verifyPayment } from '../../api/payment';

/**
 * Dynamically loads Razorpay Checkout script
 */
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const scriptId = 'razorpay-checkout-script';
    const existing = document.getElementById(scriptId);
    if (existing) {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
      setTimeout(() => {
        if (window.Razorpay) resolve(true);
      }, 500);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay Checkout SDK');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export default function RazorpayButton({
  amount,
  currency = 'INR',
  description = 'Yoga Healers Purchase',
  prefill = {},
  notes = {},
  onSuccess,
  onError,
  onDismiss,
  disabled = false,
  text,
  style = {}
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const callbacksRef = useRef({ onSuccess, onError, onDismiss });
  useEffect(() => {
    callbacksRef.current = { onSuccess, onError, onDismiss };
  });

  const handleRazorpayCheckout = async () => {
    if (disabled || isProcessing) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const numAmount = parseFloat(amount || 0);
      if (numAmount <= 0) {
        throw new Error('Invalid payment amount');
      }

      // 1. Create order on backend
      const res = await createOrder(numAmount, currency);
      if (!res || !res.success) {
        throw new Error((res && res.message) || 'Failed to initialize payment order');
      }

      // 2. Load script
      const scriptReady = await loadRazorpayScript();
      if (!scriptReady || !window.Razorpay) {
        throw new Error('Could not connect to Razorpay checkout. Please check internet connection.');
      }

      // 3. Launch Razorpay Checkout modal
      const keyId = process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_T4Zv42O4gEwCJD';
      const options = {
        key: keyId,
        amount: res.amount,
        currency: res.currency || currency,
        name: 'Yoga Healers',
        description: description.slice(0, 127),
        order_id: res.orderId,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verification = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verification && verification.success) {
              if (callbacksRef.current.onSuccess) {
                callbacksRef.current.onSuccess(response);
              }
            } else {
              const msg = (verification && verification.message) || 'Payment verification failed.';
              setErrorMessage(msg);
              if (callbacksRef.current.onError) {
                callbacksRef.current.onError(new Error(msg));
              }
            }
          } catch (err) {
            console.error('Razorpay verification error:', err);
            setErrorMessage(err.message || 'Error verifying payment signature');
            if (callbacksRef.current.onError) {
              callbacksRef.current.onError(err);
            }
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: prefill.name || '',
          email: prefill.email || '',
          contact: prefill.phone || prefill.contact || ''
        },
        notes: notes || {},
        theme: {
          color: '#0C2340'
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            if (callbacksRef.current.onDismiss) {
              callbacksRef.current.onDismiss();
            }
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Razorpay payment error:', err);
      setErrorMessage(err.message || 'Payment could not be started. Please try again.');
      setIsProcessing(false);
      if (callbacksRef.current.onError) {
        callbacksRef.current.onError(err);
      }
    }
  };

  const formattedAmount = currency === 'USD' 
    ? `$${parseFloat(amount || 0).toFixed(2)}`
    : `₹${parseFloat(amount || 0).toLocaleString()}`;

  const buttonLabel = text || `Pay with Razorpay (${formattedAmount})`;

  return (
    <div className="razorpay-smart-button-wrapper" style={{ width: '100%' }}>
      {errorMessage && (
        <div style={{
          padding: '8px 12px',
          background: '#FFF5F5',
          border: '1px solid #FEB2B2',
          borderRadius: '6px',
          color: '#C53030',
          fontSize: '0.82rem',
          marginBottom: '8px',
          textAlign: 'center'
        }}>
          {errorMessage}
        </div>
      )}

      <button
        type="button"
        onClick={handleRazorpayCheckout}
        disabled={disabled || isProcessing}
        style={{
          width: '100%',
          minHeight: '44px',
          padding: '10px 18px',
          background: disabled 
            ? '#A0AEC0' 
            : isProcessing 
              ? '#0A1B2F' 
              : 'linear-gradient(135deg, #0C2340 0%, #002970 55%, #0B72E7 100%)',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '0.94rem',
          cursor: disabled || isProcessing ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          boxShadow: disabled ? 'none' : '0 4px 12px rgba(12, 35, 64, 0.25)',
          transition: 'all 0.2s ease',
          opacity: disabled ? 0.65 : 1,
          ...style
        }}
      >
        {isProcessing ? (
          <>
            <div
              style={{
                width: '18px',
                height: '18px',
                border: '2px solid rgba(255, 255, 255, 0.35)',
                borderTopColor: '#FFFFFF',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }}
            />
            <span>Connecting to Razorpay...</span>
          </>
        ) : (
          <>
            <RazorpayIcon size={22} />
            <span>{buttonLabel}</span>
          </>
        )}
      </button>

      <div style={{
        marginTop: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        fontSize: '0.72rem',
        color: '#718096'
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span>Secured by Razorpay • UPI, Cards & NetBanking</span>
      </div>
    </div>
  );
}
