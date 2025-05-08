import { getConnection } from "../config/db.js";

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
    const result = await pool.request()
        .input("name", name)
        .input("companyId", companyId)
        .input("contactInfoId", contactInfoId)
        .input("locationId", locationId)
        .query("INSERT INTO Supplier (Name, CompanyId, ContactInfoId, LocationId) VALUES (@name, @companyId, @contactInfoId, @locationId)");
    return result;
};

const updateSupplier = async (id, { name, companyId, contactInfoId, locationId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .input("name", name)
        .input("companyId", companyId)
        .input("contactInfoId", contactInfoId)
        .input("locationId", locationId)
        .query("UPDATE Supplier SET Name = @name, CompanyId = @companyId, ContactInfoId = @contactInfoId, LocationId = @locationId WHERE SupplierId = @id");
    return result.rowsAffected[0];
};

const deleteSupplier = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("DELETE FROM Supplier WHERE SupplierId = @id");
    return result.rowsAffected[0];
};

export{getAllSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier};