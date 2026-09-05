const InternshipApplication = require('../../models/InternshipApplication');

// @desc    Submit a new internship application
// @route   POST /api/internships/apply
// @access  Public
const submitApplication = async (req, res, next) => {
  try {
    const { name, phone, city, applyFor, resume } = req.body;

    if (!name || !phone || !city || !applyFor) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (name, phone, city, applyFor)'
      });
    }

    const application = await InternshipApplication.create({
      name,
      phone,
      city,
      applyFor,
      resume
    });

    res.status(201).json({
      success: true,
      message: 'Internship application submitted successfully!',
      data: application
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all internship applications
// @route   GET /api/internships
// @access  Public / Admin
const getApplications = async (req, res, next) => {
  try {
    const applications = await InternshipApplication.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update internship application status
// @route   PATCH /api/internships/:id/status
// @access  Admin
const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const application = await InternshipApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Internship application not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: application
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an internship application
// @route   DELETE /api/internships/:id
// @access  Admin
const deleteApplication = async (req, res, next) => {
  try {
    const application = await InternshipApplication.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Internship application not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication
};
