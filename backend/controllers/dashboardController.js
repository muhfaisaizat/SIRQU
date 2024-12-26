const { Op, Sequelize } = require("sequelize");
const Outlet = require("../models/outlets");
const Transaksi = require("../models/transaksis");
const Kasir = require("../models/kasirs");
const Transaksis = require("../models/transaksis");
const ProductOutlet = require("../models/productsOutlets");
const Product = require("../models/products");
const CategoriesOutlet = require("../models/categoriesOutlets");
const DetailTransaksi = require("../models/detailTransaksis");
const sequelize = require('../config/database');

const getDashboardData = async (req, res) => {
  try {
    const { outletsId } = req.params;
    const { periode } = req.query;

    // Validasi outlet
    const outlet = await Outlet.findByPk(outletsId);
    if (!outlet) {
      return res
        .status(404)
        .json({ success: false, message: "Outlet tidak ditemukan" });
    }

    // Periode waktu berdasarkan query
    let filterDate = {};
    let produkBaruFilter = {};
    const todayStart = Sequelize.literal("DATE(NOW())"); // Awal hari (00:00:00)
    const todayEnd = Sequelize.literal("DATE_ADD(DATE(NOW()), INTERVAL 1 DAY)"); // Akhir hari (23:59:59)
    const weekStart = Sequelize.literal(
      "DATE_SUB(CURRENT_DATE, INTERVAL WEEKDAY(CURRENT_DATE) DAY)"
    );
    const monthStart = Sequelize.literal(
      'DATE_FORMAT(CURRENT_DATE, "%Y-%m-01")'
    );
    const yearStart = Sequelize.literal(
      'DATE_FORMAT(CURRENT_DATE, "%Y-01-01")'
    );

    let totalDays = 1;
    switch (periode) {
      case "hari-ini":
        filterDate = {
          createdAt: { [Op.between]: [todayStart, todayEnd] },
        };
        produkBaruFilter = {
          createdAt: { [Op.between]: [todayStart, todayEnd] },
        };
        totalDays = 1;
        break;
      case "minggu-ini":
        filterDate = { createdAt: { [Op.gte]: weekStart } };
        produkBaruFilter = {
          createdAt: { [Op.gte]: weekStart, [Op.lt]: todayEnd },
        };
        totalDays = 7;
        break;
      case "bulan-ini":
        filterDate = { createdAt: { [Op.gte]: monthStart } };
        produkBaruFilter = {
          createdAt: { [Op.gte]: monthStart, [Op.lt]: todayEnd },
        };
        totalDays = new Date().getDate();
        break;
      case "tahun-ini":
        filterDate = { createdAt: { [Op.gte]: yearStart } };
        produkBaruFilter = {
          createdAt: { [Op.gte]: yearStart, [Op.lt]: todayEnd },
        };
        totalDays = Math.ceil(
          (new Date() - new Date(new Date().getFullYear(), 0, 1)) /
            (1000 * 60 * 60 * 24)
        );
        break;
      default:
        filterDate = {};
        produkBaruFilter = {};
    }

    // Data berdasarkan periode
    const totalPendapatan = await Kasir.sum("totalBersih", {
      where: { outletsId, ...filterDate },
    });
    const totalTransaksi = await Kasir.sum("itemTerjual", {
      where: { outletsId, ...filterDate },
    });
    const jumlahProduk = await ProductOutlet.count({ where: { outletsId } });
    const produkBaru = await ProductOutlet.count({
      where: {
        ...produkBaruFilter,
        outletsId,
      },
    });
    const pengingatStok = await Product.count({
      where: { stock: { [Op.lt]: 3 } },
    });

    // Hitung rata-rata per hari
    const rataRataPendapatan = totalPendapatan / totalDays;
    const rataRataTransaksi = totalTransaksi / totalDays;

    res.status(200).json({
      success: true,
      data: {
        totalPendapatan: totalPendapatan || 0,
        rataRataPendapatan,
        totalTransaksi: totalTransaksi || 0,
        rataRataTransaksi,
        jumlahProduk,
        produkBaru,
        pengingatStok,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan pada server" });
  }
};

const getDashboardDataMobile = async (req, res) => {
  try {
    const { outletsId } = req.params;
    const { periode } = req.query;

    // Validasi outlet
    const outlet = await Outlet.findByPk(outletsId);
    if (!outlet) {
      return res
        .status(404)
        .json({ success: false, message: "Outlet tidak ditemukan" });
    }

    // Periode waktu berdasarkan query
    let filterDate = {};
    let presentase={};
    let jumlahPelanggan ={};
    let produkBaruFilter = {};
    const todayStart = Sequelize.literal("DATE(NOW())"); // Awal hari (00:00:00)
    const todayEnd = Sequelize.literal("DATE_ADD(DATE(NOW()), INTERVAL 1 DAY)"); // Akhir hari (23:59:59)
    const weekStart = Sequelize.literal(
      "DATE_SUB(CURRENT_DATE, INTERVAL WEEKDAY(CURRENT_DATE) DAY)"
    );
    const monthStart = Sequelize.literal(
      'DATE_FORMAT(CURRENT_DATE, "%Y-%m-01")'
    );
    const yearStart = Sequelize.literal(
      'DATE_FORMAT(CURRENT_DATE, "%Y-01-01")'
    );

    let totalDays = 1;
    switch (periode) {
      case "hari-ini":
        filterDate = {
          createdAt: { [Op.between]: [todayStart, todayEnd] },
        };
        produkBaruFilter = {
          createdAt: { [Op.between]: [todayStart, todayEnd] },
        };
        totalDays = 1;
        presentase =`
        SELECT 
    COALESCE(
        CASE 
            WHEN t1.total IS NULL AND t2.total IS NULL THEN '0%'
            ELSE CONCAT(
                CASE 
                    WHEN ((t1.total - t2.total) / t2.total * 100) > 0 THEN '+' 
                    ELSE '' 
                END,
                ROUND(
                    LEAST(ABS((t1.total - t2.total) / t2.total * 100), 100), 0
                ),
                '%'
            )
        END,
        '0%'
    ) AS persentase
FROM (
    SELECT 
        outletsId, 
        COALESCE(SUM(total), 0) AS total 
    FROM transaksis
    WHERE DATE(createdAt) = CURDATE() -- Hari ini
    GROUP BY outletsId
) t1
LEFT JOIN (
    SELECT 
        outletsId, 
        COALESCE(SUM(total), 0) AS total 
    FROM transaksis
    WHERE DATE(createdAt) = CURDATE() - INTERVAL 1 DAY -- Kemarin
    GROUP BY outletsId
) t2
ON t1.outletsId = t2.outletsId
WHERE t1.outletsId = ${outletsId}
;

        `;
        jumlahPelanggan =`SELECT 
    COALESCE(COUNT(DISTINCT name), 0) AS jumlahPelanggan
FROM 
    transaksis
WHERE 
    outletsId = ${outletsId}
    AND DATE(createdAt) = CURDATE();  -- Filter untuk hari ini

`;
        break;
      case "minggu-ini":
        filterDate = { createdAt: { [Op.gte]: weekStart } };
        produkBaruFilter = {
          createdAt: { [Op.gte]: weekStart, [Op.lt]: todayEnd },
        };
        totalDays = 7;
        presentase =`
       SELECT 
    CASE 
        WHEN t1.total IS NULL AND t2.total IS NULL THEN '0%' -- Jika keduanya NULL
        ELSE CONCAT(
            CASE 
                WHEN ((t1.total - t2.total) / t2.total * 100) > 0 THEN '+' 
                ELSE '' 
            END,
            ROUND(
                LEAST(ABS((t1.total - t2.total) / t2.total * 100), 100), 0
            ),
            '%'
        )
    END AS persentase
FROM (
    SELECT 
        outletsId, 
        SUM(total) AS total 
    FROM transaksis
    WHERE YEARWEEK(createdAt, 1) = YEARWEEK(CURDATE(), 1) -- Minggu ini
    GROUP BY outletsId
) t1
LEFT JOIN (
    SELECT 
        outletsId, 
        SUM(total) AS total 
    FROM transaksis
    WHERE YEARWEEK(createdAt, 1) = YEARWEEK(CURDATE(), 1) - 1 -- Minggu lalu
    GROUP BY outletsId
) t2
ON t1.outletsId = t2.outletsId
WHERE t1.outletsId = ${outletsId}
;

        `;
        jumlahPelanggan =`SELECT 
        COALESCE(COUNT(DISTINCT name), 0) AS jumlahPelanggan
    FROM 
        transaksis
    WHERE 
        outletsId = ${outletsId}
        AND YEARWEEK(createdAt, 1) = YEARWEEK(CURDATE(), 1);
    
    `;
        break;
      case "bulan-ini":
        filterDate = { createdAt: { [Op.gte]: monthStart } };
        produkBaruFilter = {
          createdAt: { [Op.gte]: monthStart, [Op.lt]: todayEnd },
        };
        totalDays = new Date().getDate();
        presentase =`
        SELECT 
    COALESCE(
        CASE 
            WHEN t1.total IS NULL AND t2.total IS NULL THEN '0%'
            ELSE CONCAT(
                CASE 
                    WHEN ((t1.total - t2.total) / t2.total * 100) > 0 THEN '+' 
                    ELSE '' 
                END,
                ROUND(
                    LEAST(ABS((t1.total - t2.total) / t2.total * 100), 100), 0
                ),
                '%'
            )
        END,
        '0%'
    ) AS persentase
FROM (
    SELECT 
        outletsId, 
        COALESCE(SUM(total), 0) AS total 
    FROM transaksis
    WHERE YEAR(createdAt) = YEAR(CURDATE()) AND MONTH(createdAt) = MONTH(CURDATE()) -- Bulan ini
    GROUP BY outletsId
) t1
LEFT JOIN (
    SELECT 
        outletsId, 
        COALESCE(SUM(total), 0) AS total 
    FROM transaksis
    WHERE YEAR(createdAt) = YEAR(CURDATE() - INTERVAL 1 MONTH) 
      AND MONTH(createdAt) = MONTH(CURDATE() - INTERVAL 1 MONTH) -- Bulan lalu
    GROUP BY outletsId
) t2
ON t1.outletsId = t2.outletsId
WHERE t1.outletsId = ${outletsId}
;

        `;
        jumlahPelanggan =`SELECT 
        COALESCE(COUNT(DISTINCT name), 0) AS jumlahPelanggan
    FROM 
        transaksis
    WHERE 
        outletsId = ${outletsId}
          AND MONTH(createdAt) = MONTH(CURDATE()) 
    
    `;
        break;
      case "tahun-ini":
        filterDate = { createdAt: { [Op.gte]: yearStart } };
        produkBaruFilter = {
          createdAt: { [Op.gte]: yearStart, [Op.lt]: todayEnd },
        };
        totalDays = Math.ceil(
          (new Date() - new Date(new Date().getFullYear(), 0, 1)) /
            (1000 * 60 * 60 * 24)
        );
        presentase =`
        SELECT 
    COALESCE(
        CASE 
             WHEN t1.total IS NULL AND t2.total IS NULL THEN '0%' -- Jika keduanya NULL
            ELSE CONCAT(
                CASE 
                    WHEN ((t1.total - t2.total) / t2.total * 100) > 0 THEN '+' 
                    ELSE '' 
                END,
                ROUND(
                    LEAST(ABS((t1.total - t2.total) / t2.total * 100), 100), 0
                ),
                '%'
            )
        END,
        '0%'
    ) AS persentase
FROM (
    SELECT 
        outletsId, 
        COALESCE(SUM(total), 0) AS total 
    FROM transaksis
    WHERE YEAR(createdAt) = YEAR(CURDATE()) -- Tahun ini
    GROUP BY outletsId
) t1
LEFT JOIN (
    SELECT 
        outletsId, 
        COALESCE(SUM(total), 0) AS total 
    FROM transaksis
    WHERE YEAR(createdAt) = YEAR(CURDATE() - INTERVAL 1 YEAR) -- Tahun lalu
    GROUP BY outletsId
) t2
ON t1.outletsId = t2.outletsId
WHERE t1.outletsId = ${outletsId}
;

        `;
        jumlahPelanggan =`SELECT 
        COALESCE(COUNT(DISTINCT name), 0) AS jumlahPelanggan
    FROM 
        transaksis
    WHERE 
        outletsId = ${outletsId}
           AND YEAR(createdAt) = YEAR(CURDATE());
    
    `;
        break;
      default:
        filterDate = {};
        produkBaruFilter = {};
    }

    // Data berdasarkan periode
    const totalPendapatan = await Transaksis.sum("total", {
      where: { outletsId, ...filterDate },
    });
    const totalTransaksi = await Transaksis.findAll({
      where: { outletsId, ...filterDate },
    });
    const jumlahProduk = await ProductOutlet.count({ where: { outletsId } });
    const produkBaru = await ProductOutlet.count({
      where: {
        ...produkBaruFilter,
        outletsId,
      },
    });
    const pengingatStok = await Product.count({
      where: { stock: { [Op.lt]: 3 } },
    });

    // Hitung rata-rata per hari
    const jumlahTransaksi = totalTransaksi.length;
    const rataRataPendapatan = totalPendapatan / totalDays;
    const rataRataTransaksi = jumlahTransaksi / totalDays;
    const totalPresentase = await sequelize.query(presentase, {
      type: sequelize.QueryTypes.SELECT,
  });
    const totalPelanggan = await sequelize.query(jumlahPelanggan, {
      type: sequelize.QueryTypes.SELECT,
  });
  const formattedPresentase = totalPresentase && totalPresentase.length > 0 && totalPresentase[0].persentase 
    ? totalPresentase[0].persentase 
    : '0%'

    res.status(200).json({
      success: true,
      data: {
        totalPendapatan: totalPendapatan || 0,
        rataRataPendapatan,
        totalTransaksi: jumlahTransaksi || 0,
        rataRataTransaksi,
        jumlahProduk,
        produkBaru,
        pengingatStok,
        totalPresentase: formattedPresentase,
        totalPelanggan: totalPelanggan.length > 0 ? totalPelanggan[0].jumlahPelanggan : 0
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan pada server" });
  }
};

const getSalesGraphData = async (req, res) => {
  try {
    const { outletsId } = req.params;

    // Validasi outletsId (opsional, tambahkan jika diperlukan)
    if (!outletsId) {
      return res.status(400).json({
        success: false,
        message: "ID outlet harus diberikan",
      });
    }

    // Data pendapatan bulanan untuk satu tahun terakhir
    const salesData = await Kasir.findAll({
      attributes: [
        [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "bulan"],
        [Sequelize.fn("SUM", Sequelize.col("totalBersih")), "totalPendapatan"],
      ],
      where: {
        outletsId,
        createdAt: {
          [Op.gte]: Sequelize.literal(
            'DATE_FORMAT(CURRENT_DATE - INTERVAL 1 YEAR, "%Y-01-01")'
          ),
          [Op.lte]: Sequelize.literal("CURRENT_DATE"),
        },
      },
      group: [Sequelize.fn("MONTH", Sequelize.col("createdAt"))],
      order: [[Sequelize.fn("MONTH", Sequelize.col("createdAt")), "ASC"]],
      raw: true,
    });

    // Data default untuk semua bulan dalam satu tahun
    const defaultData = Array.from({ length: 12 }, (_, index) => ({
      bulan: index + 1,
      totalPendapatan: 0,
    }));

    // Nama bulan dalam bahasa Indonesia
    const bulanMap = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    // Mapping data dari database ke array default
    salesData.forEach((item) => {
      const bulan = parseInt(item.bulan, 10);
      defaultData[bulan - 1].totalPendapatan = parseInt(
        item.totalPendapatan,
        10
      );
    });

    // Konversi nomor bulan ke nama bulan
    const result = defaultData.map((item) => ({
      bulan: bulanMap[item.bulan - 1],
      totalPendapatan: item.totalPendapatan,
    }));

    // Response
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

const getTopSellingProducts = async (req, res) => {
  try {
    const { outletsId } = req.params;
    const { categoriesId } = req.query;

    // Validasi outlet
    const outlet = await Outlet.findByPk(outletsId);
    if (!outlet) {
      return res
        .status(404)
        .json({ success: false, message: "Outlet tidak ditemukan" });
    }

    // Jika categoriesId diberikan, validasi kategori
    if (categoriesId) {
      const category = await CategoriesOutlet.findOne({
        where: {
          outletsId,
          categoriesId,
        },
      });
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Kategori tidak ditemukan di outlet ini",
        });
      }
    }

    // Ambil data produk terlaris berdasarkan transaksi dan stok yang terjual
    const topSellingProducts = await DetailTransaksi.findAll({
      attributes: [
        "productsId",
        [Sequelize.fn("SUM", Sequelize.col("stok")), "totalSold"],
      ],
      where: {
        transaksisId: {
          [Op.in]: Sequelize.literal(
            `(SELECT id FROM transaksis WHERE outletsId = ${outletsId})`
          ),
        },
        ...(categoriesId && {
          productsId: {
            [Op.in]: Sequelize.literal(
              `(SELECT productsId FROM productscategories WHERE categoriesId = ${categoriesId})`
            ),
          },
        }),
      },
      group: ["productsId"],
      order: [[Sequelize.fn("SUM", Sequelize.col("stok")), "DESC"]],
      limit: 10,
      raw: true,
    });

    // Ambil nama produk dari tabel products
    const productIds = topSellingProducts.map((item) => item.productsId);
    const products = await Product.findAll({
      where: {
        id: {
          [Op.in]: productIds,
        },
      },
      attributes: ["id", "name"],
      include: [
        {
          model: require("../models/productImage"), // Pastikan model productImage diimpor
          attributes: ["image"], // Ambil kolom gambar
        },
      ],
    });

    // Gabungkan nama produk dengan data penjualan
    const result = topSellingProducts.map((item) => {
      const product = products.find((p) => p.id === item.productsId);
      return {
        productName: product ? product.name : "Unknown Product",
        productImage: product?.productImages?.[0]?.image || null,
        totalSold: item.totalSold,
      };
    });

    // Response
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};


module.exports = { getDashboardData, getDashboardDataMobile, getSalesGraphData, getTopSellingProducts };
