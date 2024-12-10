const express = require('express');
const { createTransaksi, updateTransaksi, deleteTransaksi, readTransaksi, readTransaksiDate, readTransaksibyid } = require('../controllers/transaksiController');
const transaksiStruk= require('../controllers/viewStrukController');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

/**
 * @swagger
 * /api/transaksi:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transaksi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - outlet_id
 *               - kasir_id
 *               - user_id
 *               - tipe_order
 *               - total
 *             properties:
 *               outlet_id:
 *                 type: integer
 *                 description: ID dari outlet yang terlibat dalam transaksi
 *               kasir_id:
 *                 type: integer
 *                 description: ID dari kasir yang memproses transaksi
 *               user_id:
 *                 type: integer
 *                 description: ID dari user yang memproses transaksi
 *               tipe_order:
 *                 type: string
 *                 description: Tipe order (misalnya "Dine-in", "Takeaway", dll.)
 *               name:
 *                 type: string
 *                 description: Nama pelanggan (default "Pelanggan" jika tidak diisi)
 *               catatan:
 *                 type: string
 *                 description: Catatan tambahan untuk transaksi
 *               tipe_bayar:
 *                 type: string
 *                 description: Tipe pembayaran (misalnya "Cash", "Card", dll.)
 *               ket_bayar:
 *                 type: string
 *                 description: Keterangan pembayaran 
 *               sub_total:
 *                 type: integer
 *                 description: Sub total transaksi sebelum diskon atau pajak
 *               total:
 *                 type: integer
 *                 description: Total akhir transaksi
 *               bayar:
 *                 type: integer
 *                 description: Jumlah yang dibayar oleh pelanggan
 *               kembalian:
 *                 type: integer
 *                 description: Jumlah kembalian jika ada
 *     responses:
 *       201:
 *         description: Transaksi berhasil dibuat
 *       400:
 *         description: Data yang dimasukkan tidak valid
 *       500:
 *         description: Terjadi kesalahan internal
 */
router.post('/',roleMiddleware(['Admin','Manager','Kasir']),createTransaksi);


/**
 * @swagger
 * /api/transaksi/{id}:
 *   put:
 *     summary: Update an existing transaction
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dari transaksi yang akan diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - outlet_id
 *               - kasir_id
 *               - user_id
 *               - tipe_order
 *               - total
 *             properties:
 *               outlet_id:
 *                 type: integer
 *                 description: ID dari outlet yang terlibat dalam transaksi
 *               kasir_id:
 *                 type: integer
 *                 description: ID dari kasir yang memproses transaksi
 *               user_id:
 *                 type: integer
 *                 description: ID dari user yang memproses transaksi
 *               tipe_order:
 *                 type: string
 *                 description: Tipe order (misalnya "Dine-in", "Takeaway", dll.)
 *               name:
 *                 type: string
 *                 description: Nama pelanggan (default "Pelanggan" jika tidak diisi)
 *               catatan:
 *                 type: string
 *                 description: Catatan tambahan untuk transaksi
 *               tipe_bayar:
 *                 type: string
 *                 description: Tipe pembayaran (misalnya "Cash", "Card", dll.)
 *               ket_bayar:
 *                 type: string
 *                 description: Keterangan pembayaran 
 *               sub_total:
 *                 type: integer
 *                 description: Sub total transaksi sebelum diskon atau pajak
 *               total:
 *                 type: integer
 *                 description: Total akhir transaksi
 *               bayar:
 *                 type: integer
 *                 description: Jumlah yang dibayar oleh pelanggan
 *               kembalian:
 *                 type: integer
 *                 description: Jumlah kembalian jika ada
 *     responses:
 *       200:
 *         description: Transaksi berhasil diperbarui
 *       404:
 *         description: Transaksi tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan internal
 */
router.put('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), updateTransaksi);


/**
 * @swagger
 * /api/transaksi/{id}:
 *   delete:
 *     summary: Soft delete transaksi berdasarkan ID
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID transaksi yang akan dihapus
 *     responses:
 *       200:
 *         description: Transaksi berhasil dihapus (soft delete)
 *       404:
 *         description: Transaksi tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan internal
 */
router.delete('/:id', roleMiddleware(['Admin', 'Manager','Kasir']), deleteTransaksi);



/**
 * @swagger
 * /api/transaksi:
 *   get:
 *     summary: Retrieve a list of transactions
 *     tags: [Transaksi]
 *     parameters:
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [active, history]
 *         description: Pilihan status transaksi
 *       - in: query
 *         name: id_kasir
 *         required: true
 *         schema:
 *           type: integer
 *           description: masukan id kasir
 *           example: 0
 *     responses:
 *       200:
 *         description: List of transactions retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), readTransaksiDate);


/**
 * @swagger
 * /api/transaksi/{id}:
 *   get:
 *     summary: Retrieve a transaction by ID
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the transaction
 *     responses:
 *       200:
 *         description: Transaction retrieved successfully
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), readTransaksibyid);

/**
 * @swagger
 * /api/transaksi/view-struk/{id}:
 *   get:
 *     summary: Mendapatkan HTML yang menampilkan informasi struk transaksi
 *     tags:
 *       - Transaksi
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID transaksi yang ingin ditampilkan
 *     responses:
 *       200:
 *         description: HTML struk transaksi berhasil diambil
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: |
 *                 <html>
 *                     <body>
 *                         <div>
 *                             <h1>Nama Toko</h1>
 *                             <p>Alamat Toko</p>
 *                             <p>Kontak Toko</p>
 *                             <div class="order-details">
 *                                 <p>No. Order: #0001</p>
 *                                 <p>Waktu: 12 Feb 2024, 08.30</p>
 *                                 <p>Kasir: Nama Kasir</p>
 *                                 <p>Pembayaran: Tunai</p>
 *                             </div>
 *                             <div class="item-list">
 *                                 <p>1. Nama Barang - Rp 10.000</p>
 *                             </div>
 *                             <div class="total">
 *                                 <p>Sub Total: Rp 30.000</p>
 *                                 <p>Pajak 10%: Rp 3.000</p>
 *                                 <p>Diskon: -Rp 13.000</p>
 *                                 <p>Total: Rp 20.000</p>
 *                                 <p>Bayar: Rp 20.000</p>
 *                                 <p>Kembalian: Rp 0</p>
 *                             </div>
 *                         </div>
 *                     </body>
 *                 </html>
 *       500:
 *         description: Terjadi kesalahan pada server saat mengambil data transaksi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Terjadi kesalahan saat mengambil data struk
 */
router.get('/view-struk/:id', transaksiStruk.getTransaksiStrukMobile);





module.exports = router;
