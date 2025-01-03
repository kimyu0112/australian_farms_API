const mongoose = require('mongoose');

const FarmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  features: [String],
  images: [String],
  areaCode: String,
});

module.exports = mongoose.model('Farm', FarmSchema);
