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
    const queryProduct = `
      SELECT 
    products.id AS id_product,
    products.name AS nama_product,
    products.description AS deskripsi_product,
    products.stock AS stok_product,
    products.unlimited_stock AS unlimited_stock,
    products.price AS harga_product,
    products.status AS status_product,
    GROUP_CONCAT(DISTINCT categories.id) AS id_category,
    GROUP_CONCAT(DISTINCT categories.name) AS nama_category,
    GROUP_CONCAT(DISTINCT outlets.id) AS id_outlet,
    GROUP_CONCAT(DISTINCT outlets.nama) AS nama_outlet,
    GROUP_CONCAT(DISTINCT productimages.image) AS gambar_produk
FROM 
    products
LEFT JOIN 
    productscategories ON products.id = productscategories.productsId
LEFT JOIN 
    categories ON productscategories.categoriesId = categories.id
LEFT JOIN 
    productsoutlets ON products.id = productsoutlets.productsId
LEFT JOIN 
    outlets ON productsoutlets.outletsId = outlets.id
LEFT JOIN 
    productimages ON products.id = productimages.productsId
WHERE
    products.deletedAt IS NULL AND products.id = 2
GROUP BY 
    products.id;

    `;

    // Jalankan query untuk mendapatkan data produk berdasarkan ID
    const [product] = await sequelize.query(queryProduct, {
      replacements: [req.params.id] // Menyisipkan id produk ke dalam query
    });

    // Cek apakah produk ditemukan
    if (!product.length) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Format hasil untuk mengubah gambar dan outlet menjadi array
    const formattedProduct = {
      ...product[0], // Ambil objek produk pertama
      id_category: product[0].id_category ? product[0].id_category.split(',').map(id => parseInt(id)) : [], // Mengubah string id_outlet menjadi array
      nama_category: product[0].nama_category ? product[0].nama_category.split(',') : [], // Mengubah string nama_outlet menjadi array
      id_outlet: product[0].id_outlet ? product[0].id_outlet.split(',').map(id => parseInt(id)) : [], // Mengubah string id_outlet menjadi array
      nama_outlet: product[0].nama_outlet ? product[0].nama_outlet.split(',') : [], // Mengubah string nama_outlet menjadi array
      gambar_produk: product[0].gambar_produk ? product[0].gambar_produk.split(',') : [] // Mengubah string gambar_produk menjadi array
    };

    // Mengembalikan respons dengan data produk
    return res.status(200).json({
      success: true,
      message: 'Data produk berhasil diambil',
      data: formattedProduct,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data produk',
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
    // Query SQL untuk mengambil data menu dengan produk, kategori, dan outlet
    const queryMenu = `SELECT 
    products.id AS id_product,
    products.name AS nama_product,
    products.description AS deskripsi_product,
    products.stock AS stok_product,
    products.unlimited_stock AS unlimited_stock,
    products.price AS harga_product,
    products.status AS status_product,
    GROUP_CONCAT(DISTINCT categories.id) AS id_category,
    GROUP_CONCAT(DISTINCT categories.name) AS nama_category,
    GROUP_CONCAT(DISTINCT outlets.id) AS id_outlet,
    GROUP_CONCAT(DISTINCT outlets.nama) AS nama_outlet,
    GROUP_CONCAT(DISTINCT productimages.image) AS gambar_produk
FROM 
    products
LEFT JOIN 
    productscategories ON products.id = productscategories.productsId
LEFT JOIN 
    categories ON productscategories.categoriesId = categories.id
LEFT JOIN 
    productsoutlets ON products.id = productsoutlets.productsId
LEFT JOIN 
    outlets ON productsoutlets.outletsId = outlets.id
LEFT JOIN
    productimages ON products.id = productimages.productsId
WHERE
    products.deletedAt IS NULL
GROUP BY 
    products.id;

    `;

    // Jalankan query untuk mendapatkan data menu
    const [menus] = await sequelize.query(queryMenu);

    // Format hasil untuk mengubah gambar menjadi array
    const formattedMenus = menus.map(menu => {
      return {
        ...menu,
        id_category: menu.id_category ? menu.id_category.split(',').map(id => parseInt(id)) : [], // Mengubah string id_outlet menjadi array
        nama_category: menu.nama_category ? menu.nama_category.split(',') : [], // Mengubah string nama_outlet menjadi array
        id_outlet: menu.id_outlet ? menu.id_outlet.split(',').map(id => parseInt(id)) : [], // Mengubah string id_outlet menjadi array
        nama_outlet: menu.nama_outlet ? menu.nama_outlet.split(',') : [], // Mengubah string nama_outlet menjadi array
        gambar_produk: menu.gambar_produk ? menu.gambar_produk.split(',') : [] // Mengubah string menjadi array
      };
    });

    // Mengembalikan respons dengan data menu
    return res.status(200).json({
      success: true,
      message: 'Data menu berhasil diambil',
      data: formattedMenus,
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data menu',
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
