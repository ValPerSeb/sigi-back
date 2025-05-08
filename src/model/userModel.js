import { getConnection } from "../config/db.js";

const getAllUsers = async ()=>{
    const pool = await getConnection;
    const result = await pool.request().query('SELECT * FROM UserInfo');
    return result.recordset;
}

const getUserInfobyId = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("SELECT * FROM UserInfo WHERE UserInfoId = @id");
    return result.recordset[0];
};

const createUserInfo = async ({ firstName, middleName, lastName, secondLastName, dateOfBirth, idType, idNumber, contactInfoId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("firstName", firstName)
        .input("middleName", middleName)
        .input("lastName", lastName)
        .input("secondLastName", secondLastName)
        .input("dateOfBirth", dateOfBirth)
        .input("idType", idType)
        .input("idNumber", idNumber)
        .input("contactInfoId", contactInfoId)
        .query("INSERT INTO UserInfo (FirstName, MiddleName, LastName, SecondLastName, DateOfBirth, IdType, IdNumber, ContactInfoId) VALUES (@firstName, @middleName, @lastName, @secondLastName, @dateOfBirth, @idType, @idNumber, @contactInfoId)");
    return result;
};

const updateUserInfo = async (id, { firstName, middleName, lastName, secondLastName, dateOfBirth, idType, idNumber, contactInfoId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .input("firstName", firstName)
        .input("middleName", middleName)
        .input("lastName", lastName)
        .input("secondLastName", secondLastName)
        .input("dateOfBirth", dateOfBirth)
        .input("idType", idType)
        .input("idNumber", idNumber)
        .input("contactInfoId", contactInfoId)
        .query("UPDATE UserInfo SET FirstName = @firstName, MiddleName = @middleName, LastName = @lastName, SecondLastName = @secondLastName, DateOfBirth = @dateOfBirth, IdType = @idType, IdNumber = @idNumber, ContactInfoId = @contactInfoId WHERE UserInfoId = @id");
    return result.rowsAffected[0];
};

const deleteUserInfo = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("DELETE FROM UserInfo WHERE UserInfoId = @id");
    return result.rowsAffected[0];
};

export{getAllUsers, getUserInfobyId, createUserInfo, updateUserInfo, deleteUserInfo};