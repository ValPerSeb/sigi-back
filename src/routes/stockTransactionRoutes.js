import express  from 'express'
import { listTransactions, transactionDetails, addTransaction, editTransaction, removeTransaction } from '../controller/stockTransactionController.js'

const router = express.Router();

router.get('/', listTransactions);
router.get('/:id', transactionDetails);
router.post('/', addTransaction);
router.put('/:id', editTransaction);
router.delete('/:id', removeTransaction);

export default router;