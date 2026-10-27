import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCheckCircle, FaWhatsapp, FaCalendarAlt, FaHome,
  FaBookOpen, FaShieldAlt, FaGlobe
} from 'react-icons/fa';

import SEOEngine from './SEO/SEOEngine';
import AboutAcademy from './AboutAcademy';

const SITE_URL = "https://www.alquranislamic.com";
const PAGE_URL = `${SITE_URL}/about-us`;

const seo = {
  title: "About Us | Al Quran Islamic Institute",
  description:
    "Learn about Al Quran Islamic Institute: live 1-on-1 online Quran classes with male and female tutors for kids, sisters and adults. Free trial available.",
  keywords:
    "al quran islamic institute, about al quran islamic institute, online quran academy, online quran classes, quran tutors online",
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${PAGE_URL}#webpage`,
      "url": PAGE_URL,
      "name": seo.title,
      "description": seo.description,
      "inLanguage": "en",
      "about": { "@id": `${SITE_URL}/#organization` }
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      "name": "Al Quran Islamic Institute",
      "url": `${SITE_URL}/`,
      "logo": `${SITE_URL}/logo.jpeg`,
      "description": "Online Quran academy offering live one-to-one classes with male and female tutors."
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": PAGE_URL }
      ]
    }
  ]
};

const howWeTeach = [
  { title: "One-to-one live classes", text: "Every class is between one student and one tutor on Zoom or Google Meet, so the whole lesson is spent on your recitation." },
  { title: "Male and female tutors", text: "Families can ask for a male or female tutor. Female tutors are available for girls, sisters and young children." },
  { title: "Lessons in your language", text: "Tutors teach in English, Urdu and Arabic, which helps children and new learners understand clearly." },
  { title: "Short, focused sessions", text: "Sessions last 30 to 45 minutes, and you can choose 2, 3 or 5 days a week." },
  { title: "Monthly progress reports", text: "You receive monthly performance evaluation reports, so you can see how your child is improving." },
  { title: "Free trial first", text: "Try a class before you commit. No credit card is required for the trial." },
];

const programs = [
  "Noorani Qaida",
  "Quran Recitation",
  "Tajweed Rules",
  "Hifz (Memorization)",
  "Duas & Islamic Manners",
];

const countryLinks = [
  { label: "Online Quran Classes USA", to: "/online-quran-classes-usa" },
  { label: "Online Quran Lessons UK", to: "/online-quran-classes-uk" },
  { label: "Online Quran Classes Canada", to: "/online-quran-classes-canada" },
  { label: "Online Quran Classes Australia", to: "/online-quran-classes-australia" },
  { label: "Online Quran Classes New York", to: "/online-quran-classes-new-york" },
];

const AboutUs = ({ onDirectRegisterTrigger }) => {
  const openTrial = () => {
    if (onDirectRegisterTrigger) onDirectRegisterTrigger("");
  };

  const whatsappLink = `https://wa.me/923485654503?text=${encodeURIComponent(
    "Assalam-o-Alaikum, I want to know more about Al Quran Islamic Institute."
  )}`;

  return (
    <>
      <SEOEngine
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={PAGE_URL}
        ogImage={`${SITE_URL}/logo.jpeg`}
        schemaJson={pageSchema}
      />

      <div className="bg-[#f8faff]">

        {/* ─── HEADER ─── */}
        <section className="bg-gradient-to-br from-[#001f3f] via-blue-950 to-slate-900 text-white py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-300 mb-6">
              <Link to="/" className="hover:text-white flex items-center gap-1">
                <FaHome size={12} /> Home
              </Link>
              <span>/</span>
              <span className="text-amber-400 font-bold">About Us</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
              About Al Quran Islamic Institute
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              An online Quran academy offering live one-to-one classes for kids, sisters and adults, with male and female tutors.
            </p>
          </div>
        </section>

        {/* ─── EXISTING ABOUT SECTION ─── */}
        <AboutAcademy />

        {/* ─── HOW WE TEACH ─── */}
        <section className="py-14 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-black text-[#001f3f] tracking-tight text-center mb-10">
              How We Teach
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {howWeTeach.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <FaShieldAlt className="text-emerald-500" size={14} />
                    <h3 className="text-base font-black text-[#001f3f]">{item.title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHAT WE TEACH ─── */}
        <section className="pb-14 md:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <FaBookOpen className="text-orange-500" size={18} />
                <h2 className="text-2xl font-black text-[#001f3f] tracking-tight">What We Teach</h2>
              </div>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Our programs cover the path from first Arabic letters to confident recitation. Not sure where to begin? Your tutor will guide you in the free trial.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {programs.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-slate-600 text-sm">
                    <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={14} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-5 py-3 rounded-xl transition-colors"
              >
                View All Programs →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── WHERE WE TEACH ─── */}
        <section className="pb-14 md:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <FaGlobe className="text-orange-500" size={18} />
              <h2 className="text-2xl font-black text-[#001f3f] tracking-tight">Families We Serve</h2>
            </div>
            <p className="text-slate-600 text-base leading-relaxed text-center max-w-2xl mx-auto mb-6">
              Classes are live online, so you can join from anywhere. See how lessons work for your country:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {countryLinks.map((c) => (
                <Link
                  key={c.to}
                  to={c.to}
                  className="text-xs font-bold text-[#001f3f] bg-white border border-slate-200 hover:border-orange-400 hover:text-orange-600 px-4 py-2.5 rounded-xl transition-colors"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="pb-14 md:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="rounded-3xl bg-gradient-to-br from-[#001f3f] via-blue-950 to-slate-900 text-white text-center p-10 md:p-14 shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">Start with a Free Trial</h2>
              <p className="text-slate-300 text-sm md:text-base mb-8">
                Meet your tutor and see how the classes work. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={openTrial}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaCalendarAlt size={14} /> Start Free Trial
                </button>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2"
                >
                  <FaWhatsapp size={16} /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default AboutUs;