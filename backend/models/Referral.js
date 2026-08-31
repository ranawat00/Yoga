const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema({
  referralCode: {
    type: String,
    required: [true, 'Please add a referral code'],
    unique: true,
    trim: true,
    uppercase: true
  },
  collegeName: {
    type: String,
    trim: true,
    default: 'General'
  },
  createdFor: {
    type: String,
    trim: true,
    default: 'Student'
  },
  discountPercent: {
    type: Number,
    default: 10
  },
  maxUses: {
    type: Number,
    default: 100
  },
  usedCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expiryDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Referral', ReferralSchema);
