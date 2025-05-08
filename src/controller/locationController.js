import { getLocationById, createLocation, updateLocation, deleteLocation } from "../model/locationModel.js";

const locationDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const location = await getLocationById(id);

        if (!location) {
            return res.status(404).json({ message: "Ubicación no encontrada" });
        }

        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addLocation = async (req, res) => {
    try {
        const { addressUno, addressDos, postalCode, city, country } = req.body;

        if (!addressUno || !city || !country) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        await createLocation({ addressUno, addressDos, postalCode, city, country });
        res.status(200).json({ message: "Creación exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const { addressUno, addressDos, postalCode, city, country } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        if (!addressUno || !city || !country) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const affectedRows = await updateLocation(id, { addressUno, addressDos, postalCode, city, country });

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Ubicación no encontrada" });
        }

        res.status(200).json({ message: "Actualización exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeLocation = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const affectedRows = await deleteLocation(id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Ubicación no encontrada" });
        }

        res.status(200).json({ message: "Eliminación exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { locationDetails, addLocation, editLocation, removeLocation };