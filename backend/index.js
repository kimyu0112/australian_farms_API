const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const seedData = require('./seedData');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const farmRoutes = require('./routes/farms');
const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');

app.use('/api/farms', farmRoutes);
app.use('/api/farms', reviewRoutes);
app.use('/api/auth', authRoutes);

// if (process.env.NODE_ENV === 'development') {
//  seedData();
// } 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
