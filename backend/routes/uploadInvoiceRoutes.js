// routes/productImageRoutes.js
const express = require('express');
const router = express.Router();
const { createUploadInvoice, getUploadInvoice, getUploadInvoiceByTransaksiId, updateUploadInvoice, deleteUploadInvoiceByTransaksiId } = require('../controllers/uploadInvoiceController');
// const roleMiddleware = require('../middleware/roleMiddleware');
const uploadInvoice = require('../middleware/uploadImageInvoice'); // Middleware for uploading images

/**
 * @swagger
 * /api/transaksi/upload-invoice:
 *   post:
 *     summary: Create a new upload invoice
 *     tags: [Transaksi]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               transaksisId:
 *                 type: integer
 *                 description: The ID of the transaksi
 *               imageInvoice:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the invoice
 *     responses:
 *       201:
 *         description: The product image was created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/upload-invoice', uploadInvoice, createUploadInvoice);

/**
 * @swagger
 * /api/transaksi/upload-invoice:
 *   get:
 *     summary: Get all upload invoice
 *     tags: [Transaksi]
 *     responses:
 *       200:
 *         description: A list of upload invoice
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The upload invoice ID
 *                   transaksi_id:
 *                     type: integer
 *                     description: The ID of the transaksi
 *                   imageInvoice:
 *                     type: string
 *                     description: The URL/path of the upload invoice
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/upload-invoice', getUploadInvoice);

/**
 * @swagger
 * /api/transaksi/upload-invoice/{transaksisId}:
 *   get:
 *     summary: Get a upload invoice by transaksiID
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: transaksisId
 *         required: true
 *         description: The upload invoice ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Upload invoice found
 *       404:
 *         description: Upload invoice not found
 */
router.get('/upload-invoice/:transaksisId', getUploadInvoiceByTransaksiId);

/**
 * @swagger
 * /api/transaksi/upload-invoice/{transaksisId}:
 *   put:
 *     summary: Update upload invoice by transaksi ID
 *     tags: [Transaksi]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               transaksisId:
 *                 type: integer
 *                 description: The ID of the transaksi
 *                 required: true
 *               imageInvoice:
 *                 type: string
 *                 format: binary
 *                 description: New image file for the upload invoice
 *     responses:
 *       200:
 *         description: The upload invoice was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 uploadInvoice:
 *                   $ref: '#/components/schemas/UploadInvoice'
 *       404:
 *         description: Transaksi or upload invoice not found
 *       400:
 *         description: Image file is required
 *       500:
 *         description: Internal server error
 */
router.put('/upload-invoice/:transaksisId', uploadInvoice, updateUploadInvoice);

/**
 * @swagger
 * /api/transaksi/upload-invoice/{transaksisId}:
 *   delete:
 *     summary: Delete a upload invoice by transaksisId
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: transaksisId
 *         required: true
 *         description: The upload invoice transaksisId
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Upload invoice deleted successfully
 *       404:
 *         description: Upload invoice not found
 */
router.delete('/upload-invoice/:transaksisId', deleteUploadInvoiceByTransaksiId);

module.exports = router;