// controllers/ewalletController.js
const Ewallet = require('../models/ewallets'); // Pastikan path model sesuai dengan struktur proyek Anda
const sequelize = require('../config/database');
const moment = require('moment-timezone');
const fs = require('fs');
const path = require('path');

exports.createEwallet = async (req, res) => {
  const { namaEwallet } = req.body;

  try {
    // Menyimpan path gambar sementara jika ada
    let imagePath = null;

    if (req.file) {
      // Nama file sementara tanpa ID (sebelum ID tersedia)
      imagePath = `Ewallet_${req.body.namaEwallet}_${req.file.originalname}`;
    }

    // Membuat ewallet baru (tanpa ID karena auto-increment)
    const newEwallet = await Ewallet.create({
      namaEwallet,
      image: imagePath,  // Menyimpan nama gambar sementara atau null jika tidak ada gambar
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Jika ada gambar, lakukan proses penggantian nama file dengan ID yang sudah ter-generate
    if (req.file) {
      // Membuat nama file yang baru setelah ID tersedia
      const finalImagePath = `Ewallet_${req.body.namaEwallet}_${newEwallet.id}_${req.file.originalname}`;

      // Menentukan path file lama dan path file baru
      const oldFilePath = path.join(__dirname, '../images', req.file.filename); // File sementara yang di-upload
      const newFilePath = path.join(__dirname, '../images', finalImagePath);   // File dengan format baru

      // Mengganti nama file gambar di folder 'images'
      fs.renameSync(oldFilePath, newFilePath);

      // Update nama gambar di database dengan path baru
      await newEwallet.update({ image: finalImagePath });
    }

    // Kirim respons dengan data ewallet yang baru dibuat
    res.status(201).json({
      message: 'Ewallet created successfully',
      ewallet: { ...newEwallet.dataValues }, // Menampilkan data ewallet yang baru dibuat
    });
  } catch (error) {
    console.error('Error creating ewallet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllEwallets = async (req, res) => {
    try {
      // Mengambil semua e-wallet dari database
      const ewallets = await Ewallet.findAll();
  
      // Jika tidak ada data
      if (!ewallets || ewallets.length === 0) {
        return res.status(404).json({ message: 'No ewallets found' });
      }
  
      // Konversi waktu menggunakan Moment Timezone
    const formattedEwallets = ewallets.map((ewallet) => {
        return {
          ...ewallet.dataValues,
          createdAt: moment(ewallet.createdAt).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'), // Atur zona waktu sesuai kebutuhan
          updatedAt: moment(ewallet.updatedAt).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'), // Atur zona waktu sesuai kebutuhan
        };
      });
  
      // Kirim respons dengan data ewallet yang sudah diformat
      res.status(200).json({
        message: 'Ewallets fetched successfully',
        ewallets: formattedEwallets,
      });
    } catch (error) {
      console.error('Error fetching ewallets:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };  

  
  exports.getEwalletById = async (req, res) => {
    const { id } = req.params; // Ambil ID dari URL parameter
  
    try {
      // Mengambil ewallet berdasarkan ID
      const ewallet = await Ewallet.findByPk(id);
  
      // Jika ewallet tidak ditemukan
      if (!ewallet) {
        return res.status(404).json({ message: `Ewallet with id ${id} not found` });
      }
  
      // Konversi waktu menggunakan Moment Timezone
    const formattedEwallet = {
        ...ewallet.dataValues,
        createdAt: moment(ewallet.createdAt).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'), // Atur zona waktu sesuai kebutuhan
        updatedAt: moment(ewallet.updatedAt).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'), // Atur zona waktu sesuai kebutuhan
      };
  
      // Kirim respons dengan data ewallet yang sudah diformat
      res.status(200).json({
        message: 'Ewallet fetched successfully',
        ewallet: formattedEwallet,
      });
    } catch (error) {
      console.error('Error fetching ewallet:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.updateEwallet = async (req, res) => {
    const { id } = req.params;
    const { namaEwallet } = req.body;
  
    try {
      // Cari ewallet berdasarkan ID
      const ewallet = await Ewallet.findByPk(id);
  
      if (!ewallet) {
        return res.status(404).json({ message: 'Ewallet not found' });
      }
  
      // Menyimpan path gambar jika ada
      const imagePath = req.file ? `Ewallet_${namaEwallet}_${id}_${req.file.originalname}` : ewallet.image;
  
      // Jika ada gambar lama, hapus gambar lama sebelum mengganti dengan gambar baru
      if (req.file && ewallet.image) {
        const oldImagePath = path.join(__dirname, '../images', ewallet.image); // Lokasi gambar lama
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Menghapus gambar lama dari server
        }
      }
  
      // Perbarui data ewallet
      await ewallet.update({
        namaEwallet,
        image: imagePath,  // Update gambar jika ada file yang diupload
        updatedAt: new Date(),
      });
  
      // Konversi waktu menggunakan Moment Timezone
      const formattedEwallet = {
        ...ewallet.dataValues,
        createdAt: moment(ewallet.createdAt).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(ewallet.updatedAt).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
      };
  
      // Kirim respons dengan data ewallet yang sudah diperbarui
      res.status(200).json({
        message: 'Ewallet updated successfully',
        ewallet: formattedEwallet,
      });
    } catch (error) {
      console.error('Error updating ewallet:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Menghapus ewallet berdasarkan ID (soft delete)
exports.deleteEwallet = async (req, res) => {
    try {
      const { id } = req.params; // Mendapatkan ID dari parameter URL
  
      // Cari ewallet berdasarkan ID
      const ewallet = await Ewallet.findOne({ where: { id } });
  
      // Jika ewallet tidak ditemukan
      if (!ewallet) {
        return res.status(404).json({
          success: false,
          message: `Ewallet dengan ID ${id} tidak ditemukan.`,
        });
      }
  
      // Soft delete ewallet
      await ewallet.destroy();
  
      // Kembalikan respons berhasil (status 204 untuk tidak ada konten)
      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting ewallet:', error);
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat menghapus ewallet.',
        error: error.message,
      });
    }
  };