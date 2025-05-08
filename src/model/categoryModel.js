import { getConnection } from "../config/db.js";

const getAllCategories = async ()=>{
    const pool = await getConnection;
    const result = await pool.request().query('SELECT * FROM Category');
    return result.recordset;
}

const getCategoryById = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("SELECT * FROM Category WHERE CategoryId = @id");
    return result.recordset[0];
};

const createCategory = async ({ name, color }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("name", name)
        .input("color", color)
        .query("INSERT INTO Category (CategoryName, CategoryColor) VALUES (@name, @color)");
    return result;
};

const updateCategory = async (id, { name, color }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .input("name", name)
        .input("color", color)
        .query("UPDATE Category SET CategoryName = @name, CategoryColor = @color WHERE CategoryId = @id");
    return result.rowsAffected[0];
};

const deleteProduct = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("DELETE FROM Category WHERE CategoryId = @id");
    return result.rowsAffected[0];
};

export{getAllCategories, getCategoryById, createCategory, updateCategory, deleteProduct};