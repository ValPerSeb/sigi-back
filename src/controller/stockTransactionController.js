import { getAllTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction } from "../model/transactionModel.js";

const listTransactions = async (req, res) => {
    try {
        const transactions = await getAllTransactions();
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
        const {
            date,
            transactionType,
            quantityChange,
            description,
            inventoryLocationIdOld,
            inventoryLocationIdNew,
            productName,
            userName,
            companyId
        } = req.body;

        if (!date || !transactionType || !quantityChange || !productName || !userName || !companyId) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const response = await createTransaction({
            date,
            transactionType,
            quantityChange,
            description,
            inventoryLocationIdOld,
            inventoryLocationIdNew,
            productName,
            userName,
            companyId
        });

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
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
        const {
            date,
            transactionType,
            quantityChange,
            description,
            inventoryLocationIdOld,
            inventoryLocationIdNew,
            productName,
            userName,
            companyId
        } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        if (!date || !transactionType || !quantityChange || !productName || !userName || !companyId) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const response = await updateTransaction(id, {
            date,
            transactionType,
            quantityChange,
            description,
            inventoryLocationIdOld,
            inventoryLocationIdNew,
            productName,
            userName,
            companyId
        });

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
