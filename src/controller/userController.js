import { getAllUsers, getUserInfobyId, createUserInfo, updateUserInfo, deleteUserInfo } from "../model/userModel.js";
import bcrypt from 'bcrypt';

const userList = async (req, res) => {
    try {
        const { searchBy = null, searchValue = null, page = 1, limit = 10 } = req.query;
        const products = await getAllUsers({ searchBy, searchValue, page: parseInt(page, 10), limit: parseInt(limit, 10) });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
        const { userName, password, rol, firstName, middleName, lastName, secondLastName, email, phoneNumber, addressId } = req.body;

        if (!userName || !password || !rol || !firstName || !lastName || !addressId) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const response = await createUserInfo({ userName, password: hashedPassword, rol, firstName, middleName, lastName, secondLastName, email, phoneNumber, addressId });

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message, id: response.id });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { userName, password, rol, firstName, middleName, lastName, secondLastName, email, phoneNumber, addressId } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        if (!userName || !rol || !firstName || !lastName || !addressId) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        let hashedPassword = null;
        if (password) {
            const salt = 10;
            hashedPassword = await bcrypt.hash(password, salt);
        }

        const response = await updateUserInfo(id, { userName, password: hashedPassword, rol, firstName, middleName, lastName, secondLastName, email, phoneNumber, addressId });

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
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

        const response = await deleteUserInfo(id);

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { userList, userDetails, addUser, editUser, removeUser };