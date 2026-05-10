import express from 'express';
import * as authController from './auth.controller.js';
import validate from '../../middlewares/validate.js';
import { sendOtpSchema, verifyOtpSchema } from './auth.validation.js';

const router = express.Router();

router.post('/send-otp', validate(sendOtpSchema), authController.sendOtp);
router.post('/verify-otp', validate(verifyOtpSchema), authController.verifyOtp);

export default router;