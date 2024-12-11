const express = require('express');
const { createPromosi, getAllPromosi, getPromosiById, updatePromosi, deletePromosi } = require('../controllers/promosiController');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();
const upload = require('../middleware/multer'); // Import multer middleware

/**
 * @swagger
 * /api/promosi:
 *   post:
 *     summary: Buat promosi baru
 *     tags: [Promosi]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - namaPromosi
 *               - deskripsi
 *               - tipeAktivasi
 *               - minimalBeli
 *               - kategori
 *               - nilaiKategori
 *               - tanggalMulai
 *               - tanggalBerakhir
 *               - jamMulai
 *               - jamBerakhir
 *               - pilihHari
 *             properties:
 *               namaPromosi:
 *                 type: string
 *                 description: Nama promosi
 *                 example: Promo Gacor
 *               deskripsi:
 *                 type: string
 *                 description: Deskripsi promosi
 *                 example: Promo Gacor Banget Bro
 *               tipeAktivasi:
 *                 type: string
 *                 enum: [Otomatis, Manual]
 *                 description: Tipe aktivasi promosi
 *               minimalBeli:
 *                 type: number
 *                 description: Minimum pembelian untuk promosi
 *               kategori:
 *                 type: string
 *                 enum: [%, Rp]
 *                 description: Kategori nilai promosi (misalnya %, nominal)
 *               nilaiKategori:
 *                 type: number
 *                 description: Nilai kategori promosi
 *               tanggalMulai:
 *                 type: string
 *                 format: date
 *                 description: Tanggal mulai promosi
 *                 example: 2024-11-28
 *               tanggalBerakhir:
 *                 type: string
 *                 format: date
 *                 description: Tanggal berakhir promosi
 *                 example: 2024-11-30
 *               jamMulai:
 *                 type: string
 *                 format: time
 *                 description: Jam mulai promosi
 *                 example: 08:00:00
 *               jamBerakhir:
 *                 type: string
 *                 format: time
 *                 description: Jam berakhir promosi
 *                 example: 22:00:00
 *               pilihHari:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Hari-hari berlakunya promosi
 *                 example: ["Senin", "Rabu", "Jumat"]
 *     responses:
 *       201:
 *         description: Promosi berhasil dibuat
 *       400:
 *         description: Permintaan tidak valid
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.post('/', upload.none(), roleMiddleware(['Admin', 'Manager', 'Kasir']), createPromosi);

/**
 * @swagger
 * /api/promosi:
 *   get:
 *     summary: Get all promosi
 *     tags: [Promosi]
 *     parameters:
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [all, aktif, expired, delete, default]
 *         description: Pilihan status promosi
 *     responses:
 *       200:
 *         description: A list of promosis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idi:
 *                     type: integer
 *                     description: The ID of the promotion
 *                   namaPromosi:
 *                     type: string
 *                     description: The name of the promotion
 *                   deskripsi:
 *                     type: string
 *                     description: The description of the promotion
 *                   tipeAktivasi:
 *                     type: string
 *                     description: The activation type of the promotion
 *                   minimalBeli:
 *                     type: integer
 *                     description: The minimum purchase amount for the promotion
 *                   kategori:
 *                     type: string
 *                     description: The category of the promotion (e.g., %, Rp)
 *                   nilaiKategori:
 *                     type: integer
 *                     description: The value of the category
 *                   jamMulai:
 *                     type: string
 *                     description: The start time of the promotion
 *                   jamBerakhir:
 *                     type: string
 *                     description: The end time of the promotion
 *                   pilihHari:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: The days of the week when the promotion is active
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the promotion was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the promotion was last updated
 *                   deletedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the promotion was deleted (if applicable)
 */
router.get('/', roleMiddleware(['Admin', 'Manager', 'Kasir']),  getAllPromosi);

/**
 * @swagger
 * /api/promosi/{id}:
 *   get:
 *     summary: Get a promotion by ID
 *     tags: [Promosi]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the promotion
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of promosis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idi:
 *                     type: integer
 *                     description: The ID of the promotion
 *                   namaPromosi:
 *                     type: string
 *                     description: The name of the promotion
 *                   deskripsi:
 *                     type: string
 *                     description: The description of the promotion
 *                   tipeAktivasi:
 *                     type: string
 *                     description: The activation type of the promotion
 *                   minimalBeli:
 *                     type: integer
 *                     description: The minimum purchase amount for the promotion
 *                   kategori:
 *                     type: string
 *                     description: The category of the promotion (e.g., %, Rp)
 *                   nilaiKategori:
 *                     type: integer
 *                     description: The value of the category
 *                   jamMulai:
 *                     type: string
 *                     description: The start time of the promotion
 *                   jamBerakhir:
 *                     type: string
 *                     description: The end time of the promotion
 *                   pilihHari:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: The days of the week when the promotion is active
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the promotion was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the promotion was last updated
 *                   deletedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the promotion was deleted (if applicable)
 */
router.get('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), getPromosiById);

/**
 * @swagger
 * /api/promosi/{id}:
 *   put:
 *     summary: Perbarui promosi
 *     tags: [Promosi]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID promosi yang ingin diperbarui
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - namaPromosi
 *               - deskripsi
 *               - tipeAktivasi
 *               - minimalBeli
 *               - kategori
 *               - nilaiKategori
 *               - tanggalMulai
 *               - tanggalBerakhir
 *               - jamMulai
 *               - jamBerakhir
 *               - pilihHari
 *             properties:
 *               namaPromosi:
 *                 type: string
 *                 description: Nama promosi
 *                 example: Promo Gacor Terbaru
 *               deskripsi:
 *                 type: string
 *                 description: Deskripsi promosi
 *                 example: Promo Gacor Terbaru dengan Diskon 50%
 *               tipeAktivasi:
 *                 type: string
 *                 enum: [Otomatis, Manual]
 *                 description: Tipe aktivasi promosi
 *               minimalBeli:
 *                 type: number
 *                 description: Minimum pembelian untuk promosi
 *               kategori:
 *                 type: string
 *                 enum: [%, Rp]
 *                 description: Kategori nilai promosi (misalnya %, nominal)
 *               nilaiKategori:
 *                 type: number
 *                 description: Nilai kategori promosi
 *               tanggalMulai:
 *                 type: string
 *                 format: date
 *                 description: Tanggal mulai promosi
 *                 example: 2024-12-01
 *               tanggalBerakhir:
 *                 type: string
 *                 format: date
 *                 description: Tanggal berakhir promosi
 *                 example: 2024-12-31
 *               jamMulai:
 *                 type: string
 *                 format: time
 *                 description: Jam mulai promosi
 *                 example: 09:00:00
 *               jamBerakhir:
 *                 type: string
 *                 format: time
 *                 description: Jam berakhir promosi
 *                 example: 23:00:00
 *               pilihHari:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Hari-hari berlakunya promosi
 *                 example: ["Senin", "Rabu", "Jumat"]
 *     responses:
 *       200:
 *         description: Promosi berhasil diperbarui
 *       400:
 *         description: Permintaan tidak valid
 *       404:
 *         description: Promosi tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.put('/:id', upload.none(), roleMiddleware(['Admin', 'Manager', 'Kasir']), updatePromosi);

/**
 * @swagger
 * /api/promosi/{id}:
 *   delete:
 *     summary: Hapus Promosi berdasarkan ID
 *     tags: [Promosi]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID Promosi yang ingin dihapus
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Promosi berhasil dihapus
 *       404:
 *         description: Promosi tidak ditemukan
 */
router.delete('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), deletePromosi);

module.exports = router;
