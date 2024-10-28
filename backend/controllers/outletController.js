// controllers/outletController.js
const Outlet = require('../models/outlet'); // Pastikan path model sesuai dengan struktur proyek Anda
const path = require('path');

// Menambahkan outlet baru dengan gambar
exports.createOutlet = async (req, res) => {
  try {
    // Tambahkan path gambar dari req.file
    const imagePath = req.file ? `/images/${req.file.filename}` : null;
    
    // Buat data outlet baru dengan path gambar
    const outlet = await Outlet.create({
      ...req.body,
      image: imagePath,
    });
    
    res.status(201).json(outlet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mendapatkan semua outlet
exports.getOutlets = async (req, res) => {
  try {
    const outlets = await Outlet.findAll();
    res.status(200).json(outlets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mendapatkan outlet berdasarkan ID
exports.getOutletById = async (req, res) => {
  try {
    const outlet = await Outlet.findByPk(req.params.id);
    if (outlet) {
      res.status(200).json(outlet);
    } else {
      res.status(404).json({ error: 'Outlet not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Memperbarui outlet (termasuk gambar)
exports.updateOutlet = async (req, res) => {
    try {
      // Ambil outlet berdasarkan ID
      const outlet = await Outlet.findByPk(req.params.id);
      if (!outlet) {
        return res.status(404).json({ error: 'Outlet not found' });
      }
  
      // Jika gambar baru diupload, ganti path gambar
      const imagePath = req.file ? `/images/${req.file.filename}` : outlet.image;
  
      // Perbarui outlet
      const updated = await Outlet.update({ ...req.body, image: imagePath }, {
        where: { id: req.params.id },
      });
  
      if (updated[0] === 1) { // updated[0] berisi jumlah baris yang diperbarui
        const updatedOutlet = await Outlet.findByPk(req.params.id);
        res.status(200).json(updatedOutlet);
      } else {
        res.status(404).json({ error: 'Outlet not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
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
