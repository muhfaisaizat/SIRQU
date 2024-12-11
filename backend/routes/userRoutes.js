const express = require('express');
const { createUser,getAllUsers, getUserById, updateUser, deleteUser, updateUserStatus, generateTokenLogin } = require('../controllers/userController');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();
const upload = require('../middleware/uploadImage'); // Middleware upload

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [Admin, Manager, Kasir]
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Email already in use
 *       500:
 *         description: Internal server error
 */
router.post('/', upload, roleMiddleware(['Admin', 'Manajer', 'Kasir']), createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 */
router.get('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [Admin, Manager, Kasir]
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive]
 *               image:
 *                 type: string
 *                 format: binary
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), upload, updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), deleteUser);

/**
 * @swagger
 * /api/users/{id}/status:
 *   put:
 *     summary: Update user status by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Active, Inactive]
 *         description: New status for the user
 *     responses:
 *       200:
 *         description: User status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     status:
 *                       type: string
 *       400:
 *         description: Invalid status value
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id/status', roleMiddleware(['Admin', 'Manager', 'Kasir']), updateUserStatus);

/**
 * @swagger
 * /api/users/{id}/generate-token:
 *   put:
 *     summary: Generate a new login token for a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to generate the token for
 *     responses:
 *       200:
 *         description: User token generated successfully
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
 *                     tokenLogin:
 *                       type: string
 *                     tokenLoginExpires:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id/generate-token', roleMiddleware(['Admin', 'Manager', 'Kasir']), generateTokenLogin);

module.exports = router;
