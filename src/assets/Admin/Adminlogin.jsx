import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 🛡️ Security State Management
  const [isLocked, setIsLocked] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isBanned, setIsBanned] = useState(false);

  // 🔑 Forgot Password State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState({ type: '', message: '' });
  const [forgotLoading, setForgotLoading] = useState(false);

  const navigate = useNavigate();

  // ⏱️ Live Countdown Timer Engine
  useEffect(() => {
    let timer;
    if (isLocked && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            setError('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, countdown]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (isLocked || isBanned) return;

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/admin-auth/login', {
        email: email.trim(),
        password
      });

      if (res.data.success && res.data.token) {
        sessionStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('adminToken', res.data.token);
        navigate('/admin', { replace: true });
      } else {
        setError(res.data.message || 'Login failed. Please check credentials.');
      }
    } catch (err) {
      const data = err.response?.data;
      const status = err.response?.status;

      // 🚨 Level 2: 5 Attempts Banned (Status 403)
      if (status === 403 || data?.isBanned) {
        setIsBanned(true);
        setIsLocked(false);
        setError(data?.message || 'Access Denied: Your IP address has been suspended for 24 hours.');
        return;
      }

      // 🛡️ Level 1: 3 Attempts 30s Lockout (Status 429)
      if (status === 429 || data?.isLocked) {
        setIsLocked(true);
        setCountdown(data?.remainingSeconds || 30);
        setError('Too many failed attempts! Account locked for 30 seconds.');
        return;
      }

      // Dynamic Attempts Remaining Alert
      if (data?.attemptsRemaining !== undefined) {
        setError(`Invalid credentials. ${data.attemptsRemaining} attempt(s) remaining before a 30s lockout.`);
      } else {
        setError(data?.message || 'Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotStatus({ type: '', message: '' });
    setForgotLoading(true);

    try {
      await axios.post('http://localhost:5000/api/admin-auth/forgot-password', {
        email: forgotEmail.trim()
      });

      setForgotStatus({
        type: 'success',
        message: 'If that email is registered, a password reset link has been sent to it.'
      });
    } catch (err) {
      setForgotStatus({
        type: 'error',
        message: 'Something went wrong. Please try again in a moment.'
      });
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0f172a',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '35px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px', color: '#1e293b' }}>
          Admin Login
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '13px', marginBottom: '24px' }}>
          Enter credentials to access portal
        </p>

        {/* ─── 1. 🚨 24-HOUR BANNED SCREEN (5 FAILED ATTEMPTS) ─── */}
        {isBanned ? (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1.5px solid #ef4444',
            borderRadius: '10px',
            padding: '24px 18px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '36px', marginBottom: '10px' }}>🚫</div>
            <h3 style={{ margin: '0 0 8px 0', color: '#991b1b', fontSize: '16px', textTransform: 'uppercase' }}>
              Access Suspended
            </h3>
            <p style={{ color: '#b91c1c', fontSize: '13px', lineHeight: '1.5', margin: '0 0 16px 0' }}>
              Your device/IP address has exceeded 5 failed login attempts and is <b>banned for 24 hours</b>.
            </p>
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#7f1d1d',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 'bold',
              fontFamily: 'monospace'
            }}>
              STATUS: BLACKLISTED (FAIL2BAN)
            </div>
            <p style={{ color: '#64748b', fontSize: '11px', marginTop: '16px', lineHeight: '1.4' }}>
              Switch to mobile data to unblock or contact the super administrator.
            </p>
          </div>
        ) : isLocked ? (

          /* ─── 2. ⏳ 30-SECOND COUNTDOWN SCREEN (3 FAILED ATTEMPTS) ─── */
          <div style={{
            backgroundColor: '#fffbeb',
            border: '1.5px solid #f59e0b',
            borderRadius: '10px',
            padding: '24px 18px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⏳</div>
            <h3 style={{ margin: '0 0 6px 0', color: '#92400e', fontSize: '15px' }}>
              Temporary Lockout Active
            </h3>
            <p style={{ color: '#b45309', fontSize: '12px', margin: '0 0 18px 0' }}>
              Inputs hidden for security. Form will restore in:
            </p>

            {/* Countdown Badge */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              border: '3px solid #f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              fontSize: '26px',
              fontWeight: 'bold',
              color: '#b45309',
              fontFamily: 'monospace',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)'
            }}>
              {countdown}s
            </div>

            <p style={{ color: '#78350f', fontSize: '11px', margin: 0 }}>
              An intruder alert notification has been sent to the admin email.
            </p>
          </div>

        ) : (

          /* ─── 3. 🔑 NORMAL FORM (INPUTS DISPLAYED) ─── */
          <>
            {error && (
              <div style={{
                backgroundColor: '#fee2e2',
                color: '#b91c1c',
                padding: '10px',
                borderRadius: '6px',
                fontSize: '13px',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#334155' }}>
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@alquran.com"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#334155' }}>
                  PASSWORD
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email);
                    setShowForgotModal(true);
                    setForgotStatus({ type: '', message: '' });
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2563eb',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#1e3a8a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Verifying...' : 'Sign In'}
              </button>
            </form>
          </>
        )}

        {/* ─── Forgot Password Modal ─────────────────────────────── */}
        {showForgotModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '28px',
              width: '100%',
              maxWidth: '380px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
            }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#0f172a' }}>
                Reset Admin Password
              </h3>
              <p style={{ margin: '0 0 16px 0', fontSize: '12.5px', color: '#64748b' }}>
                Enter your registered admin email address to receive a secure password recovery link.
              </p>

              {forgotStatus.message && (
                <div style={{
                  padding: '10px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  marginBottom: '14px',
                  background: forgotStatus.type === 'error' ? '#fee2e2' : '#dcfce7',
                  color: forgotStatus.type === 'error' ? '#991b1b' : '#166534'
                }}>
                  {forgotStatus.message}
                </div>
              )}

              <form onSubmit={handleForgotPassword}>
                <input
                  type="email"
                  required
                  placeholder="admin@alquran.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    marginBottom: '16px',
                    boxSizing: 'border-box',
                    fontSize: '13px'
                  }}
                />

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      background: '#f8fafc',
                      color: '#475569',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      background: '#c2410c',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: forgotLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {forgotLoading ? 'Sending...' : 'Send Link'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;