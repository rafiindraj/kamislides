import { ISlide } from '../models/slide.interface';

export const PRESENTATION_SLIDES: ISlide[] = [
  {
    id: 0,
    slideNumber: 0,
    slug: 'intro-speaker',
    title: 'Kerja Tenang, Pikiran Senang',
    subtitle: 'Cara Ngilangin Stress & Nemu Ide Segar buat Software Engineer',
    category: 'intro',
    categoryLabel: 'PENGANTAR & PEMBICARA',
    layout: 'intro',
    presenterInfo: {
      name: 'Rafi Indrajati',
      role: 'Front End Developer',
      department: 'Divisi TSI (Teknologi Sistem Informasi)',
      organization: 'PT BRI Asuransi Indonesia (BRINS)'
    },
    keyTakeaway: 'Biar ngoding gak cuma kejar deadline sambil overthinking, tapi tetap waras, santai, dan solutif.',
    notes: [
      'Sapa audiens dengan santai dan akrab: Halo rekan-rekan engineer BRINS!',
      'Kenalkan diri: Rafi Indrajati dari tim Frontend TSI BRINS.',
      'Sampaikan topik utama: Kerja Tenang, Pikiran Senang.'
    ]
  },
  {
    id: 1,
    slideNumber: 1,
    slug: 'mengapa-topik-ini-penting',
    title: '1. Kenapa Sih Topik Ini Penting?',
    subtitle: 'Dunia software engineer tuh seru, tapi pemicu pusingnya juga bejibun!',
    category: 'problem',
    categoryLabel: 'REALITA KODING',
    layout: 'split-hero',
    keyTakeaway: 'Otak yang panik bikin kode makin berantakan. Pikiran yang adem selalu nemu solusi arsitektur yang jauh lebih elegan.',
    items: [
      {
        title: 'Bug Gaib & Deadline Mepet',
        description: 'Error-nya gak jelas di mana, log-nya sepi, tapi besok pagi udah harus naik ke production.',
        badge: 'Pemicu 01',
        icon: 'bug'
      },
      {
        title: 'Context Switching Bikin Puyeng',
        description: 'Lagi enak-enakan fokus ngoding, tiba-tiba dipanggil meeting dadakan, bales chat Teams, review PR, plus on-call.',
        badge: 'Pemicu 02',
        icon: 'shuffle'
      },
      {
        title: 'Sistem Makin Hari Makin Rumit',
        description: 'Microservices bejibun, third-party API sering ngambek, kadang kita sendiri bingung siapa yang manggil siapa.',
        badge: 'Pemicu 03',
        icon: 'layers'
      },
      {
        title: 'FOMO Tech Baru Tiap Minggu',
        description: 'Kemarin baru kelar belajar library A, eh besok pagi udah viral framework Z yang katanya "wajib dikuasai engineer masa kini".',
        badge: 'Pemicu 04',
        icon: 'trending'
      }
    ],
    notes: [
      'Ajak audiens senyum: pasti semua pernah ngerasain 4 hal ini.',
      'Tekankan kalau stress itu normal, tapi cara kita menyikapinya yang bikin beda hasil kodingan.'
    ]
  },
  {
    id: 2,
    slideNumber: 2,
    slug: 'kenali-tanda-stress',
    title: '2. Tanda-Tanda Otak Kamu Mulai Ngebul',
    subtitle: 'Coba cek diri sendiri, ada yang ngerasa relate sama tanda-tanda ini?',
    category: 'problem',
    categoryLabel: 'CEK KONDISI DIRI',
    layout: 'checklist',
    quote: {
      text: 'Makin cepet kita sadar lagi stress, makin gampang balikin mood dan fokus buat mikir jernih.',
      author: 'Prinsip Kebugaran Software Engineer'
    },
    items: [
      {
        title: 'Baca Kode yang Sama Berulang Kali',
        description: 'Mata melototin layar fungsi itu-itu lagi, tapi satu baris pun gak ada yang nyantol di kepala.',
        badge: 'Otak Nge-hang'
      },
      {
        title: 'Gampang Kesel sama Hal Remeh',
        description: 'PR direview dikit rasanya pengen ngajak berantem, linter error langsung bikin bad mood seharian.',
        badge: 'Sumbu Pendek'
      },
      {
        title: 'Mau Tidur Malah Kepikiran Kodingan',
        description: 'Udah di kasur bukannya merem, malah mikir: "Query tadi ada indeksnya gak ya? Kalau null gimana ya?"',
        badge: 'Overthinking'
      },
      {
        title: 'Nunda-Nunda Tugas yang Simpel',
        description: 'Cuma ganti warna tombol atau nambahin satu if-else aja malesnya kayak mau mindahin gunung.',
        badge: 'Prokrastinasi'
      },
      {
        title: 'Ngerasa Buntu & Hilang Semangat',
        description: 'Sindrom impostor mendadak: "Aku beneran bisa ngoding gak sih?", padahal aslinya cuma butuh rehat.',
        badge: 'Baterai Drop'
      }
    ],
    notes: [
      'Bikin suasana santai: jangan malu kalau pernah ngerasain ini.',
      'Sampaikan kalau ini sinyal dari badan buat istirahat, bukan tanda kita gak kompeten.'
    ]
  },
  {
    id: 3,
    slideNumber: 3,
    slug: 'dua-mode-berpikir',
    title: '3. Dua Mode Otak: Fokus vs Difus',
    subtitle: 'Kenapa maksain mikir keras pas lagi buntu malah bikin makin mentok?',
    category: 'concept',
    categoryLabel: 'CARA KERJA OTAK',
    layout: 'comparison-table',
    interactiveType: 'focus-toggle',
    comparison: {
      col1Header: 'Mode Fokus (Focused Mode)',
      col2Header: 'Mode Difus (Diffuse Mode)',
      rows: [
        {
          aspect: 'Karakter Otak',
          col1: 'Konsentrasi tinggi, jalur pikiran sempit & terarah ke satu titik.',
          col2: 'Pikiran santai, otak ngehubungin konsep-konsep yang jauh secara acak.'
        },
        {
          aspect: 'Pas Banget Buat',
          col1: 'Ngetik kode presisi, benerin syntax error, eksekusi sprint yang udah jelas.',
          col2: 'Nemu ide arsitektur baru, nemu jalan keluar pas buntu, mikir "big picture".'
        },
        {
          aspect: 'Contoh Kegiatan',
          col1: 'Deep work, pasang headphone, terminal fullscreen, no notification.',
          col2: 'Jalan santai ke pantry, mandi air anget, melamun, tidur siang 15 menit.'
        },
        {
          aspect: 'Jebakan Kalau Kebablasan',
          col1: 'Tunnel vision: udah 3 jam mantengin baris yang sama tanpa hasil.',
          col2: 'Keasyikan santai sampai lupa balik ke editor buat nyelesein kerjaan.'
        }
      ],
      // conclusion: 'Kunci Sukses: Gonta-ganti dengan ritme santai. Kalau udah stuck lebih dari 30 menit, cabut dulu dari layar dan biarin mode difus yang kerja!'
    },
    notes: [
      'Gunakan analogi Barbara Oakley: otak fokus kayak senter sinar sempit, otak difus kayak lampu ruangan yang nerangin semuanya.',
      'Ide terbaik sering dateng pas kita gak lagi mikirin kerjaan itu secara langsung.'
    ]
  },
  {
    id: 4,
    slideNumber: 4,
    slug: 'rubber-duck-apa-itu',
    title: '4. Rubber Duck Debugging: Apaan Sih Itu?',
    subtitle: 'Trik legendaris para senior: ngajak ngobrol benda mati di meja kerja!',
    category: 'technique',
    categoryLabel: 'JURUS KLASIK',
    layout: 'split-hero',
    interactiveType: 'duck',
    keyTakeaway: 'Kuncinya bukan bebeknya yang sakti, tapi pas kita ngoceh pake suara lantang, otak kita otomatis meriksa asumsi yang tadinya kita lewatin gitu aja!',
    items: [
      {
        title: 'Ceritain Kode Baris demi Baris',
        description: 'Anggap si bebek tuh junior developer yang polos banget dan butuh kamu jelasin alur kodenya dari awal sampe akhir.',
        badge: 'Definisi Santai'
      },
      {
        title: 'Warisan The Pragmatic Programmer',
        description: 'Bukan mitos! Teknik resmi yang ditulis di buku legendaris software engineering dunia sejak tahun 1999.',
        badge: 'Asal Usul Keren'
      },
      {
        title: 'Kenapa Manjur Banget?',
        description: 'Pas baca di dalem hati, otak kita suka sok tau dan berasumsi "ini pasti jalan". Pas diucapin keras-keras, celah logikanya langsung kedengeran janggal!',
        badge: 'Mekanisme Otak'
      }
    ],
    notes: [
      'Ajak audiens coba ngobrol sama bebek di slide.',
      'Bebek gak bakal nge-judge kodingan kamu sejelek apa pun.'
    ]
  },
  {
    id: 5,
    slideNumber: 5,
    slug: 'cara-rubber-duck',
    title: '5. Langkah Praktis Ngobrol sama Bebek',
    subtitle: 'SOP santai pas kodingan ngadat dan kamu malu nanya ke tech lead',
    category: 'practical',
    categoryLabel: 'LANGKAH EKSEKUSI',
    layout: 'numbered-steps',
    items: [
      {
        title: 'Taro "Bebek" di Meja Kerja',
        description: 'Bebek karet kuning, miniatur anime, gantungan kunci, mug kopi, atau notepad kosong juga boleh banget.',
        badge: 'Step 01'
      },
      {
        title: 'Jelasin Goal Kodenya',
        description: 'Ucapin: "Bek, fungsi ini tujuannya nerima data polis asuransi nasabah, terus ngitung premi otomatis".',
        badge: 'Step 02'
      },
      {
        title: 'Baca Baris demi Baris Pake Suara',
        description: 'Baca beneran pake mulut, jangan diskim! "Pertama kita ambil array data, terus kita map id-nya..."',
        badge: 'Step 03'
      },
      {
        title: 'Bandingin sama Fakta di Layar',
        description: '"Harusnya array ini isi 5 data, tapi pas di-console.log kok malah undefined ya? Hmm..."',
        badge: 'Step 04'
      },
      {
        title: 'Tunggu Momen "Lah... Kok Gini?"',
        description: 'Pas lidah kamu tiba-tiba terhenti: "Tunggu bentar... kenapa variabelnya di-reset sebelum if?!" — Nah, bug-nya ketemu!',
        badge: 'Step 05'
      }
    ],
    notes: [
      'Kunci paling penting ada di langkah 5: momen "Wait a minute...".',
      'Kalau di kantor malu ngomong sendiri, bisik-bisik atau ketik di notes rahasia.'
    ]
  },
  {
    id: 6,
    slideNumber: 6,
    slug: 'ai-agent-apa-itu',
    title: '6. AI Agent Talking: Bebek Karet Versi Upgrade!',
    subtitle: 'Kalau bebek karet cuma diem, AI agent bisa diajak debat dan lempar ide!',
    category: 'technique',
    categoryLabel: 'JURUS MODERN',
    layout: 'ai-comparison',
    comparison: {
      col1Header: 'Bebek Karet Klasik',
      col2Header: 'AI Agent Interaktif',
      rows: [
        {
          aspect: 'Peran Utama',
          col1: 'Cuma dengerin pasif, gak bakal protes atau motong omongan.',
          col2: 'Dengerin, ngerti konteks, terus nanya balik pake pertanyaan tajem.'
        },
        {
          aspect: 'Umpan Balik',
          col1: '100% bergantung pada kesadaran otak kamu sendiri pas ngomong.',
          col2: 'Bisa ngasih sudut pandang tak terduga dan nunjukin blind spot kamu.'
        },
        {
          aspect: 'Ruang Lingkup',
          col1: 'Paling tokcer buat nyari bug alur logika yang kelewat.',
          col2: 'Cocok buat debugging, debat desain arsitektur, sampai brainstorming.'
        },
        {
          aspect: 'Posisi yang Bener',
          col1: 'Cermin buat mantulin jalan pikiran kamu.',
          col2: 'Temen sparring mikir yang cerdas — BUKAN pengganti otak kamu!'
        }
      ],
      conclusion: 'AI Agent itu bukan buat ngerjain tugas kamu secara buta, tapi buat nge-boost daya nalar teknis kamu biar makin tajem!'
    },
    notes: [
      'Jelaskan bahwa AI agent adalah Rubber Duck 2.0.',
      'Yang bikin engineer jago bukan yang bisa copas kode AI tercepat, tapi yang tahu cara manfaatin AI buat mikir bareng.'
    ]
  },
  {
    id: 7,
    slideNumber: 7,
    slug: 'cara-efektif-ai-agent',
    title: '7. Cara Ngobrol sama AI Biar Gak Dikasih Jawaban Sampah',
    subtitle: 'Rumus 5 pilar biar jawaban AI beneran tajem dan solutif, bukan cuma basa-basi',
    category: 'practical',
    categoryLabel: 'TIPS PROMPTING',
    layout: 'grid-cards',
    items: [
      {
        title: '1. Konteks yang Jelas',
        description: 'Sebutin stack kamu (Angular 20, Spring Boot 3), versi library, dan batasan sistem. Jangan biarin AI nebak-nebak!',
        badge: 'Konteks',
        icon: 'database'
      },
      {
        title: '2. Gejala & Ekspektasi',
        description: 'Paste error message yang persis, terus kontraskan: "Ekspektasinya data kesimpen, tapi di database malah kosong".',
        badge: 'Detail Masalah',
        icon: 'alert-triangle'
      },
      {
        title: '3. Yang Udah Kamu Coba',
        description: 'Kasih tau apa aja yang udah di-debug biar AI gak ngulang-ulang saran klise kayak "coba restart server ya".',
        badge: 'Percobaan',
        icon: 'history'
      },
      {
        title: '4. Perintah yang Tegas',
        description: 'Bilang langsung: "Kasih 3 alternatif solusi beserta trade-off-nya" atau "Tolong kritisi kelemahan desain arsitektur ini".',
        badge: 'Instruksi',
        icon: 'target'
      },
      {
        title: '5. Tanya Balik & Iterasi',
        description: 'Jangan langsung puas sama jawaban pertama. Kejar lagi: "Kalau data nasabahnya ada 1 juta record, fungsi ini masih aman gak?".',
        badge: 'Uji Solusi',
        icon: 'repeat'
      }
    ],
    notes: [
      'Prinsip GIGO: Garbage In, Garbage Out.',
      'Prompt yang cerdas menghasilkan partner mikir yang luar biasa.'
    ]
  },
  {
    id: 8,
    slideNumber: 8,
    slug: 'teknik-menurunkan-stress',
    title: '8. Jurus Santai Menurunkan Stress Pas Ngoding',
    subtitle: 'Trik-trik kecil yang terbukti bikin otak adem lagi tanpa perlu cuti seminggu',
    category: 'wellness',
    categoryLabel: 'ERGONOMI & SEHAT',
    layout: 'grid-cards',
    interactiveType: 'timer',
    items: [
      {
        title: 'Pomodoro 25/5 Menit',
        description: '25 menit ngoding fokus tanpa buka tab medsos, terus 5 menit wajib berdiri ninggalin kursi kerja.',
        badge: 'Ritme Fokus',
        icon: 'clock'
      },
      {
        title: 'Aturan 20-20-20 Buat Mata',
        description: 'Tiap 20 menit mandang layar, liat objek sejauh 6 meter selama 20 detik biar mata gak kering dan pusing.',
        badge: 'Mata Segar',
        icon: 'eye'
      },
      {
        title: 'Jalan Kaki Tipis-Tipis',
        description: 'Muterin koridor kantor atau ke pantry tanpa megang HP. Cara paling cepet mancing mode difus!',
        badge: 'Gerak Badan',
        icon: 'activity'
      },
      {
        title: 'Tarik Napas Box Breathing',
        description: 'Tarik napas 4 detik, tahan 4 detik, hembuskan perlahan 4 detik. Saraf tegang langsung kalem.',
        badge: 'Tarik Napas',
        icon: 'wind'
      },
      {
        title: 'Tumpahin ke Kertas Catatan',
        description: 'Keluarkan semua beban pikiran dan to-do list ke kertas biar RAM di kepala gak lemot overthinking.',
        badge: 'Brain Dump',
        icon: 'file-text'
      },
      {
        title: 'Mute Notif Pas Deep Work',
        description: 'Matikan notif chat non-urgent pas lagi mikir arsitektur berat. Komunikasi asinkron itu penyelamat fokus!',
        badge: 'Jaga Fokus',
        icon: 'bell-off'
      }
    ],
    notes: [
      'Ingatkan: istirahat itu bukan males, tapi maintenance biar mesin kodingan kita gak jebol.',
      'Ajak audiens cobain tombol latihan mata 20 detik di slide.'
    ]
  },
  {
    id: 9,
    slideNumber: 9,
    slug: 'memancing-ide-cemerlang',
    title: '9. Cara Mancing Ide Cemerlang Pas Otak Buntu',
    subtitle: 'Momen "AHA!" itu jarang muncul pas kita lagi emosi melototin monitor',
    category: 'concept',
    categoryLabel: 'KREATIVITAS',
    layout: 'grid-cards',
    items: [
      {
        title: 'Tinggalin Dulu Masalahnya',
        description: 'Ide bagus sering nongol pas mandi, nyuci piring, atau jalan santai sore. Otak butuh waktu ngendapin data.',
        badge: 'Inkubasi Otak'
      },
      {
        title: 'Catat Langsung Sebelum Lupa',
        description: 'Ide brilian tuh licin banget. Begitu kepikiran pas lagi ngopi, langsung buka notes di HP dan simpen.',
        badge: 'Tangkap Ide'
      },
      {
        title: 'Kasih Batasan yang Ekstrem',
        description: '"Gimana kalau fitur ini wajib kelar di bawah 30 baris kode?" Batasan sengaja bikin kita kreatif nyari jalan simpel.',
        badge: 'Solusi Simpel'
      },
      {
        title: 'Ganti Kacamata / Peran',
        description: 'Coba liat kodingan dari sudut pandang nasabah awam, orang bisnis, atau QA yang hobi ngeklik sembarangan.',
        badge: 'Sudut Pandang'
      },
      {
        title: 'Tidur Cukup, Jangan Begadang',
        description: 'Waktu tidur tuh fase otak ngerapihin memori dan nyambungin koneksi konsep rumit yang seharian kita pelajari.',
        badge: 'Recharge Otak'
      },
      {
        title: 'Ajak Ngobrol Rekan Tim',
        description: 'Kadang kita cuma butuh ngomong keras-keras ke temen sebelah buat nemu jawaban yang selama ini dicari.',
        badge: 'Kolaborasi'
      }
    ],
    notes: [
      'Kreativitas bukan bakat mistis; itu hasil dari otak yang punya cukup ruang istirahat.'
    ]
  },
  {
    id: 10,
    slideNumber: 10,
    slug: 'contoh-rutinitas-harian',
    title: '10. Contoh Ritme Harian Biar Gak Cepet Jompo',
    subtitle: 'Bukan jadwal kaku, tapi panduan ritme kerja biar energi kamu gak habis di tengah jalan',
    category: 'practical',
    categoryLabel: 'RITME KERJA',
    layout: 'timeline',
    items: [
      {
        title: 'Pagi Hari (08.30 – 11.30)',
        description: 'Pilih 1–2 kerjaan paling berbobot. Manfaatin waktu ini buat deep work pertama pas energi otak masih seger-segernya.',
        badge: 'Jam Emas Koding',
        icon: 'sun'
      },
      {
        title: 'Siang Hari (12.00 – 13.30)',
        description: 'Istirahat beneran! Makan siang tanpa melototin error di laptop, jalan santai bentar, atau ngobrol seru bareng tim.',
        badge: 'Recharge Energi',
        icon: 'coffee'
      },
      {
        title: 'Pas Nemu Kebuntuan',
        description: 'Stop maksain ngetik -> Ajak ngobrol bebek karet di meja -> Buka AI agent buat diskusi.',
        badge: 'Protokol Buntu',
        icon: 'help-circle'
      },
      {
        title: 'Sore Hari (14.00 – 17.00)',
        description: 'Waktu pas buat kerjaan kolaboratif: code review, diskusi santai, sync tim, dan rapikan catatan to-do buat besok.',
        badge: 'Kolaborasi & Sync',
        icon: 'users'
      },
      {
        title: 'Malam Hari (Setelah Jam Kerja)',
        description: 'Tutup laptop kantor, logout dari urusan kodingan. Habisin waktu buat keluarga, hobi, dan tidur nyenyak 7-8 jam.',
        badge: 'Waras & Sehat',
        icon: 'moon'
      }
    ],
    notes: [
      'Tekankan pentingnya menjaga batas antara jam kerja dan jam istirahat.'
    ]
  },
  {
    id: 11,
    slideNumber: 11,
    slug: 'kapan-bertemu-psikolog',
    title: '11. Kapan Saatnya Minta Bantuan Profesional?',
    subtitle: 'Teknik mandiri itu bagus, tapi sadari juga kapan saatnya kita butuh bantuan ahli',
    category: 'wellness',
    categoryLabel: 'KESEHATAN MENTAL',
    layout: 'critical-alert',
    // quote: {
    //   text: 'Minta bantuan psikolog itu bukti kamu sayang dan peduli sama diri sendiri, bukan tanda kelemahan!',
    //   author: 'Prinsip Kesejahteraan Software Engineer'
    // },
    items: [
      {
        title: 'Cemas & Murung Berminggu-minggu',
        description: 'Kecemasan atau rasa hampa gak kunjung membaik meski sprint udah santai atau libur akhir pekan udah lewat.',
        badge: 'Sinyal Waspada'
      },
      {
        title: 'Tidur & Fisik Mulai Terganggu',
        description: 'Insomnia parah, asam lambung sering kumat, atau migrain gara-gara psychosomatic stress mikirin kerjaan.',
        badge: 'Sinyal Waspada'
      },
      {
        title: 'Kehilangan Minat Total (Anhedonia)',
        description: 'Koding yang dulu seru sekarang rasanya hambar banget, hobi yang biasa kamu suka juga males dikerjain.',
        badge: 'Sinyal Waspada'
      },
      {
        title: 'Udah Cuti tapi Tetep Ngerasa Capek',
        description: 'Perasaan otak beku dan lelah batin yang menetap meski udah ambil cuti liburan beberapa hari.',
        badge: 'Sinyal Waspada'
      }
    ],
    keyTakeaway: 'Langkah Awal yang Gampang: Cek fasilitas konseling dari kantor / asuransi kesehatan BRINS, janjian sama psikolog klinis (bisa online lewat Halodoc dsb atau tatap muka), atau kunjungi puskesmas/klinik terdekat. Kalau ada pikiran bahaya, langsung cerita ke orang terdekat atau hubungi hotline bantuan ya!',
    notes: [
      'Sampaikan slide ini dengan nada penuh empati dan kepedulian tulus.',
      'Kita semua manusia sebelum jadi engineer.'
    ]
  },
  {
    id: 12,
    slideNumber: 12,
    slug: 'hal-yang-perlu-diwaspadai',
    title: '12. Rambu-Rambu Wajib Pas Ngoding Bareng AI',
    subtitle: 'AI itu partner yang seru, tapi tetep ada pagar pengaman yang gak boleh diterobos!',
    category: 'warning',
    categoryLabel: 'SAFETY & ETHICS',
    layout: 'grid-cards',
    items: [
      {
        title: 'Jangan Nelan Mentah-Mentah',
        description: 'Model AI itu jago banget ngomong meyakinkan padahal kodenya halusinasi atau ada bug logika tersembunyi. Selalu cek lagi!',
        badge: 'Cek Ulang',
        icon: 'shield-alert'
      },
      {
        title: 'HARAM Bocorin Data Rahasia Perusahaan',
        description: 'DILARANG paste API key, password database, data pribadi nasabah (PII), atau kode rahasia BRINS ke prompt AI publik!',
        badge: 'Keamanan Data',
        icon: 'lock'
      },
      {
        title: 'Jangan Sampe Jadi Malas Mikir',
        description: 'AI itu kopilot, bukan pilot otomatis. Yang megang tanggung jawab penuh kalau server crash di production itu tetep kamu, bukan AI!',
        badge: 'Tanggung Jawab',
        icon: 'cpu'
      }
    ],
    notes: [
      'Keamanan data nasabah dan kredensial perusahaan adalah harga mati di BRINS.',
      'Engineer hebat paham kenapa kodenya jalan, bukan cuma copas.'
    ]
  },
  {
    id: 13,
    slideNumber: 13,
    slug: 'ringkasan-langkah-berikutnya',
    title: '13. Mulai dari Hal Kecil Hari Ini',
    subtitle: 'Bekerja dengan tenang dan pikiran yang senang itu skill yang bisa kita latih tiap hari bareng-bareng',
    category: 'conclusion',
    categoryLabel: 'PENUTUP',
    layout: 'summary',
    items: [
      {
        title: '1. Peka sama Sinyal Capek',
        description: 'Tahu kapan otak butuh jeda sebelum beneran burnout.',
        badge: 'Sadar Diri'
      },
      {
        title: '2. Seimbangkan Fokus & Santai',
        description: 'Pas mentok, tinggalin layar bentar biar mode difus kerja.',
        badge: 'Ritme Otak'
      },
      {
        title: '3. Ocehin Masalah Kodingan',
        description: 'Cerita ke bebek karet atau ajak debat AI agent.',
        badge: 'Artikulasi'
      },
      {
        title: '4. Rawat Badan & Pikiran',
        description: 'Mata 20-20-20, jalan kaki, dan tidur yang cukup.',
        badge: 'Kebugaran'
      },
      {
        title: '5. Minta Bantuan Kalau Berat',
        description: 'Jangan sungkan ke psikolog kalau stress gak kelar-kelar.',
        badge: 'Dukungan'
      }
    ],
    keyTakeaway: 'Tantangan Minggu Ini: Pilih 1 trik simpel (misal taro bebek/miniatur di meja atau coba diskusi ke AI), lakuin selama seminggu, terus rasain bedanya!',
    presenterInfo: {
      name: 'Rafi Indrajati',
      role: 'Front End Developer',
      department: 'Divisi TSI (Teknologi Sistem Informasi)',
      organization: 'PT BRI Asuransi Indonesia (BRINS)'
    },
    notes: [
      'Ucapkan terima kasih hangat ke seluruh rekan engineer TSI BRINS.',
      'Buka sesi tanya jawab & obrolan santai.'
    ]
  }
];
