import { getConnection, sql } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

const getAllInventoryLocations = async ({ searchBy, searchValue, page, limit })=>{
    const pool = await getConnection;
    const offset = (page - 1) * limit;

let query = 'SELECT * FROM InventoryLocation';
    let countQuery = 'SELECT COUNT(*) AS total FROM InventoryLocation';
    const request = pool.request();

    if (searchBy && searchValue) {
        const allowedFields = ['LocationName', 'IsActive'];
        if (!allowedFields.includes(searchBy)) {
            throw new Error('Campo de búsqueda no permitido');
        }

        query += ` WHERE ${searchBy} LIKE @searchValue`;
        countQuery += ` WHERE ${searchBy} LIKE @searchValue`;
        request.input('searchValue', sql.VarChar, `%${searchValue}%`);
    }

    query += ` ORDER BY InventoryLocationId OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;

    const result = await request.query(query);
    const countResult = await request.query(countQuery);

    return {
        data: result.recordset,
        total: countResult.recordset[0].total,
        page: Number(page),
        limit: Number(limit)
    };
}

const getInventoryLocationById = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("SELECT * FROM InventoryLocation WHERE InventoryLocationId = @id");
    return result.recordset[0];
};

const createInventoryLocation = async ({ code, name, capacity, currentStock, isActive}) => {
    const pool = await getConnection;
    const id = generateId('INV');
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("code", sql.VarChar(20), code)
        .input("name", sql.VarChar(30), name)
        .input("capacity", sql.Int, capacity)
        .input("currentStock", sql.Int, currentStock)
        .input("isActive", sql.Bit, isActive)
        .execute("CreateInventoryLocation");
    return result.recordset[0];
};

const updateInventoryLocation = async (id, { code, name, capacity, currentStock, isActive}) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("code", sql.VarChar(20), code)
        .input("name", sql.VarChar(30), name)
        .input("capacity", sql.Int, capacity)
        .input("currentStock", sql.Int, currentStock)
        .input("isActive", sql.Bit, isActive)
        .execute("UpdateInventoryLocation");
    return result.recordset[0];
};

const deleteInventoryLocation = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .execute("DeleteInventoryLocation");
    return result.recordset[0];
};

export{getAllInventoryLocations, getInventoryLocationById, createInventoryLocation, updateInventoryLocation, deleteInventoryLocation};