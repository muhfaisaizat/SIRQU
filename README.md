# Sistem Point of Sales || SIRQU (sistem kasir ku)
## Deskripsi
Repositori ini adalah proyek web aplikasi yang terdiri dari dua bagian utama:
- **Backend**: Berisi API dan logika server-side.
- **Frontend**: Antarmuka pengguna yang dibangun dengan ReactJS dan Vite.

## Struktur Proyek
. ├── backend/ └── frontend/


## Prasyarat
Pastikan sudah menginstal:
- [Node.js](https://nodejs.org/) (disarankan versi LTS)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)

## Petunjuk Penginstalan dan Menjalankan Proyek

### 1. Menyiapkan Backend

1. Buka terminal dan pindah ke direktori backend: `cd backend`
2. Instal dependensi: `npm install` atau, jika menggunakan yarn: `yarn install`
3. Buat database pada mysql dengan nama `sirqu_db_fix`
4. Migrate database sirqu `npx sequelize-cli db:migrate` dan lakukan seeder user `npx sequelize db:seed:all`
5. Jalankan server backend: `nodemon app` atau `node app`
6. Buka tab browser kemudian buka url berikut `http://localhost:5000/api-sirqu/`
   
### 2. Menyiapkan Frontend

1. Buka terminal dan pindah ke direktori frontend: `cd frontend`
2. Instal dependensi: `npm install` atau, jika menggunakan yarn: `yarn install`
3. Jalankan server frontend: `npm run dev` atau `yarn dev`
4. Frontend akan berjalan di `http://localhost:5173`

Untuk login menggunakan dummy account admin:\
`Email : admin@gmail.com`
`Password : Admin123`

Untuk tampilan buat Toko Utama setelah login ganti URL:\
`http://localhost:5173/admin-panel/wellcome`
