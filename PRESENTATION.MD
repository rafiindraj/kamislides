---
marp: true
theme: default
paginate: true
title: Tenang & Cemerlang — 
---

# Tenang & Cemerlang
## Cara Menghilangkan Stress dan Mendapat Ide Bagus untuk Software Engineer

Termasuk: **Rubber Duck Debugging** dan **AI Agent Talking**

---

# 1. Mengapa Topik Ini Penting?

Pekerjaan engineer penuh pemicu stress:

- Bug sulit dilacak dan deadline ketat
- *Context switching* (meeting, chat, code review, on-call)
- Kompleksitas sistem yang terus bertambah
- Tekanan untuk selalu belajar teknologi baru

**Stress menurunkan kualitas berpikir. Pikiran tenang menghasilkan solusi lebih baik.**

---

# 2. Kenali Tanda-Tanda Stress

- Membaca kode yang sama berulang-ulang tanpa paham
- Mudah kesal pada bug, rekan, atau tool
- Sulit tidur karena memikirkan pekerjaan
- Menunda tugas yang sebenarnya sederhana
- Merasa "buntu" dan kehilangan motivasi

> Mengenali sinyalnya lebih awal membuat penanganannya lebih ringan.

---

# 3. Dua Mode Berpikir

| Mode | Cocok untuk | Contoh aktivitas |
|---|---|---|
| **Fokus** | Menulis kode, debugging terarah | Deep work, tanpa notifikasi |
| **Difus** | Ide baru, koneksi antar konsep | Jalan kaki, mandi, melamun |

**Kunci:** bergantian antara keduanya. Terus memaksa mode fokus saat buntu justru memperburuk keadaan.

---

# 4. Rubber Duck Debugging: Apa Itu?

- Teknik menjelaskan kode **baris demi baris** kepada benda tak hidup (bebek karet)
- Dipopulerkan lewat buku *The Pragmatic Programmer* (Hunt & Thomas)
- Intinya bukan pada bebeknya, tetapi pada **proses menjelaskan**

**Mengapa berhasil?**
Menjelaskan memaksa kita memeriksa asumsi yang selama ini kita lewati begitu saja.

---

# 5. Cara Melakukan Rubber Duck Debugging

1. Letakkan "bebek" (boleh benda apa saja, atau catatan kosong)
2. Jelaskan **tujuan** kode: apa yang seharusnya terjadi?
3. Telusuri kode **satu baris per satu baris**, ucapkan dengan lantang
4. Jelaskan **apa yang sebenarnya terjadi** dan di mana bedanya
5. Perhatikan saat kalimat Anda terhenti atau ragu: biasanya bug ada di sana

---

# 6. Contoh Rubber Duck Debugging

```python
def average(numbers):
    total = 0
    for n in numbers:
        total += n
    return total / len(numbers)
```

> "Bebek, fungsi ini menghitung rata-rata. Total dijumlah dari semua angka, lalu dibagi jumlah elemen... tunggu, bagaimana kalau `numbers` kosong?"

**Hasil:** potensi `ZeroDivisionError` ditemukan **tanpa menjalankan kode apa pun**.

---

# 7. AI Agent Talking: Apa Itu?

Berdiskusi dengan AI agent sebagai **rubber duck yang bisa membalas**.

- Bebek biasa: hanya mendengar
- AI agent: mendengar, bertanya balik, menawarkan sudut pandang lain
- Cocok untuk debugging, desain arsitektur, dan *brainstorming* ide

**Posisi AI:** rekan berpikir, bukan pengganti penilaian Anda.

---

# 8. Cara Berbicara dengan AI Agent secara Efektif

1. **Konteks:** stack, versi, dan tujuan
2. **Gejala:** error message, perilaku aktual vs yang diharapkan
3. **Sudah dicoba:** apa saja yang telah Anda lakukan
4. **Permintaan jelas:** "jelaskan", "kritik desain ini", atau "beri 3 alternatif"
5. **Iterasi:** ajukan pertanyaan lanjutan, jangan berhenti di jawaban pertama

---

# 9. Contoh Prompt: AI sebagai Rubber Duck

```text
Saya akan menjelaskan kode saya langkah demi langkah.
Tugasmu: dengarkan, lalu ajukan pertanyaan yang
menyingkap asumsi saya. Jangan beri solusi dulu.

Konteks: endpoint /orders kadang mengembalikan data duplikat.
Berikut alur saya: ...
```

**Hasilnya:** Anda tetap menemukan sendiri akar masalahnya, dengan bantuan pertanyaan yang tajam.

---

# 10. AI Agent untuk Menggali Ide

Prompt yang berguna saat buntu:

- "Beri 5 pendekatan berbeda untuk masalah ini beserta trade-off-nya."
- "Peran-kan dirimu sebagai reviewer yang skeptis: apa kelemahan desain ini?"
- "Jelaskan konsep ini seperti kepada junior engineer."
- "Apa asumsi tersembunyi dalam rencana saya?"

> Ide terbaik sering muncul dari **pertanyaan yang tepat**, bukan dari jawaban pertama.

---

# 11. Teknik Lain Menurunkan Stress

- **Pomodoro:** 25 menit fokus, 5 menit istirahat
- **Aturan 20-20-20:** tiap 20 menit, lihat objek sejauh 20 kaki selama 20 detik
- **Jalan kaki singkat** tanpa gawai
- **Napas teratur:** tarik 4 detik, tahan, hembuskan perlahan
- **Tulis dulu, selesaikan nanti:** keluarkan beban pikiran ke catatan
- **Batasi notifikasi** pada jam deep work

---

# 12. Cara Memancing Ide Cemerlang

- **Tinggalkan masalah sejenak:** ide sering datang saat mandi atau berjalan
- **Catat segera:** siapkan notes untuk menangkap ide sebelum hilang
- **Beri batasan:** "bagaimana jika hanya 50 baris kode?" memicu kreativitas
- **Ubah sudut pandang:** jelaskan masalah dari sisi pengguna atau QA
- **Tidur cukup:** otak merapikan informasi saat istirahat
- **Diskusi:** dengan rekan, bebek karet, atau AI agent

---

# 13. Contoh Rutinitas Harian

| Waktu | Aktivitas |
|---|---|
| Pagi | Tentukan 1–3 prioritas, deep work pertama |
| Siang | Istirahat sungguhan, makan, jalan kaki |
| Saat buntu | Rubber duck, lalu AI agent talking |
| Sore | Review & kolaborasi, tutup hari dengan catatan |
| Malam | Lepas dari layar, tidur cukup |

---

# 14. Kapan Perlu Bertemu Psikolog?

Teknik mandiri tidak selalu cukup. Pertimbangkan bantuan profesional jika:

- Stress, cemas, atau murung berlangsung berminggu-minggu dan tidak membaik
- Tidur, nafsu makan, atau konsentrasi terganggu terus-menerus
- Kehilangan minat pada pekerjaan atau hobi yang dulu disukai
- Buntu ide berkepanjangan meski sudah istirahat dan mencoba teknik di atas
- Stress mulai memengaruhi hubungan atau kesehatan fisik

**Langkah awal:** hubungi psikolog klinis (online atau tatap muka), cek layanan konseling dari kantor atau kampus, atau datangi puskesmas/rumah sakit.

> Mencari bantuan adalah bentuk kepedulian pada diri sendiri, bukan kelemahan.

Jika muncul pikiran untuk menyakiti diri sendiri, segera hubungi layanan darurat atau orang terdekat.

---

# 15. Hal yang Perlu Diwaspadai

- **Verifikasi jawaban AI:** bisa keliru atau terdengar meyakinkan padahal salah
- **Jangan bagikan data sensitif:** kunci API, data pelanggan, kode rahasia perusahaan
- **Jangan bergantung penuh:** tetap latih kemampuan berpikir mandiri

---

# 16. Ringkasan & Langkah Berikutnya

**Ringkasan**
1. Kenali tanda stress lebih awal
2. Bergantian antara mode fokus dan difus
3. Jelaskan masalah: ke bebek karet atau AI agent
4. Istirahat adalah bagian dari produktivitas
5. Jika stress atau buntu ide berlanjut, temui psikolog

**Mulai hari ini:** pilih satu teknik, coba satu minggu, lalu evaluasi.

### Terima kasih. Ada pertanyaan?