import { getConnection } from "../config/db.js";

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

const createTransaction = async ({ date, transactionType, quantityChange, description, inventoryLocationIdOld, inventoryLocationIdNew, loginId, productId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("date", date)
        .input("transactionType", transactionType)
        .input("quantityChange", quantityChange)
        .input("description", description)
        .input("inventoryLocationIdOld", inventoryLocationIdOld)
        .input("inventoryLocationIdNew", inventoryLocationIdNew)
        .input("loginId", loginId)
        .input("productId", productId)
        .query("INSERT INTO StockTransaction (Date, TransactionType, QuantityChange, Description, InventoryLocationIdOld, InventoryLocationIdNew, LoginId, ProductId) VALUES (@date, @transactionType, @quantityChange, @description, @inventoryLocationIdOld, @inventoryLocationIdNew, @loginId, @productId)");
    return result;
};

const updateTransaction = async (id, { date, transactionType, quantityChange, description, inventoryLocationIdOld, inventoryLocationIdNew, loginId, productId }) => {
    const pool = await getConnection;
    const result = await pool.request()
        .input("id", id)
        .input("date", date)
        .input("transactionType", transactionType)
        .input("quantityChange", quantityChange)
        .input("description", description)
        .input("inventoryLocationIdOld", inventoryLocationIdOld)
        .input("inventoryLocationIdNew", inventoryLocationIdNew)
        .input("loginId", loginId)
        .input("productId", productId)
        .query("UPDATE StockTransaction SET Date = @date, TransactionType = @transactionType, QuantityChange = @quantityChange, Description = @description, InventoryLocationIdOld = @inventoryLocationIdOld, InventoryLocationIdNew = @inventoryLocationIdNew, LoginId = @loginId, ProductId = @productId WHERE TransactionId = @id");
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