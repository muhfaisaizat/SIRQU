// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: Electronics

 *     responses:   
 *       201:
 *         description: The category was created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), categoryController.createCategory);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The category ID
 *                   name:
 *                     type: string
 *                     description: The name of the category
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the category was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the category was last updated
 *                   deletedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the category was deleted (if applicable)
 */
router.get('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), categoryController.getCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The category details
 *       404:
 *         description: Category not found
 */
router.get('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), categoryController.getCategoryById);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The category was updated successfully
 *       404:
 *         description: Category not found
 *       400:
 *         description: Invalid request
 */
router.put('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), categoryController.updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), categoryController.deleteCategory);

module.exports = router;
