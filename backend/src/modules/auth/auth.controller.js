import * as authService from './auth.service.js';

export const sendOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;
    await authService.generateAndSendOtp(phone);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp, role } = req.body;
    const result = await authService.verifyOtpAndLogin(phone, otp, role);
    
    res.status(200).json({
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    if (error.message.includes('Invalid or expired')) {
      return res.status(401).json({ message: error.message });
    }
    if (error.message.includes('already registered')) {
      return res.status(409).json({ message: error.message });
    }
    next(error);
  }
};