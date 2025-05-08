import express  from 'express'
import { listUsers, userDetails, addUser, editUser, removeUser } from '../controller/userController.js'

const router = express.Router();

router.get('/', listUsers);
router.get('/:id', userDetails);
router.post('/', addUser);
router.put('/:id', editUser);
router.delete('/:id', removeUser);

export default router;