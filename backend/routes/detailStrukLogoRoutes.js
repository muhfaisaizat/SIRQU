const express = require('express');
const Controller = require('../controllers/detailStrukLogosController');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();
const uploadLogo = require('../middleware/uploadImageLogo');


/**
 * @swagger
 * /api/setting-struk/detail-struk-logo:
 *   post:
 *     summary: Create a new detail-struk-logo
 *     tags: [setting-struk]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               struksId:
 *                 type: integer
 *                 description: The ID of the struk
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the detail-struk-logo
 *     responses:
 *       201:
 *         description: The detail-struk-logo image was created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/detail-struk-logo', roleMiddleware(['Admin', 'Manager']), uploadLogo, Controller.createDetailStrukLogo);

/**
 * @swagger
 * /api/setting-struk/detail-struk-logo/{id}:
 *   put:
 *     summary: Update adetail-struk-logo image by ID
 *     tags: [setting-struk]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The detail-struk-logo image ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               struksId:
 *                 type: integer
 *                 description: The ID of the struk
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: New image file for the detail-struk-logo
 *     responses:
 *       200:
 *         description: The detail-struk-logo image was updated successfully
 *       404:
 *         description: detail-struk-logo image not found
 */
router.put('/detail-struk-logo/:id', roleMiddleware(['Admin', 'Manager']), uploadLogo, Controller.updateDetailStrukLogo);


/**
 * @swagger
 * /api/setting-struk/detail-struk-logo/{id}:
 *   delete:
 *     summary: Menghapus detail-struk-logo (soft delete)
 *     tags: [setting-struk]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID detail-struk-logo yang akan dihapus
 *     responses:
 *       200:
 *         description: detail-struk-logo berhasil dihapus.
 *       404:
 *         description: detail-struk-logo tidak ditemukan.
 *       500:
 *         description: Terjadi kesalahan pada server.
 */
router.delete('/detail-struk-logo/:id', roleMiddleware(['Admin','Manager','Kasir']), Controller.deleteDetailStrukLogo);

module.exports = router;