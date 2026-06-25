import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { countries } from 'countries-list'; // 🚀 Global world data array imported
import { 
  FaUserPlus, FaTimes, FaUser, FaWhatsapp, FaEnvelope, FaGlobe, 
  FaClock, FaBookOpen, FaCommentDots, FaCheckCircle, FaPlus, FaTrash, FaChild 
} from 'react-icons/fa';

const FloatingRegister = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); 
  
  const [parentData, setParentData] = useState({
    parentName: '', 
    countryCode: '+44', 
    whatsapp: '', 
    email: '', 
    country: '', 
    timezone: '', 
    preferredTimeSlot: '', 
    course: '', 
    description: ''
  });

  const [students, setStudents] = useState([{ studentName: '', age: '', gender: '' }]);

  // 🚀 NAYA: Duniya ke saare deshon ke names nikalne ka array logic
  const countryNamesList = useMemo(() => {
    return Object.values(countries)
      .map(c => c.name)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b));
  }, []);

  const countryCodesList = useMemo(() => {
    return Object.values(countries)
      .map(c => ({
        code: `+${c.phone}`,
        name: c.name
      }))
      .filter((value, index, self) =>
        self.findIndex(t => t.code === value.code) === index
      )
      .sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));
  }, []);

  const handleParentChange = (e) => {
    setParentData({ ...parentData, [e.target.name]: e.target.value });
  };

  const handleStudentChange = (index, e) => {
    const updatedStudents = [...students];
    updatedStudents[index][e.target.name] = e.target.value;
    setStudents(updatedStudents);
  };

  const addStudentRow = () => {
    setStudents([...students, { studentName: '', age: '', gender: '' }]);
  };

  const removeStudentRow = (index) => {
    if (students.length > 1) {
      setStudents(students.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalWhatsAppNumber = parentData.whatsapp 
      ? `${parentData.countryCode} ${parentData.whatsapp}` 
      : 'Not Provided';

    try {
      await axios.post('http://localhost:5000/api/public/register', {
        ...parentData,
        whatsapp: finalWhatsAppNumber, 
        students: students
      });
      setIsSubmitted(true);
    } catch (err) {
      alert("Frontend Submit Error: " + err.message);
    }
  };

  const handleWhatsAppRedirect = () => {
    let studentsText = '';
    students.forEach((st, idx) => {
      studentsText += `👶 *Student #${idx + 1}:* ${st.studentName} (${st.age} Yrs - ${st.gender})%0A`;
    });

    const finalWhatsAppNumber = parentData.whatsapp 
      ? `${parentData.countryCode} ${parentData.whatsapp}` 
      : 'Not Provided';

    const message = `*🚨 New Registration Request (Quran Azeem)*%0A%0A` +
      `👤 *Parent Name:* ${parentData.parentName}%0A` +
      `📞 *WhatsApp:* ${finalWhatsAppNumber}%0A` +
      `📧 *Email:* ${parentData.email || 'Not Provided'}%0A` +
      `🌍 *Country:* ${parentData.country}%0A` +
      `🕒 *Timezone:* ${parentData.timezone}%0A` +
      `⏰ *Preferred Slot:* ${parentData.preferredTimeSlot}%0A` +
      `📖 *Course:* ${parentData.course}%0A%0A` +
      `*Enrolled Students:*%0A${studentsText}`;

    const phoneNumber = "923485654503"; 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    handleClose();
  };

  const handleClose = () => { 
    setIsOpen(false); 
    setIsSubmitted(false); 
    setParentData({
      parentName: '', countryCode: '+44', whatsapp: '', email: '', 
      country: '', timezone: '', preferredTimeSlot: '', course: '', description: ''
    });
    setStudents([{ studentName: '', age: '', gender: '' }]); 
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="fixed bottom-20 right-4 md:bottom-24 md:right-6 bg-orange-600 text-white px-4 md:px-6 py-3 rounded-full shadow-2xl z-[90] flex items-center gap-2 font-black uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-orange-700 hover:scale-110 transition-all animate-pulse border-2 border-white/20"
      >
        <FaUserPlus size={16} /><span className="hidden sm:inline">Register Free Trial</span><span className="sm:hidden">Register</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-[#001f3f]/85 backdrop-blur-sm z-[200] flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-xl max-h-[95vh] overflow-y-auto shadow-2xl relative p-5 sm:p-6 md:p-8 scrollbar-hide">
<button 
  onClick={handleClose} 
  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 flex items-center justify-center text-white bg-[#001f3f] hover:bg-red-500 rounded-full transition-all duration-200 hover:rotate-90 shadow-md z-10"
>
  <FaTimes size={15} />
</button>
            {!isSubmitted ? (
              <>
                <div className="text-center mb-6 pt-2">
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <FaUserPlus className="text-orange-600" size={22} />
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#001f3f] uppercase tracking-tight">Start Free Trial</h2>
                  <p className="text-orange-600 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-1">Quran Azeem Professional Flow</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  {/* Step 1 */}
                  <div className="bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-100 space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-full bg-[#001f3f] text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">1</span>
                      <p className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Parent Contact Info</p>
                    </div>

                    <div className="relative">
                      <FaUser className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 text-sm" />
                      <input type="text" name="parentName" required value={parentData.parentName} placeholder="Parent Full Name" onChange={handleParentChange} className="w-full pl-10 p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-xs font-bold text-gray-700 transition-all" />
                    </div>

                    <div className="flex gap-2">
                      <div className="w-24 sm:w-28 relative flex-shrink-0">
                        <input list="modal-form-country-codes" name="countryCode" value={parentData.countryCode} onChange={handleParentChange} placeholder="+44" className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-xs font-bold text-gray-700 text-center transition-all" />
                        <datalist id="modal-form-country-codes">
                          {countryCodesList.map((country, idx) => (
                            <option key={idx} value={country.code}>{country.name} ({country.code})</option>
                          ))}
                        </datalist>
                      </div>
                      <div className="relative flex-1">
                        <FaWhatsapp className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 text-sm" />
                        <input type="tel" name="whatsapp" value={parentData.whatsapp} placeholder="WhatsApp No (Optional)" onChange={handleParentChange} className="w-full pl-10 p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-xs font-bold text-gray-700 transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 text-sm" />
                        <input type="email" name="email" value={parentData.email} placeholder="Email Address *" required onChange={handleParentChange} className="w-full pl-10 p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-xs font-bold text-gray-700 transition-all" />
                      </div>
                      
                      {/* 🚀 SMART HYBRID SELECTOR FOR COUNTRY INSIDE MODAL */}
                      <div className="relative">
                        <FaGlobe className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 text-sm" />
                        <input 
                          type="text" 
                          name="country" 
                          list="modal-countries-datalist" 
                          required 
                          value={parentData.country} 
                          placeholder="Country (e.g. USA, UK)" 
                          onChange={handleParentChange} 
                          className="w-full pl-10 p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-xs font-bold text-gray-700 transition-all" 
                        />
                        <datalist id="modal-countries-datalist">
                          {countryNamesList.map((cName, idx) => (
                            <option key={idx} value={cName} />
                          ))}
                        </datalist>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <FaGlobe className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 text-sm" />
                        <input type="text" name="timezone" required value={parentData.timezone} placeholder="Timezone (e.g. EST, GMT)" onChange={handleParentChange} className="w-full pl-10 p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-xs font-bold text-gray-700 transition-all" />
                      </div>
                      <div className="relative">
                        <FaClock className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 text-sm" />
                        <input type="text" name="preferredTimeSlot" required value={parentData.preferredTimeSlot} placeholder="Preferred Class Time (e.g. 6 PM)" onChange={handleParentChange} className="w-full pl-10 p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-xs font-bold text-gray-700 transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Students details */}
                  <div className="bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-100 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#001f3f] text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">2</span>
                      <p className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Students Details</p>
                    </div>

                    {students.map((student, index) => (
                      <div key={index} className="bg-white p-3 rounded-xl border border-gray-200 flex flex-col sm:flex-row gap-2 sm:items-center relative">
                        <div className="relative flex-1 w-full">
                          <FaChild className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 text-xs" />
                          <input type="text" name="studentName" required value={student.studentName} placeholder={`Student #${index + 1} Name`} onChange={(e) => handleStudentChange(index, e)} className="w-full pl-8 p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none focus:border-orange-400 transition-all" />
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <input type="number" name="age" required value={student.age} placeholder="Age" onChange={(e) => handleStudentChange(index, e)} className="w-1/2 sm:w-20 p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none focus:border-orange-400 transition-all" />
                          <select name="gender" required value={student.gender} onChange={(e) => handleStudentChange(index, e)} className="w-1/2 sm:w-32 p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-500 cursor-pointer focus:outline-none focus:border-orange-400 transition-all">
                            <option value="">Gender</option><option value="Male">Male</option><option value="Female">Female</option>
                          </select>
                          {students.length > 1 && (
                            <button type="button" onClick={() => removeStudentRow(index)} className="text-red-500 hover:text-red-700 px-2.5 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors flex-shrink-0">
                              <FaTrash size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* 🚀 Clear, self-explanatory Add Student button */}
                    <button 
                      type="button" 
                      onClick={addStudentRow} 
                      className="w-full bg-orange-50 hover:bg-orange-100 border-2 border-dashed border-orange-300 hover:border-orange-400 text-orange-600 text-xs font-black px-4 py-3 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider transition-all active:scale-95"
                    >
                      <FaPlus size={12} /> Add Another Student / Child
                    </button>
                  </div>

                  {/* Step 3: Course & notes */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#001f3f] text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">3</span>
                      <p className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Course & Notes</p>
                    </div>
                    <div className="relative">
                      <FaBookOpen className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 text-sm" />
                      <select name="course" required value={parentData.course} onChange={handleParentChange} className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-xs font-bold text-gray-500 cursor-pointer appearance-none transition-all">
                        <option value="">Select Target Course</option><option value="Noorani Qaida">Noorani Qaida (Beginners)</option><option value="Quran Reading">Quran Reading (Nazra)</option><option value="Tajweed Course">Tajweed Course</option><option value="Hifz-e-Quran">Hifz-e-Quran</option><option value="Islamic Studies">Islamic Studies</option>
                      </select>
                    </div>
                    <div className="relative">
                      <FaCommentDots className="absolute top-3.5 left-3 text-gray-400 text-sm" />
                      <textarea name="description" value={parentData.description} rows="2" placeholder="Any special requests..." onChange={handleParentChange} className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-xs font-medium text-gray-700 resize-none transition-all"></textarea>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-[#001f3f] text-white font-black py-4 rounded-xl uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-2">
                    Submit Application
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <FaCheckCircle className="text-green-500 mx-auto mb-4 animate-bounce" size={54} />
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#001f3f] uppercase tracking-tight">Thanks For Registering!</h2>
                <p className="text-gray-500 text-xs font-medium mt-2 max-w-sm mx-auto leading-relaxed">Your details have been successfully recorded in our dashboard.</p>
                <div className="mt-8 space-y-3">
                  <button onClick={handleWhatsAppRedirect} className="w-full bg-[#16a34a] text-white font-black py-3 rounded-xl uppercase tracking-widest text-[10px] hover:bg-green-700 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md">
                    <FaWhatsapp size={16} /> Also Send on WhatsApp (Optional)
                  </button>
                  <button onClick={handleClose} className="w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95">
                    Close Window
                  </button>
                </div>
              </div>
            )}
            <p className="text-center text-[9px] text-gray-400 mt-4 font-medium">Your privacy is our priority.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingRegister;