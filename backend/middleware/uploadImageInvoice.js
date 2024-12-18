// Middleware untuk multer
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Buat folder penyimpanan jika belum ada
const uploadDir = path.join(__dirname, '../images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi penyimpanan file
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Folder penyimpanan khusus untuk invoice
  },
  filename: (req, file, cb) => {
    const { transaksisId } = req.body; // Ambil ID transaksi dari body
    if (!transaksisId) {
      return cb(new Error('Transaksi ID is required'), null);
    }
    const customFileName = `Invoice_${transaksisId}_${file.originalname}`; // Format nama file
    cb(null, customFileName);
  },
});

// Filter file untuk memastikan hanya file gambar yang diterima
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // File diterima
  } else {
    cb(new Error('Invalid file type. Only PNG, JPG, and JPEG are allowed'), false);
  }
};

// Middleware untuk mengunggah gambar
const uploadInvoice = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file: 5MB
}).single('imageInvoice');

module.exports = uploadInvoice;