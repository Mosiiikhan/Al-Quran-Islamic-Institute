import React from 'react';
import { 
  FaCheck, FaStar, FaLeaf, FaBookOpen, FaCrown, 
  FaGift, FaArrowRight, FaCalendarAlt, FaCalendarCheck, FaUserEdit 
} from 'react-icons/fa';

const FeeStructure = () => {
  const plans = [
    {
      id: 1,
      name: "Starter",
      price: "$35",
      focus: "Qaida & Basics",
      frequency: "3-5 Days/Week",
      icon: <FaLeaf />,
      color: "blue",
      features: ["Arabic Alphabets", "Makharij Basics", "Daily Duas", "Progress Tracking"]
    },
    {
      id: 2,
      name: "Standard",
      price: "$50",
      focus: "Reading & Hifz",
      frequency: "3-5 Days/Week",
      icon: <FaBookOpen />,
      color: "orange",
      popular: true,
      features: ["Fluent Recitation", "Tajweed Rules", "Selected Surahs", "Weekly Tests"]
    },
    {
      id: 3,
      name: "Premium",
      price: "$80",
      focus: "Translation/Tafseer",
      frequency: "3-5 Days/Week",
      icon: <FaCrown />,
      color: "purple",
      features: ["Deep Understanding", "Arabic Grammar", "Islamic History", "Senior Tutors"]
    }
  ];

  return (
    <section id="fee-section" className="py-10 ">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-orange-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2">Pricing Table</h2>
          <h1 className="text-3xl md:text-5xl font-black text-blue-900">Our <span className="text-blue-900">Plans</span></h1>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* --- ROW 1: 3 MAIN CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan) => (
            <div key={plan.id} className={`bg-white rounded-[2.5rem] p-8 border-2 transition-all duration-300 hover:-translate-y-2 flex flex-col ${plan.popular ? 'border-orange-500 shadow-xl scale-105 z-10' : 'border-gray-100 shadow-sm'}`}>
              <div className="flex justify-between items-center mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${plan.color === 'blue' ? 'bg-blue-50 text-blue-600' : plan.color === 'orange' ? 'bg-orange-50 text-orange-600' : 'bg-purple-50 text-purple-600'}`}>
                  {plan.icon}
                </div>
                {plan.popular && <span className="bg-orange-500 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">Popular</span>}
              </div>

              <h3 className="text-2xl font-black text-[#001f3f] mb-1">{plan.name}</h3>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-4 italic">{plan.focus}</p>
              
              <div className="flex items-baseline gap-1 mb-6 border-b border-gray-50 pb-6">
                <span className="text-4xl font-black text-[#001f3f]">{plan.price}</span>
                <span className="text-gray-400 font-bold text-xs">/mo</span>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase italic">
                   <FaCalendarAlt /> {plan.frequency}
                </li>
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                    <FaCheck className="text-green-500 text-[10px]" /> {f}
                  </li>
                ))}
              </ul>

              <a href="https://wa.me/923485654503" className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest text-center transition-all ${plan.popular ? 'bg-orange-600 text-white shadow-lg shadow-orange-100' : 'bg-gray-50 text-[#001f3f] border border-gray-100 hover:bg-gray-100'}`}>
                Get Started
              </a>
            </div>
          ))}
        </div>

        {/* --- ROW 2: WEEKEND & CUSTOM (2 CARDS) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          
          {/* Weekend Card */}
          <div className="bg-white rounded-[2.5rem] p-8 border-2 border-green-100 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-green-600 shrink-0">
               <FaCalendarCheck size={40} />
            </div>
            <div className="text-center md:text-left flex-grow">
               <h3 className="text-[#001f3f] font-black text-2xl leading-none mb-2">Weekend Plan</h3>
               <p className="text-green-600 font-black text-xs uppercase tracking-widest mb-3">Saturday & Sunday Only</p>
               <p className="text-gray-500 text-sm font-medium leading-relaxed mb-4">Perfect for busy students and professionals. Dedicated intensive weekend sessions.</p>
               <div className="flex items-center justify-center md:justify-start gap-4">
                  <span className="text-2xl font-black text-[#001f3f]">$40<span className="text-xs text-gray-400">/mo</span></span>
                  <a href="https://wa.me/923485654503" className="text-green-600 font-black text-xs uppercase border-b-2 border-green-600 pb-0.5">Enroll Now</a>
               </div>
            </div>
          </div>

          {/* Custom Plan Card - Detailed Definition */}
          <div className="bg-[#001f3f] rounded-[2.5rem] p-8 border-2 border-dashed border-blue-400 shadow-2xl flex flex-col md:flex-row items-center gap-6 group">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
               <FaUserEdit size={40} />
            </div>
            <div className="text-center md:text-left flex-grow">
               <h3 className="text-white font-black text-2xl leading-none mb-2">Custom Plan</h3>
               <p className="text-orange-400 font-black text-[10px] uppercase tracking-[0.2em] mb-3 animate-pulse italic">Fully Personalized</p>
               <p className="text-gray-300 text-[13px] font-medium leading-relaxed mb-4">
                 Your schedule, your rules. <br />
                 <span className="text-white font-black">● Choose Any Days</span> (Mon-Sun) <br />
                 <span className="text-white font-black">● Choose Any Timing</span> (24/7 Availability)
               </p>
               <a href="https://wa.me/923485654503" className="bg-white text-[#001f3f] px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all">Let's Design It</a>
            </div>
          </div>
        </div>

        {/* --- FAMILY DISCOUNT --- */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-orange-50 to-white border border-orange-100 rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                <FaGift size={28} />
              </div>
              <div>
                <h4 className="text-[#001f3f] font-black text-xl leading-none">Family Discount</h4>
                <p className="text-gray-500 text-[10px] font-bold mt-2 uppercase tracking-widest">Register 2+ Siblings & Save <span className="text-orange-600 font-black">15% FLAT OFF</span></p>
              </div>
            </div>
            <div className="bg-orange-600 text-white px-8 py-3 rounded-2xl shadow-xl shadow-orange-100 font-black text-2xl italic">15% OFF</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeeStructure;