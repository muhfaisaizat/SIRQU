const express = require('express');
const Controller = require('../controllers/detailStrukMediasController');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();



/**
 * @swagger
 * /api/setting-struk/detail-struk-media:
 *   post:
 *     summary: Membuat DetailStrukMedia baru
 *     tags: [setting-struk]
 *     parameters:
 *       - in: query
 *         name: struksId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Struk yang terkait
 *         example: 1
 *       - in: query
 *         name: kategori
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - FB
 *             - IG
 *             - TW
 *         description: Kategori media (pilih dari FB, IG, atau TW)
 *         example: FB
 *       - in: query
 *         name: nameMedia
 *         required: true
 *         schema:
 *           type: string
 *         description: Nama media
 *         example: Facebook Ads
 *     responses:
 *       201:
 *         description: Detail Struk Media berhasil dibuat.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Detail Struk Media berhasil dibuat.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     struksId:
 *                       type: integer
 *                       example: 1
 *                     kategori:
 *                       type: string
 *                       example: FB
 *                     nameMedia:
 *                       type: string
 *                       example: Facebook Ads
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-11-29T12:34:56Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-11-29T12:34:56Z
 *       400:
 *         description: Data tidak lengkap.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data tidak lengkap. Semua field wajib diisi.
 *       500:
 *         description: Terjadi kesalahan pada server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Terjadi kesalahan pada server.
 */
router.post('/detail-struk-media', roleMiddleware(['Admin', 'Manager', 'Kasir']), Controller.createDetailStrukMedia);





/**
 * @swagger
 * /api/setting-struk/detail-struk-media/{id}:
 *   put:
 *     summary: Membuat DetailStrukMedia baru
 *     tags: [setting-struk]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID detailStrukMedia yang akan diperbarui
 *       - in: query
 *         name: struksId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Struk yang terkait
 *         example: 1
 *       - in: query
 *         name: kategori
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - FB
 *             - IG
 *             - TW
 *         description: Kategori media (pilih dari FB, IG, atau TW)
 *         example: FB
 *       - in: query
 *         name: nameMedia
 *         required: true
 *         schema:
 *           type: string
 *         description: Nama media
 *         example: Facebook Ads
 *     responses:
 *       201:
 *         description: Detail Struk Media berhasil dibuat.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Detail Struk Media berhasil dibuat.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     struksId:
 *                       type: integer
 *                       example: 1
 *                     kategori:
 *                       type: string
 *                       example: FB
 *                     nameMedia:
 *                       type: string
 *                       example: Facebook Ads
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-11-29T12:34:56Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-11-29T12:34:56Z
 *       400:
 *         description: Data tidak lengkap.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data tidak lengkap. Semua field wajib diisi.
 *       500:
 *         description: Terjadi kesalahan pada server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Terjadi kesalahan pada server.
 */
router.put('/detail-struk-media/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), Controller.updateDetailStrukMedia);





/**
 * @swagger
 * /api/setting-struk/detail-struk-media/{id}:
 *   delete:
 *     summary: Menghapus DetailStrukMedia (soft delete)
 *     tags: [setting-struk]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID DetailStrukMedia yang akan dihapus
 *     responses:
 *       200:
 *         description: Detail Struk Media berhasil dihapus.
 *       404:
 *         description: Detail Struk Media tidak ditemukan.
 *       500:
 *         description: Terjadi kesalahan pada server.
 */
router.delete('/detail-struk-media/:id', roleMiddleware(['Admin','Manager','Kasir']), Controller.deleteDetailStrukMedia);

module.exports = router;