const Kasir = require('../models/kasirs'); // Pastikan path ini benar
const Outlet = require('../models/outlets');
const User = require('../models/users');
const moment = require('moment-timezone'); // Import moment-timezone
const sequelize = require('../config/database');

exports.getKasirList = async (req, res) => {
  try {
    // Query untuk mengambil data kasir
    const query = `
      SELECT 
          kasirs.id AS kasir_id,
          outlets.id AS outlet_id,
          outlets.nama AS outlet_nama,
          users.id AS user_id,
          users.name AS user_name,
          users.role AS user_role,
          kasirs.uangModal,
          kasirs.itemTerjual,
          kasirs.totalKotor,
          kasirs.totalBersih,
          kasirs.waktuBuka,
          kasirs.waktuTutup
      FROM 
          kasirs
      LEFT JOIN 
          outlets ON kasirs.outletsId = outlets.id
      LEFT JOIN 
          users ON kasirs.usersId = users.id
      WHERE 
          kasirs.deletedAt IS NULL AND kasirs.waktuTutup IS NULL
      ORDER BY 
          kasirs.id ASC;
    `;

    // Eksekusi query menggunakan Sequelize
    const kasirList = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    // Format waktu dengan Moment Timezone
    const formattedKasirList = kasirList.map((kasir) => ({
      kasir_id: kasir.kasir_id,
      outlet_id: kasir.outlet_id,
      outlet_nama: kasir.outlet_nama || 'Outlet tidak ditemukan',
      user_id: kasir.user_id,
      user_name: kasir.user_name || 'User tidak ditemukan',
      user_role: kasir.user_role,
      uangModal: kasir.uangModal,
      itemTerjual: kasir.itemTerjual,
      totalKotor: kasir.totalKotor,
      totalBersih: kasir.totalBersih,
      waktuBuka: kasir.waktuBuka
        ? moment(kasir.waktuBuka).tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm:ss')
        : null,
      waktuTutup: kasir.waktuTutup
        ? moment(kasir.waktuTutup).tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm:ss')
        : null,
    }));

    // Response ke client
    res.status(200).json({
      success: true,
      message: 'Data kasir berhasil diambil',
      data: formattedKasirList,
    });
  } catch (error) {
    console.error('Error fetching kasir data:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data kasir',
      error: error.message,
    });
  }
};

// Mendapatkan data kasir berdasarkan ID
exports.getKasirById = async (req, res) => {
  try {
    const { id } = req.params;
    const queryKasir = `
     SELECT 
    kasirs.id, 
    kasirs.outletsId, 
    outlets.nama AS outlet_name, 
    kasirs.usersId, 
    users.name AS user_name, 
    kasirs.uangModal, 
    kasirs.waktuBuka, 
    kasirs.waktuTutup, 
    kasirs.itemTerjual, 
    kasirs.totalKotor, 
    kasirs.totalBersih 
FROM 
    kasirs 
JOIN 
    outlets ON kasirs.outletsId = outlets.id
JOIN 
    users ON kasirs.usersId = users.id
WHERE 
    kasirs.outletsId = ${id} 
    AND 
    DATE(kasirs.waktuBuka) = DATE(NOW())
    AND
    kasirs.waktuTutup IS NULL;
    `;

    // Jalankan query untuk mendapatkan data transaksi
    const [kasir] = await sequelize.query(queryKasir);

   
    // Mengembalikan respons dengan data transaksi, detail_transaksi, detail_pajak, dan detail_diskon
    return res.status(200).json({
      success: true,
      message: 'Data kasir berhasil diambil',
      data: kasir,
    });
  } catch (error) {
    console.error('Error reading kasir:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data kasir',
      error: error.message,
    });
  }
};

// POST /api/kasir
// Menambahkan kasir baru
exports.createKasir = async (req, res) => {
  const { outletsId, usersId, uangModal } = req.body;

  try {
    // Validasi input
    if (!outletsId || !usersId) {
      return res.status(400).json({ error: 'Field harus diisi' });
    }

    // Format waktuBuka dan waktuTutup ke format datetime MySQL
    // const formattedWaktuBuka = moment(waktuBuka).format('DD-MM-YYY HH:mm:ss');
    // const formattedWaktuTutup = moment(waktuTutup).format('DD-MM-YYY HH:mm:ss');

    // Cek apakah outlet dan user yang diberikan ada
    const outlet = await Outlet.findByPk(outletsId);
    const user = await User.findByPk(usersId);

    if (!outlet) {
      return res.status(404).json({ error: 'Outlet tidak ditemukan' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }

    // Membuat kasir baru
    const newKasir = await Kasir.create({
      outletsId,
      usersId,
      uangModal,
      waktuBuka: moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'), // Waktu saat ini dengan timezone Jakarta
      waktuTutup: null, // Waktu tutup diset null
      itemTerjual: 0, // Nilai default
      totalKotor: 0.0, // Nilai default
      totalBersih: 0.0, // Nilai default
    });

    // Mengembalikan response dengan data kasir baru
    return res.status(201).json({
      success: true,
      data: newKasir
    });
  } catch (error) {
    console.error('Error creating kasir:', error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat membuat kasir' });
  }
};

// PUT /api/kasir/:id
exports.updateKasir = async (req, res) => {
    const { id } = req.params;
    const { itemTerjual, totalKotor, totalBersih } = req.body;
  
    try {
      const kasir = await Kasir.findByPk(id);
      if (!kasir) {
        return res.status(404).json({ error: 'Kasir tidak ditemukan' });
      }
  
      // Format waktuTutup to MySQL datetime format
      // const formattedWaktuTutup = moment(waktuTutup).format('YYYY-MM-DD HH:mm:ss');
  
      // Update the properties
      kasir.waktuTutup = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'); // Set waktuTutup sekarang
      kasir.itemTerjual = itemTerjual;
      kasir.totalKotor = totalKotor;
      kasir.totalBersih = totalBersih;
  
      // Save the updated kasir object
      await kasir.save();
      res.json(kasir);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan' });
    }
  };

