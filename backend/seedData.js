const mongoose = require('mongoose');
const Farm = require('./models/farmModel');
const Review = require('./models/reviewModel');
const User = require('./models/userModel');

const seedData = async () => {
  try {
    // Clear existing data
    await Farm.deleteMany();
    await Review.deleteMany();
    await User.deleteMany();

    // Create sample users
    const users = await User.insertMany([
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123', // Use hashed passwords in a real app
        isAdmin: false,
      },
      {
        username: 'jane_doe',
        email: 'jane@example.com',
        password: 'password123',
        isAdmin: false,
      },
      {
        username: 'admin_user',
        email: 'admin@example.com',
        password: 'adminpass',
        isAdmin: true,
      },
    ]);

    // Create sample farms
    const farms = await Farm.insertMany([
      {
        name: 'Sunny Acres',
        location: 'Melbourne, VIC',
        description: 'A beautiful family-friendly farm with open fields and picnic spots.',
        features: ['Petting Zoo', 'Organic Produce', 'Farm Tours'],
        images: ['https://example.com/sunny-acres.jpg'],
        areaCode: '3000',
      },
      {
        name: 'Green Pastures',
        location: 'Sydney, NSW',
        description: 'Explore rolling hills and enjoy fresh farm-to-table meals.',
        features: ['Horse Riding', 'Cafe', 'Wildlife'],
        images: ['https://example.com/green-pastures.jpg'],
        areaCode: '2000',
      },
      {
        name: 'Blue Ridge Farm',
        location: 'Brisbane, QLD',
        description: 'An interactive farm with a focus on sustainable farming practices.',
        features: ['Workshops', 'Eco-Trails', 'Camping'],
        images: ['https://example.com/blue-ridge.jpg'],
        areaCode: '4000',
      },
    ]);

    // Create sample reviews
    await Review.insertMany([
      {
        user: users[0].username,
        comment: 'Amazing farm! My kids loved it.',
        rating: 5,
        farmId: farms[0]._id,
      },
      {
        user: users[1].username,
        comment: 'Beautiful scenery and great food.',
        rating: 4,
        farmId: farms[1]._id,
      },
      {
        user: users[0].username,
        comment: 'Loved the workshops.',
        rating: 5,
        farmId: farms[2]._id,
      },
    ]);

    console.log('Seed data inserted successfully.');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

module.exports = seedData
