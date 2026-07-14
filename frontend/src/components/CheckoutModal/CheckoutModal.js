import './CheckoutModal.css';
import React, { useState } from 'react';
import Logo from '../Logo/Logo';
import { useApp } from '../../context/AppContext';
import { createOrder, verifyPayment } from '../../api/payment';
import { createOrderRecord } from '../../api/orders';

// Dynamic script loader for Razorpay Checkout
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutModal() {
  const { 
    setIsCheckoutOpen, 
    handleCheckoutSuccess, 
    addNotification,
    cartItems 
  } = useApp();

  const onClose = () => setIsCheckoutOpen(false);
  const onCheckoutSuccess = handleCheckoutSuccess;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'UPI'
  });

  const [orderRef, setOrderRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Receipt/Success states
  const [orderedItems, setOrderedItems] = useState([]);
  const [orderTotals, setOrderTotals] = useState({ subtotal: 0, shipping: 0, gst: 0, total: 0 });
  const [orderDate, setOrderDate] = useState('');

  // Price calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 50; // free shipping above 1000
  const gst = Math.round(subtotal * 0.05); // 5% Satvic tax
  const total = subtotal + shipping + gst;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Validate Step 1
      if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
        addNotification('Please fill in all delivery details.', 'error');
        return;
      }
      // Simple format check
      if (formData.phone.replace(/\D/g, '').length < 10) {
        addNotification('Please enter a valid 10-digit mobile number.', 'error');
        return;
      }
      if (formData.pincode.replace(/\D/g, '').length < 6) {
        addNotification('Please enter a valid 6-digit pincode.', 'error');
        return;
      }
      setStep(2);
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Capture snapshot for receipt display
    setOrderedItems([...cartItems]);
    setOrderTotals({ subtotal, shipping, gst, total });
    setOrderDate(new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }));

    const orderPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      items: cartItems.map(item => ({
        product: {
          id: item.product.id || item.product._id,
          title: item.product.title,
          price: item.product.price,
          image: item.product.image || ''
        },
        quantity: item.quantity
      })),
      subtotal,
      shipping,
      gst,
      total
    };

    if (formData.paymentMethod === 'COD') {
      const generatedRef = 'YH-COD-' + Math.floor(100000 + Math.random() * 900000);
      try {
        const orderRes = await createOrderRecord({
          ...orderPayload,
          paymentMethod: 'COD',
          paymentId: generatedRef
        });
        if (orderRes.success) {
          setOrderRef(generatedRef);
          setStep(3); // Success Screen
          onCheckoutSuccess(); // Clear Cart items
          addNotification(`Order placed successfully! Reference ID: ${generatedRef}`, 'success');
        } else {
          addNotification(orderRes.message || 'Failed to place order. Please try again.', 'error');
        }
      } catch (err) {
        console.error(err);
        addNotification(err.message || 'Error placing order.', 'error');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      try {
        const res = await createOrder(total);
        if (!res.success) {
          addNotification(res.message || 'Failed to create payment order', 'error');
          setIsSubmitting(false);
          return;
        }

        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          addNotification('Failed to load payment gateway. Please check your internet connection.', 'error');
          setIsSubmitting(false);
          return;
        }

        const options = {
          key: 'rzp_test_T4Zv42O4gEwCJD',
          amount: res.amount,
          currency: res.currency,
          name: 'Yoga Healers',
          description: 'Purchase Satvic Products & Healing Guides',
          order_id: res.orderId,
          handler: async function (response) {
            try {
              // Verify payment on the backend
              const verification = await verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              });

              if (verification.success) {
                const orderRes = await createOrderRecord({
                  ...orderPayload,
                  paymentMethod: formData.paymentMethod,
                  paymentId: response.razorpay_payment_id
                });

                if (orderRes.success) {
                  setOrderRef(response.razorpay_payment_id);
                  setStep(3); // Go to Success Screen
                  onCheckoutSuccess(); // Clear cart
                  addNotification('Payment successful! Your order has been placed.', 'success');
                } else {
                  addNotification(orderRes.message || 'Payment verified but failed to save order details.', 'error');
                }
              } else {
                addNotification(verification.message || 'Payment verification failed. Please contact support.', 'error');
              }
            } catch (err) {
              console.error(err);
              addNotification(err.message || 'Error verifying payment.', 'error');
            } finally {
              setIsSubmitting(false);
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          notes: {
            address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
          },
          theme: {
            color: '#1f3a52',
          },
          modal: {
            ondismiss: function () {
              setIsSubmitting(false);
              addNotification('Payment cancelled.', 'info');
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error('Payment initialization failed:', error);
        addNotification('Could not initialize payment gateway. Please try again.', 'error');
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="checkout-modal-content animate-checkout-scale" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        {step !== 3 && (
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}

        <div className={`checkout-layout-grid ${step === 3 ? 'success-layout' : ''}`}>
          {/* Left Pane: Forms */}
          <div className="checkout-form-pane">
            <div className="checkout-header">
              <h2>Checkout</h2>
              
              {/* Stepper indicators */}
              <div className="checkout-steps-container">
                <div className="checkout-steps-bar">
                  <div className="checkout-steps-line" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
                </div>
                <div className="checkout-steps">
                  <div className={`checkout-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                    {step > 1 ? '✓' : '1'}
                  </div>
                  <div className={`checkout-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                    {step > 2 ? '✓' : '2'}
                  </div>
                  <div className={`checkout-step ${step === 3 ? 'active' : ''}`}>
                    {step === 3 ? '✓' : '3'}
                  </div>
                </div>
              </div>
              <div className="checkout-steps-labels">
                <span className={step === 1 ? 'label-active' : ''}>Shipping</span>
                <span className={step === 2 ? 'label-active' : ''}>Payment</span>
                <span className={step === 3 ? 'label-active' : ''}>Confirmation</span>
              </div>
            </div>

            {/* Step 1: Address Details */}
            {step === 1 && (
              <div className="checkout-step-body fade-in-step">
                <h3 className="pane-section-title">Shipping Details</h3>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="chk-name">Full Name</label>
                  <input
                    id="chk-name"
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="e.g. Amit Sharma"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="chk-email">Email Address</label>
                    <input
                      id="chk-email"
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="chk-phone">Mobile Number</label>
                    <input
                      id="chk-phone"
                      type="tel"
                      name="phone"
                      className="form-control"
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="chk-address">Shipping Address</label>
                  <input
                    id="chk-address"
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="House / Apartment no, Building, Street"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="chk-city">City</label>
                    <input
                      id="chk-city"
                      type="text"
                      name="city"
                      className="form-control"
                      placeholder="e.g. Bengaluru"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="chk-pincode">Pincode</label>
                    <input
                      id="chk-pincode"
                      type="text"
                      name="pincode"
                      className="form-control"
                      placeholder="6-digit code"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="checkout-pane-actions">
                  <button type="button" className="checkout-btn-back" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="button" className="checkout-btn-next" onClick={handleNextStep}>
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Details */}
            {step === 2 && (
              <form onSubmit={handlePlaceOrder} className="checkout-step-body fade-in-step">
                <h3 className="pane-section-title">Select Payment Method</h3>
                
                <div className="payment-options-grid">
                  {/* UPI */}
                  <label className={`payment-option-card ${formData.paymentMethod === 'UPI' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      checked={formData.paymentMethod === 'UPI'}
                      onChange={handleInputChange}
                      className="payment-radio"
                    />
                    <div className="payment-card-content">
                      <div className="payment-card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                          <line x1="12" y1="18" x2="12.01" y2="18"></line>
                        </svg>
                      </div>
                      <div className="payment-card-info">
                        <span className="payment-method-name">UPI / GPay / PhonePe</span>
                        <span className="payment-method-desc">Instant digital transfer</span>
                      </div>
                    </div>
                  </label>

                  {/* Card */}
                  <label className={`payment-option-card ${formData.paymentMethod === 'CARD' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="CARD"
                      checked={formData.paymentMethod === 'CARD'}
                      onChange={handleInputChange}
                      className="payment-radio"
                    />
                    <div className="payment-card-content">
                      <div className="payment-card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                          <line x1="2" y1="10" x2="22" y2="10"></line>
                        </svg>
                      </div>
                      <div className="payment-card-info">
                        <span className="payment-method-name">Credit / Debit Card</span>
                        <span className="payment-method-desc">Visa, Mastercard, RuPay</span>
                      </div>
                    </div>
                  </label>

                  {/* COD */}
                  <label className={`payment-option-card ${formData.paymentMethod === 'COD' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === 'COD'}
                      onChange={handleInputChange}
                      className="payment-radio"
                    />
                    <div className="payment-card-content">
                      <div className="payment-card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                          <circle cx="12" cy="12" r="2"></circle>
                          <path d="M6 12h.01M18 12h.01"></path>
                        </svg>
                      </div>
                      <div className="payment-card-info">
                        <span className="payment-method-name">Cash on Delivery</span>
                        <span className="payment-method-desc">Pay cash/digital at door</span>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Conditional Form Render based on Payment Choice */}
                <div className="payment-details-form animate-fade-in">
                  {formData.paymentMethod === 'UPI' && (
                    <div className="cod-info-container">
                      <div className="cod-info-icon">⚡</div>
                      <div className="cod-info-text">
                        <strong>UPI Payment via Razorpay</strong>
                        <p>Pay instantly using GPay, PhonePe, Paytm, or any UPI app via the secure Razorpay gateway.</p>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'CARD' && (
                    <div className="cod-info-container">
                      <div className="cod-info-icon">💳</div>
                      <div className="cod-info-text">
                        <strong>Credit / Debit Card via Razorpay</strong>
                        <p>Pay securely using Visa, Mastercard, RuPay, or Maestro card via the secure Razorpay gateway.</p>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'COD' && (
                    <div className="cod-info-container">
                      <div className="cod-info-icon">💡</div>
                      <div className="cod-info-text">
                        <strong>Cash on Delivery selected.</strong>
                        <p>You can pay via cash or using any UPI scanner (GPay, Paytm, etc.) directly to the delivery executive. Please keep exact amount ready if paying by cash.</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="checkout-pane-actions">
                  <button type="button" className="checkout-btn-back" onClick={handleBackStep}>
                    Back
                  </button>
                  <button type="submit" className="checkout-btn-next" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="submitting-spinner-container">
                        <span className="spinner-loader"></span>
                        Processing...
                      </span>
                    ) : (
                      `Pay ₹${total.toLocaleString()}`
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Success Screen */}
            {step === 3 && (
              <div className="checkout-success-view fade-in-step">
                <div className="success-checkmark-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                
                <h3 className="success-title">Order Placed Successfully!</h3>
                <p className="success-description">
                  Thank you, <strong>{formData.name}</strong>. Your satvic products and healing guides are registered. We have sent the confirmation invoice to <strong>{formData.email}</strong>.
                </p>

                {/* Professional Invoice Receipt */}
                <div className="invoice-receipt-wrapper">
                  <div className="receipt-header">
                    <div className="receipt-brand">
                      <Logo variant="full" size={22} />
                    </div>
                    <div className="receipt-meta">
                      <span className="receipt-title">ORDER INVOICE</span>
                      <span className="receipt-date">{orderDate}</span>
                    </div>
                  </div>

                  <div className="receipt-info-grid">
                    <div className="info-block">
                      <span className="info-label">Customer Details</span>
                      <span className="info-val"><strong>{formData.name}</strong></span>
                      <span className="info-val">{formData.phone}</span>
                      <span className="info-val">{formData.email}</span>
                    </div>
                    <div className="info-block">
                      <span className="info-label">Shipping Destination</span>
                      <span className="info-val">{formData.address}</span>
                      <span className="info-val">{formData.city} - {formData.pincode}</span>
                    </div>
                    <div className="info-block">
                      <span className="info-label">Payment & Reference</span>
                      <span className="info-val">Method: <strong>{formData.paymentMethod}</strong></span>
                      <span className="info-val">Ref: <strong className="ref-color">{orderRef}</strong></span>
                      <span className="info-val">Status: <span className="status-pill">Paid / COD Pending</span></span>
                    </div>
                  </div>

                  <div className="receipt-items-table">
                    <div className="table-header-row">
                      <span>Item Description</span>
                      <span style={{ textAlign: 'center' }}>Qty</span>
                      <span style={{ textAlign: 'right' }}>Amount</span>
                    </div>
                    
                    <div className="table-body">
                      {orderedItems.map((item) => (
                        <div key={item.product.id} className="table-item-row">
                          <span className="table-item-title">{item.product.title}</span>
                          <span className="table-item-qty">{item.quantity}</span>
                          <span className="table-item-price">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="receipt-tear-line"></div>

                    <div className="receipt-pricing-breakdown">
                      <div className="pricing-row">
                        <span>Items Subtotal</span>
                        <span>₹{orderTotals.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="pricing-row">
                        <span>Satvic GST (5%)</span>
                        <span>₹{orderTotals.gst.toLocaleString()}</span>
                      </div>
                      <div className="pricing-row">
                        <span>Shipping Fee</span>
                        <span>{orderTotals.shipping === 0 ? 'FREE' : `₹${orderTotals.shipping}`}</span>
                      </div>
                      <div className="receipt-divider-dark"></div>
                      <div className="pricing-row grand-total-row">
                        <span>Grand Total Paid</span>
                        <span>₹{orderTotals.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Barcode Mockup */}
                  <div className="receipt-barcode-section">
                    <div className="barcode-bars">
                      {Array.from({ length: 42 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="barcode-line" 
                          style={{ 
                            width: i % 5 === 0 ? '3px' : i % 3 === 0 ? '1px' : i % 2 === 0 ? '2px' : '1.5px',
                            marginRight: i % 4 === 0 ? '2px' : '1px'
                          }}
                        />
                      ))}
                    </div>
                    <span className="barcode-number">{orderRef}</span>
                  </div>
                </div>

                <div className="success-delivery-notice">
                  📦 Your items are hand-packaged using zero-plastic biodegradable materials. Expect delivery within 3-5 working days.
                </div>

                <div className="success-actions-row">
                  <button type="button" className="btn-print-receipt" onClick={() => window.print()}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                      <polyline points="6 9 6 2 18 2 18 9"></polyline>
                      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                      <rect x="6" y="14" width="12" height="8"></rect>
                    </svg>
                    Print Invoice
                  </button>
                  <button type="button" className="btn-success-close" onClick={onClose}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Pane: Order Summary */}
          {step !== 3 && (
            <div className="checkout-summary-pane">
              <h3 className="summary-pane-title">Order Summary</h3>
              
              <div className="summary-items-list">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="summary-item-row">
                    <div className="summary-item-img-wrapper">
                      {item.product.image ? (
                        <img src={item.product.image} alt={item.product.title} />
                      ) : (
                        <div className="summary-item-icon-fallback">🌿</div>
                      )}
                      <span className="summary-item-qty-badge">{item.quantity}</span>
                    </div>
                    <div className="summary-item-meta">
                      <span className="summary-item-name">{item.product.title}</span>
                      <span className="summary-item-price-each">₹{item.product.price} each</span>
                    </div>
                    <div className="summary-item-total">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}

                {cartItems.length === 0 && (
                  <div className="summary-empty-state">
                    Your cart is empty.
                  </div>
                )}
              </div>

              {/* Promo Code Input */}
              <div className="promo-code-container">
                <input type="text" className="form-control promo-input" placeholder="Promo code" />
                <button type="button" className="btn-promo-apply">Apply</button>
              </div>

              {/* Price Details Breakdown */}
              <div className="summary-pricing-table">
                <div className="pricing-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="pricing-row">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'shipping-free' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="pricing-row">
                  <span>GST (5%)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>
                <div className="pricing-divider"></div>
                <div className="pricing-row total-row">
                  <span>Total Amount</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="checkout-trust-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>SSL Encrypted Secure Connection</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
