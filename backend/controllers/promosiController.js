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
    
    // Menentukan hari yang valid
  const validDays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu', 'Setiap Hari'];

  // Memeriksa apakah pilihHari ada dalam request dan tidak kosong
  if (!pilihHari) {
    return res.status(400).json({ error: "PilihHari tidak boleh kosong." });
  }

  // Mengubah pilihHari menjadi array, jika dalam bentuk string yang dipisahkan koma
  const pilihHariArray = pilihHari.split(',');

  // Memeriksa apakah semua nilai dalam pilihHari valid
  const invalidDays = pilihHariArray.filter(hari => !validDays.includes(hari));


  // Jika ada hari yang tidak valid, kembalikan error
  if (invalidDays.length > 0) {
    return res.status(400).json({
      error: `Hari yang dipilih tidak valid: ${invalidDays.join(', ')}`
    });
  }

  // Logika untuk menangani "Setiap Hari"
  if (pilihHariArray.includes('Setiap Hari')) {
    // Jika "Setiap Hari" ada dalam array, maka hanya simpan "Setiap Hari"
    return Promosi.create({
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
      pilihHari: ['Setiap Hari']  // Simpan hanya "Setiap Hari"
    })
      .then(promosi => res.status(201).json(promosi))
      .catch(err => res.status(400).json({ error: err.message }));
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
      pilihHari: pilihHariArray // Pastikan pilihHari disimpan sebagai array
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
    try {
      // Query SQL untuk mengambil data promosi
      const queryPromosi = `
        SELECT 
    promosis.id AS id_promosi,
    promosis.namaPromosi AS nama_promosi,
    promosis.deskripsi AS deskripsi_promosi,
    promosis.tipeAktivasi AS tipe_aktivasi,
    promosis.minimalBeli AS minimal_beli,
    promosis.kategori AS kategori_promosi,
    promosis.nilaiKategori AS nilai_kategori,
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
    -- Pindahkan outletsId di sini, setelah durasi dan sebelum jam_mulai
    GROUP_CONCAT(CONCAT('"', promosisoutlets.outletsId, '"')) AS outletsId,
    promosis.jamMulai AS jam_mulai,
    promosis.jamBerakhir AS jam_berakhir,
    promosis.pilihHari AS pilihan_hari,
    -- Format createdAt dan updatedAt agar sesuai dengan database
    DATE_FORMAT(promosis.createdAt, '%Y-%m-%d %H:%i:%s') AS createdAt,
    DATE_FORMAT(promosis.updatedAt, '%Y-%m-%d %H:%i:%s') AS updatedAt,
    promosis.deletedAt
    FROM 
        promosis
    LEFT JOIN 
        promosisoutlets ON promosis.id = promosisoutlets.promosisId
    WHERE 
          promosis.deletedAt IS NULL
    GROUP BY 
        promosis.id;
      `;
  
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
          -- Pindahkan outletsId di sini, setelah durasi dan sebelum jam_mulai
          GROUP_CONCAT(CONCAT('"', promosisoutlets.outletsId, '"')) AS outletsId,
          promosis.jamMulai AS jam_mulai,
          promosis.jamBerakhir AS jam_berakhir,
          promosis.pilihHari AS pilihan_hari,
          -- Format createdAt dan updatedAt agar sesuai dengan database
          DATE_FORMAT(promosis.createdAt, '%Y-%m-%d %H:%i:%s') AS createdAt,
          DATE_FORMAT(promosis.updatedAt, '%Y-%m-%d %H:%i:%s') AS updatedAt,
          promosis.deletedAt
        FROM 
          promosis
        LEFT JOIN 
          promosisoutlets ON promosis.id = promosisoutlets.promosisId
        WHERE 
          promosis.id = :id  -- Filter berdasarkan ID yang diterima
          AND promosis.deletedAt IS NULL
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
      const { id } = req.params;  // Ambil ID dari URL
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
  
      // Menentukan hari yang valid
      const validDays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu', 'Setiap Hari'];
  
      // Memeriksa apakah pilihHari ada dalam request dan tidak kosong
      if (!pilihHari) {
        return res.status(400).json({ error: "PilihHari tidak boleh kosong." });
      }
  
      // Mengubah pilihHari menjadi array, jika dalam bentuk string yang dipisahkan koma
      const pilihHariArray = pilihHari.split(',');
  
      // Memeriksa apakah semua nilai dalam pilihHari valid
      const invalidDays = pilihHariArray.filter(hari => !validDays.includes(hari));
  
      // Jika ada hari yang tidak valid, kembalikan error
      if (invalidDays.length > 0) {
        return res.status(400).json({
          error: `Hari yang dipilih tidak valid: ${invalidDays.join(', ')}`
        });
      }
  
      // Logika untuk menangani "Setiap Hari"
      if (pilihHariArray.includes('Setiap Hari')) {
        // Jika "Setiap Hari" ada dalam array, maka hanya simpan "Setiap Hari"
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
            pilihHari: ['Setiap Hari']  // Simpan hanya "Setiap Hari"
          },
          {
            where: { id }  // Mencari berdasarkan ID
          }
        );
  
        // Jika data berhasil diupdate, kembalikan hasil update
        if (updatedPromosi[0] === 1) {
          const promosi = await Promosi.findByPk(id); // Mendapatkan data yang baru diupdate
          return res.status(200).json(promosi);
        } else {
          return res.status(404).json({ error: "Promosi tidak ditemukan" });
        }
      }
  
      // Membuat entri promosi baru untuk selain "Setiap Hari"
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
          pilihHari: pilihHariArray // Pastikan pilihHari disimpan sebagai array
        },
        {
          where: { id }  // Mencari berdasarkan ID
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
      await promosi.destroy();
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  