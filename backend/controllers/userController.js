const User = require('../models/user');
const argon2 = require('argon2');

exports.createUser = async (req, res) => {
    const { name, email, password, role, status } = req.body;

    try {
        // Memeriksa apakah email sudah ada
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash password sebelum menyimpan
        const hashedPassword = await argon2.hash(password);

        // Membuat user baru
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword, // Simpan hashed password
            role,
            status: status || 'Active',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json({
            message: 'User created successfully',
            user: { ...newUser.dataValues, password: undefined }, // Hilangkan password dari response
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

exports.getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
};

exports.updateUser = async (req, res) => {
    const { name, role, status } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.name = name || user.name;
    user.role = role || user.role;
    user.status = status || user.status;
    await user.save();

    res.json({ message: 'User updated', user });
};

exports.deleteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    await user.destroy();
    res.json({ message: 'User deleted' });
};
