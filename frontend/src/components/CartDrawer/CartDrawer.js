import './CartDrawer.css';
import React from 'react';
import { useApp } from '../../context/AppContext';

export default function CartDrawer() {
  const { 
    cartItems, 
    setIsCartOpen, 
    handleUpdateQuantity, 
    handleRemoveCartItem, 
    setIsCheckoutOpen 
  } = useApp();

  const onClose = () => setIsCartOpen(false);
  const onUpdateQuantity = handleUpdateQuantity;
  const onRemoveItem = handleRemoveCartItem;
  const onProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 500 ? 0 : 49;
  const gst = Math.round(subtotal * 0.05); // 5% GST for food/wellness items
  const grandTotal = subtotal + deliveryFee + gst;

  return (
    <>
      {/* Background Overlay */}
      <div className="cart-drawer-overlay" onClick={onClose}></div>

      {/* Slide-out Panel */}
      <div className="cart-drawer">
        <div className="cart-header">
          <h2>Your Cart ({cartItems.length})</h2>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart drawer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <div className="cart-empty-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p>Your shopping cart is empty</p>
              <button className="btn btn-blue" onClick={onClose} style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-icon">
                  {item.product.image ? (
                    <img src={item.product.image} alt={item.product.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px' }}>
                      {item.product.icon}
                    </div>
                  )}
                </div>
                
                <div className="cart-item-info">
                  <span className="cart-item-title">{item.product.title}</span>
                  <span className="cart-item-price">₹{item.product.price}</span>
                </div>

                <div className="cart-item-actions">
                  <button 
                    className="quantity-btn" 
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span style={{ fontWeight: 'bold', minWidth: '15px', textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  <button 
                    className="quantity-btn" 
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                  >
                    +
                  </button>

                  <button 
                    className="cart-item-remove" 
                    onClick={() => onRemoveItem(item.product.id)}
                    aria-label="Remove item"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-totals">
              <div className="cart-total-row">
                <span>Items Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="cart-total-row">
                <span>GST (5%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="cart-total-row">
                <span>Delivery Charges</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              {deliveryFee > 0 && (
                <div style={{ fontSize: '0.75rem', color: 'var(--color-blue)', fontStyle: 'italic', textAlign: 'right' }}>
                  Add ₹{500 - subtotal} more for FREE delivery!
                </div>
              )}
              <div className="cart-total-row grand-total">
                <span>Total Amount</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <button 
              className="btn btn-blue" 
              onClick={onProceedToCheckout}
              style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
            >
              Proceed to Checkout
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
