const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
});

const Review = mongoose.model('Review', ReviewSchema);

// Seed Data
async function seedReviews() {
  const farms = await mongoose.model('Farm').find();

  const reviewExamples = [
    {
      user: 'john_doe',
      comment: 'Amazing farm! My kids loved the petting zoo.',
      rating: 5,
      farmId: farms[0]._id,
    },
    {
      user: 'jane_doe',
      comment: 'Beautiful scenery and great food!',
      rating: 4,
      farmId: farms[1]._id,
    },
    {
      user: 'john_doe',
      comment: 'Loved the workshops. Highly recommend!',
      rating: 5,
      farmId: farms[2]._id,
    },
  ];

  try {
    await Review.deleteMany();
    await Review.insertMany(reviewExamples);
    console.log('Review examples seeded successfully.');
  } catch (error) {
    console.error('Error seeding review examples:', error);
  }
}

if (process.env.NODE_ENV === 'development') {
  seedReviews();
}

module.exports = Review;
