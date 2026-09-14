import React, { useState, useEffect } from 'react';
import { FaHome, FaMoneyCheckAlt, FaChevronDown, FaInfoCircle, FaEnvelope, FaImages, FaUserTie, FaUniversity, FaBloggerB } from 'react-icons/fa'; // 🚀 FIXED: FaBloggerB Icon import kiya
import { useNavigate, useLocation } from 'react-router-dom'; // 🚀 FIXED: Page checking hooks import kiye
import LogoImg from './assets/logo.jpeg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // 🚀 Navigation controller
  const location = useLocation(); // 🚀 Location checker hook

  // Tracks scroll position so the glass bar can solidify + pick up a shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Every regular nav button now shares the same "clearly visible" pill treatment
  const bubbleLinkStyle =
    "navPill group flex items-center gap-1.5 px-5 py-2.5 font-bold text-[#0A1F44] text-[13.5px] cursor-pointer";

  // Dropdown Link Style
  const dropdownLinkStyle =
    "flex items-center gap-2 px-5 py-3 hover:bg-blue-50 text-gray-700 hover:text-[#0056b3] font-bold text-sm transition-all duration-200 border-b border-gray-50 last:border-0 w-full text-left";

  // Smooth Scroll Logic
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

  // 🚀 FIXED: Smart navigation logic for Blogs button click flow
  const handleBlogsClick = () => {
    if (location.pathname === '/') {
      // Agar main landing screen par hain to smoothly neechay scroll kra do
      scrollToSection('blog-section');
    } else {
      // Agar kisi aur isolated screen par hain to pehle homepage bhejo, phir scroll krwao
      navigate('/');
      setTimeout(() => {
        scrollToSection('blog-section');
      }, 100);
    }
  };

  // Home logo path switcher click flow
  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <style>{`
        .navPill {
          position: relative;
          isolation: isolate;
          border-radius: 9999px;
          background: linear-gradient(180deg, rgba(255,255,255,0.97), rgba(229,242,255,0.88));
          border: 1px solid rgba(77,163,255,0.4);
          box-shadow: 0 3px 0 rgba(31,111,212,0.18), 0 6px 14px rgba(10,31,68,0.12);
          transition: transform 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s ease, background 0.3s ease, color 0.3s ease;
          white-space: nowrap;
        }
        .navPill:hover {
          transform: translateY(-3px);
          background: linear-gradient(180deg, rgba(255,255,255,1), rgba(204,229,255,0.95));
          box-shadow: 0 5px 0 rgba(31,111,212,0.22), 0 14px 24px rgba(10,31,68,0.18);
          color: #0056b3;
        }
        .navPill:active {
          transform: translateY(1px);
          box-shadow: 0 1px 0 rgba(31,111,212,0.18), 0 3px 8px rgba(10,31,68,0.12);
        }
        .navPill::before, .navPill::after,
        .ctaBubble::before, .ctaBubble::after {
          content: '';
          position: absolute;
          bottom: 6px;
          border-radius: 50%;
          opacity: 0;
          z-index: -1;
          pointer-events: none;
        }
        .navPill::before { left: 18%; width: 8px; height: 8px; background: rgba(77,163,255,0.55); }
        .navPill::after  { left: 65%; width: 6px; height: 6px; background: rgba(77,163,255,0.45); }
        .ctaBubble::before { left: 20%; width: 8px; height: 8px; background: rgba(255,255,255,0.7); }
        .ctaBubble::after  { left: 68%; width: 6px; height: 6px; background: rgba(255,255,255,0.55); }

        .navPill:hover::before, .ctaBubble:hover::before { animation: bubbleFloat 0.9s ease-out; }
        .navPill:hover::after,  .ctaBubble:hover::after  { animation: bubbleFloat 1.1s ease-out 0.12s; }

        @keyframes bubbleFloat {
          0%    { transform: translateY(0) scale(0.4); opacity: 0; }
          25%   { opacity: 0.65; }
          100% { transform: translateY(-26px) scale(1.15); opacity: 0; }
        }

        .ctaBubble {
          position: relative;
          isolation: isolate;
          white-space: nowrap;
        }
      `}</style>

      <div
        className={`sticky top-0 z-40 flex justify-center px-3 md:px-4 lg:px-6 transition-all duration-500 ${
          scrolled ? 'pt-2' : 'pt-4'
        }`}
      >
        <nav
          className={`w-full max-w-7xl flex items-center justify-between rounded-[28px] px-4 md:px-6 lg:px-10 py-2.5 border backdrop-blur-xl transition-all duration-500 ${
            scrolled
              ? 'bg-white/90 border-white/70 shadow-[0_14px_36px_rgba(10,31,68,0.22)]'
              : 'bg-white/55 border-white/40 shadow-[0_8px_26px_rgba(10,31,68,0.12)]'
          }`}
        >
          {/* --- LOGO SECTION --- */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleHomeClick}
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={LogoImg}
                alt="Al Quran Institute"
                className="h-11 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-2xl font-black text-[#003366] leading-none tracking-tight">
                AL QURAN
              </h1>
              <span className="text-[9px] md:text-[10px] font-bold text-orange-600 tracking-[0.2em] uppercase">
                Islamic Institute
              </span>
            </div>
          </div>

          {/* --- NAV LINKS --- */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2.5">
            {/* 1. HOME BUTTON */}
            <button onClick={handleHomeClick} className={bubbleLinkStyle}>
              <FaHome className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Home
            </button>

            {/* 2. FEE STRUCTURE BUTTON */}
            <button onClick={() => { if(location.pathname !== '/') navigate('/'); setTimeout(() => scrollToSection('fee-section'), 100); }} className={bubbleLinkStyle}>
              <FaMoneyCheckAlt className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Fee
            </button>

            {/* 3. GALLERY BUTTON */}
            <button onClick={() => { if(location.pathname !== '/') navigate('/'); setTimeout(() => scrollToSection('gallery-section'), 100); }} className={bubbleLinkStyle}>
              <FaImages className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Gallery
            </button>

            {/* 🚀 4. NEW BLOGS BUTTON FIXED WITH FLOATING BUBBLES ACCORDINGLY */}
            <button onClick={handleBlogsClick} className={bubbleLinkStyle}>
              <FaBloggerB className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Blogs
            </button>

            {/* 5. MAIN COURSES BUTTON */}
            <button
              onClick={() => { if(location.pathname !== '/') navigate('/'); setTimeout(() => scrollToSection('courses-section'), 100); }}
              className="ctaBubble mx-1 bg-gradient-to-b from-[#4DA3FF] to-[#0056b3] text-white px-5 lg:px-7 py-2.5 rounded-full font-black uppercase text-[12px] tracking-wider border border-white/25 shadow-[0_4px_0_#003366,0_10px_20px_rgba(0,86,179,0.4)] hover:shadow-[0_6px_0_#003366,0_16px_28px_rgba(0,86,179,0.5)] hover:-translate-y-1 active:translate-y-1 active:shadow-[0_1px_0_#003366,0_4px_10px_rgba(0,86,179,0.4)] transition-all duration-300"
            >
              Courses
            </button>

            {/* 6. ABOUT US DROPDOWN */}
            <div className="relative group">
              <button className={bubbleLinkStyle}>
                <FaInfoCircle className="text-[#0056b3] group-hover:scale-110 transition-transform" />
                About Us
                <FaChevronDown size={10} className="mt-0.5 opacity-50 group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute top-full left-0 w-56 bg-white shadow-2xl rounded-2xl py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all duration-300 z-50">
                <button onClick={() => { if(location.pathname !== '/') navigate('/'); setTimeout(() => scrollToSection('about-academy'), 100); }} className={dropdownLinkStyle}>
                  <FaUniversity className="text-orange-500" /> About Academy
                </button>

                <button onClick={() => { if(location.pathname !== '/') navigate('/'); setTimeout(() => scrollToSection('about-owner'), 100); }} className={dropdownLinkStyle}>
                  <FaUserTie className="text-blue-600" /> About Owner
                </button>
              </div>
            </div>

            {/* 7. CONTACT US */}
            <button onClick={() => { if(location.pathname !== '/') navigate('/'); setTimeout(() => scrollToSection('footer-section'), 100); }} className={bubbleLinkStyle}>
              <FaEnvelope className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Contact Us
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden text-2xl text-[#003366] hover:bg-blue-50 p-2 rounded-full cursor-pointer transition">
            ☰
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;