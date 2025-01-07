const express = require('express');
const {
  getReviews,
  addReview,
  deleteReview,
} = require('../controllers/reviewController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.get('/:farmId/reviews', getReviews);
router.post('/:farmId/reviews', authenticateToken, addReview);
router.delete('/:farmId/reviews/:reviewId', authenticateToken, deleteReview);

module.exports = router;
