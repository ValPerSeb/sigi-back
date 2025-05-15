import { getConnection, sql } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

const getAddressById = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("SELECT * FROM Address WHERE Id = @id");
    return result.recordset[0];
};

const createAddress = async ({ address1, address2, postalCode, city, country }) => {
    const pool = await getConnection;
    const id = generateId('ADR');
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("address1", sql.VarChar(30), address1)
        .input("address2", sql.VarChar(30), address2)
        .input("postalCode", sql.Int, postalCode)
        .input("city", sql.VarChar(30), city)
        .input("country", sql.VarChar(30), country)
        .execute("CreateAddress");
    return {...result.recordset[0], id};
};

const updateAddress = async (id, { address1, address2, postalCode, city, country }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("address1", sql.VarChar(30), address1)
        .input("address2", sql.VarChar(30), address2)
        .input("postalCode", sql.Int, postalCode)
        .input("city", sql.VarChar(30), city)
        .input("country", sql.VarChar(30), country)
        .execute("UpdateAddress");
    return result.recordset[0];
};

const deleteAddress = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .execute("DeleteAddress");
    return result.recordset[0];
};

export{getAddressById, createAddress, updateAddress, deleteAddress};