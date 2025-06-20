// routes/propertyRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Property = require('../modules/Property'); 
const authenticateUser = require('../middleware/authenticateUser')

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});
const upload = multer({ storage });

// Route to add a new property
router.post('/properties', upload.array('image', 10), async (req, res) => {
  try {
    const {
      userId, title, description, price,
      propertyLocation, ownerContactAddress,
      ownerContactNumber, ownerAlternateContactNumber,
      bedrooms, bathrooms, size, kitchen, bhk,propertyType
    } = req.body;

    const imageFilenames = req.files.map(file => file.filename);

    const property = new Property({
      userId,
      title,
      description,
      price,
      propertyLocation,
      ownerContactAddress,
      ownerContactNumber,
      ownerAlternateContactNumber,
      bedrooms,
      bathrooms,
      size,
      kitchen,
      bhk,
      propertyType,
      imageUrls: imageFilenames.map(name => `/uploads/${name}`),
    });

    await property.save();
    res.status(201).json({ message: 'Property added successfully' });

  } catch (error) {
    console.error('Error adding property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




router.get('/properties', async (req, res) => {
  try {

    const { location, minPrice, maxPrice, bhk, bedrooms, propertyType } = req.query;

    const filter = {};

    if (location) {
      filter.propertyLocation = { $regex: new RegExp(location, 'i') };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (bhk) {
      filter.bhk = parseInt(bhk);
    }

    if (bedrooms) {
      filter.bedrooms = parseInt(bedrooms);
    }

   if (propertyType) {
    filter.propertyType = { $regex: new RegExp(propertyType, 'i') };
  }

    const properties = await Property.find(filter);
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    console.log('error to fetch the data');
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/userproperties/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Property.find({ userId }); 
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.delete('/properties/:propertyId', authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const { propertyId } = req.params;
    const property = await Property.findOne({ _id: propertyId, userId: userId });
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    await Property.findByIdAndDelete(propertyId);

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// routes/propertyRoutes.js

// Update property route
router.put('/properties/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      propertyLocation,
      ownerContactAddress,
      ownerContactNumber,
      ownerAlternateContactNumber,
      bedrooms,
      bathrooms,
      size

    } = req.body;

    const updatedProperty = {
      title,
      description,
      price,
      propertyLocation,
      ownerContactAddress,
      ownerContactNumber,
      ownerAlternateContactNumber,
      bedrooms,
      bathrooms,
      size
    };

    // Check if an image file was uploaded
    if (req.file) {
      updatedProperty.imageUrl = `/uploads/${req.file.filename}`; // Set the image URL to the path where the image is stored
      updatedProperty.imageFilename = req.file.filename; // Set the image filename
    }

    // Find the property by ID and update it
    const property = await Property.findByIdAndUpdate(id, updatedProperty, { new: true });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;



