// controllers/productCategoryController.js
const ProductCategory = require('../models/productsCategories');

// Create a new product-category relationship
exports.createProductCategory = async (req, res) => {
  try {
    const { productsId, categoriesId } = req.body;
    const productCategory = await ProductCategory.create({ productsId, categoriesId });
    res.status(201).json(productCategory);
  } catch (error) {
    console.error(error); // Debugging
    res.status(400).json({ error: error.message });
  }
};

// Get all product-category relationships
exports.getProductCategories = async (req, res) => {
  try {
    const productCategories = await ProductCategory.findAll();
    res.status(200).json(productCategories);
  } catch (error) {
    console.error(error); // Debugging
    res.status(400).json({ error: error.message });
  }
};

// Get a specific product-category relationship by ID
exports.getProductCategoryById = async (req, res) => {
  try {
    const productCategory = await ProductCategory.findByPk(req.params.id);
    if (productCategory) {
      res.status(200).json(productCategory);
    } else {
      res.status(404).json({ error: 'ProductCategory not found' });
    }
  } catch (error) {
    console.error(error); // Debugging
    res.status(400).json({ error: error.message });
  }
};

// Update a product-category relationship
exports.updateProductCategory = async (req, res) => {
  try {
    const { product_id, categoriesId } = req.body;
    const [updated] = await ProductCategory.update({ product_id, categoriesId }, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedProductCategory = await ProductCategory.findByPk(req.params.id);
      res.status(200).json(updatedProductCategory);
    } else {
      res.status(404).json({ error: 'ProductCategory not found' });
    }
  } catch (error) {
    console.error(error); // Debugging
    res.status(400).json({ error: error.message });
  }
};

// Delete a product-category relationship
exports.deleteProductCategory = async (req, res) => {
  try {
    const deleted = await ProductCategory.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'ProductCategory not found' });
    }
  } catch (error) {
    console.error(error); // Debugging
    res.status(400).json({ error: error.message });
  }
};
