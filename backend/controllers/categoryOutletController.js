// controllers/categoryOutletController.js
const CategoryOutlet = require("../models/categoriesOutlets");
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
// const Categories = require('../models/categories');
// const Outlets = require('../models/outlets');

// Create a new category-outlet relationship
exports.createCategoryOutlet = async (req, res) => {
  try {
    const { categoriesId, outletsId } = req.body;

    // Validasi input
    if (!categoriesId || !outletsId) {
      return res.status(400).json({
        success: false,
        message: "categoriesId and outletsId are required",
      });
    }

    // Membuat category-outlet baru
    const categoryOutlet = await CategoryOutlet.create({
      categoriesId,
      outletsId,
    });

    // Mengembalikan response sukses
    res.status(201).json({
      success: true,
      data: categoryOutlet,
    });
  } catch (error) {
    // Menangani error
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all category-outlet relationships
exports.getCategoryOutlets = async (req, res) => {
  try {
    // Menjalankan query SQL JOIN
    const query = `
      SELECT 
        categoriesoutlets.id AS categoryOutletId,
        categories.id AS categoryId,
        categories.name AS categoryName,
        outlets.id AS outletId,
        outlets.nama AS outletName
      FROM categoriesoutlets
      INNER JOIN categories ON categoriesoutlets.categoriesId = categories.id
      INNER JOIN outlets ON categoriesoutlets.outletsId = outlets.id;
    `;

    const categoryOutlets = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    if (categoryOutlets.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No category-outlet relationships found.',
      });
    }

    res.status(200).json({
      success: true,
      data: categoryOutlets,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a specific category-outlet relationship by ID
exports.getCategoryOutletById = async (req, res) => {
  try {
    const { id } = req.params; // Mendapatkan id dari parameter URL

    // Menjalankan query SQL JOIN untuk mencari berdasarkan categoryOutletId
    const query = `
      SELECT 
        categoriesoutlets.id AS categoryOutletId,
        categories.id AS categoryId,
        categories.name AS categoryName,
        outlets.id AS outletId,
        outlets.nama AS outletName
      FROM categoriesoutlets
      INNER JOIN categories ON categoriesoutlets.categoriesId = categories.id
      INNER JOIN outlets ON categoriesoutlets.outletsId = outlets.id
      WHERE categoriesoutlets.id = :id AND categoriesoutlets.deletedAt IS NULL;
    `;

    const categoryOutlet = await sequelize.query(query, {
      replacements: { id },  // Mengganti :id dengan id dari URL
      type: QueryTypes.SELECT,
    });

    if (categoryOutlet.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Category-outlet relationship with ID ${id} not found.`,
      });
    }

    res.status(200).json({
      success: true,
      data: categoryOutlet[0], // Mengambil item pertama karena hasilnya berupa array
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a category-outlet relationship
exports.updateCategoryOutlet = async (req, res) => {
  try {
    const { categoriesId, outletsId } = req.body;
    const [updated] = await CategoryOutlet.update(
      { categoriesId, outletsId },
      {
        where: { id: req.params.id },
      }
    );
    if (updated) {
      const updatedCategoryOutlet = await CategoryOutlet.findByPk(
        req.params.id
      );
      res.status(200).json(updatedCategoryOutlet);
    } else {
      res.status(404).json({ error: "CategoryOutlet not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a category-outlet relationship
exports.deleteCategoryOutlet = async (req, res) => {
  try {
    const deleted = await CategoryOutlet.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'CategoryOutlet not found' });
    }

    res.status(200).json({ success: true, message: 'CategoryOutlet deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};