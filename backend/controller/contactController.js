// controller/contactController.js
const Contact = require('../modules/ContactUs');  // Ensure you import the Contact model

// Submit contact form
const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Fetch all contact messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find();  // Fetch all contact messages from the database
    res.status(200).json(messages);  // Send the messages as a response
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { submitContactForm, getAllMessages };  // Export both functions
