import express from 'express';
import {
  createProject,
  getProjects,
} from '../controllers/projectController.js';

import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', protect, adminOnly, createProject);
router.get('/', protect, getProjects);

export default router;