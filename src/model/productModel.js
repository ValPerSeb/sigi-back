import { getConnection } from "../config/db.js";
import { generateId } from "../utils/generateId.js";
import { sql } from "../config/db.js";

const getAllProducts = async ()=>{
    const pool = await getConnection;
    const result = await pool.request().query('SELECT * FROM Product');
    return result.recordset;
}

const getProductById = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("SELECT * FROM Product WHERE ProductId = @id");
    return result.recordset[0];
};

const createProduct = async ({ productName, unitPrice, stock, companyId, supplierId, categoryId, inventoryLocationId }) => {
    const pool = await getConnection;
    const id = generateId('PRO'); 
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("productName", sql.VarChar(30), productName)
        .input("unitPrice", sql.Float, unitPrice)
        .input("stock", sql.Int, stock)
        .input("companyId", sql.VarChar(25), companyId)
        .input("supplierId", sql.VarChar(25), supplierId)
        .input("categoryId", sql.VarChar(25), categoryId)
        .input("inventoryLocationId", sql.VarChar(25), inventoryLocationId)
        .execute("CreateProduct");
    return result.recordset[0];
};

const updateProduct = async (id, { productName, unitPrice, stock, companyId, supplierId, categoryId, inventoryLocationId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("productName", sql.VarChar(30), productName)
        .input("unitPrice", sql.Float, unitPrice)
        .input("stock", sql.Int, stock)
        .input("companyId", sql.VarChar(25), companyId)
        .input("supplierId", sql.VarChar(25), supplierId)
        .input("categoryId", sql.VarChar(25), categoryId)
        .input("inventoryLocationId", sql.VarChar(25), inventoryLocationId)
        .execute("UpdateProduct");
    return result.recordset[0];
};

const deleteProduct = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .execute("DeleteProduct");
    return result.recordset[0];
};

export{getAllProducts, getProductById, createProduct, updateProduct, deleteProduct};