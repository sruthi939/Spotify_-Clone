import express from 'express';
import { addSong, listSong, removeSong } from '../controllers/songController.js';
import { protect, artistOrAdmin } from '../middleware/auth.js';

const songRouter = express.Router();

songRouter.post('/add', protect, artistOrAdmin, addSong);
songRouter.get('/list', listSong);
songRouter.post('/remove', protect, artistOrAdmin, removeSong);

export default songRouter;
