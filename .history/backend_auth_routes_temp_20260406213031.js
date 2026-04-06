import express from 'express';
import Joi from 'joi';
import User from '../models/User.model.js';
import { generateToken, generateRefreshToken } from '../middleware/auth.js';

const router = express.Router();

// Validation schemas
const registerSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  email: Joi.string().email().required().lowercase(),
  phone: Joi.string().required().regex(/^\+?[\d\s()-]{10,}$/),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  userType: Joi.string().valid('patient', 'doctor').required(),
  specialization: Joi.string().when('userType', {
    is: 'doctor',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().lowercase(),
  password: Joi.string().required(),
  userType: Joi.string().valid('patient', 'doctor').required(),
});

/**
 * POST /api/auth/register
 * Register a new user (patient or doctor)
 */
router.post('/register', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = registerSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: value.email }, { phone: value.phone }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email or phone already exists',
      });
    }

    // Create new user
    const newUser = new User({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      phone: value.phone,
      password: value.password,
      userType: value.userType,
      specialization: value.specialization || null,
    });

    await newUser.save();

    // Generate tokens
    const token = generateToken(newUser._id, newUser.userType);
    const refreshToken = generateRefreshToken(newUser._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        userId: newUser._id,
        email: newUser.email,
        userType: newUser.userType,
        token,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message,
    });
  }
});

/**
 * POST /api/auth/login
 * Login user and return JWT token
 */
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = loginSchema.validate(req.body, {
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }

    // Find user
    const user = await User.findOne({ email: value.email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(value.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check user type match
    if (user.userType !== value.userType) {
      return res.status(401).json({
        success: false,
        message: `This account is registered as ${user.userType}`,
      });
    }

    // Generate tokens
    const token = generateToken(user._id, user.userType);
    const refreshToken = generateRefreshToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        token,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message,
    });
  }
});

/**
 * POST /api/auth/refresh-token
 * Refresh access token using refresh token
 */
router.post('/refresh-token', (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token is required',
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    const newToken = generateToken(decoded.userId, decoded.userType);

    res.json({
      success: true,
      message: 'Token refreshed',
      data: {
        token: newToken,
      },
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Invalid refresh token',
    });
  }
});

export default router;
