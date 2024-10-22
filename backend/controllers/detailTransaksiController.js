const DetailTransaksi = require('../models/detailTransaksi');

exports.createDetailTransaksi = async (req, res) => {
  const { transaksi_id, product_id, stok } = req.body;

  try {
    if (!transaksi_id || !product_id || !stok) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    const detailTransaksi = await DetailTransaksi.create({
      transaksi_id,
      product_id,
      stok,
    });

    res.status(201).json({
      message: "Detail transaksi berhasil dibuat",
      data: detailTransaksi,
    });
  } catch (error) {
    console.error("Error creating detail transaksi:", error);
    res.status(500).json({ message: "Terjadi kesalahan internal" });
  }
};


exports.updateDetailTransaksi = async (req, res) => {
    const { transaksi_id, detailTransaksi_id } = req.params;
    const { product_id, stok } = req.body;
  
    try {
      // Validasi input
      if (!product_id || !stok) {
        return res.status(400).json({ message: "Field 'product_id' dan 'stok' harus diisi" });
      }
  
      // Cari detail transaksi berdasarkan id transaksi dan id detail transaksi
      const detailTransaksi = await DetailTransaksi.findOne({
        where: {
          id: detailTransaksi_id,
          transaksi_id: transaksi_id,
        },
      });
  
      // Jika detail transaksi tidak ditemukan
      if (!detailTransaksi) {
        return res.status(404).json({
          message: `Detail transaksi dengan ID ${detailTransaksi_id} dan transaksi ID ${transaksi_id} tidak ditemukan`,
        });
      }
  
      // Perbarui detail transaksi
      detailTransaksi.product_id = product_id;
      detailTransaksi.stok = stok;
  
      // Simpan perubahan
      await detailTransaksi.save();
  
      res.status(200).json({
        message: "Detail transaksi berhasil diperbarui",
        data: detailTransaksi,
      });
    } catch (error) {
      console.error("Error updating detail transaksi:", error);
      res.status(500).json({ message: "Terjadi kesalahan internal" });
    }
  };



  exports.deleteDetailTransaksi = async (req, res) => {
    const { transaksi_id, detailTransaksi_id } = req.params;
  
    try {
      const detailTransaksi = await DetailTransaksi.findOne({
        where: {
          id: detailTransaksi_id,
          transaksi_id: transaksi_id,
        },
      });
  
      if (!detailTransaksi) {
        return res.status(404).json({
          message: `Detail transaksi dengan ID ${detailTransaksi_id} dan transaksi ID ${transaksi_id} tidak ditemukan`,
        });
      }
  
      // Melakukan soft delete
      await detailTransaksi.destroy();
  
      res.status(200).json({
        message: "Detail transaksi berhasil dihapus (soft delete)",
        data: detailTransaksi,
      });
    } catch (error) {
      console.error("Error deleting detail transaksi:", error);
      res.status(500).json({ message: "Terjadi kesalahan internal" });
    }
  };
