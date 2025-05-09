import { getConnection } from "../config/db.js";
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
        .input("id", id)
        .input("addressUno", addressUno)
        .input("addressDos", addressDos)
        .input("postalCode", postalCode)
        .input("city", city)
        .input("country", country)
        .query("INSERT INTO Location (LocationId, AddressUno, AddressDos, PostalCode, City, Country) VALUES (@id, @addressUno, @addressDos, @postalCode, @city, @country)");
    return result;
};

const updateLocation = async (id, { addressUno, addressDos, postalCode, city, country }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .input("addressUno", addressUno)
        .input("addressDos", addressDos)
        .input("postalCode", postalCode)
        .input("city", city)
        .input("country", country)
        .query("UPDATE Location SET AddressUno = @addressUno, AddressDos = @addressDos, PostalCode = @postalCode, City = @city, Country = @country WHERE LocationId = @id");
    return result.rowsAffected[0];
};

const deleteLocation = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("DELETE FROM Location WHERE LocationId = @id");
    return result.rowsAffected[0];
};

export{getLocationById, createLocation, updateLocation, deleteLocation};