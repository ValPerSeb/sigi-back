import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { getConnection } from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/category', productRoutes);
app.use('/company', productRoutes);
app.use('/contact-info', productRoutes);
app.use('/inventory-location', productRoutes);
app.use('/location', productRoutes);
app.use('/product', productRoutes);
app.use('/stock-transaction', productRoutes);
app.use('/supplier', productRoutes);
app.use('/user', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running in port: ${process.env.PORT}`);
    getConnection;
})