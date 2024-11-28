const PromosiOutlet = require('../models/promosisOutlets');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');

// Create a new product-outlet relationship
exports.createPromosiOutlet = async (req, res) => {
  try {
    const { promosisId, outletsId } = req.body;

    // Validasi input
    if (!promosisId || !outletsId) {
      return res.status(400).json({
        success: false,
        message: "promosisId and outletsId are required",
      });
    }

    // Membuat product-outlet baru
    const promosiOutlet = await PromosiOutlet.create({
      promosisId,
      outletsId,
    });

    // Mengembalikan response sukses
    res.status(201).json({
      success: true,
      data: promosiOutlet,
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
exports.getPromosiOutlet = async (req, res) => {
  try {
    const promosiOutlet = await sequelize.query(`
      SELECT 
        promosisoutlets.id AS promosiOutletId,
        promosis.id AS promosiId,
        promosis.namaPromosi AS promosiName,
        outlets.id AS outletId,
        outlets.nama AS outletName
      FROM promosisoutlets
      INNER JOIN promosis ON promosisoutlets.promosisId = promosis.id
      INNER JOIN outlets ON promosisoutlets.outletsId = outlets.id
      WHERE promosisoutlets.deletedAt IS NULL;
    `, { type: sequelize.QueryTypes.SELECT });

    // Mengembalikan response sukses
    res.status(200).json({
      success: true,
      data: promosiOutlet,
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
exports.getPromosiOutletById = async (req, res) => {
  try {
    const { id } = req.params;

    // Query SQL untuk mendapatkan data berdasarkan id
    const promosiOutlet = await sequelize.query(`
      SELECT 
        promosisoutlets.id AS promosiOutletId,
        promosis.id AS promosiId,
        promosis.namaPromosi AS promosiName,
        outlets.id AS outletId,
        outlets.nama AS outletName
      FROM promosisoutlets
      INNER JOIN promosis ON promosisoutlets.promosisId = promosis.id
      INNER JOIN outlets ON promosisoutlets.outletsId = outlets.id
      WHERE promosisoutlets.id = :id
      AND promosisoutlets.deletedAt IS NULL;
    `, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { id },
    });

    // Mengecek apakah data ditemukan
    if (promosiOutlet.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Promosi-Outlet relationship with ID ${id} not found.`,
      });
    }

    // Mengembalikan response sukses
    res.status(200).json({
      success: true,
      data: promosiOutlet[0], // Menampilkan hasil pertama karena hanya 1 yang dicari
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
exports.updatePromosiOutlet = async (req, res) => {
  try {
    const { promosisId, outletsId } = req.body;

    // Validasi input
    if (!promosisId || !outletsId) {
      return res.status(400).json({
        success: false,
        message: "promosisId and outletsId are required",
      });
    }

    // Mencari product-outlet berdasarkan ID
    const promosiOutlet = await sequelize.query(`
      SELECT * FROM promosisoutlets
      WHERE id = :id AND deletedAt IS NULL
    `, {
      replacements: { id: req.params.id },
      type: sequelize.QueryTypes.SELECT,
    });

    if (promosiOutlet.length === 0) {
      return res.status(404).json({
        success: false,
        message: "PromosiOutlet not found",
      });
    }

    // Update produk dan outlet
    const updatedPromosiOutlet = await sequelize.query(`
      UPDATE promosisoutlets
      SET promosisId = :promosisId, outletsId = :outletsId
      WHERE id = :id
    `, {
      replacements: {
        promosisId,
        outletsId,
        id: req.params.id,
      },
      type: sequelize.QueryTypes.UPDATE,
    });

    // Mengembalikan response sukses
    res.status(200).json({
      success: true,
      message: 'PromosiOutlet updated successfully',
      data: { promosisId, outletsId },
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
exports.deletePromosiOutlet = async (req, res) => {
  try {
    const deleted = await PromosiOutlet.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'PromosiOutlet not found' });
    }

    res.status(200).json({ success: true, message: 'PromosiOutlet deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
