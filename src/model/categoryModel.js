import { getConnection, sql } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

const getAllCategories = async ({ searchBy, searchValue, page, limit })=>{
    const pool = await getConnection;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM Category';
    let countQuery = 'SELECT COUNT(*) AS total FROM Category';
    const request = pool.request();

    if (searchBy && searchValue) {
        const allowedFields = ['CategoryName'];
        if (!allowedFields.includes(searchBy)) {
            throw new Error('Campo de búsqueda no permitido');
        }

        query += ` WHERE ${searchBy} LIKE @searchValue`;
        countQuery += ` WHERE ${searchBy} LIKE @searchValue`;
        request.input('searchValue', sql.VarChar, `%${searchValue}%`);
    }

    query += ` ORDER BY CategoryId OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;

    const result = await request.query(query);
    const countResult = await request.query(countQuery);

    return {
        data: result.recordset,
        total: countResult.recordset[0].total,
        page: Number(page),
        limit: Number(limit)
    };
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