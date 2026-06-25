import React from 'react';
import { FaPlus, FaCamera, FaVideo, FaPlay } from 'react-icons/fa';

const images = [
  { 
    id: 1, 
    src: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=800&auto=format&fit=crop", 
    category: "Quran Recitation" 
  },
  { 
    id: 2, 
    src: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800&auto=format&fit=crop", 
    category: "Spiritual Growth" 
  },
  { 
    id: 3, 
    src: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=800&auto=format&fit=crop", 
    category: "Islamic Environment" 
  },
];

const Gallery = () => {
  const videoIds = [
    "iQMm7VAUTn0", 
    "ZV4XibUqb-Q", 
    "lVQ14qHE1VY"  
  ];

  return (
    <section id="gallery-section" className="py-20 bg-[#f8faff] relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-25 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-100 rounded-full blur-3xl opacity-25 pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
            <span className="text-orange-500 text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-2">
              <FaCamera size={10} /> Our Memories
            </span>
            <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-blue-900 tracking-tight leading-tight">
            Academy <span className="italic">Gallery & Highlights</span>
          </h1>
          <p className="mt-4 text-slate-500 font-medium text-sm md:text-base max-w-xl mx-auto">
            A glimpse into our learning environment, live sessions, and the spiritual journey we share together.
          </p>
        </div>

        {/* PART 1: Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden cursor-pointer shadow-lg border-2 border-white hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2 transition-all duration-500"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 z-10 rounded-t-3xl"></div>

              <img
                src={img.src}
                alt={img.category}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#001f3f]/90 via-[#001f3f]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-end pb-8 text-white">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                  <FaPlus size={14} />
                </div>
                <h3 className="text-lg font-black translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 tracking-wide">
                  {img.category}
                </h3>
              </div>

              {/* Category badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#001f3f] text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                {img.category}
              </div>
            </div>
          ))}
        </div>

        {/* PART 2: Video Section */}
        <div className="relative bg-[#001f3f] rounded-[2.5rem] p-8 md:p-12 overflow-hidden">

          {/* Inner background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Video section header */}
          <div className="text-center mb-12 relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-[2px] w-8 bg-orange-400 rounded-full"></span>
              <span className="text-orange-400 text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-2">
                <FaVideo size={10} className="animate-pulse" /> Live Class Moments
              </span>
              <span className="h-[2px] w-8 bg-orange-400 rounded-full"></span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
              See How We <span className="text-orange-400 italic">Teach & Connect</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2 font-medium">
              Short glimpses of our authentic Quranic teaching method.
            </p>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center relative z-10">
            {videoIds.map((id, index) => (
              <div key={index} className="w-full max-w-[280px]">
                <div className="relative w-full aspect-[9/16] bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 group hover:scale-105 hover:border-orange-400/50 transition-all duration-400">

                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&controls=1&playsinline=1&mute=0`}
                    title={`Class Highlight ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>

                  {/* LIVE badge */}
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full animate-pulse shadow-md z-10 pointer-events-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full inline-block"></span>
                    LIVE
                  </div>

                  {/* Video number */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-black px-2.5 py-1 rounded-full z-10 pointer-events-none">
                    #{index + 1}
                  </div>

                </div>

                {/* Label under video */}
                <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest mt-3">
                  Class Highlight {index + 1}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Gallery;