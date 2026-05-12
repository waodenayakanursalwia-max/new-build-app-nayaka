# EchoPath: Word Builders

EchoPath adalah permainan edukakif membangun kata dalam bahasa Inggris bertema pixel-art 32-bit yang ditujukan untuk anak-anak usia 6-12 tahun. Game ini menampilkan level-level yang imersif dan sistem hadiah stiker yang menarik.

## Fitur Utama

- **Level Berbasis Petualangan**: Jelajahi Dino Forest, Space Station, dan Pirate Cove.
- **Sistem Hadiah**: Kumpulkan bintang dan stiker unik untuk setiap level yang berhasil diselesaikan.
- **Pixel Art Aesthetic**: Desain visual retro yang menarik untuk anak-anak.
- **Progress Tracking**: Level baru terbuka seiring kemajuan pemain.

## Teknologi yang Digunakan

- **React 18+**
- **TypeScript**
- **Vite** (Build Tool)
- **Tailwind CSS** (Styling)
- **Motion** (Animasi)
- **Lucide React** (Ikon)

## Cara Instalasi Secara Lokal

1. Clone repositori ini:
   ```bash
   git clone <url-repositori-anda>
   ```

2. Masuk ke direktori proyek:
   ```bash
   cd echopath-word-builders
   ```

3. Instal dependensi:
   ```bash
   npm install
   ```

4. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

## Konfigurasi Environment

Salin file `.env.example` menjadi `.env` dan isi nilai-nilainya:

```bash
cp .env.example .env
```

Nilai yang dibutuhkan:
- `GEMINI_API_KEY`: Kunci API untuk fitur AI (opsional saat ini).

## Deployment ke Vercel

Aplikasi ini sudah dikonfigurasi untuk langsung di-deploy ke Vercel.

1. Hubungkan akun GitHub Anda ke Vercel.
2. Pilih repositori `echopath-word-builders`.
3. Vercel akan secara otomatis mendeteksi pengaturan Vite.
4. Pastikan untuk menambahkan **Environment Variables** di dashboard Vercel jika Anda menggunakan fitur AI.

## Struktur Proyek

```text
/src
  /components     # Komponen UI yang dapat digunakan kembali
  /services       # Logika untuk API (seperti Gemini AI)
  /constants      # Data statis untuk level dan stiker
  /types          # Definisi tipe TypeScript
  App.tsx        # Komponen utama aplikasi
  main.tsx       # Entry point
```

## Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detailnya.
