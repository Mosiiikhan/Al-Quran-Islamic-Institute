import React, { useState, useEffect } from 'react';
import { 
  FaHome, FaMoneyCheckAlt, FaChevronDown, FaChevronUp, 
  FaInfoCircle, FaEnvelope, FaImages, FaUserTie, 
  FaUniversity, FaBloggerB, FaUsers, FaTimes, FaBars, FaWhatsapp
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoImg from './assets/logo.jpeg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Route change par drawer band karna
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
  }, [location.pathname]);

  const bubbleLinkStyle =
    "navPill group flex items-center gap-1.5 px-4 lg:px-5 py-2.5 font-bold text-[#0A1F44] text-[13px] lg:text-[13.5px] cursor-pointer";

  const dropdownLinkStyle =
    "flex items-center gap-2.5 px-5 py-3 hover:bg-blue-50 text-gray-700 hover:text-[#0056b3] font-bold text-sm transition-all duration-200 border-b border-gray-50 last:border-0 w-full text-left";

  // Smooth Scroll Logic
  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 700;
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
      setTimeout(() => scrollToSection(sectionId), 150);
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
      setTimeout(() => scrollToSection('blog-section'), 150);
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
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease;
          white-space: nowrap;
        }
        .navPill:hover {
          transform: translateY(-2px);
          background: linear-gradient(180deg, rgba(255,255,255,1), rgba(204,229,255,0.95));
          box-shadow: 0 4px 0 rgba(31,111,212,0.22), 0 10px 20px rgba(10,31,68,0.16);
          color: #0056b3;
        }
        .navPill:active {
          transform: translateY(1px);
          box-shadow: 0 1px 0 rgba(31,111,212,0.18), 0 3px 8px rgba(10,31,68,0.12);
        }
      `}</style>

      {/* ─── DESKTOP & MOBILE HEADER BAR ─── */}
      <div
        className={`sticky top-0 z-50 flex justify-center px-2.5 sm:px-4 lg:px-6 transition-all duration-300 ${
          scrolled ? 'pt-1.5' : 'pt-2.5 sm:pt-3.5'
        }`}
      >
        <nav
          className={`w-full max-w-7xl flex items-center justify-between rounded-2xl sm:rounded-[28px] px-3.5 sm:px-6 lg:px-8 py-2 border backdrop-blur-xl transition-all duration-300 ${
            scrolled
              ? 'bg-white/95 border-white/80 shadow-[0_10px_30px_rgba(10,31,68,0.18)]'
              : 'bg-white/80 border-white/60 shadow-[0_6px_22px_rgba(10,31,68,0.1)]'
          }`}
        >
          {/* Logo Section */}
          <div
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
            onClick={handleHomeClick}
          >
            <div className="overflow-hidden rounded-lg shrink-0">
              <img
                src={LogoImg}
                alt="Al Quran Islamic Institute"
                className="h-10 sm:h-12 md:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-black text-[#003366] leading-none tracking-tight">
                AL QURAN
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-bold text-orange-600 tracking-[0.18em] uppercase mt-0.5">
                Islamic Institute
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <button onClick={handleHomeClick} className={bubbleLinkStyle}>
              <FaHome className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Home
            </button>

            <button onClick={() => handleNavClick('fee-section')} className={bubbleLinkStyle}>
              <FaMoneyCheckAlt className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Fee Plans
            </button>

            <button onClick={() => handleNavClick('gallery-section')} className={bubbleLinkStyle}>
              <FaImages className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Gallery
            </button>

            <button onClick={handleBlogsClick} className={bubbleLinkStyle}>
              <FaBloggerB className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Blogs
            </button>

            <button
              onClick={() => handleNavClick('courses-section')}
              className="mx-1 bg-gradient-to-b from-[#4DA3FF] to-[#0056b3] text-white px-5 lg:px-6 py-2 rounded-full font-black uppercase text-xs tracking-wider border border-white/30 shadow-[0_3px_0_#003366,0_8px_16px_rgba(0,86,179,0.35)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
            >
              Courses
            </button>

            {/* Desktop Dropdown */}
            <div className="relative group">
              <button className={bubbleLinkStyle}>
                <FaInfoCircle className="text-[#0056b3] group-hover:scale-110 transition-transform" />
                About Us
                <FaChevronDown size={10} className="mt-0.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 w-56 bg-white shadow-2xl rounded-2xl py-1.5 border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all duration-200 z-50">
                <button onClick={() => handleNavClick('about-academy')} className={dropdownLinkStyle}>
                  <FaUniversity className="text-orange-500" /> About Academy
                </button>
                <button onClick={() => navigate('/about-ceo')} className={dropdownLinkStyle}>
                  <FaUserTie className="text-blue-600" /> CEO / Founder
                </button>
                <button onClick={() => handleNavClick('about-team')} className={dropdownLinkStyle}>
                  <FaUsers className="text-emerald-600" /> Teachers & Faculty
                </button>
              </div>
            </div>

            <button onClick={() => handleNavClick('footer-section')} className={bubbleLinkStyle}>
              <FaEnvelope className="text-[#0056b3] group-hover:scale-110 transition-transform" /> Contact
            </button>
          </div>

          {/* Mobile Right Quick Action & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://wa.me/923485654503?text=Assalam-o-Alaikum%20Al-Quran%20Institute%2C%20I%20want%20to%20enroll%20in%20a%20Free%20Trial."
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 text-white p-2 rounded-xl active:scale-95 transition-transform"
              aria-label="WhatsApp Us"
            >
              <FaWhatsapp size={17} />
            </a>

            <button 
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
              className="text-[#003366] bg-slate-100 hover:bg-slate-200/80 p-2 rounded-xl transition-all"
            >
              {mobileMenuOpen ? <FaTimes size={19} /> : <FaBars size={19} />}
            </button>
          </div>
        </nav>
      </div>

      {/* ─── MOBILE BACKDROP & DRAWER ─── */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <div 
            className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Menu */}
          <div className="md:hidden fixed inset-x-3.5 top-18 z-50 max-h-[82vh] overflow-y-auto bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-4 transition-all">
            <div className="flex flex-col gap-1 text-slate-800 font-bold text-sm">

              <button
                onClick={handleHomeClick}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-blue-50 text-left transition"
              >
                <FaHome className="text-[#0056b3] text-base" /> Home
              </button>

              <button
                onClick={() => handleNavClick('courses-section')}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-blue-50 text-left transition text-orange-600 font-extrabold"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
                Our Quran Courses
              </button>

              <button
                onClick={() => handleNavClick('fee-section')}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-blue-50 text-left transition"
              >
                <FaMoneyCheckAlt className="text-[#0056b3] text-base" /> Tuition & Fees
              </button>

              <button
                onClick={() => handleNavClick('gallery-section')}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-blue-50 text-left transition"
              >
                <FaImages className="text-[#0056b3] text-base" /> Campus Gallery
              </button>

              <button
                onClick={handleBlogsClick}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-blue-50 text-left transition"
              >
                <FaBloggerB className="text-[#0056b3] text-base" /> Islamic Articles & Blogs
              </button>

              {/* Accordion: About Us */}
              <div className="border-t border-slate-100 pt-1 mt-1">
                <button
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-blue-50 transition"
                >
                  <span className="flex items-center gap-3">
                    <FaInfoCircle className="text-[#0056b3] text-base" /> About Us
                  </span>
                  {aboutDropdownOpen ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
                </button>

                {aboutDropdownOpen && (
                  <div className="ml-3 pl-3 border-l-2 border-orange-300 my-1 flex flex-col gap-1">
                    <button
                      onClick={() => handleNavClick('about-academy')}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-orange-600 rounded-lg text-left"
                    >
                      <FaUniversity className="text-orange-500" /> About Academy
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate('/about-ceo');
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 rounded-lg text-left"
                    >
                      <FaUserTie className="text-blue-600" /> CEO / Founder Profile
                    </button>
                    <button
                      onClick={() => handleNavClick('about-team')}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-600 rounded-lg text-left"
                    >
                      <FaUsers className="text-emerald-600" /> Qualified Teachers & Scholars
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavClick('footer-section')}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-blue-50 text-left transition border-t border-slate-100 mt-1"
              >
                <FaEnvelope className="text-[#0056b3] text-base" /> Contact Us
              </button>

              {/* Free Trial Button */}
              <a
                href="https://wa.me/923485654503?text=Assalam-o-Alaikum%20Al-Quran%20Institute%2C%20I%20want%20to%20book%20a%203-Day%20Free%20Trial%20for%20Quran%20Classes."
                target="_blank"
                rel="noreferrer"
                className="mt-2.5 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 active:scale-95 transition"
              >
                <FaWhatsapp size={16} />
                Book 3-Day Free Trial
              </a>

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;