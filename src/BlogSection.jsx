import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 🚀 FIXED: Routing Navigation for Separate Page

const BlogSection = ({ isFullPageDefault = false }) => {
  const [allBlogs, setAllBlogs]             = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [loading, setLoading]               = useState(false);
  const [selectedBlog, setSelectedBlog]     = useState(null);

  const navigate = useNavigate(); // 🚀 Navigation hook
  const API_URL = 'http://localhost:5000/api/blogs';

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/all-blogs`);
      if (res.data.success) {
        const published = res.data.data.filter(b => b.status === 'Published');
        setAllBlogs(published);
        applySlotLogic(published, isFullPageDefault, setDisplayedBlogs);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const applySlotLogic = (blogs, fullMode, setter) => {
    if (fullMode) { setter(blogs); return; }
    const pos1 = blogs.find(b => b.homePosition === 1);
    const pos2 = blogs.find(b => b.homePosition === 2);
    const pos3 = blogs.find(b => b.homePosition === 3);
    const reg  = blogs.filter(b => !b.homePosition || b.homePosition === 0);
    let out = [], ri = 0;
    [pos1, pos2, pos3].forEach(p => {
      if (p) out.push(p);
      else if (reg[ri]) out.push(reg[ri++]);
    });
    setter(out);
  };

  useEffect(() => { fetchBlogs(); }, [isFullPageDefault]);

  useEffect(() => {
    if (selectedBlog) document.body.style.overflow = 'hidden';
    else              document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedBlog]);

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') setSelectedBlog(null); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  // 🚀 FIXED: HTML entities and aggressive whitespace filter sanitizer
  const getPreview = (html, n = 115) => {
    if (!html) return '';
    let t = html.replace(/<[^>]*>/g, ' ');
    t = t.replace(/&nbsp;/g, ' ')
         .replace(/&amp;/g, '&')
         .replace(/&lt;/g, '<')
         .replace(/&gt;/g, '>')
         .replace(/\s+/g, ' ')
         .trim();
    return t;
  };
  
  const fmtDate = ds => !ds ? '' : new Date(ds).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  const readTime = html => {
    if (!html) return '1 min read';
    const w = html.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.ceil(w / 200))} min read`;
  };

  /* ══════════════════════════════════════════════
      FIXED FULL-SCREEN MODAL (NO IMAGE CROPPING)
     ══════════════════════════════════════════════ */
  const BlogModal = ({ blog, onClose }) => (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(8, 18, 40, 0.80)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        overflowY: 'auto',
        padding: '24px 16px 48px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '860px',
          background: '#ffffff',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 40px 80px rgba(8,18,40,0.40)',
          fontFamily: "'Inter', -apple-system, sans-serif",
        }}
      >

        {/* ── HERO IMAGE — 🚀 FIXED: objectFit contain to avoid cutting top/bottom ── */}
        <div style={{ position: 'relative', width: '100%', lineHeight: 0, background: '#0f172a' }}>
          <img
            src={blog.image}
            alt={blog.title}
            style={{
              width: '100%',
              maxHeight: '480px',
              objectFit: 'contain', // 🚀 Zero Cropping Fix
              display: 'block',
              margin: '0 auto',
            }}
          />

          {/* dark gradient overlay — bottom 60% only */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(8,18,40,0.05) 30%, rgba(8,18,40,0.85) 100%)',
            pointerEvents: 'none',
          }} />

          {/* Close button */}
          <button
            onClick={onClose}
            title="Close"
            style={{
              position: 'absolute', top: '16px', right: '16px',
              width: '38px', height: '38px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.20)',
              border: '1.5px solid rgba(255,255,255,0.40)',
              color: '#fff', fontSize: '16px', fontWeight: '700',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              lineHeight: 1,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.20)'}
          >✕</button>

          {/* Category pill */}
          <span style={{
            position: 'absolute', top: '18px', left: '20px',
            background: '#b8860b', color: '#fff',
            padding: '5px 14px', borderRadius: '999px',
            fontSize: '10.5px', fontWeight: '700',
            letterSpacing: '0.07em', textTransform: 'uppercase',
          }}>
            {blog.category || 'General'}
          </span>

          {/* Title + meta */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '24px 28px 26px',
          }}>
            <h1 style={{
              fontSize: 'clamp(18px, 3vw, 26px)',
              fontWeight: '800', color: '#fff',
              margin: '0 0 12px', lineHeight: '1.3',
              letterSpacing: '-0.015em',
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}>
              {blog.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { icon: '📅', text: fmtDate(blog.createdAt) },
                { icon: '⏱',  text: readTime(blog.content)  },
                { icon: '📌', text: blog.status || 'Published' },
              ].map(m => (
                <span key={m.text} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(6px)',
                  color: 'rgba(255,255,255,0.92)',
                  padding: '4px 12px', borderRadius: '999px',
                  fontSize: '11.5px', fontWeight: '500',
                }}>
                  <span>{m.icon}</span> {m.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTENT BODY ── */}
        <div style={{ padding: '36px 40px 44px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '4px', height: '20px', background: '#b8860b', borderRadius: '2px', flexShrink: 0 }} />
            <span style={{
              fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#94a3b8',
            }}>Article</span>
            <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
          </div>

          <div
            className="blog-article-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div style={{
            marginTop: '40px', paddingTop: '24px',
            borderTop: '1px solid #f1f5f9',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>Category:</span>
              <span style={{
                background: '#fdf6e3', color: '#92660a',
                border: '0.5px solid #f3e0a8',
                padding: '3px 12px', borderRadius: '999px',
                fontSize: '11.5px', fontWeight: '700',
              }}>
                {blog.category || 'General'}
              </span>
            </div>
            <button
              onClick={onClose}
              style={{
                padding: '10px 28px',
                background: '#0a1830', color: '#fff',
                border: 'none', borderRadius: '9px',
                fontWeight: '600', fontSize: '13.5px', cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#1e3a6e'}
              onMouseLeave={e => e.currentTarget.style.background = '#0a1830'}
            >
              Close Article
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .blog-article-content {
          font-size: 16px;
          color: #1e293b;
          line-height: 1.85;
          letter-spacing: 0.01em;
          word-break: break-word;
          overflow-wrap: break-word;
        }
        .blog-article-content h1,
        .blog-article-content h2,
        .blog-article-content h3 {
          color: #0f172a;
          font-weight: 700;
          line-height: 1.3;
          margin: 1.5em 0 0.5em;
        }
        .blog-article-content h1 { font-size: 24px; }
        .blog-article-content h2 { font-size: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; }
        .blog-article-content h3 { font-size: 17px; }
        .blog-article-content p  { margin: 0 0 1.2em; }
        .blog-article-content ul,
        .blog-article-content ol  { margin: 0 0 1.2em 1.6em; }
        .blog-article-content li  { margin-bottom: 6px; }
        .blog-article-content strong { color: #0f172a; }
        .blog-article-content a   { color: #b8860b; text-decoration: underline; }
        .blog-article-content blockquote {
          border-left: 4px solid #b8860b;
          margin: 1.4em 0;
          padding: 12px 20px;
          background: #fdf6e3;
          border-radius: 0 10px 10px 0;
          color: #92660a;
          font-style: italic;
        }
        .blog-article-content img {
          max-width: 100%;
          height: auto;
          border-radius: 10px;
          margin: 12px 0;
          display: block;
        }
        .blog-article-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1em 0;
          font-size: 14px;
        }
        .blog-article-content th,
        .blog-article-content td {
          border: 1px solid #e2e8f0;
          padding: 8px 12px;
          text-align: left;
        }
        .blog-article-content th { background: #f8fafc; font-weight: 700; }
        .blog-article-content pre {
          background: #f1f5f9;
          padding: 14px 18px;
          border-radius: 8px;
          overflow-x: auto;
          font-size: 13.5px;
          margin: 1em 0;
        }
      `}</style>
    </div>
  );

  /* ══════════════════════════════════════════════
      CARDS GRID VIEW RENDERBLOCK
     ══════════════════════════════════════════════ */
  return (
    <section id="blog-section" style={{ background: '#f8fafc', padding: '80px 0 100px', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{ flex: 1, maxWidth: '80px', height: '1.5px', background: 'linear-gradient(to right, transparent, #b8860b)' }} />
            <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#b8860b' }}>
              ✦ Learning Resources
            </span>
            <div style={{ flex: 1, maxWidth: '80px', height: '1.5px', background: 'linear-gradient(to left, transparent, #b8860b)' }} />
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#0a1830', margin: '0 0 14px', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
            {isFullPageDefault ? 'All Articles & Insights' : 'Blogs & Islamic Insights'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '15.5px', maxWidth: '560px', margin: '0 auto', lineHeight: '1.7' }}>
            Deepen your understanding of Quran, Tajweed rules, and Islamic knowledge — written by our qualified teachers at Al Quran Institute.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid #e2e8f0', borderTopColor: '#b8860b', animation: 'bspin 0.7s linear infinite', margin: '0 auto 14px' }} />
            <style>{`@keyframes bspin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: '14px', margin: 0 }}>Loading articles…</p>
          </div>
        )}

        {/* Cards */}
        {!loading && displayedBlogs.length > 0 && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px' }}>
              {displayedBlogs.map(blog => (
                <article
                  key={blog._id}
                  onClick={() => setSelectedBlog(blog)}
                  style={{
                    background: '#fff', borderRadius: '16px',
                    border: '1px solid #e8ecf0', overflow: 'hidden',
                    display: 'flex', flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.18s, box-shadow 0.18s',
                    boxShadow: '0 2px 8px rgba(10,24,48,0.05)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(10,24,48,0.10)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(10,24,48,0.05)'; }}
                >
                  {/* 🚀 FIXED: Object-fit contain inside a premium slate box */}
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden', flexShrink: 0, background: '#0f172a' }}>
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', margin: '0 auto' }} 
                    />
                    <span style={{ position: 'absolute', top: '14px', left: '14px', background: '#b8860b', color: '#fff', padding: '4px 11px', borderRadius: '999px', fontSize: '10.5px', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      {blog.category || 'General'}
                    </span>
                  </div>
                  
                  <div style={{ padding: '22px 22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: '600' }}>📅 {fmtDate(blog.createdAt)}</span>
                      <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#cbd5e1' }} />
                      <span style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: '600' }}>⏱ {readTime(blog.content)}</span>
                    </div>
                    
                    {/* 🚀 FIXED TITLE LAYOUT: Word breaking logic applied to card title */}
                    <h3 style={{ 
                      fontSize: '17px', 
                      fontWeight: '700', 
                      color: '#0f172a', 
                      margin: '0 0 10px', 
                      lineHeight: '1.45',
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word'
                    }}>
                      {blog.title}
                    </h3>
                    
                    {/* 🚀 FIXED PREVIEW WRAPPER: Smart Webkit Line Clamp prevents content from overflowing the card */}
                    <p style={{ 
                      fontSize: '13.5px', 
                      color: '#64748b', 
                      lineHeight: '1.65', 
                      margin: '0 0 20px', 
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      textOverflow: 'ellipsis'
                    }}>
                      {getPreview(blog.content)}
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b8860b', fontWeight: '700', fontSize: '13px' }}>
                      Read Full Article <span>→</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* 🚀 FIXED: Clean Routing Switcher Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '52px' }}>
              {!isFullPageDefault ? (
                <button
                  onClick={() => { navigate('/blogs'); window.scrollTo(0, 0); }}
                  style={{
                    padding: '13px 34px',
                    background: '#0a1830',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px', fontWeight: '600', fontSize: '14px', cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(10,24,48,0.18)',
                  }}
                >
                  📚 View All Articles
                </button>
              ) : (
                <button
                  onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
                  style={{
                    padding: '13px 34px',
                    background: '#f1f5f9',
                    color: '#475569',
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px', fontWeight: '600', fontSize: '14px', cursor: 'pointer',
                  }}
                >
                  ↩ Back to Home
                </button>
              )}
            </div>
          </>
        )}

        {!loading && displayedBlogs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>📭</div>
            <p style={{ fontSize: '15px', fontWeight: '600', color: '#64748b', margin: '0 0 6px' }}>No articles published yet</p>
            <p style={{ fontSize: '13px', margin: 0 }}>Check back soon.</p>
          </div>
        )}
      </div>

      {selectedBlog && <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />}
    </section>
  );
};

export default BlogSection;