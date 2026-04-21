import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['listener', 'artist', 'admin'], 
        default: 'listener' 
    },
    // Artist specific fields (optional, only used if role === 'artist')
    artistName: { type: String, default: '' },
    artistBio: { type: String, default: '' },
    
    // Playlists (references to Playlist model if created later)
    likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
}, { minimize: false, timestamps: true });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
