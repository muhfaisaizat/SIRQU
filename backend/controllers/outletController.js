// controllers/outletController.js
const Outlet = require('../models/outlets'); // Pastikan path model sesuai dengan struktur proyek Anda
const path = require('path');
const fs = require('fs');
const User = require('../models/users');
const sequelize = require('../config/database');
// Import model yang diperlukan
const Product = require('../models/products');
const ProductOutlet = require('../models/productsOutlets');

exports.createOutlet = async (req, res) => {
  const { nama, alamat, syarat_ketentuan, position } = req.body;

  try {
    // Memeriksa apakah outlet dengan nama yang sama sudah ada
    const existingOutlet = await Outlet.findOne({ where: { nama } });
    if (existingOutlet) {
      return res.status(400).json({ message: 'Outlet with this name already exists' });
    }

    // Memeriksa apakah nilai position valid
    if (!['Toko Utama', 'Toko Cabang'].includes(position)) {
      return res.status(400).json({ message: 'Invalid position value' });
    }

    // Menyimpan path gambar jika ada
    const imagePath = req.file ? `Outlet_${req.body.nama}_${req.file.originalname}` : null;

    // Membuat outlet baru
    const newOutlet = await Outlet.create({
      nama,
      alamat,
      syarat_ketentuan: syarat_ketentuan ,  // Set default value jika syaratKetentuan tidak ada
      position,  // Menambahkan position ke outlet baru
      image: imagePath,  // Menyimpan nama gambar atau null jika tidak ada gambar
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Kirim respons dengan data outlet yang baru dibuat
    res.status(201).json({
      message: 'Outlet created successfully',
      outlet: { ...newOutlet.dataValues, syarat_ketentuan: newOutlet.syarat_ketentuan }, // Menampilkan data outlet yang baru dibuat
    });
  } catch (error) {
    console.error('Error creating outlet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan semua outlet
exports.getOutlets = async (req, res) => {
  try {
    // Query SQL untuk mengambil data outlet dengan koordinator
    const queryOutlet = `
      SELECT 
          outlets.id AS id_outlet,
          outlets.nama AS nama_outlet,
          outlets.alamat AS alamat,
          outlets.position AS posisi,
          outlets.image AS image,
          outlets.syarat_ketentuan AS syarat_ketentuan,
          outlets.koordinator AS koordinator,
          users.id AS id_user,
          users.name AS name_user,
          users.role AS role_user
      FROM 
          outlets 
      LEFT JOIN 
          users ON outlets.koordinator = users.id
      WHERE 
          outlets.deletedAt IS NULL;
    `;

    // Jalankan query untuk mendapatkan data outlet
    const [outlets] = await sequelize.query(queryOutlet);

    // Mengembalikan respons dengan data outlet
    return res.status(200).json({
      success: true,
      message: 'Data outlet berhasil diambil',
      data: outlets,
    });
  } catch (error) {
    console.error('Error fetching outlets:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data outlet',
      error: error.message,
    });
  }
};

// Mendapatkan outlet berdasarkan ID
exports.getOutletById = async (req, res) => {
  const { id } = req.params; // Mengambil ID dari parameter URL

  try {
    // Query SQL untuk mengambil data outlet berdasarkan ID dengan koordinator
    const queryOutletById = `
      SELECT 
          outlets.id AS id_outlet,
          outlets.nama AS nama_outlet,
          outlets.alamat AS alamat,
          outlets.position AS posisi,
          outlets.image AS image,
          outlets.syarat_ketentuan AS syarat_ketentuan,
          outlets.koordinator AS koordinator,
          users.id AS id_user,
          users.name AS name_user,
          users.role AS role_user
      FROM 
          outlets 
      LEFT JOIN 
          users ON outlets.koordinator = users.id
      WHERE 
          outlets.id = :id
    `;

    // Jalankan query untuk mendapatkan data outlet berdasarkan ID
    const [outlet] = await sequelize.query(queryOutletById, {
      replacements: { id }, // Menggunakan parameter untuk mencegah SQL injection
    });

    // Cek apakah outlet ditemukan
    if (outlet.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Outlet tidak ditemukan',
      });
    }

    // Mengembalikan respons dengan data outlet
    return res.status(200).json({
      success: true,
      message: 'Data outlet berhasil diambil',
      data: outlet[0], // Mengambil data outlet pertama (karena kita mencari berdasarkan ID)
    });
  } catch (error) {
    console.error('Error fetching outlet by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data outlet',
      error: error.message,
    });
  }
};

// Memperbarui outlet (termasuk gambar)
exports.updateOutlet = async (req, res) => {
  try {
    const { nama, alamat } = req.body; // Data yang akan diperbarui
    const outlet = await Outlet.findByPk(req.params.id);

    if (!outlet) {
      return res.status(404).json({ error: 'Outlet not found' });
    }

    // Handle pembaruan gambar
    if (req.file) {
      // Path gambar lama
      if (outlet.image) {
        const oldImagePath = path.join(__dirname, '../images', outlet.image);

        // Periksa apakah gambar lama ada, lalu hapus
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Error deleting old image:', err);
          }
        });
      }

      // Path gambar baru
      const imagePath = `Outlet_${req.body.nama}_${req.file.originalname}`;
      outlet.image = imagePath; // Update field gambar dengan nama file baru
    }

    // Update detail outlet lainnya
    outlet.nama = nama || outlet.nama;
    outlet.alamat = alamat || outlet.alamat;

    await outlet.save();

    res.json({ message: 'Outlet updated successfully', outlet });
  } catch (error) {
    console.error('Error updating outlet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Menghapus outlet
exports.deleteOutlet = async (req, res) => {
  try {
    const deleted = await Outlet.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ error: 'Outlet not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateOutletCoordinator = async (req, res) => {
  try {
    const outletId = req.params.id;
    const { koordinatorId } = req.body;

    // Validate that koordinatorId is provided
    if (!koordinatorId) {
      return res.status(400).json({ error: 'Koordinator ID is required' });
    }

    // Check if the user exists and has an eligible role
    const user = await User.findByPk(koordinatorId, { attributes: ['id', 'name', 'role'] });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Only allow users with 'Admin' or 'Manager' roles
    if (!['Admin', 'Manager'].includes(user.role)) {
      return res.status(403).json({ error: 'User does not have permission to be a coordinator' });
    }

    // Find the outlet to update
    const outlet = await Outlet.findByPk(outletId);
    if (!outlet) {
      return res.status(404).json({ error: 'Outlet not found' });
    }

    // Update the koordinator field with the eligible user's ID
    outlet.koordinator = koordinatorId;
    await outlet.save();

    res.status(200).json({
      success: true,
      message: 'Coordinator updated successfully',
      data: {
        id_outlet: outlet.id,
        nama_outlet: outlet.nama,
        id_koordinator: outlet.koordinator,
        id_user: user.id,
        nama_user: user.name,
        role_user: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function untuk membuat ProductOutlet untuk setiap produk
exports.createProductOutletsForAllProducts = async (req, res) => {
  try {
    const { outlet_id } = req.body; // Ambil input outlet_id dari request body

    // Ambil semua id produk dari tabel products yang belum dihapus
    const products = await Product.findAll({ attributes: ['id'], where: { deletedAt: null } });

    // Cek apakah ada produk yang ditemukan
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'Tidak ada produk yang ditemukan' });
    }

    // Buat array untuk menyimpan data ProductOutlet
    const productOutletData = products.map(product => ({
      product_id: product.id,
      outlet_id: outlet_id,
    }));

    // Gunakan bulkCreate untuk membuat ProductOutlet dalam jumlah banyak sekaligus
    const createdProductOutlets = await ProductOutlet.bulkCreate(productOutletData);

    // Kirim respons jika berhasil
    res.status(201).json({
      message: 'Berhasil membuat ProductOutlet untuk setiap produk',
      data: createdProductOutlets,
    });
  } catch (error) {
    console.error('Error creating ProductOutlet:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat membuat ProductOutlet',
      message: error.message,
    });
  }
};


exports.updateSyaratKetentuan = async (req, res) => {
  const { id } = req.params; 
  const { syarat_ketentuan } = req.body; 

  try {
      // Validasi input
      if (syarat_ketentuan === undefined) {
          return res.status(400).json({ message: "Field syarat_ketentuan is required." });
      }

      // Cari outlet berdasarkan id
      const outlet = await Outlet.findByPk(id);

      if (!outlet) {
          return res.status(404).json({ message: "Outlet not found." });
      }

      // Update field syarat_ketentuan
      outlet.syarat_ketentuan = syarat_ketentuan;
      await outlet.save();

      return res.status(200).json({
          message: "Syarat ketentuan updated successfully.",
          data: outlet
      });
  } catch (error) {
      console.error("Error updating syarat_ketentuan:", error);
      return res.status(500).json({ message: "Internal server error." });
  }
};