import express  from 'express'
import { companyList, companyDetails, addCompany, editCompany, removeCompany } from '../controller/companyController.js'
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, checkRoleMiddleware('SUPER'), companyList);
router.get('/:id', authMiddleware, checkRoleMiddleware('SUPER'), companyDetails);
router.post('/', authMiddleware, checkRoleMiddleware('SUPER'), addCompany);
router.put('/:id', authMiddleware, checkRoleMiddleware('SUPER'), editCompany);
router.delete('/:id', authMiddleware, checkRoleMiddleware('SUPER'), removeCompany);

export default router;