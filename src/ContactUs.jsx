import React from 'react';
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <section id="footer-section" className="py-10 bg-gray-100 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-orange-600 font-black uppercase tracking-[0.3em] text-xs mb-4">Contact Us </h2>
          <h3 className="text-4xl md:text-5xl font-black text-blue-900">Get In <span className="text-blue-900">Touch</span></h3>
          <p className="text-gray-500 mt-4 font-medium italic">"Have questions? We are here to help you on your spiritual journey."</p>
             <div className="w-32 h-1 bg-orange-500 mx-auto  mt-2 rounded-full"></div>
        </div>
         


        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- LEFT: Contact Form --- */}
          <div className="w-full lg:w-7/12 bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                  <input type="text" placeholder="Mohsin Ishfaq" className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 outline-none transition-all font-bold text-[#001f3f]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
                  <input type="email" placeholder="example@gmail.com" className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 outline-none transition-all font-bold text-[#001f3f]" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Your Message</label>
                <textarea rows="4" placeholder="How can we help you?" className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 outline-none transition-all font-bold text-[#001f3f] resize-none"></textarea>
              </div>

              <button className="w-full md:w-auto bg-[#001f3f] text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-orange-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                Send Message <FaPaperPlane />
              </button>
            </form>
          </div>

          {/* --- RIGHT: Contact Info Cards --- */}
          <div className="w-full lg:w-5/12 space-y-4">
            
            {/* WhatsApp Card */}
            <a href="https://wa.me/923485654503" target="_blank" className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-green-500 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                <FaWhatsapp size={28} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">WhatsApp</h4>
                <p className="text-[#001f3f] font-black text-lg">+92 348 5654503</p>
              </div>
            </a>

            {/* Phone Card */}
            <a href="tel:+923485654503" className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-blue-500 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <FaPhoneAlt size={24} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Call Us</h4>
                <p className="text-[#001f3f] font-black text-lg">+92 348 5654503</p>
              </div>
            </a>

            {/* Email Card */}
            <a href="mailto:info@alquran.com" className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-orange-500 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                <FaEnvelope size={24} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</h4>
                <p className="text-[#001f3f] font-black text-lg">info@alquran.com</p>
              </div>
            </a>

            {/* Location Card */}
            <div className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-[2rem]">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                <FaMapMarkerAlt size={24} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Our Location</h4>
                <p className="text-[#001f3f] font-black text-lg">Online Worldwide</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;