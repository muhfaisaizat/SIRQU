const Promosi = require('../models/promosis');
const sequelize = require('../config/database');

// Create a new Promosi
exports.createPromosi = async (req, res) => {
  try {
    const {
      namaPromosi,
      deskripsi,
      tipeAktivasi,
      minimalBeli,
      kategori,
      nilaiKategori,
      tanggalMulai,
      tanggalBerakhir,
      jamMulai,
      jamBerakhir,
      pilihHari,
    } = req.body;

    // Daftar hari valid
    const validDays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu', 'Setiap Hari'];

    // Memeriksa apakah pilihHari ada dalam request dan tidak kosong
    if (!pilihHari) {
      return res.status(400).json({ error: "PilihHari tidak boleh kosong." });
    }

    // Mengubah pilihHari menjadi array jika dalam bentuk string yang dipisahkan koma
    const pilihHariArray = pilihHari.split(',').map(hari => hari.trim());

    // Memeriksa apakah semua nilai dalam pilihHari valid
    const invalidDays = pilihHariArray.filter(hari => !validDays.includes(hari));

    // Jika ada hari yang tidak valid, kembalikan error
    if (invalidDays.length > 0) {
      return res.status(400).json({
        error: `Hari yang dipilih tidak valid: ${invalidDays.join(', ')}`
      });
    }

    // Menentukan semua hari dalam seminggu
    const allDays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

    // Logika untuk menangani "Setiap Hari"
    if (pilihHariArray.includes('Setiap Hari') || allDays.every(day => pilihHariArray.includes(day))) {
      // Jika "Setiap Hari" ada dalam array ATAU semua hari dalam seminggu dipilih,
      // simpan sebagai "Setiap Hari" ditambah semua hari
      pilihHariArray.length = 0; // Kosongkan array
      pilihHariArray.push('Setiap Hari', ...allDays);
    }

    // Membuat entri promosi baru
    const promosi = await Promosi.create({
      namaPromosi,
      deskripsi,
      tipeAktivasi,
      minimalBeli,
      kategori,
      nilaiKategori,
      tanggalMulai,
      tanggalBerakhir,
      jamMulai,
      jamBerakhir,
      pilihHari: pilihHariArray, // Pastikan pilihHari disimpan sesuai logika
      status: 'Promosi Aktif',
    });

    // Mengembalikan response sukses dengan data promosi
    res.status(201).json(promosi);
  } catch (error) {
    // Mengembalikan response error jika terjadi masalah
    res.status(400).json({ error: error.message });
  }
};


// Mendapatkan semua promosi
exports.getAllPromosi = async (req, res) => {
  const { status } = req.query; 

    try {
      // Query SQL untuk mengambil data promosi
      let queryPromosi = `
        SELECT 
    promosis.id AS id_promosi,
    promosis.namaPromosi AS nama_promosi,
    promosis.deskripsi AS deskripsi_promosi,
    promosis.tipeAktivasi AS tipe_aktivasi,
    promosis.minimalBeli AS minimal_beli,
    promosis.kategori AS kategori_promosi,
    promosis.nilaiKategori AS nilai_kategori,
    promosis.status AS status,
    -- Cek status apakah harus menjadi "Promosi Tidak Aktif"
    CASE 
        WHEN NOW() > CONCAT(promosis.tanggalBerakhir, ' ', promosis.jamBerakhir) THEN 'Promosi Tidak Aktif'
        WHEN NOW() < CONCAT(promosis.tanggalMulai, ' ', promosis.jamMulai) THEN 'Promosi Tidak Aktif' 
        ELSE promosis.status
    END AS status,
    CASE 
        WHEN promosis.kategori = '%' THEN CONCAT(promosis.nilaiKategori, '%')   -- Jika kategori '%', tambahkan persen
        WHEN promosis.kategori = 'Rp' THEN CONCAT('Rp ', promosis.nilaiKategori) -- Jika kategori 'Rp', tambahkan 'Rp'
        ELSE promosis.nilaiKategori -- Untuk kategori lain, cukup tampilkan nilaiKategori
    END AS bonus,
    -- Format durasi: 28 Nov - 30 Des 2024
    CONCAT(
        DATE_FORMAT(promosis.tanggalMulai, '%d %b %Y'), ' - ', 
        DATE_FORMAT(promosis.tanggalBerakhir, '%d %b %Y')
    ) AS durasi,
    -- Mendapatkan detailOutlet sebagai JSON array
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', outlets.id,
            'id_promosi_outlet', promosisoutlets.id,
            'nama', outlets.nama,
            'position', outlets.position
        )
    ) AS detailOutlet,
    promosis.jamMulai AS jam_mulai,
    promosis.jamBerakhir AS jam_berakhir,
    promosis.pilihHari AS pilihan_hari,
    -- Format createdAt dan updatedAt agar sesuai dengan database
    DATE_FORMAT(promosis.createdAt, '%Y-%m-%d %H:%i:%s') AS createdAt,
    DATE_FORMAT(promosis.updatedAt, '%Y-%m-%d %H:%i:%s') AS updatedAt,
    DATE_FORMAT(promosis.deletedAt, '%Y-%m-%d %H:%i:%s') AS deletedAt
FROM 
    promosis
LEFT JOIN 
    promosisoutlets ON promosis.id = promosisoutlets.promosisId
LEFT JOIN
    outlets ON promosisoutlets.outletsId = outlets.id
      `;

      if (status === 'default') {
        queryPromosi += `WHERE promosis.deletedAt IS NULL AND promosisoutlets.deletedAt IS NULL GROUP BY promosis.id;`;
      }
      if (status === 'delete') {
        queryPromosi += `WHERE promosis.deletedAt IS NOT NULL AND promosisoutlets.deletedAt IS NULL GROUP BY promosis.id;`;
      }
      if (status === 'aktif') {
        queryPromosi += `WHERE promosis.status = 'Promosi Aktif' AND promosisoutlets.deletedAt IS NULL GROUP BY promosis.id;`;
      }
      if (status === 'expired') {
        queryPromosi += `WHERE promosis.status = 'Promosi Tidak Aktif' AND promosisoutlets.deletedAt IS NULL GROUP BY promosis.id;`;
      }
      if (status === 'all') {
        queryPromosi += `WHERE promosisoutlets.deletedAt IS NULL GROUP BY promosis.id;`;
      }
  
      // Jalankan query untuk mendapatkan data promosi
      const [promosi] = await sequelize.query(queryPromosi);
  
      // Mengembalikan respons dengan data promosi
      return res.status(200).json({
        success: true,
        message: 'Data promosi berhasil diambil',
        data: promosi,
      });
    } catch (error) {
      console.error('Error fetching promosis:', error);
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil data promosi',
        error: error.message,
      });
    }
  };
  
// Mendapatkan promosi berdasarkan ID
exports.getPromosiById = async (req, res) => {
    try {
      const { id } = req.params; // Mendapatkan ID dari parameter URL
      
      // Query SQL untuk mengambil data promosi berdasarkan ID
      const queryPromosiById = `
       SELECT 
    promosis.id AS id_promosi,
    promosis.namaPromosi AS nama_promosi,
    promosis.deskripsi AS deskripsi_promosi,
    promosis.tipeAktivasi AS tipe_aktivasi,
    promosis.minimalBeli AS minimal_beli,
    promosis.kategori AS kategori_promosi,
    promosis.nilaiKategori AS nilai_kategori,
    promosis.status AS status,
    -- Cek status apakah harus menjadi "Promosi Tidak Aktif"
    CASE 
        WHEN NOW() > CONCAT(promosis.tanggalBerakhir, ' ', promosis.jamBerakhir) THEN 'Promosi Tidak Aktif'
        WHEN NOW() < CONCAT(promosis.tanggalMulai, ' ', promosis.jamMulai) THEN 'Promosi Tidak Aktif' 
        ELSE promosis.status
    END AS status,
    CASE 
        WHEN promosis.kategori = '%' THEN CONCAT(promosis.nilaiKategori, '%')   -- Jika kategori '%', tambahkan persen
        WHEN promosis.kategori = 'Rp' THEN CONCAT('Rp ', promosis.nilaiKategori) -- Jika kategori 'Rp', tambahkan 'Rp'
        ELSE promosis.nilaiKategori -- Untuk kategori lain, cukup tampilkan nilaiKategori
    END AS bonus,
    -- Format durasi: 28 Nov - 30 Des 2024
    CONCAT(
        DATE_FORMAT(promosis.tanggalMulai, '%d %b %Y'), ' - ', 
        DATE_FORMAT(promosis.tanggalBerakhir, '%d %b %Y')
    ) AS durasi,
    -- Mendapatkan detailOutlet sebagai JSON array
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', outlets.id,
            'id_promosi_outlet', promosisoutlets.id,
            'nama', outlets.nama,
            'position', outlets.position
        )
    ) AS detailOutlet,
    promosis.jamMulai AS jam_mulai,
    promosis.jamBerakhir AS jam_berakhir,
    promosis.pilihHari AS pilihan_hari,
    -- Format createdAt dan updatedAt agar sesuai dengan database
    DATE_FORMAT(promosis.createdAt, '%Y-%m-%d %H:%i:%s') AS createdAt,
    DATE_FORMAT(promosis.updatedAt, '%Y-%m-%d %H:%i:%s') AS updatedAt,
    DATE_FORMAT(promosis.deletedAt, '%Y-%m-%d %H:%i:%s') AS deletedAt
FROM 
    promosis
LEFT JOIN 
    promosisoutlets ON promosis.id = promosisoutlets.promosisId
LEFT JOIN
    outlets ON promosisoutlets.outletsId = outlets.id
WHERE
    promosis.id = :id AND promosisoutlets.deletedAt IS NULL
GROUP BY 
    promosis.id;
     `;
    
      // Jalankan query untuk mendapatkan data promosi berdasarkan ID
      const [promosi] = await sequelize.query(queryPromosiById, {
        replacements: { id }, // Mengganti :id dengan nilai id yang diterima dari parameter URL
      });
  
      // Cek jika promosi ditemukan
      if (!promosi || promosi.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Promosi tidak ditemukan',
        });
      }
  
      // Mengembalikan respons dengan data promosi
      return res.status(200).json({
        success: true,
        message: 'Data promosi berhasil diambil',
        data: promosi[0],  // Mengambil data promosi pertama karena hasil query adalah array
      });
    } catch (error) {
      console.error('Error fetching promosi by id:', error);
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil data promosi',
        error: error.message,
      });
    }
  };
  
  // Update an existing Promosi
exports.updatePromosi = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari URL
    const {
      namaPromosi,
      deskripsi,
      tipeAktivasi,
      minimalBeli,
      kategori,
      nilaiKategori,
      tanggalMulai,
      tanggalBerakhir,
      jamMulai,
      jamBerakhir,
      pilihHari,
    } = req.body;

    // Daftar hari valid
    const validDays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu', 'Setiap Hari'];

    // Memeriksa apakah pilihHari ada dalam request dan tidak kosong
    if (!pilihHari) {
      return res.status(400).json({ error: "PilihHari tidak boleh kosong." });
    }

    // Mengubah pilihHari menjadi array jika dalam bentuk string yang dipisahkan koma
    const pilihHariArray = pilihHari.split(',').map(hari => hari.trim());

    // Memeriksa apakah semua nilai dalam pilihHari valid
    const invalidDays = pilihHariArray.filter(hari => !validDays.includes(hari));

    // Jika ada hari yang tidak valid, kembalikan error
    if (invalidDays.length > 0) {
      return res.status(400).json({
        error: `Hari yang dipilih tidak valid: ${invalidDays.join(', ')}`
      });
    }

    // Menentukan semua hari dalam seminggu
    const allDays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

    // Logika untuk menangani "Setiap Hari"
    if (pilihHariArray.includes('Setiap Hari') || allDays.every(day => pilihHariArray.includes(day))) {
      // Jika "Setiap Hari" ada dalam array ATAU semua hari dalam seminggu dipilih,
      // simpan sebagai "Setiap Hari" ditambah semua hari
      pilihHariArray.length = 0; // Kosongkan array
      pilihHariArray.push('Setiap Hari', ...allDays);
    }

    // Update entri promosi berdasarkan ID
    const updatedPromosi = await Promosi.update(
      {
        namaPromosi,
        deskripsi,
        tipeAktivasi,
        minimalBeli,
        kategori,
        nilaiKategori,
        tanggalMulai,
        tanggalBerakhir,
        jamMulai,
        jamBerakhir,
        pilihHari: pilihHariArray, // Pastikan pilihHari disimpan sesuai logika
      },
      {
        where: { id }, // Mencari berdasarkan ID
      }
    );

    // Jika data berhasil diupdate, kembalikan hasil update
    if (updatedPromosi[0] === 1) {
      const promosi = await Promosi.findByPk(id); // Mendapatkan data yang baru diupdate
      return res.status(200).json(promosi);
    } else {
      return res.status(404).json({ error: "Promosi tidak ditemukan" });
    }
  } catch (error) {
    // Mengembalikan response error jika terjadi masalah
    return res.status(400).json({ error: error.message });
  }
};

  
  // Soft delete promosi
exports.deletePromosi = async (req, res) => {
  try {
    const promosi = await Promosi.findByPk(req.params.id);
    if (!promosi) {
      return res.status(404).json({ error: "Promosi not found" });
    }

    // Update status menjadi "Promosi Tidak Aktif"
    promosi.status = "Promosi Tidak Aktif";
    await promosi.save(); // Simpan perubahan status ke database

    // Soft delete promosi
    await promosi.destroy();

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
