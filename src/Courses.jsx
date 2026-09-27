import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBookOpen, FaMicrophoneAlt, FaHeart, FaStar, 
  FaLanguage, FaLayerGroup, FaBookReader, FaMoon, FaArrowRight, FaCalendarCheck 
} from 'react-icons/fa';

import SEOEngine from './SEO/SEOEngine';
import { coursesPageSEO } from './SEO/coursesPageSEO';

const IconDictionary = {
  bookOpen: <FaBookOpen />,
  bookReader: <FaBookReader />,
  microphone: <FaMicrophoneAlt />,
  star: <FaStar />,
  language: <FaLanguage />,
  layerGroup: <FaLayerGroup />,
  moon: <FaMoon />,
  heart: <FaHeart />
};

// Helper: Title se clean SEO slug banane ke liye fallback
const generateSlug = (title = '') => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ─── STATIC COURSES DATA (Zero Backend / High Performance) ──────────────────
export const STATIC_COURSES = [
  {
    _id: "course-1",
    title: "Noorani Qaida for Beginners",
    slug: "noorani-qaida-for-beginners",
    desc: "Essential foundation course covering Arabic alphabets, letter recognition, correct pronunciation, and basic phonetic rules for kids and absolute beginners.",
    level: "Beginner",
    duration: "3 - 6 Months",
    price: "Custom Schedule",
    iconKey: "bookOpen",
    color: "from-amber-500 to-orange-600"
  },
  {
    _id: "course-2",
    title: "Quran Reading with Tajweed",
    slug: "quran-reading-with-tajweed",
    desc: "Learn to recite the Holy Quran smoothly with accurate application of Tajweed rules, Makharij articulation, and correct rhythm under certified tutors.",
    level: "All Levels",
    duration: "6 - 12 Months",
    price: "Custom Schedule",
    iconKey: "microphone",
    color: "from-teal-500 to-emerald-700"
  },
  {
    _id: "course-3",
    title: "Quran Memorization (Hifz)",
    slug: "online-quran-memorization-hifz",
    desc: "Structured full or partial Hifz program with systematic daily revision (Dour), personalized target milestones, and dedicated one-on-one Huffaz guidance.",
    level: "Intermediate+",
    duration: "2 - 3 Years",
    price: "Custom Schedule",
    iconKey: "heart",
    color: "from-blue-600 to-indigo-800"
  },
  {
    _id: "course-4",
    title: "Quran Recitation with Tarteel",
    slug: "quran-recitation-with-tarteel",
    desc: "Master melodic recitation with measured rhythm, precise pauses (Waqf rules), and beautiful voice modulation following classical Qira'at traditions.",
    level: "Intermediate",
    duration: "4 - 8 Months",
    price: "Custom Schedule",
    iconKey: "star",
    color: "from-rose-500 to-red-700"
  },
  {
    _id: "course-5",
    title: "Quran Translation & Tafseer",
    slug: "quran-translation-and-tafseer",
    desc: "In-depth word-by-word Urdu/English translation along with contextual historical background, practical life lessons, and scholarly explanations.",
    level: "All Levels",
    duration: "1 - 2 Years",
    price: "Custom Schedule",
    iconKey: "layerGroup",
    color: "from-purple-600 to-indigo-900"
  },
  {
    _id: "course-6",
    title: "Quranic Arabic & Grammar",
    slug: "quranic-arabic-language-course",
    desc: "Understand the language of the Quran directly. Learn essential Arabic vocabulary, Nahw (grammar), and Sarf (morphology) designed for non-Arabs.",
    level: "Intermediate",
    duration: "6 - 12 Months",
    price: "Custom Schedule",
    iconKey: "language",
    color: "from-cyan-600 to-blue-700"
  },
  {
    _id: "course-7",
    title: "Islamic Studies for Kids",
    slug: "islamic-studies-for-kids",
    desc: "Nurturing fundamental Islamic values: daily Masnoon Duas, Six Kalimahs, step-by-step Namaz/Salah practice, Seerah stories, and Islamic manners (Adab).",
    level: "Kids (4-14 Yrs)",
    duration: "Continuous",
    price: "Custom Schedule",
    iconKey: "bookReader",
    color: "from-emerald-500 to-teal-700"
  },
  {
    _id: "course-8",
    title: "Ten Qira'at Specialization",
    slug: "ten-qiraat-specialization-course",
    desc: "Advanced certification course in authentic Qira'at variants (Hafs, Warsh, Qalun) with authorized Sanad for accomplished reciters and Huffaz.",
    level: "Advanced",
    duration: "1 - 2 Years",
    price: "Custom Schedule",
    iconKey: "moon",
    color: "from-slate-700 to-slate-900"
  }
];

const Courses = ({ isHomePage = false, onDirectRegisterTrigger = null }) => {
  // Homepage par top 4 featured tracks, dedicated /courses par complete catalog
  const displayedCourses = isHomePage ? STATIC_COURSES.slice(0, 4) : STATIC_COURSES;

  return (
    <>
      {/* 🚀 Sirf dedicated /courses route par SEO inject kare, Homepage par skip kare */}
      {!isHomePage && (
        <SEOEngine 
          title={coursesPageSEO.title}
          description={coursesPageSEO.description}
          canonicalUrl={coursesPageSEO.canonicalUrl}
          keywords={coursesPageSEO.keywords}
          ogImage={coursesPageSEO.ogImage}
          schemaJson={coursesPageSEO.schema}
        />
      )}

      <section className="py-20 bg-[#f8faff] relative overflow-hidden" id="courses-section">
        {/* Background Subtle Blurs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30 pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-sky-100 rounded-full blur-3xl opacity-30 pointer-events-none translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

          {/* Section Header */}
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
              <span className="text-orange-500 text-[11px] font-black uppercase tracking-[0.4em]">
                {isHomePage ? "Featured Quranic Tracks" : "Comprehensive Curriculum"}
              </span>
              <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-blue-900 tracking-tight leading-tight">
              {isHomePage ? (
                <>Explore Our <span className="italic text-orange-600">Popular Courses</span></>
              ) : (
                <>All Online <span className="italic text-orange-600">Quran Programs</span></>
              )}
            </h2>

            <p className="mt-4 text-slate-500 font-medium text-sm md:text-base max-w-xl mx-auto">
              1-on-1 personalized live classes designed for kids and adults across USA, UK, Canada, and Australia.
            </p>
          </div>

          {/* Courses Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedCourses.length === 0 ? (
              <div className="col-span-full text-center text-slate-400 py-16 font-semibold bg-white rounded-3xl border border-dashed border-slate-200">
                No active programs published yet.
              </div>
            ) : (
              displayedCourses.map((course) => {
                const courseSlug = course.slug || generateSlug(course.title);

                return (
                  <div
                    key={course._id}
                    className="group relative bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl hover:shadow-blue-100/60 hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col overflow-hidden"
                  >
                    {/* Top Gradient Accent Strip */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${course.color || 'from-teal-400 to-teal-600'}`}></div>

                    {/* Corner Visual Pill */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-[3rem] group-hover:bg-orange-50 transition-colors"></div>

                    {/* Icon Box */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color || 'from-teal-500 to-teal-700'} text-white flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      {IconDictionary[course.iconKey] || <FaBookOpen />}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black text-[#001f3f] mb-3 group-hover:text-orange-600 transition-colors leading-snug">
                      {course.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1 font-normal">
                      {course.desc}
                    </p>

                    {/* Badges / Meta Info */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.level && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                          {course.level}
                        </span>
                      )}
                      {course.duration && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-orange-50 text-orange-600 px-3 py-1 rounded-full">
                          {course.duration}
                        </span>
                      )}
                      {course.price && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                          {course.price}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto space-y-2 pt-2 border-t border-slate-50">
                      {/* 🚀 State passed to preserve Homepage origin */}
                      <Link
                        to={`/courses/${courseSlug}`}
                        state={{ from: isHomePage ? 'home' : 'catalog' }}
                        className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-wider hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        Course Details <FaArrowRight size={11} />
                      </Link>

                      {/* Instant Direct Free Trial Booking */}
                      {onDirectRegisterTrigger && (
                        <button
                          type="button"
                          onClick={() => onDirectRegisterTrigger(course.title)}
                          className="w-full py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-[11px] font-bold tracking-wide transition-colors flex items-center justify-center gap-1.5"
                        >
                          <FaCalendarCheck size={12} /> Book Free Trial
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Homepage Bottom CTA: Route to Full Catalog */}
          {isHomePage && STATIC_COURSES.length > 4 && (
            <div className="mt-14 text-center">
              <Link
                to="/courses"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-900/10 hover:shadow-orange-500/20 hover:from-orange-500 hover:to-orange-600 transition-all duration-300 hover:-translate-y-0.5"
              >
                View All Courses <FaArrowRight size={12} />
              </Link>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default Courses;