// controllers/categoryController.js
const Category = require('../models/categories');// Pastikan path model sesuai dengan struktur proyek Anda
const sequelize = require('../config/database');
const moment = require('moment-timezone');

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
    // Query SQL untuk mengambil data kategori dengan jumlah produk
    const queryCategories = `
      SELECT 
        categories.id AS id_kategori,
        categories.name AS nama_kategori,
        COUNT(productscategories.productsId) AS jumlah_product,
        GROUP_CONCAT(DISTINCT outlets.nama) AS nama_outlet,
        GROUP_CONCAT(DISTINCT productsoutlets.id) AS product_outlet_id,
        GROUP_CONCAT(DISTINCT productsoutlets.productsId) AS product_id,
        GROUP_CONCAT(DISTINCT productsoutlets.outletsId) AS outlet_id,
        categories.createdAt AS created_at
      FROM 
        categories
      LEFT JOIN 
        productscategories ON categories.id = productscategories.categoriesId
      LEFT JOIN 
        productsoutlets ON productscategories.productsId = productsoutlets.productsId
      LEFT JOIN 
        outlets ON productsoutlets.outletsId = outlets.id
      WHERE 
        categories.deletedAt IS NULL
      GROUP BY 
        categories.id, categories.name, categories.createdAt;
    `;

    // Jalankan query untuk mendapatkan data kategori
    const [categories] = await sequelize.query(queryCategories);

    // Memformat waktu pada setiap kategori
    const formattedCategories = categories.map(category => ({
      ...category,
      created_at: moment.utc(category.created_at).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
    }));

    // Mengembalikan respons dengan data kategori
    return res.status(200).json({
      success: true,
      message: 'Data kategori berhasil diambil',
      data: formattedCategories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data kategori',
      error: error.message,
    });
  }
};

// Mendapatkan kategori berdasarkan ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params; // Mendapatkan ID dari parameter URL

    // Query SQL untuk mengambil data kategori berdasarkan ID
    const queryCategoryById = `
      SELECT 
        categories.id AS id_kategori,
        categories.name AS nama_kategori,
        COUNT(productscategories.productsId) AS jumlah_product,
        GROUP_CONCAT(DISTINCT outlets.nama) AS nama_outlet,
        GROUP_CONCAT(DISTINCT productsoutlets.id) AS product_outlet_id,
        GROUP_CONCAT(DISTINCT productsoutlets.productsId) AS product_id,
        GROUP_CONCAT(DISTINCT productsoutlets.outletsId) AS outlet_id,
        categories.createdAt AS created_at
      FROM 
        categories
      LEFT JOIN 
        productscategories ON categories.id = productscategories.categoriesId
      LEFT JOIN 
        productsoutlets ON productscategories.productsId = productsoutlets.productsId
      LEFT JOIN 
        outlets ON productsoutlets.outletsId = outlets.id
      WHERE 
        categories.id = :id
      GROUP BY 
        categories.id, categories.name, categories.createdAt;
    `;

    // Jalankan query untuk mendapatkan data kategori berdasarkan ID
    const [categories] = await sequelize.query(queryCategoryById, {
      replacements: { id }, // Mengganti parameter :id dalam query
      type: sequelize.QueryTypes.SELECT,
    });

    // Jika kategori tidak ditemukan
    if (!categories || categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Kategori dengan ID ${id} tidak ditemukan.`,
      });
    }

    // Memformat waktu pada setiap kategori
    const formattedCategories = {
      ...categories[0],
      created_at: moment.utc(categories[0].created_at).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
    };

    // Mengembalikan respons dengan data kategori
    return res.status(200).json({
      success: true,
      message: 'Data kategori berhasil diambil',
      data: formattedCategories,
    });
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data kategori',
      error: error.message,
    });
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

// Menghapus kategori berdasarkan ID
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params; // Mendapatkan ID dari parameter URL

    // Cari kategori berdasarkan ID
    const category = await Category.findOne({ where: { id } });

    // Jika kategori tidak ditemukan
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Kategori dengan ID ${id} tidak ditemukan.`,
      });
    }

    // Hapus kategori
    await category.destroy();

    // Kembalikan respons berhasil
    return res.status(200).json({
      success: true,
      message: `Kategori dengan ID ${id} berhasil dihapus.`,
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus kategori.',
      error: error.message,
    });
  }
};
