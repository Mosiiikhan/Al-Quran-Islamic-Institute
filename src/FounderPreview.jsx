import React from 'react';
import { FaLaptopCode, FaArrowRight, FaCode, FaCertificate } from 'react-icons/fa';
import MyPic from './assets/pic.jpeg'; 

const FounderPreview = () => {
  return (
    <section id="founder-preview" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Image with New Animation */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end relative">
            <div className="absolute top-0 left-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-60"></div>
            
            <div className="relative w-full max-w-[320px] aspect-[4/5] group">
              {/* Animated Border Frame */}
              <div className="absolute inset-0 border-2 border-orange-500 rounded-[2.5rem] transition-all duration-500 group-hover:scale-105 group-hover:rotate-0 rotate-3"></div>
              
              {/* Image Container */}
              <div className="relative h-full w-full bg-gray-50 rounded-[2.5rem] overflow-hidden shadow-xl group-hover:shadow-[0_20px_50px_rgba(255,165,0,0.3)] border-4 border-white z-10 transition-all duration-500 group-hover:-translate-y-2">
                <img 
                  src={MyPic} 
                  alt="Founder Mohsin Ishfaq" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" // No grayscale here
                />
                
                {/* Profession Badge */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#001f3f] via-[#001f3f]/40 to-transparent">
                  <p className="text-white font-black text-xl mb-0.5">Mohsin Ishfaq</p>
                  <p className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.2em]">Founder & Developer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-7/12 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
              <FaLaptopCode className="text-blue-600" />
              <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.3em]">Tech Meets Tradition</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-[#001f3f] leading-tight mb-6 tracking-tight">
              Leading with <span className="text-orange-600 font-extrabold italic">Innovation</span> <br className="hidden md:block"/> & Spiritual Excellence
            </h2>

            <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
              "Being a **Computer Science professional**, I have always been fascinated by how technology can simplify complex processes. I founded this academy to merge my technical skills with my passion for the Quran, ensuring every student gets a smart, secure, and world-class learning experience."
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm shrink-0">
                  <FaCertificate size={20} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#001f3f] text-[12px] uppercase tracking-wider">Smart Systems</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Automated Tracking</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                  <FaCode size={20} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#001f3f] text-[12px] uppercase tracking-wider">Digital Academy</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Modern Tech Stack</p>
                </div>
              </div>
            </div>

            {/* Button */}
            <button 
              onClick={() => window.location.href = '/about-owner'}
              className="group flex items-center justify-center gap-4 bg-[#001f3f] text-white px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all hover:bg-orange-600 hover:shadow-2xl active:scale-95 w-full sm:w-auto"
            >
              Explore My Journey <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FounderPreview;