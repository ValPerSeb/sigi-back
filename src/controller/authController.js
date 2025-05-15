import { getUserInfobyUserName } from "../model/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const jwtExpires = process.env.JWT_EXPIRES;

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const user = await getUserInfobyUserName(userName);

        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const validPassword = await bcrypt.compare(password, user.Password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const payload = {
            userId: user.Id,
            userName: user.UserName,
            rol: user.Rol,
            companyId: user.CompanyId
        };

        const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpires });

        res.status(200).json({ message: 'Login exitoso', token});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { login };