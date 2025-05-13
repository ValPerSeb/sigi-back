import { getContactInfoById, createContactInfo, updateContactInfo, deleteContactInfo } from "../model/contactInfoModel.js";

const contactInfoDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const contactInfo = await getContactInfoById(id);

        if (!contactInfo) {
            return res.status(404).json({ message: "Información de contacto no existe" });
        }

        res.status(200).json(contactInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addContactInfo = async (req, res) => {
    try {
        const { phone, mobile, email } = req.body;

        const response = await createContactInfo({ phone, mobile, email });
        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editContactInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { phone, mobile, email } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const response = await updateContactInfo(id, { phone, mobile, email });

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeContactInfo = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const response = await deleteContactInfo(id);

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { contactInfoDetails, addContactInfo, editContactInfo, removeContactInfo };