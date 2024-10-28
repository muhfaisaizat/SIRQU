// routes/outletRoutes.js
const express = require('express');
const router = express.Router();
const outletController = require('../controllers/outletController');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadImage'); // Middleware upload

/**
 * @swagger
 * /api/outlets:
 *   post:
 *     summary: Create a new outlet with an image
 *     tags: [Outlets]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 description: The name of the outlet
 *                 example: Outlet XYZ
 *               alamat:
 *                 type: string
 *                 description: Address of the outlet
 *                 example: Jalan ABC No.123
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the outlet
 *               syarat_ketentuan:
 *                 type: boolean
 *                 description: Terms and conditions status of the outlet
 *     responses:
 *       201:
 *         description: The outlet was created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', roleMiddleware(['Admin', 'Manager']), upload, outletController.createOutlet);

/**
 * @swagger
 * /api/outlets:
 *   get:
 *     summary: Get all outlets
 *     tags: [Outlets]
 *     responses:
 *       200:
 *         description: A list of outlets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The outlet ID
 *                   nama:
 *                     type: string
 *                     description: The name of the outlet
 *                   alamat:
 *                     type: string
 *                     description: The address of the outlet
 *                   image:
 *                     type: string
 *                     description: The image URL/path of the outlet
 *                   syarat_ketentuan:
 *                     type: boolean
 *                     description: Terms and conditions status
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the outlet was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the outlet was last updated
 */
router.get('/', roleMiddleware(['Admin', 'Manager']), outletController.getOutlets);

/**
 * @swagger
 * /api/outlets/{id}:
 *   get:
 *     summary: Get an outlet by ID
 *     tags: [Outlets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The outlet ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Outlet found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The outlet ID
 *                 nama:
 *                   type: string
 *                   description: The name of the outlet
 *                 alamat:
 *                   type: string
 *                   description: The address of the outlet
 *                 image:
 *                   type: string
 *                   description: The image URL/path of the outlet
 *                 syarat_ketentuan:
 *                   type: boolean
 *                   description: Terms and conditions status
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the outlet was created
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the outlet was last updated
 *       404:
 *         description: Outlet not found
 */
router.get('/:id', roleMiddleware(['Admin', 'Manager']), outletController.getOutletById);

/**
 * @swagger
 * /api/outlets/{id}:
 *   put:
 *     summary: Update an outlet by ID (including image)
 *     tags: [Outlets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The outlet ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 description: The name of the outlet
 *                 example: Updated Outlet XYZ
 *               alamat:
 *                 type: string
 *                 description: Updated address of the outlet
 *                 example: Jalan XYZ No.456
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: New image file for the outlet
 *               syarat_ketentuan:
 *                 type: boolean
 *                 description: Updated terms and conditions status of the outlet
 *     responses:
 *       200:
 *         description: The outlet was updated successfully
 *       404:
 *         description: Outlet not found
 */
router.put('/:id', roleMiddleware(['Admin', 'Manager']), upload, outletController.updateOutlet);

/**
 * @swagger
 * /api/outlets/{id}:
 *   delete:
 *     summary: Delete an outlet by ID
 *     tags: [Outlets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The outlet ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Outlet deleted successfully
 *       404:
 *         description: Outlet not found
 */
router.delete('/:id', roleMiddleware(['Admin', 'Manager']), outletController.deleteOutlet);

module.exports = router;
