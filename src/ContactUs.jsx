import React, { useState } from 'react';
import {
  FaWhatsapp, FaEnvelope, FaClock, FaUser, FaChild, FaGift
} from 'react-icons/fa';

import { STATIC_COURSES } from './Courses';

const WHATSAPP_NUMBER = "923485654503";
const WHATSAPP_DISPLAY = "+92 348 5654503";
const CONTACT_EMAIL = "alquranislamicinstitute.48@gmail.com";

const COUNTRIES = [
  "USA", "United Kingdom", "Canada", "Australia", "UAE", "Saudi Arabia",
  "Qatar", "Kuwait", "Ireland", "Germany", "New Zealand", "Malaysia", "Pakistan"
];

// Home page ka contact section. SEO yahan nahi lagta, kyunke ye home page ka hissa hai
// (alag /contact page ka SEO ContactPage.jsx sambhalta hai).
const ContactUs = () => {
  const [form, setForm] = useState({
    name: '', learner: 'child', age: '', course: '', country: '', message: ''
  });
  const [opened, setOpened] = useState(false);

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setOpened(false);
  };

  // Form bharne ke baad WhatsApp khulta hai, message pehle se likha hua. Koi backend nahi.
  const handleSubmit = (e) => {
    e.preventDefault();

    const learnerLine =
      form.learner === 'child'
        ? `Learner: My child${form.age ? ` (age ${form.age})` : ''}`
        : 'Learner: Myself';

    const lines = [
      'Assalam-o-Alaikum Al Quran Islamic Institute,',
      '',
      `Name: ${form.name}`,
      learnerLine,
      `Course: ${form.course || 'Not sure yet'}`,
      `Country: ${form.country}`
    ];
    if (form.message.trim()) lines.push('', `Message: ${form.message.trim()}`);
    lines.push('', 'I would like to book a free trial class.');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpened(true);
  };

  const inputClass =
    "w-full px-3.5 py-3 rounded-xl border border-white/10 bg-white/5 text-[15px] text-white placeholder:text-slate-400 focus:outline-none focus:border-orange-400 focus:bg-white/10 transition-all";
  const labelClass = "block text-[12px] font-bold text-slate-300 mb-1.5";

  const toggleBtn = (value, label, Icon) => {
    const active = form.learner === value;
    return (
      <button
        type="button"
        onClick={() => update('learner', value)}
        aria-pressed={active}
        className={`flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
          active
            ? 'bg-orange-500 text-white border-orange-500 shadow-md'
            : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/25'
        }`}
      >
        <Icon size={14} /> {label}
      </button>
    );
  };

  return (
    <section id="contact-section" className="py-12 sm:py-16 md:py-20 bg-[#001f3f] relative overflow-hidden font-sans">

      {/* Ambient Lights */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
            Book your <span className="text-orange-400 italic">free trial</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Tell us a little about the learner and we will reply on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6 items-start">

          {/* ─── FORM ─── */}
          <div className="lg:col-span-3 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label htmlFor="cu-name" className={labelClass}>Your name</label>
                <input
                  id="cu-name" type="text" required value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="e.g. Ahmed Khan" className={inputClass}
                />
              </div>

              <div>
                <span className={labelClass}>Classes are for</span>
                <div className="flex gap-3">
                  {toggleBtn('child', 'My child', FaChild)}
                  {toggleBtn('self', 'Myself', FaUser)}
                </div>
              </div>

              {form.learner === 'child' && (
                <div>
                  <label htmlFor="cu-age" className={labelClass}>Child's age <span className="font-normal text-slate-500">(optional)</span></label>
                  <input
                    id="cu-age" type="number" min="3" max="17" value={form.age}
                    onChange={(e) => update('age', e.target.value)}
                    placeholder="e.g. 8" className={inputClass}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cu-course" className={labelClass}>Course</label>
                  <select
                    id="cu-course" value={form.course}
                    onChange={(e) => update('course', e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="" className="bg-[#001f3f]">Not sure yet</option>
                    {STATIC_COURSES.map(c => (
                      <option key={c._id} value={c.title} className="bg-[#001f3f]">{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="cu-country" className={labelClass}>Country</label>
                  <input
                    id="cu-country" type="text" required list="cu-country-list" value={form.country}
                    onChange={(e) => update('country', e.target.value)}
                    placeholder="e.g. USA" className={inputClass}
                  />
                  <datalist id="cu-country-list">
                    {COUNTRIES.map(c => <option key={c} value={c} />)}
                  </datalist>
                </div>
              </div>

              <div>
                <label htmlFor="cu-message" className={labelClass}>Message <span className="font-normal text-slate-500">(optional)</span></label>
                <textarea
                  id="cu-message" rows={3} value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Preferred class time, teacher preference, or anything else"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-[15px] font-bold shadow-lg shadow-green-500/20 transition-all active:scale-[0.99]"
              >
                <FaWhatsapp size={20} />
                Continue on WhatsApp
              </button>

              <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                <FaGift className="text-orange-400" /> 3-day free trial · No card needed
              </p>

              {opened && (
                <p role="status" className="text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-400/30 rounded-xl px-3.5 py-2.5">
                  WhatsApp should have opened in a new tab. Press send there to deliver your message. If nothing opened, please allow pop-ups for this site.
                </p>
              )}
            </form>
          </div>

          {/* ─── CONTACT DETAILS ─── */}
          <div className="lg:col-span-2 space-y-3.5">

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Assalam-o-Alaikum, I want to know more about your Quran classes.')}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 p-4 sm:p-5 bg-white/[0.04] border border-white/10 rounded-2xl hover:border-emerald-400/60 hover:bg-emerald-500/10 transition-all"
            >
              <div className="w-12 h-12 bg-emerald-500/15 rounded-xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shrink-0">
                <FaWhatsapp size={22} />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">WhatsApp</div>
                <div className="text-base font-black text-white">{WHATSAPP_DISPLAY}</div>
              </div>
            </a>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group flex items-center gap-4 p-4 sm:p-5 bg-white/[0.04] border border-white/10 rounded-2xl hover:border-orange-400/60 hover:bg-orange-500/10 transition-all"
            >
              <div className="w-12 h-12 bg-orange-500/15 rounded-xl flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all shrink-0">
                <FaEnvelope size={19} />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email</div>
                <div className="text-sm font-black text-white break-all">{CONTACT_EMAIL}</div>
              </div>
            </a>

            <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-500/15 to-amber-500/10 border border-orange-400/25 rounded-2xl">
              <div className="flex items-center gap-2 text-orange-400 text-xs font-bold mb-1">
                <FaClock size={12} /> Flexible time zones
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Morning, afternoon and evening slots for <strong className="text-white">USA, UK, Canada, Australia and Europe</strong>.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;