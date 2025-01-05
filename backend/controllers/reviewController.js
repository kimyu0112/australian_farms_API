const Review = require('../models/reviewModel');

// Fetch reviews for a farm
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ farmId: req.params.farmId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
  }
};

// Add a review
const Review = require('../models/reviewModel');

exports.addReview = async (req, res) => {
  try {
    const { farmId } = req.params;
    const { user, comment, rating } = req.body;

    if (!comment || !rating) {
      return res.status(400).json({ message: 'Comment and rating are required.' });
    }

    const newReview = await Review.create({ ...req.body, farmId });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add review.', error: error.message });
  }
};

// Delete a review (Admin or Review Owner)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    // Check if the user is an admin or the owner of the review
    if (req.user.isAdmin || req.user.username === review.user) {
      await Review.findByIdAndDelete(req.params.reviewId);
      return res.status(200).json({ message: 'Review deleted successfully' });
    } else {
      return res.status(403).json({ message: 'Access denied. Only the review owner or admins can delete this review.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review', details: error.message });
  }
};
