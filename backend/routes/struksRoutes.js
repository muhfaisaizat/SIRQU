const express = require('express');
const Controller = require('../controllers/struksController');
const ControllerViewStruk = require('../controllers/viewStrukController');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

/**
 * @swagger
 * /api/setting-struk:
 *   post:
 *     summary: Membuat beberapa Struk sekaligus, Tidak memerlukan input tambahan (data diinisialisasi otomatis)
 *     tags: [setting-struk]
 *     requestBody:
 *       description: Tidak memerlukan input tambahan (data diinisialisasi otomatis)
 *       required: false
 *     responses:
 *       201:
 *         description: Struks berhasil dibuat.
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
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       status:
 *                         type: string
 *       500:
 *         description: Terjadi kesalahan pada server.
 */
router.post('/',roleMiddleware(['Admin', 'Manager', 'Kasir']), Controller.createStruk );

/**
 * @swagger
 * /api/setting-struk/status/{id}:
 *   put:
 *     summary: Memperbarui status Struk berdasarkan ID
 *     tags: [setting-struk]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Struk yang akan diperbarui
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - false
 *             - true
 *         description: Status baru untuk Struk (pilih dari `false` atau `true`)
 *         example: false
 *     responses:
 *       200:
 *         description: Struk berhasil diperbarui.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Struk berhasil diperbarui.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     status:
 *                       type: string
 *                       example: true
 *       400:
 *         description: Data tidak lengkap atau tidak valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data tidak lengkap atau tidak valid.
 *       404:
 *         description: Struk tidak ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Struk tidak ditemukan.
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
router.put('/status/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), Controller.updateStruk);

/**
 * @swagger
 * /api/setting-struk:
 *   get:
 *     summary: Mendapatkan daftar Struks beserta detail terkait (teks, media, logo)
 *     tags: [setting-struk]
 *     responses:
 *       200:
 *         description: Data Struks berhasil diambil beserta detail terkait.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Data struk berhasil diambil
 *                 data:
 *                   type: object
 *                   properties:
 *                     struks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           status:
 *                             type: string
 *                     detailStrukTeks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           detailStrukTeks_Id:
 *                             type: integer
 *                           struks_Id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           text:
 *                             type: string
 *                     detailStrukMedia:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           detailStrukMedia_Id:
 *                             type: integer
 *                           struks_Id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           kategori:
 *                             type: string
 *                           nameMedia:
 *                             type: string
 *                     detailStrukLogo:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           detailStrukLogo_Id:
 *                             type: integer
 *                           struks_Id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           logo:
 *                             type: string
 *       500:
 *         description: Terjadi kesalahan pada server.
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
 *                   example: Terjadi kesalahan saat mengambil data struk
 */
router.get('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), Controller.getStruk);

/**
 * @swagger
 * /api/setting-struk/view-struk:
 *   get:
 *     summary: Mendapatkan HTML yang menampilkan informasi CoffeShop
 *     tags: [setting-struk]
 *     responses:
 *       200:
 *         description: HTML berhasil diambil.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: |
 *                 <html>
 *                     <!-- body -->
 *                 </html>
 *       500:
 *         description: Terjadi kesalahan pada server.
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
 *                   example: Terjadi kesalahan saat mengambil data struk
 */
router.get('/view-struk', ControllerViewStruk.getViewStruk);


module.exports = router;