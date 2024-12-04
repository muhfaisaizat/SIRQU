const sequelize = require('../config/database');
const { QueryTypes } = require('sequelize');


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
    } else if (!start_date && !end_date) {
      // Jika start_date dan end_date null, tidak ada filter tanggal (tampilkan semua data)
      queryTransaksi += ``; // Tidak menambahkan filter
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

// Get Card Penjualan by Outlet ID
// Get Card Penjualan by Outlet ID
exports.getCardPenjualan = async (req, res) => {
  try {
    const { outletId } = req.params; // Pastikan outletsId dikirim sebagai parameter
    const { start_date, end_date } = req.query;
    
    const query = `
      SELECT 
    -- Total Penjualan (Total Sales)
    SUM(transaksis.total) AS Total_Penjualan,

    -- Produk Terjual (Total Products Sold)
    SUM(detailtransaksis.stok) AS Produk_Terjual,

    -- Pembayaran Paling Frequent (Most Frequent Payment Type)
    (SELECT tipeBayar
     FROM transaksis
     WHERE deletedAt IS NULL
     AND outletsId = :outletId
     GROUP BY tipeBayar
     ORDER BY COUNT(tipeBayar) DESC
     LIMIT 1) AS Pembayaran_Paling_Sering,

    -- Product Terlaris (Best-Selling Product)
    (SELECT products.name
     FROM detailtransaksis
     JOIN products ON detailtransaksis.productsId = products.id
     WHERE detailtransaksis.transaksisId IN (
         SELECT id FROM transaksis WHERE outletsId = :outletId AND deletedAt IS NULL
     )
     GROUP BY detailtransaksis.productsId
     ORDER BY SUM(detailtransaksis.stok) DESC
     LIMIT 1) AS Product_Terlaris,

    -- Percentage Growth with +/- (Total Sales)
    CASE
        WHEN SUM(CASE 
            WHEN transaksis.createdAt >= CURDATE() - INTERVAL 1 DAY 
            AND transaksis.deletedAt IS NULL
            THEN transaksis.total 
            ELSE 0 
        END) > 0 
        THEN CONCAT(
            CASE 
                WHEN SUM(CASE 
                    WHEN transaksis.createdAt >= CURDATE() 
                    AND transaksis.deletedAt IS NULL
                    THEN transaksis.total 
                    ELSE 0 
                END) - SUM(CASE 
                    WHEN transaksis.createdAt >= CURDATE() - INTERVAL 1 DAY 
                    AND transaksis.deletedAt IS NULL
                    THEN transaksis.total 
                    ELSE 0 
                END) >= 0 THEN '+' 
                ELSE '-' 
            END,
            ROUND(
                LEAST(
                    ABS(SUM(CASE 
                        WHEN transaksis.createdAt >= CURDATE() 
                        AND transaksis.deletedAt IS NULL
                        THEN transaksis.total 
                        ELSE 0 
                    END) - SUM(CASE 
                        WHEN transaksis.createdAt >= CURDATE() - INTERVAL 1 DAY 
                        AND transaksis.deletedAt IS NULL
                        THEN transaksis.total 
                        ELSE 0 
                    END)) 
                    / SUM(CASE 
                        WHEN transaksis.createdAt >= CURDATE() - INTERVAL 1 DAY 
                        AND transaksis.deletedAt IS NULL
                        THEN transaksis.total 
                        ELSE 0 
                    END) * 100,
                    100
                ), 0),
            '%'
        )
        ELSE NULL 
    END AS Banding_Persentase_Total_Penjualan_Kemarin,

    -- Percentage Growth with +/- (Products Sold)
    CASE
        WHEN SUM(CASE 
            WHEN transaksis.createdAt >= CURDATE() - INTERVAL 1 DAY 
            AND transaksis.deletedAt IS NULL
            THEN detailtransaksis.stok 
            ELSE 0 
        END) > 0 
        THEN CONCAT(
            CASE 
                WHEN SUM(CASE 
                    WHEN transaksis.createdAt >= CURDATE() 
                    AND transaksis.deletedAt IS NULL
                    THEN detailtransaksis.stok 
                    ELSE 0 
                END) - SUM(CASE 
                    WHEN transaksis.createdAt >= CURDATE() - INTERVAL 1 DAY 
                    AND transaksis.deletedAt IS NULL
                    THEN detailtransaksis.stok 
                    ELSE 0 
                END) >= 0 THEN '+' 
                ELSE '-' 
            END,
            ROUND(
                LEAST(
                    ABS(SUM(CASE 
                        WHEN transaksis.createdAt >= CURDATE() 
                        AND transaksis.deletedAt IS NULL
                        THEN detailtransaksis.stok 
                        ELSE 0 
                    END) - SUM(CASE 
                        WHEN transaksis.createdAt >= CURDATE() - INTERVAL 1 DAY 
                        AND transaksis.deletedAt IS NULL
                        THEN detailtransaksis.stok 
                        ELSE 0 
                    END)) 
                    / SUM(CASE 
                        WHEN transaksis.createdAt >= CURDATE() - INTERVAL 1 DAY 
                        AND transaksis.deletedAt IS NULL
                        THEN detailtransaksis.stok 
                        ELSE 0 
                    END) * 100,
                    100
                ), 0),
            '%'
        )
        ELSE NULL 
    END AS Banding_Persentase_Produk_Terjual_Kemarin,
    
    -- Percentage Growth with +/- (Most Frequent Payment Type)
    CASE
        WHEN (SELECT COUNT(tipeBayar)
              FROM transaksis
              WHERE deletedAt IS NULL
              AND outletsId = :outletId
              AND tipeBayar = (SELECT tipeBayar
                               FROM transaksis
                               WHERE deletedAt IS NULL
                               AND outletsId = :outletId
                               GROUP BY tipeBayar
                               ORDER BY COUNT(tipeBayar) DESC
                               LIMIT 1)
        ) > 0 
        THEN CONCAT(
            CASE 
                WHEN (SELECT COUNT(tipeBayar)
                      FROM transaksis
                      WHERE deletedAt IS NULL
                      AND outletsId = :outletId
                      AND tipeBayar = (SELECT tipeBayar
                                       FROM transaksis
                                       WHERE deletedAt IS NULL
                                       AND outletsId = :outletId
                                       GROUP BY tipeBayar
                                       ORDER BY COUNT(tipeBayar) DESC
                                       LIMIT 1)
                ) - (SELECT COUNT(tipeBayar)
                      FROM transaksis
                      WHERE deletedAt IS NULL
                      AND outletsId = :outletId
                      AND tipeBayar = (SELECT tipeBayar
                                       FROM transaksis
                                       WHERE deletedAt IS NULL
                                       AND outletsId = :outletId
                                       GROUP BY tipeBayar
                                       ORDER BY COUNT(tipeBayar) DESC
                                       LIMIT 1)
                ) >= 0 THEN '+' 
                ELSE '-' 
            END,
        ROUND(
            LEAST(
                ABS(
                    (SELECT COUNT(tipeBayar)
                     FROM transaksis
                     WHERE deletedAt IS NULL
                     AND outletsId = :outletId
                     AND tipeBayar = (SELECT tipeBayar
                                      FROM transaksis
                                      WHERE deletedAt IS NULL
                                      AND outletsId = :outletId
                                      GROUP BY tipeBayar
                                      ORDER BY COUNT(tipeBayar) DESC
                                      LIMIT 1)
                    )
                    - (SELECT COUNT(tipeBayar)
                       FROM transaksis
                       WHERE deletedAt IS NULL
                       AND outletsId = :outletId
                       AND tipeBayar = (SELECT tipeBayar
                                        FROM transaksis
                                        WHERE deletedAt IS NULL
                                        AND outletsId = :outletId
                                        GROUP BY tipeBayar
                                        ORDER BY COUNT(tipeBayar) DESC
                                        LIMIT 1)
                    )
                ) / (SELECT COUNT(tipeBayar)
                      FROM transaksis
                      WHERE deletedAt IS NULL
                      AND outletsId = :outletId
                      AND tipeBayar = (SELECT tipeBayar
                                       FROM transaksis
                                       WHERE deletedAt IS NULL
                                       AND outletsId = :outletId
                                       GROUP BY tipeBayar
                                       ORDER BY COUNT(tipeBayar) DESC
                                       LIMIT 1)
                ) * 100,
                100
            ), 0), -- Maximum percentage capped at 100
        '%'
    )
    ELSE NULL 
    END AS Banding_Persentase_Pembayaran_Paling_Sering_Kemarin,

    -- Percentage Growth with +/- (Best-Selling Product)
    CASE
        WHEN (
            SELECT SUM(detailtransaksis.stok)
            FROM detailtransaksis
            JOIN products ON detailtransaksis.productsId = products.id
            WHERE detailtransaksis.transaksisId IN (
                SELECT id FROM transaksis WHERE outletsId = :outletId 
                AND deletedAt IS NULL
                AND transaksis.createdAt >= CURDATE() - INTERVAL 1 DAY
            )
            GROUP BY detailtransaksis.productsId
            ORDER BY SUM(detailtransaksis.stok) DESC
            LIMIT 1
        ) > 0
        THEN CONCAT(
            CASE 
                WHEN (
                    SELECT SUM(detailtransaksis.stok)
                    FROM detailtransaksis
                    JOIN products ON detailtransaksis.productsId = products.id
                    WHERE detailtransaksis.transaksisId IN (
                        SELECT id FROM transaksis WHERE outletsId = :outletId 
                        AND deletedAt IS NULL
                        AND transaksis.createdAt >= CURDATE()
                    )
                    GROUP BY detailtransaksis.productsId
                    ORDER BY SUM(detailtransaksis.stok) DESC
                    LIMIT 1
                ) - (
                    SELECT SUM(detailtransaksis.stok)
                    FROM detailtransaksis
                    JOIN products ON detailtransaksis.productsId = products.id
                    WHERE detailtransaksis.transaksisId IN (
                        SELECT id FROM transaksis WHERE outletsId = :outletId 
                        AND deletedAt IS NULL
                        AND transaksis.createdAt >= CURDATE() - INTERVAL 1 DAY
                    )
                    GROUP BY detailtransaksis.productsId
                    ORDER BY SUM(detailtransaksis.stok) DESC
                    LIMIT 1
                ) >= 0 THEN '+' 
                ELSE '-' 
            END,
            ROUND(
                LEAST(
                    ABS(
                        (
                            SELECT SUM(detailtransaksis.stok)
                            FROM detailtransaksis
                            JOIN products ON detailtransaksis.productsId = products.id
                            WHERE detailtransaksis.transaksisId IN (
                                SELECT id FROM transaksis WHERE outletsId = :outletId 
                                AND deletedAt IS NULL
                                AND transaksis.createdAt >= CURDATE()
                            )
                            GROUP BY detailtransaksis.productsId
                            ORDER BY SUM(detailtransaksis.stok) DESC
                            LIMIT 1
                        ) - (
                            SELECT SUM(detailtransaksis.stok)
                            FROM detailtransaksis
                            JOIN products ON detailtransaksis.productsId = products.id
                            WHERE detailtransaksis.transaksisId IN (
                                SELECT id FROM transaksis WHERE outletsId = :outletId 
                                AND deletedAt IS NULL
                                AND transaksis.createdAt >= CURDATE() - INTERVAL 1 DAY
                            )
                            GROUP BY detailtransaksis.productsId
                            ORDER BY SUM(detailtransaksis.stok) DESC
                            LIMIT 1
                        )
                    ) / (
                        SELECT SUM(detailtransaksis.stok)
                        FROM detailtransaksis
                        JOIN products ON detailtransaksis.productsId = products.id
                        WHERE detailtransaksis.transaksisId IN (
                            SELECT id FROM transaksis WHERE outletsId = :outletId 
                            AND deletedAt IS NULL
                            AND transaksis.createdAt >= CURDATE() - INTERVAL 1 DAY
                        )
                        GROUP BY detailtransaksis.productsId
                        ORDER BY SUM(detailtransaksis.stok) DESC
                        LIMIT 1
                    ) * 100,
                    100
                ), 0), -- Maximum percentage capped at 100
            '%'
        )
        ELSE NULL
    END AS Banding_Persentase_Produk_Terlaris_Kemarin


FROM transaksis
JOIN detailtransaksis ON transaksis.id = detailtransaksis.transaksisId
WHERE transaksis.deletedAt IS NULL
AND transaksis.outletsId = :outletId
AND transaksis.createdAt >= CURDATE() - INTERVAL 1 DAY;

    `;

    // Jalankan query menggunakan Sequelize atau raw query
    const result = await sequelize.query(query, {
      replacements: { outletId },
      type: QueryTypes.SELECT,
    });

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error fetching card penjualan:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
};
