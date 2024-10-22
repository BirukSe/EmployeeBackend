const express = require('express');
const bcrypt = require('bcrypt'); // Make sure to include bcrypt
const User = require('../models/User.js'); // Adjust the path if necessary
const router = express.Router();
// router.post('/signup', async (req, res) => {
//     const { name, email, password, isAdmin } = req.body;

//     // Log the incoming request for debugging
//     console.log('Received signup request:', req.body);

//     // Validate input
//     if (!name || !email || !password) {
//         return res.status(400).json({ message: 'All fields are required.' });
//     }

//     try {
//         const user = new User({ name, email, password, isAdmin });
//         await user.save();
//         res.status(201).json({ message: 'User created successfully!' });
//     } catch (error) {
//         console.error('Error during signup:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error during signup', error: err });
    }
  });
  
  module.exports = router;
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      // Optionally, return a token or session info
      res.json({ message: 'Login successful', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error during login', error: err });
    }
  });
  
module.exports=router;