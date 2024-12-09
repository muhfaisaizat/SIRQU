const express = require('express');
const { register, login, forgotPassword, resetPassword, loginToken } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [Admin, Manager, Kasir]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Failed to register user
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: Admin123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid password
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to login
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/login-token:
 *   post:
 *     summary: Login menggunakan tokenLogin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tokenLogin
 *             properties:
 *               tokenLogin:
 *                 type: string
 *                 example: "your-valid-token"
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login berhasil."
 *                 token:
 *                   type: string
 *                   example: "JWT_TOKEN"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     role:
 *                       type: string
 *                       example: "admin"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     image:
 *                       type: string
 *                       example: "path/to/image.jpg"
 *                     tokenLogin:
 *                       type: string
 *                       example: "someGeneratedToken"
 *                     tokenLoginExpires:
 *                       type: string
 *                       example: "2024-12-11 18:00:00"
 *                     createdAt:
 *                       type: string
 *                       example: "2024-01-01T00:00:00Z"
 *       400:
 *         description: Token telah kadaluwarsa. Harap generate token baru.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token telah kadaluwarsa. Harap generate token baru."
 *       404:
 *         description: Token tidak ditemukan atau sudah tidak berlaku.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token tidak ditemukan atau sudah tidak berlaku."
 *       500:
 *         description: Terjadi kesalahan internal server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.post('/login-token', loginToken);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request a password reset link
 *     description: Sends a password reset link to the user's email.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@gmail.com
 *     responses:
 *       200:
 *         description: Reset link sent to email.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
router.post('/forgot-password', forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset the user's password
 *     description: Resets the user's password using the provided token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: token
 *               newPassword:
 *                 type: string
 *                 example: Newpassword123
 *     responses:
 *       200:
 *         description: Password has been reset.
 *       400:
 *         description: Invalid or expired token.
 *       500:
 *         description: Server error.
 */
router.post('/reset-password', resetPassword);

module.exports = router;
