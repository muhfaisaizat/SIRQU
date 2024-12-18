const express = require('express');
const router = express.Router();
const rekeningController = require('../controllers/rekeningController');
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * /api/rekening:
 *   post:
 *     summary: Tambah data rekening
 *     tags: [Rekening]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               namaPemilik:
 *                 type: string
 *               namaBank:
 *                 type: string
 *               nomerRekening:
 *                 type: string
 *             required:
 *               - namaPemilik
 *               - namaBank
 *               - nomerRekening
 *     responses:
 *       201:
 *         description: Data rekening berhasil ditambahkan
 *       400:
 *         description: Validasi input gagal
 *       500:
 *         description: Terjadi kesalahan server
 */
router.post('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), rekeningController.createRekening);

/**
 * @swagger
 * /api/rekening:
 *   get:
 *     summary: Dapatkan semua data rekening
 *     tags: [Rekening]
 *     responses:
 *       200:
 *         description: Data rekening berhasil diambil
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), rekeningController.getAllRekenings);

/**
 * @swagger
 * /api/rekening/{id}:
 *   get:
 *     summary: Dapatkan data rekening berdasarkan ID
 *     tags: [Rekening]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID rekening
 *     responses:
 *       200:
 *         description: Data rekening berhasil diambil
 *       404:
 *         description: Data rekening tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), rekeningController.getRekeningById);

/**
 * @swagger
 * /api/rekening/{id}:
 *   put:
 *     summary: Update rekening by ID
 *     tags: [Rekening]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the rekening to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               namaPemilik:
 *                 type: string
 *                 example: 'John Doe'
 *               namaBank:
 *                 type: string
 *                 example: 'Bank ABC'
 *               nomerRekening:
 *                 type: string
 *                 example: '123456789'
 *     responses:
 *       200:
 *         description: Rekening was updated successfully
 *       404:
 *         description: Rekening not found
 *       400:
 *         description: Invalid request
 */
router.put('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), rekeningController.updateRekening);

/**
 * @swagger
 * /api/rekening/{id}:
 *   delete:
 *     summary: Delete a rekening by ID (soft delete)
 *     tags: [Rekening]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the rekening to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Rekening deleted successfully
 *       404:
 *         description: Rekening not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), rekeningController.deleteRekening);

module.exports = router;
