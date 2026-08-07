import './OrdersPage.css';
import React, { useState, useEffect } from 'react';
import { useApp } from '../../hooks/useApp';
import { fetchMyOrders } from '../../api/orders';

import detoxImg from '../../assets/workshops/workshop_detox.webp';
import meditationImg from '../../assets/workshops/workshop_meditation.webp';
import cookingImg from '../../assets/workshops/workshop_cooking.webp';
import bookQuickEasyImg from '../../assets/books/book_quick_easy.webp';
import bookCombo4Img from '../../assets/books/book_combo_4.webp';
import bookCombo3Img from '../../assets/books/book_combo_3.webp';
import bookSatvic1Img from '../../assets/books/book_satvic_1.webp';
import enemaImg from '../../assets/products/product_enema.webp';
import sproutImg from '../../assets/products/product_sprout.webp';
import neemCombImg from '../../assets/products/product_neem_comb.webp';
import copperBottleImg from '../../assets/products/product_copper_bottle.webp';
import teaImg from '../../assets/products/product_tea.webp';

const getProductImage = (productId) => {
  switch (productId) {
    case 'detox-21': return detoxImg;
    case 'mind-7': return meditationImg;
    case 'cook-3': return cookingImg;
    case 'book-quick-easy': return bookQuickEasyImg;
    case 'book-combo-4': return bookCombo4Img;
    case 'book-combo-3': return bookCombo3Img;
    case 'book-satvic-1': return bookSatvic1Img;
    case 'enema-kit': return enemaImg;
    case 'sprout-kit': return sproutImg;
    case 'neem-comb': return neemCombImg;
    case 'copper-bottle': return copperBottleImg;
    case 'herbal-tea': return teaImg;
    default: return null;
  }
};

export default function OrdersPage() {
  const { setView, user } = useApp();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setView('home');
      return;
    }

    const loadOrders = async () => {
      setLoading(true);
      try {
        const res = await fetchMyOrders();
        if (res.success) {
          setOrders(res.orders);
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user, setView]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'N/A';
    }
  };

  return (
    <div className="orders-page">
      <div className="orders-page-header">
        <div className="orders-page-header-container">
          <button className="back-btn" onClick={() => {
            setView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </button>
          <h1>Your Order History</h1>
          <p>Track all your Satvic books, cleansing tools, and holistic healing workshop bookings in one place.</p>
        </div>
      </div>

      <div className="orders-page-body">
        <div className="orders-container">
          {loading ? (
            <div className="orders-page-loading">
              <div className="orders-page-spinner"></div>
              <p>Fetching your order records...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="orders-page-list">
              {orders.map((order) => (
                <div key={order._id} className="order-page-card">
                  {/* Order Meta Header */}
                  <div className="order-page-card-header">
                    <div className="header-left">
                      <span className="order-ref-number">Order ID: <strong>{order.paymentId}</strong></span>
                      <span className="order-date-time">{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="header-right">
                      <span className="order-payment-badge success">PAID</span>
                    </div>
                  </div>

                  {/* Order Details Body */}
                  <div className="order-page-card-body">
                    {/* Items Purchased List */}
                    <div className="order-body-items">
                      <h4>Items Ordered {order.items ? `(${order.items.reduce((total, item) => total + (item.quantity || 0), 0)})` : ''}</h4>
                      <div className="order-items-grid">
                        {(order.items || []).map((item, idx) => {
                          const product = item.product || {};
                          const img = product.id ? getProductImage(product.id) : null;
                          const price = product.price || 0;
                          return (
                            <div key={idx} className="order-item-detail-row">
                              <div className="item-img-wrapper">
                                {img ? (
                                  <img loading="lazy" src={img} alt={product.title || 'Product'} />
                                ) : (
                                  <div className="item-img-placeholder">🌱</div>
                                )}
                              </div>
                              <div className="item-desc-col">
                                <span className="item-title">{product.title || 'Wellness Product'}</span>
                                <span className="item-qty-price">
                                  Quantity: <strong>{item.quantity || 0}</strong> • ₹{(price || 0).toLocaleString()} each
                                </span>
                              </div>
                              <div className="item-total-col">
                                <span>₹{((price || 0) * (item.quantity || 0)).toLocaleString()}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
 
                    {/* Delivery & Shipping Info */}
                    <div className="order-body-delivery">
                      <h4>Delivery Address</h4>
                      <div className="delivery-address-box">
                        <p className="delivery-name"><strong>{order.name || ''}</strong></p>
                        <p className="delivery-phone">📞 {order.phone || ''}</p>
                        <p className="delivery-text">{order.address || ''}</p>
                        <p className="delivery-city">{order.city || ''} - {order.pincode || ''}</p>
                      </div>
                      
                      <div className="delivery-payment-meta">
                        <p>Payment Method: <strong>{order.paymentMethod || ''}</strong></p>
                        <p>Reference: <code className="ref-code">{(order.paymentId || '').substring(0, 18)}...</code></p>
                      </div>
                    </div>
                  </div>
 
                  {/* Summary / Invoice Totals Footer */}
                  <div className="order-page-card-footer">
                    <div className="invoice-row">
                      <span>Subtotal</span>
                      <span>₹{(order.subtotal || 0).toLocaleString()}</span>
                    </div>
                    <div className="invoice-row">
                      <span>GST (5%)</span>
                      <span>₹{(order.gst || 0).toLocaleString()}</span>
                    </div>
                    <div className="invoice-row">
                      <span>Shipping</span>
                      <span>{(order.shipping || 0) === 0 ? 'FREE' : `₹${(order.shipping || 0).toLocaleString()}`}</span>
                    </div>
                    <div className="invoice-row grand-total-row">
                      <span>Grand Total</span>
                      <span>₹{(order.total || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="orders-page-empty">
              <div className="empty-icon-large">📦</div>
              <h2>No Orders Found</h2>
              <p>You haven't placed any orders yet. Explore our Satvic shop to begin your healing journey.</p>
              <button className="btn btn-blue btn-large" onClick={() => {
                setView('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>
                Shop Organic Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
