# SoluSistem - Platform Layanan Service IT

Website platform layanan service IT modern dan responsif yang dibangun dengan HTML, CSS, dan JavaScript, terintegrasi dengan Firebase untuk penyimpanan data booking.

## Fitur Utama

- **Navigasi Lengkap**: Home, Layanan, Booking, Tentang, Kontak
- **Tampilan Modern**: Desain responsif dengan hero section yang menarik
- **Layanan dalam Bentuk Card**: Enam layanan IT utama dengan ikon dan deskripsi
- **Form Booking Interaktif**: Terhubung dengan database Firebase
- **Testimoni**: Ulasan dari klien dengan foto profil
- **Tombol WhatsApp**: Link langsung ke WhatsApp untuk konsultasi
- **Efek Interaktif**: Hover effects dan smooth scroll
- **Footer Profesional**: Informasi kontak dan link sosial

## Struktur File

```
solusistem-2/
├── index.html      # File HTML utama
├── styles.css      # Styling CSS
├── script.js       # JavaScript untuk interaktivitas
└── README.md       # Dokumentasi ini
```

## Setup dan Instalasi

### 1. Persiapan Firebase

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Buat project baru atau gunakan project yang sudah ada
3. Aktifkan Firestore Database
4. Pergi ke Project Settings > General > Your apps
5. Klik "Add app" dan pilih Web app (</>)
6. Salin konfigurasi Firebase SDK

### 2. Konfigurasi Firebase di Kode

Buka `index.html` dan ganti placeholder Firebase config dengan konfigurasi Anda:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 3. Menjalankan Website

1. Buka file `index.html` di browser web modern (Chrome, Firefox, Safari, Edge)
2. Website akan berjalan secara lokal

### 4. Deploy ke Production

Untuk deploy ke server production:

1. **Firebase Hosting** (Direkomendasikan):
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   firebase deploy
   ```

2. **Netlify**:
   - Upload file `index.html`, `styles.css`, dan `script.js` ke Netlify
   - Site akan otomatis deploy

3. **Vercel**:
   - Connect repository ke Vercel
   - Deploy otomatis

## Penggunaan

### Navigasi
- Klik menu navigasi untuk berpindah ke section yang berbeda
- Pada mobile, klik hamburger menu untuk membuka menu navigasi

### Form Booking
- Isi semua field yang diperlukan
- Pilih layanan yang dibutuhkan dari dropdown
- Klik "Kirim Booking" untuk menyimpan data ke Firebase

### WhatsApp Integration
- Klik tombol WhatsApp hijau di kanan bawah untuk chat langsung
- Pesan default akan terisi otomatis

## Kustomisasi

### Mengubah Konten
- Edit teks di `index.html`
- Ganti gambar placeholder dengan gambar asli
- Update informasi kontak di footer

### Mengubah Styling
- Modifikasi `styles.css` untuk mengubah warna, font, layout
- Variabel warna utama: `#667eea` (biru) dan `#764ba2` (ungu)

### Menambah Layanan Baru
- Tambahkan card baru di section services di `index.html`
- Ikuti struktur HTML yang sudah ada

## Troubleshooting

### Firebase Tidak Terhubung
- Pastikan konfigurasi Firebase sudah benar
- Periksa console browser untuk error
- Jika Firebase belum setup, data akan disimpan di localStorage sebagai demo

### Website Tidak Responsif
- Pastikan viewport meta tag ada di `index.html`
- Periksa CSS media queries di `styles.css`

### Form Tidak Mengirim
- Periksa koneksi internet untuk Firebase
- Lihat console browser untuk error JavaScript
- Pastikan semua field required sudah diisi

### Animasi Tidak Berjalan
- Browser mungkin tidak mendukung Intersection Observer
- Tambahkan polyfill jika diperlukan

## Browser Support

- Chrome 58+
- Firefox 55+
- Safari 11+
- Edge 79+

## Setup EmailJS untuk Notifikasi Admin

Untuk menerima email notifikasi saat ada booking baru:

1. **Buat akun EmailJS**: Kunjungi [https://www.emailjs.com/](https://www.emailjs.com/) dan daftar akun gratis

2. **Setup Email Service**:
   - Di dashboard EmailJS, klik "Email Services"
   - Pilih provider email (Gmail, Outlook, dll.)
   - Ikuti instruksi untuk menghubungkan email Anda

3. **Buat Email Template**:
   - Klik "Email Templates"
   - Buat template baru dengan konten berikut:
     ```
     Subject: Booking Baru - {{booking_id}}

     Halo Admin SoluSistem,

     Ada booking layanan baru:

     ID Booking: {{booking_id}}
     Nama: {{from_name}}
     Email: {{from_email}}
     Telepon: {{phone}}
     Layanan: {{service}}
     Tanggal: {{date}}
     Pesan: {{message}}
     Waktu: {{timestamp}}

     Silakan hubungi klien untuk konfirmasi.
     ```

4. **Dapatkan ID yang Diperlukan**:
   - Service ID: Dari Email Services
   - Template ID: Dari Email Templates  
   - Public Key: Dari Account > General

5. **Update Kode**:
   - Ganti `YOUR_EMAILJS_PUBLIC_KEY` di `index.html`
   - Ganti `YOUR_EMAILJS_SERVICE_ID` dan `YOUR_EMAILJS_TEMPLATE_ID` di `script.js`
   - Ganti `admin@solusistem.com` dengan email admin di `script.js`

## Kontak

Untuk pertanyaan atau dukungan:
- Email: info@solusistem.com
- WhatsApp: +62 812 3456 7890