import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Hero = () => {
  const slides = [
    {
      id: 1,
      // Khana Kaba / Masjid-al-Haram Image
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1600",
      eyebrow: "Spiritual Excellence",
      title: "Experience of",
      highlight: "The Holy Quran",
      desc: "Embark on a divine journey of learning from the comfort of your home with our specialized Tajweed programs."
    },
    {
      id: 2,
      // Student / Teacher Learning Environment
      image: "https://images.unsplash.com/photo-1584285418504-00550091298c?q=80&w=1600",
      eyebrow: "Personalized Coaching",
      title: "1-on-1 Interactive",
      highlight: "Quranic Sessions",
      desc: "Our expert tutors ensure personalized attention for kids and adults, making learning easy and effective."
    },
    {
      id: 3,
      // Holy Quran Close-up
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1600",
      eyebrow: "Global Reach",
      title: "Trusted by Families",
      highlight: "In USA, UK & Canada",
      desc: "Join thousands of global students who have mastered Quranic recitation through our tech-driven platform."
    },
    {
      id: 4,
      // Beautiful Mosque Architecture
      image: "https://images.unsplash.com/photo-1542810634-7bc209e056d9?q=80&w=1600",
      eyebrow: "Professional Management",
      title: "Managed by Expert",
      highlight: "Software Engineers",
      desc: "Combining Islamic values with professional discipline to provide a premium online learning experience."
    }
  ];

  const [current, setCurrent] = useState(0);

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#001f3f]">
      
      {/* --- BACKGROUND IMAGE SLIDER --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={slides[current].image} 
              className="w-full h-full object-cover" 
              alt="Islamic Background" 
            />
            {/* Gradient Overlay - Thora light rakha ha takay image saaf nazar aye */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#001f3f]/80 via-[#001f3f]/40 to-transparent"></div>
            <div className="absolute inset-0 bg-black/20"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')] z-10 pointer-events-none"></div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                 <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
                 <span className="text-orange-500 text-[12px] font-black uppercase tracking-[0.4em]">
                   {slides[current].eyebrow}
                 </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                {slides[current].title} <br />
                <span className="text-orange-500 italic drop-shadow-lg">
                  {slides[current].highlight}
                </span>
              </h1>

              <p className="max-w-xl text-lg md:text-xl text-white/90 leading-relaxed mb-10 font-medium">
                {slides[current].desc}
              </p>

              <div className="flex flex-wrap gap-5">
                <button className="bg-orange-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-orange-700 shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95">
                  Book Free Trial
                </button>
                <button className="bg-white/10 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[11px] border-2 border-white/20 hover:bg-white/20 backdrop-blur-md transition-all">
                  Our Courses
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* --- CONTROLS & NAVIGATION --- */}
      <div className="absolute bottom-12 left-6 md:left-12 z-30 flex items-center gap-10">
        {/* Indicators */}
        <div className="flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 transition-all duration-700 rounded-full ${
                i === current ? 'w-12 bg-orange-500 shadow-[0_0_10px_#f97316]' : 'w-4 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button onClick={prevSlide} className="p-4 rounded-full border border-white/20 text-white hover:bg-orange-600 hover:border-orange-600 transition-all backdrop-blur-sm group">
            <FaChevronLeft size={14} className="group-hover:scale-110" />
          </button>
          <button onClick={nextSlide} className="p-4 rounded-full border border-white/20 text-white hover:bg-orange-600 hover:border-orange-600 transition-all backdrop-blur-sm group">
            <FaChevronRight size={14} className="group-hover:scale-110" />
          </button>
        </div>
      </div>

      {/* Progress Bar (Timer indicator) */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 z-40">
         <motion.div 
           key={current}
           initial={{ width: 0 }}
           animate={{ width: "100%" }}
           transition={{ duration: 7, ease: "linear" }}
           className="h-full bg-orange-600"
         />
      </div>

      {/* Side Brand Text (Subtle) */}
      <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 rotate-90 hidden lg:block">
         <span className="text-white/5 text-8xl font-black uppercase tracking-[0.3em] whitespace-nowrap select-none">
            AL QURAN INSTITUTE
         </span>
      </div>
    </div>
  );
};

export default Hero;