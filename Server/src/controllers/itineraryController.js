const Itinerary = require('../models/Itinerary');

const itineraryController = {
    // Create new itinerary
    createItinerary: async (req, res) => {
        try {
            // Temporarily add a dummy user ID for testing
            const newItinerary = new Itinerary({
                ...req.body,
                user: "65f1a2b3c4d5e6f7g8h9i0j1" // Temporary dummy user ID
            });
            const savedItinerary = await newItinerary.save();
            res.status(201).json(savedItinerary);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Get all itineraries
    getAllItineraries: async (req, res) => {
        try {
            const itineraries = await Itinerary.find();
            res.json(itineraries);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get an itinerary by ID
    getItineraryById: async (req, res) => {
        try {
            const itinerary = await Itinerary.findById(req.params.id);
            if (!itinerary) return res.status(404).json({ error: 'Itinerary not found' });
            res.json(itinerary);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update an itinerary
    updateItinerary: async (req, res) => {
        try {
            const itinerary = await Itinerary.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!itinerary) return res.status(404).json({ error: 'Itinerary not found' });
            res.json(itinerary);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Delete an itinerary
    deleteItinerary: async (req, res) => {
        try {
            const itinerary = await Itinerary.findByIdAndDelete(req.params.id);
            if (!itinerary) return res.status(404).json({ error: 'Itinerary not found' });
            res.json({ message: 'Itinerary deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = itineraryController;
