import express  from 'express'
import { inventoryLocationList, inventoryLocationDetails, addInventoryLocation, editInventoryLocation, removeInventoryLocation } from '../controller/inventoryLocationController.js'

const router = express.Router();

router.get('/', inventoryLocationList);
router.get('/:id', inventoryLocationDetails);
router.post('/', addInventoryLocation);
router.put('/:id', editInventoryLocation);
router.delete('/:id', removeInventoryLocation);

export default router;