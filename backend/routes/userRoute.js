import express from 'express';
import { toggleLikeSong, getLikedSongs, listUsers } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/like', protect, toggleLikeSong);
userRouter.get('/likes', protect, getLikedSongs);
userRouter.get('/list', listUsers); // For now keeping it simple without protect for admin visibility

export default userRouter;
