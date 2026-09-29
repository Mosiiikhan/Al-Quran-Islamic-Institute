import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBookOpen, FaArrowRight, FaCalendarCheck, 
  FaSearch, FaArrowLeft, FaHome 
} from 'react-icons/fa';

import SEOEngine from "./SEO/SEOEngine";
import { STATIC_COURSES, IconDictionary, generateSlug } from './Courses';

const filterTabs = [
  { id: 'All', label: 'All Programs (10)' },
  { id: 'Beginner', label: 'Beginners (Kids & Qaida)' },
  { id: 'Intermediate', label: 'Intermediate (Tajweed/Arabic)' },
  { id: 'Advanced', label: 'Advanced (Hifz/Qiraat)' },
  { id: 'All Levels', label: 'All Levels / Sisters' },
];

const catalogSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Online Quran Courses & Educational Programs",
  "description": "Comprehensive list of online Quranic and Islamic courses offered by Al Quran Islamic Institute.",
  "url": "https://www.alquranislamic.com/courses"
};

const CoursesPage = ({ onDirectRegisterTrigger }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 100% Static filtering
  const filteredCourses = STATIC_COURSES.filter((course) => {
    const matchesTab = activeTab === 'All' || course.level === activeTab;
    const matchesSearch = 
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.desc?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <>
      <SEOEngine 
        title="All Online Quran Courses & Programs | Al Quran Islamic Institute"
        description="Browse all 10 certified online Quran courses including Noorani Qaida, Tajweed, Hifz, Tarteel, Islamic Studies, and female tutors worldwide."
        canonicalUrl="https://www.alquranislamic.com/courses"
        keywords="online quran courses, noorani qaida classes, tajweed online, hifz academy, female quran tutor online"
        schemaJson={catalogSchema}
      />

      <div className="bg-[#f8faff] min-h-screen pt-4 pb-12 sm:pt-6 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ─── Compact Top Bar: Navigation + Attractive Single Line ─── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <Link
              to="/#courses-section"
              className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-200 transition-all text-xs font-bold uppercase tracking-wider group shadow-sm active:scale-95"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" size={10} />
              <span>Back to Home</span>
            </Link>

            {/* Single Attractive Headline (Direct & Engaging) */}
            <div className="text-left sm:text-right">
              <h1 className="text-lg sm:text-2xl font-black text-[#001f3f] tracking-tight">
                Our Quran Programs <span className="text-orange-600 font-semibold text-xs sm:text-sm block sm:inline sm:ml-2 font-normal italic">Empowering Hearts with Sacred Knowledge</span>
              </h1>
            </div>
          </div>

          {/* ─── Tight Search & Filter Strip (No Extra Spacing) ─── */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programs..."
                className="w-full pl-9 pr-8 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-800"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear Search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Tabs Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              {filterTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-blue-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

          </div>

          {/* ─── Courses Grid (Immediately Visible) ─── */}
          {filteredCourses.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-200 max-w-sm mx-auto my-6">
              <div className="text-3xl mb-2">🔍</div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">No Matching Courses Found</h3>
              <p className="text-slate-500 text-xs mb-3">Try adjusting your search query.</p>
              <button
                onClick={() => { setActiveTab('All'); setSearchQuery(''); }}
                className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase hover:bg-orange-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredCourses.map((course) => {
                const courseSlug = course.slug || generateSlug(course.title);

                return (
                  <div
                    key={course._id}
                    className="group relative bg-white rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1.5 transition-all duration-300 border border-slate-100 flex flex-col overflow-hidden"
                  >
                    {/* Top Accent Strip */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${course.color || 'from-teal-400 to-teal-600'}`}></div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-slate-50 rounded-bl-[2rem] group-hover:bg-orange-50 transition-colors"></div>

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${course.color || 'from-teal-500 to-teal-700'} text-white flex items-center justify-center text-lg mb-4 group-hover:scale-105 transition-transform duration-300 shadow-md`}>
                      {IconDictionary[course.iconKey] || <FaBookOpen />}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-black text-[#001f3f] mb-2 group-hover:text-orange-600 transition-colors leading-snug">
                      {course.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 flex-1 font-normal">
                      {course.desc}
                    </p>

                    {/* Meta Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {course.level && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full">
                          {course.level}
                        </span>
                      )}
                      {course.duration && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-orange-50 text-orange-600 px-2.5 py-0.5 rounded-full">
                          {course.duration}
                        </span>
                      )}
                      <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full">
                        {course.sessionType || "1-on-1 Classes"}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto space-y-2 pt-2 border-t border-slate-100">
                      <Link
                        to={`/courses/${courseSlug}`}
                        state={{ from: 'catalog' }}
                        className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-wider hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2 active:scale-95"
                      >
                        View Syllabus <FaArrowRight size={10} />
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
          )}

        </div>
      </div>
    </>
  );
};

export default CoursesPage;