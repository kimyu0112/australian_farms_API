const mongoose = require('mongoose');

const FarmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  features: [String],
  images: [String],
  areaCode: String,
});

const Farm = mongoose.model('Farm', FarmSchema);

// Seed Data
async function seedFarms() {
  const farmExamples = [
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
  ];

  try {
    await Farm.deleteMany();
    await Farm.insertMany(farmExamples);
    console.log('Farm examples seeded successfully.');
  } catch (error) {
    console.error('Error seeding farm examples:', error);
  }
}

if (process.env.NODE_ENV === 'development') {
  seedFarms();
}

module.exports = Farm;
