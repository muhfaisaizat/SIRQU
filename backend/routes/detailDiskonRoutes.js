const express = require('express');
const { createDetailDiskon, updateDetailDiskon, deleteDetailDiskon } = require('../controllers/detailDiskonController');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();



/**
 * @swagger
 * /api/transaksi/detail-diskon:
 *   post:
 *     summary: Create a new detail diskon
 *     tags: [Transaksi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transaksi_id
 *               - diskon_id
 *               - harga
 *             properties:
 *               transaksi_id:
 *                 type: integer
 *                 description: ID dari transaksi yang terkait
 *               diskon_id:
 *                 type: integer
 *                 description: ID dari diskon yang terkait
 *               harga:
 *                 type: integer
 *                 description: Jumlah harga pajak
 *     responses:
 *       201:
 *         description: Detail diskon berhasil dibuat
 *       400:
 *         description: Data yang dimasukkan tidak valid
 *       500:
 *         description: Terjadi kesalahan internal
 */
router.post('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), createDetailDiskon);

/**
 * @swagger
 * /api/transaksi/detail-diskon/{transaksi_id}/{detailDiskon_id}:
 *   put:
 *     summary: Update detail diskon berdasarkan ID transaksi dan ID detail diskon
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: transaksi_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID transaksi
 *       - in: path
 *         name: detailDiskon_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID detail diskon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - diskon_id
 *               - harga
 *             properties:
 *               diskon_id:
 *                 type: integer
 *                 description: ID diskon yang diperbarui
 *               harga:
 *                 type: integer
 *                 description: Harga diskon baru
 *     responses:
 *       200:
 *         description: Detail diskon berhasil diperbarui
 *       404:
 *         description: Detail diskon tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan internal
 */
router.put('/:transaksi_id/:detailDiskon_id', roleMiddleware(['Admin', 'Manager','Kasir']), updateDetailDiskon);


/**
 * @swagger
 * /api/transaksi/detail-diskon/{transaksi_id}/{detailDiskon_id}:
 *   delete:
 *     summary: Delete detail diskon (soft delete)
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: transaksi_id
 *         required: true
 *         description: ID dari transaksi
 *         schema:
 *           type: integer
 *       - in: path
 *         name: detailDiskon_id
 *         required: true
 *         description: ID dari detail diskon yang ingin dihapus
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail diskon berhasil dihapus (soft delete)
 *       404:
 *         description: Detail diskon tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan internal
 */
router.delete('/:transaksi_id/:detailDiskon_id', roleMiddleware(['Admin', 'Manager','Kasir']), deleteDetailDiskon);



module.exports = router;
