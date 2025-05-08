import { getAllCompanies, getCompanyById, createCompany, updateCompany, deleteCompany } from "../model/companyModel"

const companyList = async (req,res) => {
    try {
        const companies = await getAllCompanies();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const companyDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const company = await getCompanyById(id);

        if (!company) {
            return res.status(404).json({ message: "Compañia no existe" });
        }
        
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCompany = async (req, res) => {
    try {
        const { name, nit, website, industryType, legalRep, logo, contactInfoId, locationId } = req.body;
        if ( !name || !nit || !contactInfoId || !locationId ) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        await createCompany({ name, nit, website, industryType, legalRep, logo, contactInfoId, locationId });
        res.status(200).json({ message: "Creación existosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, nit, website, industryType, legalRep, logo, contactInfoId, locationId } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        if (!name || !nit || !contactInfoId || !locationId ) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const affectedRows = await updateCompany(id, { name, nit, website, industryType, legalRep, logo, contactInfoId, locationId });

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Compañia no existe" });
        }

        res.status(200).json({ message: "Actualización exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeCompany = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const affectedRows = await deleteCompany(id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Compañia no existe" });
        }

        res.status(200).json({ message: "Eliminación existosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export{ companyList, companyDetails, addCompany, editCompany, removeCompany };