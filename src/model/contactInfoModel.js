import { getConnection } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

const getContactInfoById = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("SELECT * FROM ContactInfo WHERE ContactInfoId = @id");
    return result.rowsAffected[0];
};

const createContactInfo = async ({ phone, mobile, email}) => {
    const pool = await getConnection;
    const id = generateId('CON');
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("phone", sql.BigInt, phone)
        .input("mobile", sql.BigInt, mobile)
        .input("email",sql.VarChar(25),email)
        .execute("CreateContactInfo");
    return result.recordset[0];;
};

const updateContactInfo = async (id, { phone, mobile, email}) => {
    const pool = await getConnection;
    const result = await pool.request()
         .input("id", sql.VarChar(25), id)
        .input("phone", sql.BigInt, phone)
        .input("mobile", sql.BigInt, mobile)
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