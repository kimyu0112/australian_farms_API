const express = require('express');
const router = express.Router();
const {
  getFarms,
  getFarmById,
  addFarm,
  updateFarm,
  deleteFarm,
} = require('../controllers/farmController');
const authenticateToken = require('../middlewares/authenticateToken');
const requireAdmin = require('../middlewares/requireAdmin');

// Public routes
router.get('/', getFarms); // Get all farms
router.get('/:id', getFarmById); // Get a single farm by ID

// Admin-only routes
router.post('/', authenticateToken, requireAdmin, addFarm); // Add a new farm
router.patch('/:id', authenticateToken, requireAdmin, updateFarm); // Update a farm
router.delete('/:id', authenticateToken, requireAdmin, deleteFarm); // Delete a farm

module.exports = router;
