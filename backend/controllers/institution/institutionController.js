const Institution = require('../../models/Institution');

// Configuration Constants
const SEARCH_LIMIT = 15;
const API_TIMEOUT_MS = 2500;
const EXTERNAL_API_URL = 'http://universities.hipolabs.com/search';

/**
 * Escapes special characters for safe regular expression matching to prevent ReDoS attacks.
 * @param {string} str 
 * @returns {string}
 */
const escapeRegex = (str) => str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

/**
 * @desc    Search institutions dynamically from local DB and public API in parallel
 * @route   GET /api/institutions/search
 * @access  Public
 */
const searchInstitutions = async (req, res) => {
  try {
    const query = req.query.q?.trim();

    if (!query || query.length < 1) {
      return res.status(200).json({ success: true, count: 0, data: [] });
    }

    const safeRegex = new RegExp(escapeRegex(query), 'i');

    // Task 1: Query Local MongoDB with lean projection for maximum performance
    const fetchLocalDB = Institution.find({ name: safeRegex })
      .select('name country -_id')
      .limit(SEARCH_LIMIT)
      .lean();

    // Task 2: Query External HipoLabs API with AbortController timeout
    const fetchExternalAPI = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

      try {
        const response = await fetch(`${EXTERNAL_API_URL}?name=${encodeURIComponent(query)}`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) return [];

        const data = await response.json();
        return (data || []).slice(0, SEARCH_LIMIT).map(inst => ({
          name: inst.name,
          country: inst.country || 'International'
        }));
      } catch {
        // Graceful fallback for external API timeouts or network outages
        return [];
      }
    };

    // Execute Local DB and External API queries in parallel via Promise.allSettled
    const [dbResult, externalResult] = await Promise.allSettled([
      fetchLocalDB,
      fetchExternalAPI()
    ]);

    const localItems = dbResult.status === 'fulfilled'
      ? dbResult.value.map(i => ({ name: i.name, country: i.country || 'India' }))
      : [];

    const externalItems = externalResult.status === 'fulfilled' ? externalResult.value : [];

    // Deduplicate results by institution name while prioritizing local DB entries
    const uniqueMap = new Map();
    [...localItems, ...externalItems].forEach(item => {
      if (item?.name && !uniqueMap.has(item.name)) {
        uniqueMap.set(item.name, item);
      }
    });

    const results = Array.from(uniqueMap.values()).slice(0, SEARCH_LIMIT);

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });

  } catch (error) {
    console.error('[InstitutionController] Search Error:', error.message);
    return res.status(200).json({ success: true, count: 0, data: [] });
  }
};

/**
 * @desc    Seed initial institutions using high-performance MongoDB bulkWrite
 * @route   POST /api/institutions/seed
 * @access  Public / Admin
 */
const seedInstitutions = async (req, res) => {
  try {
    const seedData = [
      { name: "Indian Institute of Technology (IIT) Bombay", country: "India" },
      { name: "Indian Institute of Technology (IIT) Delhi", country: "India" },
      { name: "Indian Institute of Technology (IIT) Kanpur", country: "India" },
      { name: "Indian Institute of Technology (IIT) Madras", country: "India" },
      { name: "Indian Institute of Technology (IIT) Kharagpur", country: "India" },
      { name: "Delhi University (DU)", country: "India" },
      { name: "Jawaharlal Nehru University (JNU)", country: "India" },
      { name: "Banaras Hindu University (BHU)", country: "India" },
      { name: "Amity University", country: "India" },
      { name: "Manipal Academy of Higher Education", country: "India" },
      { name: "Birla Institute of Technology and Science (BITS) Pilani", country: "India" },
      { name: "Vellore Institute of Technology (VIT)", country: "India" },
      { name: "Harvard University", country: "USA" },
      { name: "Stanford University", country: "USA" },
      { name: "Massachusetts Institute of Technology (MIT)", country: "USA" },
      { name: "University of Oxford", country: "UK" },
      { name: "University of Cambridge", country: "UK" },
      { name: "National Institute of Technology (NIT) Trichy", country: "India" },
      { name: "National Institute of Technology (NIT) Surathkal", country: "India" },
      { name: "SRM Institute of Science and Technology", country: "India" },
      { name: "Lovely Professional University (LPU)", country: "India" },
      { name: "Chandigarh University", country: "India" }
    ];

    // Single atomic database bulk write (eliminating sequential loop await calls)
    const bulkOps = seedData.map(inst => ({
      updateOne: {
        filter: { name: inst.name },
        update: { $setOnInsert: inst },
        upsert: true
      }
    }));

    const bulkResult = await Institution.bulkWrite(bulkOps);

    return res.status(201).json({
      success: true,
      message: 'Institutions seeded successfully',
      stats: {
        matchedCount: bulkResult.matchedCount,
        upsertedCount: bulkResult.upsertedCount
      }
    });

  } catch (error) {
    console.error('[InstitutionController] Seed Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to seed institutions',
      error: error.message
    });
  }
};

module.exports = {
  searchInstitutions,
  seedInstitutions
};
