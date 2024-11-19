const Belanja = require('../models/belanjas');

// Create a new Belanja
exports.createBelanja = async (req, res) => {
  try {
    const { outletsId, categoriesId, namaKegiatan, deskripsi, totalBelanja, waktu, tanggal } = req.body;
    const belanja = await Belanja.create({ outletsId, categoriesId, namaKegiatan, deskripsi, totalBelanja, waktu, tanggal });
    res.status(201).json(belanja);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Belanja
exports.getAllBelanja = async (req, res) => {
  try {
    const belanjas = await Belanja.findAll();
    if (belanjas.length === 0) {
      return res.status(404).json({ error: 'No Belanja found' }); // Jika tidak ada data
    }
    res.status(200).json(belanjas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific Belanja by ID
exports.getBelanjaById = async (req, res) => {
  try {
    const belanja = await Belanja.findByPk(req.params.id);
    if (belanja) {
      res.status(200).json(belanja);
    } else {
      res.status(404).json({ error: 'Belanja not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a Belanja
exports.updateBelanja = async (req, res) => {
  try {
    const { outletsId, categoriesId, namaKegiatan, deskripsi, totalBelanja, waktu, tanggal } = req.body;
    const [updated] = await Belanja.update({ outletsId, categoriesId, namaKegiatan, deskripsi, totalBelanja, waktu, tanggal }, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedBelanja = await Belanja.findByPk(req.params.id);
      res.status(200).json(updatedBelanja);
    } else {
      res.status(404).json({ error: 'Belanja not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Belanja
exports.deleteBelanja = async (req, res) => {
  try {
    const deleted = await Belanja.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Belanja not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
