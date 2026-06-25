import React from 'react';
import { FaLaptopCode, FaBookOpen, FaGlobe, FaCheckCircle, FaWhatsapp, FaLinkedin, FaQuoteLeft } from 'react-icons/fa';
import MyPic from './assets/pic.jpeg'; 

const features = [
  { icon: <FaBookOpen />, text: "Passionate Educator", sub: "Heart of the Academy", bg: "bg-orange-50", color: "text-orange-500", border: "hover:border-orange-200" },
  { icon: <FaGlobe />, text: "Global Visionary", sub: "Serving 50+ Countries", bg: "bg-sky-50", color: "text-sky-500", border: "hover:border-sky-200" },
  { icon: <FaCheckCircle />, text: "Quality Assurance", sub: "Zero Compromise", bg: "bg-emerald-50", color: "text-emerald-500", border: "hover:border-emerald-200" },
  { icon: <FaLaptopCode />, text: "Tech Integrated", sub: "Modern Learning Stack", bg: "bg-purple-50", color: "text-purple-500", border: "hover:border-purple-200" },
];

const AboutOwner = () => {
  return (
    <section id="about-owner" className="py-20 bg-[#f8faff] relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-25 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-100 rounded-full blur-3xl opacity-25 pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
            <span className="text-orange-500 text-[11px] font-black uppercase tracking-[0.4em]">Meet Our Leadership</span>
            <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-blue-900 tracking-tight leading-tight">
            About the <span className="italic">Owner</span>
          </h2>
          <p className="mt-4 text-slate-500 font-medium text-base md:text-lg max-w-2xl mx-auto italic">
            "Driven by Passion, Defined by Technology, Dedicated to the Quran."
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* LEFT: Image */}
          <div className="w-full lg:w-5/12 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] group">

              {/* Glow */}
              <div className="absolute -inset-3 bg-gradient-to-br from-orange-200 to-sky-200 rounded-[3rem] blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

              {/* Rotating border */}
              <div className="absolute inset-0 border-2 border-orange-400 rounded-[2.5rem] rotate-3 group-hover:rotate-0 transition-all duration-500"></div>

              {/* Image */}
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white shadow-2xl border-4 border-white z-10 transition-all duration-500 group-hover:-translate-y-2">
                <img
                  src={MyPic}
                  alt="Mohsin Ishfaq"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Bottom overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#001f3f] via-[#001f3f]/50 to-transparent">
                  <h3 className="text-white font-black text-xl mb-0.5">Mohsin Ishfaq</h3>
                  <p className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.25em]">Founder & Lead Software Engineer</p>
                </div>
              </div>

              {/* Floating tech badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 z-20 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                  <FaLaptopCode size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-[#001f3f] uppercase tracking-wider">CS Engineer</p>
                  <p className="text-[8px] text-slate-400 font-bold uppercase">Tech + Quran</p>
                </div>
              </div>

              {/* Floating stats badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 z-20">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Students Served</p>
                <p className="text-lg font-black text-[#001f3f]">5000+ <span className="text-orange-500">🌍</span></p>
              </div>

            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="w-full lg:w-7/12 text-center lg:text-left">

            {/* Eyebrow */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-5">
              <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
              <span className="text-orange-500 text-[11px] font-black uppercase tracking-[0.4em]">Innovation & Tradition</span>
              <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
            </div>

            {/* Heading */}
            <h3 className="text-3xl md:text-5xl font-black leading-tight text-[#001f3f] mb-6">
              I am <span className="text-orange-500 italic">Mohsin Ishfaq</span>,<br />
              Your Partner in <span className="text-sky-600">Spiritual Growth.</span>
            </h3>

            {/* Quote block */}
            <div className="relative bg-white rounded-3xl p-6 border-l-4 border-orange-400 shadow-md mb-8 text-left">
              <FaQuoteLeft className="text-orange-200 text-3xl absolute top-4 right-4" />
              <p className="text-slate-600 text-base font-medium leading-relaxed">
                As a <span className="text-[#001f3f] font-black">Computer Science professional</span>, my mission is to provide a seamless, interactive, and high-quality Quranic learning experience for students worldwide — through the power of{' '}
                <span className="text-[#001f3f] font-black">software engineering and Islamic values</span>.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">
              {features.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-5 bg-white rounded-3xl border-2 border-slate-100 ${item.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} text-xl shrink-0`}>
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="font-black text-[#001f3f] text-sm">{item.text}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="https://wa.me/923485654503"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none bg-[#25D366] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg hover:-translate-y-1 hover:shadow-green-200 transition-all flex items-center justify-center gap-3"
              >
                <FaWhatsapp size={18} /> Chat with Mohsin
              </a>
              <a
                href="https://www.linkedin.com/in/mohsin-ishfaq-2226b6299"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none bg-[#001f3f] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg hover:-translate-y-1 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
              >
                <FaLinkedin size={18} /> LinkedIn Profile
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOwner;