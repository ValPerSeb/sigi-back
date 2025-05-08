import express  from 'express'
import { locationDetails, addLocation, editLocation, removeLocation } from '../controller/locationController.js'

const router = express.Router();

router.get('/:id', locationDetails);
router.post('/', addLocation);
router.put('/:id', editLocation);
router.delete('/:id', removeLocation);

export default router;