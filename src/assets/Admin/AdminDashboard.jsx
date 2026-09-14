import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

import StudentsModule from './StudentsModule';
import CoursesModule from './CoursesModule'; 
import InquiriesModule from "./InquiriesModule";
import AdminAddBlog from './AdminAddBlog'; 
import SecurityDashboard from './SecurityDashboard'; // 🛡️ Banned IPs & Threat Shield Module

// ─── Centralized Axios Instance with Auto-Token & 401 Guard ─────────────────
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('adminToken') || localStorage.getItem('adminToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem('adminToken');
      localStorage.removeItem('adminToken');
      window.location.replace('/admin/login');
    }
    return Promise.reject(error);
  }
);

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
  crescent:  "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  blog:      "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
  lock:      "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  shield:    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" // 🛡️ Threat Shield Icon
};

// ─── Design Tokens & Global Styles ──────────────────────────────────────────
const T = {
  ink: "#0a1830", inkSoft: "rgba(226,232,240,0.55)", inkBorder: "rgba(255,255,255,0.07)",
  accent: "#c2410c", accentSoft: "#fff7ed", accentBd: "#fed7aa",
  gold: "#b8860b", goldSoft: "#fdf6e3",
  amber: "#c2410c", amberBg: "#fff7ed", amberBd: "#fed7aa",
  green: "#15803d", greenBg: "#f0fdf4", greenBd: "#bbf7d0",
  violet: "#6d28d9", violetBg: "#faf5ff", violetBd: "#ddd6fe",
  teal: "#0f766e", tealBg: "#ecfdf5", tealBd: "#99f6e4",
  ink2: "#0f172a", sub: "#64748b", faint: "#94a3b8",
  bg: "#f4f5f7", card: "#ffffff", line: "#e7eaee",
};

const S = {
  root:       { display: 'flex', height: '100vh', fontFamily: "'Inter', sans-serif", background: T.bg, color: T.ink2, overflow: 'hidden' },
  sidebar:    { width: 232, minWidth: 232, background: `linear-gradient(180deg, ${T.ink} 0%, #0c1f3f 100%)`, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0, boxShadow: '4px 0 24px rgba(0,0,0,0.12)' },
  main:       { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  content:    { flex: 1, overflowY: 'auto', padding: '26px 30px 40px', background: T.bg },
  logoRow:    { padding: '22px 22px 18px', borderBottom: `0.5px solid ${T.inkBorder}`, display: 'flex', alignItems: 'center', gap: 10 },
  logoBadge:  { width: 34, height: 34, borderRadius: 10, background: 'rgba(184,134,11,0.18)', border: '0.5px solid rgba(184,134,11,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.gold, flexShrink: 0 },
  logoText:   { fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: '#fff', lineHeight: 1.2 },
  logoSub:    { fontSize: 9.5, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 2 },
  navLabel:   { fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', padding: '18px 16px 8px' },
  nav:        { padding: '4px 12px', flex: 1 },
  navBtnBase: { width: '100%', background: 'none', border: 'none', borderLeft: '2.5px solid transparent', color: T.inkSoft, fontSize: 12.5, fontWeight: 500, letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', borderRadius: 8, cursor: 'pointer', marginBottom: 2, transition: 'all 0.15s' },
  navActive:  { background: 'rgba(255,255,255,0.07)', color: '#fff', borderLeft: `2.5px solid ${T.gold}` },
  logoutArea: { padding: '14px 14px 18px', borderTop: `0.5px solid ${T.inkBorder}` },
  logoutBtn:  { width: '100%', background: 'none', border: 'none', color: '#fca5a5', fontSize: 12.5, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, cursor: 'pointer', transition: 'background 0.2s' },
  topbar:     { background: T.card, borderBottom: `0.5px solid ${T.line}`, height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', gap: 14 },
  topbarLeft: { display: 'flex', alignItems: 'center', gap: 14 },
  bellBtn:    { width: 34, height: 34, borderRadius: 9, border: `0.5px solid ${T.line}`, background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.sub, cursor: 'pointer', position: 'relative' },
  bellDot:    { position: 'absolute', top: 7, right: 8, width: 6, height: 6, borderRadius: '50%', background: T.accent, border: '1.5px solid #fff' },
  userInfo:   { textAlign: 'right' }, userName: { fontSize: 13, fontWeight: 600 }, userRole: { fontSize: 10, color: T.faint, fontWeight: 500 },
  avatar:     { width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${T.ink} 0%, #16335c 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: T.gold, border: '0.5px solid rgba(184,134,11,0.3)' },
  pageEyebrow:{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.accent, marginBottom: 6 },
  pageTitle:  { fontSize: 21, fontWeight: 700, marginBottom: 4, letterSpacing: '-0.01em' }, pageSub: { fontSize: 13, color: T.sub, marginBottom: 22 },
  statsGrid:  { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 22 },
  statCard:   { background: T.card, border: `0.5px solid ${T.line}`, borderRadius: 14, padding: '18px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', boxShadow: '0 1px 2px rgba(15,23,42,0.04)' },
  statLabel:  { fontSize: 11, fontWeight: 600, color: T.faint, marginBottom: 6, letterSpacing: '0.01em' }, statValue: { fontSize: 27, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em' },
  tableCard:  { background: T.card, border: `0.5px solid ${T.line}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 2px rgba(15,23,42,0.04)' },
  tableHead:  { padding: '16px 20px', borderBottom: `0.5px solid ${T.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  tableTitle: { fontSize: 14.5, fontWeight: 700 }, viewAll: { fontSize: 11, fontWeight: 700, color: T.accent, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.02em' },
};

// ─── Shared Badges & Helpers ──────────────────────────────────────────────────
const StatusBadge = ({ status }) => (
  <span style={{ background: status === 'Pending' ? T.amberBg : T.greenBg, border: `0.5px solid ${status === 'Pending' ? T.amberBd : T.greenBd}`, color: status === 'Pending' ? T.amber : T.green, borderRadius: 999, padding: '3px 10px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{status}</span>
);

const CountryBadge = ({ country }) => (
  <span style={{ background: '#f1f5f9', border: `0.5px solid ${T.line}`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 500, color: '#475569' }}>{country}</span>
);

const ActionBtn = ({ icon, color, hoverBg, hoverBorder, title, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button title={title} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ width: 29, height: 29, borderRadius: 8, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginLeft: 5, transition: 'all 0.15s', border: hovered ? `0.5px solid ${hoverBorder}` : `0.5px solid ${T.line}`, background: hovered ? hoverBg : '#ffffff', color: hovered ? color : '#94a3b8' }}><Icon d={Icons[icon]} size={12} /></button>
  );
};

const NavBtn = ({ icon, label, active, onClick, badge }) => (
  <button onClick={onClick} style={{ ...S.navBtnBase, ...(active ? S.navActive : {}) }}>
    <Icon d={Icons[icon]} size={15} />
    <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
    {!!badge && <span style={{ background: active ? T.gold : 'rgba(184,134,11,0.22)', color: active ? '#1a1206' : T.gold, borderRadius: 999, fontSize: 10, fontWeight: 700, padding: '1px 7px' }}>{badge}</span>}
  </button>
);

const CrescentRing = ({ color, pct = 70 }) => {
  const r = 17, c = 2 * Math.PI * r;
  return (<svg width={46} height={46} viewBox="0 0 46 46" style={{ flexShrink: 0 }}><circle cx="23" cy="23" r={r} fill="none" stroke="#eef1f4" strokeWidth="3.5" /><circle cx="23" cy="23" r={r} fill="none" stroke={color} strokeWidth="3.5" strokeDasharray={`${(pct / 100) * c} ${c}`} strokeLinecap="round" transform="rotate(-90 23 23)" /></svg>);
};

const StudentsListCell = ({ studentsList }) => {
  if (!studentsList || studentsList.length === 0) return <span style={{ color: '#94a3b8', fontSize: 11 }}>No students mapped</span>;
  return (<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>{studentsList.map((st, idx) => (<span key={idx} style={{ background: '#f8fafc', padding: '3px 8px', borderRadius: 6, border: `0.5px solid ${T.line}`, fontSize: 11, display: 'inline-block', color: '#334155' }}><b>{st.studentName}</b> · {st.age} yrs · {st.gender}</span>))}</div>);
};

// ─── Dashboard Tab Component ───────────────────────────────────────────────────
const DashboardTab = ({ inquiries, handleApprove, handleDelete, setActiveTab, stats }) => {
  const safeInquiries = Array.isArray(inquiries) ? inquiries : [];
  return (
    <div>
      <div style={S.pageEyebrow}>Overview</div>
      <div style={S.pageTitle}>Welcome back, Mohsin</div>
      <div style={S.pageSub}>Here's what's happening with Al Quran Institute today.</div>

      <div style={S.statsGrid}>
        {stats.map(s => (
          <div key={s.label} style={S.statCard}>
            <div><div style={S.statLabel}>{s.label}</div><div style={{ ...S.statValue, color: s.color }}>{s.value}</div></div>
            <div style={{ position: 'relative', width: 42, height: 42 }}>
              <CrescentRing color={s.color} pct={s.pct} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}><Icon d={Icons[s.icon]} size={15} /></div>
            </div>
          </div>
        ))}
      </div>

      <div style={S.tableCard}>
        <div style={S.tableHead}>
          <span style={S.tableTitle}>Recent trial bookings</span>
          <button style={S.viewAll} onClick={() => setActiveTab('inquiries')}>View all →</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafbfc' }}>
                {['Date / Time', 'Parent Details', 'Contact & Slot', 'Enrolled Students', 'Country', 'Course', 'Status', ''].map((h, i) => (
                  <th key={i} style={{ padding: '11px 16px', fontSize: 10, fontWeight: 700, color: T.faint, borderBottom: `0.5px solid ${T.line}`, textAlign: i === 7 ? 'right' : 'left', letterSpacing: '0.03em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {safeInquiries.length === 0 ? (
                <tr><td colSpan={8} style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>No bookings yet — new trial requests will appear here.</td></tr>
              ) : safeInquiries.slice(0, 4).map(inq => (
                <tr key={inq._id} style={{ borderBottom: `0.5px solid #f1f5f9`, transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = '#fafbfc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 16px', fontSize: 13 }}>
                    <div style={{ fontWeight: 500 }}>{inq.date}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{inq.time || 'N/A'} <span style={{ color: T.teal, fontWeight: 600 }}>({inq.timezone})</span></div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600 }}>
                    <div>{inq.parentName}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 400 }}>{inq.email}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontSize: 13, color: '#16a34a', fontWeight: 600 }}>{inq.whatsapp}</div>
                    <div style={{ fontSize: 10, color: '#64748b' }}>Slot: {inq.preferredTimeSlot}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}><StudentsListCell studentsList={inq.students} /></td>
                  <td style={{ padding: '12px 16px' }}><CountryBadge country={inq.country} /></td>
                  <td style={{ padding: '12px 16px', fontSize: 13 }}>{inq.course}</td>
                  <td style={{ padding: '12px 16px' }}><StatusBadge status={inq.status} /></td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    {inq.status === 'Pending' && (<ActionBtn icon="check" color="#16a34a" hoverBg="#f0fdf4" hoverBorder="#bbf7d0" onClick={() => handleApprove(inq._id)} />)}
                    <ActionBtn icon="trash" color="#dc2626" hoverBg="#fef2f2" hoverBorder="#fecaca" onClick={() => handleDelete(inq._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Change Password / Security Tab Component ───────────────────────────────
const SecurityTab = ({ handleLogout }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (newPassword !== confirmPassword) {
      return setStatus({ type: 'error', message: 'New password and confirm password do not match.' });
    }

    if (newPassword.length < 8) {
      return setStatus({ type: 'error', message: 'New password must be at least 8 characters long.' });
    }

    try {
      setLoading(true);
      const res = await api.put('/admin-auth/change-password', { currentPassword, newPassword });

      if (res.data.success) {
        setStatus({ type: 'success', message: 'Password changed successfully! Logging out...' });
        setTimeout(() => {
          handleLogout();
        }, 1500);
      }
    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: err.response?.data?.message || 'Failed to change password. Please check your credentials.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 540 }}>
      <div style={S.pageEyebrow}>Security Center</div>
      <div style={S.pageTitle}>Change Password</div>
      <div style={S.pageSub}>Ensure your portal remains safe by updating your password periodically.</div>

      <div style={{ ...S.tableCard, padding: '28px 24px' }}>
        {status.message && (
          <div style={{
            padding: '12px 14px',
            borderRadius: 8,
            fontSize: 12.5,
            marginBottom: 20,
            background: status.type === 'error' ? '#fef2f2' : '#f0fdf4',
            color: status.type === 'error' ? '#991b1b' : '#166534',
            border: `1px solid ${status.type === 'error' ? '#fecaca' : '#bbf7d0'}`
          }}>
            {status.message}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.ink2, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Current Password</label>
            <input 
              type="password" 
              required
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              placeholder="Enter existing password"
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${T.line}`, outline: 'none', fontSize: 13, boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.ink2, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>New Password</label>
            <input 
              type="password" 
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${T.line}`, outline: 'none', fontSize: 13, boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.ink2, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Confirm New Password</label>
            <input 
              type="password" 
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${T.line}`, outline: 'none', fontSize: 13, boxSizing: 'border-box' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '11px 22px', 
              borderRadius: 8, 
              border: 'none', 
              background: T.accent, 
              color: '#fff', 
              fontSize: 12.5, 
              fontWeight: 600, 
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
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

  const navigate = useNavigate();

  // 🚪 LOGOUT FUNCTION
  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    localStorage.removeItem('adminToken');
    navigate('/admin/login', { replace: true });
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      try {
        const inqRes = await api.get('/admin/inquiries');
        const parsedInq = inqRes.data?.data || inqRes.data || [];
        setInquiries(Array.isArray(parsedInq) ? parsedInq : []);
      } catch (inqErr) { console.error("Inquiries processing fail:", inqErr); }

      try {
        const courseRes = await api.get('/admin/courses');
        setCourses(courseRes.data?.data || courseRes.data || []);
      } catch (courseErr) { console.error("Courses processing fail:", courseErr); }

      try {
        const studentRes = await api.get('/admin/students');
        if (studentRes.data) {
          if (Array.isArray(studentRes.data)) setStudents(studentRes.data);
          else if (studentRes.data.data && Array.isArray(studentRes.data.data)) setStudents(studentRes.data.data);
          else if (studentRes.data.students && Array.isArray(studentRes.data.students)) setStudents(studentRes.data.students);
          else setStudents([]);
        } else setStudents([]);
      } catch (studentErr) { setStudents([]); }
      setLoading(false);
    } catch (err) { setLoading(false); }
  };

  // ✅ Refresh-Safe Effect: Token page refresh par safe rehta hai
  useEffect(() => { 
    fetchDashboardData(); 

    const handlePageShow = (event) => {
      if (event.persisted) {
        const activeToken = sessionStorage.getItem('adminToken') || localStorage.getItem('adminToken');
        if (!activeToken) {
          window.location.replace('/admin/login');
        }
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await api.put(`/admin/inquiries/${id}`, { status: 'Approved' });
      if (res.data.success) {
        alert("Inquiry Approved 🎉");
        fetchDashboardData();
      }
    } catch (err) { alert(err.response?.data?.message || err.message); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete inquiry?")) {
      try {
        const res = await api.delete(`/admin/inquiries/${id}`);
        if (res.data.success) setInquiries(prev => prev.filter(i => i._id !== id));
      } catch (err) { alert(err.response?.data?.message || err.message); }
    }
  };

  const handleAddCourse = async (formData) => {
    try {
      const res = await api.post('/admin/courses', formData);
      if (res.data.success) setCourses(prev => [res.data.data, ...prev]);
    } catch (err) { alert(err.response?.data?.message || err.message); }
  };

  const handleUpdateCourse = async (id, updates) => {
    try {
      const res = await api.put(`/admin/courses/${id}`, updates);
      if (res.data.success) setCourses(prev => prev.map(c => c._id === id ? res.data.data : c));
    } catch (err) { alert(err.response?.data?.message || err.message); }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Delete this course?")) {
      try {
        const res = await api.delete(`/admin/courses/${id}`);
        if (res.data.success) setCourses(prev => prev.filter(c => c._id !== id));
      } catch (err) { alert(err.response?.data?.message || err.message); }
    }
  };

  const handleAddStudent = async (formData) => {
    try {
      const res = await api.post('/admin/students', formData);
      if (res.data.success) setStudents(prev => [res.data.data, ...prev]);
    } catch (err) { alert(err.response?.data?.message || err.message); }
  };

  const handleUpdateStudent = async (id, updates) => {
    try {
      const res = await api.put(`/admin/students/${id}`, updates);
      if (res.data.success) setStudents(prev => prev.map(s => s._id === id ? res.data.data : s));
    } catch (err) { alert(err.response?.data?.message || err.message); }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("Purge student profile?")) {
      try {
        const res = await api.delete(`/admin/students/${id}`);
        if (res.data.success) setStudents(prev => prev.filter(s => s._id !== id));
      } catch (err) { alert(err.response?.data?.message || err.message); }
    }
  };

  const handleAddFee = async (studentId, feeData) => {
    try {
      const res = await api.post(`/admin/students/${studentId}/fee`, feeData);
      if (res.data.success) setStudents(prev => prev.map(s => s._id === studentId ? res.data.data : s));
    } catch (err) { alert(err.response?.data?.message || err.message); }
  };

  const handleUpdateFee = async (studentId, feeId, statusUpdate) => {
    try {
      const res = await api.put(`/admin/students/${studentId}/fee/${feeId}`, statusUpdate);
      if (res.data.success) setStudents(prev => prev.map(s => s._id === studentId ? res.data.data : s));
    } catch (err) { alert(err.response?.data?.message || err.message); }
  };

  const handleDeleteFee = async (studentId, feeId) => {
    if (window.confirm("Delete invoice record?")) {
      try {
        const res = await api.delete(`/admin/students/${studentId}/fee/${feeId}`);
        if (res.data.success) setStudents(prev => prev.map(s => s._id === studentId ? res.data.data : s));
      } catch (err) { alert(err.response?.data?.message || err.message); }
    }
  };

  const safeInquiriesArray = Array.isArray(inquiries) ? inquiries : [];
  const pendingCount = safeInquiriesArray.filter(i => i && i.status === 'Pending').length;
  const totalInq = safeInquiriesArray.length || 1;

  const stats = [
    { label: 'Total Inquiries', value: safeInquiriesArray.length, color: T.teal, icon: 'users', pct: 100 },
    { label: 'Pending Trials',  value: pendingCount,    color: T.amber,  icon: 'clock', pct: Math.round((pendingCount / totalInq) * 100) },
    { label: 'Active Students', value: students.length,    color: T.green,  icon: 'grad',  pct: 100 },
    { label: 'Total Courses',   value: courses.length,     color: T.violet, icon: 'book',  pct: 100 },
  ];

  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'inquiries', icon: 'users',     label: 'Inquiries', badge: pendingCount },
    { id: 'students',  icon: 'grad',      label: 'Students',  badge: (Array.isArray(students) ? students : []).filter(s=> s && s.status==='Active').length },
    { id: 'courses',   icon: 'book',      label: 'Courses' }, 
    { id: 'blogs',     icon: 'blog',      label: 'Manage Blogs' },
    { id: 'security',  icon: 'lock',      label: 'Change Password' },
    { id: 'blacklist', icon: 'shield',    label: 'Threat Shield & IPs' } // 🛡️ New Security Tab
  ];

  if (loading) return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: T.bg, flexDirection: 'column', gap: 14 }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', border: `3px solid ${T.line}`, borderTopColor: T.accent, animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: T.sub, margin: 0 }}>Syncing dashboard data...</h3>
    </div>
  );

  return (
    <div style={S.root}>
      {/* SIDEBAR */}
      <div style={{ ...S.sidebar, marginLeft: sidebarOpen ? 0 : -232, transition: 'margin 0.25s' }}>
        <div style={S.logoRow}>
          <div style={S.logoBadge}><Icon d={Icons.crescent} size={17} /></div>
          <div>
            <div style={S.logoText}>Al Quran Institute</div>
            <div style={S.logoSub}>Admin Console</div>
          </div>
        </div>
        <div style={S.navLabel}>Main</div>
        <nav style={S.nav}>{navItems.map(item => (<NavBtn key={item.id} icon={item.icon} label={item.label} active={activeTab === item.id} badge={item.badge} onClick={() => setActiveTab(item.id)} />))}</nav>
        
        <div style={S.logoutArea}>
          <button style={S.logoutBtn} onClick={() => { if (window.confirm("Are you sure you want to log out?")) handleLogout(); }}>
            <Icon d={Icons.logout} size={15} />Logout
          </button>
        </div>
      </div>

      {/* MAIN VIEW AREA */}
      <div style={S.main}>
        <header style={S.topbar}>
          <div style={S.topbarLeft}>
            <button onClick={() => setSidebarOpen(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex' }}><Icon d={Icons.bars} size={18} /></button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={S.bellBtn}><Icon d={Icons.bell} size={16} /><span style={S.bellDot} /></div>
            <div style={S.userInfo}><div style={S.userName}>Mohsin Ishfaq</div><div style={S.userRole}>Super Admin</div></div>
            <div style={S.avatar}>MI</div>
          </div>
        </header>

        <main style={S.content}>
          {activeTab === 'dashboard' && <DashboardTab inquiries={inquiries} handleApprove={handleApprove} handleDelete={handleDelete} setActiveTab={setActiveTab} stats={stats} />}
          
          {activeTab === 'inquiries' && (
            <InquiriesModule 
              inquiries={safeInquiriesArray} 
              onApproveInquiry={handleApprove} 
              onDeleteInquiry={handleDelete}
              ActionBtn={ActionBtn} S={S} T={T}
            />
          )}
          
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

          {activeTab === 'blogs' && (
            <AdminAddBlog />
          )}

          {activeTab === 'security' && (
            <SecurityTab handleLogout={handleLogout} />
          )}

          {activeTab === 'blacklist' && (
            <SecurityDashboard />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;