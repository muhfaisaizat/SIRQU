const Struk = require('../models/struks');
const sequelize = require('../config/database');
const path = require('path'); 
const dayjs = require('dayjs');
const puppeteer = require('puppeteer');
const fs = require('fs');

exports.getViewStruk = async (req, res) => {
    try {
          const strukData = await Struk.findAll(); 
          const [detailStrukTeks] = await sequelize.query(`
            SELECT dt.id AS detailStrukTeks_Id, dt.struksId AS struks_Id, struks.name, dt.text
            FROM detailstruktekss AS dt
            JOIN struks ON dt.struksId = struks.id
            WHERE dt.deletedAt IS NULL;
          `);

          const [detailStrukMedia] = await sequelize.query(`
            SELECT dm.id AS detailStrukMedia_Id, dm.struksId AS struks_Id, struks.name, dm.kategori, dm.nameMedia
            FROM detailstrukmedias AS dm
            JOIN struks ON dm.struksId = struks.id
            WHERE dm.deletedAt IS NULL;
          `);

          const [detailStrukLogo] = await sequelize.query(`
            SELECT dl.id AS detailStrukLogo_Id, dl.struksId AS struks_Id, struks.name, dl.logo
            FROM detailstruklogos AS dl
            JOIN struks ON dl.struksId = struks.id
            WHERE dl.deletedAt IS NULL;
          `);

          const detailLogo = detailStrukLogo.find(item => item.name === 'Logo');
          const logo = detailLogo ? `${process.env.API_URL}/images/${detailLogo.logo}` : '';

        // Buat variabel untuk status tiap elemen berdasarkan data Struk
        const showLogo = strukData.find(item => item.name === 'Logo' && item.status === 'true');
        const showNamaToko = strukData.find(item => item.name === 'Nama Toko' && item.status === 'true');
        const showAlamat = strukData.find(item => item.name === 'Alamat' && item.status === 'true');
        const showKontak = strukData.find(item => item.name === 'Kontak' && item.status === 'true');
        const showSosialMedia = strukData.find(item => item.name === 'Sosial Media' && item.status === 'true');
        const showCatatan = strukData.find(item => item.name === 'Catatan' && item.status === 'true');


        const textNamaToko = detailStrukTeks.find(item => item.name === 'Nama Toko');
        const textAlamat = detailStrukTeks.find(item => item.name === 'Alamat');
        const textKontak = detailStrukTeks.find(item => item.name === 'Kontak');
        const textCatatan = detailStrukTeks.find(item => item.name === 'Catatan');


        let sosialMediaContent = '';
        if (showSosialMedia && detailStrukMedia && detailStrukMedia.length > 0) {
            detailStrukMedia.forEach(item => {
                if (item.kategori === 'IG' && item.nameMedia !== 'null') {
                    sosialMediaContent += `<p class="text-[14px] font-medium">Instagram : ${item.nameMedia}</p>`;
                } else if (item.kategori === 'TW' && item.nameMedia !== 'null') {
                    sosialMediaContent += `<p class="text-[14px] font-medium">Twitter : ${item.nameMedia}</p>`;
                } else if (item.kategori === 'FB' && item.nameMedia !== 'null') {
                    sosialMediaContent += `<p class="text-[14px] font-medium">Facebook : ${item.nameMedia}</p>`;
                }
            });
        }

        // HTML content
        const htmlContent = `
          <html>
            <head>
                <script src="https://cdn.tailwindcss.com"></script>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
            </head>
            <body class="bg-gray-100 flex items-center justify-center min-h-screen">
                <div class="flex flex-col items-center justify-center bg-white p-[32px]">
                
                <!-- Shop Details Section -->
                <div class="p-[16px] grid justify-items-center items-center">
                    ${showLogo ? 
                        logo?
                        `<img src="${logo}" alt="Logo" class="w-[84px] h-[84px]" />` 
                        :''
                        : ''}
                    ${showNamaToko ? `<h1 class="text-[20px] font-semibold py-[8px]">${textNamaToko?.text && textNamaToko.text !== 'null' ? textNamaToko.text : ''}</h1>` : ''}
                    ${showAlamat ? `<p class="text-[14px] font-medium">${textAlamat?.text && textAlamat.text !== 'null'? textAlamat.text : ''}</p>` : ''}
                    ${showKontak ? `<p class="text-[14px] font-medium">${textKontak?.text && textKontak.text !== 'null'? textKontak.text : ''}</p>` : ''}
                     <!-- <p class="text-[14px] font-medium">www.kopikita.com</p> -->
                </div>

                <!-- Order Info Section -->
                <div class="py-[16px] border-t w-[390px]">
                    <p class="text-[14px] font-medium">No. Order : #0001</p>
                    <p class="text-[14px] font-medium">Waktu : 12 Feb 2024, 08.30</p>
                    <p class="text-[14px] font-medium">Kasir : Nama Kasir</p>
                    <p class="text-[14px] font-medium">Pembayaran : -</p>
                </div>

                <!-- Item List Section -->
                <div class="py-[16px] border-t w-[390px] text-[14px] font-medium grid gap-[8px]">
                    <div class="flex justify-between">
                    <div class="flex gap-[8px]">
                        <p>1</p>
                        <p class="font-bold">Nama Barang</p>
                    </div>
                    <p>Rp 10.000</p>
                    </div>
                    <div class="flex justify-between">
                    <div class="flex gap-[8px]">
                        <p>2</p>
                        <p class="font-bold">Nama Barang</p>
                    </div>
                    <p>Rp 10.000</p>
                    </div>
                    <div class="flex justify-between">
                    <div class="flex gap-[8px]">
                        <p>1</p>
                        <p class="font-bold">Nama Barang</p>
                    </div>
                    <p>Rp 10.000</p>
                    </div>
                </div>

                <!-- Total Calculation Section -->
                <div class="py-[16px] border-t-2 border-dashed w-[390px] text-[14px] font-medium grid gap-[8px]">
                    <div class="flex justify-between">
                    <p>Sub Total</p>
                    <p>Rp 30.000</p>
                    </div>
                    <div class="flex justify-between">
                    <p>Pajak 10%</p>
                    <p>Rp 3.000</p>
                    </div>
                    <div class="flex justify-between">
                    <p>Diskon 8.8</p>
                    <p>-Rp 13.000</p>
                    </div>
                    <div class="flex justify-between text-[20px] font-bold">
                    <p>Total</p>
                    <p>Rp 20.000</p>
                    </div>
                    <div class="flex justify-between">
                    <p>Bayar</p>
                    <p>Rp 20.000</p>
                    </div>
                    <div class="flex justify-between">
                    <p>Kembalian</p>
                    <p>Rp 0</p>
                    </div>
                </div>

                <!-- Footer Section -->
                <div class="p-[16px] grid justify-items-center items-center border-t w-[390px]">
                ${showSosialMedia ? `
                    <div class="pb-[24px]">
                       ${sosialMediaContent}
                    </div>
                  ` : ''}
                ${showCatatan ? `<p class="text-[14px] font-medium text-center w-[250px]">${textCatatan?.text && textCatatan.text !== 'null'? textCatatan.text : ''}</p>` : ''}
                    <p class="text-[10px] font-medium text-slate-500 mt-[24px]">Powered by Sirqu POS</p>
                </div>

                </div>
            </body>
            </html>
      `;

        // Send the HTML content as response
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(htmlContent);

    } catch (error) {
        console.error("Error rendering HTML:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data struk"
        });
    }
};



exports.getViewStrukMobile = async (req, res) => {
    try {
          const strukData = await Struk.findAll(); 
          const [detailStrukTeks] = await sequelize.query(`
            SELECT dt.id AS detailStrukTeks_Id, dt.struksId AS struks_Id, struks.name, dt.text
            FROM detailstruktekss AS dt
            JOIN struks ON dt.struksId = struks.id
            WHERE dt.deletedAt IS NULL;
          `);

          const [detailStrukMedia] = await sequelize.query(`
            SELECT dm.id AS detailStrukMedia_Id, dm.struksId AS struks_Id, struks.name, dm.kategori, dm.nameMedia
            FROM detailstrukmedias AS dm
            JOIN struks ON dm.struksId = struks.id
            WHERE dm.deletedAt IS NULL;
          `);

          const [detailStrukLogo] = await sequelize.query(`
            SELECT dl.id AS detailStrukLogo_Id, dl.struksId AS struks_Id, struks.name, dl.logo
            FROM detailstruklogos AS dl
            JOIN struks ON dl.struksId = struks.id
            WHERE dl.deletedAt IS NULL;
          `);

          const detailLogo = detailStrukLogo.find(item => item.name === 'Logo');
          const logo = detailLogo ? `${process.env.API_URL}/images/${detailLogo.logo}` : '';

        // Buat variabel untuk status tiap elemen berdasarkan data Struk
        const showLogo = strukData.find(item => item.name === 'Logo' && item.status === 'true');
        const showNamaToko = strukData.find(item => item.name === 'Nama Toko' && item.status === 'true');
        const showAlamat = strukData.find(item => item.name === 'Alamat' && item.status === 'true');
        const showKontak = strukData.find(item => item.name === 'Kontak' && item.status === 'true');
        const showSosialMedia = strukData.find(item => item.name === 'Sosial Media' && item.status === 'true');
        const showCatatan = strukData.find(item => item.name === 'Catatan' && item.status === 'true');


        const textNamaToko = detailStrukTeks.find(item => item.name === 'Nama Toko');
        const textAlamat = detailStrukTeks.find(item => item.name === 'Alamat');
        const textKontak = detailStrukTeks.find(item => item.name === 'Kontak');
        const textCatatan = detailStrukTeks.find(item => item.name === 'Catatan');


        let sosialMediaContent = '';
        if (showSosialMedia && detailStrukMedia && detailStrukMedia.length > 0) {
            detailStrukMedia.forEach(item => {
                if (item.kategori === 'IG' && item.nameMedia !== 'null') {
                    sosialMediaContent += `<p class="text-[14px] font-medium">Instagram : ${item.nameMedia}</p>`;
                } else if (item.kategori === 'TW' && item.nameMedia !== 'null') {
                    sosialMediaContent += `<p class="text-[14px] font-medium">Twitter : ${item.nameMedia}</p>`;
                } else if (item.kategori === 'FB' && item.nameMedia !== 'null') {
                    sosialMediaContent += `<p class="text-[14px] font-medium">Facebook : ${item.nameMedia}</p>`;
                }
            });
        }

        // HTML content
        const htmlContent = `
          <html lang="en">
            <head>
             <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
            </head>
            <body >
                <div class=" bg-white p-[32px]">
                
                <!-- Shop Details Section -->
                <div class="p-[16px] grid justify-items-center items-center">
                    ${showLogo ? 
                        logo?
                        `<img src="${logo}" alt="Logo" class="w-[84px] h-[84px]" />` 
                        :''
                        : ''}
                    ${showNamaToko ? `<h1 class="text-[20px] text-center font-semibold py-[8px] w-[290px] break-words">${textNamaToko?.text && textNamaToko.text !== 'null' ? textNamaToko.text : ''}</h1>` : ''}
                    ${showAlamat ? `<p class="text-[14px] text-center font-medium w-[290px] break-words">${textAlamat?.text && textAlamat.text !== 'null'? textAlamat.text : ''}</p>` : ''}
                    ${showKontak ? `<p class="text-[14px] text-center font-medium w-[290px] break-words">${textKontak?.text && textKontak.text !== 'null'? textKontak.text : ''}</p>` : ''}
                     <!-- <p class="text-[14px] font-medium">www.kopikita.com</p> -->
                </div>

                <!-- Order Info Section -->
                <div class="py-[16px] border-t ">
                    <p class="text-[14px] font-medium">No. Order : #0001</p>
                    <p class="text-[14px] font-medium">Waktu : 12 Feb 2024, 08.30</p>
                    <p class="text-[14px] font-medium">Kasir : Nama Kasir</p>
                    <p class="text-[14px] font-medium">Pembayaran : -</p>
                </div>

                <!-- Item List Section -->
                <div class="py-[16px] border-t  text-[14px] font-medium grid gap-[8px]">
                    <div class="flex justify-between">
                    <div class="flex gap-[8px]">
                        <p>1</p>
                        <p class="font-bold">Nama Barang</p>
                    </div>
                    <p>Rp 10.000</p>
                    </div>
                    <div class="flex justify-between">
                    <div class="flex gap-[8px]">
                        <p>2</p>
                        <p class="font-bold">Nama Barang</p>
                    </div>
                    <p>Rp 10.000</p>
                    </div>
                    <div class="flex justify-between">
                    <div class="flex gap-[8px]">
                        <p>1</p>
                        <p class="font-bold">Nama Barang</p>
                    </div>
                    <p>Rp 10.000</p>
                    </div>
                </div>

                <!-- Total Calculation Section -->
                <div class="py-[16px] border-t-2 border-dashed  text-[14px] font-medium grid gap-[8px]">
                    <div class="flex justify-between">
                    <p>Sub Total</p>
                    <p>Rp 30.000</p>
                    </div>
                    <div class="flex justify-between">
                    <p>Pajak 10%</p>
                    <p>Rp 3.000</p>
                    </div>
                    <div class="flex justify-between">
                    <p>Diskon 8.8</p>
                    <p>-Rp 13.000</p>
                    </div>
                    <div class="flex justify-between text-[20px] font-bold">
                    <p>Total</p>
                    <p>Rp 20.000</p>
                    </div>
                    <div class="flex justify-between">
                    <p>Bayar</p>
                    <p>Rp 20.000</p>
                    </div>
                    <div class="flex justify-between">
                    <p>Kembalian</p>
                    <p>Rp 0</p>
                    </div>
                </div>

                <!-- Footer Section -->
                <div class="p-[16px] grid justify-items-center items-center border-t ">
                ${showSosialMedia ? `
                    <div class="pb-[24px]">
                       ${sosialMediaContent}
                    </div>
                  ` : ''}
                ${showCatatan ? `<p class="text-[14px] font-medium text-center w-[250px]  break-words">${textCatatan?.text && textCatatan.text !== 'null'? textCatatan.text : ''}</p>` : ''}
                    <p class="text-[10px] font-medium text-slate-500 mt-[24px]">Powered by Sirqu POS</p>
                </div>

                </div>
            </body>
            </html>
      `;

        // Send the HTML content as response
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(htmlContent);

    } catch (error) {
        console.error("Error rendering HTML:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data struk"
        });
    }
};












exports.getTransaksiStruk = async (req, res) => {
    try {


        // data transaksi
        const { id } = req.params;
        // Query SQL untuk mengambil data transaksi utama
        const queryTransaksi = `
          SELECT 
            t.id AS transaksi_id,
            t.outletsId AS outlet_id,
            t.kasirsId AS kasir_id,
            t.userId AS user_id,
            t.tipeOrder AS tipe_order,
            t.name AS transaksi_name,
            t.catatan,
            t.tipeBayar AS tipe_bayar,
            t.ketBayar AS ket_bayar,
            t.subTotal AS sub_total,
            t.total,
            t.bayar,
            t.kembalian,
            t.createdAt,
            o.nama AS outlet_name,
            u.name AS kasir_name
          FROM 
            transaksis AS t
          JOIN 
            outlets AS o ON t.outletsId = o.id
          JOIN 
            users AS u ON t.userId = u.id
          WHERE
             t.id = ${id}  -- Filter berdasarkan ID transaksi
        `;
    
        // Jalankan query untuk mendapatkan data transaksi
        const [transaksis] = await sequelize.query(queryTransaksi);

        const [DetailTransaksi] = await sequelize.query(`
            SELECT 
              dt.id,
              dt.transaksisId AS transaksi_id,
              dt.productsId AS product_id,
              dt.stok,
              p.name AS product_name,
              p.price AS product_price
            FROM 
              detailtransaksis AS dt
            JOIN 
              products AS p ON dt.productsId = p.id
            WHERE 
              dt.transaksisId = ${id}
          `);

        const [DetailPajak] = await sequelize.query(`
           SELECT 
              dp.id,
              dp.transaksisId AS transaksi_id,
              dp.pajaksId AS pajak_id,
              pj.name AS pajak_name,
              dp.harga
            FROM 
              detailpajaks AS dp
            JOIN 
              pajaks AS pj ON dp.pajaksId = pj.id
            WHERE 
              dp.transaksisId = ${id}
          `);

        const [DetailDiskon] = await sequelize.query(`
            SELECT 
          dd.id,
          dd.transaksisId AS transaksi_id,
          dd.diskonsId AS diskon_id,
          d.namaPromosi AS diskon_name,
          dd.harga
        FROM 
          detaildiskons AS dd
        JOIN 
          promosis AS d ON dd.diskonsId = d.id
        WHERE 
          dd.transaksisId = ${id}
          `);
    
      

        console.log(DetailTransaksi);
        const formatRupiah = (value) => {
            return new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(value);
          };
        const transaksiIds = transaksis.map(transaksi => transaksi.transaksi_id);
        const transaksiNamaKasir = transaksis.map(transaksi => transaksi.kasir_name);
        const transaksiPembayaran = transaksis.map(transaksi => transaksi.tipe_bayar);
        const transaksiSubTotal = transaksis.map(transaksi => formatRupiah(transaksi.sub_total));
        const transaksiTotal = transaksis.map(transaksi => formatRupiah(transaksi.total));
        const transaksiBayar = transaksis.map(transaksi => formatRupiah(transaksi.bayar));
        const transaksiKembalian = transaksis.map(transaksi => formatRupiah(transaksi.kembalian));
        const transaksiDateTime = transaksis.map(transaksi =>
            dayjs(transaksi.createdAt).format("DD MMM YYYY, HH.mm")
          );
        const detailTransaksiHTML = DetailTransaksi.map((detail) => `
          <div class="flex justify-between" >
              <div class="flex gap-[8px]">
               <p>${detail.stok}</p>
               <p class="font-bold" >${detail.product_name}</p>
              </div>
              <p>${formatRupiah(detail.product_price)}</p>
          </div>
      `).join('');

        const detailaPajakHTML = DetailPajak.map((detail) => `
          <div class="flex justify-between">
          <p>${detail.pajak_name}</p>
          <p>${formatRupiah(detail.harga)}</p>
          </div>
      `).join('');
      
        const detailaDiskonHTML = DetailDiskon.map((detail) => `
          <div class="flex justify-between">
          <p>${detail.diskon_name}</p>
          <p>- ${formatRupiah(detail.harga)}</p>
          </div>
      `).join('');




        // struk setting

          const strukData = await Struk.findAll(); 
          const [detailStrukTeks] = await sequelize.query(`
            SELECT dt.id AS detailStrukTeks_Id, dt.struksId AS struks_Id, struks.name, dt.text
            FROM detailstruktekss AS dt
            JOIN struks ON dt.struksId = struks.id
            WHERE dt.deletedAt IS NULL;
          `);

          const [detailStrukMedia] = await sequelize.query(`
            SELECT dm.id AS detailStrukMedia_Id, dm.struksId AS struks_Id, struks.name, dm.kategori, dm.nameMedia
            FROM detailstrukmedias AS dm
            JOIN struks ON dm.struksId = struks.id
            WHERE dm.deletedAt IS NULL;
          `);

          const [detailStrukLogo] = await sequelize.query(`
            SELECT dl.id AS detailStrukLogo_Id, dl.struksId AS struks_Id, struks.name, dl.logo
            FROM detailstruklogos AS dl
            JOIN struks ON dl.struksId = struks.id
            WHERE dl.deletedAt IS NULL;
          `);

          const detailLogo = detailStrukLogo.find(item => item.name === 'Logo');
          const logo = detailLogo ? `${process.env.API_URL}/images/${detailLogo.logo}` : '';

        // Buat variabel untuk status tiap elemen berdasarkan data Struk
        const showLogo = strukData.find(item => item.name === 'Logo' && item.status === 'true');
        const showNamaToko = strukData.find(item => item.name === 'Nama Toko' && item.status === 'true');
        const showAlamat = strukData.find(item => item.name === 'Alamat' && item.status === 'true');
        const showKontak = strukData.find(item => item.name === 'Kontak' && item.status === 'true');
        const showSosialMedia = strukData.find(item => item.name === 'Sosial Media' && item.status === 'true');
        const showCatatan = strukData.find(item => item.name === 'Catatan' && item.status === 'true');


        const textNamaToko = detailStrukTeks.find(item => item.name === 'Nama Toko');
        const textAlamat = detailStrukTeks.find(item => item.name === 'Alamat');
        const textKontak = detailStrukTeks.find(item => item.name === 'Kontak');
        const textCatatan = detailStrukTeks.find(item => item.name === 'Catatan');


        let sosialMediaContent = '';
        if (showSosialMedia && detailStrukMedia && detailStrukMedia.length > 0) {
            detailStrukMedia.forEach(item => {
                if (item.kategori === 'IG' && item.nameMedia !== 'null') {
                    sosialMediaContent += `<p class="text-[14px] font-medium">Instagram : ${item.nameMedia}</p>`;
                } else if (item.kategori === 'TW' && item.nameMedia !== 'null') {
                    sosialMediaContent += `<p class="text-[14px] font-medium">Twitter : ${item.nameMedia}</p>`;
                } else if (item.kategori === 'FB' && item.nameMedia !== 'null') {
                    sosialMediaContent += `<p class="text-[14px] font-medium">Facebook : ${item.nameMedia}</p>`;
                }
            });
        }

        // HTML content
        const htmlContent = `
          <html lang="en">
            <head>
             <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
                <style>
                 body {
            width: 390px;
            max-width: 390px; /* Batas maksimum untuk ukuran mobile */
        }
                </style>
            </head>
            <body>
                <div class=" bg-white p-[32px]">
                
                <!-- Shop Details Section -->
                <div class="p-[16px] grid justify-items-center items-center">
                    ${showLogo ? 
                        logo?
                        `<img src="${logo}" alt="Logo" class="w-[84px] h-[84px]" />` 
                        :''
                        : ''}
                    ${showNamaToko ? `<h1 class="text-[20px] text-center font-semibold py-[8px] w-[290px] break-words">${textNamaToko?.text && textNamaToko.text !== 'null' ? textNamaToko.text : ''}</h1>` : ''}
                    ${showAlamat ? `<p class="text-[14px] text-center font-medium w-[290px] break-words">${textAlamat?.text && textAlamat.text !== 'null'? textAlamat.text : ''}</p>` : ''}
                    ${showKontak ? `<p class="text-[14px] text-center font-medium w-[290px] break-words">${textKontak?.text && textKontak.text !== 'null'? textKontak.text : ''}</p>` : ''}
                     <!-- <p class="text-[14px] font-medium">www.kopikita.com</p> -->
                </div>

                <!-- Order Info Section -->
                <div class="py-[16px] border-t ">
                    <p class="text-[14px] font-medium">No. Order : #00${transaksiIds}</p>
                    <p class="text-[14px] font-medium">Waktu : ${transaksiDateTime}</p>
                    <p class="text-[14px] font-medium">Kasir : ${transaksiNamaKasir}</p>
                    <p class="text-[14px] font-medium">Pembayaran : ${transaksiPembayaran}</p>
                </div>

                <!-- Item List Section -->
                <div class="py-[16px] border-t  text-[14px] font-medium grid gap-[8px]">
                    ${detailTransaksiHTML}
                </div>

                <!-- Total Calculation Section -->
                <div class="py-[16px] border-t-2 border-dashed  text-[14px] font-medium grid gap-[8px]">
                    <div class="flex justify-between">
                    <p>Sub Total</p>
                    <p>${transaksiSubTotal}</p>
                    </div>
                     ${detailaPajakHTML}
                     ${detailaDiskonHTML}
                    <div class="flex justify-between text-[20px] font-bold">
                    <p>Total</p>
                    <p>${transaksiTotal}</p>
                    </div>
                    <div class="flex justify-between">
                    <p>Bayar</p>
                    <p>${transaksiBayar}</p>
                    </div>
                    <div class="flex justify-between">
                    <p>Kembalian</p>
                    <p>${transaksiKembalian}</p>
                    </div>
                </div>

                <!-- Footer Section -->
                <div class="p-[16px] grid justify-items-center items-center border-t ">
                ${showSosialMedia ? `
                    <div class="pb-[24px]">
                       ${sosialMediaContent}
                    </div>
                  ` : ''}
                  ${showCatatan ? `<p class="text-[14px] font-medium text-center w-[250px]  break-words">${textCatatan?.text && textCatatan.text !== 'null'? textCatatan.text : ''}</p>` : ''}
                    <p class="text-[10px] font-medium text-slate-500 mt-[24px]">Powered by Sirqu POS</p>
                </div>

                </div>
            </body>
            </html>
      `;

        // Send the HTML content as response
        const browser = await puppeteer.launch({
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      
      const page = await browser.newPage();
      
      // Memuat konten HTML ke halaman
      await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });
      
      // Mengambil ukuran halaman berdasarkan konten HTML
      const { width, height } = await page.evaluate(() => {
          const body = document.body;
          const html = document.documentElement;
          return {
              width: Math.max(390, 390),
              height: Math.max(body.scrollHeight, html.scrollHeight),
          };
      });
      
      // Setel viewport agar sesuai dengan ukuran halaman
      await page.setViewport({ width, height });
      
      // Mengambil screenshot dengan ukuran penuh
      const screenshotBuffer = await page.screenshot({
          type: "jpeg",
          quality: 100, // Kualitas tinggi
          fullPage: true, // Tangkap seluruh halaman
      });
      
      await browser.close();
      
      // Menyimpan file gambar
      const jpgPath = path.join(__dirname, "../receipt.jpg");
      await fs.promises.writeFile(jpgPath, screenshotBuffer);
      
      console.log(`JPG saved to ${jpgPath}`);
      
      // Kirim file gambar sebagai respons untuk diunduh
      res.status(200).download(jpgPath, "sirqu-receipt.jpg", (err) => {
          if (err) {
              console.error("Error while sending file:", err);
              res.status(500).send("Failed to download the file");
          } else {
              console.log("File sent successfully");
          }
      });

    } catch (error) {
        console.error("Error rendering HTML:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data struk"
        });
    }
};



exports.getTransaksiStrukMobile = async (req, res) => {
    try {


        // data transaksi
        const { id } = req.params;
        // Query SQL untuk mengambil data transaksi utama
        const queryTransaksi = `
          SELECT 
            t.id AS transaksi_id,
            t.outletsId AS outlet_id,
            t.kasirsId AS kasir_id,
            t.userId AS user_id,
            t.tipeOrder AS tipe_order,
            t.name AS transaksi_name,
            t.catatan,
            t.tipeBayar AS tipe_bayar,
            t.ketBayar AS ket_bayar,
            t.subTotal AS sub_total,
            t.total,
            t.bayar,
            t.kembalian,
            t.createdAt,
            o.nama AS outlet_name,
            u.name AS kasir_name
          FROM 
            transaksis AS t
          JOIN 
            outlets AS o ON t.outletsId = o.id
          JOIN 
            users AS u ON t.userId = u.id
          WHERE
             t.id = ${id}  -- Filter berdasarkan ID transaksi
        `;
    
        // Jalankan query untuk mendapatkan data transaksi
        const [transaksis] = await sequelize.query(queryTransaksi);

        const [DetailTransaksi] = await sequelize.query(`
            SELECT 
              dt.id,
              dt.transaksisId AS transaksi_id,
              dt.productsId AS product_id,
              dt.stok,
              p.name AS product_name,
              p.price AS product_price
            FROM 
              detailtransaksis AS dt
            JOIN 
              products AS p ON dt.productsId = p.id
            WHERE 
              dt.transaksisId = ${id}
          `);

        const [DetailPajak] = await sequelize.query(`
           SELECT 
              dp.id,
              dp.transaksisId AS transaksi_id,
              dp.pajaksId AS pajak_id,
              pj.name AS pajak_name,
              dp.harga
            FROM 
              detailpajaks AS dp
            JOIN 
              pajaks AS pj ON dp.pajaksId = pj.id
            WHERE 
              dp.transaksisId = ${id}
          `);

        const [DetailDiskon] = await sequelize.query(`
            SELECT 
          dd.id,
          dd.transaksisId AS transaksi_id,
          dd.diskonsId AS diskon_id,
          d.namaPromosi AS diskon_name,
          dd.harga
        FROM 
          detaildiskons AS dd
        JOIN 
          promosis AS d ON dd.diskonsId = d.id
        WHERE 
          dd.transaksisId = ${id}
          `);
    
      

        console.log(DetailTransaksi);
        const formatRupiah = (value) => {
            return new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(value);
          };
        const transaksiIds = transaksis.map(transaksi => transaksi.transaksi_id);
        const transaksiNamaKasir = transaksis.map(transaksi => transaksi.kasir_name);
        const transaksiPembayaran = transaksis.map(transaksi => transaksi.tipe_bayar);
        const transaksiSubTotal = transaksis.map(transaksi => formatRupiah(transaksi.sub_total));
        const transaksiTotal = transaksis.map(transaksi => formatRupiah(transaksi.total));
        const transaksiBayar = transaksis.map(transaksi => formatRupiah(transaksi.bayar));
        const transaksiKembalian = transaksis.map(transaksi => formatRupiah(transaksi.kembalian));
        const transaksiDateTime = transaksis.map(transaksi =>
            dayjs(transaksi.createdAt).format("DD MMM YYYY, HH.mm")
          );
        const detailTransaksiHTML = DetailTransaksi.map((detail) => `
          <div class="flex justify-between" >
              <div class="flex gap-[8px]">
               <p>${detail.stok}</p>
               <p class="font-bold" >${detail.product_name}</p>
              </div>
              <p>${formatRupiah(detail.product_price)}</p>
          </div>
      `).join('');

        const detailaPajakHTML = DetailPajak.map((detail) => `
          <div class="flex justify-between">
          <p>${detail.pajak_name}</p>
          <p>${formatRupiah(detail.harga)}</p>
          </div>
      `).join('');
      
        const detailaDiskonHTML = DetailDiskon.map((detail) => `
          <div class="flex justify-between">
          <p>${detail.diskon_name}</p>
          <p>- ${formatRupiah(detail.harga)}</p>
          </div>
      `).join('');




        // struk setting

          const strukData = await Struk.findAll(); 
          const [detailStrukTeks] = await sequelize.query(`
            SELECT dt.id AS detailStrukTeks_Id, dt.struksId AS struks_Id, struks.name, dt.text
            FROM detailstruktekss AS dt
            JOIN struks ON dt.struksId = struks.id
            WHERE dt.deletedAt IS NULL;
          `);

          const [detailStrukMedia] = await sequelize.query(`
            SELECT dm.id AS detailStrukMedia_Id, dm.struksId AS struks_Id, struks.name, dm.kategori, dm.nameMedia
            FROM detailstrukmedias AS dm
            JOIN struks ON dm.struksId = struks.id
            WHERE dm.deletedAt IS NULL;
          `);

          const [detailStrukLogo] = await sequelize.query(`
            SELECT dl.id AS detailStrukLogo_Id, dl.struksId AS struks_Id, struks.name, dl.logo
            FROM detailstruklogos AS dl
            JOIN struks ON dl.struksId = struks.id
            WHERE dl.deletedAt IS NULL;
          `);

          const detailLogo = detailStrukLogo.find(item => item.name === 'Logo');
          const logo = detailLogo ? `${process.env.API_URL}/images/${detailLogo.logo}` : '';

        // Buat variabel untuk status tiap elemen berdasarkan data Struk
        const showLogo = strukData.find(item => item.name === 'Logo' && item.status === 'true');
        const showNamaToko = strukData.find(item => item.name === 'Nama Toko' && item.status === 'true');
        const showAlamat = strukData.find(item => item.name === 'Alamat' && item.status === 'true');
        const showKontak = strukData.find(item => item.name === 'Kontak' && item.status === 'true');
        const showSosialMedia = strukData.find(item => item.name === 'Sosial Media' && item.status === 'true');
        const showCatatan = strukData.find(item => item.name === 'Catatan' && item.status === 'true');


        const textNamaToko = detailStrukTeks.find(item => item.name === 'Nama Toko');
        const textAlamat = detailStrukTeks.find(item => item.name === 'Alamat');
        const textKontak = detailStrukTeks.find(item => item.name === 'Kontak');
        const textCatatan = detailStrukTeks.find(item => item.name === 'Catatan');


        let sosialMediaContent = '';
        if (showSosialMedia && detailStrukMedia && detailStrukMedia.length > 0) {
            detailStrukMedia.forEach(item => {
                if (item.kategori === 'IG' && item.nameMedia !== 'null') {
                    sosialMediaContent += `<p class="text-[14px] font-medium">Instagram : ${item.nameMedia}</p>`;
                } else if (item.kategori === 'TW' && item.nameMedia !== 'null') {
                    sosialMediaContent += `<p class="text-[14px] font-medium">Twitter : ${item.nameMedia}</p>`;
                } else if (item.kategori === 'FB' && item.nameMedia !== 'null') {
                    sosialMediaContent += `<p class="text-[14px] font-medium">Facebook : ${item.nameMedia}</p>`;
                }
            });
        }

        // HTML content
        const htmlContent = `
          <html lang="en">
            <head>
             <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
            </head>
            <body >
                <div class=" bg-white p-[32px]">
                
                <!-- Shop Details Section -->
                <div class="p-[16px] flex-col flex justify-items-center items-center">
                    ${showLogo ? 
                        logo?
                        `<img src="${logo}" alt="Logo" class="w-[84px] h-[84px]" />` 
                        :''
                        : ''}
                    ${showNamaToko ? `<h1 class="text-[20px] text-center font-semibold py-[8px]  break-words">${textNamaToko?.text && textNamaToko.text !== 'null' ? textNamaToko.text : ''}</h1>` : ''}
                    ${showAlamat ? `<p class="text-[14px] text-center font-medium  break-words">${textAlamat?.text && textAlamat.text !== 'null'? textAlamat.text : ''}</p>` : ''}
                    ${showKontak ? `<p class="text-[14px] text-center font-medium  break-words">${textKontak?.text && textKontak.text !== 'null'? textKontak.text : ''}</p>` : ''}
                     <!-- <p class="text-[14px] font-medium">www.kopikita.com</p> -->
                </div>

                <!-- Order Info Section -->
                <div class="py-[16px] border-t ">
                    <p class="text-[14px] font-medium">No. Order : #00${transaksiIds}</p>
                    <p class="text-[14px] font-medium">Waktu : ${transaksiDateTime}</p>
                    <p class="text-[14px] font-medium">Kasir : ${transaksiNamaKasir}</p>
                    <p class="text-[14px] font-medium">Pembayaran : ${transaksiPembayaran}</p>
                </div>

                <!-- Item List Section -->
                <div class="py-[16px] border-t text-[14px] font-medium grid gap-[8px]">
                    ${detailTransaksiHTML}
                </div>

                <!-- Total Calculation Section -->
                <div class="py-[16px] border-t-2 border-dashed  text-[14px] font-medium grid gap-[8px]">
                    <div class="flex justify-between">
                    <p>Sub Total</p>
                    <p>${transaksiSubTotal}</p>
                    </div>
                     ${detailaPajakHTML}
                     ${detailaDiskonHTML}
                    <div class="flex justify-between text-[20px] font-bold">
                    <p>Total</p>
                    <p>${transaksiTotal}</p>
                    </div>
                    <div class="flex justify-between">
                    <p>Bayar</p>
                    <p>${transaksiBayar}</p>
                    </div>
                    <div class="flex justify-between">
                    <p>Kembalian</p>
                    <p>${transaksiKembalian}</p>
                    </div>
                </div>

                <!-- Footer Section -->
                <div class="p-[16px] flex-col flex justify-items-center items-center border-t ">
                ${showSosialMedia ? `
                    <div class="pb-[24px]">
                       ${sosialMediaContent}
                    </div>
                  ` : ''}
                  ${showCatatan ? `<p class="text-[14px] font-medium text-center w-[250px]  break-words">${textCatatan?.text && textCatatan.text !== 'null'? textCatatan.text : ''}</p>` : ''}
                    <p class="text-[10px] font-medium text-slate-500 mt-[24px]">Powered by Sirqu POS</p>
                </div>

                </div>
            </body>
            </html>
      `;

        // Send the HTML content as response
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(htmlContent);

    } catch (error) {
        console.error("Error rendering HTML:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data struk"
        });
    }
};
