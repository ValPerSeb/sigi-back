import { getConnection } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

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
        .input("id", id)
        .input("date", date)
        .input("transactionType", transactionType)
        .input("quantityChange", quantityChange)
        .input("description", description)
        .input("inventoryLocationIdOld", inventoryLocationIdOld)
        .input("inventoryLocationIdNew", inventoryLocationIdNew)
        .input("productName", productName)
        .input("userName", userName)
        .input("companyId", companyId)
        .query("INSERT INTO StockTransaction (StockTransactionId, Date, TransactionType, QuantityChange, Description, InventoryLocationIdOld, InventoryLocationIdNew, ProductName, UserName, CompanyId) VALUES (@id, @date, @transactionType, @quantityChange, @description, @inventoryLocationIdOld, @inventoryLocationIdNew, @productName, @userName, @companyId)");
    return result;
};

const updateTransaction = async (id, { date, transactionType, quantityChange, description, inventoryLocationIdOld, inventoryLocationIdNew, productName, userName, companyId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .input("date", date)
        .input("transactionType", transactionType)
        .input("quantityChange", quantityChange)
        .input("description", description)
        .input("inventoryLocationIdOld", inventoryLocationIdOld)
        .input("inventoryLocationIdNew", inventoryLocationIdNew)
        .input("productName", productName)
        .input("userName", userName)
        .input("companyId", companyId)
        .query("UPDATE StockTransaction SET Date = @date, TransactionType = @transactionType, QuantityChange = @quantityChange, Description = @description, InventoryLocationIdOld = @inventoryLocationIdOld, InventoryLocationIdNew = @inventoryLocationIdNew, ProductName = @productName, UserName = @userName, CompanyId = @companyId WHERE TransactionId = @id");
    return result.rowsAffected[0];
};

const deleteTransaction = async (id) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .query("DELETE FROM StockTransaction WHERE TransactionId = @id");
    return result.rowsAffected[0];
};

export{getAllTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction};