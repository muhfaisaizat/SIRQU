// controllers/categoryController.js
const Category = require('../models/category');// Pastikan path model sesuai dengan struktur proyek Anda
const sequelize = require('../config/database');

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
    COUNT(product_categories.product_id) AS jumlah_product,
    GROUP_CONCAT(DISTINCT outlets.nama) AS nama_outlet,
    GROUP_CONCAT(DISTINCT product_outlets.id) AS product_outlet_id,
    GROUP_CONCAT(DISTINCT product_outlets.product_id) AS product_id,
    GROUP_CONCAT(DISTINCT product_outlets.outlet_id) AS outlet_id,
    categories.createdAt AS created_at
FROM 
    categories
LEFT JOIN 
    product_categories ON categories.id = product_categories.categories_id
LEFT JOIN 
    product_outlets ON product_categories.product_id = product_outlets.product_id
LEFT JOIN 
    outlets ON product_outlets.outlet_id = outlets.id
GROUP BY 
    categories.id, categories.name, categories.createdAt;
    `;

    // Jalankan query untuk mendapatkan data kategori
    const [categories] = await sequelize.query(queryCategories); // Menggunakan sequelize untuk menjalankan query

    // Mengembalikan respons dengan data kategori
    return res.status(200).json({
      success: true,
      message: 'Data kategori berhasil diambil',
      data: categories,
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
  const { id } = req.params; // Mengambil ID dari parameter URL

  try {
    // Query SQL untuk mengambil detail kategori berdasarkan ID
    const queryCategoryById = `
      SELECT 
        categories.id AS id_kategori,
        categories.name AS nama_kategori,
        COUNT(product_categories.product_id) AS jumlah_product,
        GROUP_CONCAT(DISTINCT outlets.nama) AS nama_outlet,
        GROUP_CONCAT(DISTINCT product_outlets.id) AS product_outlet_id,
        GROUP_CONCAT(DISTINCT product_outlets.product_id) AS product_id,
        GROUP_CONCAT(DISTINCT product_outlets.outlet_id) AS outlet_id,
        categories.createdAt AS created_at
      FROM 
          categories
      LEFT JOIN 
          product_categories ON categories.id = product_categories.categories_id
      LEFT JOIN 
          product_outlets ON product_categories.product_id = product_outlets.product_id
      LEFT JOIN 
          outlets ON product_outlets.outlet_id = outlets.id
      WHERE 
        categories.id = ?
      GROUP BY 
        categories.id, categories.name, categories.createdAt;
    `;

    // Jalankan query untuk mendapatkan detail kategori
    const [category] = await sequelize.query(queryCategoryById, {
      replacements: [id], // Mengganti placeholder dengan ID kategori
    });

    // Memeriksa apakah kategori ditemukan
    if (category.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Mengembalikan respons dengan detail kategori
    return res.status(200).json({
      success: true,
      message: 'Detail kategori berhasil diambil',
      data: category[0], // Mengambil objek kategori pertama
    });
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil detail kategori',
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
