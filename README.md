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

### 1. Persiapan GitHub
Jika Anda belum meng-upload kode ke GitHub:
1. Buat repositori baru di GitHub.
2. Jalankan perintah berikut di terminal komputer Anda:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <URL_REPOSITORI_GITHUB_ANDA>
   git push -u origin main
   ```

### 2. Hubungkan ke Vercel
1. Masuk ke [Vercel](https://vercel.com).
2. Klik **"Add New"** > **"Project"**.
3. Pilih repositori GitHub Anda.
4. Pada bagian **Build & Development Settings**:
   - **Framework Preset**: Pilih `Vite` (Vercel biasanya mendeteksi ini secara otomatis).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Pada bagian **Environment Variables**:
   - Tambahkan `GEMINI_API_KEY` jika Anda ingin fitur Hint AI berfungsi.
6. Klik **Deploy**.

### Solusi Error "Not Found" di Vercel
Jika Anda mendapatkan error "Not Found" setelah deploy:
1. **Pastikan `index.html` berada di root folder**: Jangan pindahkan `index.html` ke dalam folder `src` atau `public`. Proyek ini sudah meletakkannya di tempat yang benar.
2. **Cek `vercel.json`**: File ini sudah saya sertakan untuk menangani routing Single Page Application (SPA). Pastikan file ini ikut ter-upload ke GitHub.
3. **Internal Routing**: Jika Anda menggunakan navigasi, pastikan semua path diarahkan kembali ke `index.html` (sudah diatur di `vercel.json`).
4. **Case Sensitivity**: Pastikan nama file yang di-import di kode (seperti `import App from './App.tsx'`) sama persis besar-kecil hurufnya dengan nama file aslinya. Contoh: `App.tsx` tidak sama dengan `app.tsx`.

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
