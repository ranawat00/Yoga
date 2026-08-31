const Referral = require('../../models/Referral');

/**
 * @desc    Validate referral code for student registration
 * @route   POST /api/referrals/validate
 * @access  Public
 */
exports.validateReferralCode = async (req, res, next) => {
  try {
    const { referralId } = req.body;

    if (!referralId) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: 'Please provide a Referral ID'
      });
    }

    const cleanCode = referralId.trim().toUpperCase();
    const referral = await Referral.findOne({ referralCode: cleanCode });

    if (!referral) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: `Invalid Referral ID '${cleanCode}'. Please verify with your institution.`
      });
    }

    if (!referral.isActive) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: `Referral ID '${cleanCode}' is currently deactivated.`
      });
    }

    if (referral.expiryDate && new Date(referral.expiryDate) < new Date()) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: `Referral ID '${cleanCode}' has expired.`
      });
    }

    if (referral.maxUses && referral.usedCount >= referral.maxUses) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: `Referral ID '${cleanCode}' usage limit has been reached.`
      });
    }

    res.status(200).json({
      success: true,
      valid: true,
      message: `Referral ID '${cleanCode}' is valid! (${referral.collegeName})`,
      data: {
        referralCode: referral.referralCode,
        collegeName: referral.collegeName,
        discountPercent: referral.discountPercent
      }
    });
  } catch (error) {
    next(error);
  }
};
