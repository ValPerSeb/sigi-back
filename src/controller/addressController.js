import { getAddressById, createAddress, updateAddress, deleteAddress } from "../model/addressModel.js";

const addressDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const address = await getAddressById(id);

        if (!address) {
            return res.status(404).json({ message: "Ubicación no encontrada" });
        }

        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addAddress = async (req, res) => {
    try {
        const { address1, address2, postalCode, city, country } = req.body;

        if (!address1 || !city || !country) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const response = await createAddress({ address1, address2, postalCode, city, country });
        if (response.Success === 1) {
            res.status(200).json({ message: response.Message, id: response.id });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const { address1, address2, postalCode, city, country } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        if (!addressUno || !city || !country) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const response = await updateAddress(id, { address1, address2, postalCode, city, country });

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeAddress = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const response = await deleteAddress(id);

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { addressDetails, addAddress, editAddress, removeAddress };