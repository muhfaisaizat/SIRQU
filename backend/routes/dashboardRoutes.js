const express = require('express');
const router = express.Router();
const { getDashboardData, getSalesGraphData } = require('../controllers/dashboardController');
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * /api/dashboard/{outletsId}:
 *   get:
 *     summary: Get dashboard data for a specific outlet
 *     tags: [Dashboard]
 *     parameters:
 *       - in: path
 *         name: outletsId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the outlet
 *       - in: query
 *         name: periode
 *         required: false
 *         schema:
 *           type: string
 *           enum: [hari-ini, minggu-ini, bulan-ini, tahun-ini]
 *         description: Filter data based on the selected time period
 *     responses:
 *       200:
 *         description: Dashboard data for the outlet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Status of the request
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalPendapatan:
 *                       type: number
 *                       format: float
 *                       description: Total revenue of the outlet
 *                     jumlahOrder:
 *                       type: integer
 *                       description: Total number of orders
 *                     jumlahProduk:
 *                       type: integer
 *                       description: Total number of products
 *                     pengingatStok:
 *                       type: integer
 *                       description: Number of products with low stock
 *       404:
 *         description: Outlet not found
 *       500:
 *         description: Server error
 */
router.get('/dashboard/:outletsId', roleMiddleware(['Admin', 'Manager']), getDashboardData);

/**
 * @swagger
 * /api/dashboard/sales-graph/{outletsId}:
 *   get:
 *     summary: Get monthly sales data for a specific outlet
 *     tags: [Dashboard]
 *     parameters:
 *       - in: path
 *         name: outletsId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the outlet
 *     responses:
 *       200:
 *         description: Monthly sales data for the outlet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Status of the request
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       bulan:
 *                         type: integer
 *                         description: Month of the year (1-12)
 *                       totalPendapatan:
 *                         type: number
 *                         format: float
 *                         description: Total revenue for the month
 *       404:
 *         description: Outlet not found
 *       500:
 *         description: Server error
 */
router.get('/dashboard/sales-graph/:outletsId', roleMiddleware(['Admin', 'Manager']), getSalesGraphData);

module.exports = router;