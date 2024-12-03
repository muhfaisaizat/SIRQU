const express = require('express');
const { readPenjualan } = require('../controllers/penjualanController.js');
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

module.exports = router;
