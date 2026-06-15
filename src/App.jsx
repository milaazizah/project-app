import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. Terapkan React.lazy untuk memuat komponen secara dinamis (Code Splitting)
const Login = lazy(() => import('./pages/auth/Login'));
const DashboardUtama = lazy(() => import('./pages/mahasiswa/DashboardUtama'));
const KHS = lazy(() => import('./pages/mahasiswa/KHS'));
const Absensi = lazy(() => import('./pages/mahasiswa/Absensi'));

// 2. Komponen Loading Sederhana saat file halaman sedang diunduh di latar belakang
const PageLoader = () => (
  <div className="flex min-h-screen bg-latar items-center justify-center font-poppins">
    <div className="flex flex-col items-center gap-3">
      {/* Spinner Animasi Loader */}
      <div className="w-10 h-10 border-4 border-soft-light border-t-soft-button rounded-full animate-spin"></div>
      <p className="text-xs font-bold text-teks-samping tracking-wider uppercase font-barlow">
        Memuat Halaman...
      </p>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      {/* 3. Bungkus Routes dengan Suspense dan berikan fallback loader */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Jalur URL Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Jalur URL Dashboard Mahasiswa */}
          <Route path="/mahasiswa" element={<DashboardUtama />} />
          <Route path="/mahasiswa/khs" element={<KHS />} />
          <Route path="/mahasiswa/presensi" element={<Absensi />} />

          {/* Jika mengetik URL asal / kosong, otomatis diarahkan ke /login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}