import React from 'react';
import { FaEnvelope, FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaLinkedinIn } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="bg-[#001f3f] text-white py-2.5 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center text-[13px] font-semibold border-b border-white/10 relative z-50 shadow-md">
      
      {/* Left: Contact Info */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center tracking-wide">
        <div className="flex items-center gap-2 group cursor-pointer hover:text-orange-400 transition">
           <span className="text-lg grayscale group-hover:grayscale-0 transition-all">🇬🇧</span> 
           <span>+923485654503</span>
        </div>
        
        {/* Email Link: 'mailto:' add kiya hai taake direct email khulay */}
        <a href="mailto:alquranislamicinstitute.48@gmail.com" className="flex items-center gap-2 group hover:text-orange-400 transition">
           <FaEnvelope className="text-orange-500 group-hover:rotate-12 transition-transform" />
           <span>alquranislamicinstitute.48@gmail.com</span>
        </a>
      </div>

      {/* Right: Social & Button */}
      <div className="flex items-center gap-6 mt-3 md:mt-0">
        <div className="flex gap-4 items-center">
            {/* 1. Facebook */}
            <a href="https://www.facebook.com/share/1DQ27HhzLn/" target="_blank" rel="noreferrer">
                <FaFacebookF className="hover:text-blue-500 cursor-pointer transition-all hover:-translate-y-1" size={22} />
            </a>

            {/* 2. Instagram */}
            <a href="https://www.instagram.com/_al__quran_6?igsh=MWhyMm9sbWpzYmJhbg==" target="_blank" rel="noreferrer">
                <FaInstagram className="hover:text-pink-500 cursor-pointer transition-all hover:-translate-y-1" size={22} />
            </a>

            {/* 3. Youtube */}
            <a href="https://youtube.com/@quranic.927?si=7t5k0yOg8Pql56dB" target="_blank" rel="noreferrer">
                <FaYoutube className="hover:text-red-500 cursor-pointer transition-all hover:-translate-y-1" size={22} />
            </a>

            {/* 4. TikTok - Naya Add kiya gaya */}
            <a href="https://www.tiktok.com/@quranic.a?_r=1&_t=ZS-93oPmOHesan" target="_blank" rel="noreferrer">
                <FaTiktok className="hover:text-gray-400 cursor-pointer transition-all hover:-translate-y-1" size={22} />
            </a>

            {/* 5. LinkedIn - Naya Add kiya gaya */}
            <a href="https://www.linkedin.com/in/sundas-ishfaq-105503298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer">
                <FaLinkedinIn className="hover:text-blue-400 cursor-pointer transition-all hover:-translate-y-1" size={22} />
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