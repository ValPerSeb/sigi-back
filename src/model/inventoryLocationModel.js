import { getConnection, sql } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

const getAllInventoryLocations = async ()=>{
    const pool = await getConnection;
    const result = await pool.request().query('SELECT * FROM InventoryLocation');
    return result.recordset;
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