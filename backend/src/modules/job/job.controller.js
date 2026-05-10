import * as jobService from './job.service.js';
import Job from '../../models/Job.js';

export const createJob = async (req, res, next) => {
  try {
    const job = await jobService.createJob(req.user.id, req.body);
    res.status(201).json({ message: 'Job created', data: job });
  } catch (error) {
    next(error);
  }
};

export const getNearbyJobs = async (req, res, next) => {
  try {
    const radius = req.query.radius ? parseInt(req.query.radius) : 10000;
    const jobs = await jobService.findNearbyJobsForWorker(req.user.id, radius);
    console.log(`Worker ${req.user.id} fetched ${jobs.length} jobs`);
    res.status(200).json({ data: jobs });
  } catch (error) {
    console.error('Error getting nearby jobs:', error);
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    res.status(200).json({ data: job });
  } catch (error) {
    next(error);
  }
};

export const getJobsByContractorPhone = async (req, res, next) => {
  try {
    const jobs = await jobService.findJobsByContractorPhone(req.params.phone);
    res.status(200).json({ data: jobs });
  } catch (error) {
    next(error);
  }
};

export const seedDemoJob = async (req, res, next) => {
  try {
    const job = await jobService.seedDemoJob();
    res.status(201).json({ message: 'Sample job added', data: job });
  } catch (error) {
    next(error);
  }
};
export const seedWorkerProfile = async (req, res, next) => {
  try {
    const worker = await jobService.seedWorkerProfile(req.user.id);
    res.status(200).json({ message: 'Worker profile seeded', data: worker });
  } catch (error) {
    next(error);
  }
};
export const getAllOpenJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ status: 'OPEN' });
    console.log(`Found ${jobs.length} open jobs in database for user ${req.user?.id || 'unknown'}`);
    res.status(200).json({ data: jobs });
  } catch (error) {
    console.error('Error getting all open jobs:', error);
    next(error);
  }
};

export const applyToJob = async (req, res, next) => {
  try {
    const { jobId, proposedWage } = req.body;
    const application = await jobService.applyToJob(req.user.id, jobId, proposedWage);
    res.status(201).json({ message: 'Applied successfully', data: application });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }
    next(error);
  }
};