const express = require('express');
const router = express.Router();
const { searchInstitutions, seedInstitutions } = require('../controllers/institutionController');

// Route to search institutions by name query (e.g. /api/institutions/search?q=harvard)
router.get('/search', searchInstitutions);

// Route to seed initial institutions (can be removed/protected in production)
router.post('/seed', seedInstitutions);

module.exports = router;
