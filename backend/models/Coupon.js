const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Please provide a coupon code'],
    unique: true,
    uppercase: true,
    trim: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'flat'],
    default: 'percentage'
  },
  discountValue: {
    type: Number,
    required: [true, 'Please provide discount percentage or amount']
  },
  minAmount: {
    type: Number,
    default: 0
  },
  maxDiscount: {
    type: Number,
    default: 1000
  },
  usageLimit: {
    type: Number,
    default: 100
  },
  usedCount: {
    type: Number,
    default: 0
  },
  applicableWorkshop: {
    type: String,
    default: 'ALL'
  },
  expiryDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Coupon', couponSchema);
