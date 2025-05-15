import express  from 'express'
import { addressDetails, addAddress, editAddress, removeAddress } from '../controller/addressController.js'

const router = express.Router();

router.get('/:id', addressDetails);
router.post('/', addAddress);
router.put('/:id', editAddress);
router.delete('/:id', removeAddress);

export default router;