import express  from 'express'
import { listTransactions, transactionDetails } from '../controller/stockTransactionController.js'
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), listTransactions);
router.get('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), transactionDetails);

export default router;