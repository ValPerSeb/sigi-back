import { getConnection, sql } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

const getAllProducts = async ({ searchBy, searchValue, page, limit })=>{
    const pool = await getConnection;
    const result = await pool.request()
        .input('searchBy', sql.NVarChar, searchBy)
        .input('searchValue', sql.NVarChar, searchValue)
        .input('page', sql.Int, page)
        .input('limit', sql.Int, limit)
        .execute("GetProducts");

    return {
        data: result.recordsets[0],
        total: result.recordsets[1][0].total,
        page,
        limit
    };
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
    return {...result.recordset[0], id};
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