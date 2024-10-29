const pdf = require("pdf-poppler");
const puppeteer = require("puppeteer");
const ReceiptSetting = require("../models/ReceiptSetting");
const fs = require("fs");
const path = require("path");

exports.setReceiptSettings = async (req, res) => {
  const {
    tax,
    operational_cost,
    store_name,
    address,
    contact,
    social_media,
    items,
    notes,
    showLogo,
    showStoreName,
    showAddress,
    showContact,
    showSocialMedia,
    showNotes,
  } = req.body;

  try {
    // Mengatur pengaturan struk
    await ReceiptSetting.setSettings({
      tax,
      operational_cost,
      store_name,
      address,
      contact,
      social_media,
      items,
      notes,
      showLogo,
      showStoreName,
      showAddress,
      showContact,
      showSocialMedia,
      showNotes,
    });

    // Hitung total harga dan pajak
    if (items && items.length > 0) {
      const { subtotal } = calculateTotals(items, tax); // Asumsikan calculateTotals mengembalikan subtotal dan total
      const total = (parseFloat(subtotal) + parseFloat(tax) + parseFloat(operational_cost)).toFixed(2);

      return res.status(200).json({
        message: "Settings updated successfully",
        totals: {
          subtotal: subtotal,
          tax: tax,
          operational_cost: operational_cost,
          total: total,
        },
      });
    }

    // Jika tidak ada item, kirim response tanpa totals
    res.status(200).json({ message: "Settings updated successfully" });
  } catch (error) {
    console.error("Error setting receipt settings:", error);
    res.status(500).json({ message: "Failed to update settings", error: error.message });
  }
};

// Fungsi untuk menghitung total harga dan pajak
function calculateTotals(items, taxRate, taxEnabled, operationalCostEnabled) {
  let subtotal = 0;

  // Hitung subtotal
  items.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  let tax = 0;
  let operationalCost = operationalCostEnabled ? operational_cost : 0; // Menghitung biaya operasional jika diaktifkan
  if (taxEnabled) {
    tax = subtotal * (taxRate / 100);
  }
  const total = subtotal + tax + operationalCost; // Menambahkan biaya operasional ke total

  return {
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    operationalCost: operationalCost.toFixed(2),
    total: total.toFixed(2),
  };
}

exports.printReceipt = async (req, res) => {
  const { order_number, cashier_name, change } = req.body;

  try {
    const settings = await ReceiptSetting.getSettings();
    console.log("Receipt Settings:", settings);

    if (!settings.store_name || !settings.items.length) {
      return res.status(400).json({ message: "Receipt settings not found" });
    }

    const items = settings.items || []; // Ambil item dari pengaturan struk

    // Hitung subtotal dan pajak
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    
    const taxEnabled = settings.tax > 0; // Cek apakah pajak diaktifkan
    const operationalCostEnabled = settings.operational_cost > 0; // Cek apakah biaya operasional diaktifkan

    const tax = taxEnabled ? (subtotal * settings.tax) / 100 : 0; // Hitung pajak berdasarkan pengaturan jika diaktifkan
    const operationalCost = operationalCostEnabled ? settings.operational_cost : 0; // Hitung biaya operasional jika diaktifkan
    const discount = 0; // Ganti dengan logika diskon jika diperlukan
    const finalTotal = subtotal + tax + operationalCost - discount;

    const itemsHtml = items
      .map(
        (item, index) => `
        <div class="flex justify-between">
          <p>${index + 1}</p>
          <p class="font-bold">${item.name}</p>
          <p>Rp ${item.price.toLocaleString()}</p>
        </div>
      `
      )
      .join("");

    const receiptHtml = `<html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
      </head>
      <body class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-96">
          <div class="text-center mb-4">
            ${
              settings.showLogo
                ? `<img alt="Logo" class="mx-auto mb-2" height="100" src="https://storage.googleapis.com/a1aa/image/241IJ7eWW9SGQC6QI4YBHWIkXhDaOqV56xDOM74vT3Nl6r1JA.jpg" width="100"/>`
                : ""
            }
            ${
              settings.showStoreName
                ? `<h1 class="text-xl font-bold">${settings.store_name}</h1>`
                : ""
            }
            ${settings.showAddress ? `<p>${settings.address}</p>` : ""}
            ${settings.showContact ? `<p>No. Telp ${settings.contact}</p>` : ""}
          </div>
          <hr class="my-4"/>
          <div class="mb-4">
            <p>No. Order: <span class="font-bold">#${order_number}</span></p>
            <p>Waktu: <span class="font-bold">${new Date().toLocaleString()}</span></p>
            <p>Kasir: <span class="font-bold">${cashier_name}</span></p>
            <p>Pembayaran: <span class="font-bold">-</span></p>
          </div>
          <hr class="my-4"/>
          <div class="mb-4">
            ${itemsHtml}
          </div>
          <hr class="my-4"/>
          <div class="mb-4">
            <div class="flex justify-between">
              <span>Sub Total</span>
              <span>Rp ${subtotal.toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
              <span>Pajak ${settings.tax}%</span>
              <span>Rp ${taxEnabled ? tax.toLocaleString() : '0'}</span> <!-- Menampilkan 0 jika pajak tidak aktif -->
            </div>
            <div class="flex justify-between">
              <span>Biaya Operasional</span>
              <span>Rp ${operationalCostEnabled ? operationalCost.toLocaleString() : '0'}</span> <!-- Menampilkan 0 jika biaya operasional tidak aktif -->
            </div>
            <div class="flex justify-between">
              <span>Diskon</span>
              <span>-Rp ${discount.toLocaleString()}</span>
            </div>
          </div>
          <hr class="my-4"/>
          <div class="mb-4 text-lg font-bold">
            <div class="flex justify-between">
              <span>Total</span>
              <span>Rp ${finalTotal.toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
              <span>Kembali</span>
              <span>Rp ${change.toLocaleString()}</span>
            </div>
          </div>
          <hr class="my-4"/>
          ${
            settings.showSocialMedia
              ? `<div class="text-center text-sm"><p>Instagram: ${settings.social_media}</p></div>`
              : ""
          }
          ${
            settings.showNotes
              ? `<div class="text-center text-sm"><p>Catatan: ${settings.notes || 'Tidak ada catatan'}</p></div>` // Menampilkan catatan
              : ""
          }
          <div class="text-center text-sm">
            <p>Terimakasih telah berbelanja</p>
          </div>
          <hr class="my-4"/>
          <div class="text-center text-xs">
            <p>Powered by Sirqu POS</p>
          </div>
        </div>
      </body>
    </html>`;

    // PDF dan JPG Generation tetap sama seperti sebelumnya
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(receiptHtml);
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    // Simpan PDF dan Konversi ke JPG
    const pdfPath = path.join(__dirname, "../receipt.pdf");
    await fs.promises.writeFile(pdfPath, pdfBuffer);
    console.log("PDF saved locally for verification");

    const jpgPath = path.join(__dirname, "../receipt.jpg");
    const options = {
      format: "jpg",
      out_dir: path.dirname(jpgPath),
      out_prefix: path.basename(jpgPath, path.extname(jpgPath)),
      quality: 100,
    };

    pdf
      .convert(pdfPath, options)
      .then((result) => {
        console.log("JPG created successfully");
        const jpgFilePath = path.join(
          options.out_dir,
          options.out_prefix + "-1.jpg"
        );

        fs.promises
          .rename(jpgFilePath, jpgPath)
          .then(() => {
            console.log(`JPG saved to ${jpgPath}`);
            res.status(200).json({
              message: "Receipt generated and saved as JPG successfully",
              jpgPath,
            });
          })
          .catch((error) => {
            console.error("Error saving JPG:", error);
            res
              .status(500)
              .json({ message: "Failed to save JPG", error: error.message });
          });
      })
      .catch((error) => {
        console.error("Error converting PDF to JPG:", error);
        res.status(500).json({
          message: "Failed to convert PDF to JPG",
          error: error.message,
        });
      });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res
      .status(500)
      .json({ message: "Failed to generate PDF", error: error.message });
  }
};

