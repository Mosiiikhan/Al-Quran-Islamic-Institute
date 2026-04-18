import React, { useState } from 'react';
import { FaChevronDown, FaQuestionCircle, FaInfoCircle, FaWhatsapp, FaEnvelope, FaHeadset } from 'react-icons/fa';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Is the 5-day trial really free?",
      a: "Yes, we offer a 5-day completely free trial with no hidden charges. It’s a great way to evaluate our teaching style and your child's comfort before committing."
    },
    {
      q: "How can I enroll?",
      a: "You can contact us through WhatsApp, email, or the website contact form to register."
    },
    {
      q: "Do you have female teachers?",
      a: "Absolutely! We have a dedicated team of certified and experienced female tutors specifically for sisters and young girls."
    },
    {
      q: "What are the class timings?",
      a: "Our classes are available 24/7. Since we serve students globally, you can choose any time slot that fits your schedule."
    },
    {
      q: "How are classes conducted?",
      a: "Classes are conducted live through Zoom, WhatsApp, or Microsoft Teams with qualified teachers."
    },
    {
      q: "How do you monitor student progress?",
      a: "We conduct regular tests and provide progress updates to parents."
    }
  ];

  return (
    <section id="faq-section" className="py-10 bg-white relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 ">
            <span className="text-[12px] font-black text-orange-600 uppercase tracking-[0.3em]">Help Center</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-blue-900 tracking-tighter">
            Common <span className="text-blue-900">Questions.</span>
          </h1>
          <p className="mt-4 text-gray-500 font-medium">Everything you need to know about our classes and process.</p>
          <div className="w-32 h-1 bg-orange-500 mx-auto mt-2  rounded-full"></div>

        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-20">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`group rounded-3xl transition-all duration-500 border ${
                openIndex === index 
                ? 'bg-white border-orange-500 shadow-2xl shadow-orange-100 scale-[1.02]' 
                : 'bg-gray-50/50 border-gray-100 hover:border-orange-200 hover:bg-white hover:shadow-xl'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center"
              >
                <span className={`font-bold text-lg flex items-center gap-4 ${
                  openIndex === index ? 'text-orange-600' : 'text-[#001f3f]'
                }`}>
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    openIndex === index ? 'bg-orange-600 text-white' : 'bg-white text-blue-600 shadow-sm group-hover:bg-orange-50'
                  }`}>
                    <FaQuestionCircle size={20} />
                  </span>
                  {faq.q}
                </span>
                <div className={`transition-transform duration-500 ${openIndex === index ? 'rotate-180 text-orange-600' : 'text-gray-300'}`}>
                   <FaChevronDown size={18} />
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-8 ml-14">
                  <div className="p-5 bg-orange-50/50 rounded-2xl border-l-4 border-orange-500 relative">
                    <p className="text-gray-600 text-[15px] leading-relaxed font-medium">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- EYE-CATCHING CONTACT BANNER --- */}
        <div className="relative rounded-[3rem] p-1 md:p-1 bg-gradient-to-r from-orange-500 via-red-500 to-[#001f3f] shadow-2xl">
          <div className="bg-white rounded-[2.9rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative">
            
            {/* Background Graphic */}
            <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
                <FaHeadset size={300} className="-mr-20 -mt-20" />
            </div>

            <div className="text-center lg:text-left relative z-10">
              <h3 className="text-3xl md:text-5xl font-black text-[#001f3f] mb-4 leading-tight">
                Still Have any question?<br />
              </h3> 
              <p className="text-gray-500 text-lg font-medium max-w-lg">
                Our support experts are ready to guide you 24/7. Get a personalized response within minutes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 relative z-10 w-full lg:w-auto">
              {/* WhatsApp Premium Button */}
              <a 
                href="https://wa.me/923485654503" 
                target="_blank" 
                rel="noreferrer"
                className="group relative flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all hover:shadow-[0_20px_40px_-10px_rgba(37,211,102,0.4)] hover:-translate-y-2 active:scale-95"
              >
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <FaWhatsapp size={24} className="animate-bounce" /> 
                <span>WhatsApp Now</span>
              </a>

              {/* Email Premium Button */}
              <button 
                onClick={() => document.getElementById('footer-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative flex items-center justify-center gap-3 bg-[#001f3f] text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all hover:shadow-[0_20px_40px_-10px_rgba(0,31,63,0.3)] hover:-translate-y-2 active:scale-95"
              >
                <FaEnvelope size={20} /> 
                <span>Send Email</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;