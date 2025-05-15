import { getConnection, sql } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

const getAllCompanies = async ({ searchBy, searchValue, page, limit }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input('searchBy', sql.NVarChar, searchBy)
        .input('searchValue', sql.NVarChar, searchValue)
        .input('page', sql.Int, page)
        .input('limit', sql.Int, limit)
        .execute("GetCompanies");

    return {
        data: result.recordsets[0],
        total: result.recordsets[1][0].total,
        page,
        limit
    };
}

const getCompanyById = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("SELECT * FROM Company WHERE Id = @id");
    return result.recordset[0];
};

const createCompany = async ({ name, nit, phoneNumber, email, website, industryType, legalRep, logo, addressId }) => {
    const pool = await getConnection;
    const id = generateId('COM');
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("name", sql.VarChar(30), name)
        .input("nit", sql.BigInt, nit)
        .input("phoneNumber", sql.BigInt, phoneNumber)
        .input("email", sql.VarChar(50), email)
        .input("website", sql.VarChar(30), website)
        .input("industryType", sql.VarChar(20), industryType)
        .input("legalRep", sql.VarChar(30), legalRep)
        .input("logo", sql.VarChar(200), logo)
        .input("addressId", sql.VarChar(25), addressId)
        .execute("CreateCompany");
    return {...result.recordset[0], id};
};

const updateCompany = async (id, { name, nit, phoneNumber, email, website, industryType, legalRep, logo, addressId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("name", sql.VarChar(30), name)
        .input("nit", sql.BigInt, nit)
        .input("phoneNumber", sql.BigInt, phoneNumber)
        .input("email", sql.VarChar(50), email)
        .input("website", sql.VarChar(30), website)
        .input("industryType", sql.VarChar(20), industryType)
        .input("legalRep", sql.VarChar(30), legalRep)
        .input("logo", sql.VarChar(200), logo)
        .input("addressId", sql.VarChar(25), addressId)
        .execute("UpdateCompany");
    return result.recordset[0];
};

const deleteCompany = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .execute("DeleteCompany");
    return result.recordset[0];
};

export { getAllCompanies, getCompanyById, createCompany, updateCompany, deleteCompany };