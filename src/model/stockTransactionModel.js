import { getConnection, sql } from "../config/db.js";
import { COMPANY_ID } from "../index.js";
import { generateId } from "../utils/generateId.js";

const getAllTransactions = async ({ searchBy, searchValue, page, limit })=>{
    const pool = await getConnection;
    const result = await pool.request()
        .input('searchBy', sql.NVarChar, searchBy)
        .input('searchValue', sql.NVarChar, searchValue)
        .input('page', sql.Int, page)
        .input('limit', sql.Int, limit)
        .input('companyId', COMPANY_ID)
        .execute("GetStockTransactions");

    return {
        data: result.recordsets[0],
        total: result.recordsets[1][0].total,
        page,
        limit
    };
}

const getTransactionById = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("SELECT * FROM StockTransaction WHERE Id = @id");
    return result.recordset[0];
};

const createTransaction = async ({ date, type, quantity, description, inventoryLocationIdOld, inventoryLocationIdNew, userId, productId }) => {
    const pool = await getConnection;
    const id = generateId('STO'); 
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("date", sql.DateTime, date)
        .input("type", sql.VarChar(20), type)
        .input("quantity", sql.Int, quantity)
        .input("description", sql.VarChar(50), description)
        .input("inventoryLocationIdOld", sql.VarChar(25), inventoryLocationIdOld)
        .input("inventoryLocationIdNew", sql.VarChar(25), inventoryLocationIdNew)
        .input("userId", sql.VarChar(25), userId)
        .input("productId", sql.VarChar(25), productId)
        .input('companyId', COMPANY_ID)
        .execute("CreateStockTransaction");
    return {...result.recordset[0], id};
};

const updateTransaction = async (id, { date, type, quantity, description, inventoryLocationIdOld, inventoryLocationIdNew, userId, productId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("date", sql.DateTime, date)
        .input("type", sql.VarChar(20), type)
        .input("quantity", sql.Int, quantity)
        .input("description", sql.VarChar(50), description)
        .input("inventoryLocationIdOld", sql.VarChar(25), inventoryLocationIdOld)
        .input("inventoryLocationIdNew", sql.VarChar(25), inventoryLocationIdNew)
        .input("userId", sql.VarChar(25), userId)
        .input("productId", sql.VarChar(25), productId)
        .execute("UpdateStockTransaction");
    return result.recordset[0];
};

const deleteTransaction = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .execute("DeleteStockTransaction");
    return result.recordset[0];
};

export{getAllTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction};