const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  age: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['General', 'Workshop', 'Order', 'Collaboration'],
    default: 'General'
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);
