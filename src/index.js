import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { getConnection } from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/product', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running in port: ${process.env.PORT}`);
    getConnection;
})