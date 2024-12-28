const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const farmRoutes = require('./routes/farms');
const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');

app.use('/farms', farmRoutes);
app.use('/farms/:farmId/reviews', reviewRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
