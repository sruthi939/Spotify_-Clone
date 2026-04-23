import mongoose from 'mongoose';
import dotenv from 'dotenv';
import songModel from './models/songModel.js';
import albumModel from './models/albumModel.js';

dotenv.config();

const sampleAlbums = [
    { name: "Starboy", desc: "The Weeknd", bgColor: "#742a2a", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500" },
    { name: "Fine Line", desc: "Harry Styles", bgColor: "#2c5282", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500" },
    { name: "After Hours", desc: "The Weeknd", bgColor: "#2a2d36", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500" },
    { name: "Divide", desc: "Ed Sheeran", bgColor: "#2b6cb0", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500" },
    { name: "Evolve", desc: "Imagine Dragons", bgColor: "#285e61", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500" },
    { name: "Positions", desc: "Ariana Grande", bgColor: "#4a3728", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500" },
    { name: "Future Nostalgia", desc: "Dua Lipa", bgColor: "#553c9a", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500" },
    { name: "Lover", desc: "Taylor Swift", bgColor: "#7b341e", image: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=500" },
    { name: "Hollywood's Bleeding", desc: "Post Malone", bgColor: "#1a202c", image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500" },
    { name: "Justice", desc: "Justin Bieber", bgColor: "#2d3748", image: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?w=500" }
];

const sampleSongs = [
    { name: "Blinding Lights", desc: "The Weeknd", album: "Starboy", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "3:20" },
    { name: "Watermelon Sugar", desc: "Harry Styles", album: "Fine Line", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: "2:54" },
    { name: "Save Your Tears", desc: "The Weeknd", album: "After Hours", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: "3:35" },
    { name: "Shape of You", desc: "Ed Sheeran", album: "Divide", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: "3:53" },
    { name: "Believer", desc: "Imagine Dragons", album: "Evolve", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: "3:24" },
    { name: "Levitating", desc: "Dua Lipa", album: "Future Nostalgia", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: "3:23" },
    { name: "Circles", desc: "Post Malone", album: "Hollywood's Bleeding", image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: "3:35" },
    { name: "Peaches", desc: "Justin Bieber", album: "Justice", image: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?w=500", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: "3:18" },
    { name: "Cruel Summer", desc: "Taylor Swift", album: "Lover", image: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=500", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", duration: "2:58" },
    { name: "Heat Waves", desc: "Glass Animals", album: "Chill Vibes", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: "3:58" }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB for seeding...");

        // Clear existing data
        await songModel.deleteMany({});
        await albumModel.deleteMany({});

        // Add Albums
        await albumModel.insertMany(sampleAlbums);
        console.log("Sample Albums Added!");

        // Add Songs
        await songModel.insertMany(sampleSongs);
        console.log("Sample Songs Added!");

        console.log("Seeding Completed Successfully!");
        process.exit();
    } catch (error) {
        console.error("Seeding Error:", error.message);
        process.exit(1);
    }
};

seedDB();
