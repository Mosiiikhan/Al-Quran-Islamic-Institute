import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit, FaStar, FaClock } from 'react-icons/fa';

export const PricingModule = ({ plans = [], onAddPlan, onUpdatePlan, onDeletePlan }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const [form, setForm] = useState({
    title: '',
    schedule: '',
    daysPerWeek: 3,
    classesPerMonth: 12,
    priceUSD30: 50,
    priceGBP30: 40,
    priceUSD45: 68,
    priceGBP45: 54,
    isPopular: false,
    sortOrder: 0
  });

  const openAdd = () => {
    setEditingPlan(null);
    setForm({
      title: '3 Days / Week',
      schedule: 'Any 3 Days (Mon - Fri)',
      daysPerWeek: 3,
      classesPerMonth: 12,
      priceUSD30: 50,
      priceGBP30: 40,
      priceUSD45: 68,
      priceGBP45: 54,
      isPopular: false,
      sortOrder: plans.length + 1
    });
    setModalOpen(true);
  };

  const openEdit = (plan) => {
    setEditingPlan(plan);
    setForm({
      title: plan.title,
      schedule: plan.schedule || '',
      daysPerWeek: plan.daysPerWeek,
      classesPerMonth: plan.classesPerMonth,
      priceUSD30: plan.priceUSD30 || 0,
      priceGBP30: plan.priceGBP30 || 0,
      priceUSD45: plan.priceUSD45 || 0,
      priceGBP45: plan.priceGBP45 || 0,
      isPopular: plan.isPopular,
      sortOrder: plan.sortOrder || 0
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPlan) {
      onUpdatePlan(editingPlan._id, form);
    } else {
      onAddPlan(form);
    }
    setModalOpen(false);
  };

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>💳 Manage Tuition Plans</div>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>Set monthly rates for both 30 Mins and 45 Mins classes (USD & GBP).</div>
        </div>
        <button
          onClick={openAdd}
          style={{
            padding: '10px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#0f766e,#0d9488)',
            border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: 12,
            display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 2px 8px rgba(15,118,110,0.3)'
          }}
        >
          <FaPlus size={11} /> Add New Plan
        </button>
      </div>

      {/* Cards List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {plans.map(plan => (
          <div
            key={plan._id}
            style={{
              background: '#fff',
              borderRadius: 16,
              border: plan.isPopular ? '2px solid #f59e0b' : '1px solid #e2e8f0',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            {plan.isPopular && (
              <div style={{
                position: 'absolute', top: 0, right: 0,
                background: '#f59e0b', color: '#fff', fontSize: 10,
                fontWeight: 800, padding: '3px 12px', borderRadius: '0 14px 0 10px',
                display: 'flex', alignItems: 'center', gap: 4
              }}>
                <FaStar size={10} /> POPULAR
              </div>
            )}

            <div style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', marginTop: plan.isPopular ? 10 : 0 }}>
              {plan.title}
            </div>

            <div style={{ fontSize: 12, color: '#c2410c', fontWeight: 700, marginTop: 2 }}>
              {plan.schedule}
            </div>

            <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
              {plan.classesPerMonth} Classes / Month
            </div>

            {/* Rates Overview Box */}
            <div style={{ margin: '14px 0', padding: '12px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                <span style={{ fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <FaClock size={11} color="#0f766e" /> 30 Mins:
                </span>
                <span style={{ fontWeight: 800, color: '#0f766e' }}>
                  ${plan.priceUSD30} / £{plan.priceGBP30}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, borderTop: '1px dashed #e2e8f0', paddingTop: 6 }}>
                <span style={{ fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <FaClock size={11} color="#c2410c" /> 45 Mins:
                </span>
                <span style={{ fontWeight: 800, color: '#c2410c' }}>
                  ${plan.priceUSD45} / £{plan.priceGBP45}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <button
                onClick={() => openEdit(plan)}
                style={{ flex: 1, padding: '8px 0', borderRadius: 8, background: '#f8fafc', border: '1px solid #cbd5e1', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
              >
                <FaEdit size={12} /> Edit
              </button>
              <button
                onClick={() => onDeletePlan(plan._id)}
                style={{ padding: '8px 12px', borderRadius: 8, background: '#fff5f5', border: '1px solid #fee2e2', cursor: 'pointer', fontSize: 12, color: '#dc2626' }}
              >
                <FaTrash size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,15,31,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto', padding: 24, boxShadow: '0 30px 70px rgba(0,0,0,0.3)' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 17, fontWeight: 800 }}>
              {editingPlan ? '✏️ Edit Tuition Plan' : '🚀 Add Tuition Plan'}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: 4 }}>Plan Name</label>
                <input
                  type="text" required value={form.title} placeholder="e.g. 3 Days / Week"
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: 4 }}>Schedule Subtitle</label>
                <input
                  type="text" required value={form.schedule} placeholder="e.g. Any 3 Days (Mon - Fri)"
                  onChange={e => setForm({ ...form, schedule: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: 4 }}>Days / Week</label>
                  <input
                    type="number" min={1} max={7} value={form.daysPerWeek}
                    onChange={e => setForm({ ...form, daysPerWeek: Number(e.target.value) })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: 4 }}>Classes / Month</label>
                  <input
                    type="number" value={form.classesPerMonth}
                    onChange={e => setForm({ ...form, classesPerMonth: Number(e.target.value) })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* 30 Mins Rates Box */}
              <div style={{ background: '#f0fdf4', padding: 12, borderRadius: 10, border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#166534', marginBottom: 6 }}>⏱ 30 MINS SESSIONS RATES</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 700, color: '#166534' }}>USD ($)</label>
                    <input type="number" required value={form.priceUSD30} onChange={e => setForm({ ...form, priceUSD30: Number(e.target.value) })} style={{ width: '100%', padding: '8px', borderRadius: 6, border: '1px solid #86efac', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 700, color: '#166534' }}>GBP (£)</label>
                    <input type="number" required value={form.priceGBP30} onChange={e => setForm({ ...form, priceGBP30: Number(e.target.value) })} style={{ width: '100%', padding: '8px', borderRadius: 6, border: '1px solid #86efac', boxSizing: 'border-box' }} />
                  </div>
                </div>
              </div>

              {/* 45 Mins Rates Box */}
              <div style={{ background: '#fff7ed', padding: 12, borderRadius: 10, border: '1px solid #fed7aa' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#9a3412', marginBottom: 6 }}>⏱ 45 MINS SESSIONS RATES</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 700, color: '#9a3412' }}>USD ($)</label>
                    <input type="number" required value={form.priceUSD45} onChange={e => setForm({ ...form, priceUSD45: Number(e.target.value) })} style={{ width: '100%', padding: '8px', borderRadius: 6, border: '1px solid #fdba74', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 700, color: '#9a3412' }}>GBP (£)</label>
                    <input type="number" required value={form.priceGBP45} onChange={e => setForm({ ...form, priceGBP45: Number(e.target.value) })} style={{ width: '100%', padding: '8px', borderRadius: 6, border: '1px solid #fdba74', boxSizing: 'border-box' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox" id="popularCheck" checked={form.isPopular}
                  onChange={e => setForm({ ...form, isPopular: e.target.checked })}
                  style={{ width: 16, height: 16, cursor: 'pointer' }}
                />
                <label htmlFor="popularCheck" style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', cursor: 'pointer' }}>
                  Mark as "Most Popular" Plan
                </label>
              </div>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
                <button
                  type="button" onClick={() => setModalOpen(false)}
                  style={{ padding: '9px 16px', borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 12 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '9px 20px', borderRadius: 8, border: 'none', background: '#0f766e', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: 12 }}
                >
                  {editingPlan ? 'Save Changes' : 'Publish Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};