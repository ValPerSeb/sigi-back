import { getConnection } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

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
        .input("id", id)
        .input("name", name)
        .input("nit", nit)
        .input("website", website)
        .input("industryType", industryType)
        .input("legalRep", legalRep)
        .input("logo", logo)
        .input("contactInfoId", contactInfoId)
        .input("locationId", locationId)
        .query("INSERT INTO Company (CompanyId, CompanyName, Nit, Website, IndustryType, LegalRep, Logo, ContactInfoId, LocationId) VALUES (@id, @name, @nit, @website, @industryType, @legalRep, @logo, @contactInfoId, @locationId)");
    return result;
};

const updateCompany = async (id, { name, nit, website, industryType, legalRep, logo, contactInfoId, locationId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .input("name", name)
        .input("nit", nit)
        .input("website", website)
        .input("industryType", industryType)
        .input("legalRep", legalRep)
        .input("logo", logo)
        .input("contactInfoId", contactInfoId)
        .input("locationId", locationId)
        .query("UPDATE Company SET CompanyName = @name, Nit = @nit, Website = @website, IndustryType = @industryType, LegalRep = @legalRep, Logo = @logo, ContactInfoId = @contactInfoId, LocationId = @locationId WHERE CompanyId = @id");
    return result.rowsAffected[0];
};

const deleteCompany = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("DELETE FROM Company WHERE CompanyId = @id");
    return result.rowsAffected[0];
};

export{getAllCompanies, getCompanyById, createCompany, updateCompany, deleteCompany};