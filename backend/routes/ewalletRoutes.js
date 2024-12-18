const express = require('express');
const router = express.Router();
const ewalletController = require('../controllers/ewalletController');
// const roleMiddleware = require('../middleware/roleMiddleware');
const uploadEwallet = require('../middleware/uploadEwallet'); // Middleware upload

/**
 * @swagger
 * /api/ewallet:
 *   post:
 *     summary: Create a new ewallet with an image
 *     tags: [Ewallet]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               namaEwallet:
 *                 type: string
 *                 description: The name of the ewallet
 *                 example: Gopay
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the ewallet
 *     responses:
 *       201:
 *         description: The ewallet was created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post('/', uploadEwallet, ewalletController.createEwallet);

/**
 * @swagger
 * /api/ewallet:
 *   get:
 *     summary: Retrieve all ewallets
 *     tags: [Ewallet]
 *     description: Get all ewallet data
 *     responses:
 *       200:
 *         description: Successfully fetched ewallets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ewallets fetched successfully"
 *                 ewallets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       namaEwallet:
 *                         type: string
 *                       image:
 *                         type: string
 *       404:
 *         description: No ewallets found
 *       500:
 *         description: Internal server error
 */
router.get('/', ewalletController.getAllEwallets);

/**
 * @swagger
 * /api/ewallet/{id}:
 *   get:
 *     summary: Retrieve a specific ewallet by ID
 *     tags: [Ewallet]
 *     description: Get ewallet by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the ewallet
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully fetched ewallet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ewallet fetched successfully"
 *                 ewallet:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     namaEwallet:
 *                       type: string
 *                     image:
 *                       type: string
 *       404:
 *         description: Ewallet not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', ewalletController.getEwalletById);

/**
 * @swagger
 * /api/ewallet/{id}:
 *   put:
 *     summary: Update an ewallet by ID (including name and image)
 *     tags: [Ewallet]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ewallet ID to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               namaEwallet:
 *                 type: string
 *                 description: The new name for the ewallet
 *                 example: Updated Gopay
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: New image file for the ewallet (optional)
 *     responses:
 *       200:
 *         description: The ewallet was updated successfully
 *       404:
 *         description: Ewallet not found
 *       400:
 *         description: Invalid request or missing data
 *       500:
 *         description: Internal server error
 */
router.put('/:id', uploadEwallet, ewalletController.updateEwallet);

/**
 * @swagger
 * /api/ewallet/{id}:
 *   delete:
 *     summary: Delete an ewallet by ID (soft delete)
 *     tags: [Ewallet]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ewallet ID to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: The ewallet was successfully deleted (soft delete)
 *       404:
 *         description: Ewallet not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', ewalletController.deleteEwallet);

module.exports = router;