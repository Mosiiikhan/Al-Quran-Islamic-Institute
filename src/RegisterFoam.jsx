import React, { useState, useEffect, useMemo } from 'react';
import { countries } from 'countries-list';
import { 
  FaUserPlus, FaTimes, FaUser, FaWhatsapp, FaEnvelope, FaGlobe, 
  FaClock, FaBookOpen, FaCommentDots, FaCheckCircle, FaPlus, FaTrash, 
  FaChild, FaUserGraduate
} from 'react-icons/fa';

const FloatingRegister = ({ selectedCourseName = "", isExplicitOpen = false, onExplicitClose = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 🎯 Switcher: 'myself' ya 'child'
  const [registerFor, setRegisterFor] = useState('child'); 

  const [parentData, setParentData] = useState({
    parentName: '', 
    countryCode: '+1', 
    whatsapp: '', 
    email: '', 
    country: '', 
    timezone: '', 
    preferredTimeSlot: 'Evening (Flexible)', 
    course: '', 
    preferredTutorGender: 'Any (Qualified)',
    description: '',
    myAge: '',
    myGender: 'Male'
  });

  const [students, setStudents] = useState([{ studentName: '', age: '', gender: '' }]);

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
      .map(c => ({
        code: `+${c.phone}`,
        name: c.name
      }))
      .filter((value, index, self) =>
        self.findIndex(t => t.code === value.code) === index
      )
      .sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));
  }, []);

  useEffect(() => {
    if (isExplicitOpen) setIsOpen(true);
    if (selectedCourseName) {
      setParentData(prev => ({ ...prev, course: selectedCourseName }));
    }
  }, [selectedCourseName, isExplicitOpen]);

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    if (name === 'country') {
      const detectedCode = rawCountryMap[value.trim().toLowerCase()];
      setParentData(prev => ({
        ...prev,
        country: value,
        countryCode: detectedCode ? detectedCode : prev.countryCode
      }));
    } else {
      setParentData(prev => ({ ...prev, [name]: value }));
    }
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

  // 🚀 Direct WhatsApp Submission Function
  const handleSubmit = (e) => {
    e.preventDefault();

    let studentDetailsText = '';
    if (registerFor === 'myself') {
      studentDetailsText = `👤 *Student:* ${parentData.parentName} (${parentData.myAge ? parentData.myAge + ' Yrs - ' : ''}${parentData.myGender})`;
    } else {
      students.forEach((st, idx) => {
        studentDetailsText += `👶 *Child #${idx + 1}:* ${st.studentName} (${st.age} Yrs - ${st.gender})\n`;
      });
    }

    const finalWhatsAppNumber = `${parentData.countryCode} ${parentData.whatsapp}`.trim();

    const formattedMessage = 
      `*🚨 New Free Trial Registration - Al Quran Islamic Institute*\n\n` +
      `📌 *Registration For:* ${registerFor === 'myself' ? 'Adult (Myself)' : 'Child / Children'}\n` +
      `👤 *Name:* ${parentData.parentName}\n` +
      `📞 *Phone/WhatsApp:* ${finalWhatsAppNumber}\n` +
      `📧 *Email:* ${parentData.email || 'Not Provided'}\n` +
      `🌍 *Country:* ${parentData.country}\n` +
      `🕒 *Timezone / City:* ${parentData.timezone || 'Not Specified'}\n` +
      `⏰ *Preferred Slot:* ${parentData.preferredTimeSlot}\n` +
      `📖 *Selected Course:* ${parentData.course}\n` +
      `🧕 *Tutor Preference:* ${parentData.preferredTutorGender}\n\n` +
      `*Student Details:*\n${studentDetailsText}\n` +
      `📝 *Notes/Background:* ${parentData.description || 'None'}`;

    const phoneNumber = "923485654503";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedMessage)}`;

    // User ko direct WhatsApp par bhej dein
    window.open(whatsappURL, '_blank');
    setIsSubmitted(true);
  };

  const handleClose = () => { 
    setIsOpen(false); 
    setIsSubmitted(false); 
    setParentData({
      parentName: '', countryCode: '+1', whatsapp: '', email: '', 
      country: '', timezone: '', preferredTimeSlot: 'Evening (Flexible)', course: '', 
      preferredTutorGender: 'Any (Qualified)', description: '', myAge: '', myGender: 'Male'
    });
    setStudents([{ studentName: '', age: '', gender: '' }]); 
    if (onExplicitClose) onExplicitClose();
  };

  return (
    <>
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
        <div className="fixed inset-0 bg-[#001f3f]/85 backdrop-blur-sm z-[200] flex items-center justify-center p-2.5 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl relative p-5 sm:p-7 md:p-8 scrollbar-hide">
            
            <button 
              onClick={handleClose} 
              aria-label="Close modal"
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white bg-[#001f3f] hover:bg-red-500 rounded-full transition-all duration-200 shadow-md z-10"
            >
              <FaTimes size={14} />
            </button>
            
            {!isSubmitted ? (
              <>
                <div className="text-center mb-4 pt-1">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-2 text-orange-600">
                    <FaUserPlus size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#001f3f] tracking-tight">
                    Start Your 3-Day Free Trial
                  </h2>
                  <p className="text-orange-600 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                    Direct WhatsApp Fast-Track Booking
                  </p>
                </div>

                {/* Switcher Myself vs Child */}
                <div className="mb-4">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 block mb-1.5 text-center">
                    Who is this admission for?
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setRegisterFor('child')}
                      className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                        registerFor === 'child'
                          ? 'bg-[#001f3f] text-white shadow-md'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FaChild size={13} /> For My Child / Children
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegisterFor('myself')}
                      className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                        registerFor === 'myself'
                          ? 'bg-[#001f3f] text-white shadow-md'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FaUserGraduate size={13} /> For Myself (Adult)
                    </button>
                  </div>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  
                  {/* Step 1: Contact Details */}
                  <div className="bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-100 space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-full bg-[#001f3f] text-white text-[10px] font-black flex items-center justify-center shrink-0">1</span>
                      <p className="text-[11px] font-black uppercase text-slate-600 tracking-wider">
                        {registerFor === 'myself' ? "Your Contact & Location" : "Parent Contact & Location"}
                      </p>
                    </div>

                    <div className="relative">
                      <FaGlobe className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-400 text-xs" />
                      <input 
                        type="text" 
                        name="country" 
                        list="modal-countries-datalist" 
                        required 
                        value={parentData.country} 
                        placeholder="Select Country (e.g. USA, UK, Germany, Canada)" 
                        onChange={handleParentChange} 
                        className="w-full pl-9 p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 text-xs font-bold text-slate-800 transition-all" 
                      />
                      <datalist id="modal-countries-datalist">
                        {countryNamesList.map((cName, idx) => (
                          <option key={idx} value={cName} />
                        ))}
                      </datalist>
                    </div>

                    <div className="relative">
                      <FaUser className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-400 text-xs" />
                      <input 
                        type="text" 
                        name="parentName" 
                        required 
                        value={parentData.parentName} 
                        placeholder={registerFor === 'myself' ? "Your Full Name" : "Parent / Guardian Full Name"}
                        onChange={handleParentChange} 
                        className="w-full pl-9 p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 text-xs font-bold text-slate-800 transition-all" 
                      />
                    </div>

                    <div className="flex gap-2">
                      <div className="w-24 sm:w-28 relative shrink-0">
                        <input 
                          list="modal-form-country-codes" 
                          name="countryCode" 
                          value={parentData.countryCode} 
                          onChange={handleParentChange} 
                          placeholder="+1" 
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 text-xs font-bold text-slate-800 text-center transition-all" 
                        />
                        <datalist id="modal-form-country-codes">
                          {countryCodesList.map((country, idx) => (
                            <option key={idx} value={country.code}>{country.name} ({country.code})</option>
                          ))}
                        </datalist>
                      </div>
                      <div className="relative flex-1">
                        <FaWhatsapp className="absolute top-1/2 -translate-y-1/2 left-3 text-emerald-500 text-xs" />
                        <input 
                          type="tel" 
                          name="whatsapp" 
                          value={parentData.whatsapp} 
                          placeholder="Your WhatsApp Number" 
                          required 
                          onChange={handleParentChange} 
                          className="w-full pl-9 p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 text-xs font-bold text-slate-800 transition-all" 
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-400 text-xs" />
                      <input 
                        type="email" 
                        name="email" 
                        value={parentData.email} 
                        placeholder="Email Address (Optional)" 
                        onChange={handleParentChange} 
                        className="w-full pl-9 p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 text-xs font-bold text-slate-800 transition-all" 
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="relative">
                        <FaGlobe className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-400 text-xs" />
                        <input 
                          type="text" 
                          name="timezone" 
                          value={parentData.timezone} 
                          placeholder="City / State (e.g. Dallas, London)" 
                          onChange={handleParentChange} 
                          className="w-full pl-9 p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 text-xs font-bold text-slate-800 transition-all" 
                        />
                      </div>
                      <div className="relative">
                        <FaClock className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-400 text-xs" />
                        <select 
                          name="preferredTimeSlot" 
                          value={parentData.preferredTimeSlot} 
                          onChange={handleParentChange}
                          className="w-full pl-9 p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 text-xs font-bold text-slate-700 cursor-pointer transition-all"
                        >
                          <option value="Evening (Flexible)">Evening (After Work / School)</option>
                          <option value="Morning (Flexible)">Morning Slot</option>
                          <option value="Weekend (Sat & Sun)">Weekend Only</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Students Details */}
                  {registerFor === 'myself' ? (
                    <div className="bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-100 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#001f3f] text-white text-[10px] font-black flex items-center justify-center shrink-0">2</span>
                        <p className="text-[11px] font-black uppercase text-slate-600 tracking-wider">Your Student Profile</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">Your Age (Optional)</label>
                          <input 
                            type="number" 
                            name="myAge" 
                            value={parentData.myAge} 
                            placeholder="e.g. 24" 
                            onChange={handleParentChange} 
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-orange-500 text-center" 
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">Gender</label>
                          <select 
                            name="myGender" 
                            value={parentData.myGender} 
                            onChange={handleParentChange} 
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer focus:outline-none focus:border-orange-500"
                          >
                            <option value="Male">Brother (Male)</option>
                            <option value="Female">Sister (Female)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-100 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#001f3f] text-white text-[10px] font-black flex items-center justify-center shrink-0">2</span>
                        <p className="text-[11px] font-black uppercase text-slate-600 tracking-wider">Child / Children Details</p>
                      </div>

                      {students.map((student, index) => (
                        <div key={index} className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-2 sm:items-center">
                          <div className="relative flex-1 w-full">
                            <FaChild className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-400 text-xs" />
                            <input 
                              type="text" 
                              name="studentName" 
                              required 
                              value={student.studentName} 
                              placeholder={`Child #${index + 1} Name`} 
                              onChange={(e) => handleStudentChange(index, e)} 
                              className="w-full pl-8 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:border-orange-400 transition-all" 
                            />
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <input 
                              type="number" 
                              name="age" 
                              required 
                              value={student.age} 
                              placeholder="Age" 
                              onChange={(e) => handleStudentChange(index, e)} 
                              className="w-1/2 sm:w-20 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:border-orange-400 text-center" 
                            />
                            <select 
                              name="gender" 
                              required 
                              value={student.gender} 
                              onChange={(e) => handleStudentChange(index, e)} 
                              className="w-1/2 sm:w-28 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 cursor-pointer focus:outline-none focus:border-orange-400"
                            >
                              <option value="">Gender</option>
                              <option value="Male">Boy (Male)</option>
                              <option value="Female">Girl (Female)</option>
                            </select>
                            {students.length > 1 && (
                              <button 
                                type="button" 
                                onClick={() => removeStudentRow(index)} 
                                className="text-red-500 hover:text-red-700 px-2 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center shrink-0"
                              >
                                <FaTrash size={11} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}

                      <button 
                        type="button" 
                        onClick={addStudentRow} 
                        className="w-full bg-orange-50 hover:bg-orange-100 border border-dashed border-orange-300 text-orange-600 text-[11px] font-black px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 uppercase tracking-wider transition-all active:scale-95"
                      >
                        <FaPlus size={10} /> Add Another Child
                      </button>
                    </div>
                  )}

                  {/* Step 3: Course & Teacher */}
                  <div className="bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-100 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#001f3f] text-white text-[10px] font-black flex items-center justify-center shrink-0">3</span>
                      <p className="text-[11px] font-black uppercase text-slate-600 tracking-wider">Course & Tutor Preference</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="relative">
                        <FaBookOpen className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-400 text-xs" />
                        <select 
                          name="course" 
                          required 
                          value={parentData.course} 
                          onChange={handleParentChange} 
                          className="w-full pl-9 p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 text-xs font-bold text-slate-700 cursor-pointer transition-all"
                        >
                          <option value="">Select Target Course</option>
                          <option value="Noorani Qaida for Beginners">Noorani Qaida (Beginners)</option>
                          <option value="Quran Reading with Tajweed">Quran Reading with Tajweed</option>
                          <option value="Quran Memorization (Hifz)">Quran Memorization (Hifz)</option>
                          <option value="Quran Recitation with Tarteel">Quran Recitation with Tarteel</option>
                          <option value="Islamic Studies & Duas for Kids">Islamic Studies for Kids</option>
                          <option value="Quran Translation & Tafseer">Quran Translation & Tafseer</option>
                        </select>
                      </div>

                      <div className="relative">
                        <select 
                          name="preferredTutorGender" 
                          value={parentData.preferredTutorGender} 
                          onChange={handleParentChange} 
                          className="w-full px-3 p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 text-xs font-bold text-slate-700 cursor-pointer transition-all"
                        >
                          <option value="Any Qualified">Tutor Preference: Any</option>
                          <option value="Female Tutor">Female Teacher (For Sisters/Girls)</option>
                          <option value="Male Tutor">Male Teacher (Qari / Hafiz)</option>
                        </select>
                      </div>
                    </div>

                    <div className="relative">
                      <FaCommentDots className="absolute top-3 left-3 text-slate-400 text-xs" />
                      <textarea 
                        name="description" 
                        value={parentData.description} 
                        rows="2" 
                        placeholder="Any special notes or learning requirements..." 
                        onChange={handleParentChange} 
                        className="w-full pl-9 p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 text-xs font-normal text-slate-700 resize-none transition-all"
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button -> Direct WhatsApp Trigger */}
                  <button 
                    type="submit" 
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FaWhatsapp size={18} />
                    Send Application on WhatsApp
                  </button>

                </form>
              </>
            ) : (
              /* Success Screen */
              <div className="text-center py-6 sm:py-8">
                <FaCheckCircle className="text-emerald-500 mx-auto mb-3 animate-bounce" size={56} />
                <h2 className="text-xl sm:text-2xl font-black text-[#001f3f] tracking-tight">
                  JazakAllah Khair! Application Sent
                </h2>
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 my-4 max-w-md mx-auto text-left space-y-2">
                  <p className="text-emerald-900 text-xs font-bold flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-600 shrink-0" />
                    Opening WhatsApp to connect you directly with our coordinator.
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Our team will reply to your WhatsApp message shortly to confirm your tutor and trial schedule.
                  </p>
                </div>

                <div className="mt-6 space-y-2.5 max-w-sm mx-auto">
                  <button 
                    type="button"
                    onClick={handleSubmit} 
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black py-3 rounded-xl uppercase tracking-wider text-xs transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md"
                  >
                    <FaWhatsapp size={16} /> Re-Open WhatsApp
                  </button>

                  <button 
                    type="button"
                    onClick={handleClose} 
                    className="w-full bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-slate-200 transition-all active:scale-95"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}

            <p className="text-center text-[10px] text-slate-400 mt-3 font-medium">
              🔒 100% Confidential • Instant response guaranteed.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingRegister;