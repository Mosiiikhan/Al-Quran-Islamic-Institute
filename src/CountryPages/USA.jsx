import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCheckCircle, FaWhatsapp, FaCalendarAlt, FaHome,
  FaClock, FaShieldAlt, FaUserGraduate, FaBookOpen
} from 'react-icons/fa';

import SEOEngine from '../SEO/SEOEngine';

const SITE_URL = "https://www.alquranislamic.com";

// ─── COUNTRY DATA (naya country add karne ke liye yahan naya key daalo) ───
const countryPages = {
  usa: {
    path: "/online-quran-classes-usa",
    countryName: "the USA",

    seo: {
      title: "Online Quran Classes USA | 1-on-1 Tutors | Free Trial",
      description:
        "Learn Quran online with certified Tajweed tutors. 1-on-1 classes for kids, sisters and adults across all US time zones. Free trial available.",
      keywords:
        "online quran classes usa, online quran classes for kids, quran tutor online usa, female quran teacher online, learn quran online, online tajweed classes usa",
    },

    hero: {
      h1: "Online Quran Classes in the USA",
      sub: "Live 1-on-1 Quran lessons with certified tutors for kids, sisters and adults, scheduled around your family's time zone.",
      trust: [
        "Male & female tutors",
        "1-on-1 live classes",
        "Tajweed & Hifz",
        "English, Urdu & Arabic",
      ],
    },

    intro: [
      "Finding a good Quran teacher in the United States is not always easy. Local mosques and weekend schools often have crowded classes, fixed timings and long waiting lists, and many families simply cannot fit a commute into a busy school week. Online Quran classes bring a qualified tutor to your home, so your child, or you, can learn on a schedule that actually works.",
      "At Al Quran Islamic Institute every class is one-to-one. Your tutor listens to your recitation, corrects your pronunciation on the spot and builds each lesson around your level, whether you are learning the Arabic letters for the first time or polishing your Tajweed after years of reading. Classes run live on Zoom or Google Meet, so all you need is a device, a stable internet connection and a quiet corner.",
      "Because the classes are personal, there is no pressure to keep up with a group. A shy child can take extra time on a hard letter, a busy parent can learn in the early morning, and an adult beginner can start from the very basics without feeling embarrassed.",
    ],

    audiences: [
      {
        title: "Quran Classes for Kids",
        text: "Our tutors are patient with young learners. Sessions are kept to 30 to 45 minutes so children stay focused, and most kids begin with Noorani Qaida before moving to reading the Quran. Mistakes are corrected gently and progress is praised, so children enjoy their lessons instead of dreading them. Female tutors are available for young children.",
      },
      {
        title: "Classes for Sisters",
        text: "Sisters and young girls can learn with a female tutor in a comfortable, private setting. Whether you want to start from Noorani Qaida, improve your recitation or begin memorizing, the lessons follow your pace and your goals.",
      },
      {
        title: "Classes for Adults",
        text: "Many adults never had the chance to learn to read the Quran properly. It is never too late to start. Your tutor will assess your level in the first class and plan a simple path forward, with lesson times that fit around work and family life.",
      },
    ],

    courses: [
      {
        title: "Noorani Qaida",
        text: "The starting point for beginners: Arabic letters, their sounds and the basics of reading.",
      },
      {
        title: "Quran Recitation",
        text: "Reading the Quran with a tutor who corrects your pronunciation and flow in real time.",
      },
      {
        title: "Tajweed Rules",
        text: "Step-by-step Tajweed with proper Makharij, so your recitation is accurate and confident.",
      },
      {
        title: "Hifz (Memorization)",
        text: "Structured Quran memorization with daily revision to help what you learn stay with you.",
      },
      {
        title: "Duas & Islamic Manners",
        text: "Daily duas, the Kalimas and everyday Islamic manners, especially useful for children.",
      },
    ],

    steps: [
      {
        title: "Book a free trial",
        text: "Fill in the short registration form or message us on WhatsApp. No credit card is needed for the trial.",
      },
      {
        title: "Meet your tutor",
        text: "In the trial class your tutor checks your level and goals. You can ask for a male or female tutor.",
      },
      {
        title: "Start regular classes",
        text: "Choose 2, 3 or 5 days a week and begin lessons at a time that suits your family.",
      },
    ],

    schedule: {
      title: "Class Timings for US Families",
      text: "Families in the USA live across several time zones, so we do not offer one fixed timetable. When you book your free trial, tell us your time zone and the hours that suit you, such as before school, after school or later in the evening. We will do our best to match you with a tutor and a slot that fits.",
      points: [
        "Eastern, Central, Mountain and Pacific time zones",
        "Sessions of 30 to 45 minutes",
        "2, 3 or 5 days per week",
        "Easy to reschedule by messaging us",
      ],
    },

    why: [
      {
        title: "One-to-one attention",
        text: "Every minute of the class is spent on your recitation, not shared with a group.",
      },
      {
        title: "Certified male and female tutors",
        text: "Choose the tutor you and your family are most comfortable with.",
      },
      {
        title: "Progress you can see",
        text: "You receive monthly performance evaluation reports, so you know how your child is improving.",
      },
      {
        title: "Lessons in your language",
        text: "Tutors teach in English, Urdu and Arabic, which helps children and new learners understand clearly.",
      },
      {
        title: "Clear, flexible plans",
        text: "Monthly fees depend on how many days a week you choose. See the full fee structure before you decide.",
      },
    ],

    faq: [
      {
        q: "Do you offer online Quran classes for kids in the USA?",
        a: "Yes. Kids learn one-to-one with a patient tutor in short sessions of 30 to 45 minutes. Most young beginners start with Noorani Qaida and then move on to reading the Quran.",
      },
      {
        q: "Can my daughter learn with a female Quran teacher?",
        a: "Yes. We have female tutors for girls, sisters and young children. Mention your preference when you book the free trial.",
      },
      {
        q: "How long is each class and how many days a week?",
        a: "Each session lasts 30 to 45 minutes. You can choose 2, 3 or 5 days a week depending on your goals and schedule.",
      },
      {
        q: "What do I need to join an online class?",
        a: "A phone, tablet or computer, a stable internet connection and Zoom or Google Meet. A quiet place to sit helps your tutor hear your recitation clearly.",
      },
      {
        q: "I have never read Arabic. Can I still start?",
        a: "Yes. Beginners start with Noorani Qaida, which teaches the Arabic letters and how to join them into words. Your tutor will move you forward at your own pace.",
      },
      {
        q: "Is there a free trial?",
        a: "Yes. You can try our classes for free before you commit. No credit card is required.",
      },
    ],

    cta: {
      title: "Start Learning the Quran from Home",
      text: "Book your free trial and meet your tutor. No credit card required.",
    },
  },
};


// CHANGED 1: ab `data` prop bhi leta hai (UK, Canada, Australia, NewYork ke liye)
const CountryPage = ({ country, data: dataProp, onDirectRegisterTrigger }) => {
  // CHANGED 2: pehle prop wala data, warna USA wala countryPages[country]
  const data = dataProp || countryPages[country];

  if (!data) return null;

  const pageUrl = `${SITE_URL}${data.path}`;

  const whatsappLink = `https://wa.me/923485654503?text=${encodeURIComponent(
    `Assalam-o-Alaikum, I want to know about online Quran classes in ${data.countryName}.`
  )}`;

  const openTrial = () => {
    if (onDirectRegisterTrigger) onDirectRegisterTrigger("");
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": data.seo.title,
        "description": data.seo.description,
        // CHANGED 3: UK ke liye en-GB, Canada ke liye en-CA wagera
        "inLanguage": data.lang || "en",
        "about": {
          "@type": "EducationalOrganization",
          "name": "Al Quran Islamic Institute",
          "url": `${SITE_URL}/`
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": data.hero.h1, "item": pageUrl }
        ]
      }
    ]
  };

  return (
    <>
      <SEOEngine
        title={data.seo.title}
        description={data.seo.description}
        keywords={data.seo.keywords}
        canonicalUrl={pageUrl}
        ogImage={`${SITE_URL}/logo.jpeg`}
        schemaJson={pageSchema}
      />

      <div className="bg-[#f8faff]">

        {/* ─── HERO ─── */}
        <section className="bg-gradient-to-br from-[#001f3f] via-blue-950 to-slate-900 text-white py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">

            <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-300 mb-6">
              <Link to="/" className="hover:text-white flex items-center gap-1">
                <FaHome size={12} /> Home
              </Link>
              <span>/</span>
              <span className="text-amber-400 font-bold">{data.hero.h1}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
              {data.hero.h1}
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8">
              {data.hero.sub}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
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

            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-300">
              {data.hero.trust.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <FaCheckCircle className="text-emerald-400" size={12} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─── INTRO ─── */}
        <section className="py-14 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5">
            {data.intro.map((para, i) => (
              <p key={i} className="text-slate-600 text-base md:text-lg leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* ─── WHO IT IS FOR ─── */}
        <section className="pb-14 md:pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-black text-[#001f3f] tracking-tight text-center mb-10">
              Quran Classes for Every Learner
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.audiences.map((item) => (
                <div key={item.title} className="bg-white rounded-3xl p-7 shadow-sm border border-slate-100">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-amber-400 flex items-center justify-center mb-4 shadow">
                    <FaUserGraduate size={17} />
                  </div>
                  <h3 className="text-lg font-black text-[#001f3f] mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── COURSES ─── */}
        <section className="pb-14 md:pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-black text-[#001f3f] tracking-tight text-center mb-3">
              What You Can Learn
            </h2>
            <p className="text-slate-500 text-sm md:text-base text-center max-w-2xl mx-auto mb-10">
              Pick the program that matches your level. Not sure where to begin? Your tutor will guide you in the free trial.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.courses.map((course) => (
                <div key={course.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <FaBookOpen className="text-orange-500" size={14} />
                    <h3 className="text-base font-black text-[#001f3f]">{course.title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{course.text}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-5 py-3 rounded-xl transition-colors"
              >
                View All Programs →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="py-14 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-black text-[#001f3f] tracking-tight text-center mb-10">
              How Our Online Classes Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.steps.map((step, i) => (
                <div key={step.title} className="rounded-3xl bg-[#f8faff] border border-slate-100 p-7">
                  <div className="w-9 h-9 rounded-full bg-orange-500 text-white font-black text-sm flex items-center justify-center mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-black text-[#001f3f] mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SCHEDULE ─── */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <FaClock className="text-orange-500" size={18} />
                <h2 className="text-2xl font-black text-[#001f3f] tracking-tight">{data.schedule.title}</h2>
              </div>
              <p className="text-slate-600 text-base leading-relaxed mb-6">{data.schedule.text}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.schedule.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-slate-600 text-sm">
                    <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={14} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── WHY CHOOSE US ─── */}
        <section className="pb-14 md:pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-black text-[#001f3f] tracking-tight text-center mb-10">
              Why Families Choose Al Quran Islamic Institute
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.why.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <FaShieldAlt className="text-emerald-500" size={14} />
                    <h3 className="text-base font-black text-[#001f3f]">{item.title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/#pricing-section"
                className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-5 py-3 rounded-xl transition-colors"
              >
                View Fee Structure →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-14 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-black text-[#001f3f] tracking-tight text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {data.faq.map((item) => (
                <div key={item.q} className="rounded-2xl border border-slate-100 bg-[#f8faff] p-6">
                  <h3 className="text-base font-black text-[#001f3f] mb-2">{item.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="rounded-3xl bg-gradient-to-br from-[#001f3f] via-blue-950 to-slate-900 text-white text-center p-10 md:p-14 shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">{data.cta.title}</h2>
              <p className="text-slate-300 text-sm md:text-base mb-8">{data.cta.text}</p>
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

export default CountryPage;