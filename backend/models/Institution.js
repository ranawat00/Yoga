const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  country: {
    type: String,
    default: 'India',
    trim: true
  },
  domain: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Index for faster searching by name
institutionSchema.index({ name: 'text' });

const Institution = mongoose.model('Institution', institutionSchema);

module.exports = Institution;
