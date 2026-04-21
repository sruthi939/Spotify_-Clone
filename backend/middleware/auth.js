import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Verify User Token
export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            
            // Decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await userModel.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

// Check if user is Admin
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Not authorized as an admin' });
    }
};

// Check if user is Artist or Admin (Artists can upload, Admins can manage everything)
export const artistOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'artist' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Not authorized, requires artist permissions' });
    }
};
