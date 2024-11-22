// controllers/productImageController.js
const path = require('path');
const Product = require('../models/products'); // Pastikan path model benar
const ProductImage = require('../models/productImage'); // Pastikan path model benar

// Menambahkan gambar untuk produk
exports.createProductImage = async (req, res) => {
  const { productsId } = req.body;

  try {
    // Memastikan produk dengan ID yang diberikan ada
    const product = await Product.findByPk(productsId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Menyimpan path gambar jika ada
    const imagePath = req.file ? `Product_${productsId}_${req.file.originalname}` : null;

    if (!imagePath) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Membuat data gambar produk baru
    const newProductImage = await ProductImage.create({
      productsId,
      image: imagePath,
    });

    // Mengirimkan respons sukses dengan data yang baru dibuat
    res.status(201).json({
      message: 'Product image created successfully',
      productImage: newProductImage,
    });
  } catch (error) {
    console.error('Error creating product image:', error);
    res.status(500).json({ message: 'Internal server error' });
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
