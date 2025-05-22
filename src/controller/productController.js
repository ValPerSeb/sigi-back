import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../model/productModel.js"
import { createTransaction } from "../model/stockTransactionModel.js"

const productList = async (req, res) => {
    try {
        const { searchBy = null, searchValue = null, page = 1, limit = 10 } = req.query;
        const products = await getAllProducts({ searchBy, searchValue, page: parseInt(page, 10), limit: parseInt(limit, 10) });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const productDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({ message: "Producto no existe" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addProduct = async (req, res) => {
    try {
        const { productName, unitPrice, stock, supplierId, categoryId, inventoryLocationId } = req.body;
        if (!productName || !unitPrice || !stock) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        const response = await createProduct({ productName, unitPrice, stock, supplierId, categoryId, inventoryLocationId });
        if (response.Success === 1) {
            const transaction = await createTransaction({
                date: new Date(),
                type: "INCREMENT",
                quantity: stock,
                description: `Ingreso de ${stock} unidades de ${productName}`,
                inventoryLocationIdOld: null,
                inventoryLocationIdNew: inventoryLocationId,
                userId: req.user.userId,
                productId: response.id
            });
            if (!transaction.Success === 1) {
                console.error("Error creating transaction:", transaction.Message);
            }
            res.status(200).json({ message: response.Message, id: response.id });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, unitPrice, stock, supplierId, categoryId, inventoryLocationId } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El Id obligatorio" });
        }

        if (!productName || !unitPrice || !stock) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const currentProduct = await getProductById(id);
        if (!currentProduct) {
            return res.status(404).json({ message: "Producto no existe" });
        }

        const response = await updateProduct(id, { productName, unitPrice, stock, supplierId, categoryId, inventoryLocationId });

        if (response.Success === 1) {
            const type = currentProduct.Stock < stock ? "INCREMENT" : currentProduct.Stock > stock ? "DECREMENT" : "TRANSFER";
            const transaction = await createTransaction({
                date: new Date(),
                type,
                quantity: type === "TRANSFER" ? 0 : type === "INCREMENT" ? stock - currentProduct.Stock : currentProduct.Stock - stock,
                description: type === "TRANSFER" ? `Cambio de ubicación de ${productName}` : type === "INCREMENT" ? `Ingreso de ${stock - currentProduct.Stock} unidades de ${productName}` : `Salida de ${currentProduct.Stock - stock} unidades de ${productName}`,
                inventoryLocationIdOld: type === "TRANSFER" ? currentProduct.InventoryLocationId : null,
                inventoryLocationIdNew: type === "TRANSFER" ? inventoryLocationId : null,
                userId: req.user.userId,
                productId: id
            });
            if (!transaction.Success === 1) {
                console.error("Error creating transaction:", transaction.Message);
            }
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const affectedRows = await deleteProduct(id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Producto no existe" });
        }

        const transaction = await createTransaction({
            date: new Date(),
            type: "DECREMENT",
            quantity: 0,
            description: `Eliminación de producto`,
            inventoryLocationIdOld: null,
            inventoryLocationIdNew: null,
            userId: req.user.userId,
            productId: id
        });
        if (!transaction.Success === 1) {
            console.error("Error creating transaction:", transaction.Message);
        }

        res.status(200).json({ message: "Eliminación existosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { productList, productDetails, addProduct, editProduct, removeProduct };