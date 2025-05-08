import express  from 'express'
import { categoryList, categoryDetails, addCategory, editCategory, removeCategory } from '../controller/categoryController.js'

const router = express.Router();

router.get('/', categoryList);
router.get('/:id', categoryDetails);
router.post('/', addCategory);
router.put('/:id', editCategory);
router.delete('/:id', removeCategory);

export default router;