// routes/categoryOutletRoutes.js
const express = require('express');
const router = express.Router();
const categoryOutletController = require('../controllers/categoryOutletController');

/**
 * @swagger
 * /api/categories/outlets:
 *   post:
 *     summary: Create a new Category-Outlet relationship
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categories_id
 *               - outlet_id
 *             properties:
 *               categories_id:
 *                 type: integer
 *                 description: The ID of the category
 *               outlet_id:
 *                 type: integer
 *                 description: The ID of the outlet
 *     responses:
 *       201:
 *         description: Successfully created the relationship
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryOutlet'
 *       400:
 *         description: Bad request or invalid data
 */
router.post('/', categoryOutletController.createCategoryOutlet);

/**
 * @swagger
 * /api/categories/outlets:
 *   get:
 *     summary: Get all Category-Outlet relationships
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of Category-Outlet relationships
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoryOutlet'
 *       400:
 *         description: Error fetching relationships
 */
router.get('/', categoryOutletController.getCategoryOutlets);

/**
 * @swagger
 * /api/categories/outlets/{id}:
 *   get:
 *     summary: Get a Category-Outlet relationship by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Category-Outlet relationship
 *     responses:
 *       200:
 *         description: The Category-Outlet relationship data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryOutlet'
 *       404:
 *         description: Relationship not found
 *       400:
 *         description: Error fetching the relationship
 */
router.get('/:id', categoryOutletController.getCategoryOutletById);

/**
 * @swagger
 * /api/categories/outlets/{id}:
 *   put:
 *     summary: Update a Category-Outlet relationship by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Category-Outlet relationship
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categories_id
 *               - outlet_id
 *             properties:
 *               categories_id:
 *                 type: integer
 *                 description: The ID of the category
 *               outlet_id:
 *                 type: integer
 *                 description: The ID of the outlet
 *     responses:
 *       200:
 *         description: The updated Category-Outlet relationship
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryOutlet'
 *       404:
 *         description: Relationship not found
 *       400:
 *         description: Error updating the relationship
 */
router.put('/:id', categoryOutletController.updateCategoryOutlet);

/**
 * @swagger
 * /api/categories/outlets/{id}:
 *   delete:
 *     summary: Delete a Category-Outlet relationship by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Category-Outlet relationship
 *     responses:
 *       204:
 *         description: Successfully deleted
 *       404:
 *         description: Relationship not found
 *       400:
 *         description: Error deleting the relationship
 */
router.delete('/:id', categoryOutletController.deleteCategoryOutlet);

module.exports = router;
