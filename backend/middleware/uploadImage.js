const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan file
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../images')); // Folder penyimpanan gambar
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname); // Nama file unik
  },
});

// Filter file untuk memastikan hanya file gambar yang diterima
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true); // File diterima
  } else {
    cb(null, false); // File ditolak
  }
};

// Middleware untuk mengunggah gambar
const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file: 5MB
}).single('image');

module.exports = upload;
