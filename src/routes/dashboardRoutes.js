import express from 'express';
import { dashboardInfo } from '../controller/dashboardController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, dashboardInfo);

export default router;