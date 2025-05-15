import express  from 'express'
import { categoryList, categoryDetails, addCategory, editCategory, removeCategory } from '../controller/categoryController.js'
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), categoryList);
router.get('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), categoryDetails);
router.post('/', authMiddleware, checkRoleMiddleware('SUPER','ADMIN'), addCategory);
router.put('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN'), editCategory);
router.delete('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN'), removeCategory);

export default router;