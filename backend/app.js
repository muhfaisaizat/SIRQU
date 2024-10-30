const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const categoryOutletRoutes = require('./routes/categoryOutletRoutes');
const productRoutes = require('./routes/productRoutes');
const productCategoryRoutes = require('./routes/productCategoryRoutes');
const productOutletRoutes = require('./routes/productOutletRoutes');
const transaksiRoutes = require('./routes/transaksiRoutes');
const detailTransaksiRoutes = require('./routes/detailTransaksiRoutes');
const detailPajak = require('./routes/detailPajak');
const detailDiskonRoutes = require('./routes/detailDiskonRoutes');
const kasirRoutes = require('./routes/kasirRoutes');
const outletRoutes = require('./routes/outletRoutes');
const productImageRoutes = require('./routes/productImageRoutes')
const seedRoles = require("./seeders/roleSeeder"); // Impor seeder
const swaggerDocs = require("./swagger");
const receiptRoutes = require('./routes/receiptRoutes');
const path = require('path');

dotenv.config();

const app = express();

// Konfigurasi CORS
app.use(cors({
  origin: "http://localhost:5173", // Ganti dengan URL frontend Anda
  methods: ["GET", "POST", "PUT", "DELETE"], // Metode yang diizinkan
  allowedHeaders: ["Content-Type", "Authorization"], // Header yang diizinkan
}));

app.use(express.json());

// Middleware for logging requests (optional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use('/api/categories/outlets', categoryOutletRoutes);
app.use('/api/products', productRoutes);
app.use('/api/product/categories', productCategoryRoutes);
app.use('/api/products/outlets', productOutletRoutes);
app.use('/api/products/productImage', productImageRoutes);
app.use('/api/transaksi/detail', detailTransaksiRoutes);
app.use('/api/transaksi/detail-pajak', detailPajak);
app.use('/api/transaksi/detail-diskon', detailDiskonRoutes);
app.use('/api/transaksi', transaksiRoutes);
app.use('/api/kasir', kasirRoutes);
app.use('/api', receiptRoutes);
app.use('/api/outlets', outletRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


// Swagger Documentation
swaggerDocs(app);

const PORT = process.env.PORT || 5000;

// Function to synchronize the database and seed initial data
const initializeDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Hati-hati, ini akan menghapus tabel yang ada
    console.log("Database synced");
    
    // Jalankan seeder secara manual
    // await seedRoles.up(queryInterface); // Panggil metode `up` dari seedRoles
    // console.log("Role seeder completed");
  } catch (error) {
    console.error("Error syncing database:", error);
    throw error; // Rethrow error untuk ditangkap nanti
  }
};

// Start the server
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit the process with an error code
  });
