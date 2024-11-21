const ProductOutlet = require('../models/productsOutlets');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');

// Create a new product-outlet relationship
exports.createProductOutlet = async (req, res) => {
  try {
    const { productsId, outletsId } = req.body;

    // Validasi input
    if (!productsId || !outletsId) {
      return res.status(400).json({
        success: false,
        message: "productsId and outletsId are required",
      });
    }

    // Membuat product-outlet baru
    const productOutlet = await ProductOutlet.create({
      productsId,
      outletsId,
    });

    // Mengembalikan response sukses
    res.status(201).json({
      success: true,
      data: productOutlet,
    });
  } catch (error) {
    // Menangani error
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all product-outlet relationships
exports.getProductOutlets = async (req, res) => {
  try {
    const productOutlets = await sequelize.query(`
      SELECT 
        productsoutlets.id AS productOutletId,
        products.id AS productId,
        products.name AS productName,
        outlets.id AS outletId,
        outlets.nama AS outletName
      FROM productsoutlets
      INNER JOIN products ON productsoutlets.productsId = products.id
      INNER JOIN outlets ON productsoutlets.outletsId = outlets.id
      WHERE productsoutlets.deletedAt IS NULL;
    `, { type: sequelize.QueryTypes.SELECT });

    // Mengembalikan response sukses
    res.status(200).json({
      success: true,
      data: productOutlets,
    });
  } catch (error) {
    // Menangani error
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// Get product-outlet relationship by ID
exports.getProductOutletById = async (req, res) => {
  try {
    const { id } = req.params;

    // Query SQL untuk mendapatkan data berdasarkan id
    const productOutlet = await sequelize.query(`
      SELECT 
        productsoutlets.id AS productOutletId,
        products.id AS productId,
        products.name AS productName,
        outlets.id AS outletId,
        outlets.nama AS outletName
      FROM productsoutlets
      INNER JOIN products ON productsoutlets.productsId = products.id
      INNER JOIN outlets ON productsoutlets.outletsId = outlets.id
      WHERE productsoutlets.id = :id
      AND productsoutlets.deletedAt IS NULL;
    `, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { id },
    });

    // Mengecek apakah data ditemukan
    if (productOutlet.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Product-Outlet relationship with ID ${id} not found.`,
      });
    }

    // Mengembalikan response sukses
    res.status(200).json({
      success: true,
      data: productOutlet[0], // Menampilkan hasil pertama karena hanya 1 yang dicari
    });
  } catch (error) {
    // Menangani error
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a product-outlet relationship
exports.updateProductOutlet = async (req, res) => {
  try {
    const { productsId, outletsId } = req.body;

    // Validasi input
    if (!productsId || !outletsId) {
      return res.status(400).json({
        success: false,
        message: "productsId and outletsId are required",
      });
    }

    // Mencari product-outlet berdasarkan ID
    const productOutlet = await sequelize.query(`
      SELECT * FROM productsoutlets
      WHERE id = :id AND deletedAt IS NULL
    `, {
      replacements: { id: req.params.id },
      type: sequelize.QueryTypes.SELECT,
    });

    if (productOutlet.length === 0) {
      return res.status(404).json({
        success: false,
        message: "ProductOutlet not found",
      });
    }

    // Update produk dan outlet
    const updatedProductOutlet = await sequelize.query(`
      UPDATE productsoutlets
      SET productsId = :productsId, outletsId = :outletsId
      WHERE id = :id
    `, {
      replacements: {
        productsId,
        outletsId,
        id: req.params.id,
      },
      type: sequelize.QueryTypes.UPDATE,
    });

    // Mengembalikan response sukses
    res.status(200).json({
      success: true,
      message: 'ProductOutlet updated successfully',
      data: { productsId, outletsId },
    });
  } catch (error) {
    console.error(error); // Debugging
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete a product-outlet relationship
exports.deleteProductOutlet = async (req, res) => {
  try {
    const deleted = await ProductOutlet.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'ProductOutlet not found' });
    }

    res.status(200).json({ success: true, message: 'ProductOutlet deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
