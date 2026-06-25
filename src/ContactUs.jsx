import React, { useState, useMemo } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { countries } from 'countries-list';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    city: '',
    countryCode: '+44',
    whatsAppNum: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      console.log("Form submitted:", formData);
      setFormData({
        fullName: '', email: '', country: '', city: '',
        countryCode: '+44', whatsAppNum: '', message: ''
      });
      setShowSuccess(true);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputClass = "w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 outline-none transition-all font-bold text-white placeholder:text-slate-500 text-sm";
  const labelClass = "text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1 block";

  return (
    <>
      {/* ── SUCCESS MODAL ── */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: 'rgba(0,5,15,0.80)', backdropFilter: 'blur(8px)' }}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl border border-white/10 p-8 text-center"
            style={{ background: 'rgba(10,22,40,0.98)', boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}
          >
            {/* Top golden shimmer */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-px rounded-full"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(251,191,36,0.7),transparent)' }}
            />

            {/* Animated check circle */}
            <div className="w-20 h-20 rounded-full border-2 border-green-400/40 bg-green-500/10 flex items-center justify-center mx-auto mb-5">
              <svg
                className="w-9 h-9 text-green-400"
                fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h3 className="text-white text-xl font-black mb-2 tracking-tight">
              Message Sent!
            </h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-5">
              Thank you for reaching out. Our team will contact you on{' '}
              <span className="text-white font-black">WhatsApp or Email</span> within{' '}
              <span className="text-white font-black">24 hours</span>.
            </p>

            {/* Info strip */}
            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 mb-6 text-left">
              <svg
                className="w-4 h-4 flex-shrink-0"
                style={{ color: 'rgba(251,191,36,0.85)' }}
                fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="text-slate-400 text-xs leading-relaxed">
                Available 24/7 across{' '}
                <span className="text-white font-black">USA, UK, Canada & Australia</span>
              </span>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full py-3 rounded-2xl border border-white/20 bg-white/[0.08] text-white text-sm font-bold tracking-wide hover:bg-white/[0.14] transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN SECTION ── */}
      <section id="footer-section" className="py-20 bg-[#001f3f] relative overflow-hidden">

        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

          {/* Header */}
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
              <span className="text-orange-400 text-[11px] font-black uppercase tracking-[0.4em]">Contact Us</span>
              <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Get In <span className="text-orange-400 italic">Touch</span>
            </h1>
            <p className="mt-4 text-slate-400 font-medium text-sm md:text-base max-w-xl mx-auto">
              Have questions? We are here to help you on your spiritual journey — reach out anytime, anywhere.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">

            {/* LEFT: Contact Form */}
            <div className="w-full lg:w-7/12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">

              <div className="mb-8">
                <h2 className="text-white font-black text-2xl mb-1">Send us a Message</h2>
                <p className="text-slate-400 text-sm font-medium">Fill the form and our team will respond within minutes.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => handleChange('fullName', e.target.value)}
                      placeholder="Mohsin Ishfaq"
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
                      placeholder="example@gmail.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Row 2: Country & City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Country *</label>
                    <input
                      list="footer-countries-datalist"
                      required
                      value={formData.country}
                      onChange={e => handleChange('country', e.target.value)}
                      placeholder="United Kingdom"
                      className={inputClass}
                    />
                    <datalist id="footer-countries-datalist">
                      {countryNamesList.map((cName, idx) => (
                        <option key={idx} value={cName} />
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <label className={labelClass}>City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={e => handleChange('city', e.target.value)}
                      placeholder="London"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Row 3: WhatsApp */}
                <div>
                  <label className={labelClass}>
                    WhatsApp Number{' '}
                    <span className="text-slate-500 font-normal normal-case tracking-normal">(Optional)</span>
                  </label>
                  <div className="flex gap-3">
                    <div className="w-32 flex-shrink-0">
                      <input
                        list="footer-country-codes"
                        value={formData.countryCode}
                        onChange={e => handleChange('countryCode', e.target.value)}
                        placeholder="+44"
                        className={`${inputClass} text-center`}
                      />
                      <datalist id="footer-country-codes">
                        {countryCodesList.map((country, index) => (
                          <option key={index} value={country.code}>{country.name} ({country.code})</option>
                        ))}
                      </datalist>
                    </div>
                    <input
                      type="tel"
                      value={formData.whatsAppNum}
                      onChange={e => handleChange('whatsAppNum', e.target.value)}
                      placeholder="7123 456789"
                      className={`flex-1 ${inputClass}`}
                    />
                  </div>
                </div>

                {/* Row 4: Message */}
                <div>
                  <label className={labelClass}>Your Message *</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={e => handleChange('message', e.target.value)}
                    placeholder="Tell us about your requirements..."
                    className={`${inputClass} resize-none`}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto bg-orange-500 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-orange-500/20 hover:bg-orange-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {sending ? 'Sending...' : 'Send Message'}
                  <FaPaperPlane size={14} />
                </button>

              </form>
            </div>

            {/* RIGHT: Contact Info */}
            <div className="w-full lg:w-5/12 flex flex-col gap-4 justify-center">

              <div className="mb-2">
                <h2 className="text-white font-black text-2xl mb-1">Contact Information</h2>
                <p className="text-slate-400 text-sm font-medium">Multiple ways to reach us — pick what suits you best.</p>
              </div>

              <a
                href="https://wa.me/923485654503"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-5 p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-green-400/50 hover:bg-green-500/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all duration-300 shrink-0">
                  <FaWhatsapp size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">WhatsApp</h4>
                  <p className="text-white font-black text-base">+92 348 5654503</p>
                </div>
              </a>

              <a
                href="tel:+923485654503"
                className="group flex items-center gap-5 p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-sky-400/50 hover:bg-sky-500/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shrink-0">
                  <FaPhoneAlt size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Call Us</h4>
                  <p className="text-white font-black text-base">+92 348 5654503</p>
                </div>
              </a>

              <a
                href="mailto:alquranislamicinstitute.48@gmail.com"
                className="group flex items-center gap-5 p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-orange-400/50 hover:bg-orange-500/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shrink-0">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Email Address</h4>
                  <p className="text-white font-black text-sm break-all">alquranislamicinstitute.48@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-5 p-5 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 shrink-0">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Our Location</h4>
                  <p className="text-white font-black text-base">Online Worldwide 🌍</p>
                </div>
              </div>

              {/* Bottom note */}
              <div className="mt-2 p-5 bg-orange-500/10 border border-orange-400/20 rounded-2xl">
                <p className="text-orange-300 text-xs font-bold text-center leading-relaxed">
                  🕌 We serve students across{' '}
                  <span className="text-white font-black">USA, UK, Canada, Australia</span>{' '}
                  and 50+ countries worldwide — 24/7 available.
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