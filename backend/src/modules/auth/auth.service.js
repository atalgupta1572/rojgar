import Otp from '../../models/Otp.js';
import User from '../../models/User.js';
import { generateTokens } from '../../utils/jwt.js';

export const generateAndSendOtp = async (phone) => {
  // Generate 4 digit OTP
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  
  // Save to DB (overwrites existing unexpired OTPs for this number)
  await Otp.findOneAndUpdate(
    { phone },
    { otp },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  // In a real app, call MSG91 here
  // await axios.post('MSG91_URL', { phone, otp });
  console.error(`================================\n[MOCK SMS] OTP for ${phone} is ${otp}\n================================`);

  return otp;
};

export const verifyOtpAndLogin = async (phone, otp, role) => {
  const record = await Otp.findOne({ phone, otp });
  
  if (!record) {
    throw new Error('Invalid or expired OTP');
  }

  // OTP is valid, delete it so it can't be reused
  await Otp.deleteOne({ _id: record._id });

  // Find or create user
  let user = await User.findOne({ phone });

  if (!user) {
    user = await User.create({
      phone,
      role
    });
  } else if (user.role !== role) {
    throw new Error(`Phone number already registered as ${user.role}`);
  }

  // Generate tokens
  const tokens = generateTokens(user._id, user.role);

  return {
    user,
    ...tokens
  };
};