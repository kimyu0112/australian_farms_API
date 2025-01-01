const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login user and generate a token
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { username: user.username, email: user.email, isAdmin: user.isAdmin }, // <-- Included email in JWT payload
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error });
  }
};

// Sign up a new user
exports.signup = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' }); // <-- Updated error message
    }

    const newUser = new User({ username, email, password, isAdmin });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error during sign-up', error });
  }
};