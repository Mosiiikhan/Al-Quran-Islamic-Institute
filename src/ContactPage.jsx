import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaWhatsapp, FaEnvelope, FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaLinkedinIn,
  FaArrowLeft, FaClock, FaUser, FaChild, FaGift
} from 'react-icons/fa';

import SEOEngine from './SEO/SEOEngine';
import { STATIC_COURSES } from './Courses';

/* ══════════════════════════════════════════════════════════════
   ✏️ YAHAN APNI DETAILS BHARO
   ══════════════════════════════════════════════════════════════ */

// Academy ka email. Khali ("") chhoro to email card nahi dikhega.
const CONTACT_EMAIL = "alquranislamicinstitute.48@gmail.com";

// Profile links. Jis ka link khali ("") hoga wo icon nahi dikhega.
const SOCIALS = [
  { name: "Facebook",  url: "https://www.facebook.com/share/1DQ27HhzLn/", icon: <FaFacebookF />, color: "bg-blue-600" },
  { name: "Instagram", url: "https://www.instagram.com/_al__quran_6?igsh=MWhyMm9sbWpzYmJhbg==", icon: <FaInstagram />, color: "bg-pink-600" },
  { name: "YouTube",   url: "https://youtube.com/@quranic.927?si=7t5k0yOg8Pql56dB", icon: <FaYoutube />, color: "bg-red-600" },
  { name: "TikTok",    url: "https://www.tiktok.com/@quranic.a?_r=1&_t=ZS-93oPmOHesan", icon: <FaTiktok />, color: "bg-black" },
  { name: "LinkedIn",  url: "https://www.linkedin.com/in/sundas-ishfaq-105503298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", icon: <FaLinkedinIn />, color: "bg-sky-700" },
];

const WHATSAPP_NUMBER = "923485654503";
const WHATSAPP_DISPLAY = "+92 348 5654503";
const SITE_URL = "https://www.alquranislamic.com";

const COUNTRIES = [
  "USA", "United Kingdom", "Canada", "Australia", "UAE", "Saudi Arabia",
  "Qatar", "Kuwait", "Ireland", "Germany", "New Zealand", "Malaysia", "Pakistan"
];

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Al Quran Islamic Institute",
  "url": `${SITE_URL}/contact`,
  "mainEntity": {
    "@type": "EducationalOrganization",
    "name": "Al Quran Islamic Institute",
    "url": SITE_URL,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "telephone": `+${WHATSAPP_NUMBER}`,
      "availableLanguage": ["English", "Urdu", "Arabic"]
    }
  }
};

const ContactPage = () => {
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

  const activeSocials = SOCIALS.filter(s => s.url);

  const inputClass =
    "w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-[15px] text-slate-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all";
  const labelClass = "block text-[12px] font-bold text-slate-600 mb-1.5";

  const toggleBtn = (value, label, Icon) => {
    const active = form.learner === value;
    return (
      <button
        type="button"
        onClick={() => update('learner', value)}
        aria-pressed={active}
        className={`flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
          active
            ? 'bg-[#001f3f] text-white border-[#001f3f] shadow-md'
            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
        }`}
      >
        <Icon size={14} /> {label}
      </button>
    );
  };

  return (
    <>
      <SEOEngine
        title="Contact Us | Al Quran Islamic Institute"
        description="Contact Al Quran Islamic Institute on WhatsApp to book a free trial class, ask about fees, or choose the right Quran course for yourself or your child."
        canonicalUrl={`${SITE_URL}/contact`}
        keywords="contact quran academy, book free trial quran class, online quran classes inquiry"
        ogImage={`${SITE_URL}/logo.jpeg`}
        schemaJson={contactSchema}
      />

      <section className="bg-[#f8faff] min-h-screen py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-200 transition-all text-xs font-bold group mb-6"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" size={10} />
            Back to Home
          </Link>

          {/* Heading */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-[#001f3f] tracking-tight leading-tight mb-3">
              Book your <span className="text-orange-600 italic">free trial</span>
            </h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Tell us a little about the learner and we will reply on WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6 items-start">

            {/* ─── FORM ─── */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-100">
              <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                  <label htmlFor="name" className={labelClass}>Your name</label>
                  <input
                    id="name" type="text" required value={form.name}
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
                    <label htmlFor="age" className={labelClass}>Child's age <span className="font-normal text-slate-400">(optional)</span></label>
                    <input
                      id="age" type="number" min="3" max="17" value={form.age}
                      onChange={(e) => update('age', e.target.value)}
                      placeholder="e.g. 8" className={inputClass}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="course" className={labelClass}>Course</label>
                    <select
                      id="course" value={form.course}
                      onChange={(e) => update('course', e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Not sure yet</option>
                      {STATIC_COURSES.map(c => (
                        <option key={c._id} value={c.title}>{c.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="country" className={labelClass}>Country</label>
                    <input
                      id="country" type="text" required list="country-list" value={form.country}
                      onChange={(e) => update('country', e.target.value)}
                      placeholder="e.g. USA" className={inputClass}
                    />
                    <datalist id="country-list">
                      {COUNTRIES.map(c => <option key={c} value={c} />)}
                    </datalist>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Message <span className="font-normal text-slate-400">(optional)</span></label>
                  <textarea
                    id="message" rows={3} value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    placeholder="Preferred class time, teacher preference, or anything else"
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-[15px] font-bold shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all active:scale-[0.99]"
                >
                  <FaWhatsapp size={20} />
                  Continue on WhatsApp
                </button>

                <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                  <FaGift className="text-orange-400" /> 3-day free trial · No card needed
                </p>

                {opened && (
                  <p role="status" className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2.5">
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
                className="flex items-center gap-4 bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <FaWhatsapp size={22} />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">WhatsApp</div>
                  <div className="text-base font-black text-[#001f3f]">{WHATSAPP_DISPLAY}</div>
                </div>
              </a>

              {CONTACT_EMAIL && (
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-4 bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0">
                    <FaEnvelope size={19} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email</div>
                    <div className="text-sm font-black text-[#001f3f] break-all">{CONTACT_EMAIL}</div>
                  </div>
                </a>
              )}

              <div className="flex items-center gap-4 bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <FaClock size={19} />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Reply time</div>
                  <div className="text-sm font-black text-[#001f3f]">Usually within a few hours</div>
                </div>
              </div>

              {activeSocials.length > 0 && (
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Follow us</div>
                  <div className="flex flex-wrap gap-2.5">
                    {activeSocials.map(s => (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={s.name}
                        title={s.name}
                        className={`w-11 h-11 rounded-xl ${s.color} text-white flex items-center justify-center hover:scale-110 transition-transform`}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default ContactPage;