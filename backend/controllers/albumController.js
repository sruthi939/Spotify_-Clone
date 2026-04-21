import albumModel from '../models/albumModel.js';

const addAlbum = async (req, res) => {
    try {
        const { name, desc, bgColor, image } = req.body;
        const album = new albumModel({
            name,
            desc,
            bgColor,
            image,
            artist: req.user._id
        });
        await album.save();
        res.json({ success: true, message: "Album added" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const listAlbum = async (req, res) => {
    try {
        const allAlbums = await albumModel.find({});
        res.json({ success: true, albums: allAlbums });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const removeAlbum = async (req, res) => {
    try {
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Album removed" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export { addAlbum, listAlbum, removeAlbum };
