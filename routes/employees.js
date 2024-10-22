// const express = require('express');
// const Employee = require('../models/Employee'); // Ensure this model is correctly defined
// const auth = require('../middleware/auth'); // Ensure this middleware is correctly defined
// const router = express.Router();
// router.post('/', auth, async (req, res) => {
//     const { name, position, department, email } = req.body;
//     const employee = new Employee({ name, position, department, email });
//     try {
//       await employee.save();
//       res.status(201).json(employee); // Send back the created employee
//     } catch (err) {
//       res.status(400).json({ message: err.message }); // Handle errors
//     }
//   });
  
//   // Read all Employees
//   router.get('/',async (req, res) => {
//     try {
//       const employees = await Employee.find();
//       res.json(employees);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
//   // Update Employee
//   router.put('/:id', auth, async (req, res) => {
//     const { name, position, department, email } = req.body;
//     try {
//       const employee = await Employee.findByIdAndUpdate(req.params.id, { name, position, department, email }, { new: true });
//       if (!employee) return res.status(404).json({ message: 'Employee not found' });
//       res.json(employee);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  
//   // Delete Employee
//   router.delete('/:id', auth, async (req, res) => {
//     try {
//       const employee = await Employee.findByIdAndDelete(req.params.id);
//       if (!employee) return res.status(404).json({ message: 'Employee not found' });
//       res.json({ message: 'Employee deleted' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
//   module.exports = router;
const express = require('express');
const Employee = require('../models/Employee'); // Ensure this model is defined
const router = express.Router();

// Create Employee
router.post('/', async (req, res) => {
    const { name, position, department, email } = req.body;
    const employee = new Employee({ name, position, department, email });
    try {
        await employee.save();
        res.status(201).json(employee); // Send back the created employee
    } catch (err) {
        res.status(400).json({ message: err.message }); // Handle errors
    }
});

// Read all Employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Employee
router.put('/:id', async (req, res) => {
    const { name, position, department, email } = req.body;
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, { name, position, department, email }, { new: true });
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Employee
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
