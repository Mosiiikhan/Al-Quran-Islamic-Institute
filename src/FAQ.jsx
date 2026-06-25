import React, { useState } from 'react';
import { FaChevronDown, FaQuestionCircle, FaWhatsapp, FaEnvelope, FaHeadset } from 'react-icons/fa';

const faqs = [
  {
    q: "Is the 5-day trial really free?",
    a: "Yes, we offer a 5-day completely free trial with no hidden charges. It's a great way to evaluate our teaching style and your child's comfort before committing."
  },
  {
    q: "How can I enroll?",
    a: "You can contact us through WhatsApp, email, or the website contact form to register. Our team will guide you through the entire process within minutes."
  },
  {
    q: "Do you have female teachers?",
    a: "Absolutely! We have a dedicated team of certified and experienced female tutors specifically for sisters and young girls."
  },
  {
    q: "What are the class timings?",
    a: "Our classes are available 24/7. Since we serve students globally, you can choose any time slot that fits your schedule — any timezone, any day."
  },
  {
    q: "How are classes conducted?",
    a: "Classes are conducted live through Zoom, WhatsApp, or Microsoft Teams with qualified teachers for a fully interactive experience."
  },
  {
    q: "How do you monitor student progress?",
    a: "We conduct regular tests and provide detailed monthly progress reports to parents, so you always know how your child is advancing."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq-section" className="py-20 bg-[#f8faff] relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-25 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-100 rounded-full blur-3xl opacity-25 pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
            <span className="text-orange-500 text-[11px] font-black uppercase tracking-[0.4em]">Help Center</span>
            <span className="h-[2px] w-10 bg-orange-500 rounded-full"></span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-blue-900 tracking-tight leading-tight">
            Common <span className="italic">Questions.</span>
          </h1>
          <p className="mt-4 text-slate-500 font-medium text-sm md:text-base max-w-xl mx-auto">
            Everything you need to know about our classes, teachers, and enrollment process.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-3xl transition-all duration-500 border-2 overflow-hidden ${
                openIndex === index
                  ? 'bg-white border-orange-400 shadow-2xl shadow-orange-100'
                  : 'bg-white border-slate-100 hover:border-orange-200 hover:shadow-lg'
              }`}
            >
              {/* Top accent bar */}
              <div className={`h-1 w-full bg-gradient-to-r from-orange-400 to-orange-600 transition-opacity duration-300 ${openIndex === index ? 'opacity-100' : 'opacity-0'}`}></div>

              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center gap-4"
              >
                <span className="font-bold text-base sm:text-lg flex items-center gap-4 flex-1">
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                    openIndex === index
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                      : 'bg-slate-50 text-blue-600 border border-slate-100'
                  }`}>
                    <FaQuestionCircle size={18} />
                  </span>
                  <span className={`transition-colors duration-300 ${openIndex === index ? 'text-orange-600' : 'text-[#001f3f]'}`}>
                    {faq.q}
                  </span>
                </span>
                <div className={`transition-transform duration-400 shrink-0 ${openIndex === index ? 'rotate-180 text-orange-500' : 'text-slate-300'}`}>
                  <FaChevronDown size={16} />
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-7 ml-14">
                  <div className="p-5 bg-orange-50 rounded-2xl border-l-4 border-orange-400">
                    <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-medium">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Contact Banner */}
        <div className="relative rounded-[2.5rem] overflow-hidden">

          {/* Gradient border wrapper */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-400 to-[#001f3f] rounded-[2.5rem]"></div>

          <div className="relative m-[3px] bg-white rounded-[2.4rem] p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden">

            {/* Background icon */}
            <div className="absolute top-0 right-0 opacity-[0.04] pointer-events-none">
              <FaHeadset size={280} className="-mr-16 -mt-16" />
            </div>

            {/* Text */}
            <div className="text-center lg:text-left relative z-10">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <span className="h-[2px] w-8 bg-orange-500 rounded-full"></span>
                <span className="text-orange-500 text-[11px] font-black uppercase tracking-[0.4em]">We're Here 24/7</span>
                <span className="h-[2px] w-8 bg-orange-500 rounded-full"></span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-[#001f3f] mb-3 leading-tight">
                Still have a question?
              </h3>
              <p className="text-slate-500 text-base font-medium max-w-md">
                Our support experts are ready to guide you around the clock. Get a personalized response within minutes.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full lg:w-auto">
              <a
                href="https://wa.me/923485654503"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none group flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-green-200 active:scale-95"
              >
                <FaWhatsapp size={20} className="group-hover:animate-bounce" />
                WhatsApp Now
              </a>
              <a
                href="mailto:support@alquraninstitute.com?subject=Trial Class Inquiry&body=Assalamu Alaikum,%0D%0A%0D%0AI want to know more about the course structure and online class setup."
                className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-[#001f3f] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all hover:-translate-y-1 hover:bg-blue-900 hover:shadow-xl active:scale-95"
              >
                <FaEnvelope size={18} />
                Send Email
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;