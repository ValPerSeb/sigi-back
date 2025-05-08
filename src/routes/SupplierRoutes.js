import express  from 'express'
import { listSuppliers, supplierDetails, addSupplier, editSupplier, removeSupplier } from '../controller/supplierController.js'

const router = express.Router();

router.get('/', listSuppliers);
router.get('/:id', supplierDetails);
router.post('/', addSupplier);
router.put('/:id', editSupplier);
router.delete('/:id', removeSupplier);

export default router;