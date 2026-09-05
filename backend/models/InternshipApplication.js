const mongoose = require('mongoose');

const internshipApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  applyFor: {
    type: String,
    required: [true, 'Applied position is required'],
    trim: true
  },
  resume: {
    fileName: { type: String, default: '' },
    fileType: { type: String, default: '' },
    fileData: { type: String, default: '' } // Base64 Data URI string for download
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Shortlisted', 'Rejected'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('InternshipApplication', internshipApplicationSchema);
