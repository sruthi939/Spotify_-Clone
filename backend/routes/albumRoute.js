import express from 'express';
import { addAlbum, listAlbum, removeAlbum } from '../controllers/albumController.js';
import { protect, artistOrAdmin } from '../middleware/auth.js';

const albumRouter = express.Router();

albumRouter.post('/add', protect, artistOrAdmin, addAlbum);
albumRouter.get('/list', listAlbum);
albumRouter.post('/remove', protect, artistOrAdmin, removeAlbum);

export default albumRouter;
