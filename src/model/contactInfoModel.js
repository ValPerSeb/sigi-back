import { getConnection } from "../config/db.js";

const getContactInfoById = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("SELECT * FROM ContactInfo WHERE ContactInfoId = @id");
    return result.recordset[0];
};

const createContactInfo = async ({ phone, mobile, email}) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("phone", phone)
        .input("mobile", mobile)
        .input("email", email)
        .query("INSERT INTO ContactInfo (PhoneNumber, MobileNumber, Email) VALUES (@phone, @mobile, @email)");
    return result;
};

const updateContactInfo = async (id, { phone, mobile, email}) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .input("phone", phone)
        .input("mobile", mobile)
        .input("email", email)
        .query("UPDATE ContactInfo SET PhoneNumber = @phone, MobileNumber = @mobile, Email = @email WHERE ContactInfoId = @id");
    return result.rowsAffected[0];
};

const deleteContactInfo = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("DELETE FROM ContactInfo WHERE ContactInfoId = @id");
    return result.rowsAffected[0];
};

export{getContactInfoById, createContactInfo, updateContactInfo, deleteContactInfo};