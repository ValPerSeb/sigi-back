import express  from 'express'
import { contactInfoDetails, addContactInfo, editContactInfo, removeContactInfo } from '../controller/contactInfoController.js'

const router = express.Router();

router.get('/:id', contactInfoDetails);
router.post('/', addContactInfo);
router.put('/:id', editContactInfo);
router.delete('/:id', removeContactInfo);

export default router;