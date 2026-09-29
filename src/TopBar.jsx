import React from 'react';
import { 
  FaEnvelope, 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaTiktok, 
  FaLinkedinIn, 
  FaPhoneAlt 
} from 'react-icons/fa';

const TopBar = () => {
  return (
    <header className="bg-[#001f3f] text-white border-b border-white/10 relative z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 md:py-2.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-xs">
          
          {/* ─── Left: Contact Info (Click-to-Call & Email) ─── */}
          <div className="flex items-center justify-center sm:justify-start flex-wrap gap-3 sm:gap-6 font-medium text-slate-200">
            {/* Phone / WhatsApp */}
            <a 
              href="tel:+923485654503" 
              className="inline-flex items-center gap-1.5 hover:text-orange-400 transition-colors duration-150 group"
              title="Call or WhatsApp Us"
            >
              <span className="text-sm">🇬🇧</span>
              <FaPhoneAlt className="text-orange-500 text-[10px] group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-xs tracking-wider">+92 348 5654503</span>
            </a>

            {/* Email (Hidden on ultra-small mobile to prevent vertical stretching, visible from sm up) */}
            <a 
              href="mailto:alquranislamicinstitute.48@gmail.com" 
              className="hidden md:inline-flex items-center gap-2 hover:text-orange-400 transition-colors duration-150 group"
            >
              <FaEnvelope className="text-orange-500 text-xs group-hover:rotate-12 transition-transform" />
              <span className="text-slate-300 group-hover:text-orange-300 transition-colors">
                alquranislamicinstitute.48@gmail.com
              </span>
            </a>
          </div>

          {/* ─── Right: Social Links & CTA Button ─── */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-3.5">
            {/* Social Icons Strip */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <a 
                href="https://www.facebook.com/share/1DQ27HhzLn/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Official Facebook"
                className="bg-[#1877F2] w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform duration-150"
              >
                <FaFacebookF className="text-white text-xs sm:text-sm" />
              </a>

              <a 
                href="https://www.instagram.com/_al__quran_6?igsh=MWhyMm9sbWpzYmJhbg==" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Official Instagram"
                className="bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform duration-150"
              >
                <FaInstagram className="text-white text-xs sm:text-sm" />
              </a>

              <a 
                href="https://youtube.com/@quranic.927?si=7t5k0yOg8Pql56dB" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Official YouTube"
                className="bg-[#FF0000] w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform duration-150"
              >
                <FaYoutube className="text-white text-xs sm:text-sm" />
              </a>

              <a 
                href="https://www.tiktok.com/@quranic.a?_r=1&_t=ZS-93oPmOHesan" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Official TikTok"
                className="bg-black border border-white/20 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform duration-150"
              >
                <FaTiktok className="text-white text-xs" />
              </a>

              <a 
                href="https://www.linkedin.com/in/sundas-ishfaq-105503298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Official LinkedIn"
                className="bg-[#0A66C2] w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform duration-150"
              >
                <FaLinkedinIn className="text-white text-xs sm:text-sm" />
              </a>
            </div>

            {/* Trial Action Button */}
            <a 
              href="https://www.alquranislamic.com/#register-section"
              className="inline-block bg-orange-600 hover:bg-orange-500 text-white font-extrabold px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] uppercase tracking-wider transition-all duration-150 shadow-md shadow-orange-900/30 active:scale-95"
            >
              Free Trial
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};

export default TopBar;