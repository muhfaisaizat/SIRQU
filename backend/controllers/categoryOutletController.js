// controllers/categoryOutletController.js
const CategoryOutlet = require("../models/categoriesOutlets");

// Create a new category-outlet relationship
exports.createCategoryOutlet = async (req, res) => {
  try {
    const { categoriesId, outletsId } = req.body;

    // Validasi input
    if (!categoriesId || !outletsId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "categoriesId and outletsId are required",
        });
    }

    const categoryOutlet = await CategoryOutlet.create({
      categoriesId,
      outletsId,
    });
    res.status(201).json({ success: true, data: categoryOutlet });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all category-outlet relationships
exports.getCategoryOutlets = async (req, res) => {
  try {
    console.log("Fetching all category outlets...");
    const categoryOutlets = await CategoryOutlet.findAll({
      include: [
        { model: Categories, as: 'category', attributes: ['id'] },
        { model: Outlets, as: 'outlet', attributes: ['id'] },
      ],
    });
    console.log("Fetched data:", categoryOutlets);

    res.status(200).json({ success: true, data: categoryOutlets });
  } catch (error) {
    console.error("Error fetching category outlets:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};


// Get a specific category-outlet relationship by ID
exports.getCategoryOutletById = async (req, res) => {
  try {
    const categoryOutlet = await CategoryOutlet.findByPk(req.params.id);
    if (categoryOutlet) {
      res.status(200).json(categoryOutlet);
    } else {
      res.status(404).json({ error: "CategoryOutlet not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
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