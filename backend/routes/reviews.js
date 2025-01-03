const express = require('express');
const {
  getReviews,
  addReview,
  deleteReview,
} = require('../controllers/reviewController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.get('/', getReviews);
router.post('/', authenticateToken, addReview);
router.delete('/:reviewId', authenticateToken, deleteReview);

module.exports = router;
