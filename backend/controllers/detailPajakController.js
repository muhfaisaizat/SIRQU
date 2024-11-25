const DetailPajak = require('../models/detailPajaks');

exports.createDetailPajak = async (req, res) => {
  const { transaksi_id, pajak_id, harga } = req.body;

  try {
    if (!transaksi_id || !pajak_id) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    const detailPajak = await DetailPajak.create({
      transaksisId:transaksi_id,
      pajaksId:pajak_id,
      harga,
    });

    res.status(201).json({
      message: "Detail pajak berhasil dibuat",
      data: detailPajak,
    });
  } catch (error) {
    console.error("Error creating detail transaksi:", error);
    res.status(500).json({ message: "Terjadi kesalahan internal" });
  }
};


exports.updateDetailPajak = async (req, res) => {
    const { transaksi_id, detailPajak_id } = req.params;
    const { pajak_id, harga } = req.body;
  
    try {
      // Pastikan field penting diisi
      if (!pajak_id || !harga) {
        return res.status(400).json({ message: "Field pajak_id dan harga harus diisi" });
      }
  
      // Cari detail pajak berdasarkan id transaksi dan id detail pajak
      const detailPajak = await DetailPajak.findOne({
        where: {
          id: detailPajak_id,
          transaksisId:transaksi_id,
        },
      });
  
      if (!detailPajak) {
        return res.status(404).json({ message: "Detail pajak tidak ditemukan" });
      }
  
      // Update detail pajak dengan data baru
      await detailPajak.update({
        pajaksId:pajak_id,
        harga,
      });
  
      res.status(200).json({
        message: "Detail pajak berhasil diperbarui",
        data: detailPajak,
      });
    } catch (error) {
      console.error("Error updating detail pajak:", error);
      res.status(500).json({ message: "Terjadi kesalahan internal" });
    }
  };

  exports.deleteDetailPajak = async (req, res) => {
    const { transaksi_id, detailPajak_id } = req.params;
  
    try {
      // Mencari detail pajak berdasarkan ID dan transaksi ID
      const detailPajak = await DetailPajak.findOne({
        where: {
          id: detailPajak_id,
          transaksisId:transaksi_id,
        },
      });
  
      if (!detailPajak) {
        return res.status(404).json({
          message: `Detail pajak dengan ID ${detailPajak_id} dan transaksi ID ${transaksi_id} tidak ditemukan`,
        });
      }
  
      // Melakukan soft delete
      await detailPajak.destroy();
  
      res.status(200).json({
        message: "Detail pajak berhasil dihapus (soft delete)",
        data: detailPajak,
      });
    } catch (error) {
      console.error("Error deleting detail pajak:", error);
      res.status(500).json({ message: "Terjadi kesalahan internal" });
    }
  };