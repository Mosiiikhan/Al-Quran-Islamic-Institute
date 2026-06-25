import React from 'react';
import { FaGlobe, FaUserCheck, FaAward, FaLaptopCode, FaClock, FaStar } from 'react-icons/fa';

const AboutAcademy = () => {
  return (
    <section id="about-academy" className="py-20 bg-gradient-to-b from-[#f0f4ff] to-[#e8f0fe] relative overflow-hidden">
      
      {/* Background Decorative Circles */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-sky-100 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADING */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
            <span className="text-orange-500 text-[11px] font-black uppercase tracking-[0.4em]">Who We Are</span>
            <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-blue-900 leading-tight tracking-tight">
            About
            <span className="text-blue-900 italic"> Academy</span>
          </h1>
          <div className="mt-6">
            <p className="text-slate-600 font-medium leading-relaxed text-base md:text-lg">
              <span className="text-orange-600 font-extrabold">Al Quran Islamic Institute</span> was founded 
              with one sacred purpose — to make the words of Allah ﷻ accessible to every Muslim family across the globe. 
              We understand the challenge Muslim parents face in finding a qualified, trustworthy Quran teacher — 
              especially in the <span className="text-[#001f3f] font-bold">USA, UK, Canada, Australia</span> and 
              beyond, wherever you are in the world. Our certified tutors — all 
              <span className="text-[#001f3f] font-bold"> Hafiz-e-Quran with Ijazah</span> — deliver 
              <span className="text-[#001f3f] font-bold"> 1-on-1 personalized sessions</span> covering 
              <span className="text-[#001f3f] font-bold">Tajweed, Tarteel, Hifz and Nazra</span>, 
              carefully tracked and tailored to your schedule. No matter where you live, 
              <span className="text-orange-600 font-extrabold"> Al Quran Islamic Institute</span> is your 
              trusted partner — because every Muslim deserves to recite the Quran the way our beloved Prophet ﷺ taught us.
            </p>
          </div>
        </div>

        {/* SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 order-2 lg:order-1">
            
            {/* Global Presence */}
            <div className="group relative p-7 rounded-3xl bg-white border-l-4 border-sky-400 shadow-lg hover:shadow-sky-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-sky-50 rounded-bl-[4rem] -mr-6 -mt-6 group-hover:bg-sky-100 transition-colors"></div>
              <div className="w-14 h-14 rounded-2xl bg-sky-500 flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-500">
                <FaGlobe size={22} className="text-white" />
              </div>
              <h4 className="font-black text-[#001f3f] text-lg mb-2">Global Presence</h4>
              <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                Trusted by families across USA, UK, Canada, and UAE with 100% satisfaction.
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-sky-400 group-hover:w-full transition-all duration-500 rounded-b-3xl"></div>
            </div>

            {/* Certified Staff */}
            <div className="group relative p-7 rounded-3xl bg-white border-l-4 border-orange-400 shadow-lg hover:shadow-orange-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-bl-[4rem] -mr-6 -mt-6 group-hover:bg-orange-100 transition-colors"></div>
              <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-500">
                <FaUserCheck size={22} className="text-white" />
              </div>
              <h4 className="font-black text-[#001f3f] text-lg mb-2">Certified Staff</h4>
              <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                Male & Female Sanad-holder tutors providing personalized 1-on-1 guidance.
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-orange-400 group-hover:w-full transition-all duration-500 rounded-b-3xl"></div>
            </div>

            {/* Always Available */}
            <div className="group relative p-7 rounded-3xl bg-white border-l-4 border-indigo-400 shadow-lg hover:shadow-indigo-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50 rounded-bl-[4rem] -mr-6 -mt-6 group-hover:bg-indigo-100 transition-colors"></div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-500">
                <FaClock size={22} className="text-white" />
              </div>
              <h4 className="font-black text-[#001f3f] text-lg mb-2">Always Available</h4>
              <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                24/7 flexible scheduling tailored perfectly to your local global time zone.
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-indigo-400 group-hover:w-full transition-all duration-500 rounded-b-3xl"></div>
            </div>

            {/* Structured Flow */}
            <div className="group relative p-7 rounded-3xl bg-white border-l-4 border-emerald-400 shadow-lg hover:shadow-emerald-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-bl-[4rem] -mr-6 -mt-6 group-hover:bg-emerald-100 transition-colors"></div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-500">
                <FaLaptopCode size={22} className="text-white" />
              </div>
              <h4 className="font-black text-[#001f3f] text-lg mb-2">Structured Flow</h4>
              <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                Advanced tracking and monthly progress reports for every single student.
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-emerald-400 group-hover:w-full transition-all duration-500 rounded-b-3xl"></div>
            </div>

          </div>

          {/* RIGHT: VIDEO */}
          <div className="order-1 lg:order-2 flex flex-col items-center">
            <div className="relative w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-[3.5rem] blur opacity-20"></div>
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white bg-[#001f3f]">
                <div className="aspect-video relative">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/3TTrmyRBrPU" 
                    title="Academy Intro Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutAcademy;