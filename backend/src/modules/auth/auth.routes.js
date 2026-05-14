import express from 'express';
import * as authController from './auth.controller.js';
import validate from '../../middlewares/validate.js';
import { sendOtpSchema, verifyOtpSchema } from './auth.validation.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Send OTP to a phone number
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Bad request
 */
router.post('/send-otp', validate(sendOtpSchema), authController.sendOtp);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP and login/register
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - otp
 *               - role
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               otp:
 *                 type: string
 *                 example: "1234"
 *               role:
 *                 type: string
 *                 enum: [WORKER, CONTRACTOR]
 *                 example: "WORKER"
 *     responses:
 *       200:
 *         description: Authentication successful
 *       401:
 *         description: Invalid OTP
 */
router.post('/verify-otp', validate(verifyOtpSchema), authController.verifyOtp);

export default router;