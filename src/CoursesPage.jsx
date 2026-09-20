import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  FaBookOpen, FaMicrophoneAlt, FaHeart, FaStar, 
  FaLanguage, FaLayerGroup, FaBookReader, FaMoon, 
  FaArrowRight, FaCalendarCheck, FaSearch, FaArrowLeft, FaHome
} from 'react-icons/fa';

import SEOEngine from '../SEO/SEOEngine';

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

const generateSlug = (title = '') => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const filterTabs = [
  { id: 'All', label: 'All Programs' },
  { id: 'Beginner', label: 'Beginners (Kids/Qaida)' },
  { id: 'Intermediate', label: 'Intermediate (Nazra/Tajweed)' },
  { id: 'Advanced', label: 'Advanced (Hifz/Tafseer)' },
  { id: 'All Levels', label: 'All Levels / General' },
];

const catalogSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Online Quran Courses & Educational Programs",
  "description": "Comprehensive list of online Quranic and Islamic courses offered with certified native tutors.",
  "url": "https://alquranislamicinstitute.com/courses"
};

const CoursesPage = ({ onDirectRegisterTrigger }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/admin/courses`);
        const arrayData = res.data?.data || res.data;
        if (Array.isArray(arrayData)) {
          setCourses(arrayData);
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.error("Courses catalog sync error:", err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCourses();
  }, [API_BASE]);

  const filteredCourses = courses.filter((course) => {
    const matchesTab = activeTab === 'All' || course.level === activeTab;
    const matchesSearch = 
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.desc?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <>
      {/* 🚀 Dynamic Courses Catalog SEO & ItemList Schema Injection */}
      <SEOEngine 
        title="Online Quran Courses & Programs | Al Quran Islamic Institute"
        description="Explore 1-on-1 online Quran classes including Noorani Qaida, Tajweed, Quran Memorization (Hifz), and Islamic Studies for kids, sisters, and adults."
        canonicalUrl="https://alquranislamicinstitute.com/courses"
        keywords="online quran courses, learn tajweed online, noorani qaida classes, hifz program online, female quran tutor"
        ogImage="https://alquranislamicinstitute.com/logo.jpeg"
        schemaJson={catalogSchema}
      />

      <div className="bg-[#f8faff] min-h-screen py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* ─── Back to Homepage Navigation Bar ──────────────── */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              to="/#courses-section"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-200 hover:shadow-md transition-all duration-200 text-xs font-bold uppercase tracking-wider group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" size={11} />
              <span>Back to Home</span>
            </Link>

            {/* Breadcrumb Trail */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400">
              <Link to="/#courses-section" className="hover:text-slate-700 flex items-center gap-1">
                <FaHome size={12} /> Home
              </Link>
              <span>/</span>
              <span className="text-orange-600 font-bold">All Programs</span>
            </div>
          </div>

          {/* ─── Page Hero Header ─────────────────────────────── */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-[2px] w-8 bg-orange-500 rounded-full"></span>
              <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em]">
                Online Quran Academy Catalog
              </span>
              <span className="h-[2px] w-8 bg-orange-500 rounded-full"></span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-[#001f3f] tracking-tight leading-tight mb-4">
              Structured Online <span className="text-orange-600 italic">Quran Programs</span>
            </h1>

            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              Choose from our specialized individual 1-on-1 programs designed for kids, adults, and sisters worldwide with certified native tutors.
            </p>
          </div>

          {/* ─── Search & Level Filter Controls ────────────────── */}
          <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100 mb-10 space-y-5">
            
            {/* Search Input */}
            <div className="relative max-w-md mx-auto">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programs by title or topic..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs md:text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-800"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap pt-2 border-t border-slate-100">
              {filterTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

          </div>

          {/* ─── Courses Catalog Grid ─────────────────────────── */}
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin"></div>
              <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">Loading Programs...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-slate-200 max-w-lg mx-auto">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">No Matching Courses Found</h3>
              <p className="text-slate-500 text-xs mb-4">Try clearing your search query or selecting a different level filter.</p>
              <button
                onClick={() => { setActiveTab('All'); setSearchQuery(''); }}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => {
                const courseSlug = course.slug || generateSlug(course.title);

                return (
                  <div
                    key={course._id}
                    className="group relative bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl hover:shadow-blue-100/60 hover:-translate-y-1.5 transition-all duration-300 border border-slate-100 flex flex-col overflow-hidden"
                  >
                    {/* Top Gradient Strip */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${course.color || 'from-teal-400 to-teal-600'}`}></div>

                    {/* Corner Visual Pill */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-[3rem] group-hover:bg-orange-50 transition-colors"></div>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color || 'from-teal-500 to-teal-700'} text-white flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      {IconDictionary[course.iconKey] || <FaBookOpen />}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black text-[#001f3f] mb-3 group-hover:text-orange-600 transition-colors leading-snug">
                      {course.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                      {course.desc}
                    </p>

                    {/* Badges / Meta Info (Removed hardcoded price badge) */}
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
                      <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                        1-on-1 Sessions
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto space-y-2 pt-2 border-t border-slate-50">
                      <Link
                        to={`/courses/${courseSlug}`}
                        state={{ from: 'catalog' }}
                        className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-wider hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        View Syllabus <FaArrowRight size={11} />
                      </Link>

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
              })}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default CoursesPage;