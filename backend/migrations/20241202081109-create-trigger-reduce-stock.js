'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // SQL untuk membuat trigger
    const triggerSQL = `
      CREATE TRIGGER reduce_stock_on_insert
      AFTER INSERT ON detailtransaksis
      FOR EACH ROW
      BEGIN
        -- Periksa apakah produk memiliki stok terbatas
        DECLARE is_unlimited BOOLEAN;

        SELECT unlimited_stock
        INTO is_unlimited
        FROM products
        WHERE id = NEW.productsId;

        -- Jika stok tidak terbatas, tidak melakukan apapun
        IF NOT is_unlimited THEN
          -- Kurangi stok produk
          UPDATE products
          SET stock = stock - NEW.stok
          WHERE id = NEW.productsId;

          -- Pastikan stok tidak menjadi negatif
          UPDATE products
          SET stock = 0
          WHERE id = NEW.productsId AND stock < 0;
        END IF;
      END;
    `;

    // Menjalankan SQL untuk membuat trigger
    await queryInterface.sequelize.query(triggerSQL);
  },

  down: async (queryInterface, Sequelize) => {
    // SQL untuk menghapus trigger
    const dropTriggerSQL = `DROP TRIGGER IF EXISTS reduce_stock_on_insert;`;

    // Menjalankan SQL untuk menghapus trigger
    await queryInterface.sequelize.query(dropTriggerSQL);
  }
};
