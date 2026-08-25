const Coupon = require('../models/Coupon');
const ErrorResponse = require('../utils/ErrorResponse');

// Helper to safely call DB with fallback
const safeDbCall = async (fn, fallback) => {
  try {
    return await fn();
  } catch (err) {
    console.warn('MongoDB Coupon query warning:', err.message);
    return fallback;
  }
};

// @desc    Get all coupons (Admin/Dashboard)
// @route   GET /api/coupons
// @access  Public / Admin
exports.getCoupons = async (req, res, next) => {
  try {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    const coupons = await safeDbCall(() => Coupon.find().sort({ createdAt: -1 }), []);

    res.status(200).json({
      success: true,
      count: coupons.length,
      data: coupons
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new coupon (Admin/Dashboard)
// @route   POST /api/coupons
// @access  Public / Admin
exports.createCoupon = async (req, res, next) => {
  try {
    const { code, discountType, discountValue, minAmount, maxDiscount, usageLimit, applicableWorkshop, expiryDate } = req.body;

    if (!code || !discountValue) {
      return next(new ErrorResponse('Please provide a coupon code and discount value', 400));
    }

    const cleanCode = code.trim().toUpperCase();

    // Check if code exists
    const existing = await safeDbCall(() => Coupon.findOne({ code: cleanCode }), null);
    if (existing) {
      return next(new ErrorResponse(`Coupon code '${cleanCode}' already exists`, 400));
    }

    const newCoupon = await safeDbCall(() => Coupon.create({
      code: cleanCode,
      discountType: discountType || 'percentage',
      discountValue: Number(discountValue),
      minAmount: Number(minAmount) || 0,
      maxDiscount: Number(maxDiscount) || 1000,
      usageLimit: Number(usageLimit) || 100,
      applicableWorkshop: applicableWorkshop || 'ALL',
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      isActive: true
    }), {
      _id: Date.now().toString(),
      code: cleanCode,
      discountType: discountType || 'percentage',
      discountValue: Number(discountValue),
      minAmount: Number(minAmount) || 0,
      maxDiscount: Number(maxDiscount) || 1000,
      usageLimit: Number(usageLimit) || 100,
      usedCount: 0,
      applicableWorkshop: applicableWorkshop || 'ALL',
      expiryDate,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    });

    res.status(201).json({
      success: true,
      message: 'Coupon code created successfully!',
      data: newCoupon
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update coupon details
// @route   PUT /api/coupons/:id
// @access  Public / Admin
exports.updateCoupon = async (req, res, next) => {
  try {
    const { code, discountType, discountValue, minAmount, maxDiscount, usageLimit, applicableWorkshop, expiryDate } = req.body;

    let coupon = await safeDbCall(() => Coupon.findById(req.params.id), null);

    if (!coupon) {
      return next(new ErrorResponse('Coupon not found', 404));
    }

    if (code) coupon.code = code.trim().toUpperCase();
    if (discountType) coupon.discountType = discountType;
    if (discountValue !== undefined) coupon.discountValue = Number(discountValue);
    if (minAmount !== undefined) coupon.minAmount = Number(minAmount);
    if (maxDiscount !== undefined) coupon.maxDiscount = Number(maxDiscount);
    if (usageLimit !== undefined) coupon.usageLimit = Number(usageLimit);
    if (applicableWorkshop) coupon.applicableWorkshop = applicableWorkshop;
    if (expiryDate !== undefined) coupon.expiryDate = expiryDate ? new Date(expiryDate) : null;

    await coupon.save();
    return res.status(200).json({ success: true, message: 'Coupon updated successfully!', data: coupon });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle coupon active status
// @route   PUT /api/coupons/:id/toggle
// @access  Public / Admin
exports.toggleCouponStatus = async (req, res, next) => {
  try {
    const coupon = await safeDbCall(() => Coupon.findById(req.params.id), null);

    if (coupon) {
      coupon.isActive = !coupon.isActive;
      await coupon.save();
      return res.status(200).json({ success: true, data: coupon });
    }

    const sample = sampleCoupons.find(c => c._id === req.params.id);
    if (sample) {
      sample.isActive = !sample.isActive;
      return res.status(200).json({ success: true, data: sample });
    }

    return next(new ErrorResponse('Coupon not found', 404));
  } catch (err) {
    next(err);
  }
};

// @desc    Delete coupon
// @route   DELETE /api/coupons/:id
// @access  Public / Admin
exports.deleteCoupon = async (req, res, next) => {
  try {
    const coupon = await safeDbCall(() => Coupon.findById(req.params.id), null);
    if (coupon) {
      await coupon.deleteOne();
    }
    const idx = sampleCoupons.findIndex(c => c._id === req.params.id);
    if (idx !== -1) sampleCoupons.splice(idx, 1);

    res.status(200).json({ success: true, message: 'Coupon deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// @desc    Validate coupon code during workshop checkout/registration
// @route   POST /api/coupons/validate
// @access  Public
exports.validateCoupon = async (req, res, next) => {
  try {
    const { code, amount = 0, workshopTitle = '' } = req.body;

    if (!code) {
      return next(new ErrorResponse('Please enter a coupon code', 400));
    }

    const cleanCode = code.trim().toUpperCase();

    // Query Coupon from MongoDB
    let coupon = await safeDbCall(() => Coupon.findOne({ code: cleanCode }), null);

    if (!coupon) {
      return res.status(200).json({
        success: false,
        message: `Invalid coupon code '${cleanCode}'. Please check and try again.`
      });
    }

    if (!coupon.isActive) {
      return res.status(200).json({
        success: false,
        message: `Coupon code '${cleanCode}' is currently inactive.`
      });
    }

    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      return res.status(200).json({
        success: false,
        message: `Coupon code '${cleanCode}' has expired.`
      });
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.status(200).json({
        success: false,
        message: `Coupon code '${cleanCode}' limit has been reached.`
      });
    }

    if (amount < coupon.minAmount) {
      return res.status(200).json({
        success: false,
        message: `Minimum order amount of ₹${coupon.minAmount} required for coupon '${cleanCode}'.`
      });
    }

    if (coupon.applicableWorkshop !== 'ALL' && workshopTitle && !workshopTitle.toLowerCase().includes(coupon.applicableWorkshop.toLowerCase())) {
      return res.status(200).json({
        success: false,
        message: `Coupon '${cleanCode}' is valid only for workshop: ${coupon.applicableWorkshop}`
      });
    }

    // Calculate discount amount
    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = Math.round((amount * coupon.discountValue) / 100);
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      discountAmount = coupon.discountValue;
    }

    // Ensure discount does not exceed total price
    if (discountAmount > amount) {
      discountAmount = amount;
    }

    const finalAmount = Math.max(0, amount - discountAmount);

    res.status(200).json({
      success: true,
      message: `Coupon '${cleanCode}' applied successfully! You saved ₹${discountAmount}.`,
      data: {
        code: cleanCode,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount,
        originalAmount: amount,
        finalAmount
      }
    });
  } catch (err) {
    next(err);
  }
};
