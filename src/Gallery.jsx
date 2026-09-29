import React from 'react';
import { FaVideo, FaWhatsapp } from 'react-icons/fa';

const Gallery = () => {
  const videoIds = [
    "iQMm7VAUTn0", 
    "ZV4XibUqb-Q", 
    "lVQ14qHE1VY"  
  ];

  return (
    <section id="gallery-section" className="py-12 sm:py-16 md:py-20 bg-[#f8faff] relative overflow-hidden font-sans">

      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-72 sm:w-80 h-72 sm:h-80 bg-orange-100 rounded-full blur-3xl opacity-30 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 sm:w-80 h-72 sm:h-80 bg-sky-100 rounded-full blur-3xl opacity-30 pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <span className="h-[2px] w-6 sm:w-8 bg-orange-500 rounded-full"></span>
            <span className="text-orange-500 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] flex items-center gap-1.5">
              <FaVideo size={10} className="animate-pulse" /> Live Class Moments
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-orange-500 rounded-full"></span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#001f3f] tracking-tight leading-tight">
            See How We <span className="text-orange-600 italic">Teach & Connect</span>
          </h2>

          <p className="mt-2.5 sm:mt-3 text-slate-500 font-medium text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Real classroom glimpses of our interactive 1-on-1 Quran sessions, Tajweed pronunciation drills, and child-friendly teaching methods.
          </p>
        </div>

        {/* Video Showcase Container */}
        <div className="relative bg-[#001f3f] rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 overflow-hidden shadow-2xl border border-blue-950">

          {/* Inner Glow Accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center relative z-10">
            {videoIds.map((id, index) => (
              <div key={index} className="w-full max-w-[270px] sm:max-w-[280px]">
                
                {/* 9:16 Aspect Ratio Frame */}
                <div className="relative w-full aspect-[9/16] bg-black rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl border-2 sm:border-4 border-white/10 group hover:border-orange-400/60 transition-all duration-300">

                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&controls=1&playsinline=1`}
                    title={`Al Quran Institute Highlight ${index + 1}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>

                  {/* Highlights Badge */}
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md z-10 pointer-events-none flex items-center gap-1 tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 bg-white rounded-full inline-block animate-ping"></span>
                    Highlight
                  </div>

                  {/* Video numbering */}
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md z-10 pointer-events-none">
                    Session #{index + 1}
                  </div>

                </div>

                <p className="text-center text-slate-300 text-xs font-bold uppercase tracking-wider mt-3">
                  Live Recitation #{index + 1}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Trial Booking Bar */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative z-10">
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Want to Experience a Live Lesson?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Book a risk-free 3-day trial class with your chosen tutor today.
              </p>
            </div>

            <a
              href="https://wa.me/923485654503?text=Assalam-o-Alaikum%20Al-Quran%20Institute%2C%20I%20saw%20your%20class%20highlights%20and%20want%20to%20book%20a%20Free%20Trial."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg active:scale-95 transition-all whitespace-nowrap"
            >
              <FaWhatsapp size={15} />
              Book 3-Day Free Trial
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Gallery;