import { getConnection, sql } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

const getLocationById = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("SELECT * FROM Location WHERE LocationId = @id");
    return result.recordset[0];
};

const createLocation = async ({ addressUno, addressDos, postalCode, city, country }) => {
    const pool = await getConnection;
    const id = generateId('LOC');
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("addressUno", sql.VarChar(30), addressUno)
        .input("addressDos", sql.VarChar(30), addressDos)
        .input("postalCode", sql.Int, postalCode)
        .input("city", sql.VarChar(30), city)
        .input("country", sql.VarChar(30), country)
        .execute("CreateLocation");
    return {...result.recordset[0], id};
};

const updateLocation = async (id, { addressUno, addressDos, postalCode, city, country }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("addressUno", sql.VarChar(30), addressUno)
        .input("addressDos", sql.VarChar(30), addressDos)
        .input("postalCode", sql.Int, postalCode)
        .input("city", sql.VarChar(30), city)
        .input("country", sql.VarChar(30), country)
        .execute("UpdateLocation");
    return result.recordset[0];
};

const deleteLocation = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .execute("DeleteLocation");
    return result.recordset[0];
};

export{getLocationById, createLocation, updateLocation, deleteLocation};