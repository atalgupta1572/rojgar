import express from 'express';
import * as jobController from './job.controller.js';
import { protect, authorize } from '../../middlewares/auth.js';

const router = express.Router();

router.use(protect);

// Contractor routes
router.post('/', authorize('CONTRACTOR'), jobController.createJob);

// Worker routes
router.get('/nearby', authorize('WORKER'), jobController.getNearbyJobs);
router.get('/contractor/:phone', authorize('WORKER', 'CONTRACTOR'), jobController.getJobsByContractorPhone);
router.get('/:id', authorize('WORKER', 'CONTRACTOR'), jobController.getJobById);
router.post('/seed-demo', jobController.seedDemoJob);
router.post('/seed-worker-profile', authorize('WORKER'), jobController.seedWorkerProfile);
router.get('/all/open', authorize('WORKER'), jobController.getAllOpenJobs); // Debug endpoint
router.post('/apply', authorize('WORKER'), jobController.applyToJob);

export default router;