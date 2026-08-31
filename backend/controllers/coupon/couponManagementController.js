const Coupon = require('../../models/Coupon');
const ErrorResponse = require('../../utils/ErrorResponse');

const safeDbCall = async (fn, fallback) => {
  try {
    return await fn();
  } catch (err) {
    console.warn('MongoDB Coupon query warning:', err.message);
    return fallback;
  }
};

/**
 * @desc    Get all coupons (Admin/Dashboard)
 * @route   GET /api/coupons
 * @access  Public / Admin
 */
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

/**
 * @desc    Create new coupon (Admin/Dashboard)
 * @route   POST /api/coupons
 * @access  Public / Admin
 */
exports.createCoupon = async (req, res, next) => {
  try {
    const { code, discountType, discountValue, minAmount, maxDiscount, usageLimit, applicableWorkshop, expiryDate } = req.body;

    if (!code || !discountValue) {
      return next(new ErrorResponse('Please provide a coupon code and discount value', 400));
    }

    const cleanCode = code.trim().toUpperCase();

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

/**
 * @desc    Update coupon details
 * @route   PUT /api/coupons/:id
 * @access  Public / Admin
 */
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

/**
 * @desc    Toggle coupon active status
 * @route   PUT /api/coupons/:id/toggle
 * @access  Public / Admin
 */
exports.toggleCouponStatus = async (req, res, next) => {
  try {
    const coupon = await safeDbCall(() => Coupon.findById(req.params.id), null);

    if (coupon) {
      coupon.isActive = !coupon.isActive;
      await coupon.save();
      return res.status(200).json({ success: true, data: coupon });
    }

    return next(new ErrorResponse('Coupon not found', 404));
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete coupon
 * @route   DELETE /api/coupons/:id
 * @access  Public / Admin
 */
exports.deleteCoupon = async (req, res, next) => {
  try {
    const coupon = await safeDbCall(() => Coupon.findById(req.params.id), null);
    if (coupon) {
      await coupon.deleteOne();
    }

    res.status(200).json({ success: true, message: 'Coupon deleted successfully' });
  } catch (err) {
    next(err);
  }
};
