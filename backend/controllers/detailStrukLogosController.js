const DetailStrukLogo = require('../models/detailStrukLogos');
const Struk = require('../models/struks');
const path = require('path');
const fs = require('fs');


exports.createDetailStrukLogo = async (req, res) => {
    const { struksId } = req.body;

    try {
      // Memastikan produk dengan ID yang diberikan ada
      const struk = await Struk.findByPk(struksId);
      if (!struk) {
        return res.status(404).json({ message: 'Struk not found' });
      }
  
      // Menyimpan path gambar jika ada
      const imagePath = req.file ? `Logo_${struksId}_${req.file.originalname}` : null;
  
      if (!imagePath) {
        return res.status(400).json({ message: 'Image file is required' });
      }
  
      // Membuat data gambar produk baru
      const newDetailStrukLogo = await DetailStrukLogo.create({
        struksId: struksId,
        logo: imagePath,
      });
  
      // Mengirimkan respons sukses dengan data yang baru dibuat
      res.status(201).json({
        message: 'DetailStrukLogo image created successfully',
        productImage: newDetailStrukLogo,
      });
    } catch (error) {
      console.error('Error creating detailStrukLogo image:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}




exports.updateDetailStrukLogo = async (req, res) => {
    try {
      // Ambil gambar produk berdasarkan ID
      const detailStrukLogo = await DetailStrukLogo.findByPk(req.params.id);
      if (!detailStrukLogo) {
        return res.status(404).json({ error: 'DetailStrukLogo image not found' });
      }

      if (req.body.struksId) {
        const struk = await Struk.findByPk(req.body.struksId);
        if (!struk) {
          return res.status(404).json({ error: 'Struk not found' });
        }
      }

      if (req.file) {
        // Construct path of the old image file
        if (detailStrukLogo.logo) {
          const oldImagePath = path.join(__dirname, '../images', detailStrukLogo.logo);
  
          // Check if the old image exists and remove it
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error('Error deleting old image:', err);
            }
          });
        }
    }
  
      // Jika gambar baru diupload, ganti path gambar
      const imagePath = req.file ? `${req.file.filename}` : detailStrukLogo.logo;
  
      // Perbarui gambar produk
      await detailStrukLogo.update({
        logo: imagePath,
      });
  
      res.status(200).json(detailStrukLogo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  exports.deleteDetailStrukLogo = async (req, res) => {
    try {
      const { id } = req.params;
  
      const detailStrukLogo = await DetailStrukLogo.findByPk(id);
  
      if (!detailStrukLogo) {
        return res.status(404).json({ message: 'Detail Struk Logo tidak ditemukan.' });
      }
  
      await detailStrukLogo.destroy();
  
      return res.status(200).json({ message: 'Detail Struk Logo berhasil dihapus.' });
    } catch (error) {
      console.error('Error deleting Detail Struk Logo:', error);
      return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
  };