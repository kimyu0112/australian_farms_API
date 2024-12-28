const express = require('express');
const router = express.Router({ mergeParams: true });
const { getReviews, addReview, deleteReview } = require('../controllers/reviewController');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/', getReviews);
router.post('/', authenticateToken, addReview);
router.delete('/:reviewId', authenticateToken, deleteReview);

module.exports = router;