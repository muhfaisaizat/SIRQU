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
4. Migrate database sirqu `npx sequelize-cli db:migrate`
5. lakukan seeder  sesuai urutan berikut ini :
   - user `npx sequelize-cli db:seed --seed roleSeeder.js`
   - pajak `npx sequelize-cli db:seed --seed pajaksSeeder.js`
   - struk `npx sequelize-cli db:seed --seed strukSeeder.js`
   - detail struk 1 `npx sequelize-cli db:seed --seed detailStrukTekssSeeder.js`
   - detail struk 2 `npx sequelize-cli db:seed --seed detailStrukMediasSeeder.js`
   - detail struk 3 `npx sequelize-cli db:seed --seed detailStrukLogosSeeder.js`
6. Jalankan server backend: `nodemon app` atau `node app`
7. Buka tab browser kemudian buka url berikut `http://localhost:5000/api-sirqu/`
   
### 2. Menyiapkan Frontend

1. Buka terminal dan pindah ke direktori frontend: `cd frontend`
2. Instal dependensi: `npm install` atau, jika menggunakan yarn: `yarn install`
3. Jalankan server frontend: `npm run dev` atau `yarn dev`
4. Frontend akan berjalan di `http://localhost:5173`

Untuk login menggunakan dummy account admin:\
`Email : admin@gmail.com`
`Password : Admin123`


