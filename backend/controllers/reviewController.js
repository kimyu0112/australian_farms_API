const Review = require('../models/reviewModel');

// Get all reviews for a farm
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ farmId: req.params.farmId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

// Add a review to a farm (requires authentication)
exports.addReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const newReview = new Review({
      user: req.user.username,
      comment,
      rating,
      farmId: req.params.farmId,
    });

    await newReview.save();
    res.json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error });
  }
};

// Delete a review (requires authentication or admin access)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user !== req.user.username && !req.user.isAdmin) {
      return res.status(403).json({ message: 'You can only delete your own reviews or require admin access' });
    }

    await Review.findByIdAndDelete(req.params.reviewId);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
};
