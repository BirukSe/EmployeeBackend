const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees'); // Ensure this points to your employees.js

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Only need to call this once

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use('/user', authRoutes);
app.use('/employee', employeeRoutes);

// Start the server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
