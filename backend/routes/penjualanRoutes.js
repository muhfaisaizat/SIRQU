const express = require('express');
const { readPenjualan, getCardPenjualan, readPenjualanSummary } = require('../controllers/penjualanController.js');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

/**
 * @swagger
 * /api/penjualan:
 *   get:
 *     summary: Retrieve a list of penjualan (transactions)
 *     tags: [Penjualan]
 *     parameters:
 *       - in: query
 *         name: id_outlet
 *         required: true
 *         schema:
 *           type: integer
 *           description: Masukkan id outlet
 *           example: 1
 *       - in: query
 *         name: start_date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           description: Filter transaksi mulai dari tanggal ini (YYYY-MM-DD)
 *           example: "2024-12-2"
 *       - in: query
 *         name: end_date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           description: Filter transaksi sampai dengan tanggal ini (YYYY-MM-DD)
 *           example: "2024-12-4"
 *     responses:
 *       200:
 *         description: List of penjualan retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), readPenjualan);

// /**
//  * @swagger
//  * /api/penjualan/outlet/{outletId}:
//  *   get:
//  *     summary: Get card penjualan data by Outlet ID
//  *     tags: [Penjualan]
//  *     parameters:
//  *       - name: outletId
//  *         in: path
//  *         required: true
//  *         description: The ID of the outlet to retrieve the penjualan data for
//  *         schema:
//  *           type: integer
//  *       - in: query
//  *         name: start_date
//  *         required: false
//  *         schema:
//  *           type: string
//  *           format: date
//  *           description: Filter transaksi mulai dari tanggal ini (YYYY-MM-DD)
//  *           example: "2024-12-2"
//  *       - in: query
//  *         name: end_date
//  *         required: false
//  *         schema:
//  *           type: string
//  *           format: date
//  *           description: Filter transaksi sampai dengan tanggal ini (YYYY-MM-DD)
//  *           example: "2024-12-4"
//  *     responses:
//  *       200:
//  *         description: The penjualan card data for the specified outlet
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 Total_Penjualan:
//  *                   type: number
//  *                 Produk_Terjual:
//  *                   type: number
//  *                 Pembayaran_Paling_Sering:
//  *                   type: string
//  *                 Product_Terlaris:
//  *                   type: number
//  *                 Banding_Persentase_Total_Penjualan_Kemarin:
//  *                   type: number
//  *                 Banding_Persentase_Produk_Terjual_Kemarin:
//  *                   type: number
//  *                 Banding_Persentase_Pembayaran_Paling_Sering_Kemarin:
//  *                   type: number
//  *                 Banding_Persentase_Produk_Terlaris_Kemarin:
//  *                   type: number
//  *       404:
//  *         description: No data found for the specified outlet ID
//  *       400:
//  *         description: Invalid request
//  */
// router.get('/outlet/:outletId', roleMiddleware(['Admin', 'Manager']), getCardPenjualan);

/**
 * @swagger
 * /api/penjualan/outlet/{outletId}:
 *   get:
 *     summary: Get card penjualan data by Outlet ID
 *     tags: [Penjualan]
 *     parameters:
 *       - name: outletId
 *         in: path
 *         required: true
 *         description: The ID of the outlet to retrieve the penjualan data for
 *         schema:
 *           type: integer
 *       - in: query
 *         name: start_date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           description: Filter transaksi mulai dari tanggal ini (YYYY-MM-DD)
 *           example: "2024-12-2"
 *       - in: query
 *         name: end_date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           description: Filter transaksi sampai dengan tanggal ini (YYYY-MM-DD)
 *           example: "2024-12-4"
 *     responses:
 *       200:
 *         description: The penjualan card data for the specified outlet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Total_Penjualan:
 *                   type: number
 *                 Produk_Terjual:
 *                   type: number
 *                 Pembayaran_Paling_Sering:
 *                   type: string
 *                 Produk_Terlaris:
 *                   type: string
 *                 Banding_Persentase_Total_Penjualan_Kemarin:
 *                   type: number
 *                 Banding_Persentase_Produk_Terjual_Kemarin:
 *                   type: number
 *                 Banding_Persentase_Pembayaran_Paling_Sering_Kemarin:
 *                   type: number
 *                 Banding_Persentase_Produk_Terlaris_Kemarin:
 *                   type: number
 *       404:
 *         description: No data found for the specified outlet ID
 *       400:
 *         description: Invalid request
 */
router.get('/outlet/:outletId', roleMiddleware(['Admin', 'Manager', 'Kasir']), getCardPenjualan);


module.exports = router;
