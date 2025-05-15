import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

export default authMiddleware;
