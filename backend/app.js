// app.js
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const seedRoles = require('./seeders/roleSeeder');
const swaggerDocs = require('./swagger');

dotenv.config();

const app = express();
app.use(express.json());

// Middleware for logging requests (optional)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);


// Swagger Documentation
swaggerDocs(app);

const PORT = process.env.PORT || 5000;

// Function to synchronize the database and seed initial data
const initializeDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Hati-hati, ini akan menghapus tabel yang ada
        console.log('Database synced');
        
        // Jalankan seeder secara manual
        await seedRoles();
        console.log('Role seeder completed');
    } catch (error) {
        console.error('Error syncing database:', error);
        throw error; // Rethrow error untuk ditangkap nanti
    }
};

// Start the server
initializeDatabase()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => {
        console.error('Error starting the server:', error);
        process.exit(1); // Exit the process with an error code
    });
