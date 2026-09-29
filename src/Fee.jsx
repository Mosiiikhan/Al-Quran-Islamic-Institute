import React, { useState } from 'react';
import { FaWhatsapp, FaStar, FaClock, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

// ─── MASTER STATIC PRICING PLANS ──────────────────────────────────────────
const STATIC_PLANS = [
  {
    _id: '2',
    title: '3 Days / Week',
    badge: 'Best value',
    badgeColor: 'bg-orange-500 text-white',
    schedule: 'Mon, Wed, Fri (Or Any 3 Days)',
    classesPerMonth: 12,
    priceUSD30: 30,
    priceGBP30: 25,
    priceUSD45: 40,
    priceGBP45: 30,
    isPopular: false
  },
  {
    _id: '3',
    title: '5 Days / Week',
    badge: 'Most Popular',
    badgeColor: 'bg-emerald-600 text-white',
    schedule: 'Monday to Friday',
    classesPerMonth: 20,
    priceUSD30: 50,
    priceGBP30: 40,
    priceUSD45: 60,
    priceGBP45: 48,
    isPopular: true
  },
  {
    _id: '4',
    title: 'Weekend Classes',
    badge: 'Saturday & Sunday',
    badgeColor: 'bg-blue-600 text-white',
    schedule: 'Saturday & Sunday Only',
    classesPerMonth: 8,
    priceUSD30: 30,
    priceGBP30: 24,
    priceUSD45: 40,
    priceGBP45: 32,
    isPopular: false
  },
  {
    _id: '1',
    title: '2 Days / Week',
    badge: 'Flexible',
    badgeColor: 'bg-slate-700 text-white',
    schedule: 'Any 2 Days (Mon - Fri)',
    classesPerMonth: 8,
    priceUSD30: 25,
    priceGBP30: 20,
    priceUSD45: 35,
    priceGBP45: 28,
    isPopular: false
  }
];

const FeeStructure = () => {
  const [currency, setCurrency] = useState('USD'); // 'USD' | 'GBP'
  const [duration, setDuration] = useState('30');   // '30' | '45'

  const WHATSAPP = '923485654503';
  const currSymbol = currency === 'USD' ? '$' : '£';

  // 🎯 Instant price resolution based on user toggles
  const getPrice = (item) => {
    if (duration === '30') {
      return currency === 'USD' ? item.priceUSD30 : item.priceGBP30;
    } else {
      return currency === 'USD' ? item.priceUSD45 : item.priceGBP45;
    }
  };

  const trialLink = (item) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
      `Assalam-o-Alaikum Al-Quran Institute, I want to book a 3-Day Free Trial for the "${item.title}" plan (${duration} Mins/Class, ${currSymbol}${getPrice(item)}/month).`
    )}`;

  return (
    <section id="fee-section" className="py-12 sm:py-16 md:py-24 bg-[#f8faff] font-sans relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-orange-100/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-sky-100/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ─── HEADER ─── */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="h-[2px] w-6 sm:w-8 bg-orange-500 rounded-full"></span>
            <span className="text-orange-500 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em]">
              Affordable Quran Tutoring
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-orange-500 rounded-full"></span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#001f3f] tracking-tight mb-2 sm:mb-3">
            Tuition Fee Plans
          </h2>
          <p className="text-slate-600 text-xs sm:text-base font-medium">
            3-Day Free Trial • Free Admission • Cancel or Pause Anytime
          </p>

          {/* ─── SWITCHERS: CURRENCY & TIME ─── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6">
            
            {/* Currency Switcher */}
            <div className="inline-flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 ${
                  currency === 'USD'
                    ? 'bg-[#001f3f] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇺🇸 USD ($)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('GBP')}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 ${
                  currency === 'GBP'
                    ? 'bg-[#001f3f] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇬🇧 GBP (£)
              </button>
            </div>

            {/* Duration Switcher (30 Mins vs 45 Mins) */}
            <div className="inline-flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => setDuration('30')}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                  duration === '30'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FaClock size={12} /> 30 Mins / Class
              </button>
              <button
                type="button"
                onClick={() => setDuration('45')}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                  duration === '45'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FaClock size={12} /> 45 Mins / Class
              </button>
            </div>

          </div>
        </div>

        {/* ─── DESKTOP TABLE VIEW ─── */}
        <div className="hidden md:block bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm mb-10">
          <div className="grid grid-cols-12 bg-[#001f3f] text-white px-8 py-5 text-xs font-bold uppercase tracking-wider">
            <div className="col-span-4">Plan / Weekly Days</div>
            <div className="col-span-2 text-center">Class Duration</div>
            <div className="col-span-2 text-center">Monthly Sessions</div>
            <div className="col-span-2 text-center">Monthly Tuition</div>
            <div className="col-span-2 text-right">Free Trial</div>
          </div>

          <div className="divide-y divide-slate-100">
            {STATIC_PLANS.map((item) => {
              const price = getPrice(item);
              return (
                <div
                  key={item._id}
                  className={`grid grid-cols-12 items-center px-8 py-6 transition-colors ${
                    item.isPopular ? 'bg-orange-50/30' : 'hover:bg-slate-50/70'
                  }`}
                >
                  {/* 1. Title & Schedule */}
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-[#001f3f]">{item.title}</span>
                      {item.badge && (
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-slate-500 mt-1">{item.schedule}</div>
                  </div>

                  {/* 2. Duration Column */}
                  <div className="col-span-2 text-center">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-xl text-xs font-bold">
                      <FaClock size={11} className="text-emerald-600" />
                      {duration} Mins
                    </span>
                  </div>

                  {/* 3. Monthly Classes */}
                  <div className="col-span-2 text-center">
                    <span className="text-base font-bold text-slate-800">
                      {item.classesPerMonth} Classes
                    </span>
                    <div className="text-[11px] text-slate-400 font-medium">per month</div>
                  </div>

                  {/* 4. Monthly Fee */}
                  <div className="col-span-2 text-center">
                    <span className="text-3xl font-black text-[#001f3f]">
                      {currSymbol}{price}
                    </span>
                    <span className="text-xs font-bold text-slate-400 block">/ month</span>
                  </div>

                  {/* 5. CTA Button */}
                  <div className="col-span-2 text-right">
                    <a
                      href={trialLink(item)}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 ${
                        item.isPopular
                          ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20'
                          : 'bg-[#001f3f] hover:bg-orange-600 text-white'
                      }`}
                    >
                      Book Trial <FaWhatsapp size={15} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── MOBILE STACKED CARDS VIEW ─── */}
        <div className="md:hidden space-y-3.5 mb-8">
          {STATIC_PLANS.map((item) => {
            const price = getPrice(item);
            return (
              <div
                key={item._id}
                className={`bg-white rounded-2xl border p-5 shadow-sm transition-all ${
                  item.isPopular ? 'border-orange-500 bg-orange-50/20 shadow-orange-100' : 'border-slate-200'
                }`}
              >
                {/* Title & Badge */}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-base font-black text-[#001f3f]">{item.title}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="text-xs font-medium text-slate-500 mb-3">{item.schedule}</div>

                {/* Info & Price Row */}
                <div className="flex items-center justify-between border-y border-slate-100 py-2.5 mb-4">
                  <div>
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md text-[11px] font-bold mb-1">
                      <FaClock size={9} /> {duration} Mins / Class
                    </span>
                    <div className="text-[11px] font-bold text-slate-500">
                      {item.classesPerMonth} Classes per month
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#001f3f]">
                      {currSymbol}{price}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold block">/ month</span>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <a
                  href={trialLink(item)}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-sm active:scale-95 transition-all ${
                    item.isPopular ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#001f3f] hover:bg-orange-600'
                  }`}
                >
                  Book 3-Day Free Trial <FaWhatsapp size={15} />
                </a>
              </div>
            );
          })}
        </div>

        {/* ─── 3 ASSURANCES & FAMILY DISCOUNT ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 border border-slate-200 bg-white rounded-2xl p-5 sm:p-6 text-center shadow-sm">
          <div>
            <div className="text-orange-600 font-black text-base sm:text-lg flex items-center justify-center gap-1.5">
              <FaCheckCircle size={15} /> 3-Day Free Trial
            </div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Take trial classes before paying tuition</div>
          </div>
          <div className="border-y md:border-y-0 md:border-x border-slate-200 py-3 md:py-0">
            <div className="text-[#001f3f] font-black text-base sm:text-lg flex items-center justify-center gap-1.5">
              <FaStar size={14} className="text-amber-500" /> Free Admission
            </div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Zero registration or hidden setup charges</div>
          </div>
          <div>
            <div className="text-emerald-600 font-black text-base sm:text-lg flex items-center justify-center gap-1.5">
              <FaShieldAlt size={14} /> 10% Family Discount
            </div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">For 2 or more siblings enrolling together</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeeStructure;