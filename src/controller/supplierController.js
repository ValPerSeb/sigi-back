import { getAllSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier } from "../model/supplierModel.js";

const listSuppliers = async (req, res) => {
    try {
        const suppliers = await getAllSuppliers();
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

        await createSupplier({ name, companyId, contactInfoId, locationId });

        res.status(200).json({ message: "Proveedor creado exitosamente" });
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

        const updated = await updateSupplier(id, { name, companyId, contactInfoId, locationId });

        if (updated === 0) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        res.status(200).json({ message: "Actualización exitosa" });
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

        const deleted = await deleteSupplier(id);

        if (deleted === 0) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        res.status(200).json({ message: "Eliminación exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { listSuppliers, supplierDetails, addSupplier, editSupplier, removeSupplier };