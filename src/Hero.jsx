import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import {
  FaChevronLeft, FaChevronRight, FaWhatsapp, FaGraduationCap,
  FaUserGraduate, FaBookOpen, FaGlobeAmericas, FaGift, FaChalkboardTeacher, FaClock
} from 'react-icons/fa';
import kabba from './assets/kabba.jpg';
import child from './assets/child.jpeg.webp';

// ─── STATS (yahan apne asli numbers likho) ───────────────────────────────────
// value: number jo 0 se count hoga | suffix: "+" / "%" wagera | label: neeche ka text
const STATS = [
  { icon: FaUserGraduate,      value: 100, suffix: '+', label: 'Total Students' },
  { icon: FaBookOpen,          value: 5,   suffix: '+', label: 'Quran Courses' },
  { icon: FaGlobeAmericas,     value: 10,  suffix: '+', label: 'Countries Served' },
  { icon: FaGift,              value: 3,   suffix: '',  label: 'Days Free Trial' },
  { icon: FaChalkboardTeacher, value: 100, suffix: '%', label: '1-on-1 Classes' },
  { icon: FaClock,             value: 24,  suffix: '/7', label: 'Flexible Timings' },
];

// Number ko 0 se target tak animate karta hai (jab section screen par aaye)
const CountUp = ({ end, suffix = '', duration = 1800 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setVal(end); return; }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration, reduce]);

  return <span ref={ref}>{val}{suffix}</span>;
};

const Hero = () => {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1600",
      eyebrow: "🕌 Where Every Journey Begins",
      title: "Learn Quran with",
      highlight: "Tajweed & Tarteel",
      desc: "Begin your child's sacred journey with certified tutors who teach with patience, wisdom, and the love of Allah ﷻ."
    },
    {
      id: 2,
      image: kabba,
      eyebrow: "🕋 Facing the Qibla of Knowledge",
      title: "Online Classes",
      highlight: "Inspired by the Sunnah",
      desc: "Every lesson is rooted in Islamic values — connecting your child to the Quran the way it was meant to be learned."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1600",
      eyebrow: "📖 Trusted by 5000+ Families",
      title: "Mastering the Words of",
      highlight: "Allah ﷻ Worldwide",
      desc: "Families across USA, UK, Canada & Australia trust us to give their children the greatest gift — the Holy Quran."
    },
    {
      id: 4,
      image: child,
      eyebrow: "👨‍🏫 Certified & Qualified Tutors",
      title: "Your Child Deserves",
      highlight: "The Best Quran Teacher",
      desc: "Our male & female tutors are Hafiz-e-Quran with authentic ijazah — ensuring safe, engaging 1-on-1 learning."
    }
  ];

  const [current, setCurrent] = useState(0);

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  // Smooth Scroll Helper
  const scrollToCourses = () => {
    const elem = document.getElementById('courses-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <section className="relative min-h-[92vh] sm:min-h-screen w-full overflow-hidden bg-[#001f3f] flex items-center">

        {/* ─── BACKGROUND SLIDER ─── */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={slides[current].image}
                className="w-full h-full object-cover object-center"
                alt={slides[current].title}
              />
              {/* Gradients tailored for mobile reading contrast */}
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#001f3f] via-[#001f3f]/75 sm:via-[#001f3f]/50 to-black/30"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Islamic Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')] z-10 pointer-events-none"></div>

        {/* ─── MAIN CONTENT ─── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-24 flex items-center">
          <div className="w-full max-w-2xl lg:max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Eyebrow Badge */}
                <div className="inline-flex items-center gap-2 mb-3 sm:mb-5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <span className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-ping"></span>
                  <span className="text-orange-400 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                    {slides[current].eyebrow}
                  </span>
                </div>

                {/* Main Heading (Adaptive size for phones) */}
                <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-5 leading-[1.15] tracking-tight">
                  {slides[current].title} <br className="hidden xs:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 drop-shadow-md">
                    {slides[current].highlight}
                  </span>
                </h1>

                {/* Subtitle / Description */}
                <p className="text-sm sm:text-base lg:text-lg text-slate-200/95 leading-relaxed mb-6 sm:mb-8 font-normal max-w-xl">
                  {slides[current].desc}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4 pt-1">
                  <a
                    href="https://wa.me/923485654503?text=Assalam-o-Alaikum%20Al-Quran%20Institute%2C%20I%20want%20to%20book%20a%203-Day%20Free%20Trial%20for%20my%20child."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white px-6 sm:px-8 py-3.5 rounded-2xl font-black uppercase tracking-wider text-xs shadow-xl shadow-orange-950/40 active:scale-95 transition-all text-center"
                  >
                    <FaWhatsapp size={16} />
                    Book 3-Day Free Trial
                  </a>

                  <button
                    onClick={scrollToCourses}
                    type="button"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 py-3.5 rounded-2xl font-black uppercase tracking-wider text-xs border border-white/25 backdrop-blur-md active:scale-95 transition-all"
                  >
                    <FaGraduationCap size={16} />
                    Explore Courses
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ─── SLIDER CONTROLS (Responsive) ─── */}
        <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 lg:left-12 z-30 flex items-center justify-between sm:justify-start gap-4 sm:gap-8 w-[calc(100%-2rem)] sm:w-auto">

          {/* Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  i === current
                    ? 'w-8 sm:w-10 bg-orange-500 shadow-[0_0_8px_#f97316]'
                    : 'w-2 sm:w-3 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Next / Prev Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/25 bg-black/20 text-white flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 transition-all backdrop-blur-sm active:scale-95"
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/25 bg-black/20 text-white flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 transition-all backdrop-blur-sm active:scale-95"
            >
              <FaChevronRight size={12} />
            </button>
          </div>

        </div>

        {/* Progress Bar (Bottom) */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-40">
          <motion.div
            key={current}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 7, ease: "linear" }}
            className="h-full bg-gradient-to-r from-orange-500 to-amber-400"
          />
        </div>

      </section>

      {/* ─── STATS BAR (Hero ke end par) ─── */}
      <section
        aria-label="Al Quran Institute in numbers"
        className="relative bg-[#00142b] px-3 sm:px-6 lg:px-8 py-4 sm:py-7"
      >
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative max-w-6xl mx-auto rounded-2xl sm:rounded-3xl p-px bg-gradient-to-r from-orange-500/60 via-white/10 to-amber-400/60 shadow-2xl shadow-black/40"
        >
          {/* gap-px + bg = thin dividers between cells (mobile: 3x2, desktop: 6x1) */}
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-px rounded-[15px] sm:rounded-[23px] overflow-hidden bg-white/10">
            {STATS.map(({ icon: Icon, value, suffix, label }) => (
              <div
                key={label}
                className="group bg-[#001a35] hover:bg-[#032450] transition-colors px-1.5 py-3 sm:px-4 sm:py-5 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-center sm:text-left"
              >
                <span className="shrink-0 w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-md shadow-orange-950/40 group-hover:scale-110 transition-transform">
                  <Icon className="text-[11px] sm:text-base" />
                </span>
                <div className="min-w-0">
                  <div className="text-base sm:text-2xl font-black text-white leading-none tracking-tight">
                    <CountUp end={value} suffix={suffix} />
                  </div>
                  <div className="mt-1 text-[9px] sm:text-[11px] font-semibold text-slate-300/90 uppercase tracking-wide leading-tight">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;