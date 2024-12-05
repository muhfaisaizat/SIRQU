const { Op, Sequelize } = require('sequelize'); 
const Outlet = require('../models/outlets');
const Transaksi = require('../models/transaksis');
const Kasir = require('../models/kasirs');
const ProductOutlet = require('../models/productsOutlets'); 
const Product = require('../models/products')

const getDashboardData = async (req, res) => {
    try {
        const { outletsId } = req.params;
        const { periode } = req.query;

        // Validasi outlet
        const outlet = await Outlet.findByPk(outletsId);
        if (!outlet) {
            return res.status(404).json({ success: false, message: 'Outlet tidak ditemukan' });
        }

        // Periode waktu berdasarkan query
        let filterDate;
        const today = Sequelize.literal('CURRENT_DATE');
        const weekStart = Sequelize.literal('DATE_SUB(CURRENT_DATE, INTERVAL WEEKDAY(CURRENT_DATE) DAY)');
        const monthStart = Sequelize.literal('DATE_FORMAT(CURRENT_DATE, "%Y-%m-01")');
        const yearStart = Sequelize.literal('DATE_FORMAT(CURRENT_DATE, "%Y-01-01")');

        switch (periode) {
            case 'hari-ini':
                filterDate = { createdAt: { [Op.eq]: today } };
                break;
            case 'minggu-ini':
                filterDate = { createdAt: { [Op.gte]: weekStart } };
                break;
            case 'bulan-ini':
                filterDate = { createdAt: { [Op.gte]: monthStart } };
                break;
            case 'tahun-ini':
                filterDate = { createdAt: { [Op.gte]: yearStart } };
                break;
            default:
                filterDate = {}; // Tanpa filter jika periode tidak valid
        }

        // Data berdasarkan periode
        const totalPendapatan = await Kasir.sum('totalBersih', { where: { outletsId, ...filterDate } });
        const jumlahOrder = await Kasir.sum('itemTerjual', { where: { outletsId, ...filterDate } });
        const jumlahProduk = await ProductOutlet.count({ where: { outletsId } });
        const pengingatStok = await Product.count({ where: { stock: { [Op.lt]: 10 } } });

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
        res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { getDashboardData };