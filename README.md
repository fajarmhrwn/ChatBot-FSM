# Chatbot Flow API

Ini adalah REST API sederhana yang dibuat menggunakan TypeScript dan Express.js untuk mendukung chatbot berbasis alur pemesanan menu restoran.

## Prasyarat

Sebelum memulai, pastikan Anda sudah menginstal:
* [Node.js](https://nodejs.org/) (v18 atau lebih baru)
* [Docker](https://www.docker.com/) dan Docker Compose

---
## 🚀 Setup dan Instalasi

Ikuti langkah-langkah berikut untuk menjalankan aplikasi ini secara lokal.

1.  **Clone Repositori**
    ```bash
    git clone [https://github.com/fajarmhrwn/ChatBot-FSM.git](https://github.com/fajarmhrwn/ChatBot-FSM.git)
    cd ChatBot-FSM
    ```

2.  **Buat File `.env`**
    Salin file `.env.example` menjadi `.env`.
    ```bash
    cp .env.example .env
    ```
    Pastikan `DATABASE_URL` di dalam file `.env` sudah benar untuk lingkungan lokal Anda.
    ```env
    DATABASE_URL="postgresql://admin:password@localhost:5432/db"
    ```

3.  **Install Dependensi**
    Install semua dependensi proyek dengan `npm`.
    ```bash
    npm install
    ```

4.  **Jalankan Database**
    Gunakan Docker Compose untuk menjalankan database PostgreSQL di latar belakang.
    ```bash
    docker-compose up -d
    ```

5.  **Sinkronkan Skema Database**
    Terapkan skema Prisma ke database Anda. Perintah ini akan membuat tabel yang dibutuhkan.
    ```bash
    npx prisma db push
    ```

6.  **Generate Prisma Client**
    Pastikan Prisma Client Anda sinkron dengan skema.
    ```bash
    npx prisma generate
    ```

7.  **Jalankan Aplikasi**
    Mulai server pengembangan.
    ```bash
    npm run dev
    ```
    Server akan berjalan di `http://localhost:3000`.

---
## 📁 Struktur Folder

Proyek ini menggunakan struktur folder yang logis untuk memisahkan setiap bagian dari aplikasi sesuai dengan tanggung jawabnya.
/
├── prisma/             # Skema dan migrasi Prisma
├── src/
│   ├── controllers/    # Menangani request dan response HTTP
│   ├── repositories/   # Logika akses data (Prisma)
│   ├── routes/         # Definisi endpoint API
│   ├── services/       # Logika bisnis inti
│   ├── types/          # Definisi interface TypeScript
│   └── utils/          # Fungsi bantuan dan konfigurasi
├── .env                # Variabel lingkungan
├── docker-compose.yml  # Konfigurasi Docker
└── package.json


---
## ⚙️ Detail Implementasi

Logika inti dari chatbot ini diimplementasikan menggunakan pola desain **Finite State Machine (FSM)** atau Mesin Status Terbatas.

Setiap langkah dalam percakapan dianggap sebagai sebuah **state** (status). Input dari pengguna berfungsi sebagai **event** yang memicu transisi dari satu state ke state berikutnya. Alur percakapan didefinisikan secara deklaratif dalam sebuah file konfigurasi, yang kemudian dijalankan oleh `Bot Engine`.

Pendekatan ini membuat alur percakapan menjadi terstruktur, mudah diprediksi, dan gampang untuk dimodifikasi atau diperluas di masa depan tanpa mengubah logika inti dari bot itu sendiri.

![Diagram Alur FSM](./fsm.png)

---
## 💾 Penyimpanan Data

Aplikasi ini menggunakan **PostgreSQL** sebagai database utamanya. Database ini dijalankan di dalam kontainer Docker untuk kemudahan setup dan isolasi lingkungan.

**Prisma ORM** digunakan sebagai lapisan abstraksi untuk berinteraksi dengan database, memungkinkan pengembangan yang *type-safe* dan manajemen skema yang mudah.

---
## 🧪 Menguji API Endpoints

Cara termudah untuk menguji API adalah melalui dokumentasi interaktif **Swagger UI** yang sudah terintegrasi.

1.  Pastikan server aplikasi Anda sedang berjalan.
2.  Buka browser dan kunjungi:
    **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

Di halaman tersebut, Anda bisa melihat semua *endpoint* yang tersedia, melihat skema *request* dan *response*, serta langsung mencoba API dengan menekan tombol "Try it out".

**Contoh Menguji "Start Conversation":**
1.  Buka bagian `POST /api/chat/start`.
2.  Klik tombol "Try it out".
3.  Klik tombol "Execute".
4.  Anda akan melihat respons JSON dari server di bawahnya.
