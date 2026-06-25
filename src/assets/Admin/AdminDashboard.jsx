import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'; 

import StudentsModule from './StudentsModule';
import CoursesModule from './CoursesModule'; // 🚀 Connected cleanly inside same directory
import InquiriesModule from "./InquiriesModule";

// ─── Icons Configuration Master Object ───────────────────────────────────────
const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

const Icons = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  users:     "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  book:      "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  logout:    "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  clock:     "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M12 6v6l4 2",
  grad:      "M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5",
  check:     "M20 6L9 17l-5-5",
  trash:     "M3 6h18 M19 6l-1 14H6L5 6 M8 6V4h8v2",
  bars:      "M3 12h18 M3 6h18 M3 18h18",
  x:         "M18 6L6 18 M6 6l12 12",
  chevron:   "M9 18l6-6-6-6",
  search:    "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35",
  edit:      "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  bell:      "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  plus:      "M12 5v14 M5 12h14",
  wallet:    "M21 12V7H5a2 2 0 0 1 0-4h14v4 M3 5v14a2 2 0 0 0 2 2h16v-5 M18 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
};

const API_BASE_URL = 'http://localhost:5000/api/admin';

// ─── Design Tokens & Global Styles ──────────────────────────────────────────
const T = {
  ink: "#0c1f1c", inkSoft: "rgba(212,231,224,0.62)", accent: "#0f766e", accentSoft: "#ecfdf5", gold: "#b8860b", amber: "#c2410c", amberBg: "#fff7ed", amberBd: "#fed7aa", green: "#15803d", greenBg: "#f0fdf4", greenBd: "#bbf7d0", violet: "#6d28d9", violetBg: "#faf5ff", violetBd: "#ddd6fe", ink2: "#0f172a", sub: "#64748b", faint: "#94a3b8", bg: "#f6f7f5", card: "#ffffff"
};

const S = {
  root:       { display: 'flex', height: '100vh', fontFamily: "'Inter', sans-serif", background: T.bg, color: T.ink2, overflow: 'hidden' },
  sidebar:    { width: 220, minWidth: 220, background: T.ink, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 },
  main:       { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  content:    { flex: 1, overflowY: 'auto', padding: '24px 28px', background: T.bg },
  logoRow:    { padding: '20px 20px 16px', borderBottom: '0.5px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 },
  pulse:      { width: 8, height: 8, borderRadius: '50%', background: '#2dd4bf', boxShadow: '0 0 0 3px rgba(45,212,191,0.18)' },
  logoText:   { fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' },
  nav:        { padding: '14px 10px', flex: 1 },
  navBtnBase: { width: '100%', background: 'none', border: 'none', color: T.inkSoft, fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, cursor: 'pointer', marginBottom: 4 },
  navActive:  { background: T.accent, color: '#fff' },
  logoutArea: { padding: '12px 10px', borderTop: '0.5px solid rgba(255,255,255,0.08)' },
  logoutBtn:  { width: '100%', background: 'none', border: 'none', color: '#f87171', fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, cursor: 'pointer' },
  topbar:     { background: T.card, borderBottom: '0.5px solid #e2e8f0', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 28px', gap: 14 },
  userInfo:   { textAlign: 'right' }, userName: { fontSize: 13, fontWeight: 500 }, userRole: { fontSize: 10, color: T.faint },
  avatar:     { width: 36, height: 36, borderRadius: 8, background: T.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: T.accent, border: '0.5px solid #99f6e4' },
  pageTitle:  { fontSize: 20, fontWeight: 600, marginBottom: 4 }, pageSub: { fontSize: 13, color: T.sub, marginBottom: 20 },
  statsGrid:  { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 },
  statCard:   { background: T.card, border: '0.5px solid #e2e8f0', borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' },
  statLabel:  { fontSize: 11, fontWeight: 500, color: T.faint, marginBottom: 6 }, statValue: { fontSize: 26, fontWeight: 600, lineHeight: 1 },
  tableCard:  { background: T.card, border: '0.5px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' },
  tableHead:  { padding: '14px 20px', borderBottom: '0.5px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  tableTitle: { fontSize: 14, fontWeight: 600 }, viewAll: { fontSize: 11, fontWeight: 600, color: T.accent, background: 'none', border: 'none', cursor: 'pointer' },
};

// ─── Shared Badges & Helpers ──────────────────────────────────────────────────
const StatusBadge = ({ status }) => (
  <span style={{ background: status === 'Pending' ? T.amberBg : T.greenBg, border: `0.5px solid ${status === 'Pending' ? T.amberBd : T.greenBd}`, color: status === 'Pending' ? T.amber : T.green, borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase' }}>{status}</span>
);

const CountryBadge = ({ country }) => (
  <span style={{ background: '#f1f5f9', border: '0.5px solid #e2e8f0', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 500, color: '#475569' }}>{country}</span>
);

const ActionBtn = ({ icon, color, hoverBg, hoverBorder, title, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button title={title} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ width: 28, height: 28, borderRadius: 7, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginLeft: 4, transition: 'all 0.15s', border: hovered ? `0.5px solid ${hoverBorder}` : '0.5px solid #e2e8f0', background: hovered ? hoverBg : '#ffffff', color: hovered ? color : '#94a3b8' }}><Icon d={Icons[icon]} size={12} /></button>
  );
};

const NavBtn = ({ icon, label, active, onClick, badge }) => (
  <button onClick={onClick} style={{ ...S.navBtnBase, ...(active ? S.navActive : {}) }}><Icon d={Icons[icon]} size={15} /><span style={{ flex: 1, textAlign: 'left' }}>{label}</span>{!!badge && <span style={{ background: active ? 'rgba(255,255,255,0.25)' : T.gold, color: '#fff', borderRadius: 999, fontSize: 10, fontWeight: 700, padding: '1px 6px' }}>{badge}</span>}</button>
);

const CrescentRing = ({ color, pct = 70 }) => {
  const r = 16, c = 2 * Math.PI * r;
  return (<svg width={44} height={44} viewBox="0 0 44 44" style={{ flexShrink: 0 }}><circle cx="22" cy="22" r={r} fill="none" stroke="#eef2f1" strokeWidth="3" /><circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="3" strokeDasharray={`${(pct / 100) * c} ${c}`} strokeLinecap="round" transform="rotate(-90 22 22)" /></svg>);
};

const StudentsListCell = ({ studentsList }) => {
  if (!studentsList || studentsList.length === 0) return <span style={{ color: '#94a3b8', fontSize: 11 }}>No students map</span>;
  return (<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>{studentsList.map((st, idx) => (<span key={idx} style={{ background: '#f8fafc', padding: '2px 6px', borderRadius: 6, border: '0.5px solid #e2e8f0', fontSize: 11, display: 'inline-block', color: '#334155' }}>👦 <b>{st.studentName}</b> ({st.age} Yrs - {st.gender})</span>))}</div>);
};

// ─── Dashboard Tab Component ───────────────────────────────────────────────────
const DashboardTab = ({ inquiries, handleApprove, handleDelete, setActiveTab, stats }) => {
  const safeInquiries = Array.isArray(inquiries) ? inquiries : [];
  return (
    <div>
      <div style={S.pageTitle}>Welcome back, engineer</div><div style={S.pageSub}>Here is what's happening with Al Quran Institute today.</div>
      <div style={S.statsGrid}>{stats.map(s => (<div key={s.label} style={S.statCard}><div><div style={S.statLabel}>{s.label}</div><div style={{ ...S.statValue, color: s.color }}>{s.value}</div></div><div style={{ position: 'relative', width: 40, height: 40 }}><CrescentRing color={s.color} pct={s.pct} /><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}><Icon d={Icons[s.icon]} size={15} /></div></div></div>))}</div>
      <div style={S.tableCard}>
        <div style={S.tableHead}><span style={S.tableTitle}>Recent trial bookings</span><button style={S.viewAll} onClick={() => setActiveTab('inquiries')}>View all →</button></div>
        <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse' }}><thead><tr style={{ background: '#f8fafc' }}>{['Date / Time', 'Parent Details', 'Contact & Slot', 'Enrolled Students', 'Country', 'Course', 'Status', ''].map((h, i) => (<th key={i} style={{ padding: '10px 16px', fontSize: 10, fontWeight: 600, color: '#94a3b8', borderBottom: '0.5px solid #e2e8f0', textAlign: i === 7 ? 'right' : 'left' }}>{h}</th>))}</tr></thead><tbody>{safeInquiries.length === 0 ? (<tr><td colSpan={8} style={{ padding: 32, textAlign: 'center', color: '#94a3b8' }}>No records.</td></tr>) : safeInquiries.slice(0, 4).map(inq => (
          <tr key={inq._id} style={{ borderBottom: '0.5px solid #f1f5f9' }}><td style={{ padding: '11px 16px', fontSize: 13 }}><div>{inq.date}</div><div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{inq.time || 'N/A'} <span style={{ color: T.accent, fontWeight: 600 }}>({inq.timezone})</span></div></td><td style={{ padding: '11px 16px', fontSize: 13, fontWeight: 600 }}><div>{inq.parentName}</div><div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 400 }}>{inq.email}</div></td><td style={{ padding: '11px 16px' }}><div style={{ fontSize: 13, color: '#16a34a', fontWeight: 600 }}>{inq.whatsapp}</div><div style={{ fontSize: 10, color: '#64748b' }}>Slot: {inq.preferredTimeSlot}</div></td><td style={{ padding: '11px 16px' }}><StudentsListCell studentsList={inq.students} /></td><td style={{ padding: '11px 16px' }}><CountryBadge country={inq.country} /></td><td style={{ padding: '11px 16px', fontSize: 13 }}>{inq.course}</td><td style={{ padding: '11px 16px' }}><StatusBadge status={inq.status} /></td><td style={{ padding: '11px 16px', textAlign: 'right' }}>{inq.status === 'Pending' && (<ActionBtn icon="check" color="#16a34a" hoverBg="#f0fdf4" hoverBorder="#bbf7d0" onClick={() => handleApprove(inq._id)} />)}<ActionBtn icon="trash" color="#dc2626" hoverBg="#fef2f2" hoverBorder="#fecaca" onClick={() => handleDelete(inq._id)} /></td></tr>
        ))}</tbody></table></div>
      </div>
    </div>
  );
};

// ─── MAIN PORTAL MASTER CORE COMPONENT ────────────────────────────────────────
const AdminDashboard = () => {
  const [activeTab, setActiveTab]     = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [inquiries, setInquiries]     = useState([]);
  const [courses, setCourses]         = useState([]);
  const [students, setStudents]       = useState([]); 
  const [loading, setLoading]         = useState(true);

  // 🚀 HARDENED SAFE HANDLING FOR DATA SYNC FROM MONGO ATOMIC CLUSTERS
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // A. Isolated Inquiries Processing Block
      try {
        const inqRes = await axios.get(`${API_BASE_URL}/inquiries`);
        const parsedInq = inqRes.data?.data || inqRes.data || [];
        setInquiries(Array.isArray(parsedInq) ? parsedInq : []);
      } catch (inqErr) {
        console.error("Inquiries data loading crash isolated:", inqErr);
      }

      // B. Isolated Courses Processing Block
      try {
        const courseRes = await axios.get(`${API_BASE_URL}/courses`);
        setCourses(courseRes.data?.data || courseRes.data || []);
      } catch (courseErr) {
        console.error("Courses data loading crash isolated:", courseErr);
      }

      // C. Isolated Students Processing Block with robust validation parse tracking
      try {
        const studentRes = await axios.get(`${API_BASE_URL}/students`);
        if (studentRes.data) {
          if (Array.isArray(studentRes.data)) {
            setStudents(studentRes.data);
          } else if (studentRes.data.data && Array.isArray(studentRes.data.data)) {
            setStudents(studentRes.data.data);
          } else if (studentRes.data.students && Array.isArray(studentRes.data.students)) {
            setStudents(studentRes.data.students);
          } else {
            setStudents([]);
          }
        } else {
          setStudents([]);
        }
      } catch (studentErr) {
        console.warn("Students endpoint isolated (404/Pending backend configuration state):", studentErr.message);
        setStudents([]); 
      }

      setLoading(false);
    } catch (err) {
      console.error("Fatal system initialization halt failure:", err);
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboardData(); }, []);

  const handleApprove = async (id) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/inquiries/${id}`, { status: 'Approved' });
      if (res.data.success) {
        alert("Inquiry Approved & Student Migrated Successfully! 🎉");
        fetchDashboardData(); // Refresh both students and inquiries clusters
      }
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete inquiry?")) {
      try {
        const res = await axios.delete(`${API_BASE_URL}/inquiries/${id}`);
        if (res.data.success) setInquiries(prev => prev.filter(i => i._id !== id));
      } catch (err) { alert(err.message); }
    }
  };

  // 🚀 UPDATED COURSES CORE HANDLERS
  const handleAddCourse = async (formData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/courses`, formData);
      if (res.data.success) setCourses(prev => [res.data.data, ...prev]);
    } catch (err) { alert(err.message); }
  };

  const handleUpdateCourse = async (id, updates) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/courses/${id}`, updates);
      if (res.data.success) setCourses(prev => prev.map(c => c._id === id ? res.data.data : c));
    } catch (err) { alert(err.message); }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course permanently from server?")) {
      try {
        const res = await axios.delete(`${API_BASE_URL}/courses/${id}`);
        if (res.data.success) setCourses(prev => prev.filter(c => c._id !== id));
      } catch (err) { alert(err.message); }
    }
  };

  const handleAddStudent = async (formData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/students`, formData);
      if (res.data.success) setStudents(prev => [res.data.data, ...prev]);
    } catch (err) { alert(err.message); }
  };

  const handleUpdateStudent = async (id, updates) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/students/${id}`, updates);
      if (res.data.success) setStudents(prev => prev.map(s => s._id === id ? res.data.data : s));
    } catch (err) { alert(err.message); }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("Purge student profile permanently?")) {
      try {
        const res = await axios.delete(`${API_BASE_URL}/students/${id}`);
        if (res.data.success) setStudents(prev => prev.filter(s => s._id !== id));
      } catch (err) { alert(err.message); }
    }
  };

  const handleAddFee = async (studentId, feeData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/students/${studentId}/fee`, feeData);
      if (res.data.success) setStudents(prev => prev.map(s => s._id === studentId ? res.data.data : s));
    } catch (err) { alert(err.response?.data?.message || err.message); }
  };

  const handleUpdateFee = async (studentId, feeId, statusUpdate) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/students/${studentId}/fee/${feeId}`, statusUpdate);
      if (res.data.success) setStudents(prev => prev.map(s => s._id === studentId ? res.data.data : s));
    } catch (err) { alert(err.message); }
  };

  const handleDeleteFee = async (studentId, feeId) => {
    if (window.confirm("Delete invoice record?")) {
      try {
        const res = await axios.delete(`${API_BASE_URL}/students/${studentId}/fee/${feeId}`);
        if (res.data.success) setStudents(prev => prev.map(s => s._id === studentId ? res.data.data : s));
      } catch (err) { alert(err.message); }
    }
  };

  const safeInquiriesArray = Array.isArray(inquiries) ? inquiries : [];
  const pendingCount = safeInquiriesArray.filter(i => i && i.status === 'Pending').length;
  const totalInq = safeInquiriesArray.length || 1;

  const stats = [
    { label: 'Total Inquiries', value: safeInquiriesArray.length, color: T.accent, icon: 'users', pct: 100 },
    { label: 'Pending Trials',  value: pendingCount,    color: T.amber,  icon: 'clock', pct: Math.round((pendingCount / totalInq) * 100) },
    { label: 'Active Students', value: students.length,    color: T.green,  icon: 'grad',  pct: 100 },
    { label: 'Total Courses',   value: courses.length,     color: T.violet, icon: 'book',  pct: 100 },
  ];

  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'inquiries', icon: 'users',     label: 'Inquiries', badge: pendingCount },
    { id: 'students',  icon: 'grad',      label: 'Students',  badge: (Array.isArray(students) ? students : []).filter(s=> s && s.status==='Active').length },
    { id: 'courses',   icon: 'book',      label: 'Courses' }, 
  ];

  if (loading) return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}><h3>Syncing Cluster Core Engine... Please Wait.</h3></div>;

  return (
    <div style={S.root}>
      {/* SIDEBAR */}
      <div style={{ ...S.sidebar, marginLeft: sidebarOpen ? 0 : -220, transition: 'margin 0.25s' }}>
        <div style={S.logoRow}><div style={S.pulse} /><span style={S.logoText}>Al Quran Admin</span></div>
        <nav style={S.nav}>{navItems.map(item => (<NavBtn key={item.id} icon={item.icon} label={item.label} active={activeTab === item.id} badge={item.badge} onClick={() => setActiveTab(item.id)} />))}</nav>
        <div style={S.logoutArea}><button style={S.logoutBtn}><Icon d={Icons.logout} size={15} />Logout</button></div>
      </div>

      {/* MAIN VIEW AREA */}
      <div style={S.main}>
        <header style={S.topbar}>
          <button onClick={() => setSidebarOpen(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', marginRight: 'auto' }}><Icon d={Icons.bars} size={18} /></button>
          <div style={S.userInfo}><div style={S.userName}>Mohsin Ishfaq</div><div style={S.userRole}>Super Admin</div></div><div style={S.avatar}>MI</div>
        </header>

        <main style={S.content}>
          {activeTab === 'dashboard' && <DashboardTab inquiries={inquiries} handleApprove={handleApprove} handleDelete={handleDelete} setActiveTab={setActiveTab} stats={stats} />}
          
          {/* 🚀 RENDER THE INQUIRIES MODULE WHEN ACTIVE */}
          {activeTab === 'inquiries' && (
            <InquiriesModule 
              inquiries={safeInquiriesArray} 
              onApproveInquiry={handleApprove} 
              onDeleteInquiry={handleDelete}
              ActionBtn={ActionBtn} S={S} T={T}
            />
          )}
          
          {/* 🚀 RENDER THE INDEPENDENT OUTSOURCED MODULE WITH COMPACT STATE ROUTING */}
          {activeTab === 'courses' && (
            <CoursesModule 
              courses={courses}
              onAddCourse={handleAddCourse}
              onUpdateCourse={handleUpdateCourse}
              onDeleteCourse={handleDeleteCourse}
              ActionBtn={ActionBtn} S={S} T={T}
            />
          )}

          {activeTab === 'students' && (
            <StudentsModule 
              students={students} courses={courses}
              onAddStudent={handleAddStudent} onUpdateStudent={handleUpdateStudent} onDeleteStudent={handleDeleteStudent}
              onAddFee={handleAddFee} onUpdateFee={handleUpdateFee} onDeleteFee={handleDeleteFee}
              ActionBtn={ActionBtn} S={S} T={T} Icon={Icon} Icons={Icons}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;