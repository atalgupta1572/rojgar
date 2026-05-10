import Job from '../../models/Job.js';
import User from '../../models/User.js';
import Application from '../../models/Application.js';
import { io } from '../../server.js'; // For realtime alerts

export const createJob = async (contractorId, jobData) => {
  if (!jobData.requiredSkills || !Array.isArray(jobData.requiredSkills) || jobData.requiredSkills.length === 0 || !jobData.requiredSkills[0]) {
    throw new Error('Please select at least one worker skill before posting the job.');
  }

  if (!jobData.location || !Array.isArray(jobData.location.coordinates) || jobData.location.coordinates.length !== 2) {
    throw new Error('Job location coordinates are required.');
  }

  const contractor = await User.findById(contractorId).select('phone name');

  const job = await Job.create({
    contractorId,
    contractorPhone: contractor?.phone,
    contractorName: contractor?.name,
    ...jobData
  });

  // REALTIME: Notify nearby workers asynchronously
  notifyNearbyWorkers(job);

  return job;
};

const notifyNearbyWorkers = async (job) => {
  try {
    // Find ACTIVE workers within 10km who have at least one of the required skills
    const nearbyWorkers = await User.find({
      role: 'WORKER',
      status: 'ACTIVE',
      'workerProfile.availabilityStatus': 'AVAILABLE',
      'workerProfile.skills': { $in: job.requiredSkills },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: job.location.coordinates
          },
          $maxDistance: 10000 // 10km in meters
        }
      }
    }).select('_id');

    // Emit socket event to those specific workers
    // In server.js, workers will join a room with their userId when they connect
    nearbyWorkers.forEach(worker => {
      io.to(worker._id.toString()).emit('job_created', {
        message: 'New job matches your skills nearby!',
        jobId: job._id,
        title: job.title
      });
    });
  } catch (error) {
    console.error('Error notifying workers:', error);
  }
};

export const findNearbyJobsForWorker = async (workerId) => {
  const worker = await User.findById(workerId);
  if (!worker || worker.role !== 'WORKER') throw new Error('Worker not found');

  const jobs = await Job.find({ status: 'OPEN' })
    .sort({ createdAt: -1 })
    .lean();

  console.log(`Worker ${workerId} fetched ${jobs.length} open jobs without filtering`);

  return jobs.map(job => ({
    ...job,
    distance: null,
    matchScore: 0
  }));
};

export const findJobsByContractorPhone = async (phone) => {
  const contractor = await User.findOne({ phone, role: 'CONTRACTOR' });
  if (!contractor) throw new Error('Contractor not found');

  const jobs = await Job.find({ status: 'OPEN', contractorId: contractor._id })
    .sort({ createdAt: -1 })
    .lean();

  return jobs.map(job => ({
    ...job,
    distance: null,
    matchScore: 0
  }));
};

export const seedWorkerProfile = async (workerId) => {
  const worker = await User.findById(workerId);
  if (!worker || worker.role !== 'WORKER') throw new Error('Worker not found');

  // Seed with demo data
  worker.name = worker.name || 'Demo Worker';
  worker.workerProfile = {
    skills: ['Construction', 'Painting', 'Electrical'],
    dailyWage: 500,
    experienceYears: 3,
    availabilityStatus: 'AVAILABLE',
    rating: 4.5,
    totalReviews: 10
  };
  worker.location = {
    type: 'Point',
    coordinates: [77.5946, 12.9716], // Bangalore coordinates
    address: 'Bangalore, Karnataka'
  };

  await worker.save();
  return worker;
};

export const seedDemoJob = async () => {
  const existingJob = await Job.findOne({ title: /construction site helper/i, status: 'OPEN' });
  if (existingJob) return existingJob;

  let contractor = await User.findOne({ role: 'CONTRACTOR', phone: '9999999999' });
  if (!contractor) {
    contractor = await User.create({
      phone: '9999999999',
      role: 'CONTRACTOR',
      name: 'Rajesh Sharma',
      status: 'ACTIVE',
      location: {
        type: 'Point',
        coordinates: [77.2090, 28.6139],
        address: 'Sector 14, Delhi'
      },
      contractorProfile: {
        companyName: 'CityBuild Contractors Pvt. Ltd.',
        rating: 4.7
      }
    });
  }

  const job = await Job.create({
    contractorId: contractor._id,
    title: 'Construction Site Helper',
    description: 'Assist the construction team with basic site work, material handling, and cleanup.',
    requiredSkills: ['helper'],
    tasks: [
      'Carry and organize construction materials',
      'Unload supplies and tools',
      'Maintain a clean, safe work area',
      'Support team members with simple labor tasks'
    ],
    duration: '2 weeks, Monday to Friday 8:00 AM – 5:00 PM',
    paymentType: 'DAILY',
    offeredWage: 1400,
    totalPayment: 14000,
    contact: {
      phone: '+91 98765 43210',
      email: 'projects@citybuildco.com'
    },
    employerDetails: {
      name: 'Mr. Rajesh Sharma',
      company: 'CityBuild Contractors Pvt. Ltd.'
    },
    additionalInstructions: 'Arrive 15 minutes early, wear safety gear, and bring a photo ID.',
    location: {
      type: 'Point',
      coordinates: [77.2090, 28.6139],
      address: '123 Riverside Construction Park, Plot 18, Sector 5, Newtown Industrial Area, Cityville, State 56789'
    },
    jobDate: new Date(),
    status: 'OPEN'
  });

  return job;
};

export const getJobById = async (jobId) => {
  const job = await Job.findById(jobId).populate('contractorId', 'name phone contractorProfile');
  if (!job) throw new Error('Job not found');

  const contractor = job.contractorId
    ? {
        name: job.contractorId.name,
        phone: job.contractorId.phone,
        companyName: job.contractorId.contractorProfile?.companyName
      }
    : null;

  return {
    ...job.toObject(),
    contractor,
    employerDetails: job.employerDetails || {
      name: contractor?.name || 'Hiring Manager',
      company: contractor?.companyName || 'Contractor'
    }
  };
};

export const applyToJob = async (workerId, jobId, proposedWage) => {
  const job = await Job.findById(jobId);
  if (!job) throw new Error('Job not found');
  if (job.status !== 'OPEN') throw new Error('Job is no longer open');

  const application = await Application.create({
    jobId,
    workerId,
    proposedWage: proposedWage || job.offeredWage
  });

  // REALTIME: Notify contractor
  io.to(job.contractorId.toString()).emit('new_application', {
    message: 'A worker applied to your job',
    jobId: job._id,
    applicationId: application._id
  });

  return application;
};