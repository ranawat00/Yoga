const Registration = require('../models/Registration');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc    Create new registration and save in DB
// @route   POST /api/registrations
// @access  Public
exports.createRegistration = async (req, res, next) => {
  try {
    const { name, phone, email, batch, workshopTitle, countryCode, city, source, couponCode } = req.body;

    if (!name || !phone) {
      return next(new ErrorResponse('Please provide your name and phone number', 400));
    }

    const registration = await Registration.create({
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@yogahealers.org`,
      batch: batch || 'Morning Batch (6:00 AM - 7:15 AM IST)',
      workshopTitle: workshopTitle || '5 Days Online Live Yoga Workshop',
      countryCode: countryCode || '+91',
      city: city || '',
      source: source || 'Website Registration Modal',
      couponCode: couponCode || ''
    });

    res.status(201).json({
      success: true,
      message: 'Registration saved successfully in database!',
      data: registration
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all registrations
// @route   GET /api/registrations
// @access  Public / Admin
exports.getRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete registration by ID
// @route   DELETE /api/registrations/:id
// @access  Public / Admin
exports.deleteRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return next(new ErrorResponse(`Registration not found with id of ${req.params.id}`, 404));
    }

    await registration.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
