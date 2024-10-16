const ProductOutlet = require('../models/productOutlet');

// Create a new product-outlet relationship
exports.createProductOutlet = async (req, res) => {
  try {
    const { product_id, outlet_id } = req.body;
    const productOutlet = await ProductOutlet.create({ product_id, outlet_id });
    res.status(201).json(productOutlet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all product-outlet relationships
exports.getProductOutlets = async (req, res) => {
    try {
      const productOutlets = await ProductOutlet.findAll();
      res.status(200).json(productOutlets);
    } catch (error) {
    console.error(error); // Debugging
      res.status(400).json({ error: error.message });
    }
  };  

// Get a specific product-outlet relationship by ID
exports.getProductOutletById = async (req, res) => {
  try {
    const productOutlet = await ProductOutlet.findByPk(req.params.id);
    if (productOutlet) {
      res.status(200).json(productOutlet);
    } else {
      res.status(404).json({ error: 'ProductOutlet not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a product-outlet relationship
exports.updateProductOutlet = async (req, res) => {
  try {
    const { product_id, outlet_id } = req.body;
    const [updated] = await ProductOutlet.update({ product_id, outlet_id }, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedProductOutlet = await ProductOutlet.findByPk(req.params.id);
      res.status(200).json(updatedProductOutlet);
    } else {
      res.status(404).json({ error: 'ProductOutlet not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product-outlet relationship
exports.deleteProductOutlet = async (req, res) => {
  try {
    const deleted = await ProductOutlet.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'ProductOutlet not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
