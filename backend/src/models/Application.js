import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  status: { 
    type: String, 
    enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED'], 
    default: 'PENDING' 
  },
  proposedWage: { type: Number }
}, { timestamps: true });

ApplicationSchema.index({ jobId: 1, workerId: 1 }, { unique: true });

const Application = mongoose.model('Application', ApplicationSchema);
export default Application;