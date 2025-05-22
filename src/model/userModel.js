import { getConnection, sql } from "../config/db.js";
import { COMPANY_ID } from "../index.js";
import { generateId } from "../utils/generateId.js";

const getAllUsers = async ({ searchBy, searchValue, page, limit })=>{
    const pool = await getConnection;
    const result = await pool.request()
        .input('searchBy', sql.NVarChar, searchBy)
        .input('searchValue', sql.NVarChar, searchValue)
        .input('page', sql.Int, page)
        .input('limit', sql.Int, limit)
        .input('companyId', COMPANY_ID)
        .execute("GetUsers");

    return {
        data: result.recordsets[0],
        total: result.recordsets[1][0].total,
        page,
        limit
    };
}

const getUserInfobyId = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("SELECT u.*, a.* FROM UserInfo u INNER JOIN Address a ON u.AddressId = a.Id WHERE u.Id = @id"); 
    return result.recordset[0];
};

const getUserInfobyUserName = async (userName) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("userName", userName)
        .query("SELECT * FROM UserInfo WHERE UserName = @userName");
    return result.recordset[0];
};

const createUserInfo = async ({ userName, password, rol, firstName, middleName, lastName, secondLastName, email, phoneNumber, addressId }) => {
    const pool = await getConnection;
    const id = generateId('USE');
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("userName", sql.VarChar(30), userName)
        .input("password", sql.VarChar(100), password)
        .input("rol", sql.VarChar(20), rol)
        .input("firstName", sql.VarChar(30), firstName)
        .input("middleName", sql.VarChar(30), middleName)
        .input("lastName", sql.VarChar(30), lastName)
        .input("secondLastName", sql.VarChar(30), secondLastName)
        .input("email", sql.VarChar(50), email)
        .input("phoneNumber", sql.BigInt, phoneNumber)
        .input("addressId", sql.VarChar(25), addressId)
        .input('companyId', COMPANY_ID)
        .execute("CreateUserInfo");
    return {...result.recordset[0], id};
};

const updateUserInfo = async (id, { userName, password, rol, firstName, middleName, lastName, secondLastName, email, phoneNumber, addressId }) => {
    const pool = await getConnection;
    const request = pool.request()
        .input("id", sql.VarChar(25), id)
        .input("userName", sql.VarChar(30), userName)
        .input("rol", sql.VarChar(20), rol)
        .input("firstName", sql.VarChar(30), firstName)
        .input("middleName", sql.VarChar(30), middleName)
        .input("lastName", sql.VarChar(30), lastName)
        .input("secondLastName", sql.VarChar(30), secondLastName)
        .input("email", sql.VarChar(50), email)
        .input("phoneNumber", sql.BigInt, phoneNumber)
        .input("addressId", sql.VarChar(25), addressId);

    if (password !== null && password !== undefined) {
        request.input("password", sql.VarChar(100), password);
    }

    const result = await request.execute("UpdateUserInfo");
    return result.recordset[0];
};

const deleteUserInfo = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .execute("UpdateUserInfo");
    return result.recordset[0];
};

export{ getAllUsers, getUserInfobyId, createUserInfo, updateUserInfo, deleteUserInfo, getUserInfobyUserName };