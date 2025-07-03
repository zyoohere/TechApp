# 📰 TechApp

**TechApp** adalah sistem portal berita berbasis Laravel 12 dan InertiaJS + React, yang dirancang untuk kebutuhan publikasi kampus atau komunitas. Proyek ini mencakup fitur-fitur modern seperti manajemen artikel, komentar, sistem OTP, dan dashboard admin.

---

## 🚀 Fitur Utama

- 🧑‍💻 **Authentication**
  - Register, Login
  - OTP reset password
  - Verifikasi email
- 📰 **Artikel**
  - Detail artikel, komentar, kategori, pencarian
  - Sistem rating & artikel terkait
- 👤 **Profil Pengguna**
  - Edit nama, avatar, bio
  - Ganti password, logout semua perangkat
  - Hapus akun, email verifikasi
- 🔒 **Dashboard Admin (Filament)**
  - Manajemen artikel, komentar, kategori, tag
  - Manajemen user, role, permission (Spatie)

---

## ⚙️ Setup Lokal

```bash
# 1. Clone repositori
git clone https://github.com/USERNAME/techapp.git
cd techapp

# 2. Install dependensi
composer install
npm install && npm run dev

# 3. Salin file .env dan generate key
cp .env.example .env
php artisan key:generate

# 4. Setup database dan migrasi
php artisan migrate --seed

# 5. Jalankan server
php artisan serve
