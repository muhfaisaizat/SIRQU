const express = require("express");
const router = express.Router();
const {
  getDashboardData,
  getDashboardDataMobile,
  getSalesGraphData,
  getTopSellingProducts,
} = require("../controllers/dashboardController");
const roleMiddleware = require("../middleware/roleMiddleware");

/**
 * @swagger
 * /api/dashboard/{outletsId}/mobile:
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
 *                     totalTransaksi:
 *                       type: integer
 *                       description: Total number of orders
 *                     jumlahProduk:
 *                       type: integer
 *                       description: Total number of products
 *                     produkBaru:
 *                       type: integer
 *                       description: Number of new products added in the selected period
 *                     pengingatStok:
 *                       type: integer
 *                       description: Number of products with low stock
 *       404:
 *         description: Outlet not found
 *       500:
 *         description: Server error
 */
router.get(
  "/dashboard/:outletsId/mobile",
  roleMiddleware(['Admin', 'Manager', 'Kasir']),
  getDashboardDataMobile
);

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
 *                     totalTransaksi:
 *                       type: integer
 *                       description: Total number of orders
 *                     jumlahProduk:
 *                       type: integer
 *                       description: Total number of products
 *                     produkBaru:
 *                       type: integer
 *                       description: Number of new products added in the selected period
 *                     pengingatStok:
 *                       type: integer
 *                       description: Number of products with low stock
 *       404:
 *         description: Outlet not found
 *       500:
 *         description: Server error
 */
router.get(
  "/dashboard/:outletsId",
  roleMiddleware(['Admin', 'Manager', 'Kasir']),
  getDashboardData
);

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
router.get(
  "/dashboard/sales-graph/:outletsId",
  roleMiddleware(['Admin', 'Manager', 'Kasir']),
  getSalesGraphData
);
/**
 * @swagger
 * /api/dashboard/top-selling-products/{outletsId}:
 *   get:
 *     summary: Get top selling products for a specific outlet and category
 *     tags: [Dashboard]
 *     parameters:
 *       - in: path
 *         name: outletsId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the outlet
 *       - in: query
 *         name: categoriesId
 *         required: false
 *         schema:
 *           type: integer
 *         description: The ID of the category (optional)
 *     responses:
 *       200:
 *         description: Top selling products for the outlet and category
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
 *                       productName:
 *                         type: string
 *                         description: Name of the product
 *                       productImage:
 *                         type: string
 *                         description: URL of the product image
 *                       totalSold:
 *                         type: integer
 *                         description: Total quantity of the product sold
 *       404:
 *         description: Outlet or Category not found
 *       500:
 *         description: Server error
 */
router.get(
  "/dashboard/top-selling-products/:outletsId",
  roleMiddleware(['Admin', 'Manager', 'Kasir']),
  getTopSellingProducts
);

module.exports = router;
