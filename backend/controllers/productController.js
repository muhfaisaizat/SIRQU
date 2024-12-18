const Product = require('../models/products');
const ProductImage = require('../models/productImage');
const sequelize = require('../config/database');

// // Get all products
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.findAll();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.sequelize.query(
      `
      SELECT 
          p.id AS product_id,
          p.name AS product_name,
          p.description,
          p.price,
          p.stock,
          p.unlimited_stock,
          p.status,
          p.createdAt AS product_created_at,
          GROUP_CONCAT(DISTINCT c.name ORDER BY c.name ASC SEPARATOR ', ') AS category_names,
          GROUP_CONCAT(DISTINCT o.nama ORDER BY o.nama ASC SEPARATOR ', ') AS outlet_names
      FROM 
          products p
      LEFT JOIN 
          productscategories pc ON p.id = pc.productsId
      LEFT JOIN 
          categories c ON pc.categoriesId = c.id
      LEFT JOIN 
          productsoutlets po ON p.id = po.productsId
      LEFT JOIN 
          outlets o ON po.outletsId = o.id
      WHERE 
          p.deletedAt IS NULL AND po.deletedAt IS NULL AND pc.deletedAt IS NULL AND p.id = ${id}
      GROUP BY 
          p.id, p.name, p.description, p.price, p.stock, p.unlimited_stock, p.status, p.createdAt
      ORDER BY 
          p.createdAt DESC;
      `,
      { type: sequelize.QueryTypes.SELECT }
    );

    // Menambahkan detailCategories dan detailOutlets untuk setiap produk
    const productsWithDetails = await Promise.all(
      products.map(async (product) => {
        // Mendapatkan detail kategori
        const detailCategories = await Product.sequelize.query(
          `
          SELECT 
              pc.*,
              c.name AS category_name
          FROM 
              productscategories pc
          LEFT JOIN 
              categories c ON pc.categoriesId = c.id
          WHERE 
              pc.deletedAt IS NULL AND pc.productsId = :productsId;
          `,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { productsId: product.product_id },
          }
        );

        // Mendapatkan detail outlet
        const detailOutlets = await Product.sequelize.query(
          `
          SELECT 
              po.*,
              o.nama AS outlet_name
          FROM 
              productsoutlets po
          LEFT JOIN 
              outlets o ON po.outletsId = o.id
          WHERE 
              po.deletedAt IS NULL AND po.productsId = :productsId;
          `,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { productsId: product.product_id },
          }
        );

        const detailImages = await Product.sequelize.query(
          `
          SELECT 
          * 
          FROM 
          productimages
          WHERE
          productimages.deletedAt IS NULL AND productimages.productsId= :productsId;
          `,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { productsId: product.product_id },
          }
        );

        return {
          ...product,
          detailCategories, // Menambahkan detail kategori ke produk
          detailOutlets,    // Menambahkan detail outlet ke produk
          detailImages
        };
      })
    );

    // Mengembalikan hasil query dalam format JSON
    return res.status(200).json({
      success: true,
      message: 'Products with details fetched successfully',
      data: productsWithDetails,
    });
  } catch (error) {
    // Menangani error
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message,
    });
  }
};




// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, price, stock, unlimited_stock } = req.body;

  if (!unlimited_stock && (stock < 0 || isNaN(stock))) {
    return res.status(400).json({ error: "Stock must be a non-negative integer when not unlimited." });
  }

  try {
    const finalStock = unlimited_stock ? null : stock; 
    const status = finalStock === 0 ? 'Produk Tidak Aktif' : 'Produk Aktif';

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock: finalStock,
      unlimited_stock,
      status
    });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  const { name, description, price, stock, unlimited_stock } = req.body;

  if (!unlimited_stock && (stock < 0 || isNaN(stock))) {
    return res.status(400).json({ error: "Stock must be a non-negative integer when not unlimited." });
  }

  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const finalStock = unlimited_stock ? null : stock;
    const status = finalStock === 0 ? 'Produk Tidak Aktif' : 'Produk Aktif';

    await product.update({
      name,
      description,
      price,
      stock: finalStock,
      unlimited_stock,
      status
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};    
  

// Soft delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mendapatkan semua data produk
exports.getProducts = async (req, res) => {
  try {
    // Query utama untuk mendapatkan daftar produk
    const products = await Product.sequelize.query(
      `
      SELECT 
          p.id AS product_id,
          p.name AS product_name,
          p.description,
          p.price,
          p.stock,
          p.unlimited_stock,
          p.status,
          p.createdAt AS product_created_at,
          GROUP_CONCAT(DISTINCT c.name ORDER BY c.name ASC SEPARATOR ', ') AS category_names,
          GROUP_CONCAT(DISTINCT o.nama ORDER BY o.nama ASC SEPARATOR ', ') AS outlet_names
      FROM 
          products p
      LEFT JOIN 
          productscategories pc ON p.id = pc.productsId
      LEFT JOIN 
          categories c ON pc.categoriesId = c.id
      LEFT JOIN 
          productsoutlets po ON p.id = po.productsId
      LEFT JOIN 
          outlets o ON po.outletsId = o.id
      WHERE 
          p.deletedAt IS NULL AND o.deletedAt IS NULL AND po.deletedAt IS NULL AND pc.deletedAt IS NULL
      GROUP BY 
          p.id, p.name, p.description, p.price, p.stock, p.unlimited_stock, p.status, p.createdAt
      ORDER BY 
          p.createdAt DESC;
      `,
      { type: sequelize.QueryTypes.SELECT }
    );

    // Menambahkan detailCategories dan detailOutlets untuk setiap produk
    const productsWithDetails = await Promise.all(
      products.map(async (product) => {
        // Mendapatkan detail kategori
        const detailCategories = await Product.sequelize.query(
          `
          SELECT 
              pc.*,
              c.name AS category_name
          FROM 
              productscategories pc
          LEFT JOIN 
              categories c ON pc.categoriesId = c.id
          WHERE 
              pc.deletedAt IS NULL AND pc.productsId = :productsId;
          `,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { productsId: product.product_id },
          }
        );

        // Mendapatkan detail outlet
        const detailOutlets = await Product.sequelize.query(
          `
          SELECT 
              po.*,
              o.nama AS outlet_name
          FROM 
              productsoutlets po
          LEFT JOIN 
              outlets o ON po.outletsId = o.id
          WHERE 
              po.deletedAt IS NULL AND o.deletedAt IS NULL AND po.productsId = :productsId;
          `,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { productsId: product.product_id },
          }
        );

        const detailImages = await Product.sequelize.query(
          `
          SELECT 
          * 
          FROM 
          productimages
          WHERE
          productimages.deletedAt IS NULL AND productimages.productsId= :productsId;
          `,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { productsId: product.product_id },
          }
        );

        return {
          ...product,
          detailCategories, // Menambahkan detail kategori ke produk
          detailOutlets,    // Menambahkan detail outlet ke produk
          detailImages
        };
      })
    );

    // Mengembalikan hasil query dalam format JSON
    return res.status(200).json({
      success: true,
      message: 'Products with details fetched successfully',
      data: productsWithDetails,
    });
  } catch (error) {
    // Menangani error
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message,
    });
  }
};

exports.updateProductStatus = async (req, res) => {
  try {
    const productId = req.params.id;
    const newStock = req.query.stock;
    const newStatus = req.query.status; // Get new status from query parameter
    const newUnlimitedStock = req.query.unlimited_stock; // Get unlimited_stock from query parameter

    // Validate stock value if unlimited_stock is false (must be a non-negative integer)
    if (newUnlimitedStock === 'false' && (newStock !== undefined && (isNaN(newStock) || newStock < 0))) {
      return res.status(400).json({ 
        success: false,
        message: "Stock must be a non-negative integer when unlimited_stock is false."
      });
    }

    // Validate status value (only 'Produk Aktif' or 'Produk Tidak Aktif' allowed)
    if (newStatus && !['Produk Aktif', 'Produk Tidak Aktif'].includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Allowed values are 'Produk Aktif' or 'Produk Tidak Aktif'."
      });
    }

    // Validate unlimited_stock value (must be either 'true' or 'false')
    if (!['true', 'false'].includes(newUnlimitedStock)) {
      return res.status(400).json({
        success: false,
        message: "Invalid unlimited_stock value. Allowed values are 'true' or 'false'."
      });
    }

    // Convert unlimited_stock to boolean
    let unlimitedStock = newUnlimitedStock === 'true';

    // If unlimited_stock is true, set stock to null
    let finalStock = unlimitedStock ? null : (newStock !== undefined ? newStock : undefined);

    // Determine status based on stock value if no status is given
    let status = newStatus || (finalStock == 0 ? 'Produk Tidak Aktif' : 'Produk Aktif');

    // Update stock, status, and unlimited_stock for product
    const [updated] = await Product.update(
      { stock: finalStock, status, unlimited_stock: unlimitedStock },
      { where: { id: productId } }
    );

    if (updated) {
      // Get product information after update
      const updatedProduct = await Product.findOne({
        where: { id: productId },
        attributes: ['id', 'name', 'stock', 'status', 'unlimited_stock'] // Include unlimited_stock in attributes
      });

      return res.status(200).json({
        success: true,
        message: `Product status updated to ${status}`,
        data: updatedProduct
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating product status",
      error: error.message
    });
  }
};


exports.getProductMenu = async (req, res) => {
  const { status } = req.query; 
  try {
    let queryProducts = `
        SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.description,
    p.price,
    p.stock,
    p.unlimited_stock,
    p.status,
    p.createdAt AS product_created_at,
    c.id AS category_id,
    c.name AS category_name,
    o.id AS outlet_id,
    o.nama AS outlet_name,
    MAX(pi.image) AS product_image  
FROM 
    products p
LEFT JOIN 
    productscategories pc ON p.id = pc.productsId
LEFT JOIN 
    categories c ON pc.categoriesId = c.id
LEFT JOIN 
    productsoutlets po ON p.id = po.productsId
LEFT JOIN 
    outlets o ON po.outletsId = o.id
LEFT JOIN 
    productimages pi ON p.id = pi.productsId  
      `;

    if (status === 'default') {
      queryProducts += `WHERE 
    p.deletedAt IS NULL 
    AND po.deletedAt IS NULL 
    AND pc.deletedAt IS NULL
    AND pi.deletedAt IS NULL
GROUP BY
    p.id, c.id, o.id 
ORDER BY 
    p.id, c.name, o.nama;`;
    }
    if (status === 'aktif') {
      queryProducts += `WHERE 
    p.deletedAt IS NULL 
    AND po.deletedAt IS NULL 
    AND pc.deletedAt IS NULL
    AND pi.deletedAt IS NULL
    AND (p.stock > 0 OR p.unlimited_stock = TRUE)
    AND p.status = 'Produk Aktif' 
GROUP BY
    p.id, c.id, o.id 
ORDER BY 
    p.id, c.name, o.nama;`;
    }

    const [products] = await sequelize.query(queryProducts);


      // Response ke client
      res.status(200).json({
          success: true,
          data: products,
      });
  } catch (error) {
      console.error('Error fetching menu:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to fetch menu data',
      });
  }
};

exports.getStockHabis = async (req, res) => {
  try {
    const { outletId } = req.query;

    if (!outletId) {
      return res.status(400).json({
        success: false,
        message: 'Outlet ID is required',
      });
    }

    // Check if outletId exists in the outlets table
    const outletExists = await Product.sequelize.query(
      `SELECT COUNT(*) AS outlet_exists FROM outlets WHERE id = :outletId`,
      {
        replacements: { outletId },
        type: Product.sequelize.QueryTypes.SELECT,
      }
    );

    if (outletExists[0].outlet_exists === 0) {
      return res.status(404).json({
        success: false,
        message: `Outlet with ID ${outletId} does not exist.`,
      });
    }

    // Query to count stock habis for the specified outlet
    const stockHabis = await Product.sequelize.query(
      `
      SELECT 
          COUNT(*) AS stock_habis
      FROM 
          products p
      JOIN 
          productsoutlets po ON p.id = po.productsId
      JOIN
          outlets o ON po.outletsId = o.id
      WHERE 
          p.unlimited_stock = 0
          AND p.stock BETWEEN 0 AND 2
          AND p.deletedAt IS NULL
          AND o.id = :outletId;
      `,
      {
        replacements: { outletId },
        type: Product.sequelize.QueryTypes.SELECT,
      }
    );

    res.status(200).json({
      success: true,
      data: stockHabis[0],
    });
  } catch (error) {
    console.error('Error fetching stock habis:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stock habis data',
    });
  }
};
