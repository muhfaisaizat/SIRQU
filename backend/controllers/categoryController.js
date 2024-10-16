// controllers/categoryController.js
const Category = require('../models/category');// Pastikan path model sesuai dengan struktur proyek Anda

// Menambahkan kategori baru
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mendapatkan semua kategori
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mendapatkan kategori berdasarkan ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Memperbarui kategori
exports.updateCategory = async (req, res) => {
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedCategory = await Category.findByPk(req.params.id);
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Menghapus kategori
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
