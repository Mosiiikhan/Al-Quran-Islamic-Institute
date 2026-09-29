import React, { useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaCheckCircle, FaClock, FaSignal, 
  FaGlobe, FaWhatsapp, FaShieldAlt, FaArrowLeft, FaCalendarAlt, FaHome, FaTable,
  FaBookOpen, FaLaptopHouse, FaUserGraduate, FaStar
} from 'react-icons/fa';

import SEOEngine from './SEO/SEOEngine';
import { STATIC_COURSES } from './Courses';

// Har course ke authentic syllabus points aur learning outlines
const COURSE_SYLLABUS_MAP = {
  "noorani-qaida-for-beginners": [
    "Lesson 1-3: Arabic Alphabet recognition & accurate Makharij",
    "Lesson 4-6: Short Vowels (Harakat: Fathah, Kasrah, Dammah)",
    "Lesson 7-9: Letters of Maddah (Prolongation) & Leen",
    "Lesson 10-12: Sukoon (Jazm), Tanween, and Rules of Noon Sakin",
    "Lesson 13-15: Tashdeed (Shaddah) and Noon/Meem Mushaddad",
    "Lesson 16-17: Comprehensive exercises reading actual Quranic words"
  ],
  "quran-reading-with-tajweed": [
    "Precision in articulation points (Makharij al-Huroof)",
    "Rules of Noon Sakin & Tanween (Izhar, Idgham, Iqlab, Ikhfa)",
    "Rules of Meem Sakin and Qalqalah letters",
    "Types of Madd (Mandatory, Permissible, and Conditional)",
    "Stopping Signs (Ahkam al-Waqf) and breath management",
    "Supervised reading from Juz 1 to Juz 30 with fluency"
  ],
  "online-quran-memorization-hifz": [
    "Daily Sabaq: Memorizing new verses under live tutor guidance",
    "Sabqi (Recent revision): Daily revision of the last 5-10 pages",
    "Manzil / Dour (Long-term revision): Systematic cyclical review",
    "Mental endurance techniques and Tajweed retention during Hifz",
    "Quarterly oral evaluation and Ijazah certification track"
  ],
  "quran-recitation-with-tarteel": [
    "Principles of measured pacing and rhythmic stability",
    "Voice control, breath conservation, and resonance techniques",
    "Pausing (Waqf) and restarting (Ibtida) without altering meaning",
    "Introduction to melodic recitation aesthetics in classical style"
  ],
  "islamic-studies-for-kids": [
    "Five Pillars of Islam & Six Articles of Faith (Iman)",
    "Step-by-step practical Wudu & Namaz/Salah performance",
    "Daily essential Masnoon Duas (waking up, eating, sleeping)",
    "Inspiring stories of the Prophets and the Sahabah (R.A)",
    "Respect for parents, honesty, kindness, and Islamic manners (Adab)"
  ],
  "quran-translation-and-tafseer": [
    "Word-by-word literal translation in English & Urdu",
    "Grammatical breakdown of root words and Quranic terminology",
    "Context of revelation (Makki vs Madani Surahs / Asbab al-Nuzul)",
    "Practical daily life applications and moral takeaways"
  ],
  "quranic-arabic-language-course": [
    "Arabic noun cases, verb conjugations, and sentence structures",
    "Understanding common Quranic roots and vocabulary patterns",
    "Parsing real Quranic verses grammatically (I'rab)",
    "Comprehension exercises on selected short Surahs"
  ],
  "ten-qiraat-specialization-course": [
    "Theoretical framework of the Ten Canonical Qira'at",
    "Comparative analysis of Usul (principles) and Farsh (variants)",
    "Practical one-on-one reading and oral recitation exam",
    "Authorized Sanad & Ijazah certification track"
  ],
  "female-quran-teacher-classes": [
    "Tailored according to student's goal (Qaida, Tajweed, or Hifz)",
    "Special sessions on Fiqh of Taharah and Salah for sisters",
    "Flexible timings accommodating household and working schedules",
    "Safe, private one-on-one virtual classroom environment"
  ],
  "daily-salah-masnoon-dua-course": [
    "Step-by-step physical postures of Salah with verbal recitations",
    "Correction of Surah Al-Fatiha, Tashahhud, and Durood-e-Ibrahim",
    "40 Essential Rabbana Duas from the Holy Quran",
    "Method of Janaza (Funeral) prayer and Eid prayers"
  ]
};

const CourseDetailPage = ({ onDirectRegisterTrigger }) => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Find course from static courses master data (INSTANT LOAD)
  const course = STATIC_COURSES.find(c => {
    const courseSlug = c.slug || c.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
    return courseSlug === slug;
  });

  const cameFromHome = location.state?.from === 'home';

  const handleSmartBack = (e) => {
    e.preventDefault();
    if (cameFromHome) {
      navigate('/#courses-section');
      setTimeout(() => {
        const el = document.getElementById('courses-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      navigate('/courses');
    }
  };

  // Agar course na mile toh clean fallback
  if (!course) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#f8faff]">
        <div className="text-5xl sm:text-6xl mb-4">📖</div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#001f3f] mb-2">Program Not Found</h2>
        <p className="text-slate-500 mb-6 text-sm max-w-md">The course you are looking for might have been updated or moved.</p>
        <Link to="/courses" className="px-6 py-3 bg-[#001f3f] hover:bg-orange-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md">
          Browse All Quran Courses
        </Link>
      </div>
    );
  }

  const syllabusList = COURSE_SYLLABUS_MAP[course.slug] || [
    "Individual 1-on-1 personalized lessons with certified tutor",
    "Accurate pronunciation & Makharij training",
    "Step-by-step Tajweed rule application",
    "Daily revision and memory retention exercises",
    "Islamic manners, basic Duas, and Kalimas included",
    "Monthly performance evaluation reports sent to parents"
  ];

  // 🚀 Dynamic Course Schema (JSON-LD) with Canonical Domain
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.desc,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Al Quran Islamic Institute",
      "url": "https://www.alquranislamic.com"
    },
    "offers": {
      "@type": "Offer",
      "category": "Flexible Subscription",
      "priceCurrency": "USD",
      "description": "Tuition fees depend on weekly class frequency (2, 3, or 5 days/week). 3-day free trial available."
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "courseWorkload": course.duration || "30-40 Mins per session"
    }
  };

  const whatsappMessage = `Assalam-o-Alaikum Al-Quran Institute, I want to book a 3-Day Free Trial for the "${course.title}" course.`;

  return (
    <>
      <SEOEngine 
        title={`${course.title} | Online Quran Classes`}
        description={course.desc}
        canonicalUrl={`https://www.alquranislamic.com/courses/${slug}`}
        keywords={`${course.title.toLowerCase()}, learn ${course.title.toLowerCase()} online, quran tutor 1-on-1`}
        ogImage="https://www.alquranislamic.com/logo.jpeg"
        schemaJson={courseSchema}
      />

      <div className="bg-[#f8faff] min-h-screen py-6 sm:py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Smart Back Navigation Bar */}
          <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
            <button
              type="button"
              onClick={handleSmartBack}
              className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-200 transition-all text-xs font-bold uppercase tracking-wider group cursor-pointer shadow-sm active:scale-95"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" size={10} />
              <span>{cameFromHome ? "Back to Featured Courses" : "Back to All Programs"}</span>
            </button>

            {/* Breadcrumb Trail */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400">
              <Link to="/" className="hover:text-slate-700 flex items-center gap-1">
                <FaHome size={12} /> Home
              </Link>
              <span>/</span>
              <Link to="/courses" className="hover:text-slate-700">
                Programs
              </Link>
              <span>/</span>
              <span className="text-orange-600 font-bold truncate max-w-[200px]">{course.title}</span>
            </div>
          </div>

          {/* Hero Banner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-start">
            
            {/* Main Details (Left 2 Columns) */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${course.color || 'from-orange-500 to-amber-500'}`}></div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                    Level: {course.level || 'All Levels'}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-orange-50 text-orange-600 px-3 py-1 rounded-full">
                    Duration: {course.duration || 'Flexible'}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                    {course.sessionType || '1-on-1 Personalized'}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#001f3f] tracking-tight leading-tight mb-4">
                  {course.title}
                </h1>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {course.desc}
                </p>

                {/* Syllabus Checklist */}
                <div className="border-t border-slate-100 pt-6 mt-6">
                  <h2 className="text-base sm:text-lg font-black text-[#001f3f] mb-4 flex items-center gap-2">
                    <FaBookOpen className="text-orange-500" /> Structured Course Syllabus
                  </h2>
                  <div className="space-y-2.5">
                    {syllabusList.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100/80">
                        <FaCheckCircle className="text-emerald-500 mt-1 shrink-0" size={14} />
                        <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How Classes Work Highlights */}
                <div className="border-t border-slate-100 pt-6 mt-8">
                  <h3 className="text-base sm:text-lg font-black text-[#001f3f] mb-4">Class Features & Quality Standard</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100/60">
                      <FaLaptopHouse className="text-blue-600 text-lg mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-slate-800">1-on-1 Live Video Class</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Private focused sessions via Zoom / Skype.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-orange-50/50 border border-orange-100/60">
                      <FaUserGraduate className="text-orange-600 text-lg mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-slate-800">Certified Male & Female Tutors</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Hafiz-e-Quran and Sanad holder teachers.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Tuition & Booking Card (Right 1 Column) */}
            <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 to-amber-500"></div>

                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tuition & Pricing</div>
                
                <div className="mb-4">
                  <div className="text-xl sm:text-2xl font-black text-[#001f3f] leading-tight">Flexible Monthly Plans</div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Custom schedules based on 2, 3, or 5 days per week.
                  </p>
                </div>

                <Link
                  to="/#fee-section"
                  className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3.5 py-2 rounded-xl transition-colors mb-5"
                >
                  <FaTable size={12} />
                  <span>View Fee Structure →</span>
                </Link>

                <div className="space-y-3 mb-6 border-y border-slate-100 py-4 text-xs font-semibold text-slate-600">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2"><FaClock className="text-orange-500" /> Session Duration</span>
                    <span className="text-[#001f3f] font-bold">30 Mins / Session</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2"><FaSignal className="text-blue-500" /> Level</span>
                    <span className="text-[#001f3f] font-bold">{course.level || 'Beginner'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2"><FaGlobe className="text-teal-500" /> Languages</span>
                    <span className="text-[#001f3f] font-bold">English, Urdu, Arabic</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2"><FaShieldAlt className="text-emerald-500" /> Free Evaluation</span>
                    <span className="text-emerald-600 font-bold">3-Day Free Trial</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {onDirectRegisterTrigger ? (
                    <button
                      type="button"
                      onClick={() => onDirectRegisterTrigger(course.title)}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xs uppercase tracking-widest hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <FaCalendarAlt size={13} /> Book 3-Day Free Trial
                    </button>
                  ) : (
                    <a
                      href={`https://wa.me/923485654503?text=${encodeURIComponent(whatsappMessage)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xs uppercase tracking-widest hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-center"
                    >
                      <FaCalendarAlt size={13} /> Book 3-Day Free Trial
                    </a>
                  )}

                  <a
                    href={`https://wa.me/923485654503?text=${encodeURIComponent(`Assalam-o-Alaikum, I want to know about the schedule for ${course.title}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <FaWhatsapp size={15} /> WhatsApp Inquiry
                  </a>
                </div>

                <p className="text-[10px] sm:text-[11px] text-center text-slate-400 mt-4">
                  No credit card required for 3-day free trial classes.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;