import songModel from '../models/songModel.js';

const addSong = async (req, res) => {
    try {
        const { name, desc, album, image, file, duration } = req.body;
        const song = new songModel({
            name,
            desc,
            album,
            image,
            file,
            duration,
            artist: req.user._id // Assuming req.user is set by auth middleware
        });
        await song.save();
        res.json({ success: true, message: "Song added" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({});
        res.json({ success: true, songs: allSongs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const removeSong = async (req, res) => {
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Song removed" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export { addSong, listSong, removeSong };
