import express from 'express';
import { createPlaylist, getUserPlaylists, addSongToPlaylist, removePlaylist } from '../controllers/playlistController.js';
import { protect } from '../middleware/auth.js';

const playlistRouter = express.Router();

// All playlist routes require the user to be logged in
playlistRouter.use(protect);

playlistRouter.post('/create', createPlaylist);
playlistRouter.get('/user', getUserPlaylists);
playlistRouter.post('/add-song', addSongToPlaylist);
playlistRouter.post('/remove', removePlaylist);

export default playlistRouter;
