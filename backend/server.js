const express = require('express');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const cookieParser = require('cookie-parser');

const app = express();

// Disable ETag caching to ensure API always responds with 200 OK
app.set('etag', false);

// Enable response compression
app.use(compression());

// Enable CORS with dynamic configurations from env
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parser (JSON & URL-encoded payload support with 15MB limit for base64 resumes)
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));
app.use(cookieParser());

// Basic status check route
app.get('/api/status', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Yoga Healers Backend is running' });
});
// Mount routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/coupons', require('./routes/couponRoutes'));
app.use('/api/referrals', require('./routes/referralRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/traffic', require('./routes/trafficRoutes'));
app.use('/api/institutions', require('./routes/institutionRoutes'));
app.use('/api/internships', require('./routes/internshipRoutes'));

const errorHandler = require('./middleware/errorMiddleware');
const ErrorResponse = require('./utils/ErrorResponse');

// 404 Catch-all handler for undefined routes
app.use((req, res, next) => {
  next(new ErrorResponse(`Route not found - ${req.originalUrl}`, 404));
});

// Global error handler middleware
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections without crashing process
process.on('unhandledRejection', (err, promise) => {
  console.error(`[Unhandled Rejection Warning]: ${err ? err.message || err : 'Unknown error'}`);
});
