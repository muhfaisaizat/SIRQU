const express = require('express');
const router = express.Router();
const promosiOutletController = require('../controllers/promosiOutletController');
const roleMiddleware = require('../middleware/roleMiddleware')

/**
 * @swagger
 * /api/promosi/outlets:
 *   post:
 *     summary: Create a new Promosi-Outlet relationship
 *     tags: [Promosi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - promosisId
 *               - outletsId
 *             properties:
 *               promosisId:
 *                 type: integer
 *                 description: The ID of the promosi
 *                 example: 1
 *               outletsId:
 *                 type: integer
 *                 description: The ID of the outlet
 *                 example: 1
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
router.post('/', roleMiddleware(['Admin', 'Manager']), promosiOutletController.createPromosiOutlet);

/**
 * @swagger
 * /api/promosi/outlets:
 *   get:
 *     summary: Get all Promosi-Outlet relationships
 *     tags: [Promosi]
 *     responses:
 *       200:
 *         description: A list of Promosi-Outlet relationships
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductOutlet'
 *       400:
 *         description: Error fetching relationships
 */
router.get('/', roleMiddleware(['Admin', 'Manager']), promosiOutletController.getPromosiOutlet);

/**
 * @swagger
 * /api/promosi/outlets/{id}:
 *   get:
 *     summary: Get a Promosi-Outlet relationship by ID
 *     tags: [Promosi]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Promosi-Outlet relationship
 *     responses:
 *       200:
 *         description: The Promosi-Outlet relationship data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromosiOutlet'
 *       404:
 *         description: Relationship not found
 *       400:
 *         description: Error fetching the relationship
 */
router.get('/:id', roleMiddleware(['Admin', 'Manager']), promosiOutletController.getPromosiOutletById);

/**
 * @swagger
 * /api/promosi/outlets/{id}:
 *   put:
 *     summary: Update a Promosi-Outlet relationship by ID
 *     tags: [Promosi]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Promosi-Outlet relationship
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - promosisId
 *               - outletsId
 *             properties:
 *               promosisId:
 *                 type: integer
 *                 description: The ID of the product
 *               outletsId:
 *                 type: integer
 *                 description: The ID of the outlet
 *     responses:
 *       200:
 *         description: The updated Promosi-Outlet relationship
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromosiOutlet'
 *       404:
 *         description: Relationship not found
 *       400:
 *         description: Error updating the relationship
 */
router.put('/:id', roleMiddleware(['Admin', 'Manager']), promosiOutletController.updatePromosiOutlet);

/**
 * @swagger
 * /api/promosi/outlets/{id}:
 *   delete:
 *     summary: Delete a Promosi-Outlet relationship by ID
 *     tags: [Promosi]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Promosi-Outlet relationship
 *     responses:
 *       204:
 *         description: Promosi-outlet relationship deleted successfully
 *       404:
 *         description: PromosiOutlet not found
 *       400:
 *         description: Bad Request
 */
router.delete('/:id', roleMiddleware(['Admin', 'Manager']), promosiOutletController.deletePromosiOutlet);

module.exports = router;