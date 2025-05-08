import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../model/productModel.js"

const productList = async (req,res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
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
        const { name, price, stock, companyId, supplierId, categoryId, inventoryLocationId } = req.body;
        if ( !name || !price || !stock || !companyId || !supplierId || !categoryId || !inventoryLocationId ) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        await createProduct({ name, price, stock, companyId, supplierId, categoryId, inventoryLocationId });
        res.status(200).json({ message: "Creación existosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock, companyId, supplierId, categoryId, inventoryLocationId } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El Id obligatorio" });
        }

        if (!name || !price || !stock || !companyId || !supplierId || !categoryId || !inventoryLocationId ) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const affectedRows = await updateProduct(id, { name, price, stock, companyId, supplierId, categoryId, inventoryLocationId });

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Producto no existe" });
        }

        res.status(200).json({ message: "Actualización existosa" });
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

        res.status(200).json({ message: "Eliminación existosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export{ productList, productDetails, addProduct, editProduct, removeProduct };