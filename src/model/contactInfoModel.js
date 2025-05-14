import { getConnection, sql } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

const getContactInfoById = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("SELECT * FROM ContactInfo WHERE ContactInfoId = @id");
    return result.rowsAffected[0];
};

const createContactInfo = async ({ phoneNumber, mobileNumber, email}) => {
    const pool = await getConnection;
    const id = generateId('CON');
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("phoneNumber", sql.BigInt, phoneNumber)
        .input("mobileNumber", sql.BigInt, mobileNumber)
        .input("email",sql.VarChar(25),email)
        .execute("CreateContactInfo");
    return {...result.recordset[0], id};
};

const updateContactInfo = async (id, { phoneNumber, mobileNumber, email}) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("phoneNumber", sql.BigInt, phoneNumber)
        .input("mobileNumber", sql.BigInt, mobileNumber)
        .input("email",sql.VarChar(25),email)
        .execute("UpdateContactInfo");
    return result.recordset[0];
};

const deleteContactInfo = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .execute("DeleteContactInfo");
    return result.recordset[0];
};

export{getContactInfoById, createContactInfo, updateContactInfo, deleteContactInfo};