import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true, index: true },
  role: { type: String, enum: ['WORKER', 'CONTRACTOR', 'ADMIN'], required: true },
  name: { type: String },
  profilePicture: { type: String },
  status: { type: String, enum: ['ACTIVE', 'INACTIVE', 'BANNED'], default: 'ACTIVE' },
  
  // Location Data (GeoJSON)
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }, // [longitude, latitude]
    address: { type: String }
  },

  // --- WORKER SPECIFIC DATA ---
  workerProfile: {
    skills: [{ type: String }],
    dailyWage: { type: Number },
    experienceYears: { type: Number },
    availabilityStatus: { type: String, enum: ['AVAILABLE', 'ON_JOB', 'OFFLINE'], default: 'AVAILABLE' },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
  },

  // --- CONTRACTOR SPECIFIC DATA ---
  contractorProfile: {
    companyName: { type: String },
    gstNumber: { type: String },
    rating: { type: Number, default: 0 }
  }
}, { timestamps: true });

UserSchema.index({ location: '2dsphere' });
UserSchema.index({ 'workerProfile.skills': 1 });

const User = mongoose.model('User', UserSchema);
export default User;