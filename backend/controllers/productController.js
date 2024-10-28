const Product = require('../models/product');
const sequelize = require('../config/database');

// // Get all products
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.findAll();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const unlimited_stock = req.body.unlimited_stock === 'true';
  
  // Convert stock to null if it’s an empty string
  let stock = req.body.stock === "" ? null : req.body.stock;

  // Validate stock based on the value of unlimited_stock
  if (unlimited_stock) {
    if (stock !== null) {
      return res.status(400).json({ error: "Stock must be null when unlimited_stock is true." });
    }
  } else {
    if (stock == null || isNaN(stock) || stock < 0) {
      return res.status(400).json({ error: "Stock must be a non-negative integer when unlimited_stock is false." });
    }
  }

  try {
    // Set stock to null if unlimited_stock is true
    const finalStock = unlimited_stock ? null : stock;

    // Collect paths of uploaded images
    const imagePath = req.file ? `/images/${req.file.filename}` : null;
    // Create new product
    const newProduct = await Product.create({
      name,
      description,
      price,
      stock: finalStock,
      unlimited_stock,
      image: imagePath, 
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  
  // Update product
  exports.updateProduct = async (req, res) => {
    const { name, description, price } = req.body;
    const unlimited_stock = req.body.unlimited_stock === 'true';
  
    // Convert stock to null if it’s an empty string
    let stock = req.body.stock === "" ? null : req.body.stock;
  
    // Validate stock based on the value of unlimited_stock
    if (unlimited_stock) {
      if (stock !== null) {
        return res.status(400).json({ error: "Stock must be null when unlimited_stock is true." });
      }
    } else {
      if (stock == null || isNaN(stock) || stock < 0) {
        return res.status(400).json({ error: "Stock must be a non-negative integer when unlimited_stock is false." });
      }
    }
  
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      // Set stock to null if unlimited_stock is true
      const finalStock = unlimited_stock ? null : stock;
  
      // Update image path if a new file is uploaded
      const imagePath = req.file ? `/images/${req.file.filename}` : product.image;
  
      // Update product
      await product.update({
        name,
        description,
        price,
        stock: finalStock,
        unlimited_stock,
        image: imagePath, // Update image path
      });
  
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Soft delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mendapatkan semua data produk
exports.getProducts = async (req, res) => {
  try {
    // Query SQL untuk mengambil data menu dengan produk, kategori, dan outlet
    const queryMenu = `
      SELECT 
        products.id AS id_product,
        products.name AS nama_product,
        products.description AS deskripsi_product,
        products.stock AS stok_product,
        products.unlimited_stock AS unlimited_stock,
        products.price AS harga_product,
        categories.id AS id_category,
        categories.name AS nama_category,
        outlets.id AS id_outlet,
        outlets.nama AS nama_outlet
      FROM 
        products
      JOIN 
        product_categories ON products.id = product_categories.product_id
      JOIN 
        categories ON product_categories.categories_id = categories.id
      JOIN 
        product_outlets ON products.id = product_outlets.product_id
      JOIN 
        outlets ON product_outlets.outlet_id = outlets.id
      WHERE
        products.deletedAt IS NULL
    `;

    // Jalankan query untuk mendapatkan data menu
    const [menus] = await sequelize.query(queryMenu);

    // Mengembalikan respons dengan data menu
    return res.status(200).json({
      success: true,
      message: 'Data menu berhasil diambil',
      data: menus,
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data menu',
      error: error.message,
    });
  }
};