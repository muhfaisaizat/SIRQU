// utils/pdfGenerator.js
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

async function createPDF(content) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const pdfPath = path.join(__dirname, '../receipt.pdf'); 

        const writeStream = fs.createWriteStream(pdfPath);
        doc.pipe(writeStream);

        if (content.logo && fs.existsSync(content.logo)) {
            doc.image(content.logo, {
                fit: [100, 100],
                align: 'center',
                valign: 'top'
            });
        }

        doc.fontSize(20).text(content.store_name || 'Nama Toko', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Order Number: ${content.order_number}`, { align: 'left' });
        doc.text(`Cashier Name: ${content.cashier_name}`, { align: 'left' });
        doc.text(`Change: ${content.change}`, { align: 'left' });

        doc.end();

        writeStream.on('finish', () => resolve(pdfPath));
        writeStream.on('error', (error) => reject(error));
    });
}

module.exports = { createPDF };
