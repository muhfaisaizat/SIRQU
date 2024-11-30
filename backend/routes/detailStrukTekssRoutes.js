const express = require('express');
const Controller = require('../controllers/detailStrukTekssController');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();



/**
 * @swagger
 *  /api/setting-struk/detail-struk-text:
 *    post:
 *      summary: Membuat detail struk teks baru
 *      tags: [setting-struk]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                struksId:
 *                  type: integer
 *                  description: ID dari struk yang terkait.
 *                  example: 1
 *                text:
 *                  type: string
 *                  description: Teks untuk detail struk.
 *                  example: "Logo Toko"
 *      responses:
 *        201:
 *          description: Detail struk teks berhasil dibuat.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Detail struk teks berhasil dibuat."
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        example: 1
 *                      struksId:
 *                        type: integer
 *                        example: 1
 *                      text:
 *                        type: string
 *                        example: "Logo Toko"
 *                      createdAt:
 *                        type: string
 *                        format: date-time
 *                        example: "2024-11-29T12:34:56.789Z"
 *                      updatedAt:
 *                        type: string
 *                        format: date-time
 *                        example: "2024-11-29T12:34:56.789Z"
 *        400:
 *          description: Data tidak lengkap, `struksId` dan `text` harus diisi.
 *        500:
 *          description: Terjadi kesalahan pada server.
 */
router.post('/detail-struk-text', roleMiddleware(['Admin','Manager','Kasir']), Controller.createDetailStrukTeks);


/**
 * @swagger
 * /api/setting-struk/detail-struk-text/{id}:
 *   put:
 *     summary: Mengupdate detail struk teks berdasarkan ID
 *     tags: [setting-struk]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID detailStrukTeks yang akan diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               struksId:
 *                 type: integer
 *                 description: ID dari struk yang terkait.
 *                 example: 1
 *               text:
 *                 type: string
 *                 description: Teks baru untuk detail struk.
 *                 example: "Logo Toko Baru"
 *     responses:
 *       200:
 *         description: Detail struk teks berhasil diperbarui.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "DetailStrukTeks berhasil diperbarui."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     struksId:
 *                       type: integer
 *                       example: 1
 *                     text:
 *                       type: string
 *                       example: "Logo Toko Baru"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-29T12:34:56.789Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-29T12:34:56.789Z"
 *       404:
 *         description: DetailStrukTeks tidak ditemukan.
 *       500:
 *         description: Terjadi kesalahan pada server.
 */
router.put('/detail-struk-text/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), Controller.updateDetailStrukTeks);


/**
 * @swagger
 * /api/setting-struk/detail-struk-text/{id}:
 *   delete:
 *     summary: Soft delete transaksi berdasarkan ID
 *     tags: [setting-struk]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID detailStrukTeks yang akan dihapus
 *     responses:
 *       200:
 *         description: detailStrukTeks berhasil dihapus (soft delete)
 *       404:
 *         description: detailStrukTeks tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan internal
 */
router.delete('/detail-struk-text/:id', roleMiddleware(['Admin', 'Manager','Kasir']),Controller.deleteDetailStrukTeks);

module.exports = router;
