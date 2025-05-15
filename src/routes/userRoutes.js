import express  from 'express'
import { userList, userDetails, addUser, editUser, removeUser } from '../controller/userController.js'
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, checkRoleMiddleware('SUPER','ADMIN'), userList);
router.get('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), userDetails);
router.post('/', addUser);
router.put('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), editUser);
router.delete('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN'), removeUser);

export default router;