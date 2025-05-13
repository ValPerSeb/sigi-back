import { getConnection } from "../config/db.js";
import { generateId } from "../utils/generateId.js";
import { sql } from "../config/db.js";

const getAllCompanies = async ()=>{
    const pool = await getConnection;
    const result = await pool.request().query('SELECT * FROM Company');
    return result.recordset;
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
    return result.recordset[0];
};

const updateCompany = async (id, { name, nit, website, industryType, legalRep, logo, contactInfoId, locationId }) => {
    const pool = await getConnection;
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

export{getAllCompanies, getCompanyById, createCompany, updateCompany, deleteCompany};