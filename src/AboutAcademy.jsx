import React from 'react';
import { FaGlobe, FaUserCheck, FaAward, FaLaptopCode, FaClock, FaStar } from 'react-icons/fa';

const AboutAcademy = () => {
  // Enhanced Card Style: Glassy, Clean, and Professional
  const cardStyle = "group relative p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-2xl hover:shadow-sky-100 hover:-translate-y-2 overflow-hidden";
  
  const iconStyle = "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-md";

  return (
    <section id="about-academy" className="py-20 bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.05),transparent_40%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 1. CENTERED HEADING: CLEAN & BOLD */}
        <div className="text-center max-w-3xl mx-auto mb-5">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
            <span className="text-orange-500  text-[11px] font-black uppercase tracking-[0.4em]">Who We Are</span>
            <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-blue-900 leading-tight tracking-tight">
            About
            <span className="text-blue-900 italic"> Academy</span>
          </h1>
    <div className="mt-6 space-y-6">

  
  <p className="text-slate-600 font-medium leading-relaxed text-base md:text-lg">
    <span className="text-orange-600 font-extrabold">Al Quran Islamic Institute</span> is more than just an educational platform; 
    it is a structured ecosystem where we don't just teach—we meticulously track every student's progress. 
    Our mission is to provide global Muslim families with <span className="text-[#001f3f] font-bold">1-on-1 personalized classes</span> 
    and <span className="text-[#001f3f] font-bold">Expert Tajweed guidance</span> tailored to their busy lifestyles, 
    ensuring they master the Holy Quran with perfect pronunciation from the comfort of their homes.
  </p>
</div>
        </div>

        {/* 2. SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE: THE CLEAR ATTRACTIVE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 order-2 lg:order-1">
            
            {/* Global Reach */}
            <div className={cardStyle}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:bg-sky-100 transition-colors"></div>
              <div className={`${iconStyle} bg-sky-500 text-white`}>
                <FaGlobe size={24} />
              </div>
              <h4 className="font-black text-[#001f3f] text-xl mb-3 italic">Global Presence</h4>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">
                Trusted by families across USA, UK, Canada, and UAE with 100% satisfaction.
              </p>
            </div>

            {/* Expert Tutors */}
            <div className={cardStyle}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:bg-orange-100 transition-colors"></div>
              <div className={`${iconStyle} bg-orange-500 text-white`}>
                <FaUserCheck size={24} />
              </div>
              <h4 className="font-black text-[#001f3f] text-xl mb-3 italic">Certified Staff</h4>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">
                Male & Female Sanad-holder tutors providing personalized 1-on-1 guidance.
              </p>
            </div>

            {/* Flexibility */}
            <div className={cardStyle}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:bg-indigo-100 transition-colors"></div>
              <div className={`${iconStyle} bg-indigo-600 text-white`}>
                <FaClock size={24} />
              </div>
              <h4 className="font-black text-[#001f3f] text-xl mb-3 italic">Always Available</h4>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">
                24/7 flexible scheduling tailored perfectly to your local global time zone.
              </p>
            </div>

            {/* Tech-Managed */}
            <div className={cardStyle}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:bg-slate-100 transition-colors"></div>
              <div className={`${iconStyle} bg-slate-800 text-white`}>
                <FaLaptopCode size={24} />
              </div>
              <h4 className="font-black text-[#001f3f] text-xl mb-3 italic">Structured Flow</h4>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">
                Advanced tracking and monthly progress reports for every single student.
              </p>
            </div>

          </div>

          {/* RIGHT SIDE: PREMIUM VIDEO PLAYER (NO BOTTOM CARD) */}
          <div className="order-1 lg:order-2 flex flex-col items-center">
            <div className="relative w-full">
              {/* Outer Glow Overlay */}
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
              
              {/* Simple Legend Text under video instead of a bulky card */}
              <div className="mt-8 flex items-center justify-center gap-6">
                <div className="text-center">
                  {/* <p className="text-2xl font-black text-[#001f3f]">4+</p> */}
                  {/* <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Years Experience</p> */}
                </div>
                <div className="h-8 w-[1px] bg-slate-200"></div>
                <div className="text-center">
                  {/* <p className="text-2xl font-black text-sky-500">500+</p> */}
                  {/* <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Students</p> */}
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