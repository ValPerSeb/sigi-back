import express  from 'express'
import { productList, productDetails, addProduct, editProduct, removeProduct } from '../controller/productController.js'

const router = express.Router();

router.get('/', productList);
router.get('/:id', productDetails);
router.post('/', addProduct);
router.put('/:id', editProduct);
router.delete('/:id', removeProduct);

export default router;