import { getConnection, sql } from "../config/db.js";
import { COMPANY_ID } from "../index.js";
import { generateId } from "../utils/generateId.js";

const getAllCategories = async ({ searchBy, searchValue, page, limit })=>{
    const pool = await getConnection;
    const result = await pool.request()
        .input('searchBy', sql.NVarChar, searchBy)
        .input('searchValue', sql.NVarChar, searchValue)
        .input('page', sql.Int, page)
        .input('limit', sql.Int, limit)
        .input('companyId', COMPANY_ID)
        .execute("GetCategories");

    return {
        data: result.recordsets[0],
        total: result.recordsets[1][0].total,
        page,
        limit
    };
}

const getCategoryById = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("SELECT * FROM Category WHERE Id = @id");
    return result.recordset[0];
};

const createCategory = async ({ name, color }) => {
    const pool = await getConnection;
    const id = generateId('CAT'); 
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("name", sql.VarChar(30), name)
        .input("color", sql.VarChar(30), color)
        .input('companyId', COMPANY_ID)
        .execute("CreateCategory");
    return {...result.recordset[0], id};
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