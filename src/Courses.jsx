import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaBookOpen, FaMicrophoneAlt, FaHeart, FaStar, 
  FaLanguage, FaLayerGroup, FaBookReader, FaMoon, FaWhatsapp 
} from 'react-icons/fa';

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

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/courses');
        const arrayData = res.data?.data || res.data;
        if (Array.isArray(arrayData)) {
          setCourses(arrayData);
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.error("Public courses sync error:", err);
        setCourses([]); // Fallback state array allocation safe guard tracking
      } finally {
        setLoading(false);
      }
    };
    fetchPublicCourses();
  }, []);

  if (loading) return <div className="py-12 text-center text-gray-500 font-bold">Loading Quranic Programs Database...</div>;

  // 🚀 FALLBACK: Crash tracking shield logic
  const safeCourses = Array.isArray(courses) ? courses : [];

  return (
    <section className="py-12 bg-gray-50 relative" id="courses-section">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="text-sm font-bold text-orange-600 uppercase tracking-[0.3em] mb-2">Our Specialized Programs</h2>
          <h1 className="text-4xl md:text-5xl font-black text-blue-900 tracking-tight">Explore Our Popular Courses</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-6"></div>
        </div>

        {/* Dynamic Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {safeCourses.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-6">No active programs added to cluster node.</div>
          ) : (
            safeCourses.map((course) => (
              <div key={course._id} className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color || 'from-teal-500 to-teal-700'} text-white flex items-center justify-center text-2xl mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                  {IconDictionary[course.iconKey] || <FaBookOpen />}
                </div>

                <h3 className="text-xl font-bold text-[#001f3f] mb-4 group-hover:text-orange-600 transition-colors">{course.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">{course.desc}</p>

                <button onClick={() => setSelectedCourse(course)} className="mt-auto font-bold text-xs uppercase tracking-widest text-orange-600 hover:text-orange-700 transition-colors border-b border-transparent hover:border-orange-600 py-1">
                  Learn More +
                </button>
                <div className="absolute top-0 right-0 w-12 h-12 bg-gray-50 rounded-bl-full group-hover:bg-orange-50 transition-colors"></div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* --- COURSE DETAIL MODAL --- */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[#001f3f]/90 backdrop-blur-md" onClick={() => setSelectedCourse(null)}></div>
          <div className="bg-white rounded-[2.5rem] max-w-2xl w-full p-8 md:p-12 relative z-[1000] shadow-2xl">
            <button onClick={() => setSelectedCourse(null)} className="absolute top-6 right-6 text-gray-400 hover:text-orange-600 transition-all hover:rotate-90">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${selectedCourse.color} text-white flex items-center justify-center text-4xl mb-8 shadow-xl`}>
              {IconDictionary[selectedCourse.iconKey] || <FaBookOpen />}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#001f3f] mb-4 leading-tight">{selectedCourse.title}</h2>
            <div className="h-1.5 w-16 bg-orange-500 rounded-full mb-8"></div>
            
            {/* 🚀 FIXED TEXT WRAPPING HERE: Added break classes to secure any continuous test strings */}
            <p className="text-gray-600 text-lg leading-relaxed mb-4 font-medium border-l-4 border-gray-100 pl-6 break-all [word-break:break-word] [overflow-wrap:anywhere]">
              {selectedCourse.detail}
            </p>
            
            <div className="mb-8 pl-6 text-sm text-gray-400 font-bold uppercase tracking-wider">Level: {selectedCourse.level} · Duration: {selectedCourse.duration}</div>
            <div className="flex flex-wrap gap-4">
              <a href="https://wa.me/923485654503" target="_blank" rel="noreferrer" className="bg-[#25D366] text-white px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3">
                Enroll Now <FaWhatsapp size={20} />
              </a>
              <button onClick={() => setSelectedCourse(null)} className="bg-gray-100 text-[#001f3f] px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-gray-200 transition-all">Go Back</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Courses;