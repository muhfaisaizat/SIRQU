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
const uploadInvoiceRoutes = require('./routes/uploadInvoiceRoutes');
const kasirRoutes = require('./routes/kasirRoutes');
const outletRoutes = require('./routes/outletRoutes');
const productImageRoutes = require('./routes/productImageRoutes');
// const receiptRoutes = require('./routes/receiptRoutes');
const belanjaRoutes = require('./routes/belanjaRoutes');
const categoriesBelanjaRoutes = require('./routes/categoryBelanjaRoutes');
const promosiRoutes = require('./routes/promosiRoutes');
const promosiOutletRoutes = require('./routes/promosiOutletRoutes');
const detailStrukTekssRoutes = require('./routes/detailStrukTekssRoutes');
const detailStrukMediasRoutes = require('./routes/detailStrukMediasRoutes');
const detailStrukLogoRoutes = require('./routes/detailStrukLogoRoutes');
const struksRoutes = require('./routes/struksRoutes');
const pajaksRoutes = require('./routes/pajaksRoutes');
const penjualanRoutes = require('./routes/penjualanRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const rekeningRoutes = require('./routes/rekeningRoutes');
const ewalletRoutes = require('./routes/ewalletRoutes');
const seedRoles = require("./seeders/roleSeeder"); // Impor seeder
const swaggerDocs = require("./swagger");
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
app.use('/api/transaksi', uploadInvoiceRoutes);
app.use('/api/transaksi', transaksiRoutes);
app.use('/api/kasir', kasirRoutes);
app.use('/api/outlets', outletRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use('/api', receiptRoutes);
app.use('/api/belanja', belanjaRoutes);
app.use('/api/categoriesbelanjas', categoriesBelanjaRoutes);
app.use('/api/promosi', promosiOutletRoutes);
app.use('/api/promosi', promosiRoutes);
app.use('/api/setting-struk', detailStrukTekssRoutes);
app.use('/api/setting-struk', detailStrukMediasRoutes);
app.use('/api/setting-struk',  detailStrukLogoRoutes );
app.use('/api/setting-struk',  struksRoutes );
app.use('/api/pajaks',  pajaksRoutes );
app.use('/api/penjualan', penjualanRoutes);
app.use('/api/promosi/outlets', promosiOutletRoutes);
app.use('/api/rekening', rekeningRoutes);
app.use('/api/ewallet', ewalletRoutes);
app.use('/api', dashboardRoutes);

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
    app.listen(PORT, () => console.log(`Server running on port ${PORT} http://localhost:5000/api-sirqu/docs`));
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit the process with an error code
  });
