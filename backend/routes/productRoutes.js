const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
// const upload = require('../middleware/uploadImage'); // Middleware upload
const roleMiddleware = require('../middleware/roleMiddleware');



/**
 * @swagger
 * /api/products/stock-habis:
 *   get:
 *     summary: Get Stock Habis by Outlet
 *     description: Retrieve the count of products with limited stock that are almost out of stock, filtered by the outlet ID.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: outletId
 *         required: true
 *         description: The ID of the outlet to filter the stock count
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The total count of products with limited stock that are almost out of stock for the given outlet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     stock_habis:
 *                       type: integer
 *                       description: The count of products with limited stock and stock between 0 to 2 for the given outlet
 *       400:
 *         description: Outlet ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.get('/stock-habis', roleMiddleware(['Admin', 'Manager', 'Kasir']), productController.getStockHabis);



/**
 * @swagger
 * /api/products/menu:
 *   get:
 *     summary: Get menu details with product, category, and outlet information
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [aktif, default]
 *         description: Pilihan status menu
 *     responses:
 *       200:
 *         description: List of products with categories and outlets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product_id:
 *                         type: integer
 *                         description: Product ID
 *                         example: 1
 *                       product_name:
 *                         type: string
 *                         description: Product name
 *                         example: "Product A"
 *                       description:
 *                         type: string
 *                         description: Product description
 *                         example: "A detailed description"
 *                       price:
 *                         type: number
 *                         format: float
 *                         description: Product price
 *                         example: 100.5
 *                       stock:
 *                         type: integer
 *                         description: Stock available
 *                         example: 50
 *                       unlimited_stock:
 *                         type: boolean
 *                         description: Indicates if stock is unlimited
 *                         example: false
 *                       status:
 *                         type: string
 *                         description: Product status
 *                         example: "active"
 *                       product_created_at:
 *                         type: string
 *                         format: date-time
 *                         description: Product creation timestamp
 *                         example: "2024-01-01T00:00:00.000Z"
 *                       category_id:
 *                         type: integer
 *                         description: Category ID
 *                         example: 2
 *                       category_name:
 *                         type: string
 *                         description: Category name
 *                         example: "Category B"
 *                       outlet_id:
 *                         type: integer
 *                         description: Outlet ID
 *                         example: 1
 *                       outlet_name:
 *                         type: string
 *                         description: Outlet name
 *                         example: "Outlet X"
 *       500:
 *         description: Internal server error
 */
router.get('/menu', roleMiddleware(['Admin', 'Manager', 'Kasir']), productController.getProductMenu);

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
router.post('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), productController.createProduct);

// /**
//  * @swagger
//  * /api/products:
//  *   get:
//  *     summary: Dapatkan semua produk
//  *     tags: [Products]
//  *     responses:
//  *       200:
//  *         description: Daftar produk
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   id:
//  *                     type: integer
//  *                     description: ID produk
//  *                   name:
//  *                     type: string
//  *                     description: Nama produk
//  *                   description:
//  *                     type: string
//  *                     description: Deskripsi produk
//  *                   price:
//  *                     type: number
//  *                     description: Harga produk
//  *                   stock:
//  *                     type: integer
//  *                     description: Jumlah produk dalam stok
//  *                   unlimited_stock:
//  *                     type: boolean
//  *                     description: Apakah produk memiliki stok tak terbatas
//  *                   createdAt:
//  *                     type: string
//  *                     format: date-time
//  *                     description: Waktu ketika produk dibuat
//  *                   updatedAt:
//  *                     type: string
//  *                     format: date-time
//  *                     description: Waktu ketika produk terakhir diperbarui
//  *                   deletedAt:
//  *                     type: string
//  *                     format: date-time
//  *                     description: Waktu ketika produk dihapus (jika ada)
//  */
// router.get('/', productController.getAllProducts);

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
router.get('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), productController.getProductById);

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
router.put('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), productController.updateProduct);


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
router.delete('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), productController.deleteProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get Product Menu
 *     description: Retrieve a list of products with their details and associated categories and outlets.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products with categories and outlets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_product:
 *                     type: integer
 *                     description: The product ID
 *                   nama_product:
 *                     type: string
 *                     description: The name of the product
 *                   deskripsi_product:
 *                     type: string
 *                     description: Description of the product
 *                   stok_product:
 *                     type: integer
 *                     description: Stock quantity of the product
 *                   unlimited_stock:
 *                     type: boolean
 *                     description: Indicates if the product has unlimited stock
 *                   harga_product:
 *                     type: number
 *                     format: float
 *                     description: Price of the product
 *                   id_category:
 *                     type: integer
 *                     description: The ID of the category associated with the product
 *                   nama_category:
 *                     type: string
 *                     description: The name of the category associated with the product
 *                   id_outlet:
 *                     type: integer
 *                     description: The ID of the outlet associated with the product
 *                   nama_outlet:
 *                     type: string
 *                     description: The name of the outlet
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), productController.getProducts);

/**
 * @swagger
 * /api/products/{id}/status:
 *   put:
 *     summary: Update product status, stock, and unlimited stock by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to update
 *       - in: query
 *         name: stock
 *         schema:
 *           type: integer
 *         description: New stock value for the product (ignored if unlimited_stock is true)
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Produk Aktif, Produk Tidak Aktif]
 *         description: New status for the product
 *       - in: query
 *         name: unlimited_stock
 *         required: true
 *         schema:
 *           type: boolean
 *           enum: [true, false]
 *           description: Indicates whether the stock is unlimited (true) or limited (false)
 *     responses:
 *       200:
 *         description: Product status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     stock:
 *                       type: integer
 *                     status:
 *                       type: string
 *                     unlimited_stock:
 *                       type: boolean
 *       400:
 *         description: Invalid status, stock, or unlimited_stock value
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

router.put('/:id/status', roleMiddleware(['Admin', 'Manager', 'Kasir']), productController.updateProductStatus);







module.exports = router;
