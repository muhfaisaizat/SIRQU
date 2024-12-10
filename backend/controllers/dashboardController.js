const { Op, Sequelize } = require("sequelize");
const Outlet = require("../models/outlets");
const Transaksi = require("../models/transaksis");
const Kasir = require("../models/kasirs");
const ProductOutlet = require("../models/productsOutlets");
const Product = require("../models/products");
const CategoriesOutlet = require("../models/categoriesOutlets");
const DetailTransaksi = require("../models/detailTransaksis");

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
    let filterDate;
    const today = Sequelize.literal("CURRENT_DATE");
    const weekStart = Sequelize.literal(
      "DATE_SUB(CURRENT_DATE, INTERVAL WEEKDAY(CURRENT_DATE) DAY)"
    );
    const monthStart = Sequelize.literal(
      'DATE_FORMAT(CURRENT_DATE, "%Y-%m-01")'
    );
    const yearStart = Sequelize.literal(
      'DATE_FORMAT(CURRENT_DATE, "%Y-01-01")'
    );

    switch (periode) {
      case "hari-ini":
        filterDate = { createdAt: { [Op.eq]: today } };
        break;
      case "minggu-ini":
        filterDate = { createdAt: { [Op.gte]: weekStart } };
        break;
      case "bulan-ini":
        filterDate = { createdAt: { [Op.gte]: monthStart } };
        break;
      case "tahun-ini":
        filterDate = { createdAt: { [Op.gte]: yearStart } };
        break;
      default:
        filterDate = {}; // Tanpa filter jika periode tidak valid
    }

    // Data berdasarkan periode
    const totalPendapatan = await Kasir.sum("totalBersih", {
      where: { outletsId, ...filterDate },
    });
    const jumlahOrder = await Kasir.sum("itemTerjual", {
      where: { outletsId, ...filterDate },
    });
    const jumlahProduk = await ProductOutlet.count({ where: { outletsId } });
    const pengingatStok = await Product.count({
      where: { stock: { [Op.lt]: 10 } },
    });

    res.status(200).json({
      success: true,
      data: {
        totalPendapatan: totalPendapatan || 0,
        jumlahOrder: jumlahOrder || 0,
        jumlahProduk,
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

    // Validasi kategori
    const category = await CategoriesOutlet.findOne({
      where: {
        outletsId,
        categoriesId,
      },
    });
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Kategori tidak ditemukan di outlet ini" });
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
    });

    // Gabungkan nama produk dengan data penjualan
    const result = topSellingProducts.map((item) => {
      const product = products.find((p) => p.id === item.productsId);
      return {
        productName: product ? product.name : "Unknown Product",
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

module.exports = { getDashboardData, getSalesGraphData, getTopSellingProducts };
