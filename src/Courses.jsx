import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBookOpen, FaMicrophoneAlt, FaHeart, FaStar, 
  FaLanguage, FaLayerGroup, FaBookReader, FaMoon, 
  FaQuran, FaPray, FaArrowRight, FaCalendarCheck 
} from 'react-icons/fa';

import SEOEngine from './SEO/SEOEngine';
import { coursesPageSEO } from './SEO/coursesPageSEO';

export const IconDictionary = {
  bookOpen: <FaBookOpen />,
  bookReader: <FaBookReader />,
  microphone: <FaMicrophoneAlt />,
  star: <FaStar />,
  language: <FaLanguage />,
  layerGroup: <FaLayerGroup />,
  moon: <FaMoon />,
  heart: <FaHeart />,
  quran: <FaQuran />,
  pray: <FaPray />
};

export const generateSlug = (title = '') => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ─── MASTER STATIC COURSES LIST (Arranged from Beginner Foundations to Advanced) ───
export const STATIC_COURSES = [
  {
    _id: "course-1",
    title: "Noorani Qaida for Beginners",
    slug: "noorani-qaida-for-beginners",
    desc: "Essential foundation course covering Arabic alphabets, letter recognition, correct pronunciation, and basic phonetic rules for kids and absolute beginners.",
    level: "Beginner",
    duration: "3 - 6 Months",
    sessionType: "1-on-1 Classes",
    iconKey: "bookOpen",
    color: "from-amber-500 to-orange-600"
  },
  {
    _id: "course-2",
    title: "Quran Reading with Tajweed",
    slug: "quran-reading-with-tajweed",
    desc: "Learn to recite the Holy Quran smoothly with accurate application of Tajweed rules, Makharij articulation, and correct rhythm under certified tutors.",
    level: "Beginner",
    duration: "6 - 12 Months",
    sessionType: "1-on-1 Classes",
    iconKey: "microphone",
    color: "from-teal-500 to-emerald-700"
  },
  {
    _id: "course-3",
    title: "Quran Memorization (Hifz)",
    slug: "online-quran-memorization-hifz",
    desc: "Structured full or partial Hifz program with systematic daily revision (Dour), personalized target milestones, and dedicated one-on-one Huffaz guidance.",
    level: "Advanced",
    duration: "2 - 3 Years",
    sessionType: "Daily Intensive",
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
    sessionType: "1-on-1 Classes",
    iconKey: "star",
    color: "from-rose-500 to-red-700"
  },
  {
    _id: "course-5",
    title: "Islamic Studies & Daily Duas for Kids",
    slug: "islamic-studies-for-kids",
    desc: "Nurturing fundamental Islamic values: daily Masnoon Duas, Six Kalimahs, step-by-step Namaz/Salah practice, Seerah stories, and Islamic manners (Adab).",
    level: "Beginner",
    duration: "Continuous",
    sessionType: "Kids Friendly",
    iconKey: "pray",
    color: "from-emerald-500 to-teal-700"
  },
  {
    _id: "course-6",
    title: "Quran Translation & Tafseer",
    slug: "quran-translation-and-tafseer",
    desc: "In-depth word-by-word Urdu/English translation along with contextual historical background, practical life lessons, and scholarly explanations.",
    level: "All Levels",
    duration: "1 - 2 Years",
    sessionType: "Adults & Youth",
    iconKey: "layerGroup",
    color: "from-purple-600 to-indigo-900"
  },
  {
    _id: "course-7",
    title: "Quranic Arabic & Grammar (Nahw/Sarf)",
    slug: "quranic-arabic-language-course",
    desc: "Understand the language of the Quran directly. Learn essential Arabic vocabulary, syntax, and morphology designed specifically for non-Arab speakers.",
    level: "Intermediate",
    duration: "6 - 12 Months",
    sessionType: "Interactive Live",
    iconKey: "language",
    color: "from-cyan-600 to-blue-700"
  },
  {
    _id: "course-8",
    title: "Ten Qira'at Specialization",
    slug: "ten-qiraat-specialization-course",
    desc: "Advanced certification in authentic Qira'at variants (Hafs, Warsh, Qalun) with authorized Sanad for accomplished reciters and Huffaz.",
    level: "Advanced",
    duration: "1 - 2 Years",
    sessionType: "Sanad Track",
    iconKey: "moon",
    color: "from-slate-700 to-slate-900"
  },
  {
    _id: "course-9",
    title: "Female Quran Teacher Program",
    slug: "female-quran-teacher-classes",
    desc: "Dedicated female scholars and Aalimaat providing private, secure, and comfortable 1-on-1 Quran learning tailored for sisters and young daughters.",
    level: "All Levels",
    duration: "Flexible",
    sessionType: "Sisters Only",
    iconKey: "bookReader",
    color: "from-pink-500 to-rose-700"
  },
  {
    _id: "course-10",
    title: "Daily Salah & Masnoon Dua Mastery",
    slug: "daily-salah-masnoon-dua-course",
    desc: "Practical guidance on performing perfect Salah according to Sunnah, Wudu steps, funeral prayer (Janaza), and 40 essential Rabbana Duas.",
    level: "Beginner",
    duration: "2 - 3 Months",
    sessionType: "Practical Workshop",
    iconKey: "quran",
    color: "from-amber-600 to-yellow-700"
  }
];

const Courses = ({ isHomePage = false, onDirectRegisterTrigger = null }) => {
  // Homepage par pehle 4 popular foundational tracks, dedicated catalog par saare
  const displayedCourses = isHomePage ? STATIC_COURSES.slice(0, 4) : STATIC_COURSES;

  return (
    <>
      {!isHomePage && (
        <SEOEngine 
          title={coursesPageSEO?.title || "Online Quran Courses | Al Quran Islamic Institute"}
          description={coursesPageSEO?.description || "Explore online Quran classes with certified male and female tutors."}
          canonicalUrl="https://www.alquranislamic.com/courses"
          keywords={coursesPageSEO?.keywords || "online quran classes, learn tajweed"}
          ogImage={coursesPageSEO?.ogImage}
          schemaJson={coursesPageSEO?.schema}
        />
      )}

      <section className="py-12 sm:py-16 md:py-20 bg-[#f8faff] relative overflow-hidden" id="courses-section">
        {/* Subtle Background Accent Blurs */}
        <div className="absolute top-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-orange-100 rounded-full blur-3xl opacity-35 pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-sky-100 rounded-full blur-3xl opacity-35 pointer-events-none translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-[2px] w-8 sm:w-10 bg-orange-500 rounded-full"></span>
              <span className="text-orange-500 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">
                {isHomePage ? "Featured Quranic Tracks" : "Comprehensive Curriculum"}
              </span>
              <span className="h-[2px] w-8 sm:w-10 bg-orange-500 rounded-full"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#001f3f] tracking-tight leading-tight">
              {isHomePage ? (
                <>Explore Our <span className="italic text-orange-600">Popular Courses</span></>
              ) : (
                <>All Online <span className="italic text-orange-600">Quran Programs</span></>
              )}
            </h2>

            <p className="mt-3 sm:mt-4 text-slate-500 font-medium text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              1-on-1 personalized live classes designed for kids and adults across USA, UK, Canada, and Australia.
            </p>
          </div>

          {/* Courses Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {displayedCourses.map((course) => {
              const courseSlug = course.slug || generateSlug(course.title);

              return (
                <div
                  key={course._id}
                  className="group relative bg-white rounded-3xl p-5 sm:p-6 lg:p-7 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1.5 transition-all duration-300 border border-slate-100 flex flex-col overflow-hidden"
                >
                  {/* Top Gradient Accent Strip */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${course.color || 'from-teal-400 to-teal-600'}`}></div>

                  {/* Corner Visual Pill */}
                  <div className="absolute top-0 right-0 w-14 sm:w-16 h-14 sm:h-16 bg-slate-50 rounded-bl-[2.5rem] group-hover:bg-orange-50 transition-colors"></div>

                  {/* Icon Box */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${course.color || 'from-teal-500 to-teal-700'} text-white flex items-center justify-center text-lg sm:text-xl mb-4 sm:mb-5 group-hover:scale-105 transition-transform duration-300 shadow-md`}>
                    {IconDictionary[course.iconKey] || <FaBookOpen />}
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-black text-[#001f3f] mb-2 sm:mb-3 group-hover:text-orange-600 transition-colors leading-snug">
                    {course.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3 flex-1 font-normal">
                    {course.desc}
                  </p>

                  {/* Badges / Meta Info */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {course.level && (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                        {course.level}
                      </span>
                    )}
                    {course.duration && (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full">
                        {course.duration}
                      </span>
                    )}
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                      {course.sessionType || "1-on-1 Sessions"}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto space-y-2 pt-2 border-t border-slate-100">
                    <Link
                      to={`/courses/${courseSlug}`}
                      state={{ from: isHomePage ? 'home' : 'catalog' }}
                      className="w-full py-2.5 sm:py-3 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-wider hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2 active:scale-95"
                    >
                      Course Details <FaArrowRight size={10} />
                    </Link>

                    {onDirectRegisterTrigger ? (
                      <button
                        type="button"
                        onClick={() => onDirectRegisterTrigger(course.title)}
                        className="w-full py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-[11px] font-bold tracking-wide transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                      >
                        <FaCalendarCheck size={11} /> Book Free Trial
                      </button>
                    ) : (
                      <a
                        href={`https://wa.me/923485654503?text=Assalam-o-Alaikum%20Al-Quran%20Institute%2C%20I%20am%20interested%20in%20${encodeURIComponent(course.title)}%20Free%20Trial.`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-[11px] font-bold tracking-wide transition-colors flex items-center justify-center gap-1.5 active:scale-95 text-center"
                      >
                        <FaCalendarCheck size={11} /> Book Free Trial
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Homepage Bottom CTA */}
          {isHomePage && (
            <div className="mt-10 sm:mt-14 text-center">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-900/10 hover:shadow-orange-500/20 hover:from-orange-500 hover:to-orange-600 transition-all duration-300 active:scale-95"
              >
                <span>View All 10 Quran Courses</span>
                <FaArrowRight size={11} />
              </Link>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default Courses;