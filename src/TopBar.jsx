import React from 'react';
import { FaEnvelope, FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaLinkedinIn } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="bg-[#001f3f] text-white py-2.5 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center text-[13px] font-semibold border-b border-white/10 relative z-50 shadow-md gap-3">

      {/* Left: Contact Info */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-8 items-center tracking-wide">
        <div className="flex items-center gap-2 group cursor-pointer hover:text-orange-400 transition">
          <span className="text-lg grayscale group-hover:grayscale-0 transition-all">🇬🇧</span>
          <span>+923485654503</span>
        </div>

        <a href="mailto:alquranislamicinstitute.48@gmail.com" className="flex items-center gap-2 group hover:text-orange-400 transition">
          <FaEnvelope className="text-orange-500 group-hover:rotate-12 transition-transform" />
          <span className="break-all text-center">alquranislamicinstitute.48@gmail.com</span>
        </a>
      </div>

      {/* Right: Social & Button */}
      <div className="flex flex-wrap justify-center items-center gap-4">
        <div className="flex flex-wrap justify-center gap-3 items-center">

          <a href="https://www.facebook.com/share/1DQ27HhzLn/" target="_blank" rel="noreferrer" className="bg-[#1877F2] w-9 h-9 rounded-full flex items-center justify-center shadow-md ring-1 ring-white/15 hover:ring-white/40 hover:scale-110 hover:-translate-y-1 transition-all duration-200">
            <FaFacebookF className="text-white" size={16} />
          </a>

          <a href="https://www.instagram.com/_al__quran_6?igsh=MWhyMm9sbWpzYmJhbg==" target="_blank" rel="noreferrer" className="bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] w-9 h-9 rounded-full flex items-center justify-center shadow-md ring-1 ring-white/15 hover:ring-white/40 hover:scale-110 hover:-translate-y-1 transition-all duration-200">
            <FaInstagram className="text-white" size={16} />
          </a>

          <a href="https://youtube.com/@quranic.927?si=7t5k0yOg8Pql56dB" target="_blank" rel="noreferrer" className="bg-[#FF0000] w-9 h-9 rounded-full flex items-center justify-center shadow-md ring-1 ring-white/15 hover:ring-white/40 hover:scale-110 hover:-translate-y-1 transition-all duration-200">
            <FaYoutube className="text-white" size={16} />
          </a>

          <a href="https://www.tiktok.com/@quranic.a?_r=1&_t=ZS-93oPmOHesan" target="_blank" rel="noreferrer" className="bg-black border border-white/20 w-9 h-9 rounded-full flex items-center justify-center shadow-md ring-1 ring-white/15 hover:ring-white/40 hover:scale-110 hover:-translate-y-1 transition-all duration-200">
            <FaTiktok className="text-white" size={16} />
          </a>

          <a href="https://www.linkedin.com/in/sundas-ishfaq-105503298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer" className="bg-[#0A66C2] w-9 h-9 rounded-full flex items-center justify-center shadow-md ring-1 ring-white/15 hover:ring-white/40 hover:scale-110 hover:-translate-y-1 transition-all duration-200">
            <FaLinkedinIn className="text-white" size={16} />
          </a>

        </div>

        <button className="bg-orange-600 text-white font-bold px-5 py-1.5 rounded-sm text-[11px] uppercase tracking-widest hover:bg-orange-700 transition shadow-lg border border-orange-500/50">
          Free Trial Class
        </button>
      </div>
    </div>
  );
};

export default TopBar;