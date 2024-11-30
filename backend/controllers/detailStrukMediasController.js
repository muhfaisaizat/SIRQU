const DetailStrukMedia = require('../models/detailStrukMedias');

// Membuat DetailStrukMedia baru
exports.createDetailStrukMedia = async (req, res) => {
  try {
    const { struksId, kategori, nameMedia } = req.query;

    if (!struksId || !kategori || !nameMedia) {
      return res.status(400).json({ message: 'Data tidak lengkap. Semua field wajib diisi.' });
    }

    const newDetailStrukMedia = await DetailStrukMedia.create({
      struksId,
      kategori,
      nameMedia,
    });

    return res.status(201).json({
      message: 'Detail Struk Media berhasil dibuat.',
      data: newDetailStrukMedia,
    });
  } catch (error) {
    console.error('Error creating Detail Struk Media:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

exports.updateDetailStrukMedia = async (req, res) => {
  try {
    const { id } = req.params; // ID DetailStrukMedia yang akan di-update
    const { struksId, kategori, nameMedia } = req.query; // Data baru yang akan di-update

    // Cari DetailStrukMedia berdasarkan ID
    const detailStrukMedia = await DetailStrukMedia.findByPk(id);

    if (!detailStrukMedia) {
      return res.status(404).json({ message: 'Detail Struk Media tidak ditemukan.' });
    }

    // Update data hanya jika field baru diberikan
    if (struksId !== undefined) detailStrukMedia.struksId = struksId;
    if (kategori !== undefined) detailStrukMedia.kategori = kategori;
    if (nameMedia !== undefined) detailStrukMedia.nameMedia = nameMedia;

    // Simpan perubahan ke database
    await detailStrukMedia.save();

    return res.status(200).json({
      message: 'Detail Struk Media berhasil diperbarui.',
      data: detailStrukMedia,
    });
  } catch (error) {
    console.error('Error updating Detail Struk Media:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

// Menghapus DetailStrukMedia (soft delete)
exports.deleteDetailStrukMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const detailStrukMedia = await DetailStrukMedia.findByPk(id);

    if (!detailStrukMedia) {
      return res.status(404).json({ message: 'Detail Struk Media tidak ditemukan.' });
    }

    await detailStrukMedia.destroy();

    return res.status(200).json({ message: 'Detail Struk Media berhasil dihapus.' });
  } catch (error) {
    console.error('Error deleting Detail Struk Media:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};