const Transaksi = require('../models/transaksi');
const sequelize = require('../config/database');

exports.createTransaksi = async (req, res) => {
  try {
    const { outlet_id, kasir_id, tipe_order, name, catatan, tipe_bayar, ket_bayar, sub_total, total, bayar, kembalian } = req.body;

    // Buat transaksi baru
    const newTransaksi = await Transaksi.create({
      outlet_id: outlet_id,
      kasir_id: kasir_id,
      tipe_order: tipe_order,
      name: name || undefined, // Gunakan default jika name kosong, hook akan mengisi
      catatan: catatan,
      tipe_bayar: tipe_bayar,
      ket_bayar: ket_bayar,
      sub_total: sub_total,
      total: total,
      bayar: bayar,
      kembalian: kembalian,
    });

    // Kirim respon berhasil dengan data transaksi baru
    return res.status(201).json({
      success: true,
      message: 'Transaksi berhasil dibuat',
      data: newTransaksi,
    });
  } catch (error) {
    console.error('Error creating transaksi:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat membuat transaksi',
      error: error.message,
    });
  }
};


exports.updateTransaksi = async (req, res) => {
  const { id } = req.params;
  const { outlet_id, kasir_id, tipe_order, name, catatan, tipe_bayar, ket_bayar, sub_total, total, bayar, kembalian } = req.body;

  try {
    // Cari transaksi berdasarkan id
    const transaksi = await Transaksi.findByPk(id);

    if (!transaksi) {
      return res.status(404).json({
        success: false,
        message: `Transaksi dengan id ${id} tidak ditemukan`,
      });
    }

    // Perbarui transaksi dengan data baru
    await transaksi.update({
      outlet_id: outlet_id,
      kasir_id: kasir_id,
      tipe_order: tipe_order,
      name: name || undefined, // Gunakan default jika name kosong
      catatan: catatan,
      tipe_bayar: tipe_bayar,
      ket_bayar: ket_bayar,
      sub_total: sub_total,
      total: total,
      bayar: bayar,
      kembalian: kembalian,
    });

    // Kirim respon berhasil
    return res.status(200).json({
      success: true,
      message: `Transaksi dengan id ${id} berhasil diperbarui`,
      data: transaksi,
    });
  } catch (error) {
    console.error('Error updating transaksi:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memperbarui transaksi',
      error: error.message,
    });
  }
};



exports.deleteTransaksi = async (req, res) => {
  const { id } = req.params;

  try {
    // Cari transaksi berdasarkan ID
    const transaksi = await Transaksi.findByPk(id);

    if (!transaksi) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    // Melakukan soft delete
    await transaksi.destroy();

    res.status(200).json({
      message: "Transaksi berhasil dihapus (soft delete)",
      data: transaksi,
    });
  } catch (error) {
    console.error("Error deleting transaksi:", error);
    res.status(500).json({ message: "Terjadi kesalahan internal" });
  }
};


exports.readTransaksi = async (req, res) => {
  try {
    // Query SQL untuk mengambil data transaksi utama
    const queryTransaksi = `
      SELECT 
        t.id AS transaksi_id,
        t.outlet_id,
        t.kasir_id,
        t.tipe_order,
        t.name AS transaksi_name,
        t.catatan,
        t.tipe_bayar,
        t.ket_bayar,
        t.sub_total,
        t.total,
        t.bayar,
        t.kembalian,
        t.createdAt,
        o.nama AS outlet_name,
        u.name AS kasir_name
      FROM 
        transaksis AS t
      JOIN 
        outlets AS o ON t.outlet_id = o.id
      JOIN 
        users AS u ON t.kasir_id = u.id
      WHERE
         t.deletedAt IS NULL
    `;

    // Jalankan query untuk mendapatkan data transaksi
    const [transaksis] = await sequelize.query(queryTransaksi);

    // Loop melalui setiap transaksi untuk mengambil data detail_transaksi, detail_pajak, dan detail_diskon
    for (const transaksi of transaksis) {
      // Query untuk mengambil detail transaksi
      const queryDetailTransaksi = `
        SELECT 
          dt.id,
          dt.transaksi_id,
          dt.product_id,
          p.name AS product_name,
          p.price AS product_price,
          dt.stok 
        FROM 
          detail_transaksis AS dt
        JOIN 
          products AS p ON dt.product_id = p.id
        WHERE 
          dt.transaksi_id = ${transaksi.transaksi_id}
      `;
      const [detailTransaksis] = await sequelize.query(queryDetailTransaksi);

      // Query untuk mengambil detail pajak
      const queryDetailPajak = `
        SELECT 
          dp.id,
          dp.transaksi_id,
          dp.pajak_id,
          pj.name AS pajak_name,
          dp.harga
        FROM 
          detail_pajaks AS dp
        JOIN 
          pajaks AS pj ON dp.pajak_id = pj.id
        WHERE 
          dp.transaksi_id = ${transaksi.transaksi_id}
      `;
      const [detailPajaks] = await sequelize.query(queryDetailPajak);

      // Query untuk mengambil detail diskon
      const queryDetailDiskon = `
        SELECT 
          dd.id,
          dd.transaksi_id,
          dd.diskon_id,
          d.name AS diskon_name,
          dd.harga
        FROM 
          detail_diskons AS dd
        JOIN 
          diskons AS d ON dd.diskon_id = d.id
        WHERE 
          dd.transaksi_id = ${transaksi.transaksi_id}
      `;
      const [detailDiskons] = await sequelize.query(queryDetailDiskon);

      // Cek apakah detail_transaksis, detail_pajaks, dan detail_diskons kosong
      transaksi.detailtransaksi = detailTransaksis.length === 0 ? {} : detailTransaksis;
      transaksi.detailpajaks = detailPajaks.length === 0 ? {} : detailPajaks;
      transaksi.detaildiskons = detailDiskons.length === 0 ? {} : detailDiskons;
    }

    // Mengembalikan respons dengan data transaksi, detail_transaksi, detail_pajak, dan detail_diskon
    return res.status(200).json({
      success: true,
      message: 'Data transaksi berhasil diambil',
      data: transaksis,
    });
  } catch (error) {
    console.error('Error reading transaksi:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data transaksi',
      error: error.message,
    });
  }
};


exports.readTransaksibyid = async (req, res) => {
  try {
    const { id } = req.params;
    // Query SQL untuk mengambil data transaksi utama
    const queryTransaksi = `
      SELECT 
        t.id AS transaksi_id,
        t.outlet_id,
        t.kasir_id,
        t.tipe_order,
        t.name AS transaksi_name,
        t.catatan,
        t.tipe_bayar,
        t.ket_bayar,
        t.sub_total,
        t.total,
        t.bayar,
        t.kembalian,
        t.createdAt,
        o.nama AS outlet_name,
        u.name AS kasir_name
      FROM 
        transaksis AS t
      JOIN 
        outlets AS o ON t.outlet_id = o.id
      JOIN 
        users AS u ON t.kasir_id = u.id
      WHERE
         t.id = ${id}  -- Filter berdasarkan ID transaksi
    `;

    // Jalankan query untuk mendapatkan data transaksi
    const [transaksis] = await sequelize.query(queryTransaksi);

    // Loop melalui setiap transaksi untuk mengambil data detail_transaksi, detail_pajak, dan detail_diskon
    for (const transaksi of transaksis) {
      // Query untuk mengambil detail transaksi
      const queryDetailTransaksi = `
        SELECT 
          dt.id,
          dt.transaksi_id,
          dt.product_id,
          p.name AS product_name,
          p.price AS product_price,
          dt.stok 
        FROM 
          detail_transaksis AS dt
        JOIN 
          products AS p ON dt.product_id = p.id
        WHERE 
          dt.transaksi_id = ${transaksi.transaksi_id}
      `;
      const [detailTransaksis] = await sequelize.query(queryDetailTransaksi);

      // Query untuk mengambil detail pajak
      const queryDetailPajak = `
        SELECT 
          dp.id,
          dp.transaksi_id,
          dp.pajak_id,
          pj.name AS pajak_name,
          dp.harga
        FROM 
          detail_pajaks AS dp
        JOIN 
          pajaks AS pj ON dp.pajak_id = pj.id
        WHERE 
          dp.transaksi_id = ${transaksi.transaksi_id}
      `;
      const [detailPajaks] = await sequelize.query(queryDetailPajak);

      // Query untuk mengambil detail diskon
      const queryDetailDiskon = `
        SELECT 
          dd.id,
          dd.transaksi_id,
          dd.diskon_id,
          d.name AS diskon_name,
          dd.harga
        FROM 
          detail_diskons AS dd
        JOIN 
          diskons AS d ON dd.diskon_id = d.id
        WHERE 
          dd.transaksi_id = ${transaksi.transaksi_id}
      `;
      const [detailDiskons] = await sequelize.query(queryDetailDiskon);

      // Cek apakah detail_transaksis, detail_pajaks, dan detail_diskons kosong
      transaksi.detailtransaksi = detailTransaksis.length === 0 ? {} : detailTransaksis;
      transaksi.detailpajaks = detailPajaks.length === 0 ? {} : detailPajaks;
      transaksi.detaildiskons = detailDiskons.length === 0 ? {} : detailDiskons;
    }

    // Mengembalikan respons dengan data transaksi, detail_transaksi, detail_pajak, dan detail_diskon
    return res.status(200).json({
      success: true,
      message: 'Data transaksi berhasil diambil',
      data: transaksis,
    });
  } catch (error) {
    console.error('Error reading transaksi:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data transaksi',
      error: error.message,
    });
  }
};



exports.readTransaksiDate = async (req, res) => {
  try {
    const { status } = req.query; // Ambil parameter status dari query

    // Inisialisasi query SQL dasar
    let queryTransaksi = `
      SELECT 
        t.id AS transaksi_id,
        t.outlet_id,
        t.kasir_id,
        t.tipe_order,
        t.name AS transaksi_name,
        t.catatan,
        t.tipe_bayar,
        t.ket_bayar,
        t.sub_total,
        t.total,
        t.bayar,
        t.kembalian,
        t.createdAt,
        o.nama AS outlet_name,
        u.name AS kasir_name
      FROM 
        transaksis AS t
      JOIN 
        outlets AS o ON t.outlet_id = o.id
      JOIN 
        users AS u ON t.kasir_id = u.id
      WHERE  
        t.deletedAt IS NULL
    `;

    // Tambahkan kondisi untuk status 'active' atau 'history'
    if (status === 'active') {
      queryTransaksi += ' AND DATE(t.createdAt) = DATE(NOW())';
    }

    // Jalankan query untuk mendapatkan data transaksi
    const [transaksis] = await sequelize.query(queryTransaksi);

    // Loop melalui setiap transaksi untuk mengambil data detail_transaksi, detail_pajak, dan detail_diskon
    for (const transaksi of transaksis) {
      // Query untuk mengambil detail transaksi
      const queryDetailTransaksi = `
        SELECT 
          dt.id,
          dt.transaksi_id,
          dt.product_id,
          p.name AS product_name,
          p.price AS product_price,
          dt.stok 
        FROM 
          detail_transaksis AS dt
        JOIN 
          products AS p ON dt.product_id = p.id
        WHERE 
          dt.transaksi_id = ${transaksi.transaksi_id}
      `;
      const [detailTransaksis] = await sequelize.query(queryDetailTransaksi);

      // Query untuk mengambil detail pajak
      const queryDetailPajak = `
        SELECT 
          dp.id,
          dp.transaksi_id,
          dp.pajak_id,
          pj.name AS pajak_name,
          dp.harga
        FROM 
          detail_pajaks AS dp
        JOIN 
          pajaks AS pj ON dp.pajak_id = pj.id
        WHERE 
          dp.transaksi_id = ${transaksi.transaksi_id}
      `;
      const [detailPajaks] = await sequelize.query(queryDetailPajak);

      // Query untuk mengambil detail diskon
      const queryDetailDiskon = `
        SELECT 
          dd.id,
          dd.transaksi_id,
          dd.diskon_id,
          d.name AS diskon_name,
          dd.harga
        FROM 
          detail_diskons AS dd
        JOIN 
          diskons AS d ON dd.diskon_id = d.id
        WHERE 
          dd.transaksi_id = ${transaksi.transaksi_id}
      `;
      const [detailDiskons] = await sequelize.query(queryDetailDiskon);

      // Cek apakah detail_transaksis, detail_pajaks, dan detail_diskons kosong
      transaksi.detailtransaksi = detailTransaksis.length === 0 ? [] : detailTransaksis;
      transaksi.detailpajaks = detailPajaks.length === 0 ? [] : detailPajaks;
      transaksi.detaildiskons = detailDiskons.length === 0 ? [] : detailDiskons;
    }

    // Mengembalikan respons dengan data transaksi, detail_transaksi, detail_pajak, dan detail_diskon
    return res.status(200).json({
      success: true,
      message: 'Data transaksi berhasil diambil',
      data: transaksis,
    });
  } catch (error) {
    console.error('Error reading transaksi:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data transaksi',
      error: error.message,
    });
  }
};
