const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ReviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true }
})

module.exports = mongoose.model('Review', ReviewSchema)