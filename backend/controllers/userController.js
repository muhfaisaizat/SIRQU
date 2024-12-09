const User = require('../models/users');
const argon2 = require('argon2');
const path = require('path');
const sequelize = require('../config/database'); 
const moment = require('moment-timezone'); // Mengimpor moment.js
const fs = require('fs');

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

        // Tambahkan path gambar dari req.file jika ada
        const imagePath = req.file ? `PP_${req.body.name}_${req.file.originalname}` : null;

        // Membuat user baru
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword, // Simpan hashed password
            role,
            status: status || 'Active',
            image: imagePath, // Simpan path gambar
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
  try {
    const [results] = await sequelize.query(`
      SELECT id, image, name, email, password, role, status, tokenLogin, tokenLoginExpires, createdAt, updatedAt, deletedAt
      FROM users
      WHERE deletedAt IS NULL;
    `);

    // Memformat waktu untuk setiap user dalam hasil query
    const formattedUsers = results.map(user => ({
      ...user,
      createdAt: moment.utc(user.createdAt).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc(user.updatedAt).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
      deletedAt: user.deletedAt ? moment.utc(user.deletedAt).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss') : null,
    }));

    return res.status(200).json(formattedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Error fetching users' });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;  // Mengambil parameter ID dari URL

  try {
    // Query untuk mendapatkan user berdasarkan id
    const [results, metadata] = await sequelize.query(`
      SELECT id, image, name, email, password, role, status, tokenLogin, tokenLoginExpires, createdAt, updatedAt, deletedAt
      FROM users
      WHERE id = :id AND deletedAt IS NULL;
    `, {
      replacements: { id },  // Menggunakan id yang diterima dari parameter
    });

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Memformat waktu yang diambil menggunakan moment-timezone untuk zona waktu Asia/Jakarta
    const formattedUser = {
      ...results[0],
      createdAt: moment.utc(results[0].createdAt).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc(results[0].updatedAt).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
      deletedAt: results[0].deletedAt ? moment.utc(results[0].deletedAt).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss') : null,
    };

    return res.status(200).json(formattedUser);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Error fetching user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, role, status, password, email } = req.body; // Tambahkan email ke body
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Handle image update
    if (req.file) {
      // Construct path of the old image file
      if (user.image) {
        const oldImagePath = path.join(__dirname, '../images', user.image);

        // Check if the old image exists and remove it
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Error deleting old image:', err);
          }
        });
      }

      // Generate the new image path and update it
      const imagePath = `PP_${req.body.name}_${req.file.originalname}`;
      user.image = imagePath; // Update image path with the new image
    }

    // Update user details
    user.name = name || user.name;
    user.role = role || user.role;
    user.status = status || user.status;

    // Update email if provided (optional)
    if (email) {
      // Check if the email is already in use by another user
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser && existingUser.id !== user.id) {
        return res.status(400).json({ error: 'Email is already in use by another user' });
      }
      user.email = email; // Update email with the new one
    }

    // Update password if provided (optional)
    if (password) {
      // Hash the new password using argon2 before saving
      const hashedPassword = await argon2.hash(password);
      user.password = hashedPassword; // Update password with the hashed one
    }

    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    await user.destroy();
    res.json({ message: 'User deleted' });
};

// Controller method for updating user status by ID 
exports.updateUserStatus = async (req, res) => {
    try {
      const userId = req.params.id;
      const newStatus = req.query.status;
  
      // Update status user
      const [updated] = await User.update({ status: newStatus }, { where: { id: userId } });
  
      if (updated) {
        // Dapatkan informasi user setelah update
        const updatedUser = await User.findOne({ where: { id: userId }, attributes: ['id', 'name', 'status'] });
  
        return res.status(200).json({
          success: true,
          message: `User status updated to ${newStatus}`,
          data: updatedUser
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating user status",
        error: error.message
      });
    }
  };


exports.generateTokenLogin = async (req, res) => {
    try {
        const userId = req.params.id;
        const randomString = () => Math.random().toString(36).substring(2, 6); // 4 karakter acak
        const newToken = `${randomString()}-${randomString()}-${randomString()}-${randomString()}`;

        // Hitung waktu 48 jam ke depan
        const datetime48jam = moment().tz("Asia/Jakarta").add(48, 'hours').format('YYYY-MM-DD HH:mm:ss');
        console.log(newToken);
        console.log(datetime48jam);

        // Update user dengan token baru dan waktu kadaluarsa token
        const [updated] = await User.update(
            { tokenLogin: newToken, tokenLoginExpires: datetime48jam },
            { where: { id: userId } }
        );

        if (updated) {
            // Dapatkan informasi user setelah update
            const updatedUser = await User.findOne({
                where: { id: userId },
                attributes: ['id', 'name', 'tokenLogin', 'tokenLoginExpires']
            });

            return res.status(200).json({
                success: true,
                message: `User token generated successfully`,
                data: updatedUser
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while generating user token",
            error: error.message
        });
    }
};
