// middlewares/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Set storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pastikan folder ini ada
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp ke nama file
  },
});

// Initialize upload
const upload = multer({ dest: 'uploads/' }); // Mengatur folder untuk menyimpan file yang diunggah

// Ekspor middleware upload
module.exports = upload;
