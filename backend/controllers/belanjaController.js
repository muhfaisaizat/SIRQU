const Belanja = require('../models/belanjas');
const sequelize = require('../config/database');

// Create a new Belanja
exports.createBelanja = async (req, res) => {
  try {
    const { outletsId, categoriesBelanjasId , namaKegiatan, deskripsi, totalBelanja, waktu, tanggal } = req.body;
    const belanja = await Belanja.create({ outletsId, categoriesBelanjasId , namaKegiatan, deskripsi, totalBelanja, waktu, tanggal });
    res.status(201).json(belanja);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Belanja
exports.getAllBelanja = async (req, res) => {
  try {
    // Query mentah untuk mengambil data
    const query = `
      SELECT 
        belanjas.id,
        belanjas.outletsId,
        outlets.nama AS outletNama,
        belanjas.categoriesBelanjasId,
        categoriesbelanjas.name AS kategoriNama,
        belanjas.namaKegiatan,
        belanjas.deskripsi,
        belanjas.totalBelanja,
        belanjas.waktu,
        belanjas.tanggal,
        belanjas.createdAt
      FROM 
        belanjas
      LEFT JOIN 
        outlets ON belanjas.outletsId = outlets.id
      LEFT JOIN 
        categoriesbelanjas ON belanjas.categoriesBelanjasId = categoriesbelanjas.id
      WHERE 
        belanjas.deletedAt IS null;
    `;

    // Eksekusi query menggunakan sequelize.query
    const belanjas = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT, // Menentukan tipe query sebagai SELECT
    });

    // Jika tidak ada data
    if (belanjas.length === 0) {
      return res.status(404).json({ error: 'No Belanja found' });
    }

    // Mengembalikan data sebagai JSON
    res.status(200).json(belanjas);
  } catch (error) {
    // Menangani error
    res.status(400).json({ error: error.message });
  }
};

// Get a specific Belanja by ID
exports.getBelanjaById = async (req, res) => {
  try {
    const query = `
      SELECT 
        belanjas.id,
        belanjas.outletsId,
        outlets.nama AS outletNama,
        belanjas.categoriesBelanjasId,
        categoriesbelanjas.name AS kategoriNama,
        belanjas.namaKegiatan,
        belanjas.deskripsi,
        belanjas.totalBelanja,
        belanjas.waktu,
        belanjas.tanggal,
        belanjas.createdAt
      FROM 
        belanjas
      LEFT JOIN 
        outlets ON belanjas.outletsId = outlets.id
      LEFT JOIN 
        categoriesbelanjas ON belanjas.categoriesBelanjasId = categoriesbelanjas.id
      WHERE 
       belanjas.id = :id;
    `;

    // Eksekusi query mentah dengan parameter dinamis
    const belanja = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { id: req.params.id }, // Gunakan parameter id dari req.params
    });

    // Jika data ditemukan
    if (belanja.length > 0) {
      res.status(200).json(belanja[0]); // Mengembalikan data pertama karena id bersifat unik
    } else {
      res.status(404).json({ error: 'Belanja not found' }); // Jika tidak ada data
    }
  } catch (error) {
    res.status(400).json({ error: error.message }); // Menangani error
  }
};

// Update a Belanja
exports.updateBelanja = async (req, res) => {
  try {
    const { outletsId, categoriesBelanjasId, namaKegiatan, deskripsi, totalBelanja, waktu, tanggal } = req.body;
    const [updated] = await Belanja.update({ outletsId, categoriesBelanjasId, namaKegiatan, deskripsi, totalBelanja, waktu, tanggal }, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedBelanja = await Belanja.findByPk(req.params.id);
      res.status(200).json(updatedBelanja);
    } else {
      res.status(404).json({ error: 'Belanja not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Belanja
exports.deleteBelanja = async (req, res) => {
  try {
    const deleted = await Belanja.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Belanja not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Card Belanja by Outlet ID
exports.getCardBelanja = async (req, res) => {
  try {
    const query = `
SELECT 
    -- Revenue Data
    SUM(CASE 
        WHEN MONTH(belanjas.createdAt) = MONTH(NOW()) 
             AND YEAR(belanjas.createdAt) = YEAR(NOW()) 
             AND belanjas.deletedAt IS NULL
        THEN belanjas.totalBelanja 
        ELSE 0 
    END) AS Total_Belanja_Bulan_Ini,
    
    SUM(CASE 
        WHEN YEAR(belanjas.createdAt) = YEAR(NOW()) 
             AND belanjas.deletedAt IS NULL
        THEN belanjas.totalBelanja 
        ELSE 0 
    END) AS Total_Belanja_Tahun_Ini,
    
    AVG(CASE 
        WHEN MONTH(belanjas.createdAt) = MONTH(NOW()) 
             AND YEAR(belanjas.createdAt) = YEAR(NOW()) 
             AND belanjas.deletedAt IS NULL
        THEN belanjas.totalBelanja 
        ELSE NULL 
    END) AS Pengeluaran_Rata_Rata_Bulan_Ini,

    -- Revenue Data for Previous Month and Year
    SUM(CASE 
        WHEN MONTH(belanjas.createdAt) = MONTH(NOW()) - 1 
             AND YEAR(belanjas.createdAt) = YEAR(NOW()) 
             AND belanjas.deletedAt IS NULL
        THEN belanjas.totalBelanja 
        ELSE 0 
    END) AS Total_Belanja_Bulan_Lalu,

    SUM(CASE 
        WHEN YEAR(belanjas.createdAt) = YEAR(NOW()) - 1 
             AND belanjas.deletedAt IS NULL
        THEN belanjas.totalBelanja 
        ELSE 0 
    END) AS Total_Belanja_Tahun_Lalu,

    AVG(CASE 
        WHEN MONTH(belanjas.createdAt) = MONTH(NOW()) - 1 
             AND YEAR(belanjas.createdAt) = YEAR(NOW()) 
             AND belanjas.deletedAt IS NULL
        THEN belanjas.totalBelanja 
        ELSE NULL 
    END) AS Pengeluaran_Rata_Rata_Bulan_Lalu,

    -- Percentage Growth with +/- (Total Yearly)
    CASE
        WHEN SUM(CASE 
            WHEN YEAR(belanjas.createdAt) = YEAR(NOW()) - 1 
            AND belanjas.deletedAt IS NULL
            THEN belanjas.totalBelanja 
            ELSE 0 
        END) > 0 
        THEN CONCAT(
            CASE 
                WHEN SUM(CASE 
                    WHEN YEAR(belanjas.createdAt) = YEAR(NOW()) 
                    AND belanjas.deletedAt IS NULL
                    THEN belanjas.totalBelanja 
                    ELSE 0 
                END) - SUM(CASE 
                    WHEN YEAR(belanjas.createdAt) = YEAR(NOW()) - 1 
                    AND belanjas.deletedAt IS NULL
                    THEN belanjas.totalBelanja 
                    ELSE 0 
                END) >= 0 THEN '+' 
                ELSE '-' 
            END,
            ROUND(
                LEAST(
                    ABS(SUM(CASE 
                        WHEN YEAR(belanjas.createdAt) = YEAR(NOW()) 
                        AND belanjas.deletedAt IS NULL
                        THEN belanjas.totalBelanja 
                        ELSE 0 
                    END) - SUM(CASE 
                        WHEN YEAR(belanjas.createdAt) = YEAR(NOW()) - 1 
                        AND belanjas.deletedAt IS NULL
                        THEN belanjas.totalBelanja 
                        ELSE 0 
                    END)) 
                    / SUM(CASE 
                        WHEN YEAR(belanjas.createdAt) = YEAR(NOW()) - 1 
                        AND belanjas.deletedAt IS NULL
                        THEN belanjas.totalBelanja 
                        ELSE 0 
                    END) * 100,
                    100
                ), 0),  -- Maximum percentage capped at 100
            '%'
        )
        ELSE NULL 
    END AS Banding_Persentase_Total_Belanja_Tahun_Ini,

    -- Percentage Growth with +/- (Total Monthly)
    CASE
        WHEN SUM(CASE 
            WHEN MONTH(belanjas.createdAt) = MONTH(NOW()) - 1 
                 AND YEAR(belanjas.createdAt) = YEAR(NOW()) 
                 AND belanjas.deletedAt IS NULL
            THEN belanjas.totalBelanja 
            ELSE 0 
        END) > 0 
        THEN CONCAT(
            CASE 
                WHEN SUM(CASE 
                    WHEN MONTH(belanjas.createdAt) = MONTH(NOW()) 
                         AND YEAR(belanjas.createdAt) = YEAR(NOW()) 
                         AND belanjas.deletedAt IS NULL
                    THEN belanjas.totalBelanja 
                    ELSE 0 
                END) - SUM(CASE 
                    WHEN MONTH(belanjas.createdAt) = MONTH(NOW()) - 1 
                         AND YEAR(belanjas.createdAt) = YEAR(NOW()) 
                         AND belanjas.deletedAt IS NULL
                    THEN belanjas.totalBelanja 
                    ELSE 0 
                END) >= 0 THEN '+' 
                ELSE '-' 
            END,
            ROUND(
                LEAST(
                    ABS(SUM(CASE 
                        WHEN MONTH(belanjas.createdAt) = MONTH(NOW()) 
                             AND YEAR(belanjas.createdAt) = YEAR(NOW()) 
                             AND belanjas.deletedAt IS NULL
                        THEN belanjas.totalBelanja 
                        ELSE 0 
                    END) - SUM(CASE 
                        WHEN MONTH(belanjas.createdAt) = MONTH(NOW()) - 1 
                             AND YEAR(belanjas.createdAt) = YEAR(NOW()) 
                             AND belanjas.deletedAt IS NULL
                        THEN belanjas.totalBelanja 
                        ELSE 0 
                    END)) 
                    / SUM(CASE 
                        WHEN MONTH(belanjas.createdAt) = MONTH(NOW()) - 1 
                             AND YEAR(belanjas.createdAt) = YEAR(NOW()) 
                             AND belanjas.deletedAt IS NULL
                        THEN belanjas.totalBelanja 
                        ELSE 0 
                    END) * 100,
                    100
                ), 0),  -- Maximum percentage capped at 100
            '%'
        )
        ELSE NULL 
    END AS Banding_Persentase_Total_Belanja_Bulan_Ini,

    -- Percentage Growth with +/- (Average Monthly)
    CASE
        WHEN AVG(CASE 
            WHEN MONTH(belanjas.createdAt) = MONTH(NOW()) - 1 
                 AND YEAR(belanjas.createdAt) = YEAR(NOW()) 
                 AND belanjas.deletedAt IS NULL
            THEN belanjas.totalBelanja 
            ELSE NULL 
        END) > 0 
        THEN CONCAT(
            CASE 
                WHEN AVG(CASE 
                    WHEN MONTH(belanjas.createdAt) = MONTH(NOW()) 
                         AND YEAR(belanjas.createdAt) = YEAR(NOW()) 
                         AND belanjas.deletedAt IS NULL
                    THEN belanjas.totalBelanja 
                    ELSE NULL 
                END) - AVG(CASE 
                    WHEN MONTH(belanjas.createdAt) = MONTH(NOW()) - 1 
                         AND YEAR(belanjas.createdAt) = YEAR(NOW()) 
                         AND belanjas.deletedAt IS NULL
                    THEN belanjas.totalBelanja 
                    ELSE NULL 
                END) >= 0 THEN '+' 
                ELSE '-' 
            END,
            ROUND(
                LEAST(
                    ABS(AVG(CASE 
                        WHEN MONTH(belanjas.createdAt) = MONTH(NOW()) 
                             AND YEAR(belanjas.createdAt) = YEAR(NOW()) 
                             AND belanjas.deletedAt IS NULL
                        THEN belanjas.totalBelanja 
                        ELSE NULL 
                    END) - AVG(CASE 
                        WHEN MONTH(belanjas.createdAt) = MONTH(NOW()) - 1 
                             AND YEAR(belanjas.createdAt) = YEAR(NOW()) 
                             AND belanjas.deletedAt IS NULL
                        THEN belanjas.totalBelanja 
                        ELSE NULL 
                    END)) 
                    / AVG(CASE 
                        WHEN MONTH(belanjas.createdAt) = MONTH(NOW()) - 1 
                             AND YEAR(belanjas.createdAt) = YEAR(NOW()) 
                             AND belanjas.deletedAt IS NULL
                        THEN belanjas.totalBelanja 
                        ELSE NULL 
                    END) * 100,
                    100
                ), 0),  -- Maximum percentage capped at 100
            '%'
        )
        ELSE NULL 
    END AS Banding_Persentase_Pengeluaran_Rata_Rata_Bulan_Ini

FROM belanjas
WHERE belanjas.outletsId = :outletId
  AND belanjas.deletedAt IS NULL;
`;

    // Execute query with outletId from params
    const belanja = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { outletId: req.params.outletId },
    });

    // If data found
    if (belanja.length > 0) {
      res.status(200).json(belanja[0]); // Return first row of data
    } else {
      res.status(404).json({ error: 'No data found for the specified outlet ID' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle error
  }
};
