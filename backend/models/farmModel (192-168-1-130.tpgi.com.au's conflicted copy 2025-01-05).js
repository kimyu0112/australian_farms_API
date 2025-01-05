const mongoose = require('mongoose');

// Define the farm schema
const FarmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Farm name is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  features: [String],
  images: [String],
  reviews: [ReviewSchema], // Embed reviews directly in the farm schema
}, { timestamps: true });

const Farm = mongoose.model('Farm', FarmSchema);

module.exports = Farm;
