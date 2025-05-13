import { getConnection } from "../config/db.js";
import { generateId } from "../utils/generateId.js";
import { sql } from "../config/db.js";

const getAllTransactions = async ()=>{
    const pool = await getConnection;
    const result = await pool.request().query('SELECT * FROM StockTransaction');
    return result.recordset;
}

const getTransactionById = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("SELECT * FROM StockTransaction WHERE TransactionId = @id");
    return result.recordset[0];
};

const createTransaction = async ({ date, transactionType, quantityChange, description, inventoryLocationIdOld, inventoryLocationIdNew, productName, userName, companyId }) => {
    const pool = await getConnection;
    const id = generateId('STO'); 
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("date", sql.DateTime, date)
        .input("transactionType", sql.VarChar(20), transactionType)
        .input("quantityChange", sql.Int, quantityChange)
        .input("description", sql.VarChar(50), description)
        .input("inventoryLocationIdOld", sql.VarChar(25), inventoryLocationIdOld)
        .input("inventoryLocationIdNew", sql.VarChar(25), inventoryLocationIdNew)
        .input("productName", sql.VarChar(25), productName)
        .input("userName", sql.VarChar(25), userName)
        .input("companyId", sql.VarChar(25), companyId)
        .execute("CreateStockTransaction");
    return result.recordset[0];
};

const updateTransaction = async (id, { date, transactionType, quantityChange, description, inventoryLocationIdOld, inventoryLocationIdNew, productName, userName, companyId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", sql.VarChar(25), id)
        .input("date", sql.DateTime, date)
        .input("transactionType", sql.VarChar(20), transactionType)
        .input("quantityChange", sql.Int, quantityChange)
        .input("description", sql.VarChar(50), description)
        .input("inventoryLocationIdOld", sql.VarChar(25), inventoryLocationIdOld)
        .input("inventoryLocationIdNew", sql.VarChar(25), inventoryLocationIdNew)
        .input("productName", sql.VarChar(25), productName)
        .input("userName", sql.VarChar(25), userName)
        .input("companyId", sql.VarChar(25), companyId)
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