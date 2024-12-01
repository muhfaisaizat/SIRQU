const express = require('express');
const Controller = require('../controllers/pajaksController');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

/**
 * @swagger
 * /api/pajaks:
 *   post:
 *     summary: Membuat Pajaks baru. Membuat dua data Pajaks baru (Pajak dan Biaya Operasional).
 *     tags: [Pajaks]
 *     responses:
 *       201:
 *         description: Pajaks berhasil dibuat.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pajaks berhasil dibuat.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Pajak
 *                       nilaiPajak:
 *                         type: string
 *                         example: null
 *                       status:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-01T10:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-01T10:00:00.000Z"
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
router.post('/',roleMiddleware(['Admin', 'Manager', 'Kasir']), Controller.createPajak );


/**
 * @swagger
 * /api/pajaks:
 *   get:
 *     summary: Mengambil semua data Pajaks
 *     tags: [Pajaks]
 *     responses:
 *       200:
 *         description: Data Pajaks berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data Pajaks berhasil diambil.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Pajak
 *                       nilaiPajak:
 *                         type: string
 *                         example: null
 *                       status:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-01T10:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-01T10:00:00.000Z"
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
router.get('/',roleMiddleware(['Admin', 'Manager', 'Kasir']), Controller.getPajak );

/**
 * @swagger
 * /api/pajaks/nilai-pajak/{id}:
 *   put:
 *     summary: Memperbarui data Pajak berdasarkan ID
 *     tags: [Pajaks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID pajak yang akan diperbarui
 *       - in: query
 *         name: nilaiPajak
 *         required: true
 *         schema:
 *           type: string
 *         description: nilai pajak tidak boleh kosong , jika ingin null maka ketikan 'null'
 *         example: 10%
 *     responses:
 *       200:
 *         description: Pajak berhasil diperbarui.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pajak berhasil diperbarui.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Pajak Baru
 *                     nilaiPajak:
 *                       type: string
 *                       example: 10%
 *                     status:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-01T10:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-01T12:00:00.000Z"
 *       404:
 *         description: Pajak dengan ID yang diberikan tidak ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pajak dengan ID 1 tidak ditemukan.
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
router.put('/nilai-pajak/:id',roleMiddleware(['Admin', 'Manager', 'Kasir']), Controller.updateNilaiPajak );

/**
 * @swagger
 * /api/pajaks/status/{id}:
 *   put:
 *     summary: Memperbarui data Pajak berdasarkan ID
 *     tags: [Pajaks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID pajak yang akan diperbarui
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: boolean
 *         description: Status baru untuk Struk (pilih dari `false` atau `true`)
 *         example: false
 *     responses:
 *       200:
 *         description: Pajak berhasil diperbarui.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pajak berhasil diperbarui.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Pajak Baru
 *                     nilaiPajak:
 *                       type: string
 *                       example: 10%
 *                     status:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-01T10:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-01T12:00:00.000Z"
 *       404:
 *         description: Pajak dengan ID yang diberikan tidak ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pajak dengan ID 1 tidak ditemukan.
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
router.put('/status/:id',roleMiddleware(['Admin', 'Manager', 'Kasir']), Controller.updatePajakStatus );


module.exports = router;