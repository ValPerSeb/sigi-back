import { getConnection } from "../config/db.js";
import { generateId } from "../utils/generateId.js";
import { sql } from "../config/db.js";

const getAllSuppliers = async ()=>{
    const pool = await getConnection;
    const result = await pool.request().query('SELECT * FROM Supplier');
    return result.recordset;
}

const getSupplierById = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("SELECT * FROM Supplier WHERE SupplierId = @id");
    return result.recordset[0];
};

const createSupplier = async ({ name, companyId, contactInfoId, locationId }) => {
    const pool = await getConnection;
    const id = generateId('SUP'); 
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("name", sql.VarChar(30), name)
        .input("companyId", sql.VarChar(25), companyId)
        .input("contactInfoId", sql.VarChar(25), contactInfoId)
        .input("locationId", sql.VarChar(25), locationId)
        .execute("CreateSupplier");
    return result.recordset[0];
};

const updateSupplier = async (id, { name, companyId, contactInfoId, locationId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("name", sql.VarChar(30), name)
        .input("companyId", sql.VarChar(25), companyId)
        .input("contactInfoId", sql.VarChar(25), contactInfoId)
        .input("locationId", sql.VarChar(25), locationId)
        .execute("UpdateSupplier");
    return result.recordset[0];
};

const deleteSupplier = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .execute("DeleteSupplier");
    return result.recordset[0];
};

export{getAllSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier};