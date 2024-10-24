const Kasir = require('../models/kasir'); // Pastikan path ini benar
const Outlet = require('../models/outlet');
const User = require('../models/user');
const moment = require('moment-timezone'); // Import moment-timezone
// const { Sequelize } = require('sequelize'); // Untuk menggunakan Sequelize literal (NOW)

// Mendapatkan semua data kasir
exports.getAllKasir = async (req, res) => {
  try {
    const kasirList = await Kasir.findAll({
      include: [
        {
          model: Outlet,
          attributes: ['id', 'name'], // Hanya ambil atribut yang diperlukan
        },
        {
          model: User,
          attributes: ['id', 'name', 'role'], // Hanya ambil atribut yang diperlukan
        },
      ],
    });

    // Format response untuk menyesuaikan dengan keinginan Anda
    const formattedKasirList = kasirList.map(kasir => ({
      kasir_id: kasir.id,
      outlet_id: kasir.Outlet.id,
      outlet_name: kasir.Outlet.name,
      user_id: kasir.User.id,
      user_name: kasir.User.name,
      user_role: kasir.User.role,
      uangModal: kasir.uangModal,
      waktuBuka: moment(kasir.waktuBuka).tz('Asia/Jakarta').format('DD-MM-YY HH:mm:ss'), // Format dengan timezone Asia/Jakarta
      waktuTutup: kasir.waktuTutup ? moment(kasir.waktuTutup).tz('Asia/Jakarta').format('DD-MM-YY HH:mm:ss') : null, // Format waktuTutup jika ada
      itemTerjual: kasir.itemTerjual,
      totalKotor: kasir.totalKotor,
      totalBersih: kasir.totalBersih,
    }));

    res.status(200).json(formattedKasirList);
  } catch (error) {
    console.error('Error fetching kasir data:', error);
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan data kasir berdasarkan ID
// exports.getKasirById = async (req, res) => {
//   const { id } = req.params; // Ambil ID dari parameter request
//   try {
//     const kasir = await Kasir.findByPk(id, {
//       include: [
//         {
//           model: Outlet,
//           attributes: ['id', 'name'], // Hanya ambil atribut yang diperlukan
//         },
//         {
//           model: User,
//           attributes: ['id', 'name', 'role'], // Hanya ambil atribut yang diperlukan
//         },
//       ],
//     });

//     // Periksa apakah kasir ditemukan
//     if (!kasir) {
//       return res.status(404).json({ message: 'Kasir not found' });
//     }

//     // Format response untuk menyesuaikan dengan keinginan Anda
//     const formattedKasir = {
//       kasir_id: kasir.id,
//       outlet_id: kasir.Outlet.id,
//       outlet_name: kasir.Outlet.name,
//       user_id: kasir.User.id,
//       user_name: kasir.User.name,
//       user_role: kasir.User.role,
//       uangModal: kasir.uangModal,
//       waktuBuka: moment(kasir.waktuBuka).tz('Asia/Jakarta').format('DD-MM-YY HH:mm:ss'), // Format dengan timezone Asia/Jakarta
//       waktuTutup: kasir.waktuTutup ? moment(kasir.waktuTutup).tz('Asia/Jakarta').format('DD-MM-YY HH:mm:ss') : null, // Format waktuTutup jika ada
//       itemTerjual: kasir.itemTerjual,
//       totalKotor: kasir.totalKotor,
//       totalBersih: kasir.totalBersih,
//     };

//     res.status(200).json(formattedKasir);
//   } catch (error) {
//     console.error('Error fetching kasir data by ID:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// POST /api/kasir
// Menambahkan kasir baru
exports.createKasir = async (req, res) => {
  const { outlet_id, user_id, uangModal } = req.body;

  try {
    // Validasi input
    if (!outlet_id || !user_id) {
      return res.status(400).json({ error: 'Field harus diisi' });
    }

    // Format waktuBuka dan waktuTutup ke format datetime MySQL
    // const formattedWaktuBuka = moment(waktuBuka).format('DD-MM-YYY HH:mm:ss');
    // const formattedWaktuTutup = moment(waktuTutup).format('DD-MM-YYY HH:mm:ss');

    // Cek apakah outlet dan user yang diberikan ada
    const outlet = await Outlet.findByPk(outlet_id);
    const user = await User.findByPk(user_id);

    if (!outlet) {
      return res.status(404).json({ error: 'Outlet tidak ditemukan' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }

    // Membuat kasir baru
    const newKasir = await Kasir.create({
      outlet_id,
      user_id,
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

// Mendapatkan data kasir berdasarkan outlet_id
exports.getKasirById = async (req, res) => {
  const { id } = req.params; // Ambil ID outlet dari parameter request
  try {
    const kasir = await Kasir.findOne({
      where: {
        outlet_id: id, // Kondisi untuk mendapatkan kasir berdasarkan outlet_id
      },
      include: [
        {
          model: Outlet,
          attributes: ['id', 'name'], // Hanya ambil atribut yang diperlukan
        },
        {
          model: User,
          attributes: ['id', 'name', 'role'], // Hanya ambil atribut yang diperlukan
        },
      ],
    });

    // Periksa apakah kasir ditemukan
    if (!kasir) {
      return res.status(404).json({ message: 'Kasir not found for this outlet' });
    }

    // Format response untuk menyesuaikan dengan keinginan Anda
    const formattedKasir = {
      kasir_id: kasir.id,
      outlet_id: kasir.Outlet.id,
      outlet_name: kasir.Outlet.name,
      user_id: kasir.User.id,
      user_name: kasir.User.name,
      user_role: kasir.User.role,
      uangModal: kasir.uangModal,
      waktuBuka: moment(kasir.waktuBuka).tz('Asia/Jakarta').format('DD-MM-YY HH:mm:ss'), // Format dengan timezone Asia/Jakarta
      waktuTutup: kasir.waktuTutup ? moment(kasir.waktuTutup).tz('Asia/Jakarta').format('DD-MM-YY HH:mm:ss') : null, // Format waktuTutup jika ada
      itemTerjual: kasir.itemTerjual,
      totalKotor: kasir.totalKotor,
      totalBersih: kasir.totalBersih,
    };

    res.status(200).json(formattedKasir);
  } catch (error) {
    console.error('Error fetching kasir data by outlet ID:', error);
    res.status(500).json({ error: error.message });
  }
};