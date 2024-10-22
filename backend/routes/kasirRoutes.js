const express = require('express');
const router = express.Router();
const kasirController = require('../controllers/kasirController');
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * /api/kasir:
 *   get:
 *     summary: Dapatkan semua data kasir
 *     tags: [Kasir]
 *     responses:
 *       200:
 *         description: Daftar data kasir
 *         content:
 *           application/json:          
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Kasir'
 */
router.get('/', roleMiddleware(['Admin', 'Manager']), kasirController.getAllKasir);

/**
 * @swagger
 * /api/kasir/{id}:
 *   get:
 *     summary: Dapatkan data kasir berdasarkan ID
 *     tags: [Kasir]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID kasir yang ingin diambil
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail kasir
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Kasir'
 *       404:
 *         description: Kasir tidak ditemukan
 */
router.get('/:id', roleMiddleware(['Admin', 'Manager']), kasirController.getKasirById);

/**
 * @swagger
 * /api/kasir:
 *   post:
 *     summary: Buat data kasir baru
 *     tags: [Kasir]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               outlet_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               uangModal:
 *                 type: number
 *               waktuBuka:
 *                 type: string
 *                 format: date-time
 *               waktuTutup:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Data kasir berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Kasir'
 */
router.post('/', roleMiddleware(['Admin', 'Manager']), kasirController.createKasir);

/**
 * @swagger
 * /api/kasir/{id}:
 *   put:
 *     summary: Perbarui data kasir berdasarkan ID
 *     tags: [Kasir]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID kasir yang ingin diperbarui
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               waktuTutup:
 *                 type: string
 *                 format: date-time
 *               itemTerjual:
 *                 type: integer
 *               totalKotor:
 *                 type: number
 *               totalBersih:
 *                 type: number
 *     responses:
 *       200:
 *         description: Data kasir berhasil diperbarui
 *       404:
 *         description: Kasir tidak ditemukan
 */
router.put('/:id', roleMiddleware(['Admin', 'Manager']), kasirController.updateKasir);

module.exports = router;
