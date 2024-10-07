const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET;

// Fungsi register
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Memeriksa apakah email sudah ada
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash password sebelum menyimpan
        const hashedPassword = await argon2.hash(password);

        // Membuat user baru
        const user = await User.create({
            name,
            email,
            password: hashedPassword, // Simpan hashed password
            role,
            status: 'Active',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return res.status(201).json({ message: 'User registered successfully', user: { ...user.dataValues, password: undefined } }); // Hapus password dari response
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Fungsi login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Bandingkan password menggunakan argon2
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Buat token
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', token, user: { ...user.dataValues, password: undefined } }); // Hapus password dari response
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.forgotPassword = (req, res) => {
    // Implement forgot password logic
};

exports.resetPassword = (req, res) => {
    // Implement reset password logic
};
