import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// Ye page route jaisa hoga: /admin/reset-password/:token
// Email mein bheja gaya link isi route pe le kar aayega.
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [checkingToken, setCheckingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [done, setDone] = useState(false);

  // Page load hote hi sabse pehle token ko verify karo —
  // taake user ko form dikhane se pehle pata chal jaye k link
  // expire to nahi ho chuki ya pehle hi use to nahi ho chuki.
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin-auth/reset-password/${token}/verify`);
        setTokenValid(res.data.success === true);
      } catch (err) {
        setTokenValid(false);
      } finally {
        setCheckingToken(false);
      }
    };
    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (newPassword !== confirmPassword) {
      return setStatus({ type: 'error', message: 'Passwords do not match.' });
    }
    if (newPassword.length < 8) {
      return setStatus({ type: 'error', message: 'Password must be at least 8 characters long.' });
    }

    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:5000/api/admin-auth/reset-password/${token}`, {
        newPassword
      });

      if (res.data.success) {
        setDone(true);
        setStatus({ type: 'success', message: 'Password updated successfully. Redirecting to login...' });
        setTimeout(() => navigate('/admin/login', { replace: true }), 2000);
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Could not reset password. The link may have expired.'
      });
    } finally {
      setLoading(false);
    }
  };

  const wrapperStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    fontFamily: 'sans-serif',
    padding: '20px'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '35px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  };

  if (checkingToken) {
    return (
      <div style={wrapperStyle}>
        <div style={{ ...cardStyle, textAlign: 'center', color: '#64748b', fontSize: 13 }}>
          Verifying reset link...
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div style={wrapperStyle}>
        <div style={cardStyle}>
          <h2 style={{ textAlign: 'center', color: '#b91c1c', marginBottom: 10 }}>Link Expired</h2>
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: 13, marginBottom: 20 }}>
            This password reset link is invalid or has already expired. Please request a new one from the login page.
          </p>
          <button
            onClick={() => navigate('/admin/login')}
            style={{
              width: '100%', padding: '12px', backgroundColor: '#1e3a8a', color: '#fff',
              border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px', color: '#1e293b' }}>
          Set New Password
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '13px', marginBottom: '24px' }}>
          Choose a new password for your admin account
        </p>

        {status.message && (
          <div style={{
            backgroundColor: status.type === 'error' ? '#fee2e2' : '#dcfce7',
            color: status.type === 'error' ? '#b91c1c' : '#166534',
            padding: '10px',
            borderRadius: '6px',
            fontSize: '13px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {status.message}
          </div>
        )}

        {!done && (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#334155' }}>
                NEW PASSWORD
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                style={{
                  width: '100%', padding: '10px', borderRadius: '6px',
                  border: '1px solid #cbd5e1', boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#334155' }}>
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                style={{
                  width: '100%', padding: '10px', borderRadius: '6px',
                  border: '1px solid #cbd5e1', boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '12px', backgroundColor: '#1e3a8a', color: '#ffffff',
                border: 'none', borderRadius: '6px', fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;