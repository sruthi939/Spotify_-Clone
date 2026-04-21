import playlistModel from '../models/playlistModel.js';

const createPlaylist = async (req, res) => {
    try {
        const { name, desc, image, songs } = req.body;
        const playlist = new playlistModel({
            name,
            desc,
            image,
            songs: songs || [],
            user: req.user._id // Extracted from protect middleware
        });
        await playlist.save();
        res.json({ success: true, message: "Playlist created", playlist });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const getUserPlaylists = async (req, res) => {
    try {
        const playlists = await playlistModel.find({ user: req.user._id }).populate('songs');
        res.json({ success: true, playlists });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.body;
        const playlist = await playlistModel.findOne({ _id: playlistId, user: req.user._id });
        
        if (!playlist) {
            return res.status(404).json({ success: false, message: "Playlist not found or unauthorized" });
        }
        
        if (!playlist.songs.includes(songId)) {
            playlist.songs.push(songId);
            await playlist.save();
        }
        
        res.json({ success: true, message: "Song added to playlist", playlist });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const removePlaylist = async (req, res) => {
    try {
        const { id } = req.body;
        const playlist = await playlistModel.findOneAndDelete({ _id: id, user: req.user._id });
        if (!playlist) {
            return res.status(404).json({ success: false, message: "Playlist not found or unauthorized" });
        }
        res.json({ success: true, message: "Playlist removed" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { createPlaylist, getUserPlaylists, addSongToPlaylist, removePlaylist };
