const Farm = require('../models/farmModel')

// Fetch all farms
exports.getFarms = async (req, res) => {
  try {
    const farms = await Farm.find()
    res.status(200).json(farms)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch farms', details: error.message })
  }
};

// Fetch a single farm by ID
exports.getFarmById = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id)
    if (!farm) return res.status(404).json({ message: 'Farm not found' })
    res.status(200).json(farm)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch farm details', details: error.message })
  }
}

// Create a new farm (Admin only)
exports.createFarm = async (req, res) => {
  try {
    const farm = new Farm(req.body)
    await farm.save()
    res.status(201).json(farm)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create farm', details: error.message })
  }
}

// Update an existing farm (Admin only)
exports.updateFarm = async (req, res) => {
  try {
    const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!farm) return res.status(404).json({ message: 'Farm not found' })
    res.status(200).json(farm);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update farm', details: error.message })
  }
}

// Delete a farm (Admin only)
exports.deleteFarm = async (req, res) => {
  try {
    const farm = await Farm.findByIdAndDelete(req.params.id)
    if (!farm) return res.status(404).json({ message: 'Farm not found' })
    res.status(200).json({ message: 'Farm deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete farm', details: error.message })
  }
}
