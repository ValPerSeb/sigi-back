import { getConnection, sql } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

const getAllSuppliers = async ({ searchBy, searchValue, page, limit })=>{
    const pool = await getConnection;
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM Supplier';
    let countQuery = 'SELECT COUNT(*) AS total FROM Supplier';
    const request = pool.request();

    if (searchBy && searchValue) {
        const allowedFields = ['Name'];
        if (!allowedFields.includes(searchBy)) {
            throw new Error('Campo de búsqueda no permitido');
        }

        query += ` WHERE ${searchBy} LIKE @searchValue`;
        countQuery += ` WHERE ${searchBy} LIKE @searchValue`;
        request.input('searchValue', sql.VarChar, `%${searchValue}%`);
    }

    query += ` ORDER BY SupplierId OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;

    const result = await request.query(query);
    const countResult = await request.query(countQuery);

    return {
        data: result.recordset,
        total: countResult.recordset[0].total,
        page: Number(page),
        limit: Number(limit)
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