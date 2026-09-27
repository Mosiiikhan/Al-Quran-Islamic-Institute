import React, { useState } from 'react';
import { FaWhatsapp, FaStar, FaClock } from 'react-icons/fa';

// ─── STATIC PRICING PLANS (Zero Backend / Instant Load) ─────────────────────
const STATIC_PLANS = [
  {
    _id: '1',
    title: 'Weekend Classes',
    schedule: 'Saturday & Sunday',
    classesPerMonth: 8,
    priceUSD30: 40,
    priceGBP30: 32,
    priceUSD45: 55,
    priceGBP45: 44,
    isPopular: false
  },
  {
    _id: '2',
    title: '2 Days / Week',
    schedule: 'Any 2 Days (Mon - Fri)',
    classesPerMonth: 8,
    priceUSD30: 36,
    priceGBP30: 29,
    priceUSD45: 50,
    priceGBP45: 40,
    isPopular: false
  },
  {
    _id: '3',
    title: '3 Days / Week',
    schedule: 'Any 3 Days (Mon - Fri)',
    classesPerMonth: 12,
    priceUSD30: 50,
    priceGBP30: 40,
    priceUSD45: 68,
    priceGBP45: 54,
    isPopular: true
  },
  {
    _id: '4',
    title: '5 Days / Week',
    schedule: 'Monday to Friday',
    classesPerMonth: 20,
    priceUSD30: 80,
    priceGBP30: 64,
    priceUSD45: 110,
    priceGBP45: 88,
    isPopular: false
  }
];

const FeeStructure = () => {
  const [currency, setCurrency] = useState('USD'); // 'USD' | 'GBP'
  const [duration, setDuration] = useState('30');   // '30' | '45'

  const WHATSAPP = '923485654503';
  const currSymbol = currency === 'USD' ? '$' : '£';

  // 🎯 Dynamic price resolution according to both duration and currency toggles
  const getPrice = (item) => {
    if (duration === '30') {
      return currency === 'USD' ? item.priceUSD30 : item.priceGBP30;
    } else {
      return currency === 'USD' ? item.priceUSD45 : item.priceGBP45;
    }
  };

  const trialLink = (item) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
      `Assalam-o-Alaikum, I want to book a 3-Day Free Trial for ${item.title} (${duration} Mins/Class, ${currSymbol}${getPrice(item)}/month).`
    )}`;

  return (
    <section id="fee-section" className="py-16 md:py-24 bg-[#f8faff] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ─── HEADER ─── */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#001f3f] tracking-tight mb-3">
            Tuition Fee Plans
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            3-Day Free Trial • Free Admission • No Hidden Charges
          </p>

          {/* ─── DUAL SWITCHER: CURRENCY & CLASS TIME ─── */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-7">
            
            {/* Currency Toggle */}
            <div className="inline-flex items-center bg-white p-1 rounded-2xl border-2 border-slate-200 shadow-sm">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
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
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  currency === 'GBP'
                    ? 'bg-[#001f3f] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇬🇧 GBP (£)
              </button>
            </div>

            {/* Duration Toggle (30 Mins vs 45 Mins) */}
            <div className="inline-flex items-center bg-white p-1 rounded-2xl border-2 border-slate-200 shadow-sm">
              <button
                type="button"
                onClick={() => setDuration('30')}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                  duration === '30'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FaClock size={13} /> 30 Mins / Class
              </button>
              <button
                type="button"
                onClick={() => setDuration('45')}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                  duration === '45'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FaClock size={13} /> 45 Mins / Class
              </button>
            </div>

          </div>
        </div>

        {/* ─── DESKTOP TABLE VIEW ─── */}
        <div className="hidden md:block bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm mb-10">
          <div className="grid grid-cols-12 bg-[#001f3f] text-white px-8 py-5 text-sm font-bold uppercase tracking-wider">
            <div className="col-span-4">Plan / Days</div>
            <div className="col-span-2 text-center">Class Time</div>
            <div className="col-span-2 text-center">Monthly Classes</div>
            <div className="col-span-2 text-center">Monthly Fee</div>
            <div className="col-span-2 text-right">Free Trial</div>
          </div>

          <div className="divide-y-2 divide-slate-100">
            {STATIC_PLANS.map((item) => {
              const price = getPrice(item);
              return (
                <div
                  key={item._id}
                  className={`grid grid-cols-12 items-center px-8 py-6 transition-colors ${
                    item.isPopular ? 'bg-orange-50/40' : 'hover:bg-slate-50/70'
                  }`}
                >
                  {/* 1. Title & Schedule */}
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-[#001f3f]">{item.title}</span>
                      {item.isPopular && (
                        <span className="bg-orange-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <FaStar size={9} /> Popular
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-slate-500 mt-1">{item.schedule}</div>
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
                    <span className="text-lg font-bold text-slate-800">
                      {item.classesPerMonth} Classes
                    </span>
                    <div className="text-xs text-slate-400 font-medium mt-0.5">per month</div>
                  </div>

                  {/* 4. Monthly Fee */}
                  <div className="col-span-2 text-center">
                    <span className="text-4xl font-black text-[#001f3f]">
                      {currSymbol}{price}
                    </span>
                    <span className="text-xs font-bold text-slate-400 block mt-0.5">/ month</span>
                  </div>

                  {/* 5. CTA Button */}
                  <div className="col-span-2 text-right">
                    <a
                      href={trialLink(item)}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-sm ${
                        item.isPopular
                          ? 'bg-orange-500 hover:bg-orange-600 text-white'
                          : 'bg-[#001f3f] hover:bg-orange-600 text-white'
                      }`}
                    >
                      Book Trial <FaWhatsapp size={16} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── MOBILE STACKED BOXES VIEW ─── */}
        <div className="md:hidden space-y-4 mb-10">
          {STATIC_PLANS.map((item) => {
            const price = getPrice(item);
            return (
              <div
                key={item._id}
                className={`bg-white rounded-2xl border-2 p-6 shadow-sm ${
                  item.isPopular ? 'border-orange-500 bg-orange-50/20' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xl font-black text-[#001f3f]">{item.title}</span>
                  {item.isPopular && (
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                <div className="text-sm font-medium text-slate-500 mb-4">{item.schedule}</div>

                <div className="flex items-center justify-between border-y-2 border-slate-100 py-3 mb-5">
                  <div>
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-lg text-xs font-bold mb-1">
                      <FaClock size={10} /> {duration} Mins Class
                    </span>
                    <div className="text-xs font-bold text-slate-500">
                      {item.classesPerMonth} Classes / Month
                    </div>
                  </div>
                  <div className="text-3xl font-black text-[#001f3f]">
                    {currSymbol}{price}
                    <span className="text-xs text-slate-400 font-bold ml-1">/mo</span>
                  </div>
                </div>

                <a
                  href={trialLink(item)}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white shadow-sm ${
                    item.isPopular ? 'bg-orange-500' : 'bg-[#001f3f]'
                  }`}
                >
                  Book 3-Day Free Trial <FaWhatsapp size={16} />
                </a>
              </div>
            );
          })}
        </div>

        {/* ─── 3 CLEAR GUARANTEES ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-2 border-slate-200 bg-white rounded-2xl p-6 text-center shadow-sm">
          <div>
            <div className="text-orange-600 font-black text-lg">3-Day Free Trial</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Take trial classes before paying</div>
          </div>
          <div className="border-y md:border-y-0 md:border-x border-slate-200 py-3 md:py-0">
            <div className="text-[#001f3f] font-black text-lg">Free Admission</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Zero registration fee or setup charges</div>
          </div>
          <div>
            <div className="text-emerald-600 font-black text-lg">No Hidden Charges</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Simple fixed fee • Cancel or pause anytime</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeeStructure;