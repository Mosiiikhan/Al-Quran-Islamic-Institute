import React, { useState } from 'react';
import { 
  FaUserPlus, FaTimes, FaUser, FaWhatsapp, 
  FaGlobe, FaChild, FaUsers, FaBookOpen, FaCommentDots 
} from 'react-icons/fa';

const FloatingRegister = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // State updated for separate names & description
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    whatsapp: '',
    age: '',
    studentCount: '1',
    country: '',
    course: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Updated WhatsApp Message Format
    const message = `*New Registration Request*%0A%0A` +
      `👤 *Parent Name:* ${formData.parentName}%0A` +
      `👶 *Student Name:* ${formData.studentName}%0A` +
      `📞 *WhatsApp:* ${formData.whatsapp}%0A` +
      `🎂 *Age:* ${formData.age} Years%0A` +
      `🌍 *Country:* ${formData.country}%0A` +
      `👥 *No. of Students:* ${formData.studentCount}%0A` +
      `📖 *Course:* ${formData.course}%0A` +
      `📝 *Note/Description:* ${formData.description}`;

    // Replace with your actual WhatsApp number
    const phoneNumber = "923485654503"; 
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 bg-orange-600 text-white px-6 py-3 rounded-full shadow-2xl z-[90] flex items-center gap-2 font-black uppercase text-[10px] tracking-widest hover:bg-orange-700 hover:scale-110 transition-all animate-pulse border-2 border-white/20"
      >
        <FaUserPlus size={16} />
        <span>Register Free</span>
      </button>

      {/* Pop-up Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#001f3f]/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-300 scrollbar-hide">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors z-10 bg-white rounded-full p-1"
            >
              <FaTimes size={20} />
            </button>

            {/* Header */}
            <div className="bg-gray-50 px-6 py-6 border-b border-gray-100 text-center sticky top-0 z-0">
              <h2 className="text-xl md:text-2xl font-black text-[#001f3f] uppercase tracking-tight">
                Start Free Trial
              </h2>
              <p className="text-orange-600 text-[10px] font-bold uppercase tracking-widest mt-1">
                3 Days Free Trial Classes
              </p>
            </div>

            {/* Form Section */}
            <div className="p-6 md:p-8">
              <form className="space-y-4" onSubmit={handleSubmit}>
                
                {/* Row 1: Parent Name & Student Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <FaUser className="absolute top-3.5 left-3 text-gray-400 text-sm" />
                    <input 
                      type="text" 
                      name="parentName"
                      required
                      placeholder="Your Name (Parent)" 
                      onChange={handleChange}
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-xs font-bold text-gray-700" 
                    />
                  </div>
                  <div className="relative">
                    <FaChild className="absolute top-3.5 left-3 text-gray-400 text-sm" />
                    <input 
                      type="text" 
                      name="studentName"
                      required
                      placeholder="Student Name" 
                      onChange={handleChange}
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-xs font-bold text-gray-700" 
                    />
                  </div>
                </div>

                {/* Row 2: WhatsApp & Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <FaWhatsapp className="absolute top-3.5 left-3 text-gray-400 text-sm" />
                    <input 
                      type="tel" 
                      name="whatsapp"
                      required
                      placeholder="WhatsApp No." 
                      onChange={handleChange}
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-xs font-bold text-gray-700" 
                    />
                  </div>
                  <div className="relative">
                    <FaGlobe className="absolute top-3.5 left-3 text-gray-400 text-sm" />
                    <input 
                      type="text" 
                      name="country"
                      required
                      placeholder="Country (e.g. UK)" 
                      onChange={handleChange}
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-xs font-bold text-gray-700" 
                    />
                  </div>
                </div>

                {/* Row 3: Age & Students Count */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="absolute top-3.5 left-3 text-gray-400 text-xs font-bold">Age:</span>
                    <input 
                      type="number" 
                      name="age"
                      required
                      placeholder="00" 
                      onChange={handleChange}
                      className="w-full pl-12 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-xs font-bold text-gray-700" 
                    />
                  </div>
                  <div className="relative">
                    <FaUsers className="absolute top-3.5 left-3 text-gray-400 text-sm" />
                    <input 
                      type="number" 
                      name="studentCount"
                      min="1"
                      defaultValue="1"
                      placeholder="Students" 
                      onChange={handleChange}
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-xs font-bold text-gray-700" 
                    />
                  </div>
                </div>

                {/* Row 4: Course Selection */}
                <div className="relative">
                   <FaBookOpen className="absolute top-3.5 left-3 text-gray-400 text-sm" />
                   <select 
                     name="course"
                     required
                     onChange={handleChange}
                     className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-xs font-bold text-gray-500 cursor-pointer appearance-none"
                   >
                    <option value="">Select a Course</option>
                    <option value="Noorani Qaida">Noorani Qaida (Beginners)</option>
                    <option value="Quran Reading">Quran Reading (Nazra)</option>
                    <option value="Tajweed Course">Tajweed Course</option>
                    <option value="Hifz-e-Quran">Hifz-e-Quran</option>
                    <option value="Islamic Studies">Islamic Studies</option>
                    <option value="Arabic Language">Arabic Language</option>
                  </select>
                </div>

                {/* Row 5: Description / Message (NEW) */}
                <div className="relative">
                  <FaCommentDots className="absolute top-3.5 left-3 text-gray-400 text-sm" />
                  <textarea 
                    name="description"
                    rows="3"
                    placeholder="Any Message? (e.g. I want female tutor, timings 5pm etc.)"
                    onChange={handleChange}
                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-xs font-medium text-gray-700 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="w-full bg-[#001f3f] text-white font-black py-4 rounded-xl uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-2"
                >
                  <FaWhatsapp size={18} /> Send Request on WhatsApp
                </button>

              </form>
              
              <p className="text-center text-[9px] text-gray-400 mt-4 font-medium">
                Your privacy is our priority.
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default FloatingRegister;