import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../model/categoryModel"

const categoryList = async (req,res) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: error.message});
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
        if ( !name || !color) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        await createCategory({ name, color });
        res.status(200).json({ message: "Creación exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, color } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El Id es obligatorio" });
        }

        if (!name || !color ) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const affectedRows = await updateCategory(id, { name, color });

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Categoría no existe" });
        }

        res.status(200).json({ message: "Actualización existosa" });
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

        const affectedRows = await deleteCategory(id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Categoría no existe" });
        }

        res.status(200).json({ message: "Eliminación exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export{ categoryList, categoryDetails, addCategory, editCategory, removeCategory };