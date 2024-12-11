// routes/productImageRoutes.js
const express = require('express');
const router = express.Router();
const productImageController = require('../controllers/productImageController');
const roleMiddleware = require('../middleware/roleMiddleware');
const uploadProduct = require('../middleware/uploadImageProduct'); // Middleware for uploading images

/**
 * @swagger
 * /api/products/productImage:
 *   post:
 *     summary: Create a new product image
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productsId:
 *                 type: integer
 *                 description: The ID of the product
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the product
 *     responses:
 *       201:
 *         description: The product image was created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), uploadProduct, productImageController.createProductImage);

/**
 * @swagger
 * /api/products/productImage:
 *   get:
 *     summary: Get all product images
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of product images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The product image ID
 *                   product_id:
 *                     type: integer
 *                     description: The ID of the product
 *                   image:
 *                     type: string
 *                     description: The URL/path of the product image
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), productImageController.getProductImages);

/**
 * @swagger
 * /api/products/productImage/{id}:
 *   get:
 *     summary: Get a product image by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product image ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product image found
 *       404:
 *         description: Product image not found
 */
router.get('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), productImageController.getProductImageById);

/**
 * @swagger
 * /api/products/productImage/{id}:
 *   put:
 *     summary: Update a product image by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product image ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: The ID of the product
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: New image file for the product
 *     responses:
 *       200:
 *         description: The product image was updated successfully
 *       404:
 *         description: Product image not found
 */
router.put('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), uploadProduct, productImageController.updateProductImage);

/**
 * @swagger
 * /api/products/productImage/{id}:
 *   delete:
 *     summary: Delete a product image by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product image ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Product image deleted successfully
 *       404:
 *         description: Product image not found
 */
router.delete('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), productImageController.deleteProductImage);

module.exports = router;
