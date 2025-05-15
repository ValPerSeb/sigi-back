import express  from 'express'
import { addressDetails, addAddress, editAddress, removeAddress } from '../controller/addressController.js'
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const router = express.Router();

router.get('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), addressDetails);
router.post('/', addAddress);
router.put('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), editAddress);
router.delete('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), removeAddress);

export default router;