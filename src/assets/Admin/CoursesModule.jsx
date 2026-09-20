import React, { useState } from 'react';

// ─── ICON PREVIEW MAP ────────────────────────────────────────────────────────
const iconEmoji = {
  leaf: '🍃', bookOpen: '📖', crown: '👑', star: '⭐',
  bookReader: '📚', microphone: '🎤', language: '🌐',
  layerGroup: '📑', moon: '🌙', heart: '❤️'
};

const levelConfig = {
  'Beginner':     { bg: '#f0fdf4', border: '#86efac', color: '#16a34a', dot: '#22c55e' },
  'Intermediate': { bg: '#fffbeb', border: '#fcd34d', color: '#d97706', dot: '#f59e0b' },
  'Advanced':     { bg: '#faf5ff', border: '#d8b4fe', color: '#7c3aed', dot: '#8b5cf6' },
  'All Levels':   { bg: '#f0fdfa', border: '#99f6e4', color: '#0d9488', dot: '#14b8a6' },
};

// Helper to preview slug in real-time
const slugify = (text = '') => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ─── MODAL ───────────────────────────────────────────────────────────────────
export const AdminCourseFormModal = ({ course, onClose, onSave }) => {
  const isEdit = !!course;
  const [form, setForm] = useState({
    title:      course?.title      || '',
    slug:       course?.slug       || '',
    level:      course?.level      || 'Beginner',
    price:      course?.price      || '',
    duration:   course?.duration   || '',
    students:   course?.students   || 0,
    desc:       course?.desc       || '',
    detail:     course?.detail     || '',
    iconKey:    course?.iconKey    || 'bookOpen',
    color:      course?.color      || 'from-teal-500 to-teal-700',
    isFeatured: course?.isFeatured !== undefined ? course.isFeatured : true,
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleTitleChange = (val) => {
    setForm(p => ({
      ...p,
      title: val,
      // Agar edit mode na ho ya custom slug na ho to title se auto slug generate ho
      slug: slugify(val)
    }));
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,15,31,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 16 }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 560, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(0,20,40,0.3)', display: 'flex', flexDirection: 'column' }}
      >
        {/* Modal Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 1, borderRadius: '20px 20px 0 0' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>
              {isEdit ? '✏️ Edit Program' : '🚀 Add New Program'}
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
              {isEdit ? 'Update course details and visibility' : 'Fill in the details to publish a new course'}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#64748b' }}
          >✕</button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Title */}
          <Field label="Program Title *">
            <Input value={form.title} onChange={handleTitleChange} placeholder="e.g. Tajweed-ul-Quran for Kids" />
          </Field>

          {/* SEO Slug Preview */}
          <div style={{ background: '#f1f5f9', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#475569' }}>
            <span style={{ fontWeight: 700, color: '#0f766e' }}>SEO URL:</span>
            <span>/courses/{form.slug || slugify(form.title) || 'course-url-slug'}</span>
          </div>

          {/* Featured Toggle Switch */}
          <div style={{ background: form.isFeatured ? '#fefce8' : '#f8fafc', border: `1.5px solid ${form.isFeatured ? '#fef08a' : '#e2e8f0'}`, borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: form.isFeatured ? '#854d0e' : '#334155', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>⭐ Show on Homepage (Featured)</span>
                {form.isFeatured && <span style={{ background: '#ca8a04', color: '#fff', fontSize: 9, padding: '2px 6px', borderRadius: 10, textTransform: 'uppercase' }}>Active</span>}
              </div>
              <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>
                Display this program in the top 4 showcase cards on the main landing page.
              </div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24, cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={form.isFeatured} 
                onChange={e => set('isFeatured', e.target.checked)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute', inset: 0,
                background: form.isFeatured ? '#0d9488' : '#cbd5e1',
                borderRadius: 24, transition: '0.3s',
              }}>
                <span style={{
                  position: 'absolute', height: 18, width: 18, left: form.isFeatured ? 22 : 3, bottom: 3,
                  background: '#fff', borderRadius: '50%', transition: '0.3s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} />
              </span>
            </label>
          </div>

          {/* Short Desc */}
          <Field label="Short Card Description *">
            <Input value={form.desc} onChange={v => set('desc', v)} placeholder="Short teaser text shown on course cards..." />
          </Field>

          {/* Detail */}
          <Field label="Detailed Syllabus Description *">
            <textarea
              value={form.detail}
              onChange={e => set('detail', e.target.value)}
              placeholder="Full description shown on the dedicated course landing page..."
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', minHeight: 75 }}
            />
          </Field>

          {/* Row: Level + Duration */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Level">
              <select value={form.level} onChange={e => set('level', e.target.value)} style={inputStyle}>
                {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(l => <option key={l}>{l}</option>)}
              </select>
            </Field>
            <Field label="Session Duration">
              <Input value={form.duration} onChange={v => set('duration', v)} placeholder="e.g. 30-40 Mins" />
            </Field>
          </div>

          {/* Row: Price + Students */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Monthly Price">
              <Input value={form.price} onChange={v => set('price', v)} placeholder="e.g. $45.00" />
            </Field>
            <Field label="Students Enrolled">
              <input type="number" value={form.students} onChange={e => set('students', Number(e.target.value))} style={inputStyle} min={0} />
            </Field>
          </div>

          {/* Row: Icon + Color */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Icon">
              <select value={form.iconKey} onChange={e => set('iconKey', e.target.value)} style={inputStyle}>
                {Object.entries(iconEmoji).map(([k, v]) => <option key={k} value={k}>{v} {k}</option>)}
              </select>
            </Field>
            <Field label="Gradient Accent Color">
              <Input value={form.color} onChange={v => set('color', v)} placeholder="from-teal-500 to-teal-700" />
            </Field>
          </div>

          {/* Preview chip */}
          <div style={{ background: '#f8fafc', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: 22 }}>{iconEmoji[form.iconKey] || '📖'}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{form.title || 'Program Title Preview'}</div>
              <div style={{ fontSize: 10, color: '#94a3b8' }}>{form.level} · {form.duration || 'Flexible'} · {form.price || '$45'}/mo</div>
            </div>
            {form.isFeatured && (
              <span style={{ fontSize: 9, fontWeight: 800, background: '#fef08a', color: '#854d0e', padding: '3px 8px', borderRadius: 6 }}>⭐ FEATURED</span>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div style={{ padding: '14px 24px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 10, position: 'sticky', bottom: 0, background: '#fff', borderRadius: '0 0 20px 20px' }}>
          <button
            onClick={onClose}
            style={{ flex: 1, padding: '11px 0', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer', fontWeight: 700, fontSize: 12, color: '#64748b' }}
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(course?._id, form)}
            style={{ flex: 2, padding: '11px 0', borderRadius: 10, background: 'linear-gradient(135deg,#0f766e,#0d9488)', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 800, fontSize: 12, letterSpacing: '0.05em' }}
          >
            {isEdit ? '💾 Save Changes' : '🚀 Publish Program'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── SMALL HELPERS ────────────────────────────────────────────────────────────
const inputStyle = {
  width: '100%', padding: '10px 12px', borderRadius: 10,
  border: '1px solid #e2e8f0', fontSize: 13, color: '#0f172a',
  outline: 'none', background: '#fff', boxSizing: 'border-box',
  fontFamily: 'inherit',
};

const Input = ({ value, onChange, placeholder, type = 'text' }) => (
  <input
    type={type}
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    style={inputStyle}
  />
);

const Field = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
    <label style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>{label}</label>
    {children}
  </div>
);

// ─── COURSE CARD ──────────────────────────────────────────────────────────────
const CourseCard = ({ c, onEdit, onDelete }) => {
  const lc = levelConfig[c.level] || levelConfig['All Levels'];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: `1.5px solid ${c.isFeatured ? '#fde047' : (hovered ? '#cbd5e1' : '#e2e8f0')}`,
        borderRadius: 16,
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        transition: 'all 0.2s ease',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Featured Corner Badge */}
      {c.isFeatured && (
        <div style={{ position: 'absolute', top: 0, right: 0, background: '#fef08a', color: '#854d0e', fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: '0 0 0 10px', borderBottom: '1px solid #fde047', borderLeft: '1px solid #fde047' }}>
          ⭐ HOME FEATURED
        </div>
      )}

      {/* Card Top Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: c.isFeatured ? 6 : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
            {iconEmoji[c.iconKey] || '📖'}
          </div>
          <span style={{ background: lc.bg, border: `1px solid ${lc.border}`, color: lc.color, borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: lc.dot, display: 'inline-block' }}></span>
            {c.level}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={onEdit}
            style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Edit"
          >✏️</button>
          <button
            onClick={onDelete}
            style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid #fee2e2', background: '#fff5f5', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Delete"
          >🗑️</button>
        </div>
      </div>

      {/* Title + Desc */}
      <div>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', marginBottom: 5, lineHeight: 1.3 }}>{c.title}</div>
        <p style={{ fontSize: 11, color: '#64748b', margin: 0, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.desc}</p>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
        {[
          { label: '💰 Price', value: c.price || '—' },
          { label: '⏱ Duration', value: c.duration || '—' },
          { label: '👥 Students', value: c.students ?? '—' },
        ].map((item, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{item.label}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#334155' }}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── MAIN MODULE ──────────────────────────────────────────────────────────────
const CoursesModule = ({ courses = [], onAddCourse, onUpdateCourse, onDeleteCourse }) => {
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [modalData, setModalData] = useState(null);

  const safeCourses = Array.isArray(courses) ? courses : [];

  const filtered = safeCourses.filter(c => {
    if (!c) return false;
    const matchLevel = levelFilter === 'All' || c.level === levelFilter;
    const matchQuery = (c.title || '').toLowerCase().includes(query.toLowerCase());
    const matchFeatured = !featuredOnly || c.isFeatured === true;
    return matchLevel && matchQuery && matchFeatured;
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
    <div style={{ fontFamily: 'inherit' }}>

      {/* Page Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>📚 Manage Courses</div>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>Add, edit, or control homepage featured courses.</div>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center', background: '#f8fafc', borderRadius: 12, padding: '10px 14px', border: '1px solid #e2e8f0' }}>
        
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 180px', minWidth: 160 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: '#94a3b8' }}>🔍</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search programs..."
            style={{ width: '100%', padding: '8px 10px 8px 30px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12, background: '#fff', boxSizing: 'border-box', outline: 'none' }}
          />
        </div>

        {/* Level Filter */}
        <select
          value={levelFilter}
          onChange={e => setLevelFilter(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12, background: '#fff', cursor: 'pointer', outline: 'none' }}
        >
          {['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(l => (
            <option key={l} value={l}>{l === 'All' ? '📋 All Levels' : l}</option>
          ))}
        </select>

        {/* Featured Only Filter Pill */}
        <button
          onClick={() => setFeaturedOnly(!featuredOnly)}
          style={{
            padding: '7px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer',
            border: `1.5px solid ${featuredOnly ? '#facc15' : '#e2e8f0'}`,
            background: featuredOnly ? '#fefce8' : '#fff',
            color: featuredOnly ? '#854d0e' : '#64748b',
          }}
        >
          ⭐ Homepage Only ({safeCourses.filter(c => c.isFeatured).length})
        </button>

        {/* Count */}
        <span style={{ fontSize: 11, color: '#94a3b8', whiteSpace: 'nowrap' }}>
          {filtered.length} / {safeCourses.length}
        </span>

        {/* Add Button */}
        <button
          onClick={() => setModalData({ mode: 'add' })}
          style={{ marginLeft: 'auto', padding: '9px 16px', borderRadius: 10, background: 'linear-gradient(135deg,#0f766e,#0d9488)', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(15,118,110,0.3)' }}
        >
          ＋ Add Course
        </button>
      </div>

      {/* Course Cards Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>📭</div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>No courses found</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Try changing your filter settings or add a new course.</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 14 }}>
          {filtered.map(c => (
            <CourseCard
              key={c._id}
              c={c}
              onEdit={() => setModalData({ mode: 'edit', course: c })}
              onDelete={() => onDeleteCourse(c._id)}
            />
          ))}

          {/* Add New Quick Card */}
          <div
            onClick={() => setModalData({ mode: 'add' })}
            style={{
              border: '2px dashed #e2e8f0', borderRadius: 16, padding: 18,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', minHeight: 160, cursor: 'pointer', gap: 8,
              background: '#fafafa', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#0d9488'; e.currentTarget.style.background = '#f0fdfa'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fafafa'; }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f0fdfa', border: '1.5px dashed #0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#0d9488' }}>+</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>Add New Course</div>
            <div style={{ fontSize: 10, color: '#94a3b8' }}>Click to publish</div>
          </div>
        </div>
      )}

      {/* Modal */}
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