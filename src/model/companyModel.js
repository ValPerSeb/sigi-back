import { getConnection } from "../config/db.js";
import { generateId } from "../utils/generateId.js";
import { sql } from "../config/db.js";

const getAllCompanies = async ({ searchBy, searchValue, page, limit }) => {
    const pool = await getConnection;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM Company';
    let countQuery = 'SELECT COUNT(*) AS total FROM Company';
    const request = pool.request();

    if (searchBy && searchValue) {
        const allowedFields = ['CompanyName'];
        if (!allowedFields.includes(searchBy)) {
            throw new Error('Campo de búsqueda no permitido');
        }

        query += ` WHERE ${searchBy} LIKE @searchValue`;
        countQuery += ` WHERE ${searchBy} LIKE @searchValue`;
        request.input('searchValue', sql.VarChar, `%${searchValue}%`);
    }

    query += ` ORDER BY CompanyId OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;

    const result = await request.query(query);
    const countResult = await request.query(countQuery);

    return {
        data: result.recordset,
        total: countResult.recordset[0].total,
        page: Number(page),
        limit: Number(limit)
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

export { getAllCompanies, getCompanyById, createCompany, updateCompany, deleteCompany };