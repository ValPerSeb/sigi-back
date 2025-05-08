import { getLoginByUserName, createLogin, updateLogin, deleteLogin } from "../model/loginModel.js";

const loginDetails = async (req, res) => {
    try {
        const { userName } = req.params;

        if (!userName) {
            return res.status(400).json({ message: "El nombre de usuario es obligatorio" });
        }

        const login = await getLoginByUserName(userName);

        if (!login) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json(login);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addLogin = async (req, res) => {
    try {
        const { userName, password, rol, userInfoId, companyId } = req.body;

        if (!userName || !password || !rol || !userInfoId || !companyId) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        await createLogin({ userName, password, rol, userInfoId, companyId });
        res.status(200).json({ message: "Creación exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editLogin = async (req, res) => {
    try {
        const { id } = req.params;
        const { userName, password, rol, userInfoId, companyId } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        if (!userName || !password || !rol || !userInfoId || !companyId) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const affectedRows = await updateLogin(id, { userName, password, rol, userInfoId, companyId });

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Actualización exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeLogin = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const affectedRows = await deleteLogin(id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Eliminación exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { loginDetails, addLogin, editLogin, removeLogin };