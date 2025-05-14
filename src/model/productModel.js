import { getConnection, sql } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

const getAllProducts = async ({ searchBy, searchValue, page, limit })=>{
    const pool = await getConnection;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM Product';
    let countQuery = 'SELECT COUNT(*) AS total FROM Product';
    const request = pool.request();

    if (searchBy && searchValue) {
        const allowedFields = ['ProductName', 'CategoryId'];
        if (!allowedFields.includes(searchBy)) {
            throw new Error('Campo de búsqueda no permitido');
        }

        query += ` WHERE ${searchBy} LIKE @searchValue`;
        countQuery += ` WHERE ${searchBy} LIKE @searchValue`;
        request.input('searchValue', sql.VarChar, `%${searchValue}%`);
    }

    query += ` ORDER BY ProductId OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;

    const result = await request.query(query);
    const countResult = await request.query(countQuery);

    return {
        data: result.recordset,
        total: countResult.recordset[0].total,
        page: Number(page),
        limit: Number(limit)
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