// routes/productCategory.js
const express = require('express');
const router = express.Router();
const productCategoryController = require('../controllers/productCategoryController');
const roleMiddleware = require('../middleware/roleMiddleware')

/**
 * @swagger
 * /api/product/categories:
 *   post:
 *     summary: Create a new product-category relationship
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productsId:
 *                 type: integer
 *                 example: 1
 *               categoriesId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product-category relationship created successfully
 *       400:
 *         description: Bad Request
 */
router.post('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), productCategoryController.createProductCategory);

/**
 * @swagger
 * /api/product/categories:
 *   get:
 *     summary: Get all product-category relationships
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of product-category relationships
 *       400:
 *         description: Bad Request
 */
router.get('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), productCategoryController.getProductCategories);

/**
 * @swagger
 * /api/product/categories/{id}:
 *   get:
 *     summary: Get a specific product-category relationship by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product-category relationship
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product-category relationship details
 *       404:
 *         description: ProductCategory not found
 *       400:
 *         description: Bad Request
 */
router.get('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), productCategoryController.getProductCategoryById);

/**
 * @swagger
 * /api/product/categories/{id}:
 *   put:
 *     summary: Update a product-category relationship
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product-category relationship to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productsId:
 *                 type: integer
 *                 example: 1
 *               categoriesId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Product-category relationship updated successfully
 *       404:
 *         description: ProductCategory not found
 *       400:
 *         description: Bad Request
 */
router.put('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), productCategoryController.updateProductCategory);

/**
 * @swagger
 * /api/product/categories/{id}:
 *   delete:
 *     summary: Delete a product-category relationship
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product-category relationship to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Product-category relationship deleted successfully
 *       404:
 *         description: ProductCategory not found
 *       400:
 *         description: Bad Request
 */
router.delete('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), productCategoryController.deleteProductCategory);

module.exports = router;
