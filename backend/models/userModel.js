const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', UserSchema);

// Seed Data
async function seedUsers() {
  const userExamples = [
    { username: 'john_doe', email: 'john@example.com', password: 'password123', isAdmin: false },
    { username: 'jane_doe', email: 'jane@example.com', password: 'password123', isAdmin: false },
    { username: 'admin_user', email: 'admin@example.com', password: 'adminpass', isAdmin: true },
  ];

  try {
    await User.deleteMany();
    await User.insertMany(userExamples);
    console.log('User examples seeded successfully.');
  } catch (error) {
    console.error('Error seeding user examples:', error);
  }
}

if (process.env.NODE_ENV === 'development') {
  seedUsers();
}

module.exports = User;
