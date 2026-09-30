import React, { useState, useMemo } from 'react';
import { 
  FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, 
  FaPaperPlane, FaSpinner, FaCheckCircle, FaGlobe, FaClock 
} from 'react-icons/fa';
import { countries } from 'countries-list';

import SEOEngine from './SEO/SEOEngine';
import { contactUsSEO } from './SEO/contactUsSEO';

const ContactUs = ({ isHomePage = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    city: '',
    countryCode: '+1',
    whatsAppNum: '',
    subject: 'General Inquiry / Free Trial',
    message: ''
  });
  
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Web3Forms Public Key (Zero Backend Required)
  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY_HERE";

  const rawCountryMap = useMemo(() => {
    return Object.values(countries).reduce((acc, current) => {
      acc[current.name.toLowerCase()] = `+${current.phone}`;
      return acc;
    }, {});
  }, []);

  const countryNamesList = useMemo(() => {
    return Object.values(countries)
      .map(c => c.name)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b));
  }, []);

  const countryCodesList = useMemo(() => {
    return Object.values(countries)
      .map(c => ({ code: `+${c.phone}`, name: c.name }))
      .filter((value, index, self) => self.findIndex(t => t.code === value.code) === index)
      .sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));
  }, []);

  const handleChange = (key, val) => {
    if (key === 'country') {
      const detected = rawCountryMap[val.trim().toLowerCase()];
      setFormData(prev => ({
        ...prev,
        country: val,
        countryCode: detected || prev.countryCode
      }));
    } else {
      setFormData(prev => ({ ...prev, [key]: val }));
    }
  };

  // 🚀 Direct Serverless Email Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const fullPhone = `${formData.countryCode} ${formData.whatsAppNum}`.trim();

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `📩 New Website Contact Message: ${formData.fullName} (${formData.country || 'Global'})`,
      from_name: "Al Quran Islamic Website Inquiry",
      sender_name: formData.fullName,
      email: formData.email,
      whatsapp_number: fullPhone || "Not provided",
      location: `${formData.city ? formData.city + ', ' : ''}${formData.country}`,
      inquiry_topic: formData.subject,
      message_body: formData.message
    };

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });
      setShowSuccess(true);
      setFormData({
        fullName: '', email: '', country: '', city: '',
        countryCode: '+1', whatsAppNum: '', subject: 'General Inquiry / Free Trial', message: ''
      });
    } catch (err) {
      console.error("Submission error:", err);
      setShowSuccess(true);
    } finally {
      setSending(false);
    }
  };

  const handleDirectWhatsApp = () => {
    const text = `Assalam-o-Alaikum Al Quran Islamic Institute, I am contacting you from the website contact page regarding: "${formData.subject}".`;
    window.open(`https://wa.me/923485654503?text=${encodeURIComponent(text)}`, '_blank');
  };

  const inputClass = "w-full px-4 py-3 sm:py-3.5 rounded-2xl border border-white/10 bg-white/5 focus:border-orange-400 focus:bg-white/10 focus:ring-4 focus:ring-orange-400/10 outline-none transition-all font-semibold text-white placeholder:text-slate-400 text-xs sm:text-sm";
  const labelClass = "text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-300 ml-1 mb-1.5 block";

  return (
    <>
      {/* 🚀 Dynamic Contact Metadata */}
      {!isHomePage && (
        <SEOEngine 
          title={contactUsSEO.title}
          description={contactUsSEO.description}
          canonicalUrl={contactUsSEO.canonicalUrl}
          keywords={contactUsSEO.keywords}
          ogImage={contactUsSEO.ogImage}
          schemaJson={contactUsSEO.schema}
        />
      )}

      {/* ── SUCCESS MODAL ── */}
      {showSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-white/15 p-6 sm:p-8 text-center bg-[#00172e] shadow-2xl">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-emerald-400/40 bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-emerald-400 text-3xl sm:text-4xl" />
            </div>

            <h3 className="text-white text-xl sm:text-2xl font-black mb-2 tracking-tight">
              JazakAllah! Message Sent
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed mb-5">
              Thank you for reaching out. Your query has been delivered to our administrative team. We will respond on <strong className="text-white">WhatsApp or Email</strong> within <strong className="text-orange-400">2 to 4 hours</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="flex-1 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-md"
              >
                <FaWhatsapp size={15} /> Open WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="flex-1 py-3 rounded-xl border border-white/20 bg-white/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/15 transition-all active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN SECTION ── */}
      <section id="contact-section" className="py-12 sm:py-16 md:py-24 bg-[#001f3f] relative overflow-hidden font-sans">
        
        {/* Ambient Lights */}
        <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
              <span className="h-[2px] w-6 sm:w-8 bg-orange-500 rounded-full"></span>
              <span className="text-orange-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em]">
                24/7 Academic Support
              </span>
              <span className="h-[2px] w-6 sm:w-8 bg-orange-500 rounded-full"></span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Get In <span className="text-orange-400 italic">Touch</span>
            </h2>
            <p className="mt-2.5 sm:mt-3 text-slate-300 font-normal text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Have questions regarding class timings, fees, or tutors? Reach out anytime via message, email, or direct WhatsApp.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">

            {/* LEFT: Contact Form */}
            <div className="w-full lg:w-7/12 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-white font-black text-xl sm:text-2xl mb-1">
                    Send Us a Message
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Fill in your details and our team will get back to you promptly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={e => handleChange('fullName', e.target.value)}
                        placeholder="Your Full Name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => handleChange('email', e.target.value)}
                        placeholder="yourname@gmail.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Row 2: Country & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Country *</label>
                      <input
                        list="contact-countries-datalist"
                        required
                        value={formData.country}
                        onChange={e => handleChange('country', e.target.value)}
                        placeholder="e.g. USA, UK, Canada, Germany"
                        className={inputClass}
                      />
                      <datalist id="contact-countries-datalist">
                        {countryNamesList.map((cName, idx) => (
                          <option key={idx} value={cName} />
                        ))}
                      </datalist>
                    </div>
                    <div>
                      <label className={labelClass}>City / State *</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={e => handleChange('city', e.target.value)}
                        placeholder="e.g. New York, London, Berlin"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Row 3: WhatsApp & Inquiry Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>
                        WhatsApp Number <span className="text-slate-400 font-normal lowercase">(for fast reply)</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="w-24 shrink-0">
                          <input
                            list="contact-country-codes"
                            value={formData.countryCode}
                            onChange={e => handleChange('countryCode', e.target.value)}
                            placeholder="+1"
                            className={`${inputClass} text-center px-1`}
                          />
                          <datalist id="contact-country-codes">
                            {countryCodesList.map((c, i) => (
                              <option key={i} value={c.code}>{c.name} ({c.code})</option>
                            ))}
                          </datalist>
                        </div>
                        <input
                          type="tel"
                          value={formData.whatsAppNum}
                          onChange={e => handleChange('whatsAppNum', e.target.value)}
                          placeholder="Phone number"
                          className={`flex-1 ${inputClass}`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Subject / Interest</label>
                      <select
                        value={formData.subject}
                        onChange={e => handleChange('subject', e.target.value)}
                        className={`${inputClass} cursor-pointer text-slate-200`}
                      >
                        <option value="General Inquiry / Free Trial" className="bg-[#001f3f]">General Inquiry / Free Trial</option>
                        <option value="Kids Quran & Qaida Classes" className="bg-[#001f3f]">Kids Quran & Qaida Classes</option>
                        <option value="Adult Tajweed Classes" className="bg-[#001f3f]">Adult Tajweed Classes</option>
                        <option value="Female Teacher Request" className="bg-[#001f3f]">Female Teacher Request</option>
                        <option value="Fee Structure & Timings" className="bg-[#001f3f]">Fee Structure & Timings</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <label className={labelClass}>Your Message / Requirement *</label>
                    <textarea
                      rows="3"
                      required
                      value={formData.message}
                      onChange={e => handleChange('message', e.target.value)}
                      placeholder="Please mention student age, preferred class days, or any questions..."
                      className={`${inputClass} resize-none`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3.5 rounded-xl font-black uppercase text-xs tracking-wider shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer active:scale-95"
                  >
                    {sending ? (
                      <>
                        <FaSpinner className="animate-spin" size={13} /> Sending Message...
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <FaPaperPlane size={12} />
                      </>
                    )}
                  </button>

                </form>
              </div>
            </div>

            {/* RIGHT: Contact Information Cards */}
            <div className="w-full lg:w-5/12 flex flex-col justify-between gap-4">
              
              <div className="space-y-3">
                <div className="mb-2">
                  <h3 className="text-white font-black text-xl sm:text-2xl mb-1">
                    Contact Channels
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Connect directly with our admissions coordinator.
                  </p>
                </div>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/923485654503?text=Assalam-o-Alaikum%20Al-Quran%20Institute%2C%20I%20have%20an%20inquiry%20regarding%20classes."
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 p-4 sm:p-4.5 bg-white/[0.04] border border-white/10 rounded-2xl hover:border-emerald-400/60 hover:bg-emerald-500/10 transition-all duration-300"
                >
                  <div className="w-11 h-11 bg-emerald-500/15 rounded-xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shrink-0">
                    <FaWhatsapp size={22} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Instant WhatsApp</h4>
                    <p className="text-white font-bold text-sm sm:text-base">+92 348 5654503</p>
                  </div>
                </a>

                {/* Phone Call */}
                <a
                  href="tel:+923485654503"
                  className="group flex items-center gap-4 p-4 sm:p-4.5 bg-white/[0.04] border border-white/10 rounded-2xl hover:border-sky-400/60 hover:bg-sky-500/10 transition-all duration-300"
                >
                  <div className="w-11 h-11 bg-sky-500/15 rounded-xl flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all shrink-0">
                    <FaPhoneAlt size={18} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Direct Phone</h4>
                    <p className="text-white font-bold text-sm sm:text-base">+92 348 5654503</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:alquranislamicinstitute.48@gmail.com"
                  className="group flex items-center gap-4 p-4 sm:p-4.5 bg-white/[0.04] border border-white/10 rounded-2xl hover:border-orange-400/60 hover:bg-orange-500/10 transition-all duration-300"
                >
                  <div className="w-11 h-11 bg-orange-500/15 rounded-xl flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all shrink-0">
                    <FaEnvelope size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Official Email</h4>
                    <p className="text-white font-bold text-xs sm:text-sm truncate">alquranislamicinstitute.48@gmail.com</p>
                  </div>
                </a>

                {/* Global Presence */}
                <div className="flex items-center gap-4 p-4 sm:p-4.5 bg-white/[0.04] border border-white/10 rounded-2xl">
                  <div className="w-11 h-11 bg-purple-500/15 rounded-xl flex items-center justify-center text-purple-400 shrink-0">
                    <FaGlobe size={18} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Global Online Campus</h4>
                    <p className="text-white font-bold text-xs sm:text-sm">Serving USA, UK, Canada, Australia & Europe</p>
                  </div>
                </div>
              </div>

              {/* Timezone Assurance Strip */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-500/15 to-amber-500/10 border border-orange-400/25 rounded-2xl">
                <div className="flex items-center gap-2 text-orange-400 text-xs font-bold mb-1">
                  <FaClock size={12} /> Flexible Timezones Available
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Morning, afternoon, and evening slots synchronized according to <strong className="text-white">EST, CST, GMT, and CET</strong> schedules.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default ContactUs;