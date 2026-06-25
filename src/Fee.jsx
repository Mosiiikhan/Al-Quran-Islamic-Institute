import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaCheck, FaStar, FaLeaf, FaBookOpen, FaCrown, 
  FaGift, FaCalendarAlt, FaCalendarCheck, FaUserEdit, FaWhatsapp
} from 'react-icons/fa';

const IconMap = {
  leaf: <FaLeaf />,
  bookOpen: <FaBookOpen />,
  crown: <FaCrown />,
  star: <FaStar />
};

const FeeStructure = () => {
  const [dbCourses, setDbCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/courses');
        const arrayData = res.data?.data || res.data;
        if (Array.isArray(arrayData)) {
          setDbCourses(arrayData);
        }
      } catch (err) {
        console.error("Pricing sync failure:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPricing();
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin"></div>
        <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">Syncing Pricing Plans...</p>
      </div>
    );
  }

  const cardConfigs = [
    { color: 'sky', iconBg: 'bg-sky-50 text-sky-600', accent: 'from-sky-400 to-sky-600', border: 'border-slate-100' },
    { color: 'orange', iconBg: 'bg-orange-50 text-orange-600', accent: 'from-orange-400 to-orange-600', border: 'border-orange-400' },
    { color: 'purple', iconBg: 'bg-purple-50 text-purple-600', accent: 'from-purple-400 to-purple-600', border: 'border-slate-100' },
  ];

  return (
    <section id="fee-section" className="py-20 bg-[#f8faff] relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-100 rounded-full blur-3xl opacity-20 pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
            <span className="text-orange-500 text-[11px] font-black uppercase tracking-[0.4em]">Pricing Table</span>
            <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-blue-900 tracking-tight leading-tight">
            Simple & <span className="italic">Transparent Plans</span>
          </h1>
          <p className="mt-4 text-slate-500 font-medium text-sm md:text-base max-w-xl mx-auto">
            Affordable Quranic education for every family — no hidden fees, no contracts, cancel anytime.
          </p>
        </div>

        {/* ROW 1: Dynamic Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-start">
          {dbCourses.map((plan, index) => {
            const config = cardConfigs[index] || cardConfigs[0];
            const isPopular = index === 1;

            return (
              <div
                key={plan._id}
                className={`relative bg-white rounded-3xl flex flex-col overflow-hidden border-2 transition-all duration-500 hover:-translate-y-2 ${
                  isPopular
                    ? 'border-orange-400 shadow-2xl shadow-orange-100 md:scale-105 md:z-10'
                    : 'border-slate-100 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Top accent bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${config.accent}`}></div>

                {isPopular && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}

                <div className="p-7 flex flex-col flex-1">

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-5 ${config.iconBg}`}>
                    {IconMap[plan.iconKey] || <FaBookOpen />}
                  </div>

                  {/* Title & Level */}
                  <h3 className="text-xl font-black text-[#001f3f] mb-1">{plan.title}</h3>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-5 italic">{plan.level}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-100">
                    <span className="text-4xl font-black text-[#001f3f]">{plan.price}</span>
                    <span className="text-slate-400 font-bold text-xs">/month</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    <li className="flex items-center gap-2 text-xs font-black text-sky-600 uppercase tracking-wide">
                      <FaCalendarAlt className="shrink-0" />
                      {plan.duration}
                    </li>
                    <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 leading-relaxed">
                      <FaCheck className="text-green-500 text-[10px] mt-1 shrink-0" />
                      <span>{plan.desc}</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm font-semibold text-slate-600">
                      <FaCheck className="text-green-500 text-[10px] mt-1 shrink-0" />
                      <span>1-on-1 Personalized Sessions</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm font-semibold text-slate-600">
                      <FaCheck className="text-green-500 text-[10px] mt-1 shrink-0" />
                      <span>Monthly Progress Report</span>
                    </li>
                  </ul>

                  {/* CTA */}
                  <a
                    href="https://wa.me/923485654503"
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-100 hover:shadow-orange-200 hover:-translate-y-0.5'
                        : 'bg-slate-50 text-[#001f3f] border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Get Started <FaWhatsapp size={13} />
                  </a>

                </div>
              </div>
            );
          })}
        </div>

        {/* ROW 2: Weekend & Custom Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Weekend Card */}
          <div className="group bg-white rounded-3xl p-7 border-2 border-emerald-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-3xl"></div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform duration-300">
                <FaCalendarCheck size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-[#001f3f] font-black text-xl mb-1">Weekend Plan</h3>
                <p className="text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-2">Saturday & Sunday Only</p>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-4">
                  Perfect for busy students and professionals. Intensive weekend sessions tailored to your pace.
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black text-[#001f3f]">
                    $40<span className="text-xs text-slate-400 font-bold">/mo</span>
                  </span>
                  <a
                    href="https://wa.me/923485654503"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-500 text-white px-5 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2"
                  >
                    Enroll Now <FaWhatsapp size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Plan Card */}
          <div className="group bg-[#001f3f] rounded-3xl p-7 border-2 border-dashed border-sky-500/40 shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-t-3xl"></div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                <FaUserEdit size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-black text-xl mb-1">Custom Plan</h3>
                <p className="text-orange-400 font-black text-[10px] uppercase tracking-widest mb-2 animate-pulse">Fully Personalized</p>
                <p className="text-slate-300 text-sm font-medium leading-relaxed mb-4">
                  <span className="text-white font-black">● Any Days</span> (Mon–Sun) &nbsp;
                  <span className="text-white font-black">● Any Timing</span> (24/7 Available)
                </p>
                <a
                  href="https://wa.me/923485654503"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-[#001f3f] px-5 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all inline-flex items-center gap-2"
                >
                  Let's Design It <FaWhatsapp size={12} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ROW 3: Family Discount Banner */}
        <div className="bg-gradient-to-r from-orange-50 via-white to-orange-50 border-2 border-orange-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-md border border-orange-100 flex items-center justify-center text-orange-500 shrink-0">
              <FaGift size={26} />
            </div>
            <div>
              <h4 className="text-[#001f3f] font-black text-xl leading-none mb-1">Family Discount</h4>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                Register 2+ Siblings & Save{' '}
                <span className="text-orange-600 font-black">15% FLAT OFF</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white px-8 py-3 rounded-2xl shadow-xl shadow-orange-100 font-black text-2xl italic">
              15% OFF
            </div>
            <a
              href="https://wa.me/923485654503"
              target="_blank"
              rel="noreferrer"
              className="bg-[#001f3f] text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-2 shadow-md"
            >
              Claim Now <FaWhatsapp size={13} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeeStructure;