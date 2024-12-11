const express = require('express');
const router = express.Router();
const categoriesBelanjaController = require('../controllers/categoryBelanjaController');
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * /api/categoriesbelanjas:
 *   post:
 *     summary: Create a new categories belanja
 *     tags: [CategoriesBelanja]
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
 *               name:
 *                 type: string
 *                 description: The name of the category
 *     responses:
 *       201:
 *         description: The categories belanja was created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), categoriesBelanjaController.createCategoriesBelanja);

/**
 * @swagger
 * /api/categoriesbelanjas/outlet/{id}:
 *   get:
 *     summary: Get all categories belanja
 *     tags: [CategoriesBelanja]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the categories belanja to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of categories belanja
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
 *                   name:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *                   deletedAt:
 *                     type: string
 */
router.get('/outlet/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), categoriesBelanjaController.getCategoriesByOutletId);

/**
 * @swagger
 * /api/categoriesbelanjas/{id}:
 *   get:
 *     summary: Get a categories belanja by ID
 *     tags: [CategoriesBelanja]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the categories belanja to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The categories belanja details
 *       404:
 *         description: Categories belanja not found
 */
router.get('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), categoriesBelanjaController.getCategoriesBelanjaById);

/**
 * @swagger
 * /api/categoriesbelanjas/{id}:
 *   put:
 *     summary: Update a categories belanja by ID
 *     tags: [CategoriesBelanja]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the categories belanja to update
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
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The categories belanja was updated successfully
 *       404:
 *         description: Categories belanja not found
 *       400:
 *         description: Invalid request
 */
router.put('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), categoriesBelanjaController.updateCategoriesBelanja);

/**
 * @swagger
 * /api/categoriesbelanjas/{id}:
 *   delete:
 *     summary: Delete a categories belanja by ID
 *     tags: [CategoriesBelanja]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the categories belanja to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Categories belanja deleted successfully
 *       404:
 *         description: Categories belanja not found
 */
router.delete('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), categoriesBelanjaController.deleteCategoriesBelanja);

module.exports = router;
