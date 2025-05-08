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

        await createContactInfo({ phone, mobile, email });
        res.status(200).json({ message: "Creación exitosa" });
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

        const affectedRows = await updateContactInfo(id, { phone, mobile, email });

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Información de contacto no existe" });
        }

        res.status(200).json({ message: "Actualización exitosa" });
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

        const affectedRows = await deleteContactInfo(id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Información de contacto no existe" });
        }

        res.status(200).json({ message: "Eliminación exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { contactInfoDetails, addContactInfo, editContactInfo, removeContactInfo };