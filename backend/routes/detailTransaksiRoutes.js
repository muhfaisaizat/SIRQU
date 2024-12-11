const express = require('express');
const { createDetailTransaksi, updateDetailTransaksi, deleteDetailTransaksi } = require('../controllers/detailTransaksiController');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();



/**
 * @swagger
 * /api/transaksi/detail:
 *   post:
 *     summary: Create a new detail transaction
 *     tags: [Transaksi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transaksi_id
 *               - product_id
 *               - stok
 *             properties:
 *               transaksi_id:
 *                 type: integer
 *                 description: ID dari transaksi yang terkait
 *               product_id:
 *                 type: integer
 *                 description: ID dari produk yang dijual
 *               stok:
 *                 type: integer
 *                 description: Jumlah stok produk yang dijual
 *     responses:
 *       201:
 *         description: Detail transaksi berhasil dibuat
 *       400:
 *         description: Data yang dimasukkan tidak valid
 *       500:
 *         description: Terjadi kesalahan internal
 */
router.post('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), createDetailTransaksi);


/**
 * @swagger
 * /api/transaksi/detail/{transaksi_id}/{detailTransaksi_id}:
 *   put:
 *     summary: Update detail transaksi berdasarkan ID transaksi dan ID detail transaksi
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: transaksi_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID transaksi
 *       - in: path
 *         name: detailTransaksi_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID detail transaksi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - stok
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: ID produk yang terlibat dalam transaksi
 *               stok:
 *                 type: integer
 *                 description: Jumlah stok yang dibeli
 *     responses:
 *       200:
 *         description: Detail transaksi berhasil diperbarui
 *       404:
 *         description: Detail transaksi tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan internal
 */
router.put('/:transaksi_id/:detailTransaksi_id', roleMiddleware(['Admin', 'Manager', 'Kasir']), updateDetailTransaksi);



/**
 * @swagger
 * /api/transaksi/detail/{transaksi_id}/{detailTransaksi_id}:
 *   delete:
 *     summary: Delete detail transaction (soft delete)
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: transaksi_id
 *         required: true
 *         description: ID dari transaksi
 *         schema:
 *           type: integer
 *       - in: path
 *         name: detailTransaksi_id
 *         required: true
 *         description: ID dari detail transaksi yang ingin dihapus
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail transaksi berhasil dihapus (soft delete)
 *       404:
 *         description: Detail transaksi tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan internal
 */
router.delete('/:transaksi_id/:detailTransaksi_id', roleMiddleware(['Admin', 'Manager', 'Kasir']), deleteDetailTransaksi);


module.exports = router;
