import { getConnection } from "../config/db.js";
import { generateId } from "../utils/generateId.js";
import { sql } from "../config/db.js";

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
    const id = generateId('USE');
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("firstName", sql.VarChar(30), firstName)
        .input("middleName", sql.VarChar(30), middleName)
        .input("lastName", sql.VarChar(30), lastName)
        .input("secondLastName", sql.VarChar(30), secondLastName)
        .input("dateOfBirth", sql.Date, dateOfBirth)
        .input("idType", sql.VarChar(20), idType)
        .input("idNumber", sql.BigInt, idNumber)
        .input("contactInfoId", sql.VarChar(25), contactInfoId)
        .execute("CreateUserInfo");
    return result.recordset[0];
};

const updateUserInfo = async (id, { firstName, middleName, lastName, secondLastName, dateOfBirth, idType, idNumber, contactInfoId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("firstName", sql.VarChar(30), firstName)
        .input("middleName", sql.VarChar(30), middleName)
        .input("lastName", sql.VarChar(30), lastName)
        .input("secondLastName", sql.VarChar(30), secondLastName)
        .input("dateOfBirth", sql.Date, dateOfBirth)
        .input("idType", sql.VarChar(20), idType)
        .input("idNumber", sql.BigInt, idNumber)
        .input("contactInfoId", sql.VarChar(25), contactInfoId)
        .execute("UpdateUserInfo");
    return result.recordset[0];
};

const deleteUserInfo = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .execute("UpdateUserInfo");
    return result.recordset[0];
};

export{getAllUsers, getUserInfobyId, createUserInfo, updateUserInfo, deleteUserInfo};