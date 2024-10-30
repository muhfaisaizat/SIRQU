const express = require('express');
const router = express.Router();
const productOutletController = require('../controllers/productOutletController');
const roleMiddleware = require('../middleware/roleMiddleware')

/**
 * @swagger
 * /api/products/outlets:
 *   post:
 *     summary: Create a new Product-Outlet relationship
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - outlet_id
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: The ID of the product
 *               outlet_id:
 *                 type: integer
 *                 description: The ID of the outlet
 *     responses:
 *       201:
 *         description: Successfully created the relationship
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductOutlet'
 *       400:
 *         description: Bad request or invalid data
 */
router.post('/', roleMiddleware(['Admin', 'Manager']), productOutletController.createProductOutlet);

/**
 * @swagger
 * /api/products/outlets:
 *   get:
 *     summary: Get all Product-Outlet relationships
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of Product-Outlet relationships
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductOutlet'
 *       400:
 *         description: Error fetching relationships
 */
router.get('/', roleMiddleware(['Admin', 'Manager']), productOutletController.getProductOutlets);

/**
 * @swagger
 * /api/products/outlets/{id}:
 *   get:
 *     summary: Get a Product-Outlet relationship by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Product-Outlet relationship
 *     responses:
 *       200:
 *         description: The Product-Outlet relationship data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductOutlet'
 *       404:
 *         description: Relationship not found
 *       400:
 *         description: Error fetching the relationship
 */
router.get('/:id', roleMiddleware(['Admin', 'Manager']), productOutletController.getProductOutletById);

/**
 * @swagger
 * /api/products/outlets/{id}:
 *   put:
 *     summary: Update a Product-Outlet relationship by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Product-Outlet relationship
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - outlet_id
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: The ID of the product
 *               outlet_id:
 *                 type: integer
 *                 description: The ID of the outlet
 *     responses:
 *       200:
 *         description: The updated Product-Outlet relationship
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductOutlet'
 *       404:
 *         description: Relationship not found
 *       400:
 *         description: Error updating the relationship
 */
router.put('/:id', roleMiddleware(['Admin', 'Manager']), productOutletController.updateProductOutlet);

/**
 * @swagger
 * /api/products/outlets/{id}:
 *   delete:
 *     summary: Delete a Product-Outlet relationship by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Product-Outlet relationship
 *     responses:
 *       204:
 *         description: Successfully deleted
 *       404:
 *         description: Relationship not found
 *       400:
 *         description: Error deleting the relationship
 */
router.delete('/:id', roleMiddleware(['Admin', 'Manager']), productOutletController.deleteProductOutlet);

module.exports = router;
