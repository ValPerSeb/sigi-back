import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../model/categoryModel.js"

const categoryList = async (req, res) => {
    try {
        const { searchBy = null, searchValue = null, page = 1, limit = 10 } = req.query;
        const categories = await getAllCategories({ searchBy, searchValue, page: parseInt(page, 10), limit: parseInt(limit, 10) });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const categoryDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const category = await getCategoryById(id);

        if (!category) {
            return res.status(404).json({ message: "Categoría no existe" });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCategory = async (req, res) => {
    try {
        const { name, color } = req.body;
        if (!name || !color) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        const response = await createCategory({ name, color });
        if (response.Success === 1) {
            res.status(200).json({ message: response.Message, id: response.id });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, color } = req.body;
        console.log(req.body)
        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        if (!name || !color) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const response = await updateCategory(id, { name, color });
        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        const response = await deleteCategory(id);

        if (response.Success === 1) {
            res.status(200).json({ message: response.Message });
        } else {
            res.status(404).json({ error: response.Message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { categoryList, categoryDetails, addCategory, editCategory, removeCategory };