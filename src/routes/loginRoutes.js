import express  from 'express'
import { loginDetails, addLogin, editLogin, removeLogin } from '../controller/loginController.js'

const router = express.Router();

router.get('/:id', loginDetails);
router.post('/', addLogin);
router.put('/:id', editLogin);
router.delete('/:id', removeLogin);

export default router;