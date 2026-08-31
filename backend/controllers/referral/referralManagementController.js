const Referral = require('../../models/Referral');
const ErrorResponse = require('../../utils/ErrorResponse');

const disableCache = (res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
};

/**
 * @desc    Get all referral codes (Admin / Dashboard)
 * @route   GET /api/referrals
 * @access  Public / Admin
 */
exports.getReferralCodes = async (req, res, next) => {
  disableCache(res);
  try {
    const referrals = await Referral.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: referrals.length,
      data: referrals
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new referral code (Admin / Dashboard)
 * @route   POST /api/referrals
 * @access  Public / Admin
 */
exports.createReferralCode = async (req, res, next) => {
  try {
    const { referralCode, collegeName, createdFor, discountPercent, maxUses, expiryDate } = req.body;

    if (!referralCode) {
      return next(new ErrorResponse('Please provide a referral code', 400));
    }

    const cleanCode = referralCode.trim().toUpperCase();

    const existing = await Referral.findOne({ referralCode: cleanCode });
    if (existing) {
      return next(new ErrorResponse(`Referral Code '${cleanCode}' already exists`, 400));
    }

    const newReferral = await Referral.create({
      referralCode: cleanCode,
      collegeName: collegeName ? collegeName.trim() : 'General',
      createdFor: createdFor ? createdFor.trim() : 'Student',
      discountPercent: discountPercent !== undefined ? Number(discountPercent) : 10,
      maxUses: maxUses !== undefined ? Number(maxUses) : 100,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      isActive: true
    });

    res.status(201).json({
      success: true,
      message: `Referral Code '${cleanCode}' created successfully!`,
      data: newReferral
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle referral code status (Active / Inactive)
 * @route   PUT /api/referrals/:id/toggle
 * @access  Public / Admin
 */
exports.toggleReferralStatus = async (req, res, next) => {
  try {
    const referral = await Referral.findById(req.params.id);

    if (!referral) {
      return next(new ErrorResponse('Referral code not found', 404));
    }

    referral.isActive = !referral.isActive;
    await referral.save();

    res.status(200).json({
      success: true,
      message: `Referral code status updated to ${referral.isActive ? 'Active' : 'Inactive'}`,
      data: referral
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete referral code
 * @route   DELETE /api/referrals/:id
 * @access  Public / Admin
 */
exports.deleteReferralCode = async (req, res, next) => {
  try {
    const referral = await Referral.findById(req.params.id);

    if (!referral) {
      return next(new ErrorResponse('Referral code not found', 404));
    }

    await referral.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Referral code deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
