import { getAllSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier } from "../model/supplierModel.js";

const listSuppliers = async (req, res) => {
    try {
        const { searchBy = null, searchValue = null, page = 1, limit = 10 } = req.query;
        const suppliers = await getAllSuppliers({ searchBy, searchValue, page: parseInt(page, 10), limit: parseInt(limit, 10) });
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const supplierDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const supplier = await getSupplierById(id);

        if (!supplier) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addSupplier = async (req, res) => {
    try {
        const { name, companyId, contactInfoId, locationId } = req.body;

        if (!name || !companyId || !contactInfoId || !locationId) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const response = await createSupplier({ name, companyId, contactInfoId, locationId });

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message, id: response.id });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, companyId, contactInfoId, locationId } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        if (!name || !companyId || !contactInfoId || !locationId) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const response = await updateSupplier(id, { name, companyId, contactInfoId, locationId });

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const response = await deleteSupplier(id);

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { listSuppliers, supplierDetails, addSupplier, editSupplier, removeSupplier };