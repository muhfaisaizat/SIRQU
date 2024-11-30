const Struk = require('../models/struks');
const sequelize = require('../config/database');

// Membuat beberapa Struk sekaligus
exports.createStruk = async (req, res) => {
  try {
    const newStrukData = [
      {
        name: 'Logo',
        status: 'false',
      },
      {
        name: 'Nama Toko',
        status: 'false',
      },
      {
        name: 'Alamat',
        status: 'false',
      },
      {
        name: 'Kontak',
        status: 'false',
      },
      {
        name: 'Sosial Media',
        status: 'false',
      },
      {
        name: 'Catatan',
        status: 'false',
      },
    ];

    // Menyimpan data ke database
    const createdStruks = await Struk.bulkCreate(newStrukData);

    return res.status(201).json({
      message: 'Struks berhasil dibuat.',
      data: createdStruks,
    });
  } catch (error) {
    console.error('Error creating Struks:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

exports.updateStruk = async (req, res) => {
    try {
        const { id } = req.params; 
        const { status } = req.query; 
    
       
        const struk = await Struk.findByPk(id);
    
        if (!struk) {
          return res.status(404).json({ message: 'Struk tidak ditemukan.' });
        }
    
        // Update data hanya jika field baru diberikan
        if (status !== undefined) struk.status = status;
    
        // Simpan perubahan ke database
        await struk.save();
    
        return res.status(200).json({
          message: 'Struk berhasil diperbarui.',
          data: struk,
        });
      } catch (error) {
        console.error('Error updating Struk :', error);
        return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
      }
};


exports.getStruk = async (req, res) => {
    try {
        // Query untuk data struks
        const [struks] = await sequelize.query(`
          SELECT struks.id, struks.name, struks.status 
          FROM struks 
          WHERE struks.deletedAt IS NULL;
        `);
    
        // Query untuk detailstruktekss
        const [detailStrukTeks] = await sequelize.query(`
          SELECT dt.id AS detailStrukTeks_Id, dt.struksId AS struks_Id, struks.name, dt.text
          FROM detailstruktekss AS dt
          JOIN struks ON dt.struksId = struks.id
          WHERE dt.deletedAt IS NULL;
        `);
    
        // Query untuk detailstrukmedias
        const [detailStrukMedia] = await sequelize.query(`
          SELECT dm.id AS detailStrukMedia_Id, dm.struksId AS struks_Id, struks.name, dm.kategori, dm.nameMedia
          FROM detailstrukmedias AS dm
          JOIN struks ON dm.struksId = struks.id
          WHERE dm.deletedAt IS NULL;
        `);
    
        // Query untuk detailstruklogos
        const [detailStrukLogo] = await sequelize.query(`
          SELECT dl.id AS detailStrukLogo_Id, dl.struksId AS struks_Id, struks.name, dl.logo
          FROM detailstruklogos AS dl
          JOIN struks ON dl.struksId = struks.id
          WHERE dl.deletedAt IS NULL;
        `);
    
        // Kirimkan response dengan data gabungan
        return res.status(200).json({
          success: true,
          message: 'Data struk berhasil diambil',
          data: {
            struks,
            detailStrukTeks,
            detailStrukMedia,
            detailStrukLogo
          },
        });
      } catch (error) {
        console.error('Error get struk:', error);
        return res.status(500).json({
          success: false,
          message: 'Terjadi kesalahan saat mengambil data struk',
          error: error.message,
        });
      }
  };
