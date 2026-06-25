import React from 'react';
import { FaLaptopCode, FaArrowRight, FaCode, FaCertificate, FaQuoteLeft } from 'react-icons/fa';
import MyPic from './assets/pic.jpeg'; 

const FounderPreview = () => {
  return (
    <section id="founder-preview" className="py-20 bg-[#f8faff] relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-25 pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-100 rounded-full blur-3xl opacity-25 pointer-events-none translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* LEFT: Image */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] group">

              {/* Rotating border frame */}
              <div className="absolute inset-0 border-2 border-orange-400 rounded-[2.5rem] rotate-3 group-hover:rotate-0 transition-all duration-500"></div>

              {/* Glow behind image */}
              <div className="absolute -inset-2 bg-gradient-to-br from-orange-200 to-sky-200 rounded-[3rem] blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

              {/* Image card */}
              <div className="relative h-full w-full bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white z-10 transition-all duration-500 group-hover:-translate-y-2 aspect-[4/5]">
                <img
                  src={MyPic}
                  alt="Founder Mohsin Ishfaq"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#001f3f] via-[#001f3f]/50 to-transparent">
                  <p className="text-white font-black text-xl mb-0.5">Mohsin Ishfaq</p>
                  <p className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.25em]">Founder & Lead Developer</p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 z-20 flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
                  <FaLaptopCode size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-[#001f3f] uppercase tracking-wider">CS Professional</p>
                  <p className="text-[8px] text-slate-400 font-bold uppercase">Tech + Quran</p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="w-full lg:w-7/12 text-center lg:text-left">

            {/* Eyebrow */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-5">
              <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
              <span className="text-orange-500 text-[11px] font-black uppercase tracking-[0.4em]">Meet the Founder</span>
              <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-black text-[#001f3f] leading-tight mb-6 tracking-tight">
              Leading with{' '}
              <span className="text-orange-500 italic">Innovation</span>
              <br className="hidden md:block" />
              & Spiritual Excellence
            </h2>

            {/* Quote */}
            <div className="relative bg-white rounded-3xl p-6 border-l-4 border-orange-400 shadow-md mb-8 text-left">
              <FaQuoteLeft className="text-orange-200 text-3xl absolute top-4 right-4" />
              <p className="text-slate-600 text-base font-medium leading-relaxed">
                Being a <span className="text-[#001f3f] font-black">Computer Science professional</span>, I have always been fascinated by how technology can simplify complex processes. I founded this academy to merge my technical skills with my passion for the Quran, ensuring every student gets a{' '}
                <span className="text-[#001f3f] font-black">smart, secure, and world-class</span> learning experience.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">

              <div className="group/card flex items-center gap-4 p-5 bg-white rounded-3xl border-2 border-slate-100 hover:border-orange-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 shrink-0 group-hover/card:scale-110 transition-transform duration-300">
                  <FaCertificate size={20} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#001f3f] text-sm">Smart Systems</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Automated Tracking</p>
                </div>
              </div>

              <div className="group/card flex items-center gap-4 p-5 bg-white rounded-3xl border-2 border-slate-100 hover:border-sky-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 shrink-0 group-hover/card:scale-110 transition-transform duration-300">
                  <FaCode size={20} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#001f3f] text-sm">Digital Academy</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Modern Tech Stack</p>
                </div>
              </div>

            </div>

            {/* CTA Button */}
            <button
              onClick={() => window.location.href = '/about-owner'}
              className="group inline-flex items-center justify-center gap-3 bg-[#001f3f] text-white px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all duration-300 hover:bg-orange-500 hover:shadow-2xl hover:shadow-orange-100 hover:-translate-y-1 active:scale-95 w-full sm:w-auto"
            >
              Explore My Journey
              <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderPreview;