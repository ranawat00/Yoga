const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  batch: {
    type: String,
    default: 'Morning Batch (6:00 AM - 7:15 AM ET)'
  },
  workshopTitle: {
    type: String,
    default: '5 Days Online Live Yoga Workshop'
  },
  countryCode: {
    type: String,
    default: '+91'
  },
  city: {
    type: String,
    default: ''
  },
  source: {
    type: String,
    default: 'Website Registration Modal'
  },
  couponCode: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['REGISTERED', 'CONTACTED', 'COMPLETED', 'CANCELLED'],
    default: 'REGISTERED'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Registration', registrationSchema);
