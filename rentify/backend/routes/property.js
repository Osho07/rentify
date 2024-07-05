const express = require('express');
const auth = require('../middleware/auth');
const Property = require('../models/property');
const router = express.Router();

// Post a property
router.post('/', auth, async (req, res) => {
    const { location, area, bedrooms, bathrooms, nearbyAmenities } = req.body;
    try {
        const newProperty = new Property({
            userId: req.user.id,
            location,
            area,
            bedrooms,
            bathrooms,
            nearbyAmenities
        });
        const property = await newProperty.save();
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// Post a property with validation
router.post('/', [
    check('location', 'Location is required').not().isEmpty(),
    check('area', 'Area is required').not().isEmpty(),
    check('bedrooms', 'Number of bedrooms is required').not().isEmpty(),
    check('bathrooms', 'Number of bathrooms is required').not().isEmpty(),
    check('nearbyAmenities', 'Nearby amenities are required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // ...rest of the property posting logic
});
// Like a property
router.post('/:id/like', authMiddleware, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        property.likes = (property.likes || 0) + 1;
        await property.save();
        res.json({ likes: property.likes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const nodemailer = require('nodemailer');

// Buyer interested in a property
router.post('/:id/interested', authMiddleware, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('seller', '-password');
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const buyer = req.user;

        // Email configuration
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password'
            }
        });

        // Send email to seller
        const mailOptionsToSeller = {
            from: 'your-email@gmail.com',
            to: property.seller.email,
            subject: 'Someone is interested in your property',
            text: `Buyer Details:\nName: ${buyer.firstName} ${buyer.lastName}\nEmail: ${buyer.email}\nPhone: ${buyer.phone}`
        };
        await transporter.sendMail(mailOptionsToSeller);

        // Send email to buyer
        const mailOptionsToBuyer = {
            from: 'your-email@gmail.com',
            to: buyer.email,
            subject: 'You showed interest in a property',
            text: `Seller Details:\nName: ${property.seller.firstName} ${property.seller.lastName}\nEmail: ${property.seller.email}\nPhone: ${property.seller.phone}`
        };
        await transporter.sendMail(mailOptionsToBuyer);

        res.json({ message: 'Emails sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get all properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get properties by user
router.get('/my-properties', auth, async (req, res) => {
    try {
        const properties = await Property.find({ userId: req.user.id });
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// Get all properties with pagination
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const properties = await Property.find().skip(skip).limit(limit);
        const total = await Property.countDocuments();
        res.json({ properties, total, page, pages: Math.ceil(total / limit) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get all properties
router.get('/', async (req, res) => {
    const properties = await Property.find();
    res.json(properties);
});

// Get property details (with seller information)
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('seller', '-password');
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Update property
router.put('/:id', auth, async (req, res) => {
    const { location, area, bedrooms, bathrooms, nearbyAmenities } = req.body;
    try {
        let property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }
        if (property.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        property = await Property.findByIdAndUpdate(req.params.id, { location, area, bedrooms, bathrooms, nearbyAmenities }, { new: true });
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete property
router.delete('/:id', auth, async (req, res) => {
    try {
        let property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }
        if (property.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await Property.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Property removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
