import { getAllTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction } from "../model/stockTransactionModel.js";

const listTransactions = async (req, res) => {
    try {
        const { searchBy = null, searchValue = null, page = 1, limit = 10 } = req.query;
        const transactions = await getAllTransactions({ searchBy, searchValue, page: parseInt(page, 10), limit: parseInt(limit, 10) });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const transactionDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const transaction = await getTransactionById(id);

        if (!transaction) {
            return res.status(404).json({ message: "Transacción no encontrada" });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addTransaction = async (req, res) => {
    try {
        const { date, type, quantity, description, inventoryLocationIdOld, inventoryLocationIdNew, userId, productId } = req.body;

        if (!date || !type) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const response = await createTransaction({ date, type, quantity, description, inventoryLocationIdOld, inventoryLocationIdNew, userId, productId });

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message, id: response.id });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, type, quantity, description, inventoryLocationIdOld, inventoryLocationIdNew, userId, productId } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        if (!date || !type) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const response = await updateTransaction(id, { date, type, quantity, description, inventoryLocationIdOld, inventoryLocationIdNew, userId, productId });

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const response = await deleteTransaction(id);

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { listTransactions, transactionDetails, addTransaction, editTransaction, removeTransaction };
