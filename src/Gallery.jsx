import React from 'react';
import { FaPlus, FaCamera, FaVideo } from 'react-icons/fa';

const images = [
  { 
    id: 1, 
    // Quran Open (Tilawat)
    src: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=800&auto=format&fit=crop", 
    category: "Quran Recitation" 
  },
  { 
    id: 2, 
    // Tasbeeh / Dua
    src: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800&auto=format&fit=crop", 
    category: "Spiritual Growth" 
  },
  { 
    id: 3, 
    // NEW IMAGE: Beautiful Mosque Interior / Quranic Art
    // Ye link 100% chalega
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
    <section id="gallery-section" className="py-10 bg-gray-100 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold text-orange-600 uppercase tracking-[0.3em] mb-3 flex items-center justify-center gap-2">
            <FaCamera /> Our Memories
          </h2>
          <h1 className="text-4xl md:text-5xl font-black text-blue-900 tracking-tight">
            Academy Gallery & Highlights
          </h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* --- PART 1: IMAGES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {images.map((img) => (
            <div key={img.id} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-gray-100">
              <img src={img.src} alt={img.category} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#001f3f]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <FaPlus />
                </div>
                <h3 className="text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {img.category}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* --- PART 2: VIDEO SHORTS SECTION --- */}
        <div className="bg-gray-50 rounded-[3rem] p-8 md:p-12 border border-gray-200">
            <div className="text-center mb-12">
                <h2 className="text-2xl font-black text-blue-900 flex items-center justify-center gap-2">
                <FaVideo className="text-red-600 animate-pulse" /> Live Class Moments
                </h2>
                <p className="text-gray-500 text-sm mt-2">Short glimpses of our teaching method.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
                {videoIds.map((id, index) => (
                    <div key={index} className="flex justify-center">
                        <div className="relative w-full max-w-[300px] aspect-[9/16] bg-black rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-gray-800 group hover:scale-105 transition-transform duration-300">
                            <iframe 
                                className="w-full h-full"
                                // UPDATE: Added strict parameters for Sound & Controls
                                src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&controls=1&playsinline=1&mute=0`} 
                                title={`Video Short ${index + 1}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                            ></iframe>
                            
                            <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full animate-pulse shadow-md z-10 pointer-events-none">
                                LIVE
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default Gallery;