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

        const response = await createInventoryLocation({ code, name, capacity, currentStock, isActive });
        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
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

        const response = await updateInventoryLocation(id, { code, name, capacity, currentStock, isActive });

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
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

        const response = await deleteInventoryLocation(id);

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { inventoryLocationList, inventoryLocationDetails, addInventoryLocation, editInventoryLocation, removeInventoryLocation };