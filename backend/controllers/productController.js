const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
    const { name, description, price, stock, unlimited_stock } = req.body;
  
    if (!unlimited_stock && (stock < 0 || isNaN(stock))) {
      return res.status(400).json({ error: "Stock must be a non-negative integer when not unlimited." });
    }
  
    try {
      const finalStock = unlimited_stock ? null : stock; 
  
      const newProduct = await Product.create({
        name,
        description,
        price,
        stock: finalStock,
        unlimited_stock,
      });
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Update product
  exports.updateProduct = async (req, res) => {
    const { name, description, price, stock, unlimited_stock } = req.body;
  
    if (!unlimited_stock && (stock < 0 || isNaN(stock))) {
      return res.status(400).json({ error: "Stock must be a non-negative integer when not unlimited." });
    }
  
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      const finalStock = unlimited_stock ? null : stock;
  
      await product.update({
        name,
        description,
        price,
        stock: finalStock,
        unlimited_stock,
      });
      res.json(product);
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
