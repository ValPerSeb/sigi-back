import express  from 'express'
import { productList, productDetails, addProduct, editProduct, removeProduct } from '../controller/productController.js'
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), productList);
router.get('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), productDetails);
router.post('/', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), addProduct);
router.put('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), editProduct);
router.delete('/:id', authMiddleware, checkRoleMiddleware('SUPER','ADMIN','USER'), removeProduct);

export default router;