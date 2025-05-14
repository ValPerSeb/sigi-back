import { getConnection, sql } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

const getLoginByUserName = async (userName) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("userName", userName)
        .query("SELECT * FROM Login WHERE UserName = @userName");
    return result.recordset[0];
};

const createLogin = async ({ userName, password, rol, userInfoId, companyId }) => {
    const pool = await getConnection;
    const id = generateId('LOG'); 
    const result = await pool.request()
        .input("id", id)
        .input("userName", userName)
        .input("password", password)
        .input("rol", rol)
        .input("userInfoId", userInfoId)
        .input("companyId", companyId)
        .query("INSERT INTO Login (LoginId, UserName, Password, Rol, UserInfoId, CompanyId) VALUES (@id, @userName, @password, @rol, @userInfoId, @companyId)");
    return result;
};

const updateLogin = async (id, { userName, password, rol, userInfoId, companyId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .input("userName", userName)
        .input("password", password)
        .input("rol", rol)
        .input("userInfoId", userInfoId)
        .input("companyId", companyId)
        .query("UPDATE Login SET UserName = @userName, Password = @password, Rol = @rol, UserInfoId = @userInfoId, CompanyId = @companyId WHERE LoginId = @id");
    return result.rowsAffected[0];
};

const deleteLogin = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("DELETE FROM Login WHERE LoginId = @id");
    return result.rowsAffected[0];
};

export{getLoginByUserName, createLogin, updateLogin, deleteLogin};