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
        .query("SELECT * FROM Company WHERE CompanyId = @id");
    return result.recordset[0];
};

const createCompany = async ({ name, nit, website, industryType, legalRep, logo, contactInfoId, locationId }) => {
    const pool = await getConnection;
    const id = generateId('COM');
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("name", sql.VarChar(30), name)
        .input("nit", sql.BigInt, nit)
        .input("website", sql.VarChar(30), website)
        .input("industryType", sql.VarChar(20), industryType)
        .input("legalRep", sql.VarChar(30), legalRep)
        .input("logo", sql.VarChar(200), logo)
        .input("contactInfoId", sql.VarChar(25), contactInfoId)
        .input("locationId", sql.VarChar(25), locationId)
        .execute("CreateCompany");
    return {...result.recordset[0], id};
};

const updateCompany = async (id, { companyName, nit, website, industryType, legalRep, logo, contactInfoId, locationId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("companyName", sql.VarChar(30), companyName)
        .input("nit", sql.BigInt, nit)
        .input("website", sql.VarChar(30), website)
        .input("industryType", sql.VarChar(20), industryType)
        .input("legalRep", sql.VarChar(30), legalRep)
        .input("logo", sql.VarChar(200), logo)
        .input("contactInfoId", sql.VarChar(25), contactInfoId)
        .input("locationId", sql.VarChar(25), locationId)
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