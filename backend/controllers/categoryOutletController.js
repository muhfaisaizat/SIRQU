// controllers/categoryOutletController.js
const CategoryOutlet = require('../models/categoryOutlet');

// Create a new category-outlet relationship
exports.createCategoryOutlet = async (req, res) => {
  try {
    const { categories_id, outlet_id } = req.body;
    const categoryOutlet = await CategoryOutlet.create({ categories_id, outlet_id });
    res.status(201).json(categoryOutlet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get all category-outlet relationships
exports.getCategoryOutlets = async (req, res) => {
    try {
      const categoryOutlets = await CategoryOutlet.findAll();
      if (categoryOutlets.length === 0) {
        return res.status(404).json({ error: 'No category-outlet relationships found' }); // Jika tidak ada data
      }
      res.status(200).json(categoryOutlets);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

// Get a specific category-outlet relationship by ID
exports.getCategoryOutletById = async (req, res) => {
  try {
    const categoryOutlet = await CategoryOutlet.findByPk(req.params.id);
    if (categoryOutlet) {
      res.status(200).json(categoryOutlet);
    } else {
      res.status(404).json({ error: 'CategoryOutlet not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a category-outlet relationship
exports.updateCategoryOutlet = async (req, res) => {
  try {
    const { categories_id, outlet_id } = req.body;
    const [updated] = await CategoryOutlet.update({ categories_id, outlet_id }, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedCategoryOutlet = await CategoryOutlet.findByPk(req.params.id);
      res.status(200).json(updatedCategoryOutlet);
    } else {
      res.status(404).json({ error: 'CategoryOutlet not found' });
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
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'CategoryOutlet not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
