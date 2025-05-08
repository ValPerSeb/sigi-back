import { getAllInventoryLocations, getInventoryLocationById, createInventoryLocation, updateInventoryLocation, deleteInventoryLocation } from "../model/inventoryLocationModel.js";

const inventoryLocationList = async (req, res) => {
    try {
        const locations = await getAllInventoryLocations();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const inventoryLocationDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const location = await getInventoryLocationById(id);

        if (!location) {
            return res.status(404).json({ message: "Ubicación de inventario no existe" });
        }

        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addInventoryLocation = async (req, res) => {
    try {
        const { code, name, capacity, currentStock, isActive } = req.body;

        if (!code || !name || !capacity || !currentStock || !isActive) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        await createInventoryLocation({ code, name, capacity, currentStock, isActive });
        res.status(200).json({ message: "Creación exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editInventoryLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, name, capacity, currentStock, isActive } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        if (!code || !name || !capacity || !currentStock || !isActive) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const affectedRows = await updateInventoryLocation(id, { code, name, capacity, currentStock, isActive });

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Ubicación de inventario no existe" });
        }

        res.status(200).json({ message: "Actualización exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeInventoryLocation = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const affectedRows = await deleteInventoryLocation(id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Ubicación de inventario no existe" });
        }

        res.status(200).json({ message: "Eliminación exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { inventoryLocationList, inventoryLocationDetails, addInventoryLocation, editInventoryLocation, removeInventoryLocation };