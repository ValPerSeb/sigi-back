import { getAllUsers, getUserInfobyId, createUserInfo, updateUserInfo, deleteUserInfo } from "../model/userInfoModel.js";

const listUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const userDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const user = await getUserInfobyId(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addUser = async (req, res) => {
    try {
        const {
            firstName,
            middleName,
            lastName,
            secondLastName,
            dateOfBirth,
            idType,
            idNumber,
            contactInfoId
        } = req.body;

        if (!firstName || !lastName || !dateOfBirth || !idType || !idNumber || !contactInfoId) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        await createUserInfo({
            firstName,
            middleName,
            lastName,
            secondLastName,
            dateOfBirth,
            idType,
            idNumber,
            contactInfoId
        });

        res.status(200).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            firstName,
            middleName,
            lastName,
            secondLastName,
            dateOfBirth,
            idType,
            idNumber,
            contactInfoId
        } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        if (!firstName || !lastName || !dateOfBirth || !idType || !idNumber || !contactInfoId) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const updated = await updateUserInfo(id, {
            firstName,
            middleName,
            lastName,
            secondLastName,
            dateOfBirth,
            idType,
            idNumber,
            contactInfoId
        });

        if (updated === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Actualización exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const deleted = await deleteUserInfo(id);

        if (deleted === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Eliminación exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { listUsers, userDetails, addUser, editUser, removeUser };