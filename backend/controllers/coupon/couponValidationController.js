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
 * @desc    Validate coupon code during workshop checkout/registration
 * @route   POST /api/coupons/validate
 * @access  Public
 */
exports.validateCoupon = async (req, res, next) => {
  try {
    const { code, amount = 0, workshopTitle = '' } = req.body;

    if (!code) {
      return next(new ErrorResponse('Please enter a coupon code', 400));
    }

    const cleanCode = code.trim().toUpperCase();

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

    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = Math.round((amount * coupon.discountValue) / 100);
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      discountAmount = coupon.discountValue;
    }

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
