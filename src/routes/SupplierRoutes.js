import express  from 'express'
import { listSuppliers, supplierDetails, addSupplier, editSupplier, removeSupplier } from '../controller/supplierController.js'
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), listSuppliers);
router.get('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), supplierDetails);
router.post('/', authMiddleware, checkRoleMiddleware('SUPER','ADMIN'), addSupplier);
router.put('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN'), editSupplier);
router.delete('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN'), removeSupplier);

export default router;