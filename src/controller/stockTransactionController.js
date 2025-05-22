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

export { listTransactions, transactionDetails };
