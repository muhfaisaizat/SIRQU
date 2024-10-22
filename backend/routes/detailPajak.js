const express = require('express');
const { createDetailPajak, updateDetailPajak, deleteDetailPajak } = require('../controllers/detailPajakController');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();



/**
 * @swagger
 * /api/transaksi/detail-pajak:
 *   post:
 *     summary: Create a new detail pajak
 *     tags: [Transaksi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transaksi_id
 *               - pajak_id
 *               - harga
 *             properties:
 *               transaksi_id:
 *                 type: integer
 *                 description: ID dari transaksi yang terkait
 *               pajak_id:
 *                 type: integer
 *                 description: ID dari produk yang dijual
 *               harga:
 *                 type: integer
 *                 description: Jumlah harga pajak
 *     responses:
 *       201:
 *         description: Detail pajak berhasil dibuat
 *       400:
 *         description: Data yang dimasukkan tidak valid
 *       500:
 *         description: Terjadi kesalahan internal
 */
router.post('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), createDetailPajak);

/**
 * @swagger
 * /api/transaksi/detail-pajak/{transaksi_id}/{detailPajak_id}:
 *   put:
 *     summary: Update detail pajak berdasarkan ID transaksi dan ID detail pajak
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: transaksi_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID transaksi
 *       - in: path
 *         name: detailPajak_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID detail pajak
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pajak_id
 *               - harga
 *             properties:
 *               pajak_id:
 *                 type: integer
 *                 description: ID pajak yang diperbarui
 *               harga:
 *                 type: integer
 *                 description: Harga pajak baru
 *     responses:
 *       200:
 *         description: Detail pajak berhasil diperbarui
 *       404:
 *         description: Detail pajak tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan internal
 */
router.put('/:transaksi_id/:detailPajak_id', roleMiddleware(['Admin', 'Manager', 'Kasir']), updateDetailPajak);



/**
 * @swagger
 * /api/transaksi/detail-pajak/{transaksi_id}/{detailPajak_id}:
 *   delete:
 *     summary: Delete detail pajak (soft delete)
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: transaksi_id
 *         required: true
 *         description: ID dari transaksi
 *         schema:
 *           type: integer
 *       - in: path
 *         name: detailPajak_id
 *         required: true
 *         description: ID dari detail pajak yang ingin dihapus
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail pajak berhasil dihapus (soft delete)
 *       404:
 *         description: Detail pajak tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan internal
 */
router.delete('/:transaksi_id/:detailPajak_id', roleMiddleware(['Admin', 'Manager','Kasir']), deleteDetailPajak);



module.exports = router;
