import React, { useState, useMemo } from 'react';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const currentMonthYear = () => {
  const now = new Date();
  return { month: MONTHS[now.getMonth()], year: now.getFullYear() };
};

const getCurrentFeeStatus = (student) => {
  if (!student || !student.feeHistory) return 'Pending';
  const { month, year } = currentMonthYear();
  const rec = (student.feeHistory || []).find(f => f && f.month === month && f.year === year);
  return rec ? rec.status : 'Pending';
};

// ── Badges Styling ──────────────────────────────────────────────────────────
const feeStatusStyle = {
  Paid:    { bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d' },
  Pending: { bg: '#fffbeb', border: '#fed7aa', color: '#c2410c' },
  Overdue: { bg: '#fef2f2', border: '#fecaca', color: '#dc2626' },
};

const FeeStatusBadge = ({ status }) => {
  const st = feeStatusStyle[status] || feeStatusStyle.Pending;
  return (
    <span style={{
      background: st.bg, border: `0.5px solid ${st.border}`, color: st.color,
      borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 600,
      letterSpacing: '0.06em', textTransform: 'uppercase',
    }}>{status}</span>
  );
};

const enrollStatusStyle = {
  Active:    { bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d' },
  Paused:    { bg: '#fffbeb', border: '#fed7aa', color: '#c2410c' },
  Completed: { bg: '#ecfdf5', border: '#99f6e4', color: '#0f766e' },
  Dropped:   { bg: '#f1f5f9', border: '#e2e8f0', color: '#64748b' },
};

const EnrollStatusBadge = ({ status }) => {
  const st = enrollStatusStyle[status] || enrollStatusStyle.Active;
  return (
    <span style={{
      background: st.bg, border: `0.5px solid ${st.border}`, color: st.color,
      borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 600,
      letterSpacing: '0.06em', textTransform: 'uppercase',
    }}>{status}</span>
  );
};

// ── Form Initial State ──────────────────────────────────────────────────────
const blankStudentForm = {
  studentName: '', age: '', gender: 'Male',
  parentName: '', parentAge: '', email: '', whatsapp: '', country: '', address: '',
  course: '', tutorAssigned: '', preferredTimeSlot: '', timezone: '',
  enrollmentDate: new Date().toISOString().slice(0, 10),
  status: 'Active', source: 'Direct Referral',
  monthlyFee: '', currency: 'USD', notes: '',
};

// ── MAIN EXPORT COMPONENT ───────────────────────────────────────────────────
export default function StudentsModule({ 
  students = [], courses = [], onAddStudent, onUpdateStudent, onDeleteStudent, 
  onAddFee, onUpdateFee, onDeleteFee, ActionBtn, S, T, Icon, Icons 
}) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [feeFilter, setFeeFilter] = useState('All');
  
  // Modals States managed internally inside this wrapper file
  const [formStudent, setFormStudent] = useState(undefined); // undefined=closed, null=add, object=edit
  const [ledgerStudent, setLedgerStudent] = useState(null);

  // 1. Client-Side Search Filters Memo Logic with Array Safe Guard
  const filtered = useMemo(() => {
    let rows = Array.isArray(students) ? students : [];
    if (statusFilter !== 'All') rows = rows.filter(s => s && s.status === statusFilter);
    if (feeFilter !== 'All') rows = rows.filter(s => s && getCurrentFeeStatus(s) === feeFilter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      rows = rows.filter(s => s && (
        (s.studentName || '').toLowerCase().includes(q) ||
        (s.parentName || '').toLowerCase().includes(q) ||
        (s.whatsapp || '').toLowerCase().includes(q) ||
        (s.email || '').toLowerCase().includes(q) ||
        (s.course || '').toLowerCase().includes(q)
      ));
    }
    return rows;
  }, [students, statusFilter, feeFilter, query]);

  // Form Save Router
  const handleFormSubmit = async (formData, id) => {
    if (id) await onUpdateStudent(id, formData);
    else await onAddStudent(formData);
    setFormStudent(undefined);
  };

  // Styles configuration shortcuts for forms
  const fieldStyle = { display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 };
  const labelStyle = { fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#64748b' };
  const inputStyle = { padding: '9px 11px', borderRadius: 8, border: '0.5px solid #e2e8f0', fontSize: 13, color: '#0f172a', outline: 'none', width: '100%', background: '#fff' };
  const grid2Style = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 };

  // Current active targeted ledger snapshot
  const activeLedgerStudent = ledgerStudent ? ((Array.isArray(students) ? students : []).find(s => s && s._id === ledgerStudent._id) || ledgerStudent) : null;

  return (
    <div>
      {/* HEADER ROW */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <div style={S.pageTitle}>Students Management</div>
          <div style={S.pageSub}>Track manual enrollments, student records, and automated monthly ledger statuses.</div>
        </div>
        <button onClick={() => setFormStudent(null)} style={{ padding: '9px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', background: T.accent, border: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
          <Icon d={Icons.plus} size={13} />Add student
        </button>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center', marginTop: 12 }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 200, maxWidth: 320 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>
            <Icon d={Icons.search} size={13} />
          </span>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search student, parent, contact..." style={{ width: '100%', padding: '7px 10px 7px 30px', borderRadius: 7, border: '0.5px solid #e2e8f0', fontSize: 12, color: '#334155', outline: 'none', background: '#fff' }} />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '7px 10px', borderRadius: 7, border: '0.5px solid #e2e8f0', fontSize: 12, color: '#475569', background: '#fff', cursor: 'pointer' }}>
          {['All', 'Active', 'Paused', 'Completed', 'Dropped'].map(s => <option key={s} value={s}>{s === 'All' ? 'All statuses' : s}</option>)}
        </select>
        <select value={feeFilter} onChange={e => setFeeFilter(e.target.value)} style={{ padding: '7px 10px', borderRadius: 7, border: '0.5px solid #e2e8f0', fontSize: 12, color: '#475569', background: '#fff', cursor: 'pointer' }}>
          {['All', 'Paid', 'Pending', 'Overdue'].map(s => <option key={s} value={s}>{s === 'All' ? 'Any fee status (this month)' : `Fee: ${s}`}</option>)}
        </select>
        <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 'auto' }}>{filtered.length} of {(students || []).length} shown</span>
      </div>

      {/* STUDENTS MAIN LEDGER TABLE */}
      <div style={S.tableCard}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Student Info', 'Parent / Contact', 'Assigned Details', 'Enrollment Date', 'Status', 'Current Fee', 'Actions'].map((h, i) => (
                  <th key={i} style={{ padding: '10px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8', textAlign: i === 6 ? 'right' : 'left', borderBottom: '0.5px solid #e2e8f0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: 32, textAlign: 'center', fontSize: 13, color: '#94a3b8' }}>No students record mapped.</td></tr>
              ) : filtered.map(s => (
                <tr key={s._id} style={{ borderBottom: '0.5px solid #f1f5f9' }}>
                  <td style={{ padding: '11px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{s.studentName}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{s.age} Yrs · {s.gender}{s.country ? ` · ${s.country}` : ''}</div>
                  </td>
                  <td style={{ padding: '11px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{s.parentName}</div>
                    <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>{s.whatsapp}</div>
                  </td>
                  <td style={{ padding: '11px 16px' }}>
                    <div style={{ fontSize: 13, color: '#334155' }}>{s.course}</div>
                    {s.tutorAssigned && <div style={{ fontSize: 11, color: '#94a3b8' }}>Tutor: {s.tutorAssigned}</div>}
                  </td>
                  <td style={{ padding: '11px 16px', fontSize: 12, color: '#64748b' }}>
                    {s.enrollmentDate ? new Date(s.enrollmentDate).toLocaleDateString() : '—'}
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>{s.source}</div>
                  </td>
                  <td style={{ padding: '11px 16px' }}><EnrollStatusBadge status={s.status} /></td>
                  <td style={{ padding: '11px 16px' }}>
                    <button onClick={() => setLedgerStudent(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FeeStatusBadge status={getCurrentFeeStatus(s)} />
                      <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{s.currency} {s.monthlyFee}</span>
                    </button>
                  </td>
                  <td style={{ padding: '11px 16px', textAlign: 'right' }}>
                    <ActionBtn icon="wallet" color={T.accent} hoverBg={T.accentSoft} hoverBorder="#99f6e4" title="Fee ledger history" onClick={() => setLedgerStudent(s)} />
                    <ActionBtn icon="edit" color="#475569" hoverBg="#f1f5f9" hoverBorder="#cbd5e1" title="Edit student info" onClick={() => setFormStudent(s)} />
                    <ActionBtn icon="trash" color="#dc2626" hoverBg="#fef2f2" hoverBorder="#fecaca" title="Delete record" onClick={() => onDeleteStudent(s._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── INTERNAL MODAL 1: ADD / EDIT STUDENT ── */}
      {formStudent !== undefined && (
        <StudentFormWrapper student={formStudent} courses={courses} onClose={() => setFormStudent(undefined)} onSave={handleFormSubmit} fieldStyle={fieldStyle} labelStyle={labelStyle} inputStyle={inputStyle} grid2Style={grid2Style} T={T} Icon={Icon} Icons={Icons} />
      )}

      {/* ── INTERNAL MODAL 2: FINANCIAL MONTHLY LEDGER HISTORY ── */}
      {activeLedgerStudent && (
        <FeeLedgerWrapper student={activeLedgerStudent} onClose={() => setLedgerStudent(null)} onAddFee={onAddFee} onUpdateFee={onUpdateFee} onDeleteFee={onDeleteFee} T={T} Icon={Icon} Icons={Icons} />
      )}
    </div>
  );
}

// ── SUB-COMPONENT: STUDENT PROFILE INPUT FORM MODAL ─────────────────────────
const StudentFormWrapper = ({ student, courses = [], onClose, onSave, fieldStyle, labelStyle, inputStyle, grid2Style, T, Icon, Icons }) => {
  const isEdit = !!student;
  const [form, setForm] = useState(() => isEdit ? {
    studentName: student.studentName || '', age: student.age ?? '', gender: student.gender || 'Male',
    parentName: student.parentName || '', parentAge: student.parentAge ?? '', email: student.email || '', whatsapp: student.whatsapp || '', country: student.country || '', address: student.address || '',
    course: student.course || '', tutorAssigned: student.tutorAssigned || '', preferredTimeSlot: student.preferredTimeSlot || '', timezone: student.timezone || '',
    enrollmentDate: student.enrollmentDate ? student.enrollmentDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
    status: student.status || 'Active', source: student.source || 'Direct Referral',
    monthlyFee: student.monthlyFee ?? '', currency: student.currency || 'USD', notes: student.notes || '',
  } : blankStudentForm);
  const [saving, setSaving] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const executeSubmit = async () => {
    if (!form.studentName || !form.parentName || !form.whatsapp || !form.course || !form.monthlyFee) return alert("Fill required inputs marked (*)");
    setSaving(true);
    try {
      await onSave({ ...form, age: Number(form.age), monthlyFee: Number(form.monthlyFee) }, student?._id);
    } finally { setSaving(false); }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(12,31,28,0.45)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 400, padding: 16 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 14, width: 560, maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto', padding: 24, boxShadow: '0 24px 64px rgba(12,31,28,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>{isEdit ? 'Modify Student Master Record' : 'Direct Manual Enrollment'}</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon d={Icons.x} size={16} /></button>
        </div>

        <p style={{ fontSize: 12, fontWeight: 700, color: T.accent, textTransform: 'uppercase', margin: '8px 0' }}>Core Identity</p>
        <div style={grid2Style}>
          <div style={fieldStyle}><label style={labelStyle}>Student Full Name *</label><input style={inputStyle} value={form.studentName} onChange={e => update('studentName', e.target.value)} /></div>
          <div style={fieldStyle}><label style={labelStyle}>Age *</label><input style={inputStyle} type="number" value={form.age} onChange={e => update('age', e.target.value)} /></div>
          <div style={fieldStyle}><label style={labelStyle}>Gender</label><select style={inputStyle} value={form.gender} onChange={e => update('gender', e.target.value)}><option>Male</option><option>Female</option></select></div>
          <div style={fieldStyle}><label style={labelStyle}>Enrollment Date</label><input style={inputStyle} type="date" value={form.enrollmentDate} onChange={e => update('enrollmentDate', e.target.value)} /></div>
        </div>

        <p style={{ fontSize: 12, fontWeight: 700, color: T.accent, textTransform: 'uppercase', margin: '8px 0' }}>Guardian Contact Mapping</p>
        <div style={grid2Style}>
          <div style={fieldStyle}><label style={labelStyle}>Parent Full Name *</label><input style={inputStyle} value={form.parentName} onChange={e => update('parentName', e.target.value)} /></div>
          <div style={fieldStyle}><label style={labelStyle}>WhatsApp Core Number *</label><input style={inputStyle} value={form.whatsapp} onChange={e => update('whatsapp', e.target.value)} /></div>
          <div style={fieldStyle}><label style={labelStyle}>Country</label><input style={inputStyle} value={form.country} onChange={e => update('country', e.target.value)} /></div>
          <div style={fieldStyle}><label style={labelStyle}>Email Address</label><input style={inputStyle} type="email" value={form.email} onChange={e => update('email', e.target.value)} /></div>
        </div>

        <p style={{ fontSize: 12, fontWeight: 700, color: T.accent, textTransform: 'uppercase', margin: '8px 0' }}>Academic & Billing Parameters</p>
        <div style={grid2Style}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Selected Target Course *</label>
            <input style={inputStyle} list="modal-courses" value={form.course} onChange={e => update('course', e.target.value)} />
            <datalist id="modal-courses">{(courses || []).map(c => c && <option key={c._id} value={c.title} />)}</datalist>
          </div>
          <div style={fieldStyle}><label style={labelStyle}>Assigned Tutor</label><input style={inputStyle} value={form.tutorAssigned} onChange={e => update('tutorAssigned', e.target.value)} /></div>
          <div style={fieldStyle}><label style={labelStyle}>Monthly Tuition Base Fee *</label><input style={inputStyle} type="number" value={form.monthlyFee} onChange={e => update('monthlyFee', e.target.value)} /></div>
          <div style={fieldStyle}><label style={labelStyle}>Billing Currency</label><select style={inputStyle} value={form.currency} onChange={e => update('currency', e.target.value)}>{['USD','PKR','GBP','EUR','AED','CAD'].map(c => <option key={c}>{c}</option>)}</select></div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '10px 0', borderRadius: 8, fontSize: 13, background: '#fff', border: '0.5px solid #e2e8f0', color: '#64748b', cursor: 'pointer' }}>Cancel</button>
          <button onClick={executeSubmit} disabled={saving} style={{ flex: 1, padding: '10px 0', borderRadius: 8, fontSize: 13, fontWeight: 600, background: T.accent, border: 'none', color: '#fff', opacity: saving ? 0.7 : 1, cursor: 'pointer' }}>{saving ? 'Processing...' : isEdit ? 'Save Changes' : 'Confirm Enrollment'}</button>
        </div>
      </div>
    </div>
  );
};

// ── SUB-COMPONENT: RECURRING MONTHLY FINANCIAL LEDGER History MODAL ──────────
const FeeLedgerWrapper = ({ student, onClose, onAddFee, onUpdateFee, onDeleteFee, T, Icon, Icons }) => {
  const { month: curMonth, year: curYear } = currentMonthYear();
  const [fMonth, setFMonth] = useState(curMonth);
  const [fYear, setFYear] = useState(curYear);
  const [fAmount, setFAmount] = useState(student ? student.monthlyFee : 45);
  const [loadingLedger, setLoadingLedger] = useState(false);

  const sortedHistory = [...(student?.feeHistory || [])].sort((a, b) => {
    if (!a || !b) return 0;
    if (a.year !== b.year) return b.year - a.year;
    return MONTHS.indexOf(b.month) - MONTHS.indexOf(a.month);
  });

  const commitLedgerRow = async () => {
    if (!student?._id) return;
    setLoadingLedger(true);
    await onAddFee(student._id, { month: fMonth, year: Number(fYear), amount: Number(fAmount), status: 'Pending' });
    setLoadingLedger(false);
  };

  const shiftStatusValue = (curr) => curr === 'Pending' ? 'Paid' : curr === 'Paid' ? 'Overdue' : 'Pending';

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(12,31,28,0.45)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justify: 'center', zIndex: 400, padding: 16 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 14, width: 500, maxWidth: '100%', padding: 22, boxShadow: '0 24px 64px rgba(12,31,28,0.25)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Tuition Billing Ledger</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>{student?.studentName} · Base Structure: {student?.currency} {student?.monthlyFee}/Mo</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon d={Icons.x} size={16} /></button>
        </div>

        {/* QUICK ADD NEW BILLING PERIOD */}
        <div style={{ display: 'flex', gap: 6, margin: '14px 0', padding: 10, background: '#f8fafc', borderRadius: 10, border: '0.5px solid #e2e8f0', flexWrap: 'wrap', alignItems: 'end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8' }}>Period Month</span>
            <select style={{ padding: '6px 8px', borderRadius: 6, border: '0.5px solid #cbd5e1', fontSize: 12 }} value={fMonth} onChange={e => setFMonth(e.target.value)}>{MONTHS.map(m => <option key={m}>{m}</option>)}</select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8' }}>Year</span>
            <input type="number" style={{ padding: '5px 8px', borderRadius: 6, border: '0.5px solid #cbd5e1', fontSize: 12, width: 66 }} value={fYear} onChange={e => setFYear(e.target.value)} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8' }}>Amount</span>
            <input type="number" style={{ padding: '5px 8px', borderRadius: 6, border: '0.5px solid #cbd5e1', fontSize: 12, width: 80 }} value={fAmount} onChange={e => setFAmount(e.target.value)} />
          </div>
          <button onClick={commitLedgerRow} disabled={loadingLedger} style={{ background: T.accent, color: '#fff', border: 'none', fontSize: 12, fontWeight: 600, padding: '7px 12px', borderRadius: 6, cursor: 'pointer', marginLeft: 'auto' }}>Generate Invoice</button>
        </div>

        {/* RECORDED ITERATIONS LOOP */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: '40vh', overflowY: 'auto' }}>
          {sortedHistory.map(row => row && (
            <div key={row._id} style={{ display: 'flex', alignItems: 'center', border: '0.5px solid #e2e8f0', borderRadius: 8, padding: '8px 12px' }}>
              <span style={{ fontSize: 13, fontWeight: 600, width: 110 }}>{row.month} {row.year}</span>
              <span style={{ fontSize: 12, color: '#64748b', width: 80 }}>{student?.currency} {row.amount}</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onUpdateFee(student._id, row._id, { status: shiftStatusValue(row.status) })}><FeeStatusBadge status={row.status} /></button>
              {row.paidOn && <span style={{ fontSize: 10, color: T.sub, marginLeft: 8 }}>🗓️ {new Date(row.paidOn).toLocaleDateString()}</span>}
              <button style={{ background: 'none', border: 'none', marginLeft: 'auto', cursor: 'pointer', color: '#cbd5e1' }} onClick={() => onDeleteFee(student._id, row._id)} onMouseEnter={e => e.currentTarget.style.color='#dc2626'} onMouseLeave={e => e.currentTarget.style.color='#cbd5e1'}><Icon d={Icons.trash} size={13} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};