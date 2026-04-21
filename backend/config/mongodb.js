import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("DB connection established");
        });

        // Use standard mongodb uri or fallback to a local one
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/spotify-clone';
        
        await mongoose.connect(mongoUri);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
