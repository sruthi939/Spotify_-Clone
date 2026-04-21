import userModel from '../models/userModel.js';
import songModel from '../models/songModel.js';

// @desc    Toggle like status of a song
// @route   POST /api/user/like
// @access  Private
export const toggleLikeSong = async (req, res) => {
    try {
        const { songId } = req.body;
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Verify the song actually exists
        const songExists = await songModel.findById(songId);
        if (!songExists) {
            return res.status(404).json({ success: false, message: 'Song not found' });
        }

        const isLiked = user.likedSongs.includes(songId);

        if (isLiked) {
            // Remove from liked songs
            user.likedSongs = user.likedSongs.filter((id) => id.toString() !== songId);
            await user.save();
            res.json({ success: true, message: 'Song removed from liked songs', likedSongs: user.likedSongs });
        } else {
            // Add to liked songs
            user.likedSongs.push(songId);
            await user.save();
            res.json({ success: true, message: 'Song added to liked songs', likedSongs: user.likedSongs });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user's liked songs
// @route   GET /api/user/likes
// @access  Private
export const getLikedSongs = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).populate('likedSongs');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, likedSongs: user.likedSongs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
