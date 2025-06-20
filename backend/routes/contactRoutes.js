const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');  // Correctly importing the controller

// POST route for contact form submission
router.post('/contact', contactController.submitContactForm);

// GET route to fetch all contact messages
router.get('/contact', contactController.getAllMessages);

module.exports = router;
