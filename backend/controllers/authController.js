import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key', {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please add all fields' });
        }

        // Check if user exists
        const userExists = await userModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            res.status(201).json({
                success: true,
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ success: false, message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user email
        const user = await userModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                success: true,
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Upgrade user to Artist (Admin only or self-request)
// @route   PUT /api/users/upgrade/:id
// @access  Private/Admin
export const upgradeToArtist = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (user) {
            user.role = 'artist';
            user.artistName = req.body.artistName || user.name;
            
            const updatedUser = await user.save();
            
            res.json({
                success: true,
                _id: updatedUser._id,
                name: updatedUser.name,
                role: updatedUser.role,
                artistName: updatedUser.artistName,
                message: 'User successfully upgraded to Artist'
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
