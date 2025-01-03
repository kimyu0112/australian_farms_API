const express = require('express');
const {
  getFarms,
  getFarmById,
  createFarm,
  updateFarm,
  deleteFarm,
} = require('../controllers/farmController');
const authenticateToken = require('../middlewares/authenticateToken');
const requireAdmin = require('../middlewares/requireAdmin');

const router = express.Router();

router.get('/', getFarms);
router.get('/:id', getFarmById);
router.post('/', authenticateToken, requireAdmin, createFarm);
router.patch('/:id', authenticateToken, requireAdmin, updateFarm);
router.delete('/:id', authenticateToken, requireAdmin, deleteFarm);

module.exports = router;
