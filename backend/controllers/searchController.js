import songModel from '../models/songModel.js';
import albumModel from '../models/albumModel.js';
import userModel from '../models/userModel.js';

// @desc    Search across songs, albums, and artists
// @route   GET /api/search?q=query
// @access  Public
export const searchAll = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ success: false, message: 'Please provide a search query' });
        }

        // Case-insensitive regex for search
        const regex = new RegExp(q, 'i');

        // Search Songs
        const songs = await songModel.find({
            $or: [{ name: regex }, { desc: regex }]
        }).limit(10);

        // Search Albums
        const albums = await albumModel.find({
            $or: [{ name: regex }, { desc: regex }]
        }).limit(10);

        // Search Artists
        const artists = await userModel.find({
            role: 'artist',
            $or: [{ name: regex }, { artistName: regex }]
        }).select('-password').limit(10);

        res.json({
            success: true,
            results: {
                songs,
                albums,
                artists
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
