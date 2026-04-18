import React, { useState } from 'react';
import { 
  FaBookOpen, FaMicrophoneAlt, FaHeart, FaStar, 
  FaLanguage, FaLayerGroup, FaQuoteLeft, FaPray, FaBookReader, FaMoon, FaWhatsapp 
} from 'react-icons/fa';

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const allCourses = [
    {
      title: "Noorani/Madni Qaida",
      desc: "Perfect foundation for kids and beginners to learn Arabic alphabets and basic pronunciation.",
      detail: "This course is the gateway to Quranic literacy. We utilize a step-by-step methodology focusing on 'Makharij' (articulation points) and correct phonetics. Our certified tutors ensure that beginners build a rock-solid foundation in identifying letters and joining them according to primary Tajweed rules.",
      icon: <FaBookOpen />,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Quran Reading",
      desc: "Fluent recitation of the Holy Quran with basic Tajweed rules for students of all ages.",
      detail: "Designed for students who have completed the basic Qaida. This program focuses on developing fluency in recitation. We emphasize 'Tarteel' (rhythmic recitation) while ensuring the student applies fundamental Tajweed rules naturally throughout the session to gain confidence in reading longer verses.",
      icon: <FaBookReader />,
      color: "from-teal-500 to-teal-700"
    },
    {
      title: "Tajweed-ul-Quran",
      desc: "Learn to recite the Holy Quran with proper rules and beautiful accent (Makharij).",
      detail: "Tajweed is an art that beautifies your recitation. Our professional instructors teach advanced rules including Ikhfa, Idgham, Qalqala, and Meem Sakin. We provide personalized feedback on every breath and stop, helping you achieve an accent similar to renowned Arab Qaris.",
      icon: <FaMicrophoneAlt />,
      color: "from-orange-500 to-orange-700"
    },
    {
      title: "Quran Memorization",
      desc: "Guided Hifz program with experienced tutors to help you memorize Quran step by step.",
      detail: "Our Hifz program follows a proven structure of 'Sabaq' (New Lesson), 'Sabqi' (Recent Revision), and 'Manzil' (Old Revision). We provide customized schedules based on the student's pace, ensuring the Holy Quran is etched into the heart permanently through consistent daily evaluation.",
      icon: <FaStar />,
      color: "from-[#001f3f] to-[#003366]"
    },
    {
      title: "Quran Translation",
      desc: "Understand the divine message of Allah with word-by-word translation and meaning.",
      detail: "This course bridges the gap between recitation and comprehension. We offer word-by-word literal translation along with the contextual meaning (Lughwi & Istalahi). Our goal is to help you understand the message of Allah so you can connect deeply during your daily prayers.",
      icon: <FaLanguage />,
      color: "from-purple-600 to-indigo-800"
    },
    {
      title: "Tafseer-ul-Quran",
      desc: "Deep dive into the context and explanation of Quranic verses for better spiritual growth.",
      detail: "Go beyond simple translation. This course covers 'Shan-e-Nuzool' (context of revelation) and in-depth explanations of Surahs. Our scholars explain the practical application of Quranic wisdom in modern life, helping students develop a comprehensive Islamic worldview.",
      icon: <FaLayerGroup />,
      color: "from-amber-600 to-red-800"
    },
    {
      title: "Daily Masnoon Azkar",
      desc: "Morning & Evening supplications, protection Duas, and Sunnah prayers for daily life.",
      detail: "Spiritual protection is essential for every Muslim. We teach authentic supplications from the Sunnah for daily protection, morning/evening rituals, and various life events. Our tutors help students memorize these Duas with their meanings for spiritual mindfulness.",
      icon: <FaMoon />,
      color: "from-indigo-500 to-blue-800"
    },
    {
      title: "Islamic Studies",
      desc: "Essential Islamic knowledge, including Duas, Salah, and stories of the Prophets.",
      detail: "A comprehensive curriculum covering the Pillars of Islam, Seerah of Prophet Muhammad (PBUH), Islamic history, and jurisprudence (Fiqh). We focus on character building (Akhlaq) to nurture practicing Muslims with strong moral values.",
      icon: <FaHeart />,
      color: "from-emerald-600 to-teal-800"
    }
  ];

  return (
    <section className="py-12 bg-gray-50 relative" id="courses-section">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="text-sm font-bold text-orange-600 uppercase tracking-[0.3em] mb-2">
            Our Specialized Programs
          </h2>
          <h1 className="text-4xl md:text-5xl font-black text-blue-900 tracking-tight">
            Explore Our Popular Courses
          </h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-6"></div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allCourses.map((course, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color} text-white flex items-center justify-center text-2xl mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                {course.icon}
              </div>

              <h3 className="text-xl font-bold text-[#001f3f] mb-4 group-hover:text-orange-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                {course.desc}
              </p>

              <button 
                onClick={() => setSelectedCourse(course)}
                className="mt-auto font-bold text-xs uppercase tracking-widest text-orange-600 hover:text-orange-700 transition-colors border-b border-transparent hover:border-orange-600 py-1"
              >
                Learn More +
              </button>

              <div className="absolute top-0 right-0 w-12 h-12 bg-gray-50 rounded-bl-full group-hover:bg-orange-50 transition-colors"></div>
            </div>
          ))}
        </div>
      </div>

      {/* --- COURSE DETAIL MODAL --- */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[#001f3f]/90 backdrop-blur-md" onClick={() => setSelectedCourse(null)}></div>
          
          <div className="bg-white rounded-[2.5rem] max-w-2xl w-full p-8 md:p-12 relative z-[1000] shadow-2xl animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedCourse(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-orange-600 transition-all hover:rotate-90"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${selectedCourse.color} text-white flex items-center justify-center text-4xl mb-8 shadow-xl`}>
              {selectedCourse.icon}
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-[#001f3f] mb-4 leading-tight">
              {selectedCourse.title}
            </h2>
            
            <div className="h-1.5 w-16 bg-orange-500 rounded-full mb-8"></div>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-10 font-medium border-l-4 border-gray-100 pl-6">
              {selectedCourse.detail}
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="https://wa.me/923485654503"
                className="bg-[#25D366] text-white px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3"
              >
                Enroll Now <FaWhatsapp size={20} />
              </a>
              <button 
                onClick={() => setSelectedCourse(null)}
                className="bg-gray-100 text-[#001f3f] px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-gray-200 transition-all"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Courses;