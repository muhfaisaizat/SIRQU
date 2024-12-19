// controllers/uploadInvoice.js
const path = require('path');
const Transaksi = require('../models/transaksis'); // Pastikan path model benar
const UploadInvoice = require('../models/uploadInvoices'); // Pastikan path model benar

exports.createUploadInvoice = async (req, res) => {
  const { transaksisId } = req.body;

  try {
    // Memastikan transaksi dengan ID yang diberikan ada
    const transaksi = await Transaksi.findByPk(transaksisId);
    if (!transaksi) {
      return res.status(404).json({ message: 'Transaksi not found' });
    }

    // Memeriksa apakah invoice sudah diunggah untuk transaksi ini
    const existingUploadInvoice = await UploadInvoice.findOne({ where: { transaksisId } });
    if (existingUploadInvoice) {
      return res.status(400).json({ message: 'Invoice has already been uploaded for this transaksi' });
    }

    // Menyimpan path gambar jika ada
    const imagePath = req.file ? `Invoice_${transaksisId}_${req.file.originalname}` : null;

    if (!imagePath) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Membuat data gambar invoice baru
    const newUploadInvoice = await UploadInvoice.create({
      transaksisId,
      imageInvoice: imagePath,
    });

    // Mengirimkan respons sukses dengan data yang baru dibuat
    res.status(201).json({
      message: 'Upload invoice created successfully',
      uploadInvoice: newUploadInvoice,
    });
  } catch (error) {
    console.error('Error creating upload invoice:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get all product image relationships
exports.getUploadInvoice = async (req, res) => {
    try {
        // Mendapatkan semua data UploadInvoice dari database
        const uploadInvoices = await UploadInvoice.findAll();
    
        if (uploadInvoices.length === 0) {
          return res.status(200).json({ message: 'No upload invoices found' });
        }
    
        // Mengembalikan data yang ditemukan
        res.status(200).json(uploadInvoices);
      } catch (error) {
        console.error('Error fetching upload invoices:', error); // Logging error untuk debugging
        res.status(500).json({ error: 'Internal server error' });
      }
  };
  

// Mendapatkan upload invoice berdasarkan transaksi ID
exports.getUploadInvoiceByTransaksiId = async (req, res) => {
  try {
    const { transaksisId } = req.params;

    // Cari upload invoice berdasarkan transaksi ID
    const uploadInvoice = await UploadInvoice.findOne({
      where: { transaksisId }, // Filter berdasarkan transaksi ID
      include: [{ model: Transaksi, attributes: ['name'] }], // Ambil data transaksi terkait
    });

    if (uploadInvoice) {
      res.status(200).json({
        success: true,
        message: 'Upload invoice ditemukan',
        uploadInvoice,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Upload invoice untuk transaksi ID ${transaksisId} tidak ditemukan',
      });
    }
  } catch (error) {
    console.error('Error fetching upload invoice:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message,
    });
  }
};


exports.updateUploadInvoice = async (req, res) => {
  const { transaksisId } = req.body;

  try {
    // Memastikan transaksi dengan ID yang diberikan ada
    const transaksi = await Transaksi.findByPk(transaksisId);
    if (!transaksi) {
      return res.status(404).json({ message: 'Transaksi not found' });
    }

    // Memeriksa apakah invoice sudah ada untuk transaksi ini
    const existingUploadInvoice = await UploadInvoice.findOne({ where: { transaksisId } });
    if (!existingUploadInvoice) {
      return res.status(404).json({ message: 'Invoice not found for this transaksi' });
    }

    // Menyimpan path gambar baru jika ada
    const newImagePath = req.file ? `Transaksi_${transaksisId}_${req.file.originalname}` : null;

    if (!newImagePath) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Mengupdate path gambar invoice
    await existingUploadInvoice.update({
      imageInvoice: newImagePath,
    });

    // Mengirimkan respons sukses dengan data yang telah diperbarui
    res.status(200).json({
      message: 'Upload invoice updated successfully',
      uploadInvoice: existingUploadInvoice,
    });
  } catch (error) {
    console.error('Error updating upload invoice:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Menghapus upload invoice berdasarkan transaksi ID
exports.deleteUploadInvoiceByTransaksiId = async (req, res) => {
  try {
    const { transaksisId } = req.params;

    // Cari upload invoice berdasarkan transaksi ID
    const uploadInvoice = await UploadInvoice.findOne({
      where: { transaksisId },
    });

    if (!uploadInvoice) {
      return res.status(404).json({
        success: false,
        message: 'Upload invoice untuk transaksi ID ${transaksisId} tidak ditemukan',
      });
    }

    // Hapus upload invoice
    await uploadInvoice.destroy();

    res.status(200).json({
      success: true,
      message: 'Upload invoice untuk transaksi ID ${transaksisId} berhasil dihapus',
    });
  } catch (error) {
    console.error('Error deleting upload invoice:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message,
    });
  }
};