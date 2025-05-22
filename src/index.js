import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { getConnection } from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import inventoryLocationRoutes from './routes/inventoryLocationRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import productRoutes from './routes/productRoutes.js';
import stockTransactionRoutes from './routes/stockTransactionRoutes.js';
import supplierRoutes from './routes/SupplierRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

const app = express();

export const COMPANY_ID = process.env.COMPANY_ID;

app.use(cors());
app.use(express.json());

app.use('/login', authRoutes);
app.use('/category', categoryRoutes);
app.use('/company', companyRoutes);
app.use('/inventory-location', inventoryLocationRoutes);
app.use('/address', addressRoutes);
app.use('/product', productRoutes);
app.use('/stock-transaction', stockTransactionRoutes);
app.use('/supplier', supplierRoutes);
app.use('/user', userRoutes);
app.use('/dashboard', dashboardRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running in port: ${process.env.PORT}`);
    getConnection;
})