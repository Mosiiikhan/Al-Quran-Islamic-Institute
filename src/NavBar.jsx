import React, { useState, useEffect } from 'react';
import { 
  FaHome, FaMoneyCheckAlt, FaChevronDown, FaChevronUp, 
  FaInfoCircle, FaEnvelope, FaImages, FaUserTie, 
  FaUniversity, FaBloggerB, FaUsers, FaTimes, FaBars 
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoImg from './assets/logo.jpeg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false); // Mobile accordion state

  const navigate = useNavigate();
  const location = useLocation();

  // Scroll detection for shadow and glass blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Route change par drawer band karna
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
  }, [location.pathname]);

  const bubbleLinkStyle =
    "navPill group flex items-center gap-1.5 px-5 py-2.5 font-bold text-[#0A1F44] text-[13.5px] cursor-pointer";

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

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 120);
    } else {
      scrollToSection(sectionId);
    }
  };

  const handleBlogsClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      scrollToSection('blog-section');
    } else {
      navigate('/');
      setTimeout(() => scrollToSection('blog-section'), 120);
    }
  };

  const handleHomeClick = () => {
    setMobileMenuOpen(false);
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
        className={`sticky top-0 z-50 flex justify-center px-3 md:px-4 lg:px-6 transition-all duration-500 ${
          scrolled ? 'pt-2' : 'pt-4'
        }`}
      >
        <nav
          className={`w-full max-w-7xl flex items-center justify-between rounded-[28px] px-4 md:px-6 lg:px-10 py-2.5 border backdrop-blur-xl transition-all duration-500 ${
            scrolled
              ? 'bg-white/95 border-white/80 shadow-[0_14px_36px_rgba(10,31,68,0.22)]'
              : 'bg-white/70 border-white/50 shadow-[0_8px_26px_rgba(10,31,68,0.12)]'
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

          {/* --- DESKTOP NAV LINKS --- */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2.5">
            <button onClick={handleHomeClick} className={bubbleLinkStyle}>
              <FaHome className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Home
            </button>

            <button onClick={() => handleNavClick('fee-section')} className={bubbleLinkStyle}>
              <FaMoneyCheckAlt className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Fee
            </button>

            <button onClick={() => handleNavClick('gallery-section')} className={bubbleLinkStyle}>
              <FaImages className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Gallery
            </button>

            <button onClick={handleBlogsClick} className={bubbleLinkStyle}>
              <FaBloggerB className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Blogs
            </button>

            <button
              onClick={() => handleNavClick('courses-section')}
              className="ctaBubble mx-1 bg-gradient-to-b from-[#4DA3FF] to-[#0056b3] text-white px-5 lg:px-7 py-2.5 rounded-full font-black uppercase text-[12px] tracking-wider border border-white/25 shadow-[0_4px_0_#003366,0_10px_20px_rgba(0,86,179,0.4)] hover:shadow-[0_6px_0_#003366,0_16px_28px_rgba(0,86,179,0.5)] hover:-translate-y-1 active:translate-y-1 active:shadow-[0_1px_0_#003366,0_4px_10px_rgba(0,86,179,0.4)] transition-all duration-300"
            >
              Courses
            </button>

            {/* ABOUT US DROPDOWN (DESKTOP: HOVER WITH 3 OPTIONS) */}
            <div className="relative group">
              <button className={bubbleLinkStyle}>
                <FaInfoCircle className="text-[#0056b3] group-hover:scale-110 transition-transform" />
                About Us
                <FaChevronDown size={10} className="mt-0.5 opacity-50 group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute top-full left-0 w-60 bg-white shadow-2xl rounded-2xl py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all duration-300 z-50">
                <button onClick={() => handleNavClick('about-academy')} className={dropdownLinkStyle}>
                  <FaUniversity className="text-orange-500" /> About Academy
                </button>

                {/* 🚀 FIXED: Seedha /about-ceo page par le jayega */}
                <button 
                  onClick={() => navigate('/about-ceo')} 
                  className={dropdownLinkStyle}
                >
                  <FaUserTie className="text-blue-600" /> About CEO / Founder
                </button>

                <button onClick={() => handleNavClick('about-team')} className={dropdownLinkStyle}>
                  <FaUsers className="text-emerald-600" /> Our Teachers & Faculty
                </button>
              </div>
            </div>

            <button onClick={() => handleNavClick('footer-section')} className={bubbleLinkStyle}>
              <FaEnvelope className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Contact Us
            </button>
          </div>

          {/* --- MOBILE HAMBURGER TOGGLE BUTTON --- */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            className="md:hidden text-[#003366] hover:bg-blue-50/80 p-2.5 rounded-2xl transition-all focus:outline-none"
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </nav>
      </div>

      {/* --- MOBILE ACCORDION DRAWER --- */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-3 top-20 z-40 bg-white/95 backdrop-blur-2xl rounded-3xl border-2 border-slate-200/80 shadow-2xl p-5 transition-all animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-1.5">

            <button
              onClick={handleHomeClick}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-black text-[#001f3f] hover:bg-blue-50 text-left transition"
            >
              <FaHome className="text-[#0056b3]" /> Home
            </button>

            <button
              onClick={() => handleNavClick('courses-section')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-black text-[#001f3f] hover:bg-blue-50 text-left transition"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500"></span> Courses
            </button>

            <button
              onClick={() => handleNavClick('fee-section')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-black text-[#001f3f] hover:bg-blue-50 text-left transition"
            >
              <FaMoneyCheckAlt className="text-[#0056b3]" /> Tuition & Fees
            </button>

            <button
              onClick={() => handleNavClick('gallery-section')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-black text-[#001f3f] hover:bg-blue-50 text-left transition"
            >
              <FaImages className="text-[#0056b3]" /> Campus Gallery
            </button>

            <button
              onClick={handleBlogsClick}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-black text-[#001f3f] hover:bg-blue-50 text-left transition"
            >
              <FaBloggerB className="text-[#0056b3]" /> Articles & Blogs
            </button>

            {/* ACCORDION COLLAPSIBLE: ABOUT US ON MOBILE */}
            <div className="border-t border-slate-100 pt-1 mt-1">
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-black text-[#001f3f] hover:bg-blue-50 transition"
              >
                <span className="flex items-center gap-3">
                  <FaInfoCircle className="text-[#0056b3]" /> About Us
                </span>
                {aboutDropdownOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </button>

              {/* Sub-menu items inside Mobile Drawer */}
              {aboutDropdownOpen && (
                <div className="ml-4 pl-3 border-l-2 border-orange-200 my-1 flex flex-col gap-1">
                  <button
                    onClick={() => handleNavClick('about-academy')}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold text-slate-700 hover:text-orange-600 rounded-lg hover:bg-orange-50/50 text-left"
                  >
                    <FaUniversity className="text-orange-500 text-xs" /> About Academy
                  </button>

                  {/* 🚀 FIXED: Mobile Drawer se bhi seedha /about-ceo page par le jayega */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/about-ceo');
                    }}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-blue-50/50 text-left"
                  >
                    <FaUserTie className="text-blue-600 text-xs" /> About CEO / Founder
                  </button>

                  <button
                    onClick={() => handleNavClick('about-team')}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold text-slate-700 hover:text-emerald-600 rounded-lg hover:bg-emerald-50/50 text-left"
                  >
                    <FaUsers className="text-emerald-600 text-xs" /> Our Teachers & Faculty
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('footer-section')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-black text-[#001f3f] hover:bg-blue-50 text-left transition border-t border-slate-100 mt-1"
            >
              <FaEnvelope className="text-[#0056b3]" /> Contact Us
            </button>

            {/* Trial CTA Button Inside Drawer */}
            <a
              href="https://wa.me/923485654503?text=Assalam-o-Alaikum%2C%20I%20want%20to%20book%20a%203-Day%20Free%20Trial."
              target="_blank"
              rel="noreferrer"
              className="mt-3 text-center py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-orange-500/20 active:scale-95 transition"
            >
              Book 3-Day Free Trial
            </a>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;