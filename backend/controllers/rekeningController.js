const Rekening = require('../models/rekenings');
const moment = require('moment-timezone');

// Set timezone default
const DEFAULT_TIMEZONE = 'Asia/Jakarta';

// Controller untuk mendapatkan semua data rekening
exports.getAllRekenings = async (req, res) => {
  try {
    // Ambil semua data rekening
    const rekenings = await Rekening.findAll();

    // Format waktu dengan moment-timezone
    const formattedRekenings = rekenings.map((rekening) => ({
      ...rekening.toJSON(),
      createdAt: moment(rekening.createdAt).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment(rekening.updatedAt).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD HH:mm:ss'),
      deletedAt: rekening.deletedAt
        ? moment(rekening.deletedAt).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD HH:mm:ss')
        : null,
    }));

    // Berhasil mengambil data
    return res.status(200).json({
      success: true,
      message: 'Data rekening berhasil diambil',
      data: formattedRekenings,
    });
  } catch (error) {
    console.error('Error fetching rekenings:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data rekening',
      error: error.message,
    });
  }
};

// Controller untuk mendapatkan data rekening berdasarkan ID
exports.getRekeningById = async (req, res) => {
  try {
    const { id } = req.params;

    // Ambil data rekening berdasarkan ID
    const rekening = await Rekening.findByPk(id);

    // Jika data tidak ditemukan
    if (!rekening) {
      return res.status(404).json({
        success: false,
        message: `Data rekening dengan ID ${id} tidak ditemukan`,
      });
    }

    // Format waktu dengan moment-timezone
    const formattedRekening = {
      ...rekening.toJSON(),
      createdAt: moment(rekening.createdAt).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment(rekening.updatedAt).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD HH:mm:ss'),
      deletedAt: rekening.deletedAt
        ? moment(rekening.deletedAt).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD HH:mm:ss')
        : null,
    };

    // Berhasil mengambil data
    return res.status(200).json({
      success: true,
      message: 'Data rekening berhasil diambil',
      data: formattedRekening,
    });
  } catch (error) {
    console.error('Error fetching rekening by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data rekening',
      error: error.message,
    });
  }
};

// Controller untuk menambahkan data rekening
exports.createRekening = async (req, res) => {
  try {
    const { namaPemilik, namaBank, nomerRekening } = req.body;

    // Validasi input
    if (!namaPemilik || !namaBank || !nomerRekening) {
      return res.status(400).json({
        success: false,
        message: 'Semua field (namaPemilik, namaBank, nomerRekening) harus diisi',
      });
    }

    // Simpan data ke database
    const rekening = await Rekening.create({
      namaPemilik,
      namaBank,
      nomerRekening,
      createdAt: moment().tz(DEFAULT_TIMEZONE).toDate(),
      updatedAt: moment().tz(DEFAULT_TIMEZONE).toDate(),
    });

    // Format waktu dengan moment-timezone
    const formattedRekening = {
      ...rekening.toJSON(),
      createdAt: moment(rekening.createdAt).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment(rekening.updatedAt).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD HH:mm:ss'),
    };

    // Berhasil menyimpan data
    return res.status(201).json({
      success: true,
      message: 'Data rekening berhasil ditambahkan',
      data: formattedRekening,
    });
  } catch (error) {
    console.error('Error creating rekening:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menambahkan data rekening',
      error: error.message,
    });
  }
};

// Menghapus rekening berdasarkan ID (soft delete)
exports.deleteRekening = async (req, res) => {
    try {
      const { id } = req.params; // Mendapatkan ID dari parameter URL
  
      // Cari rekening berdasarkan ID
      const rekening = await Rekening.findOne({ where: { id } });
  
      // Jika rekening tidak ditemukan
      if (!rekening) {
        return res.status(404).json({
          success: false,
          message: `Rekening dengan ID ${id} tidak ditemukan.`,
        });
      }
  
      // Soft delete rekening
      await rekening.destroy();
  
      // Kembalikan respons berhasil (status 204 untuk tidak ada konten)
      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting rekening:', error);
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat menghapus rekening.',
        error: error.message,
      });
    }
  };

  // Mengupdate rekening berdasarkan ID
exports.updateRekening = async (req, res) => {
    try {
      const { id } = req.params; // Mendapatkan ID dari parameter URL
      const { namaPemilik, namaBank, nomerRekening } = req.body; // Mendapatkan data baru dari body request
  
      // Validasi input
      if (!namaPemilik || !namaBank || !nomerRekening) {
        return res.status(400).json({
          success: false,
          message: 'Semua field (namaPemilik, namaBank, nomerRekening) harus diisi',
        });
      }
  
      // Cari rekening berdasarkan ID
      const rekening = await Rekening.findOne({ where: { id } });
  
      // Jika rekening tidak ditemukan
      if (!rekening) {
        return res.status(404).json({
          success: false,
          message: `Rekening dengan ID ${id} tidak ditemukan.`,
        });
      }
  
      // Update rekening dengan data baru
      rekening.namaPemilik = namaPemilik;
      rekening.namaBank = namaBank;
      rekening.nomerRekening = nomerRekening;
      rekening.updatedAt = moment().tz('Asia/Jakarta').format(); // Menggunakan moment untuk waktu dengan timezone
  
      // Simpan perubahan ke database
      await rekening.save();
  
      // Kembalikan respons berhasil
      return res.status(200).json({
        success: true,
        message: `Rekening dengan ID ${id} berhasil diperbarui.`,
        data: rekening,
      });
    } catch (error) {
      console.error('Error updating rekening:', error);
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengupdate rekening.',
        error: error.message,
      });
    }
  };