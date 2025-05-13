import { getConnection } from "../config/db.js";
import { generateId } from "../utils/generateId.js";
import { sql } from "../config/db.js";

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
    const id = generateId('CAT'); 
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("name", sql.VarChar(30), name)
        .input("color", sql.VarChar(30), color)
        .execute("AddCategory");
    return result.recordset[0];
};

const updateCategory = async (id, { name, color }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("name", sql.VarChar(30), name)
        .input("color", sql.VarChar(30), color)
        .execute("UpdateCategory");
    return result.recordset[0];
};

const deleteCategory = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .execute("DeleteCategory");
    return result.recordset[0];
};

export{getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory};