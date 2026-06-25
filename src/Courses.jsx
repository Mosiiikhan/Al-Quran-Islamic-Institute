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
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicCourses();
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin"></div>
        <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">Loading Programs...</p>
      </div>
    );
  }

  const safeCourses = Array.isArray(courses) ? courses : [];

  return (
    <section className="py-20 bg-[#f8faff] relative overflow-hidden" id="courses-section">

      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30 pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-sky-100 rounded-full blur-3xl opacity-30 pointer-events-none translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
            <span className="text-orange-500 text-[11px] font-black uppercase tracking-[0.4em]">Our Specialized Programs</span>
            <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-blue-900 tracking-tight leading-tight">
            Explore Our <span className="italic">Popular Courses</span>
          </h1>
          <p className="mt-4 text-slate-500 font-medium text-sm md:text-base max-w-xl mx-auto">
            Structured Quranic programs designed for all ages — from complete beginners to advanced learners across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safeCourses.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12 font-semibold">
              No active programs found.
            </div>
          ) : (
            safeCourses.map((course) => (
              <div
                key={course._id}
                className="group relative bg-white rounded-3xl p-7 shadow-md hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2 transition-all duration-500 border border-slate-100 flex flex-col overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${course.color || 'from-teal-400 to-teal-600'} rounded-t-3xl`}></div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-[3rem] group-hover:bg-orange-50 transition-colors"></div>

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color || 'from-teal-500 to-teal-700'} text-white flex items-center justify-center text-xl mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg`}>
                  {IconDictionary[course.iconKey] || <FaBookOpen />}
                </div>

                <h3 className="text-lg font-black text-[#001f3f] mb-3 group-hover:text-orange-600 transition-colors leading-snug">
                  {course.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {course.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
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
                </div>

                <button
                  onClick={() => setSelectedCourse(course)}
                  className="mt-auto w-full py-3 rounded-2xl bg-gradient-to-r from-[#001f3f] to-[#003366] text-white text-xs font-black uppercase tracking-widest hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-orange-200"
                >
                  Learn More →
                </button>
              </div>
            ))
          )}
        </div>

      </div>

      {selectedCourse && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-[#001f3f]/80 backdrop-blur-md"
            onClick={() => setSelectedCourse(null)}
          ></div>

          <div className="bg-white rounded-[2rem] max-w-2xl w-full p-8 md:p-10 relative z-[1000] shadow-2xl max-h-[90vh] overflow-y-auto">

            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-orange-100 hover:text-orange-600 text-slate-400 flex items-center justify-center transition-all hover:rotate-90 duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${selectedCourse.color || 'from-teal-400 to-teal-600'} rounded-t-[2rem]`}></div>

            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedCourse.color || 'from-teal-500 to-teal-700'} text-white flex items-center justify-center text-3xl mb-6 shadow-xl`}>
              {IconDictionary[selectedCourse.iconKey] || <FaBookOpen />}
            </div>

            <h2 className="text-3xl font-black text-[#001f3f] mb-2 leading-tight">
              {selectedCourse.title}
            </h2>
            <div className="h-1 w-12 bg-orange-500 rounded-full mb-6"></div>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCourse.level && (
                <span className="text-xs font-black uppercase tracking-wider bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full">
                  {selectedCourse.level}
                </span>
              )}
              {selectedCourse.duration && (
                <span className="text-xs font-black uppercase tracking-wider bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full">
                  {selectedCourse.duration}
                </span>
              )}
            </div>

            <p className="text-slate-600 text-base leading-relaxed mb-8 font-medium border-l-4 border-orange-200 pl-5 break-words">
              {selectedCourse.detail}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/923485654503"
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[140px] bg-[#25D366] text-white px-6 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg hover:-translate-y-1 hover:shadow-green-200 transition-all flex items-center justify-center gap-2"
              >
                Enroll Now <FaWhatsapp size={18} />
              </a>
              <button
                onClick={() => setSelectedCourse(null)}
                className="flex-1 min-w-[140px] bg-slate-100 text-[#001f3f] px-6 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-slate-200 transition-all"
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