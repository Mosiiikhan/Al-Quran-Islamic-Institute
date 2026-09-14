import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import axios from 'axios';
import 'react-quill-new/dist/quill.snow.css';

const AdminAddBlog = () => {
  // Navigation / View States
  const [view, setView] = useState('list'); // 'list' ya 'form'
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form Fields State
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('General');
  const [homePosition, setHomePosition] = useState(0); 

  // Custom category field handler state
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  // Details dekhne ke liye popup modal ki state
  const [previewBlog, setPreviewBlog] = useState(null);

  // Full-size image ko alag se lightbox mein dekhne ke liye state
  const [showFullImage, setShowFullImage] = useState(false);

  // 🚀 NEW: Custom Beautiful Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const API_URL = 'http://localhost:5000/api/blogs';
  const defaultCategories = ['General', 'Tajweed Rules', 'Quran Learning', 'Islamic History', 'Announcements'];

  // 🚀 Helper to trigger custom beautiful alert trigger
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3500); // 3.5 seconds baad automatic slide out
  };

  // 📖 1. Database Se Saare Blogs Fetch Karna
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/all-blogs`);
      if (response.data.success) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      console.error("Fetch blogs error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // 🖼️ 2. Image conversion block (No MB limit)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 🚀 3. Form Submit Handler (Beautiful Alert System Enabled)
  const handleSubmit = async (statusType) => {
    if (!title || !content || !image || !category.trim()) {
      showToast("Please fill all fields, select/type a category, and upload an image!", "error");
      return;
    }

    setLoading(true);
    try {
      const payload = { title, content, image, category, status: statusType, homePosition };

      if (editingId) {
        // UPDATE/EDIT BLOG
        const response = await axios.put(`${API_URL}/update-blog/${editingId}`, payload);
        if (response.data.success) showToast("Blog Updated & Synced Successfully! 👍", "success");
      } else {
        // NEW BLOG POST
        const response = await axios.post(`${API_URL}/add-blog`, payload);
        if (response.data.success) showToast(`Blog Saved as ${statusType}! 🎉`, "success");
      }

      resetForm();
      fetchBlogs();
      setView('list');
    } catch (error) {
      console.error("Submit error:", error);
      showToast("Action failed. Server error.", "error");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ 4. Blog Delete Handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog permanently?")) {
      try {
        const response = await axios.delete(`${API_URL}/delete-blog/${id}`);
        if (response.data.success) {
          setBlogs(prev => prev.filter(b => b._id !== id));
          showToast("Blog deleted permanently! 🗑️", "success");
        }
      } catch (error) {
        showToast("Failed to delete blog.", "error");
      }
    }
  };

  // 📝 5. Edit Button Click Handler
  const handleEditClick = (blog) => {
    setEditingId(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
    setImage(blog.image);
    setCategory(blog.category || 'General');
    setHomePosition(blog.homePosition || 0); 

    if (blog.category && !defaultCategories.includes(blog.category)) {
      setIsCustomCategory(true);
    } else {
      setIsCustomCategory(false);
    }

    setView('form');
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setImage('');
    setCategory('General');
    setHomePosition(0); 
    setIsCustomCategory(false);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReadTime = (html) => {
    if (!html) return '1 min read';
    const text = html.replace(/<[^>]*>/g, ' ');
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", padding: '10px', position: 'relative' }}>

      {/* ─── 🚀 🌟 CUSTOM ANIMATED ALERTS LAYOUT COMPONENT ─── */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: toast.type === 'success' ? '#10B981' : '#EF4444',
          color: '#ffffff',
          padding: '16px 28px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
          zIndex: 100000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontWeight: '600',
          fontSize: '14px',
          animation: 'slideIn 0.3s ease-out forwards',
          transition: 'all 0.3s ease-in-out'
        }}>
          <span>{toast.type === 'success' ? '✅' : '❌'}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* CSS Animation Keyframes for Toast injected directly */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* ─── VIEW 1: BLOGS LIST TABLE ─── */}
      {view === 'list' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>Manage Blogs</h2>
              <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '13px' }}>Create, edit, delete or allocate homepage positions for your journal articles.</p>
            </div>
            <button
              onClick={() => { resetForm(); setView('form'); }}
              style={{ padding: '10px 18px', backgroundColor: '#b8860b', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              ➕ Add New Blog
            </button>
          </div>

          <div style={{ background: '#ffffff', border: '0.5px solid #e7eaee', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(15,23,42,0.04)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#fafbfc', borderBottom: '0.5px solid #e7eaee' }}>
                  <th style={{ padding: '14px 16px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Image</th>
                  <th style={{ padding: '14px 16px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Title</th>
                  <th style={{ padding: '14px 16px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Category</th>
                  <th style={{ padding: '14px 16px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Home Allocation</th> 
                  <th style={{ padding: '14px 16px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '14px 16px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>Loading articles...</td></tr>
                ) : blogs.length === 0 ? (
                  <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No blogs found. Click "Add New Blog" to write your first article.</td></tr>
                ) : blogs.map(blog => (
                  <tr key={blog._id} style={{ borderBottom: '0.5px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ width: '60px', height: '40px', borderRadius: '6px', border: '1.5px solid #e2e8f0', background: '#0f172a', overflow: 'hidden' }}>
                        <img src={blog.image} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{blog.title}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#475569' }}>
                      <span style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: '6px', border: '0.5px solid #e2e8f0' }}>{blog.category}</span>
                    </td>
                    
                    <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '700' }}>
                      {blog.homePosition === 1 && <span style={{ color: '#b8860b' }}>🥇 Block 1 Slot</span>}
                      {blog.homePosition === 2 && <span style={{ color: '#64748b' }}>🥈 Block 2 Slot</span>}
                      {blog.homePosition === 3 && <span style={{ color: '#b45309' }}>🥉 Block 3 Slot</span>}
                      {(!blog.homePosition || blog.homePosition === 0) && <span style={{ color: '#94a3b8', fontWeight: '400' }}>Journal View Only</span>}
                    </td>

                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        background: blog.status === 'Draft' ? '#fff7ed' : '#f0fdf4',
                        color: blog.status === 'Draft' ? '#c2410c' : '#15803d',
                        border: `0.5px solid ${blog.status === 'Draft' ? '#fed7aa' : '#bbf7d0'}`,
                        padding: '3px 9px', borderRadius: '999px', fontSize: '11px', fontWeight: '700'
                      }}>
                        {blog.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <button onClick={() => setPreviewBlog(blog)} style={{ background: '#e0f2fe', border: '1px solid #bae6fd', color: '#0369a1', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', marginRight: '6px', fontSize: '12px', fontWeight: '500' }}>👁️ View</button>
                      <button onClick={() => handleEditClick(blog)} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', marginRight: '6px', fontSize: '12px', fontWeight: '500' }}>✏️ Edit</button>
                      <button onClick={() => handleDelete(blog._id)} style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}>🗑️ Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── VIEW 2: DYNAMIC ADD / EDIT FORM ─── */}
      {view === 'form' && (
        <div style={{ maxWidth: '800px', background: '#fff', padding: '24px', borderRadius: '14px', border: '0.5px solid #e7eaee', boxShadow: '0 1px 2px rgba(15,23,42,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>{editingId ? '📝 Edit Blog Article' : '✨ Write New Article'}</h3>
            <button onClick={() => setView('list')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '600' }}>← Back to List</button>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px' }}>Blog Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a catchy title..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px' }}>Category:</label>
              {!isCustomCategory ? (
                <select
                  value={category}
                  onChange={(e) => {
                    if (e.target.value === 'Add Custom') {
                      setIsCustomCategory(true);
                      setCategory('');
                    } else {
                      setCategory(e.target.value);
                    }
                  }}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}
                >
                  {defaultCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  <option value="Add Custom">➕ Add New Custom Category...</option>
                </select>
              ) : (
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Type custom category name..."
                    style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                  <button
                    type="button"
                    onClick={() => { setIsCustomCategory(false); setCategory('General'); }}
                    style={{ padding: '10px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                  >
                    ❌ Cancel
                  </button>
                </div>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px' }}>Thumbnail Image:</label>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
            <label style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>⭐ Pin / Feature Position Allocation:</label>
            <select 
              value={homePosition} 
              onChange={(e) => setHomePosition(Number(e.target.value))} 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
            >
              <option value={0}>Don't show on Home Page Scroll View (Regular Journal Blog)</option>
              <option value={1}>🥇 Allocate Position 1 (Main Headliner Banner Card)</option>
              <option value={2}>🥈 Allocate Position 2 (Second Grid Card Slot)</option>
              <option value={3}>🥉 Allocate Position 3 (Third Grid Card Slot)</option>
            </select>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>*Note: Choosing an allocated slot will auto-bump out any old blog occupying that index position.</p>
          </div>

          {image && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ width: '120px', height: '80px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#0f172a', overflow: 'hidden' }}>
                <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            </div>
          )}

          <div style={{ marginBottom: '60px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px' }}>Blog Content:</label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Start writing your beautiful article here..."
              style={{ height: '240px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setView('list')} style={{ padding: '10px 20px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: '650' }}>Cancel</button>
            <button type="button" disabled={loading} onClick={() => handleSubmit('Draft')} style={{ padding: '10px 20px', background: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa', borderRadius: '6px', cursor: 'pointer', fontWeight: '650' }}>📥 Save as Draft</button>
            <button type="button" disabled={loading} onClick={() => handleSubmit('Published')} style={{ padding: '10px 20px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '650' }}>🚀 {editingId ? 'Update & Sync' : 'Publish Blog'}</button>
          </div>
        </div>
      )}

      {/* ─── 🔐 6. ADMIN VIEW DETAILS POPUP MODAL ─── */}
      {previewBlog && (
        <div
          onClick={() => setPreviewBlog(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              width: '100%',
              maxWidth: '920px',
              maxHeight: '88vh',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div style={{
              width: '280px',
              minWidth: '280px',
              background: '#fafbfc',
              borderRight: '0.5px solid #e7eaee',
              padding: '24px 20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '3px solid #ffffff',
                  boxShadow: '0 4px 14px rgba(15,23,42,0.12)',
                  background: '#0f172a',
                }}>
                  <img
                    src={previewBlog.image}
                    alt={previewBlog.title}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>

                <button
                  onClick={() => setShowFullImage(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: '#ffffff', border: '1px solid #cbd5e1',
                    color: '#334155', padding: '7px 14px', borderRadius: '8px',
                    fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                    width: '100%', justifyContent: 'center',
                  }}
                >
                  🔍 View Full Image
                </button>
              </div>

              <div style={{ width: '100%', height: '1px', background: '#e7eaee', margin: '4px 0' }} />

              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ fontSize: '15px', lineHeight: '1.2' }}>⭐</span>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Home Placement</div>
                    <span style={{
                      display: 'inline-block', marginTop: '3px',
                      background: previewBlog.homePosition > 0 ? '#fef9c3' : '#f1f5f9', 
                      color: previewBlog.homePosition > 0 ? '#854d0e' : '#475569',
                      border: `1px solid ${previewBlog.homePosition > 0 ? '#fef08a' : '#cbd5e1'}`,
                      padding: '3px 9px', borderRadius: '999px',
                      fontSize: '11px', fontWeight: '700',
                    }}>
                      {previewBlog.homePosition === 1 && "🥇 1st Row Slot"}
                      {previewBlog.homePosition === 2 && "🥈 2nd Row Slot"}
                      {previewBlog.homePosition === 3 && "🥉 3rd Row Slot"}
                      {(!previewBlog.homePosition || previewBlog.homePosition === 0) && "Standard View"}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ fontSize: '15px', lineHeight: '1.2' }}>🏷️</span>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Category</div>
                    <span style={{ display: 'inline-block', marginTop: '3px', background: '#fdf6e3', color: '#92660a', border: '0.5px solid #f3e0a8', padding: '3px 9px', borderRadius: '999px', fontSize: '11px', fontWeight: '700' }}>
                      {previewBlog.category}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ fontSize: '15px', lineHeight: '1.2' }}>📌</span>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Status</div>
                    <span style={{ display: 'inline-block', marginTop: '3px', background: previewBlog.status === 'Draft' ? '#fff7ed' : '#f0fdf4', color: previewBlog.status === 'Draft' ? '#c2410c' : '#15803d', border: `0.5px solid ${previewBlog.status === 'Draft' ? '#fed7aa' : '#bbf7d0'}`, padding: '3px 9px', borderRadius: '999px', fontSize: '11px', fontWeight: '700' }}>
                      {previewBlog.status}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ fontSize: '15px', lineHeight: '1.2' }}>📅</span>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Created</div>
                    <div style={{ fontSize: '12.5px', fontWeight: '600', color: '#334155', marginTop: '3px' }}>{formatDateTime(previewBlog.createdAt)}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ fontSize: '15px', lineHeight: '1.2' }}>⏱️</span>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Read Time</div>
                    <div style={{ fontSize: '12.5px', fontWeight: '600', color: '#334155', marginTop: '3px' }}>{getReadTime(previewBlog.content)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <div style={{ padding: '22px 26px 18px', borderBottom: '0.5px solid #f1f5f9', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ paddingRight: '16px', flex: 1 }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b8860b', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span>📰</span> Blog Article
                  </div>
                  <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: 0, lineHeight: '1.35', letterSpacing: '-0.01em' }}>
                    {previewBlog.title}
                  </h2>
                </div>

                <button
                  onClick={() => setPreviewBlog(null)}
                  style={{ flexShrink: 0, background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '20px 26px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '13px' }}>📝</span>
                  <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8' }}>
                    Article Content
                  </span>
                  <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
                </div>

                <div dangerouslySetInnerHTML={{ __html: previewBlog.content }} style={{ fontSize: '14.5px', color: '#334155', lineHeight: '1.8' }} />
              </div>

              <div style={{ padding: '14px 26px', borderTop: '0.5px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', gap: '10px', background: '#fafbfc' }}>
                <button
                  onClick={() => { setPreviewBlog(null); handleEditClick(previewBlog); }}
                  style={{ padding: '9px 16px', backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                >
                  ✏️ Edit This Blog
                </button>
                <button
                  onClick={() => setPreviewBlog(null)}
                  style={{ padding: '9px 18px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔍 7. FULL IMAGE LIGHTBOX ── */}
      {showFullImage && previewBlog && (
        <div
          onClick={() => setShowFullImage(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '40px', cursor: 'zoom-out' }}
        >
          <button
            onClick={() => setShowFullImage(false)}
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', width: '38px', height: '38px', borderRadius: '50%', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ✕
          </button>
          <img
            src={previewBlog.image}
            alt={previewBlog.title}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', cursor: 'default' }}
          />
        </div>
      )}

    </div>
  );
};

export default AdminAddBlog;