const express = require('express');
const router = express.Router();
const belanjaController = require('../controllers/belanjaController');
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * /api/belanja:
 *   post:
 *     summary: Create a new belanja
 *     tags: [Belanja]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               outletsId:
 *                 type: integer
 *                 description: The ID of the outlet
 *               categoriesBelanjasId:
 *                 type: integer
 *                 description: The ID of the category
 *               namaKegiatan:
 *                 type: string
 *                 description: The name of the activity
 *               deskripsi:
 *                 type: string
 *                 description: Description of the activity
 *               totalBelanja:
 *                 type: number
 *                 format: float
 *                 description: Total amount spent
 *               waktu:
 *                 type: string
 *                 format: time
 *                 example: 08:00
 *                 description: Time of the activity
 *               tanggal:
 *                 type: string
 *                 format: date
 *                 description: Date of the activity
 *     responses:   
 *       201:
 *         description: The belanja was created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), belanjaController.createBelanja);

/**
 * @swagger
 * /api/belanja:
 *   get:
 *     summary: Get all belanja
 *     tags: [Belanja]
 *     responses:
 *       200:
 *         description: A list of belanja
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   outletsId:
 *                     type: integer
 *                   categoriesId:
 *                     type: integer
 *                   namaKegiatan:
 *                     type: string
 *                   deskripsi:
 *                     type: string
 *                   totalBelanja:
 *                     type: number
 *                   waktu:
 *                     type: string
 *                   tanggal:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *                   deletedAt:
 *                     type: string
 */
router.get('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), belanjaController.getAllBelanja);

/**
 * @swagger
 * /api/belanja/{id}:
 *   get:
 *     summary: Get a belanja by ID
 *     tags: [Belanja]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the belanja to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The belanja details
 *       404:
 *         description: Belanja not found
 */
router.get('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), belanjaController.getBelanjaById);

/**
 * @swagger
 * /api/belanja/{id}:
 *   put:
 *     summary: Update a belanja by ID
 *     tags: [Belanja]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the belanja to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               outletsId:
 *                 type: integer
 *               categoriesBelanjasId:
 *                 type: integer
 *               namaKegiatan:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *               totalBelanja:
 *                 type: number
 *               waktu:
 *                 type: string
 *               tanggal:
 *                 type: string
 *     responses:
 *       200:
 *         description: The belanja was updated successfully
 *       404:
 *         description: Belanja not found
 *       400:
 *         description: Invalid request
 */
router.put('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), belanjaController.updateBelanja);

/**
 * @swagger
 * /api/belanja/{id}:
 *   delete:
 *     summary: Delete a belanja by ID
 *     tags: [Belanja]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the belanja to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Belanja deleted successfully
 *       404:
 *         description: Belanja not found
 */
router.delete('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), belanjaController.deleteBelanja);

/**
 * @swagger
 * /api/belanja/outlet/{outletId}:
 *   get:
 *     summary: Get card belanja data by Outlet ID
 *     tags: [Belanja]
 *     parameters:
 *       - name: outletId
 *         in: path
 *         required: true
 *         description: The ID of the outlet to retrieve the belanja data for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The belanja card data for the specified outlet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Total_Belanja_Bulan_Ini:
 *                   type: number
 *                 Total_Belanja_Tahun_Ini:
 *                   type: number
 *                 Pengeluaran_Rata_Rata_Bulan_Ini:
 *                   type: number
 *                 Total_Belanja_Bulan_Lalu:
 *                   type: number
 *                 Total_Belanja_Tahun_Lalu:
 *                   type: number
 *                 Pengeluaran_Rata_Rata_Bulan_Lalu:
 *                   type: number
 *                 Banding_Persentase_Total_Belanja_Tahun_Ini:
 *                   type: string
 *                 Banding_Persentase_Total_Belanja_Bulan_Ini:
 *                   type: string
 *                 Banding_Persentase_Pengeluaran_Rata_Rata_Bulan_Ini:
 *                   type: string
 *       404:
 *         description: No data found for the specified outlet ID
 *       400:
 *         description: Invalid request
 */
router.get('/outlet/:outletId', roleMiddleware(['Admin', 'Manager', 'Kasir']), belanjaController.getCardBelanja);


module.exports = router;
