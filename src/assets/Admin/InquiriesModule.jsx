import React, { useState } from 'react';

const InquiriesModule = ({ inquiries = [], onApproveInquiry, onDeleteInquiry, ActionBtn, S, T }) => {
  const [statusFilter, setStatusFilter] = useState('Pending');

  // Safety guard check for array format
  const safeInquiries = Array.isArray(inquiries) ? inquiries : [];

  // Filter inquiries based on Pending or Approved status
  const filtered = safeInquiries.filter(inq => {
    if (!inq) return false;
    return inq.status === statusFilter;
  });

  return (
    <div>
      <div style={S.pageTitle}>Admission Inquiries</div>
      <div style={S.pageSub}>Review incoming free trial requests and migrate qualified leads directly into the students ecosystem.</div>

      {/* Filter Tabs Grid Layout */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button 
          onClick={() => setStatusFilter('Pending')}
          style={{ padding: '8px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', background: statusFilter === 'Pending' ? '#0f766e' : '#f1f5f9', color: statusFilter === 'Pending' ? '#fff' : '#64748b' }}
        >
          Pending Review ({safeInquiries.filter(i => i.status === 'Pending').length})
        </button>
        <button 
          onClick={() => setStatusFilter('Approved')}
          style={{ padding: '8px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', background: statusFilter === 'Approved' ? '#0f766e' : '#f1f5f9', color: statusFilter === 'Approved' ? '#fff' : '#64748b' }}
        >
          Approved History ({safeInquiries.filter(i => i.status === 'Approved').length})
        </button>
      </div>

      {/* Dynamic List Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8', border: '1px dashed #cbd5e1', borderRadius: 12, fontSize: 13 }}>
            No inquiries found matching the "{statusFilter}" status metric context layer.
          </div>
        ) : (
          filtered.map((inq) => (
            <div key={inq._id} style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, padding: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>
                  {inq.parentName} <span style={{ fontSize: 11, fontWeight: 400, color: '#64748b' }}>({inq.country})</span>
                </div>
                <div style={{ fontSize: 12, color: '#334155', marginBottom: 6 }}>
                  <strong>Course Choice:</strong> {inq.course}
                </div>
                
                {/* Internal Loop for Multiple Children/Students registered in single dynamic context */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                  {Array.isArray(inq.students) && inq.students.map((st, idx) => (
                    <span key={idx} style={{ background: '#f8fafc', border: '0.5px solid #e2e8f0', padding: '3px 8px', borderRadius: 6, fontSize: 11, color: '#475569' }}>
                      👤 {st.studentName} ({st.age}y - {st.gender})
                    </span>
                  ))}
                </div>

                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 10 }}>
                  📞 WhatsApp: {inq.whatsapp} | 📧 Email: {inq.email}
                </div>
              </div>

              {/* Action Operations Control Panels */}
              {statusFilter === 'Pending' && (
                <div style={{ display: 'flex', gap: 6 }}>
                  {/* Green Check Button for Automated Migration logic setup */}
                  <ActionBtn icon="check" color="#16a34a" hoverBg="#f0fdf4" hoverBorder="#bbf7d0" onClick={() => onApproveInquiry(inq._id)} />
                  <ActionBtn icon="trash" color="#dc2626" hoverBg="#fef2f2" hoverBorder="#fecaca" onClick={() => onDeleteInquiry(inq._id)} />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InquiriesModule;