import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema({
  phone: { type: String, required: true, index: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // Auto-delete after 5 minutes
});

const Otp = mongoose.model('Otp', OtpSchema);
export default Otp;