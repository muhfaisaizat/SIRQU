// routes/categoryOutletRoutes.js
const express = require('express');
const router = express.Router();
const categoryOutletController = require('../controllers/categoryOutletController');
const roleMiddleware = require('../middleware/roleMiddleware');

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
 *               - categoriesId
 *               - outletsId
 *             properties:
 *               categoriesId:
 *                 type: integer
 *                 description: The ID of the category
 *               outletsId:
 *                 type: integer
 *                 description: The ID of the outlet
 *           example:
 *             categoriesId: 1
 *             outletsId: 2
 *     responses:
 *       201:
 *         description: Successfully created the relationship
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/CategoryOutlet'
 *       400:
 *         description: Bad request or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 */
router.post('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), categoryOutletController.createCategoryOutlet);


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
router.get('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), categoryOutletController.getCategoryOutlets);



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
router.get('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), categoryOutletController.getCategoryOutletById);

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
 *               - categoriesId
 *               - outletsId
 *             properties:
 *               categoriesId:
 *                 type: integer
 *                 description: The ID of the category
 *               outletsId:
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
router.put('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), categoryOutletController.updateCategoryOutlet);

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
router.delete('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), categoryOutletController.deleteCategoryOutlet);

module.exports = router;
