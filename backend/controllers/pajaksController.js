const Pajaks = require('../models/pajaks');


exports.createPajak = async (req, res) => {
    try {
      const newPajakData = [
        {
          name: 'Pajak',
          nilaiPajak: 'null',
          status: false,
        },
        {
          name: 'Biaya Operasional',
          nilaiPajak: 'null',
          status: false,
        },
      ];
  
      // Menyimpan data ke database
      const createdPajaks = await Pajaks.bulkCreate(newPajakData);
  
      return res.status(201).json({
        message: 'Pajaks berhasil dibuat.',
        data: createdPajaks,
      });
    } catch (error) {
      console.error('Error creating Pajaks:', error);
      return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
  };

exports.getPajak = async (req, res) => {
    try {
        const pajaks = await Pajaks.findAll(); 
        return res.status(200).json({
          message: 'Data Pajaks berhasil diambil.',
          data: pajaks,
        });
      } catch (error) {
        console.error('Error fetching Pajaks:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
      }
  };

  exports.updateNilaiPajak = async (req, res) => {
    try {
      const { id } = req.params; // Mendapatkan id dari parameter URL
      const { nilaiPajak } = req.query; // Mendapatkan data yang akan diupdate dari body request
  
      // Periksa apakah data Pajak dengan ID tersebut ada
      const pajak = await Pajaks.findByPk(id);
      if (!pajak) {
        return res.status(404).json({
          message: `Pajak dengan ID ${id} tidak ditemukan.`,
        });
      }
  
      // Perbarui data Pajak
      await pajak.update({
        nilaiPajak,
      });
  
      return res.status(200).json({
        message: 'Pajak berhasil diperbarui.',
        data: pajak,
      });
    } catch (error) {
      console.error('Error updating Pajak:', error);
      return res.status(500).json({
        message: 'Terjadi kesalahan pada server.',
      });
    }
  };

  exports.updatePajakStatus = async (req, res) => {
    try {
      const { id } = req.params; // Mendapatkan id dari parameter URL
      const { status } = req.query; // Mendapatkan data yang akan diupdate dari body request
  
      // Periksa apakah data Pajak dengan ID tersebut ada
      const pajak = await Pajaks.findByPk(id);
      if (!pajak) {
        return res.status(404).json({
          message: `Pajak dengan ID ${id} tidak ditemukan.`,
        });
      }
  
      // Perbarui data Pajak
      await pajak.update({
        status,
      });
  
      return res.status(200).json({
        message: 'Pajak berhasil diperbarui.',
        data: pajak,
      });
    } catch (error) {
      console.error('Error updating Pajak:', error);
      return res.status(500).json({
        message: 'Terjadi kesalahan pada server.',
      });
    }
  };
  