import React from 'react';
import { 
  FaFacebookF, FaInstagram, FaYoutube, FaTiktok, 
  FaLinkedinIn, FaWhatsapp, FaEnvelope, FaMapMarkerAlt 
} from 'react-icons/fa';
import LogoImg from './assets/logo.jpeg'; 

const Footer = () => {
  
  // 1. Function to Scroll to Specific Section (Same as Navbar)
  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80; // -80 Navbar ki jagah chorne k liye
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; 
    let start = null;

    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const time = Math.min(progress / duration, 1);
      const ease = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
      window.scrollTo(0, startPosition + distance * ease);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    });
  };

  // 2. Scroll to Top Function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#001f3f] text-white pt-20 pb-8 border-t-4 border-orange-600">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src={LogoImg} 
                alt="Al Quran Islamic Institute Logo" 
                className="h-14 w-auto rounded-xl bg-white p-1 shadow-lg" 
              />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight leading-none uppercase">Al Quran</span>
                <span className="text-[10px] text-orange-500 font-bold uppercase tracking-[0.2em]">Islamic Institute</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              A premier global platform for authentic Quranic education. Join thousands of students learning with Tajweed and Tarteel from 4+ years.
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1DQ27HhzLn/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-all hover:-translate-y-1">
                <FaFacebookF size={16} />
              </a>
              <a href="https://www.instagram.com/_al__quran_6?igsh=MWhyMm9sbWpzYmJhbg==" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-all hover:-translate-y-1">
                <FaInstagram size={16} />
              </a>
              <a href="https://youtube.com/@quranic.927?si=7t5k0yOg8Pql56dB" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-all hover:-translate-y-1">
                <FaYoutube size={16} />
              </a>
              <a href="https://www.tiktok.com/@quranic.a?_r=1&_t=ZS-93oPmOHesan" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-black transition-all hover:-translate-y-1">
                <FaTiktok size={16} />
              </a>
              <a href="https://www.linkedin.com/in/sundas-ishfaq-105503298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-700 transition-all hover:-translate-y-1">
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (UPDATED WITH SCROLL LOGIC) */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-orange-500 mb-8 border-l-4 border-orange-500 pl-4">
              Explore
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm font-bold">
              
              {/* Home Link */}
              <li onClick={scrollToTop} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                <span className="text-orange-500">›</span> Home
              </li>

              {/* Courses Link */}
              <li onClick={() => scrollToSection('courses-section')} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                <span className="text-orange-500">›</span> Our Courses
              </li>

              {/* Fee Structure Link */}
              <li onClick={() => scrollToSection('fee-section')} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                <span className="text-orange-500">›</span> Fee Structure
              </li>

              {/* About Academy Link */}
              <li onClick={() => scrollToSection('about-academy')} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                <span className="text-orange-500">›</span> About Academy
              </li>

            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-orange-500 mb-8 border-l-4 border-orange-500 pl-4">
              Support
            </h3>
            <ul className="space-y-6 text-gray-400 text-sm">
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <FaWhatsapp size={20} />
                </div>
                <span className="font-medium">+92 348 5654503</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <FaEnvelope size={18} />
                </div>
                <span className="font-medium truncate">alquranislamicinstitute.48@gmail.com</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <FaMapMarkerAlt size={18} />
                </div>
                <span className="font-medium">Worldwide Online Services</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Final Action */}
          <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl"></div>
            <h3 className="text-lg font-bold mb-4">Start Learning</h3>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed italic">
              "The best among you are those who learn the Quran and teach it."
            </p>
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-xl uppercase text-[10px] tracking-widest transition-all shadow-xl active:scale-95">
              Book Free Trial
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase">
          <p>© 2026 Al Quran Islamic Institute. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;