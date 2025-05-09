import { getConnection } from "../config/db.js";
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
        .input("id", id)
        .input("code", code)
        .input("name", name)
        .input("capacity", capacity)
        .input("currentStock", currentStock)
        .input("isActive", isActive)
        .query("INSERT INTO InventoryLocation (InventoryLocationId, LocationCode, LocationName, Capacity, CurrentStock, IsActive) VALUES (@id, @code, @name, @capacity, @currentStock, @isActive)");
    return result;
};

const updateInventoryLocation = async (id, { code, name, capacity, currentStock, isActive}) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .input("code", code)
        .input("name", name)
        .input("capacity", capacity)
        .input("currentStock", currentStock)
        .input("isActive", isActive)
        .query("UPDATE InventoryLocation SET LocationCode = @code, LocationName = @name, Capacity = @capacity, CurrentStock = @currentStock, IsActive = @isActive WHERE InventoryLocationId = @id");
    return result.rowsAffected[0];
};

const deleteInventoryLocation = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("DELETE FROM InventoryLocation WHERE InventoryLocationId = @id");
    return result.rowsAffected[0];
};

export{getAllInventoryLocations, getInventoryLocationById, createInventoryLocation, updateInventoryLocation, deleteInventoryLocation};