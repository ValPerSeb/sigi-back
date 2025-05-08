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

const createProduct = async ({ name, price, stock, companyId, supplierId, categoryId, inventoryLocationId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("name", name)
        .input("price", price)
        .input("stock", stock)
        .input("companyId", companyId)
        .input("supplierId", supplierId)
        .input("categoryId", categoryId)
        .input("inventoryLocationId", inventoryLocationId)
        .query("INSERT INTO Product (ProductName, UnitPrice, Stock, CompanyId, SupplierId, CategoryId, InventoryLocationId) VALUES (@name, @price, @stock, @companyId, @supplierId, @categoryId, @inventoryLocationId)");
    return result;
};

const updateProduct = async (id, { name, price, stock, companyId, supplierId, categoryId, inventoryLocationId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .input("name", name)
        .input("price", price)
        .input("stock", stock)
        .input("companyId", companyId)
        .input("supplierId", supplierId)
        .input("categoryId", categoryId)
        .input("inventoryLocationId", inventoryLocationId)
        .query("UPDATE Product SET ProductName = @name, UnitPrice = @price, Stock = @stock, CompanyId = @companyId, SupplierId = @supplierId, CategoryId = @categoryId, InventoryLocationId = @inventoryLocationId WHERE ProductId = @id");
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