# EchoPath: Word Builders

EchoPath adalah permainan edukatif membangun kata dalam bahasa Inggris bertema pixel-art 32-bit yang ditujukan untuk anak-anak usia 6-12 tahun. Game ini menampilkan level-level yang imersif dan sistem hadiah stiker yang menarik.

## Fitur Utama

- **Level Berbasis Petualangan**: Jelajahi Dino Forest, Space Station, dan Pirate Cove.
- **Sistem Hadiah**: Kumpulkan bintang dan stiker unik untuk setiap level yang berhasil diselesaikan.
- **Dukungan Keyboard & AI**: Gunakan angka 1-4 untuk memilih jawaban dan tombol 'H' untuk hint AI.
- **Responsif**: Bekerja dengan baik di layar komputer maupun HP.

## Tutorial: Upload ke GitHub & Deploy ke Vercel

### 1. Cara Upload ke GitHub

**PENTING**: Jangan pernah meng-upload folder `node_modules` atau `dist`.

1. Buat repositori baru di GitHub (jangan centang "Initialize with README").
2. Buka terminal di folder proyek Anda.
3. Jalankan perintah ini:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - EchoPath Fixed"
   git branch -M main
   git remote add origin https://github.com/USERNAME_ANDA/REPOS_ANDA.git
   git push -u origin main
   ```

### 2. Cara Deploy ke Vercel

1. Masuk ke [Vercel](https://vercel.com).
2. Klik **"Add New"** > **"Project"**.
3. Import repositori GitHub Anda.
4. Pada bagian **Environment Variables**, tambahkan:
   - `GEMINI_API_KEY`: (Isi dengan API Key dari Google AI Studio)
5. Klik **Deploy**.

## Cara Instalasi Secara Lokal

1. Clone repositori: `git clone <url>`
2. Instal dependensi: `npm install`
3. Jalankan server: `npm run dev`

## Struktur Proyek

```text
/src
  /components     # Komponen UI
  /services       # Logika API (Gemini AI)
  /constants      # Data level & stiker
  /types          # Definisi TypeScript
  App.tsx        # Komponen utama
```

## Lisensi
MIT License
