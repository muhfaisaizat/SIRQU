// controllers/productImageController.js
const ProductImage = require('../models/productImage');
const Product = require('../models/product'); // Pastikan path model benar

// Menambahkan gambar produk baru
exports.createProductImage = async (req, res) => {
  try {
    // Validasi apakah product_id yang diberikan ada di database
    const product = await Product.findByPk(req.body.product_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Tambahkan path gambar dari req.file
    const imagePath = req.file ? `/images/${req.file.filename}` : null;

    // Buat data gambar produk baru dengan path gambar
    const productImage = await ProductImage.create({
      product_id: req.body.product_id, // Gunakan product_id dari body
      image: imagePath,
    });

    res.status(201).json(productImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all product image relationships
exports.getProductImages = async (req, res) => {
    try {
      const productImage = await ProductImage.findAll();
      res.status(200).json(productImage);
    } catch (error) {
      console.error(error); // Debugging
      res.status(400).json({ error: error.message });
    }
  };

// Mendapatkan gambar produk berdasarkan ID
exports.getProductImageById = async (req, res) => {
  try {
    const productImage = await ProductImage.findByPk(req.params.id, {
      include: [{ model: Product, attributes: ['name'] }], // Ambil data produk terkait
    });
    if (productImage) {
      res.status(200).json(productImage);
    } else {
      res.status(404).json({ error: 'Product image not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Memperbarui gambar produk (termasuk gambar baru)
exports.updateProductImage = async (req, res) => {
  try {
    // Ambil gambar produk berdasarkan ID
    const productImage = await ProductImage.findByPk(req.params.id);
    if (!productImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }

    // Validasi apakah product_id yang baru diberikan ada di database
    if (req.body.product_id) {
      const product = await Product.findByPk(req.body.product_id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
    }

    // Jika gambar baru diupload, ganti path gambar
    const imagePath = req.file ? `/images/${req.file.filename}` : productImage.image;

    // Perbarui gambar produk
    await productImage.update({
      product_id: req.body.product_id || productImage.product_id, // Gunakan product_id dari body jika ada
      image: imagePath,
    });

    res.status(200).json(productImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Menghapus gambar produk
exports.deleteProductImage = async (req, res) => {
  try {
    const deleted = await ProductImage.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ error: 'Product image not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
