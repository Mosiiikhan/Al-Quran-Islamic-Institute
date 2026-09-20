import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaCheckCircle, FaClock, FaSignal, 
  FaGlobe, FaWhatsapp, FaShieldAlt, FaArrowLeft, FaCalendarAlt, FaHome, FaTable
} from 'react-icons/fa';

import SEOEngine from '../SEO/SEOEngine';

const CourseDetailPage = ({ onDirectRegisterTrigger }) => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // 🎯 User kahan se aaya hai? Homepage ke courses se ya Catalog page se?
  const cameFromHome = location.state?.from === 'home';

  // 🎯 Back button ka action
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

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const res = await axios.get(`${API_BASE}/api/admin/courses`);
        const courses = res.data?.data || res.data || [];
        
        const matched = courses.find(c => {
          const courseSlug = c.slug || c.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
          return courseSlug === slug;
        });

        if (matched) {
          setCourse(matched);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Course detail fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [slug, API_BASE]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#f8faff]">
        <div className="w-12 h-12 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin"></div>
        <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">Loading Curriculum...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-[#f8faff]">
        <div className="text-6xl mb-4">📖</div>
        <h2 className="text-2xl font-black text-blue-900 mb-2">Program Not Found</h2>
        <p className="text-slate-500 mb-6 text-sm">The course you are looking for might have been moved or updated.</p>
        <Link to="/courses" className="px-6 py-3 bg-blue-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider">
          Browse All Courses
        </Link>
      </div>
    );
  }

  // 🚀 Dynamic Course Schema (JSON-LD) with Flexible Pricing Structure
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.desc,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Al Quran Islamic Institute",
      "url": "https://alquranislamicinstitute.com"
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

  return (
    <>
      {/* 🚀 Dynamic Course Metadata & JSON-LD Injection */}
      <SEOEngine 
        title={`${course.title} | Online Quran Classes`}
        description={course.desc}
        canonicalUrl={`https://alquranislamicinstitute.com/courses/${slug}`}
        keywords={`${course.title.toLowerCase()}, learn ${course.title.toLowerCase()} online, quran tutor 1-on-1`}
        ogImage="https://alquranislamicinstitute.com/logo.jpeg"
        schemaJson={courseSchema}
      />

      <div className="bg-[#f8faff] min-h-screen py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Smart Back Navigation Bar */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <button
              type="button"
              onClick={handleSmartBack}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-200 hover:shadow-md transition-all duration-200 text-xs font-bold uppercase tracking-wider group cursor-pointer"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" size={11} />
              <span>{cameFromHome ? "Back to Featured Courses" : "Back to All Programs"}</span>
            </button>

            {/* Breadcrumb Trail */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400">
              <Link to="/#courses-section" className="hover:text-slate-700 flex items-center gap-1">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            
            {/* Main Details (Left 2 Columns) */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[11px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-full">
                    {course.level || 'All Levels'}
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-wider bg-orange-50 text-orange-600 px-3.5 py-1.5 rounded-full">
                    {course.duration || 'Flexible Timings'}
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full">
                    1-on-1 Personalized
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-[#001f3f] tracking-tight leading-tight mb-4">
                  {course.title}
                </h1>

                <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6 font-normal">
                  {course.desc}
                </p>

                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3">About This Program</h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {course.detail || course.desc}
                  </p>
                </div>

                {/* Learning Outcomes Checklist */}
                <div className="border-t border-slate-100 pt-8 mt-8">
                  <h3 className="text-lg font-black text-[#001f3f] mb-4">What Students Will Learn</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      "Accurate pronunciation & Makharij training",
                      "Step-by-step Tajweed rule application",
                      "Daily revision and memory retention exercises",
                      "Islamic manners, basic Duas, and Kalimas",
                      "Female tutors available for sisters and kids",
                      "Monthly performance evaluation reports"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-slate-600 text-sm">
                        <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={15} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Tuition & Booking Card (Right 1 Column) */}
            <div className="lg:col-span-1 sticky top-24 space-y-6">
              <div className="bg-white rounded-3xl p-7 shadow-lg border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 to-amber-500"></div>

                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tuition & Pricing</div>
                
                <div className="mb-4">
                  <div className="text-2xl font-black text-[#001f3f] leading-tight">Flexible Monthly Plans</div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Fees are based on class frequency (2, 3, or 5 days per week).
                  </p>
                </div>

                <Link
                  to="/#pricing-section"
                  className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3.5 py-2 rounded-xl transition-colors mb-5"
                >
                  <FaTable size={12} />
                  <span>View Complete Fee Structure →</span>
                </Link>

                <div className="space-y-3 mb-6 border-y border-slate-100 py-4 text-xs font-semibold text-slate-600">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2"><FaClock className="text-orange-500" /> Session Duration</span>
                    <span className="text-[#001f3f] font-bold">{course.duration || '30-40 Mins'}</span>
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
                  <button
                    type="button"
                    onClick={() => onDirectRegisterTrigger && onDirectRegisterTrigger(course.title)}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-orange-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FaCalendarAlt size={14} /> Book 3-Day Free Trial
                  </button>

                  <a
                    href={`https://wa.me/923485654503?text=${encodeURIComponent(`Assalam-o-Alaikum, I want to know about the fee structure and schedule for ${course.title}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 rounded-2xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp size={16} /> WhatsApp Inquiry
                  </a>
                </div>

                <p className="text-[11px] text-center text-slate-400 mt-4">
                  No credit card required for the 3-day trial classes.
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