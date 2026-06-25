import React, { useState } from 'react';

// ─── ADMIN COURSE FORM MODAL (ADD / EDIT) ───────────────────────────────────
export const AdminCourseFormModal = ({ course, onClose, onSave }) => {
  const isEdit = !!course;
  const [form, setForm] = useState({
    title: course?.title || '',
    level: course?.level || 'Beginner',
    price: course?.price || '',
    duration: course?.duration || '',
    students: course?.students || 0,
    desc: course?.desc || '',
    detail: course?.detail || '',
    iconKey: course?.iconKey || 'bookOpen',
    color: course?.color || 'from-teal-500 to-teal-700'
  });

  const field = { display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12 };
  const label = { fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: '#64748b' };
  const input = { padding: '9px 11px', borderRadius: 8, border: '0.5px solid #e2e8f0', fontSize: 13, color: '#0f172a', outline: 'none', background: '#fff' };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(12,31,28,0.45)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 16 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 14, width: 500, maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto', padding: 22, boxShadow: '0 24px 64px rgba(12,31,28,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{isEdit ? 'Edit Live Package' : 'Publish New Core Program'}</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>✕</button>
        </div>
        
        <div style={field}><label style={label}>Program Title *</label><input style={input} value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Tajweed-ul-Quran" /></div>
        <div style={field}><label style={label}>Short Card Description *</label><input style={input} value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} placeholder="Short text for grid preview card..." /></div>
        <div style={field}><label style={label}>Detailed Modal Text *</label><textarea style={{...input, minHeight: 60}} value={form.detail} onChange={e => setForm({...form, detail: e.target.value})} placeholder="Deep programmatic analysis rules detail..." /></div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={field}><label style={label}>Level</label><select style={input} value={form.level} onChange={e => setForm({...form, level: e.target.value})}>{['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(l => <option key={l} value={l}>{l}</option>)}</select></div>
          <div style={field}><label style={label}>Session Duration</label><input style={input} value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} placeholder="e.g. 40 Mins" /></div>
          <div style={field}><label style={label}>Monthly Price</label><input style={input} value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="e.g. $45.00" /></div>
          <div style={field}><label style={label}>Students Count</label><input style={input} type="number" value={form.students} onChange={e => setForm({...form, students: Number(e.target.value)})} /></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={field}><label style={label}>Icon Key Mapping</label><select style={input} value={form.iconKey} onChange={e => setForm({...form, iconKey: e.target.value})}>{['leaf', 'bookOpen', 'crown', 'star', 'bookReader', 'microphone', 'language', 'layerGroup', 'moon', 'heart'].map(k => <option key={k} value={k}>{k}</option>)}</select></div>
          <div style={field}><label style={label}>Tailwind Gradient Color CSS</label><input style={input} value={form.color} onChange={e => setForm({...form, color: e.target.value})} placeholder="from-blue-500 to-blue-700" /></div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '9px 0', borderRadius: 8, background: '#fff', border: '0.5px solid #e2e8f0', cursor: 'pointer' }}>Cancel</button>
          <button 
  onClick={() => onSave(course?._id, form)} 
  style={{ flex: 1, padding: '9px 0', borderRadius: 8, fontWeight: 600, background: '#0f766e', border: 'none', color: '#fff', cursor: 'pointer' }}
>
  Publish Program
</button>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN COURSES MANAGEMENT MODULE COMPONENT ────────────────────────────────
const CoursesModule = ({ courses = [], onAddCourse, onUpdateCourse, onDeleteCourse, ActionBtn, S, T }) => {
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [modalData, setModalData] = useState(null); 

  const levelColor = { 
    'Beginner': { bg: T.greenBg, border: T.greenBd, color: T.green }, 
    'Intermediate': { bg: T.amberBg, border: T.amberBd, color: T.amber }, 
    'Advanced': { bg: T.violetBg, border: T.violetBd, color: T.violet }, 
    'All Levels': { bg: T.accentSoft, border: '#99f6e4', color: T.accent } 
  };

  // 🚀 SAFETY CHECK: Fallback grid mapping taake array pass na hone par filtered render crash na kare
  const safeCourses = Array.isArray(courses) ? courses : [];

  const filtered = safeCourses.filter(c => {
    if (!c) return false;
    const matchesLevel = levelFilter === 'All' || c.level === levelFilter;
    const matchesQuery = (c.title || '').toLowerCase().includes(query.toLowerCase());
    return matchesLevel && matchesQuery;
  });

  const handleSave = async (id, formData) => {
    if (modalData.mode === 'edit') {
      await onUpdateCourse(id, formData);
    } else {
      await onAddCourse(formData);
    }
    setModalData(null);
  };

  return (
    <div>
      <div style={S.pageTitle}>Manage Courses</div>
      <div style={S.pageSub}>Add, edit, or remove live Quranic packages and styles dynamic mappings.</div>
      
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          value={query} 
          onChange={e => setQuery(e.target.value)} 
          placeholder="Search course title..." 
          style={{ padding: '7px 10px', borderRadius: 7, border: '0.5px solid #e2e8f0', fontSize: 12, width: 240 }} 
        />
        <select 
          value={levelFilter} 
          onChange={e => setLevelFilter(e.target.value)} 
          style={{ padding: '7px 10px', borderRadius: 7, border: '0.5px solid #e2e8f0', fontSize: 12, background: '#fff' }}
        >
          {['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(l => <option key={l} value={l}>{l === 'All' ? 'All levels' : l}</option>)}
        </select>
        <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 'auto' }}>{filtered.length} of {safeCourses.length} shown</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
        {filtered.map(c => {
          const lc = levelColor[c.level] || levelColor['All Levels'];
          return (
            <div key={c._id} style={{ background: '#ffffff', border: '0.5px solid #e2e8f0', borderRadius: 12, padding: 18, position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ background: lc.bg, border: `0.5px solid ${lc.border}`, color: lc.color, borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{c.level}</span>
                <div>
                  <ActionBtn icon="edit" color="#6d28d9" hoverBg="#faf5ff" hoverBorder="#ddd6fe" onClick={() => setModalData({ mode: 'edit', course: c })} />
                  <ActionBtn icon="trash" color="#dc2626" hoverBg="#fef2f2" hoverBorder="#fecaca" onClick={() => onDeleteCourse(c._id)} />
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>{c.title}</div>
              <p style={{ fontSize: 11, color: '#64748b', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 12, height: 32 }}>{c.desc}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, borderTop: '0.5px solid #f1f5f9', paddingTop: 10 }}>
                {[{ l: 'Price', v: c.price }, { l: 'Duration', v: c.duration }, { l: 'Students', v: c.students }].map((item, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: 9, color: '#94a3b8' }}>{item.l}</div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: '#334155' }}>{item.v}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        
        {/* ADD NEW CARD BUTTON */}
        <div 
          onClick={() => setModalData({ mode: 'add' })}
          style={{ background: 'none', border: '0.5px dashed #cbd5e1', borderRadius: 12, padding: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 160, cursor: 'pointer', gap: 6 }}
        >
          <div style={{ fontSize: 24, fontWeight: 300, color: '#94a3b8' }}>+</div>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8' }}>Add New Course</div>
        </div>
      </div>

      {modalData && (
        <AdminCourseFormModal 
          course={modalData.course} 
          onClose={() => setModalData(null)} 
          onSave={handleSave} 
        />
      )}
    </div>
  );
};

export default CoursesModule;