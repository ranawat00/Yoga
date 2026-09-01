const Institution = require('../models/Institution');

// @desc    Search institutions dynamically from public University API
// @route   GET /api/institutions/search
// @access  Public
const searchInstitutions = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.status(200).json({ success: true, data: [] });
    }

    // Call the public HipoLabs University API
    const response = await fetch(`http://universities.hipolabs.com/search?name=${encodeURIComponent(q)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch from public API');
    }

    const data = await response.json();

    // The API returns an array of objects.
    // We limit it to the top 15 results to keep the UI clean
    const formattedData = data.slice(0, 15).map(inst => ({
      name: inst.name,
      country: inst.country
    }));

    // Deduplicate by name (sometimes the API returns duplicates for different domains)
    const uniqueInstitutions = Array.from(new Map(formattedData.map(item => [item.name, item])).values());

    res.status(200).json({
      success: true,
      data: uniqueInstitutions,
    });
  } catch (error) {
    console.error('Error fetching dynamic institutions:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Seed initial institutions
// @route   POST /api/institutions/seed
// @access  Public / Admin
const seedInstitutions = async (req, res) => {
  try {
    const seedData = [
      { name: "Indian Institute of Technology (IIT) Bombay" },
      { name: "Indian Institute of Technology (IIT) Delhi" },
      { name: "Indian Institute of Technology (IIT) Kanpur" },
      { name: "Indian Institute of Technology (IIT) Madras" },
      { name: "Indian Institute of Technology (IIT) Kharagpur" },
      { name: "Delhi University (DU)" },
      { name: "Jawaharlal Nehru University (JNU)" },
      { name: "Banaras Hindu University (BHU)" },
      { name: "Amity University" },
      { name: "Manipal Academy of Higher Education" },
      { name: "Birla Institute of Technology and Science (BITS) Pilani" },
      { name: "Vellore Institute of Technology (VIT)" },
      { name: "Harvard University", country: "USA" },
      { name: "Stanford University", country: "USA" },
      { name: "Massachusetts Institute of Technology (MIT)", country: "USA" },
      { name: "University of Oxford", country: "UK" },
      { name: "University of Cambridge", country: "UK" },
      { name: "National Institute of Technology (NIT) Trichy" },
      { name: "National Institute of Technology (NIT) Surathkal" },
      { name: "SRM Institute of Science and Technology" },
      { name: "Lovely Professional University (LPU)" },
      { name: "Chandigarh University" }
    ];

    for (let inst of seedData) {
      await Institution.updateOne(
        { name: inst.name },
        { $setOnInsert: inst },
        { upsert: true }
      );
    }

    res.status(201).json({
      success: true,
      message: 'Institutions seeded successfully',
    });
  } catch (error) {
    console.error('Error seeding institutions:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  searchInstitutions,
  seedInstitutions,
};
