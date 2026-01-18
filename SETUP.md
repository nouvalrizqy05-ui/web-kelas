# Setup Panduan - Web Kelas dengan Supabase

Project ini telah dimigrasi dari Firebase ke Supabase. Berikut adalah langkah-langkah untuk menjalankan project ini.

## Persyaratan

- Node.js (versi 16 atau lebih tinggi)
- Akun Supabase (gratis)

## Langkah 1: Install Dependencies

```bash
npm install
```

## Langkah 2: Setup Supabase

### 2.1 Buat Project Supabase

1. Kunjungi [supabase.com](https://supabase.com)
2. Buat akun atau login
3. Klik "New Project"
4. Isi detail project (nama, database password, region)
5. Tunggu project selesai dibuat

### 2.2 Dapatkan Credentials

1. Di dashboard Supabase, pergi ke Settings > API
2. Copy **Project URL** dan **anon/public key**

### 2.3 Konfigurasi Environment Variables

1. Buka file `.env` di root project
2. Ganti placeholder dengan credentials Supabase Anda:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Langkah 3: Setup Database

Database migrations sudah dibuat secara otomatis. Tables berikut akan dibuat:

- **chats** - Untuk menyimpan pesan anonim
- **ratings** - Untuk menyimpan rating dari user
- **blacklist_ips** - Untuk memblokir IP tertentu

Storage buckets:
- **gallery-images** - Untuk foto gallery kelas
- **request-images** - Untuk foto yang di-upload user

### 3.1 Upload Foto Gallery

1. Di dashboard Supabase, pergi ke Storage
2. Pilih bucket **gallery-images**
3. Upload foto-foto gallery kelas Anda
4. Foto-foto ini akan otomatis muncul di carousel gallery

## Langkah 4: Jalankan Development Server

```bash
npm run dev
```

Buka browser dan akses `http://localhost:5173`

## Langkah 5: Build untuk Production

```bash
npm run build
```

Hasil build akan ada di folder `dist/`

## Fitur-Fitur

1. **Text Anonim** - User bisa mengirim pesan anonim (maksimal 20 pesan per hari per IP)
2. **Gallery** - Menampilkan foto-foto kelas dalam carousel
3. **Upload Image** - User bisa upload foto (maksimal 20 foto per hari, 10MB per foto)
4. **Rating** - User bisa memberikan rating (maksimal 3 kali)
5. **Structure & Schedule** - Menampilkan struktur organisasi dan jadwal kelas

## Memblokir User berdasarkan IP

Untuk memblokir user tertentu:

1. Pergi ke Supabase dashboard > Table Editor
2. Pilih table **chats**
3. Lihat kolom `user_ip` untuk mendapatkan IP address
4. Pergi ke table **blacklist_ips**
5. Insert row baru dengan `ip_address` yang ingin diblokir

## Troubleshooting

### Error: Invalid API key

- Pastikan `.env` file sudah benar
- Pastikan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY sudah diisi
- Restart development server setelah mengubah .env

### Images tidak muncul

- Pastikan bucket **gallery-images** sudah dibuat
- Pastikan bucket sudah di-set public
- Pastikan sudah upload beberapa foto ke bucket

### Chat tidak berfungsi

- Pastikan table **chats** sudah dibuat
- Pastikan Row Level Security (RLS) policies sudah aktif

## Teknologi yang Digunakan

- React JS + Vite
- Supabase (Database + Storage)
- Material UI
- Tailwind CSS
- Slick Carousel
- AOS (Animate On Scroll)

## Catatan Penting

- File `.env` tidak akan ter-commit ke Git (sudah ada di .gitignore)
- Jangan share credentials Supabase ke publik
- Untuk production, pastikan setup proper Row Level Security di Supabase
