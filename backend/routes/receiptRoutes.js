// const express = require("express");
// const router = express.Router();
// const receiptController = require("../controllers/receiptController");

// /**
//  * @swagger
//  * /api/receipt-settings:
//  *   post:
//  *     summary: Set receipt display settings
//  *     tags: [ReceiptSettings]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - tax
//  *               - operational_cost
//  *               - store_name
//  *               - address
//  *               - contact
//  *               - social_media
//  *               - items
//  *               - notes
//  *               - showLogo
//  *               - showStoreName
//  *               - showAddress
//  *               - showContact
//  *               - showSocialMedia
//  *               - showNotes
//  *             properties:
//  *               tax:
//  *                 type: number
//  *                 example: 10
//  *               operational_cost:
//  *                 type: number
//  *                 example: 5000
//  *               store_name:
//  *                 type: string
//  *                 example: "Toko Saya"
//  *               address:
//  *                 type: string
//  *                 example: "Jl. Contoh No. 123"
//  *               contact:
//  *                 type: string
//  *                 example: "08123456789"
//  *               social_media:
//  *                 type: string
//  *                 example: "@toko_saya"
//  *               items:
//  *                 type: array
//  *                 items:
//  *                   type: object
//  *                   properties:
//  *                     name:
//  *                       type: string
//  *                     price:
//  *                       type: number
//  *                     quantity:
//  *                       type: number
//  *               notes:
//  *                  type: string
//  *                  example: catatan
//  *               showLogo:
//  *                 type: boolean
//  *                 example: true
//  *               showStoreName:
//  *                 type: boolean
//  *                 example: true
//  *               showAddress:
//  *                 type: boolean
//  *                 example: true
//  *               showContact:
//  *                 type: boolean
//  *                 example: true
//  *               showSocialMedia:
//  *                 type: boolean
//  *                 example: true
//  *               showNotes:
//  *                 type: boolean
//  *                 example: true
//  *               taxEnabled:
//  *                 type: boolean
//  *                 example: true
//  *               operationalCostEnabled:
//  *                 type: boolean
//  *                 example: true
//  *     responses:
//  *       200:
//  *         description: Settings updated successfully
//  *       400:
//  *         description: Bad request
//  */
// router.post("/receipt-settings", receiptController.setReceiptSettings);

// /**
//  * @swagger
//  * /api/print-receipt:
//  *   post:
//  *     summary: Print receipt
//  *     tags: [Receipt]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - order_number
//  *               - cashier_name
//  *               - change
//  *             properties:
//  *               order_number:
//  *                 type: string
//  *                 example: "12345"
//  *               cashier_name:
//  *                 type: string
//  *                 example: "John Doe"
//  *               change:
//  *                 type: number
//  *                 example: 5000
//  *     responses:
//  *       200:
//  *         description: Receipt generated successfully
//  *       400:
//  *         description: Receipt settings not found
//  */
// router.post("/print-receipt", receiptController.printReceipt);

// module.exports = router;
