import express from 'express';
import * as jobController from './job.controller.js';
import { protect, authorize } from '../../middlewares/auth.js';

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job (Contractor only)
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - wage
 *               - workersNeeded
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Need 5 masons for building site"
 *               category:
 *                 type: string
 *                 example: "Construction"
 *               wage:
 *                 type: number
 *                 example: 600
 *               workersNeeded:
 *                 type: number
 *                 example: 5
 *               address:
 *                 type: string
 *                 example: "Mumbai Naka, Nashik"
 *               description:
 *                 type: string
 *                 example: "Daily work starting tomorrow at 9 AM"
 *     responses:
 *       201:
 *         description: Job created successfully
 *       403:
 *         description: Forbidden (Not a contractor)
 */
// Contractor routes
router.post('/', authorize('CONTRACTOR'), jobController.createJob);

/**
 * @swagger
 * /api/jobs/nearby:
 *   get:
 *     summary: Get nearby open jobs (Worker only)
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *         description: Latitude
 *       - in: query
 *         name: lng
 *         schema:
 *           type: number
 *         description: Longitude
 *       - in: query
 *         name: radius
 *         schema:
 *           type: number
 *         description: Search radius in km (default 10)
 *     responses:
 *       200:
 *         description: List of nearby jobs
 */
// Worker routes
router.get('/nearby', authorize('WORKER'), jobController.getNearbyJobs);

/**
 * @swagger
 * /api/jobs/contractor/{phone}:
 *   get:
 *     summary: Get jobs posted by a specific contractor
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of contractor's jobs
 */
router.get('/contractor/:phone', authorize('WORKER', 'CONTRACTOR'), jobController.getJobsByContractorPhone);

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Get job details by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job details
 *       404:
 *         description: Job not found
 */
router.get('/:id', authorize('WORKER', 'CONTRACTOR'), jobController.getJobById);
router.post('/seed-demo', jobController.seedDemoJob);
router.post('/seed-worker-profile', authorize('WORKER'), jobController.seedWorkerProfile);
router.get('/all/open', authorize('WORKER'), jobController.getAllOpenJobs); // Debug endpoint
router.post('/apply', authorize('WORKER'), jobController.applyToJob);

export default router;