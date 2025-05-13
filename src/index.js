import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { getConnection } from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import contactInfoRoutes from './routes/contactInfoRoutes.js';
import inventoryLocationRoutes from './routes/inventoryLocationRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import productRoutes from './routes/productRoutes.js';
import stockTransactionRoutes from './routes/stockTransactionRoutes.js';
import supplierRoutes from './routes/SupplierRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/category', categoryRoutes);
app.use('/company', companyRoutes);
app.use('/contact-info', contactInfoRoutes);
app.use('/inventory-location', inventoryLocationRoutes);
app.use('/location', locationRoutes);
app.use('/product', productRoutes);
app.use('/stock-transaction', stockTransactionRoutes);
app.use('/supplier', supplierRoutes);
app.use('/user', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running in port: ${process.env.PORT}`);
    getConnection;
})