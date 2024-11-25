const DetailDiskon = require('../models/detailDiskons');

exports.createDetailDiskon = async (req, res) => {
  const { transaksi_id, diskon_id, harga } = req.body;

  try {
    if (!transaksi_id || !diskon_id) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    const detailDiskon = await DetailDiskon.create({
      transaksisId:transaksi_id,
      diskonsId:diskon_id,
      harga,
    });

    res.status(201).json({
      message: "Detail diskon berhasil dibuat",
      data: detailDiskon,
    });
  } catch (error) {
    console.error("Error creating detail transaksi:", error);
    res.status(500).json({ message: "Terjadi kesalahan internal" });
  }
};



exports.updateDetailDiskon = async (req, res) => {
    const { transaksi_id, detailDiskon_id } = req.params;
    const { diskon_id, harga } = req.body;
  
    try {
      // Pastikan field penting diisi
      if (!diskon_id || !harga) {
        return res.status(400).json({ message: "Field diskon_id dan harga harus diisi" });
      }
  
      // Cari detail diskon berdasarkan id transaksi dan id detail diskon
      const detailDiskon = await DetailDiskon.findOne({
        where: {
          id: detailDiskon_id,
          transaksisId:transaksi_id,
        },
      });
  
      if (!detailDiskon) {
        return res.status(404).json({ message: "Detail diskon tidak ditemukan" });
      }
  
      // Update detail diskon dengan data baru
      await detailDiskon.update({
        diskonsId:diskon_id,
        harga,
      });
  
      res.status(200).json({
        message: "Detail diskon berhasil diperbarui",
        data: detailDiskon,
      });
    } catch (error) {
      console.error("Error updating detail diskon:", error);
      res.status(500).json({ message: "Terjadi kesalahan internal" });
    }
  };


  exports.deleteDetailDiskon = async (req, res) => {
    const { transaksi_id, detailDiskon_id } = req.params;
  
    try {
      // Mencari detail diskon berdasarkan ID dan transaksi ID
      const detailDiskon = await DetailDiskon.findOne({
        where: {
          id: detailDiskon_id,
          transaksisId:transaksi_id,
        },
      });
  
      if (!detailDiskon) {
        return res.status(404).json({
          message: `Detail diskon dengan ID ${detailDiskon_id} dan transaksi ID ${transaksi_id} tidak ditemukan`,
        });
      }
  
      // Melakukan soft delete
      await detailDiskon.destroy();
  
      res.status(200).json({
        message: "Detail diskon berhasil dihapus (soft delete)",
        data: detailDiskon,
      });
    } catch (error) {
      console.error("Error deleting detail diskon:", error);
      res.status(500).json({ message: "Terjadi kesalahan internal" });
    }
  };
