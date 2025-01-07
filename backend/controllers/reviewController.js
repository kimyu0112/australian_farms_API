const Review = require('../models/reviewModel');
const Farm = require('../models/farmModel')

// Fetch reviews for a farm
exports.getReviews = async (req, res) => {
  const { farmId } = req.params; // Extract farmId from URL
  try {
    // Fetch reviews for the specified farm
    const reviews = await Review.find({ farmId });
    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found for this farm' });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
};
// Add a review
exports.addReview = async (req, res) => {
  try {
    const review = await Review.create({
      user: req.body.user,
      comment: req.body.comment,
      rating: req.body.rating,
      farmId: req.params.farmId
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
