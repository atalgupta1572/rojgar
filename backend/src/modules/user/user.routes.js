import express from 'express';
import * as userController from './user.controller.js';
import { protect } from '../../middlewares/auth.js';

const router = express.Router();

// All user routes require authentication
router.use(protect);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

export default router;