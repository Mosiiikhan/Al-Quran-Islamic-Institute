import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SecurityDashboard = () => {
  const [bannedList, setBannedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState('');

  const token = localStorage.getItem('adminToken');

  const fetchBannedList = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/admin-auth/banned-ips', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setBannedList(res.data.list);
      }
    } catch (err) {
      console.error("Failed to load security list:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannedList();
  }, []);

  const handleUnban = async (ip) => {
    if (!window.confirm(`Are you sure you want to unban IP: ${ip}?`)) return;

    try {
      const res = await axios.post('http://localhost:5000/api/admin-auth/unban-ip', 
        { ip }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setActionMsg(`IP ${ip} unbanned successfully!`);
        fetchBannedList();
        setTimeout(() => setActionMsg(''), 4000);
      }
    } catch (err) {
      alert("Failed to unban IP");
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Security & Threat Shield</h1>
          <p className="text-sm text-slate-500">Monitor intruder attempts and manage blacklisted devices</p>
        </div>
        <button 
          onClick={fetchBannedList}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm hover:bg-slate-700 transition"
        >
          Refresh Logs
        </button>
      </div>

      {actionMsg && (
        <div className="mb-4 p-3 bg-emerald-100 text-emerald-800 text-sm rounded-lg border border-emerald-300 font-medium">
          {actionMsg}
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-rose-600 uppercase">Suspended IPs</span>
          <p className="text-2xl font-bold text-slate-800 mt-1">{bannedList.length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-amber-600 uppercase">Threshold Rule</span>
          <p className="text-2xl font-bold text-slate-800 mt-1">10 Attempts / 24h</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-emerald-600 uppercase">System Status</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">Active Protection 🔒</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/75 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
              <th className="p-4">IP Address</th>
              <th className="p-4">Device & OS</th>
              <th className="p-4">Browser</th>
              <th className="p-4">Target Account</th>
              <th className="p-4">Attempts</th>
              <th className="p-4">Ban Expiry</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {loading ? (
              <tr><td colSpan="7" className="p-6 text-center text-slate-400">Loading security logs...</td></tr>
            ) : bannedList.length === 0 ? (
              <tr><td colSpan="7" className="p-6 text-center text-slate-500">No suspended IPs. Platform is secure.</td></tr>
            ) : (
              bannedList.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-mono font-semibold text-rose-600">{item.ip}</td>
                  <td className="p-4 text-slate-700">{item.deviceInfo?.deviceType} ({item.deviceInfo?.os})</td>
                  <td className="p-4 text-slate-600">{item.deviceInfo?.browser}</td>
                  <td className="p-4 text-slate-600">{item.attemptedEmail || 'N/A'}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full">
                      {item.failedAttempts} failed
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 text-xs">
                    {item.isManuallyBanned ? 'Manual Lock' : new Date(item.bannedUntil).toLocaleString()}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleUnban(item.ip)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold shadow-sm transition"
                    >
                      Unban
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SecurityDashboard;