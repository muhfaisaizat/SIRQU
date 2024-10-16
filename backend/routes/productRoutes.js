const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API untuk mengelola produk
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Buat produk baru
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nama produk
 *                 example: iPhone 13
 *               description:
 *                 type: string
 *                 description: Deskripsi produk
 *                 example: Smartphone terbaru dari Apple
 *               price:
 *                 type: number
 *                 description: Harga produk
 *                 example: 999.99
 *               stock:
 *                 type: integer
 *                 description: Jumlah produk dalam stok
 *                 example: 100
 *               unlimited_stock:
 *                 type: boolean
 *                 description: Apakah produk memiliki stok tak terbatas
 *                 example: false
 *     responses:
 *       201:
 *         description: Produk berhasil dibuat
 *       400:
 *         description: Permintaan tidak valid
 */
router.post('/', productController.createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Dapatkan semua produk
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Daftar produk
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID produk
 *                   name:
 *                     type: string
 *                     description: Nama produk
 *                   description:
 *                     type: string
 *                     description: Deskripsi produk
 *                   price:
 *                     type: number
 *                     description: Harga produk
 *                   stock:
 *                     type: integer
 *                     description: Jumlah produk dalam stok
 *                   unlimited_stock:
 *                     type: boolean
 *                     description: Apakah produk memiliki stok tak terbatas
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Waktu ketika produk dibuat
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Waktu ketika produk terakhir diperbarui
 *                   deletedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Waktu ketika produk dihapus (jika ada)
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Dapatkan produk berdasarkan ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID produk yang ingin diambil
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail produk
 *       404:
 *         description: Produk tidak ditemukan
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Perbarui produk berdasarkan ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID produk yang ingin diperbarui
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               unlimited_stock:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Produk berhasil diperbarui
 *       404:
 *         description: Produk tidak ditemukan
 *       400:
 *         description: Permintaan tidak valid
 */
router.put('/:id', productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Hapus produk berdasarkan ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID produk yang ingin dihapus
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produk berhasil dihapus
 *       404:
 *         description: Produk tidak ditemukan
 */
router.delete('/:id', productController.deleteProduct);

module.exports = router;
