import { getConnection } from "../config/db.js";

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
    const result = await pool.request()
        .input("productName", productName)
        .input("unitPrice", unitPrice)
        .input("stock", stock)
        .input("companyId", companyId)
        .input("supplierId", supplierId)
        .input("categoryId", categoryId)
        .input("inventoryLocationId", inventoryLocationId)
        .query("INSERT INTO Product (ProductName, UnitPrice, Stock, CompanyId, SupplierId, CategoryId, InventoryLocationId) VALUES (@productName, @unitPrice, @stock, @companyId, @supplierId, @categoryId, @inventoryLocationId)");
    return result;
};

const updateProduct = async (id, { productName, unitPrice, stock, companyId, supplierId, categoryId, inventoryLocationId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .input("productName", productName)
        .input("unitPrice", unitPrice)
        .input("stock", stock)
        .input("companyId", companyId)
        .input("supplierId", supplierId)
        .input("categoryId", categoryId)
        .input("inventoryLocationId", inventoryLocationId)
        .query("UPDATE Product SET ProductName = @productName, UnitPrice = @unitPrice, Stock = @stock, CompanyId = @companyId, SupplierId = @supplierId, CategoryId = @categoryId, InventoryLocationId = @inventoryLocationId WHERE ProductId = @id");
    return result.rowsAffected[0];
};

const deleteProduct = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("DELETE FROM Product WHERE ProductId = @id");
    return result.rowsAffected[0];
};

export{getAllProducts, getProductById, createProduct, updateProduct, deleteProduct};