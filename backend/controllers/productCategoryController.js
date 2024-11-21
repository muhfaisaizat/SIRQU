// controllers/productCategoryController.js
const ProductCategory = require('../models/productsCategories');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');

// Create a new product-category relationship
exports.createProductCategory = async (req, res) => {
  try {
    const { productsId, categoriesId } = req.body;

    // Validasi input
    if (!productsId || !categoriesId) {
      return res.status(400).json({
        success: false,
        message: "productsId and categoriesId are required",
      });
    }

    // Membuat product-category baru
    const productCategory = await ProductCategory.create({
      productsId,
      categoriesId,
    });

    // Mengembalikan response sukses
    res.status(201).json({
      success: true,
      data: productCategory,
    });
  } catch (error) {
    // Menangani error
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// Get all product-category relationships
exports.getProductCategories = async (req, res) => {
  try {
    const productCategories = await sequelize.query(`
      SELECT 
        productscategories.id AS productCategoryId,
        categories.id AS categoryId,
        categories.name AS categoryName,
        products.id AS productId,
        products.name AS productName
      FROM productscategories
      INNER JOIN categories ON productscategories.categoriesId = categories.id
      INNER JOIN products ON productscategories.productsId = products.id
      WHERE productscategories.deletedAt IS NULL;
    `, { type: sequelize.QueryTypes.SELECT });

    // Mengembalikan response sukses
    res.status(200).json({
      success: true,
      data: productCategories,
    });
  } catch (error) {
    // Menangani error
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// Get product-category relationship by ID
exports.getProductCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    // Query SQL untuk mendapatkan data berdasarkan id
    const productCategory = await sequelize.query(`
      SELECT 
        productscategories.id AS productCategoryId,
        categories.id AS categoryId,
        categories.name AS categoryName,
        products.id AS productId,
        products.name AS productName
      FROM productscategories
      INNER JOIN categories ON productscategories.categoriesId = categories.id
      INNER JOIN products ON productscategories.productsId = products.id
      WHERE productscategories.id = :id
      AND productscategories.deletedAt IS NULL;
    `, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { id },
    });

    // Mengecek apakah data ditemukan
    if (productCategory.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Product Category with ID ${id} not found.`,
      });
    }

    // Mengembalikan response sukses
    res.status(200).json({
      success: true,
      data: productCategory[0], // Menampilkan hasil pertama karena hanya 1 yang dicari
    });
  } catch (error) {
    // Menangani error
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a product-category relationship
exports.updateProductCategory = async (req, res) => {
  try {
    const { productsId, categoriesId } = req.body;

    // Validasi input
    if (!productsId || !categoriesId) {
      return res.status(400).json({
        success: false,
        message: "productsId and categoriesId are required",
      });
    }

    // Mencari product-category berdasarkan ID
    const productCategory = await ProductCategory.findByPk(req.params.id);

    if (!productCategory) {
      return res.status(404).json({
        success: false,
        message: "ProductCategory not found",
      });
    }

    // Update produk dan kategori
    const updatedProductCategory = await productCategory.update({
      productsId,
      categoriesId,
    });

    // Mengembalikan response sukses
    res.status(200).json({
      success: true,
      data: updatedProductCategory,
    });
  } catch (error) {
    console.error(error); // Debugging
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a product-category relationship
exports.deleteProductCategory = async (req, res) => {
  try {
    const deleted = await ProductCategory.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'ProductCategory not found' });
    }

    res.status(200).json({ success: true, message: 'ProductCategory deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
