import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, default: "" },
    image: { type: String, default: "" },
    
    // RBAC Context: User who owns this playlist
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    
    // Songs in the playlist
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'song' }]
}, { minimize: false, timestamps: true });

const playlistModel = mongoose.models.playlist || mongoose.model("playlist", playlistSchema);

export default playlistModel;
