import React from 'react';
import { FaLaptopCode, FaBookOpen, FaGlobe, FaCheckCircle, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

// Your specified details
import MyPic from './assets/pic.jpeg'; 

const AboutOwner = () => {
  return (
    // Section ID remains exactly 'about-owner' for navbar scrolling
    <section id="about-owner" className="py-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- 1. SECTION HEADING --- */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
            <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-[11px]">Meet Our Leadership</span>
            <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-blue-900 tracking-tight">
            About the <span className="text-blue-900">Owner</span>
          </h2>
          <p className="mt-2 text-gray-500 font-medium text-lg max-w-2xl mx-auto italic">
            "Driven by Passion, Defined by Technology, Dedicated to the Quran."
          </p>
        </div>

        {/* --- 2. INTEGRATED CONTENT AREA --- */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Side with Hover Effects */}
          <div className="w-full lg:w-5/12 flex justify-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-200/30 rounded-full blur-[100px]"></div>
            
            <div className="relative group w-full max-w-[380px]">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white p-3 shadow-2xl transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-orange-100/50">
                <div className="h-full w-full rounded-[2rem] overflow-hidden">
                  <img 
                    src={MyPic} 
                    alt="Mohsin Ishfaq" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                
                {/* Floating Name Overlay */}
                <div className="absolute bottom-8 left-8 right-8 bg-[#001f3f]/95 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl">
                  <h3 className="text-white font-black text-2xl tracking-tight">Mohsin Ishfaq</h3>
                  <p className="text-orange-400 font-bold text-[10px] uppercase tracking-widest mt-1">Founder & Lead Software Engineer</p>
                </div>
              </div>

              {/* Decorative Tech Accent */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
                <FaLaptopCode size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* Text Side with Scroll Animations Style */}
          <div className="w-full lg:w-7/12">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-2 hover:bg-blue-100 transition-colors cursor-default">
                <FaLaptopCode className="text-blue-600" />
                <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Innovation & Tradition</span>
              </div>
              
              <h3 className="text-3xl md:text-5xl font-black leading-tight text-[#001f3f]">
                I am <span className="text-orange-600">Mohsin Ishfaq</span>, <br /> 
                Your Partner in Spiritual Growth.
              </h3>

              <p className="text-gray-600 text-lg font-medium leading-relaxed border-l-4 border-orange-500 pl-6 py-2">
                 As a **Computer Science professional**, my mission is to provide a seamless, interactive, and high-quality Quranic learning experience for students worldwide through the power of software engineering.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <FaBookOpen />, text: "Passionate Educator", color: "orange" },
                  { icon: <FaGlobe />, text: "Global Visionary", color: "blue" },
                  { icon: <FaCheckCircle />, text: "Quality Assurance", color: "green" },
                  { icon: <FaLaptopCode />, text: "Tech Integrated", color: "purple" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                    <span className={`text-${item.color}-500 text-xl`}>{item.icon}</span>
                    <span className="font-bold text-[#001f3f] text-sm uppercase tracking-wide">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-5 pt-4">
                <a href="https://wa.me/923485654503" className="bg-[#25D366] text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3">
                  <FaWhatsapp size={20} /> Chat with Mohsin
                </a>
                <a href="https://www.linkedin.com/in/mohsin-ishfaq-2226b6299?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="bg-[#001f3f] text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3 border border-white/10">
                  <FaLinkedin size={18} /> LinkedIn Profile
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutOwner;