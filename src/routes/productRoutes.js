import express  from 'express'
import { productList } from '../controller/productController.js'

const router = express.Router();

router.get('/', productList);

export default router;