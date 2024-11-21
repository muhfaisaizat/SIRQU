const CategoriesBelanjas = require('../models/categoriesBelanjas'); // Sesuaikan dengan path model Anda

// Create a new CategoriesBelanja
exports.createCategoriesBelanja = async (req, res) => {
  try {
    const { outletsId, name } = req.body;

    // Validasi input
    if (!outletsId || !name) {
      return res.status(400).json({ error: 'Semua field wajib diisi' });
    }

    // Membuat record baru
    const categoriesBelanja = await CategoriesBelanjas.create({
      outletsId,
      name,
    });

    res.status(201).json(categoriesBelanja); // Mengirim response dengan data yang telah dibuat
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get CategoriesBelanjas by outletId
exports.getCategoriesByOutletId = async (req, res) => {
    const { id } = req.params;  // Ambil id dari parameter URL
  
    try {
      // Mengambil kategori belanja berdasarkan outletId
      const categoriesBelanjas = await CategoriesBelanjas.findAll({
        where: { outletsId: id }  // Ganti outletsId dengan outletId jika nama kolom sesuai
      });
  
      // Jika tidak ada kategori belanja ditemukan untuk outlet tertentu
      if (categoriesBelanjas.length === 0) {
        return res.status(404).json({ error: 'Tidak ada kategori belanja ditemukan untuk outlet ini' });
      }
  
      // Mengirimkan data kategori belanja yang ditemukan
      res.status(200).json(categoriesBelanjas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

  

// Get CategoriesBelanja by ID
exports.getCategoriesBelanjaById = async (req, res) => {
  const { id } = req.params;

  try {
    const categoriesBelanja = await CategoriesBelanjas.findByPk(id);

    if (!categoriesBelanja) {
      return res.status(404).json({ error: 'Data Categories Belanja tidak ditemukan' });
    }

    res.status(200).json(categoriesBelanja); // Mengirimkan data berdasarkan ID
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update CategoriesBelanja by ID
exports.updateCategoriesBelanja = async (req, res) => {
  const { id } = req.params;
  const { outletsId, name } = req.body;

  try {
    const categoriesBelanja = await CategoriesBelanjas.findByPk(id);

    if (!categoriesBelanja) {
      return res.status(404).json({ error: 'Data Categories Belanja tidak ditemukan' });
    }

    // Memperbarui data
    categoriesBelanja.outletsId = outletsId || categoriesBelanja.outletsId;
    categoriesBelanja.name = name || categoriesBelanja.name;

    await categoriesBelanja.save(); // Menyimpan perubahan

    res.status(200).json(categoriesBelanja); // Mengirimkan data yang sudah diperbarui
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Soft Delete CategoriesBelanja by ID
exports.deleteCategoriesBelanja = async (req, res) => {
  const { id } = req.params;

  try {
    const categoriesBelanja = await CategoriesBelanjas.findByPk(id);

    if (!categoriesBelanja) {
      return res.status(404).json({ error: 'Data Categories Belanja tidak ditemukan' });
    }

    await categoriesBelanja.destroy(); // Melakukan soft delete

    res.status(200).json({ message: 'Data Categories Belanja berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
