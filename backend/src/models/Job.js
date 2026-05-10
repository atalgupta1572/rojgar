import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  contractorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  contractorPhone: { type: String, index: true },
  contractorName: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  requiredSkills: [{ type: String, required: true }],
  tasks: [{ type: String }],
  duration: { type: String },
  paymentType: { type: String, enum: ['HOURLY', 'DAILY', 'FIXED'], default: 'DAILY' },
  offeredWage: { type: Number, required: true },
  totalPayment: { type: Number },
  contact: {
    phone: { type: String },
    email: { type: String }
  },
  employerDetails: {
    name: { type: String },
    company: { type: String }
  },
  additionalInstructions: { type: String },
  
  // GeoJSON for job location
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
    address: { type: String }
  },
  
  jobDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], 
    default: 'OPEN' 
  },
  hiredWorkerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

JobSchema.index({ location: '2dsphere' });
JobSchema.index({ status: 1 });

const Job = mongoose.model('Job', JobSchema);
export default Job;