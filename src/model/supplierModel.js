import { getConnection, sql } from "../config/db.js";
import { COMPANY_ID } from "../index.js";
import { generateId } from "../utils/generateId.js";

const getAllSuppliers = async ({ searchBy, searchValue, page, limit })=>{
    const pool = await getConnection;
    const result = await pool.request()
        .input('searchBy', sql.NVarChar, searchBy)
        .input('searchValue', sql.NVarChar, searchValue)
        .input('page', sql.Int, page)
        .input('limit', sql.Int, limit)
        .input('companyId', COMPANY_ID)
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
        .query("SELECT s.*, a.* FROM Supplier s INNER JOIN Address a ON s.AddressId = a.Id WHERE s.Id = @id");
    return result.recordset[0];
};

const createSupplier = async ({ name, phoneNumber, email, addressId }) => {
    const pool = await getConnection;
    const id = generateId('SUP'); 
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("name", sql.VarChar(30), name)
        .input("phoneNumber", sql.BigInt, phoneNumber)
        .input("email", sql.VarChar(50), email)
        .input("addressId", sql.VarChar(25), addressId)
        .input('companyId', COMPANY_ID)
        .execute("CreateSupplier");
    return {...result.recordset[0], id};
};

const updateSupplier = async (id, { name, phoneNumber, email, addressId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("name", sql.VarChar(30), name)
        .input("phoneNumber", sql.BigInt, phoneNumber)
        .input("email", sql.VarChar(50), email)
        .input("addressId", sql.VarChar(25), addressId)
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