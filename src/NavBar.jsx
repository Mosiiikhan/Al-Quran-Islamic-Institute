import React from 'react';
import { FaHome, FaMoneyCheckAlt, FaChevronDown, FaInfoCircle, FaEnvelope, FaImages, FaUserTie, FaUniversity } from 'react-icons/fa';
import LogoImg from './assets/logo.jpeg'; 

const Navbar = () => {
  const bubbleLinkStyle = "flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-300 hover:bg-blue-100 hover:text-[#0056b3] group cursor-pointer font-bold text-gray-700 text-[14px]";
  
  // Dropdown Link Style
  const dropdownLinkStyle = "flex items-center gap-2 px-5 py-3 hover:bg-blue-50 text-gray-700 hover:text-[#0056b3] font-bold text-sm transition-all duration-200 border-b border-gray-50 last:border-0 w-full text-left";

  // Smooth Scroll Logic (As per your existing code)
  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (!target) {
      console.warn(`Target section with id "${id}" not found.`);
      return;
    }

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
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

  return (
    <nav className="bg-white py-4 px-4 md:px-12 shadow-sm flex items-center justify-between sticky top-0 z-40 border-b border-gray-100">
      
      {/* --- LOGO SECTION --- */}
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <div className="overflow-hidden rounded-lg">
          <img 
            src={LogoImg} 
            alt="Al Quran Institute" 
            className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-black text-[#003366] leading-none tracking-tight">AL QURAN</h1>
          <span className="text-[10px] font-bold text-orange-600 tracking-[0.2em] uppercase">Islamic Institute</span>
        </div>
      </div>

      {/* --- NAV LINKS --- */}
      <div className="hidden md:flex items-center gap-2 lg:gap-4">
        
        {/* 1. HOME BUTTON */}
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className={bubbleLinkStyle}>
          <FaHome className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Home
        </button>

        {/* 2. FEE STRUCTURE BUTTON */}
        <button onClick={() => scrollToSection('fee-section')} className={bubbleLinkStyle}>
          <FaMoneyCheckAlt className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Fee Structure
        </button>

        {/* 3. GALLERY BUTTON */}
        <button onClick={() => scrollToSection('gallery-section')} className={bubbleLinkStyle}>
          <FaImages className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Gallery
        </button>
        
        {/* 4. MAIN COURSES BUTTON */}
        <button 
          onClick={() => scrollToSection('courses-section')} 
          className="mx-2 bg-[#0056b3] text-white px-7 py-2.5 rounded-full shadow-md hover:bg-[#003366] hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 font-black uppercase text-[12px] tracking-wider border border-blue-400/30"
        >
          See Our Courses
        </button>

        {/* 5. ABOUT US DROPDOWN */}
        <div className="relative group">
          <button className={bubbleLinkStyle}>
            <FaInfoCircle className="text-[#0056b3] group-hover:scale-110 transition-transform" /> 
            About Us 
            <FaChevronDown size={10} className="mt-0.5 opacity-50 group-hover:rotate-180 transition-transform" />
          </button>
          
          <div className="absolute top-full left-0 w-56 bg-white shadow-2xl rounded-2xl py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all duration-300 z-50">
            <button 
              onClick={() => scrollToSection('about-academy')}
              className={dropdownLinkStyle}
            >
              <FaUniversity className="text-orange-500" /> About Academy
            </button>
            
            {/* --- FIXED: About Owner Scroll --- */}
            <button 
              onClick={() => scrollToSection('about-owner')}
              className={dropdownLinkStyle}
            >
              <FaUserTie className="text-blue-600" /> About Owner
            </button>
          </div>
        </div>

        {/* 6. CONTACT US (Scrolls to Footer) */}
        <button onClick={() => scrollToSection('footer-section')} className={bubbleLinkStyle}>
          <FaEnvelope className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Contact Us
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden text-2xl text-[#003366] hover:bg-blue-50 p-2 rounded-full cursor-pointer transition">☰</div>
    </nav>
  );
};

export default Navbar;