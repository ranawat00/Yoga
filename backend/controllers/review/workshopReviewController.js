const Review = require('../../models/Review');

// Mock reviews to seed initially if there are no reviews in database
const MOCK_REVIEWS = {
  'detox-21': [
    {
      name: 'Rohan Sharma',
      rating: 5,
      comment: 'Excellent program! My breathing improved immensely in just 7 days. Strongly recommended.',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      name: 'Pooja Patel',
      rating: 5,
      comment: 'The expert guidance is top-notch. The lung exercises helped clear my allergies completely.',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      name: 'Amit Verma',
      rating: 4.8,
      comment: 'Very structured and helpful. Loved the daily follow-up routine.',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    }
  ],
  'mind-7': [
    {
      name: 'Neha Gupta',
      rating: 5,
      comment: 'Experiencing motherhood has never been more peaceful. Loved the recipe tips!',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      name: 'Kiran Mehta',
      rating: 4.8,
      comment: 'Great tips on nutrient dense baking. Very useful for expecting mothers.',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    }
  ],
  'cook-3': [
    {
      name: 'Suresh Kumar',
      rating: 5,
      comment: 'Absolute beginners should definitely try this. Yoga philosophy is explained so simply.',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      name: 'Aishwarya Sen',
      rating: 5,
      comment: 'Daily practices are so refreshing! Best decision I made this month.',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    }
  ]
};

/**
 * @desc    Get all reviews for a specific workshop
 * @route   GET /api/reviews/:workshopId
 * @access  Public
 */
exports.getReviews = async (req, res, next) => {
  try {
    const { workshopId } = req.params;

    let reviews = await Review.find({ workshopId }).sort({ createdAt: -1 });

    if (reviews.length === 0 && MOCK_REVIEWS[workshopId]) {
      const seeded = MOCK_REVIEWS[workshopId].map(r => ({
        ...r,
        workshopId
      }));
      reviews = await Review.insertMany(seeded);
      reviews.sort((a, b) => b.createdAt - a.createdAt);
    }

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new review for a workshop
 * @route   POST /api/reviews
 * @access  Public
 */
exports.createReview = async (req, res, next) => {
  try {
    const { workshopId, name, rating, comment } = req.body;

    if (!workshopId || !name || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide workshopId, name, rating, and comment'
      });
    }

    const review = await Review.create({
      workshopId,
      name,
      rating: Number(rating),
      comment
    });

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
};
