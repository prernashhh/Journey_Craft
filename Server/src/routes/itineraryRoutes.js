const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');

// Create an itinerary
router.post('/', async (req, res) => {
    try {
        const itinerary = new Itinerary(req.body);
        await itinerary.save();
        res.status(201).json(itinerary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all itineraries
router.get('/', async (req, res) => {
    try {
        const itineraries = await Itinerary.find();
        res.json(itineraries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get an itinerary by ID
router.get('/:id', async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if (!itinerary) return res.status(404).json({ error: 'Itinerary not found' });
        res.json(itinerary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an itinerary
router.put('/:id', async (req, res) => {
    try {
        const itinerary = await Itinerary.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!itinerary) return res.status(404).json({ error: 'Itinerary not found' });
        res.json(itinerary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an itinerary
router.delete('/:id', async (req, res) => {
    try {
        const itinerary = await Itinerary.findByIdAndDelete(req.params.id);
        if (!itinerary) return res.status(404).json({ error: 'Itinerary not found' });
        res.json({ message: 'Itinerary deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
