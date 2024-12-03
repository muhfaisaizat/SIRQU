const sequelize = require('../config/database');

exports.readPenjualan = async (req, res) => {
  try {
    const { id_outlet, start_date, end_date } = req.query; // Ambil parameter id_outlet, start_date, end_date dari query

    // Inisialisasi query SQL dasar
    let queryTransaksi = `
      SELECT 
        transaksis.id AS penjualan_id,
        transaksis.outletsId AS outlet_id,
        transaksis.kasirsId AS kasir_id,
        transaksis.userId AS user_id,
        transaksis.tipeOrder AS tipe_order,
        transaksis.name AS transaksi_name,
        transaksis.catatan,
        transaksis.tipeBayar AS tipe_bayar,
        transaksis.ketBayar AS ket_bayar,
        transaksis.subTotal AS sub_total,
        transaksis.total,
        transaksis.bayar,
        transaksis.kembalian,
        DATE_FORMAT(transaksis.createdAt, '%Y-%m-%d %H:%i:%s') AS createdAt,
        outlets.nama AS outlet_name,
        users.name AS kasir_name
      FROM 
        transaksis
      JOIN 
        outlets ON transaksis.outletsId = outlets.id
      JOIN 
        users ON transaksis.userId = users.id
      WHERE  
        transaksis.deletedAt IS NULL
    `;

    // Tambahkan kondisi untuk id_outlet jika ada
    if (id_outlet) {
      queryTransaksi += ` AND transaksis.outletsId = ${id_outlet}`;
    }

    // Tambahkan filter berdasarkan tanggal jika ada
    if (start_date && end_date) {
      queryTransaksi += ` AND DATE(transaksis.createdAt) BETWEEN '${start_date}' AND '${end_date}'`;
    } else {
      // Jika hanya ingin filter berdasarkan hari ini
      queryTransaksi += ` AND DATE(transaksis.createdAt) = DATE(NOW())`;
    }

    // Jalankan query untuk mendapatkan data transaksi
    const [transaksis] = await sequelize.query(queryTransaksi);

    // Periksa apakah data transaksi ditemukan
    if (!transaksis || transaksis.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data penjualan tidak ditemukan',
      });
    }

    // Loop melalui setiap transaksi untuk mengambil data detail_transaksi, detail_pajak, dan detail_diskon
    for (const transaksi of transaksis) {
      // Query untuk mengambil detail transaksi
      const queryDetailTransaksi = `
        SELECT 
          dt.id,
          dt.transaksisId AS transaksi_id,
          dt.productsId AS product_id,
          p.name AS product_name,
          p.price AS product_price,
          dt.stok 
        FROM 
          detailtransaksis AS dt
        JOIN 
          products AS p ON dt.productsId = p.id
        WHERE 
          dt.transaksisId = ${transaksi.penjualan_id}
      `;
      const [detailTransaksis] = await sequelize.query(queryDetailTransaksi);

      // Query untuk mengambil detail pajak
      const queryDetailPajak = `
         SELECT 
          dp.id,
          dp.transaksisId AS transaksi_id,
          dp.pajaksId AS pajak_id,
          pj.name AS pajak_name,
          dp.harga
        FROM 
          detailpajaks AS dp
        JOIN 
          pajaks AS pj ON dp.pajaksId = pj.id
        WHERE 
          dp.transaksisId = ${transaksi.penjualan_id}
      `;
      const [detailPajaks] = await sequelize.query(queryDetailPajak);

      // Query untuk mengambil detail diskon
      const queryDetailDiskon = `
       SELECT 
          dd.id,
          dd.transaksisId AS transaksi_id,
          dd.diskonsId AS diskon_id,
          d.namaPromosi AS diskon_name,
          dd.harga
        FROM 
          detaildiskons AS dd
        JOIN 
          promosis AS d ON dd.diskonsId = d.id
        WHERE 
          dd.transaksisId = ${transaksi.penjualan_id}
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
      message: 'Data penjualan berhasil diambil',
      data: transaksis,
    });
  } catch (error) {
    console.error('Error reading transaksi:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data penjualan',
      error: error.message,
    });
  }
};
