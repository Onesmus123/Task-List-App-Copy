// backend/routes/userRoutes.js
// Import dependencies
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        // Generate a token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;  // <-- Corrected to use email instead of username
    try {
        const user = await User.findOne({ email });  // <-- Also corrected to search by email
        if (!user) return res.status(400).send('User not found');
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
