import React from 'react';
import Sidebar from '../../components/mahasiswa/Sidebar.jsx'; 
import Header from '../../components/mahasiswa/Header.jsx'; 
import data from '../../data/mahasiswa/dashboardData.json';

export default function DashboardUtama() {
  // Pengaman ekstra jika objek root json kosong atau salah format
  const mahasiswa = data?.mahasiswa || {};
  
  // Mencari array jadwal (mengantisipasi jika namanya 'jadwal' atau 'jadwalHariIni')
  const jadwal = data?.jadwal || data?.jadwalHariIni || [];
  
  // Mencari array pengumuman
  const pengumuman = data?.pengumuman || [];

  // Data simulasi tren perkembangan IPK (IPS) per semester jika di JSON belum lengkap
  const trenIpk = mahasiswa?.trenIpk || [
    { semester: "Sem 1", ips: 3.60 },
    { semester: "Sem 2", ips: 3.82 },
    { semester: "Sem 3", ips: 3.65 },
    { semester: "Sem 4 (Kini)", ips: mahasiswa?.ipk || 3.74 }
  ];

  // Konstanta target akademik tambahan
  const targetIpkAkhir = mahasiswa?.targetIpk || 3.85;
  const totalSksTarget = mahasiswa?.sksTarget || 144;
  const sksSelesai = parseInt(mahasiswa?.sks) || 78;
  const persentaseSks = (sksSelesai / totalSksTarget) * 100;

  return (
    <div className="flex min-h-screen bg-latar font-poppins text-teks">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* BANNER RINGKASAN AKADEMIK UTAMA (US-05, US-06, US-07) */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "IPK Kumulatif (US-07)", val: mahasiswa?.ipk || "3.74", icon: "📈", desc: `Target Kelulusan: ${targetIpkAkhir}` },
              { label: "SKS Selesai (US-05)", val: `${sksSelesai} SKS`, icon: "🎓", desc: `Sisa Beban: ${totalSksTarget - sksSelesai} SKS` },
              { label: "Rata-rata Presensi (US-06)", val: mahasiswa?.kehadiran || "96.5%", icon: "🌊", desc: "Batas Minimal Aman: 75%" },
              { label: "Semester Aktif", val: mahasiswa?.semester || "4", icon: "📅", desc: mahasiswa?.prodi || "D-IV Pengolahan Hasil Perikanan" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-garis shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-barlow font-bold uppercase tracking-widest text-teks-samping">
                    {item.label}
                  </span>
                  <div className="w-10 h-10 bg-soft-light text-soft-dark rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-poppins-extrabold text-soft-dark mb-1">
                  {item.val}
                </h3>
                <p className="text-[10px] font-medium text-teks-samping font-barlow italic">
                  {item.desc}
                </p>
              </div>
            ))}
          </section>

          {/* SEKSI BARU: GRAFIK STATISTIK IPK & MONITORING TARGET KELULUSAN */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* KIRI: STATISTIK GRAFIK IPK (CSS BAR CHART) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-garis p-6 shadow-sm flex flex-col justify-between">
              <div className="mb-4 flex justify-between items-start">
                <div>
                  <h3 className="font-poppins-extrabold text-teks text-sm flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-soft-button rounded-full"></span>
                    Grafik Tren Prestasi Indeks (IPK)
                  </h3>
                  <p className="text-[11px] text-teks-samping mt-0.5">Visualisasi perbandingan indeks prestasi semester berjalan</p>
                </div>
                <span className="text-[9px] bg-soft-light text-soft-dark px-2 py-0.5 rounded-md font-bold font-barlow uppercase">Skala 4.00</span>
              </div>

              {/* Batas Area Grafik Batang */}
              <div className="h-44 flex items-end justify-between gap-4 pt-10 px-4 border-b border-garis bg-latar/20 rounded-xl relative mt-2">
                {/* Garis Bantu Batas Aman Nilai B (3.00) */}
                <div className="absolute left-0 right-0 top-1/4 border-t border-garis/60 border-dashed pointer-events-none flex justify-between px-2">
                  <span className="text-[8px] text-teks-samping bg-white/90 px-1 rounded -mt-2">3.00 (Batas Kelayakan)</span>
                </div>
                <div className="absolute left-0 right-0 top-2/4 border-t border-garis/30 border-dashed pointer-events-none"></div>
                <div className="absolute left-0 right-0 top-3/4 border-t border-garis/30 border-dashed pointer-events-none"></div>

                {trenIpk.map((t, i) => {
                  // Menghitung tinggi grafik secara proporsional dari batas maksimal IPK 4.0
                  const heightPercentage = (t.ips / 4.0) * 100;
                  
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center group relative z-10">
                      {/* Tooltip Nilai Pop-up saat kursor menyorot batang */}
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-soft-dark text-white text-[10px] font-bold px-2 py-0.5 rounded transition-all duration-200 shadow-md">
                        IPS: {t.ips.toFixed(2)}
                      </span>
                      
                      {/* Batang Grafik */}
                      <div 
                        className="w-full sm:w-12 bg-soft-button group-hover:bg-soft-dark rounded-t-lg transition-all duration-300 shadow-xs relative overflow-hidden"
                        style={{ height: `${heightPercentage}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                      </div>
                      
                      {/* Label Nama Semester */}
                      <span className="text-[10px] font-bold font-barlow text-teks-samping mt-2 text-center truncate w-full">
                        {t.semester}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* KANAN: WIDGET MONITORING PENCAPAIAN TARGET KELULUSAN */}
            <div className="bg-white rounded-2xl border border-garis p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-poppins-extrabold text-teks text-sm flex items-center gap-2">
                  🎯 Estimasi Kelulusan Makro
                </h3>
                <p className="text-[11px] text-teks-samping mt-0.5">Akumulasi sisa SKS syarat kelulusan total</p>
              </div>

              <div className="space-y-4 bg-latar/40 border border-garis p-4 rounded-xl flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-center border-b border-garis/60 pb-2">
                  <span className="text-xs text-teks font-medium">Target IPK Akhir:</span>
                  <span className="text-sm font-poppins-extrabold text-soft-button">{targetIpkAkhir.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-garis/60 pb-2">
                  <span className="text-xs text-teks font-medium">SKS Saat Ini:</span>
                  <span className="text-sm font-bold text-teks">{sksSelesai} / {totalSksTarget} SKS</span>
                </div>
                
                {/* Progress Bar Pengumpulan SKS */}
                <div className="space-y-1.5 pt-1">
                  <div className="w-full bg-garis h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                      style={{ width: `${persentaseSks}%` }}
                    ></div>
                  </div>
                  <p className="text-[9px] text-right font-bold text-teks-samping font-barlow">
                    PROGRESS KELULUSAN: {persentaseSks.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

          </section>

          {/* JADWAL PERKULIAHAN & PENGUMUMAN */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* JADWAL KULIAH */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-poppins-extrabold text-teks text-lg flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-soft-button rounded-full"></span>
                  Jadwal Perkuliahan Hari Ini
                </h2>
              </div>

              <div className="grid gap-4">
                {jadwal.length > 0 ? (
                  jadwal.map((j) => (
                    <div 
                      key={j.id} 
                      className="bg-white p-5 rounded-2xl border border-garis flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-soft-button/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-soft-light px-3 py-2 rounded-xl text-center min-w-[70px]">
                          <p className="text-[10px] font-bold text-soft-dark font-barlow uppercase leading-none">Jam</p>
                          <p className="text-xs font-poppins-extrabold text-soft-button mt-1">{j.jam}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-teks leading-tight mb-1">{j.mk}</h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-teks-samping font-medium font-barlow">
                            <span>👤 {j.dosen || "Dosen Pengampu"}</span>
                            <span className="text-soft-dark">📍 {j.ruang}</span>
                          </div>
                        </div>
                      </div>
                      <button className="w-full md:w-auto px-5 py-2 bg-latar hover:bg-soft-light text-soft-dark border border-garis rounded-lg text-[10px] font-bold font-barlow transition-colors uppercase tracking-wider cursor-pointer">
                        Presensi Masuk
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="bg-white border border-garis border-dashed rounded-2xl py-12 text-center">
                    <p className="text-xs text-teks-samping font-medium">Tidak ada jadwal kuliah yang terdaftar hari ini.</p>
                  </div>
                )}
              </div>
            </div>

            {/* WARTA PENGUMUMAN & PUSAT BANTUAN */}
            <div className="space-y-4">
              <h2 className="font-poppins-extrabold text-teks text-lg flex items-center gap-3 mb-2">
                <span className="w-1.5 h-6 bg-kuning rounded-full"></span>
                Warta Pengumuman
              </h2>

              <div className="bg-white rounded-2xl border border-garis overflow-hidden shadow-sm">
                <div className="p-2">
                  {pengumuman.length > 0 ? (
                    pengumuman.map((p, idx) => (
                      <div 
                        key={p.id} 
                        className={`p-4 hover:bg-latar transition-colors rounded-xl ${
                          idx !== pengumuman.length - 1 ? 'border-b border-garis' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[9px] font-poppins-extrabold px-2 py-0.5 rounded-sm tracking-wide uppercase ${
                            p.tipe === 'Penting' ? 'bg-rose-100 text-merah' : 'bg-soft-light text-soft-dark'
                          }`}>
                            {p.tipe}
                          </span>
                          <span className="text-[10px] text-teks-samping font-bold font-barlow">
                            {p.tgl}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-teks leading-relaxed hover:text-soft-button cursor-pointer">
                          {p.info}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center border-b border-garis">
                      <p className="text-xs text-teks-samping">Belum ada pengumuman terbaru.</p>
                    </div>
                  )}
                </div>
                <button className="w-full py-4 bg-latar/50 text-[10px] font-bold text-teks-samping hover:text-soft-dark transition-colors font-barlow uppercase tracking-widest cursor-pointer">
                  Lihat Semua Berita
                </button>
              </div>

              {/* PUSAT BANTUAN */}
              <div className="bg-gradient-to-br from-soft-dark to-soft-button p-5 rounded-2xl text-white shadow-md relative overflow-hidden group">
                <h4 className="font-poppins-extrabold text-sm mb-1">Pusat Bantuan SIAKAD</h4>
                <p className="text-[10px] text-sky-100 leading-relaxed mb-4">
                  Mengalami kendala dalam pengisian KRS atau presensi online?
                </p>
                <button className="bg-white text-soft-dark px-4 py-2 rounded-lg text-[10px] font-bold font-barlow uppercase tracking-wider shadow-sm cursor-pointer">
                  Chat Admin BAAD
                </button>
              </div>
            </div>

          </section>
        </main>
      </div>
    </div>
  );
}