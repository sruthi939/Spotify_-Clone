import express from 'express';
import { registerUser, loginUser, upgradeToArtist } from '../controllers/authController.js';
import { protect, admin } from '../middleware/auth.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

// Admin route to upgrade a regular listener to an artist
authRouter.put('/upgrade/:id', protect, admin, upgradeToArtist);

export default authRouter;
