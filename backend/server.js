import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoute.js';
import songRouter from './routes/songRoute.js';
import albumRouter from './routes/albumRoute.js';
import playlistRouter from './routes/playlistRoute.js';
import userRouter from './routes/userRoute.js';
import searchRouter from './routes/searchRoute.js';
// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect to Database
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/users', authRouter);
app.use('/api/user', userRouter);
app.use('/api/song', songRouter);
app.use('/api/album', albumRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/search', searchRouter);


app.get('/', (req, res) => res.send('Spotify Backend API Working!'));

// Start Server
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
