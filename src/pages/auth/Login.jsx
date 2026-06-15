import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  
  // Mengisi nilai awal (pre-filled) agar mahasiswa bisa langsung klik masuk tanpa ribet mengetik ulang saat uji coba
  const [nim, setNim] = useState('22040101032');
  const [password, setPassword] = useState('12345678');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi sederhana (bisa disesuaikan dengan kebutuhan)
    if (nim.trim() !== '' && password.trim() !== '') {
      // Langsung arahkan navigasi ke halaman dashboard utama mahasiswa
      navigate('/mahasiswa');
    } else {
      setError('NIM dan Kata Sandi wajib diisi!');
    }
  };

  return (
    <div className="min-h-screen bg-latar flex items-center justify-center font-poppins antialiased p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-garis p-8 space-y-6">
        
        {/* IDENTITAS SIMPEL */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-soft-button text-white rounded-2xl flex items-center justify-center font-poppins-extrabold text-xl shadow-md mx-auto">
            P
          </div>
          <div>
            <h2 className="font-poppins-extrabold text-xl text-soft-dark tracking-tight">SIAKAD POLTEKSIM</h2>
            <p className="text-xs text-teks-samping font-medium font-barlow mt-0.5">
              Portal Akademik Mahasiswa
            </p>
          </div>
        </div>

        {/* NOTIFIKASI ERROR */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold rounded-xl text-center">
            ⚠️ {error}
          </div>
        )}

        {/* FORM LOGIN UTAMA */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* INPUT NIM */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold font-barlow text-teks-samping uppercase tracking-wider">
              NIM (Nomor Induk Mahasiswa)
            </label>
            <input 
              type="text" 
              required
              placeholder="Masukkan NIM Anda"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              className="w-full px-4 py-3 bg-latar/40 border border-garis rounded-xl text-xs font-semibold text-teks focus:outline-none focus:border-soft-button focus:bg-white transition-all"
            />
          </div>

          {/* INPUT PASSWORD */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold font-barlow text-teks-samping uppercase tracking-wider">
              Kata Sandi
            </label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-latar/40 border border-garis rounded-xl text-xs font-semibold text-teks focus:outline-none focus:border-soft-button focus:bg-white transition-all"
            />
          </div>

          {/* TOMBOL MASUK INSTAN */}
          <button 
            type="submit"
            className="w-full bg-soft-button hover:bg-soft-dark text-white font-bold py-3.5 rounded-xl text-xs tracking-wide shadow-md hover:shadow-lg transition-all duration-200 mt-2 cursor-pointer uppercase font-barlow"
          >
            Masuk ke Dashboard →
          </button>
        </form>

        {/* FOOTER BANTUAN SEDERHANA */}
        <p className="text-center text-[11px] text-teks-samping font-barlow pt-2 border-t border-garis">
          Kendala Sistem? <a href="#help" className="text-soft-button font-bold hover:underline">Hubungi IT Helpdesk</a>
        </p>

      </div>
    </div>
  );
}