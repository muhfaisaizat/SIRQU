const DetailStrukTeks = require('../models/detailStrukTekss');

exports.createDetailStrukTeks = async (req, res) => {
    try {
        // Mendapatkan data dari body request
        const { struksId, text } = req.body;
    
        // Validasi jika data tidak lengkap
        if (!struksId || !text) {
          return res.status(400).json({ message: 'struksId dan text harus diisi.' });
        }
    
        // Menyimpan data ke dalam tabel detailStrukTekss
        const newDetailStrukTeks = await DetailStrukTeks.create({
          struksId,  // ID struk yang terkait
          text,      // Teks untuk detail struk
        });
    
        // Mengirimkan respons berhasil dengan data yang baru dibuat
        return res.status(201).json({
          message: 'Detail struk teks berhasil dibuat.',
          data: newDetailStrukTeks,
        });
      } catch (error) {
        // Menangani error jika terjadi
        console.error('Error creating detail struk teks:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
      }
}


exports.updateDetailStrukTeks = async (req, res) => {
  const { id } = req.params; // ID yang akan di-update
  const { struksId, text } = req.body; // Data yang akan diperbarui

  try {
    // Cari detail struk teks berdasarkan ID
    const detailStrukTeks = await DetailStrukTeks.findByPk(id);

    if (!detailStrukTeks) {
      return res.status(404).json({ message: 'DetailStrukTeks tidak ditemukan.' });
    }

    // Update data dengan nilai baru jika tersedia
    if (struksId) detailStrukTeks.struksId = struksId;
    if (text) detailStrukTeks.text = text;

    // Simpan perubahan ke database
    await detailStrukTeks.save();

    // Kirim respons sukses dengan data yang diperbarui
    return res.status(200).json({
      message: 'DetailStrukTeks berhasil diperbarui.',
      data: detailStrukTeks,
    });
  } catch (error) {
    console.error('Error updating detail struk teks:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};


exports.deleteDetailStrukTeks = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Cari transaksi berdasarkan ID
      const detailStrukTeks = await DetailStrukTeks.findByPk(id);
  
      if (!detailStrukTeks) {
        return res.status(404).json({ message: "detailStrukTeks tidak ditemukan" });
      }
  
      // Melakukan soft delete
      await detailStrukTeks.destroy();
  
      res.status(200).json({
        message: "detailStrukTeks berhasil dihapus (soft delete)",
        data: detailStrukTeks,
      });
    } catch (error) {
      console.error("Error deleting transaksi:", error);
      res.status(500).json({ message: "Terjadi kesalahan internal" });
    }
  };