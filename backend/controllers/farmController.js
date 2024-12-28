const Farm = require('../models/farmModel');

// Get all farms
exports.getFarms = async (req, res) => {
  try {
    const farms = await Farm.find();
    res.json(farms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching farms', error });
  }
};

// Get a farm by ID
exports.getFarmById = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    if (!farm) return res.status(404).json({ message: 'Farm not found' });
    res.json(farm);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching farm', error });
  }
};

// Add a new farm
exports.addFarm = async (req, res) => {
  try {
    const newFarm = new Farm(req.body);
    await newFarm.save();
    res.status(201).json(newFarm);
  } catch (error) {
    res.status(500).json({ message: 'Error adding farm', error });
  }
};

// Update a farm
exports.updateFarm = async (req, res) => {
  try {
    const updatedFarm = await Farm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFarm) return res.status(404).json({ message: 'Farm not found' });
    res.json(updatedFarm);
  } catch (error) {
    res.status(500).json({ message: 'Error updating farm', error });
  }
};

// Delete a farm
exports.deleteFarm = async (req, res) => {
  try {
    const deletedFarm = await Farm.findByIdAndDelete(req.params.id);
    if (!deletedFarm) return res.status(404).json({ message: 'Farm not found' });
    res.json({ message: 'Farm deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting farm', error });
  }
};