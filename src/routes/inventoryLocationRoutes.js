import express  from 'express'
import { inventoryLocationList, inventoryLocationDetails, addInventoryLocation, editInventoryLocation, removeInventoryLocation } from '../controller/inventoryLocationController.js'
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), inventoryLocationList);
router.get('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), inventoryLocationDetails);
router.post('/', authMiddleware, checkRoleMiddleware('SUPER','ADMIN'), addInventoryLocation);
router.put('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN'), editInventoryLocation);
router.delete('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN'), removeInventoryLocation);

export default router;