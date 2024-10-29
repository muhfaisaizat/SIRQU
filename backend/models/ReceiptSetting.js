// models/ReceiptSetting.js
class ReceiptSetting {
  constructor() {
    this.settings = {
      showLogo: true,             // Untuk menampilkan logo
      showStoreName: true,        // Untuk menampilkan nama toko
      showAddress: true,          // Untuk menampilkan alamat
      showContact: true,          // Untuk menampilkan kontak
      showSocialMedia: true,      // Untuk menampilkan media sosial
      showNotes: true,            // Untuk menampilkan catatan
      total_price: 0,
      items: [],
      taxEnabled: true, // Menyimpan status apakah pajak diaktifkan
      operationalCostEnabled: true, // Menyimpan status apakah biaya operasional diaktifkan
    };
  }

  // Method untuk mengatur ulang atau memperbarui pengaturan
  setSettings(settings) {
    this.settings = {
      ...this.settings, // Menggunakan pengaturan default jika tidak diberikan
      ...settings, // Overwrite dengan pengaturan yang baru
      total_price: settings.total_price || this.settings.total_price,
      items: settings.items || this.settings.items,
      discount: settings.discount || 0
    };
  }

  // Method untuk mendapatkan pengaturan saat ini
  getSettings() {
    return this.settings;
  }
}

module.exports = new ReceiptSetting();