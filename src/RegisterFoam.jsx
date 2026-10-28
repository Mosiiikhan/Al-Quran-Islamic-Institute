import React, { useState, useEffect } from 'react';
import {
  FaUserPlus, FaTimes, FaWhatsapp, FaCheckCircle, FaChild, FaUser, FaGift
} from 'react-icons/fa';

import { STATIC_COURSES } from './Courses';

const WHATSAPP_NUMBER = "923485654503";

const COUNTRIES = [
  "USA", "United Kingdom", "Canada", "Australia", "UAE", "Saudi Arabia",
  "Qatar", "Kuwait", "Ireland", "Germany", "New Zealand", "Malaysia", "Pakistan"
];

const emptyForm = { name: '', learner: 'child', age: '', course: '', country: '', message: '' };

const FloatingRegister = ({ selectedCourseName = "", isExplicitOpen = false, onExplicitClose = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState(emptyForm);

  // Course card se "Book Free Trial" dabane par modal khulta hai aur course pehle se select hota hai
  useEffect(() => {
    if (isExplicitOpen) setIsOpen(true);
    if (selectedCourseName) {
      setForm(prev => ({ ...prev, course: selectedCourseName }));
    }
  }, [selectedCourseName, isExplicitOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    setForm(emptyForm);
    if (onExplicitClose) onExplicitClose();
  };

  // Modal khula ho to background scroll band, aur Esc se band
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const openWhatsApp = () => {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openWhatsApp();
    setIsSubmitted(true);
  };

  const inputClass =
    "w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[15px] text-slate-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all";
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
      {/* Floating button */}
      {!isExplicitOpen && (
        <button
          id="register-section"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 md:bottom-24 md:right-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 md:px-6 py-3 rounded-full shadow-2xl z-[90] flex items-center gap-2 font-black uppercase text-[9px] md:text-[10px] tracking-widest hover:scale-105 transition-all animate-pulse border-2 border-white/20 active:scale-95"
        >
          <FaUserPlus size={15} />
          <span className="hidden sm:inline">Register Free Trial</span>
          <span className="sm:hidden">Trial</span>
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 bg-[#001f3f]/85 backdrop-blur-sm z-[200] flex items-center justify-center p-3 sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Book a free trial"
            className="bg-white rounded-3xl w-full max-w-md max-h-[92vh] overflow-y-auto shadow-2xl relative p-5 sm:p-7"
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-3.5 right-3.5 w-9 h-9 flex items-center justify-center text-white bg-[#001f3f] hover:bg-red-500 rounded-full transition-all shadow-md z-10"
            >
              <FaTimes size={14} />
            </button>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-5 pt-1">
                  <h2 className="text-2xl font-black text-[#001f3f] tracking-tight">
                    Book your <span className="text-orange-600 italic">free trial</span>
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    A few details, then we reply on WhatsApp.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                  <div>
                    <label htmlFor="reg-name" className={labelClass}>Your name</label>
                    <input
                      id="reg-name" type="text" required value={form.name}
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
                      <label htmlFor="reg-age" className={labelClass}>Child's age <span className="font-normal text-slate-400">(optional)</span></label>
                      <input
                        id="reg-age" type="number" min="3" max="17" value={form.age}
                        onChange={(e) => update('age', e.target.value)}
                        placeholder="e.g. 8" className={inputClass}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="reg-course" className={labelClass}>Course</label>
                      <select
                        id="reg-course" value={form.course}
                        onChange={(e) => update('course', e.target.value)}
                        className={`${inputClass} cursor-pointer`}
                      >
                        <option value="">Not sure yet</option>
                        {STATIC_COURSES.map(c => (
                          <option key={c._id} value={c.title}>{c.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="reg-country" className={labelClass}>Country</label>
                      <input
                        id="reg-country" type="text" required list="reg-country-list" value={form.country}
                        onChange={(e) => update('country', e.target.value)}
                        placeholder="e.g. USA" className={inputClass}
                      />
                      <datalist id="reg-country-list">
                        {COUNTRIES.map(c => <option key={c} value={c} />)}
                      </datalist>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="reg-message" className={labelClass}>Message <span className="font-normal text-slate-400">(optional)</span></label>
                    <textarea
                      id="reg-message" rows={2} value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder="Preferred time, teacher preference, or anything else"
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
                </form>
              </>
            ) : (
              /* Success screen */
              <div className="text-center py-6">
                <FaCheckCircle className="text-emerald-500 mx-auto mb-3" size={52} />
                <h2 className="text-xl font-black text-[#001f3f] tracking-tight">
                  WhatsApp is opening
                </h2>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed max-w-xs mx-auto">
                  Press <strong className="text-slate-700">send</strong> in WhatsApp to deliver your message. If nothing opened, allow pop-ups and try again.
                </p>

                <div className="mt-6 space-y-2.5 max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 rounded-xl text-sm transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md"
                  >
                    <FaWhatsapp size={17} /> Open WhatsApp again
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full bg-slate-100 text-slate-700 font-bold py-3 rounded-xl text-sm hover:bg-slate-200 transition-all active:scale-95"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingRegister;