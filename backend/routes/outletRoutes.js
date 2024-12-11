// routes/outletRoutes.js
const express = require('express');
const router = express.Router();
const outletController = require('../controllers/outletController');
const roleMiddleware = require('../middleware/roleMiddleware');
const uploadOutlet = require('../middleware/uploadImageOutlet'); // Middleware upload

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
 *               position:
 *                 type: string
 *                 enum: [Toko Utama, Toko Cabang]
 *                 description: Position of the outlet (Main Store or Branch)
 *                 example: Toko Utama
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the outlet
 *               syarat_ketentuan:
 *                 type: boolean
 *                 description: Terms and conditions status of the outlet
 *                 example: true
 *     responses:
 *       201:
 *         description: The outlet was created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), uploadOutlet, outletController.createOutlet);

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
router.get('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), outletController.getOutlets);

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
router.get('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), outletController.getOutletById);

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
router.put('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), uploadOutlet, outletController.updateOutlet);

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
router.delete('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), outletController.deleteOutlet);

/**
 * @swagger
 * /api/outlets/{id}/koordinator:
 *   put:
 *     summary: Update the coordinator of an outlet by ID
 *     tags: [Outlets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the outlet to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               koordinatorId:
 *                 type: integer
 *                 description: The ID of the user to be set as the new coordinator
 *                 example: 123
 *     responses:
 *       200:
 *         description: Coordinator updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     koordinatorId:
 *                       type: integer
 *       403:
 *         description: User does not have permission to be a coordinator
 *       404:
 *         description: Outlet or user not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id/koordinator', roleMiddleware(['Admin', 'Manager', 'Kasir']), outletController.updateOutletCoordinator);

/**
 * @swagger
 * /api/outlets/product-outlets:
 *   post:
 *     summary: Create ProductOutlet for each product in a specific outlet
 *     tags: [Outlets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               outlet_id:
 *                 type: integer
 *                 description: ID of the outlet for which to create ProductOutlets
 *                 example: 1
 *     responses:
 *       201:
 *         description: Successfully created ProductOutlets for each product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product_id:
 *                         type: integer
 *                       outlet_id:
 *                         type: integer
 *       404:
 *         description: No products found
 *       500:
 *         description: Internal server error
 */
router.post('/product-outlets',  outletController.createProductOutletsForAllProducts);

/**
 * @swagger
 * /api/outlets/syarat-ketentuan/{id}:
 *   put:
 *     summary: Update the terms and conditions (syarat ketentuan) of an outlet by ID
 *     tags: [Outlets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the outlet to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               syarat_ketentuan:
 *                 type: boolean
 *                 description: The new terms and conditions for the outlet (true or false)
 *                 example: true
 *     responses:
 *       200:
 *         description: Syarat ketentuan updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Syarat ketentuan updated successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the outlet
 *                     syarat_ketentuan:
 *                       type: boolean
 *                       description: The updated terms and conditions
 *       400:
 *         description: Field syarat_ketentuan is required
 *       404:
 *         description: Outlet not found
 *       500:
 *         description: Internal server error
 */
router.put('/syarat-ketentuan/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), outletController.updateSyaratKetentuan);


module.exports = router;
