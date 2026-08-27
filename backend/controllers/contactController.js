const Contact = require('../models/Contact');

const disableCache = (res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
};

// @desc    Submit a new contact inquiry
// @route   POST /api/contact
// @access  Public
exports.createContactSubmission = async (req, res) => {
  disableCache(res);
  try {
    const { name, email, phone, age, city, category, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (name, email, phone, message).'
      });
    }

    const newContact = await Contact.create({
      name,
      email,
      phone,
      age: age || '',
      city: city || '',
      category: category || 'General',
      message
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully.',
      data: newContact
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting form',
      error: error.message
    });
  }
};

// @desc    Get all contact inquiries for Dashboard
// @route   GET /api/contact
// @access  Public (or Admin)
exports.getContactSubmissions = async (req, res) => {
  disableCache(res);
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    const formattedData = contacts.map((c, index) => ({
      id: `MSG-${1000 + index}`,
      _id: c._id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      age: c.age || '-',
      city: c.city || '-',
      category: c.category || 'General',
      message: c.message,
      status: c.status || 'Pending',
      date: c.createdAt ? new Date(c.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      time: c.createdAt ? new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''
    }));

    res.status(200).json({
      success: true,
      count: formattedData.length,
      data: formattedData
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contacts',
      error: error.message
    });
  }
};

// @desc    Update contact inquiry status
// @route   PUT /api/contact/:id/status
// @access  Public (or Admin)
exports.updateContactStatus = async (req, res) => {
  disableCache(res);
  try {
    const { status } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact message not found' });
    }

    contact.status = status || (contact.status === 'Resolved' ? 'Pending' : 'Resolved');
    await contact.save();

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Delete contact inquiry
// @route   DELETE /api/contact/:id
// @access  Public (or Admin)
exports.deleteContactSubmission = async (req, res) => {
  disableCache(res);
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact message not found' });
    }

    await contact.deleteOne();

    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
