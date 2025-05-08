import express  from 'express'
import { companyList, companyDetails, addCompany, editCompany, removeCompany } from '../controller/companyController.js'

const router = express.Router();

router.get('/', companyList);
router.get('/:id', companyDetails);
router.post('/', addCompany);
router.put('/:id', editCompany);
router.delete('/:id', removeCompany);

export default router;