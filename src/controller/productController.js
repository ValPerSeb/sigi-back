import { getAllProductos } from "../model/productModel.js"

const productList = async (req,res) => {
    try {
        const productos = await getAllProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export{ productList };