import express from 'express';
import { toggleLikeSong, getLikedSongs } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/like', protect, toggleLikeSong);
userRouter.get('/likes', protect, getLikedSongs);

export default userRouter;
