import { getConnection, sql } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

const getAllSuppliers = async ({ searchBy, searchValue, page, limit })=>{
    const pool = await getConnection;
    const result = await pool.request()
        .input('searchBy', sql.NVarChar, searchBy)
        .input('searchValue', sql.NVarChar, searchValue)
        .input('page', sql.Int, page)
        .input('limit', sql.Int, limit)
        .execute("GetSuppliers");

    return {
        data: result.recordsets[0],
        total: result.recordsets[1][0].total,
        page,
        limit
    };
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
    return {...result.recordset[0], id};
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