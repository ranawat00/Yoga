import React, { useState, useEffect } from 'react';
import './CouponModal.css';

const CouponModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    minAmount: '0',
    maxDiscount: '1000',
    usageLimit: '100',
    applicableWorkshop: 'ALL',
    expiryDate: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || '',
        discountType: initialData.discountType || 'percentage',
        discountValue: initialData.discountValue || '',
        minAmount: initialData.minAmount || '0',
        maxDiscount: initialData.maxDiscount || '1000',
        usageLimit: initialData.usageLimit || '100',
        applicableWorkshop: initialData.applicableWorkshop || 'ALL',
        expiryDate: initialData.expiryDate ? new Date(initialData.expiryDate).toISOString().split('T')[0] : ''
      });
    } else {
      setFormData({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        minAmount: '0',
        maxDiscount: '1000',
        usageLimit: '100',
        applicableWorkshop: 'ALL',
        expiryDate: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.code || !formData.discountValue) {
      setError('Please fill in required fields (Coupon Code & Discount Value)');
      return;
    }

    setLoading(true);
    setError('');

    const isEdit = Boolean(initialData && (initialData._id || initialData.id));
    const url = isEdit ? `/api/coupons/${initialData._id || initialData.id}` : '/api/coupons';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const json = await response.json();

      if (json.success) {
        onSave(json.data, isEdit);
        onClose();
      } else {
        setError(json.message || 'Failed to save coupon code');
      }
    } catch (err) {
      setError('Error connecting to backend server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="coupon-modal-card">
        <div className="modal-header">
          <h3>{initialData ? 'Edit Coupon Code' : 'Create New Coupon Code'}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {error && <div className="modal-error">{error}</div>}

        <form onSubmit={handleSubmit} className="coupon-form">
          <div className="form-group">
            <label>Coupon Code *</label>
            <input
              type="text"
              name="code"
              placeholder="e.g. YOGA50 or HEALTH200"
              value={formData.code}
              onChange={handleChange}
              style={{ textTransform: 'uppercase' }}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Discount Type</label>
              <select name="discountType" value={formData.discountType} onChange={handleChange}>
                <option value="percentage">Percentage (%)</option>
                <option value="flat">Flat Amount (₹)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Discount Value *</label>
              <input
                type="number"
                name="discountValue"
                placeholder={formData.discountType === 'percentage' ? 'e.g. 20 (for 20%)' : 'e.g. 200 (for ₹200)'}
                value={formData.discountValue}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Min Order Amount (₹)</label>
              <input
                type="number"
                name="minAmount"
                value={formData.minAmount}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Max Discount (₹)</label>
              <input
                type="number"
                name="maxDiscount"
                value={formData.maxDiscount}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Usage Limit (Uses)</label>
              <input
                type="number"
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Applicable Workshop</label>
              <select name="applicableWorkshop" value={formData.applicableWorkshop} onChange={handleChange}>
                <option value="ALL">ALL Workshops</option>
                <option value="Hormonal Balance & Weight Loss">Hormonal Balance & Weight Loss</option>
                <option value="5-Day Daily Yoga Together">5-Day Daily Yoga Together</option>
                <option value="Stress Release & Mindfulness">Stress Release & Mindfulness</option>
                <option value="Chakra & Prana Healing">Chakra & Prana Healing</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Expiry Date (Optional)</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Saving...' : initialData ? 'Update Coupon' : 'Generate Coupon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponModal;
