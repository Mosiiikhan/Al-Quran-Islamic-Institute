import React, { useState } from 'react';
import { FaGlobe, FaUserCheck, FaChartLine, FaClock, FaPlay, FaWhatsapp } from 'react-icons/fa';
import { AboutAcademySEO } from './SEO/AboutAcademySEO';

const VIDEO_ID = '3TTrmyRBrPU';
const POSTER = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;
const VIDEO_SRC = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`;
const WHATSAPP_LINK = 'https://wa.me/923485654503?text=Assalam-o-Alaikum%20Al-Quran%20Institute%2C%20I%20want%20to%20book%20a%203-Day%20Free%20Trial%20for%20my%20child.';

// Countries wahi rakhein jahan sach mein students hain
const COUNTRIES = 'USA, UK, Canada, Australia & UAE';

// ─── Class strings ───
const CARD_CLASS = 'group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border-l-4 shadow-md hover:shadow-xl lg:hover:-translate-y-1 transition-all duration-300 overflow-hidden';
const BTN_CLASS = 'inline-flex items-center justify-center gap-2 shrink-0 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white px-5 py-3 rounded-2xl font-black uppercase tracking-wider text-xs shadow-lg shadow-orange-900/20 active:scale-95 transition-all';
const PLAY_WRAP_CLASS = 'relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-2xl group-hover:scale-110 group-active:scale-95 transition-transform';
const PING_CLASS = 'absolute h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-orange-500/40 animate-ping';
const BADGE_CLASS = 'absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/40 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full border border-white/20';
const SECTION_CLASS = 'scroll-mt-20 py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#f0f4ff] to-[#e8f0fe] relative overflow-hidden';

const FEATURES = [
  {
    icon: FaGlobe,
    title: 'Global Presence',
    text: `Families across ${COUNTRIES} trust us with their children's Quran learning.`,
    border: 'border-sky-400',
    iconBg: 'bg-sky-500',
    bar: 'bg-sky-400',
  },
  {
    icon: FaUserCheck,
    title: 'Certified Staff',
    text: 'Male & Female Sanad-holder tutors providing personalized 1-on-1 guidance.',
    border: 'border-orange-400',
    iconBg: 'bg-orange-500',
    bar: 'bg-orange-400',
  },
  {
    icon: FaClock,
    title: '24/7 Availability',
    text: 'Flexible scheduling tailored perfectly to your local time zone.',
    border: 'border-indigo-400',
    iconBg: 'bg-indigo-600',
    bar: 'bg-indigo-400',
  },
  {
    icon: FaChartLine,
    title: 'Structured Flow',
    text: 'Progress tracking and monthly evaluation reports for every student.',
    border: 'border-emerald-400',
    iconBg: 'bg-emerald-600',
    bar: 'bg-emerald-400',
  },
];

// ─── Feature card ───
const FeatureCard = ({ icon: Icon, title, text, border, iconBg, bar }) => {
  return (
    <div className={`${CARD_CLASS} ${border}`}>
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform`}>
        <Icon size={20} className="text-white" />
      </div>
      <h3 className="font-black text-[#001f3f] text-base sm:text-lg mb-1.5">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">{text}</p>
      <div className={`absolute bottom-0 left-0 h-1 w-0 ${bar} group-hover:w-full transition-all duration-300`} />
    </div>
  );
};

// ─── WhatsApp trial button ───
const TrialButton = () => {
  return (
    <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className={BTN_CLASS}>
      <FaWhatsapp size={15} />
      Book 3-Day Free Trial
    </a>
  );
};

// ─── Video: thumbnail + play button, click par hi YouTube load hota hai ───
const VideoPlayer = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full">
      <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-2xl sm:rounded-3xl blur opacity-25" />

      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 sm:border-8 border-white bg-[#001f3f]">
        <div className="aspect-video relative w-full">
          {playing ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={VIDEO_SRC}
              title="Al Quran Islamic Institute Introduction Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button type="button" onClick={() => setPlaying(true)} aria-label="Play introduction video" className="group absolute inset-0 w-full h-full">
              <img src={POSTER} alt="Al Quran Islamic Institute introduction video thumbnail" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-[#001f3f]/70 via-transparent to-black/10" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="relative flex items-center justify-center">
                  <span className={PING_CLASS} />
                  <span className={PLAY_WRAP_CLASS}>
                    <FaPlay size={22} className="ml-1" />
                  </span>
                </span>
              </span>
              <span className={BADGE_CLASS}>▶ Watch Our Introduction</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main component ───
const AboutAcademy = () => {
  const schema = AboutAcademySEO && AboutAcademySEO.schema;
  const schemaJson = schema ? (typeof schema === 'string' ? schema : JSON.stringify(schema)) : null;

  return (
    <>
      {schemaJson && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      )}

      <section id="about-academy" className={SECTION_CLASS}>
        {/* Background circles */}
        <div className="absolute top-10 left-5 sm:left-10 w-48 sm:w-64 h-48 sm:h-64 bg-orange-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-10 right-5 sm:right-10 w-48 sm:w-64 h-48 sm:h-64 bg-sky-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* HEADING */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-[2px] w-8 sm:w-10 bg-orange-500 rounded-full" />
              <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">Who We Are</span>
              <span className="h-[2px] w-8 sm:w-10 bg-orange-500 rounded-full" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-950 leading-tight tracking-tight">
              About Our <span className="text-[#0056b3] italic">Academy</span>
            </h2>

            <div className="mt-4 sm:mt-5 space-y-3 text-slate-600 font-medium leading-relaxed text-sm sm:text-base md:text-lg">
              <p>
                <span className="text-orange-600 font-extrabold">Al Quran Islamic Institute</span> was founded with one sacred purpose — to make the words of Allah ﷻ accessible to every Muslim family across the globe. We understand how hard it is for parents in the <span className="text-[#001f3f] font-bold">{COUNTRIES}</span> and beyond to find a qualified, trustworthy Quran teacher.
              </p>
              <p>
                Our certified tutors, all <span className="text-[#001f3f] font-bold">Hafiz-e-Quran with Ijazah</span>, deliver <span className="text-[#001f3f] font-bold">1-on-1 personalized sessions</span> covering <span className="text-[#001f3f] font-bold">Tajweed, Tarteel, Hifz and Nazra</span>, tailored to your local timezone.
              </p>
            </div>
          </div>

          {/* SPLIT LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* CARDS: mobile par neeche, desktop par left */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 order-2 lg:order-1">
              {FEATURES.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>

            {/* VIDEO: mobile par upar, desktop par right */}
            <div className="order-1 lg:order-2 flex flex-col items-center w-full">
              <VideoPlayer />

              <div className="mt-5 sm:mt-6 w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <p className="text-sm text-slate-600 font-semibold text-center sm:text-left">
                  See how our 1-on-1 online Quran classes work.
                </p>
                <TrialButton />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutAcademy;