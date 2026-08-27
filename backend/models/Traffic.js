const mongoose = require('mongoose');

const trafficSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: [true, 'Page name is required'],
      trim: true
    },
    path: {
      type: String,
      default: '/'
    },
    visitorId: {
      type: String,
      required: true,
      index: true
    },
    device: {
      type: String,
      enum: ['Desktop', 'Mobile', 'Tablet'],
      default: 'Desktop'
    },
    ip: {
      type: String,
      default: '127.0.0.1'
    },
    userAgent: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Index for fast analytics queries
trafficSchema.index({ createdAt: -1 });
trafficSchema.index({ page: 1, createdAt: -1 });

module.exports = mongoose.model('Traffic', trafficSchema);
