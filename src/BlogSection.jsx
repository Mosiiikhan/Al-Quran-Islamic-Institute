import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, FaClock, FaArrowLeft, FaHome, 
  FaWhatsapp, FaTwitter, FaBookOpen, FaUserGraduate, 
  FaSearch, FaCheckCircle, FaBookmark 
} from 'react-icons/fa';

import SEOEngine from './SEO/SEOEngine';
import { blogPageSEO } from './SEO/blogPageSEO';

const slugify = (text = '') => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const BlogSection = ({ isFullPageDefault = false }) => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const API_URL = import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api/blogs` 
    : 'http://localhost:5000/api/blogs';

  // 1. Reading Progress Bar for Active Article Reader
  useEffect(() => {
    if (!slug) return;
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setReadingProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  // 2. Fetch All Published Articles
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/all-blogs`);
        if (res.data?.success) {
          const published = res.data.data.filter(b => b.status === 'Published');
          setBlogs(published);
          applySlotLogic(published, isFullPageDefault);
        }
      } catch (err) {
        console.error("Fetch blogs error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [API_URL, isFullPageDefault]);

  // 3. Slot Logic: Pinned slots for Home vs All for Catalog
  const applySlotLogic = (allList, fullMode) => {
    if (fullMode) {
      setDisplayedBlogs(allList);
      return;
    }
    const pos1 = allList.find(b => b.homePosition === 1);
    const pos2 = allList.find(b => b.homePosition === 2);
    const pos3 = allList.find(b => b.homePosition === 3);
    const regular = allList.filter(b => !b.homePosition || b.homePosition === 0);

    let output = [];
    let regIndex = 0;
    [pos1, pos2, pos3].forEach(posBlog => {
      if (posBlog) output.push(posBlog);
      else if (regular[regIndex]) output.push(regular[regIndex++]);
    });
    setDisplayedBlogs(output);
  };

  // 4. Single Blog Dynamic Resolution
  useEffect(() => {
    if (!slug) {
      setCurrentBlog(null);
      return;
    }

    if (blogs.length > 0) {
      const found = blogs.find(b => (b.slug || slugify(b.title)) === slug);
      if (found) setCurrentBlog(found);
    } else {
      axios.get(`${API_URL}/post/${slug}`)
        .then(res => {
          if (res.data?.success) setCurrentBlog(res.data.data);
        })
        .catch(err => console.error("Single blog fetch error:", err));
    }
  }, [slug, blogs, API_URL]);

  // Sanitizers & Metadata Helpers
  const getPreview = (html = '', max = 135) => {
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return text.length > max ? text.slice(0, max) + '...' : text;
  };

  const fmtDate = (ds) => {
    if (!ds) return '';
    return new Date(ds).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getReadTime = (html = '') => {
    const words = html.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  // 🎯 Smart Back Navigation Action
  const cameFromHome = location.state?.from === 'home';
  const handleSmartBack = (e) => {
    e.preventDefault();
    if (cameFromHome) {
      navigate('/#blog-section');
      setTimeout(() => {
        const el = document.getElementById('blog-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    } else {
      navigate('/blogs');
    }
  };

  // Filter logic for /blogs Catalog
  const categoriesList = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))];
  const filteredCatalog = blogs.filter(b => {
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesQuery = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         b.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  /* ══════════════════════════════════════════════════════════════
     VIEW A: INTERNATIONAL STANDARD ARTICLE READER (/blogs/:slug)
     ══════════════════════════════════════════════════════════════ */
  if (slug && currentBlog) {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://alquranislamicinstitute.com/blogs/${slug}`;
    const cleanExcerpt = getPreview(currentBlog.content, 160);

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://alquranislamicinstitute.com/blogs/${slug}`
      },
      "headline": currentBlog.title,
      "description": cleanExcerpt,
      "image": [currentBlog.image || "https://alquranislamicinstitute.com/logo.jpeg"],
      "datePublished": currentBlog.createdAt,
      "dateModified": currentBlog.updatedAt || currentBlog.createdAt,
      "author": {
        "@type": "Person",
        "name": currentBlog.author || "Al Quran Academy Faculty"
      },
      "publisher": {
        "@type": "EducationalOrganization",
        "name": "Al Quran Islamic Institute",
        "logo": {
          "@type": "ImageObject",
          "url": "https://alquranislamicinstitute.com/logo.jpeg"
        }
      }
    };

    return (
      <>
        {/* 🚀 Dynamic Blog Article SEO & BlogPosting Schema Injection */}
        <SEOEngine 
          title={`${currentBlog.title} | Al Quran Islamic Institute`}
          description={cleanExcerpt}
          canonicalUrl={`https://alquranislamicinstitute.com/blogs/${slug}`}
          keywords={`${currentBlog.category ? currentBlog.category.toLowerCase() + ', ' : ''}quran learning, tajweed rules, islamic articles`}
          ogImage={currentBlog.image || "https://alquranislamicinstitute.com/logo.jpeg"}
          schemaJson={articleSchema}
        />

        <article className="bg-[#fcfdff] min-h-screen py-8 md:py-14 font-sans selection:bg-orange-500 selection:text-white relative">
          {/* Reading Progress Top Bar */}
          <div 
            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 z-[100] transition-all duration-150"
            style={{ width: `${readingProgress}%` }}
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6">

            {/* Smart Navigation & Breadcrumbs Bar */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <button
                type="button"
                onClick={handleSmartBack}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-200 hover:shadow-md transition-all duration-200 text-xs font-bold uppercase tracking-wider group cursor-pointer"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" size={11} />
                <span>{cameFromHome ? "Back to Featured Insights" : "Back to All Articles"}</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400">
                <Link to="/#blog-section" className="hover:text-slate-700 flex items-center gap-1">
                  <FaHome size={12} /> Home
                </Link>
                <span>/</span>
                <Link to="/blogs" className="hover:text-slate-700">Articles</Link>
                <span>/</span>
                <span className="text-orange-600 font-bold truncate max-w-[200px]">{currentBlog.title}</span>
              </div>
            </div>

            {/* Main Article Container */}
            <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-slate-100 mb-10 overflow-hidden">
              
              {/* Meta Tags Pill Row */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                  {currentBlog.category || 'General'}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                  <FaCalendarAlt size={12} className="text-slate-400" /> {fmtDate(currentBlog.createdAt)}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                  <FaClock size={12} className="text-slate-400" /> {getReadTime(currentBlog.content)}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#001f3f] tracking-tight leading-tight mb-8">
                {currentBlog.title}
              </h1>

              {/* Author Accreditation Strip */}
              <div className="flex items-center justify-between border-y border-slate-100 py-4 mb-8 gap-4 flex-wrap">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-amber-400 flex items-center justify-center font-black text-sm shadow">
                    <FaUserGraduate size={17} />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-800 uppercase tracking-wider">{currentBlog.author || "Faculty of Islamic Sciences"}</div>
                    <div className="text-[11px] text-slate-400 font-medium">Department of Tajweed & Arabic Linguistics</div>
                  </div>
                </div>

                {/* Social Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 hidden sm:inline mr-1">Share:</span>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${currentBlog.title} - Read more:${shareUrl}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                    title="Share on WhatsApp"
                  >
                    <FaWhatsapp size={15} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentBlog.title)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
                    title="Share on X"
                  >
                    <FaTwitter size={14} />
                  </a>
                </div>
              </div>

              {/* Premium Contained Banner View */}
              <div className="rounded-2xl overflow-hidden bg-slate-950 mb-10 shadow-inner max-h-[460px] flex items-center justify-center border border-slate-100">
                <img
                  src={currentBlog.image}
                  alt={currentBlog.title}
                  className="w-full h-full object-contain max-h-[460px]"
                />
              </div>

              {/* Typography Content Body */}
              <div
                className="article-rich-content leading-relaxed text-slate-700 text-base sm:text-lg"
                dangerouslySetInnerHTML={{ __html: currentBlog.content }}
              />

              {/* Integrated Academy Conversion Card */}
              <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#001f3f] via-blue-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 text-center md:text-left">
                  <div className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center justify-center md:justify-start gap-2">
                    <FaBookmark /> Transform Your Recitation
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">Learn Quran Online with Certified Native Tutors</h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
                    Join our individualized 1-on-1 programs for kids, adults, and sisters. Start with 3 free trial sessions.
                  </p>
                </div>
                <Link
                  to="/courses"
                  className="relative z-10 px-7 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:shadow-orange-500/30 flex items-center gap-2 whitespace-nowrap"
                >
                  <FaBookOpen size={14} /> View All Programs
                </Link>
              </div>

            </div>

          </div>

          {/* Global Article Typography Styles */}
          <style>{`
            .article-rich-content h1, .article-rich-content h2, .article-rich-content h3 {
              color: #001f3f;
              font-weight: 800;
              margin-top: 1.8em;
              margin-bottom: 0.6em;
              line-height: 1.35;
            }
            .article-rich-content h2 { font-size: 1.6rem; border-bottom: 2px solid #f1f5f9; padding-bottom: 0.5rem; }
            .article-rich-content h3 { font-size: 1.3rem; }
            .article-rich-content p { margin-bottom: 1.4em; }
            .article-rich-content ul, .article-rich-content ol { margin-left: 1.6em; margin-bottom: 1.4em; }
            .article-rich-content li { margin-bottom: 0.5em; }
            .article-rich-content strong { color: #001f3f; font-weight: 700; }
            .article-rich-content blockquote {
              border-left: 4px solid #f97316;
              background: #fffaf0;
              padding: 1.2rem 1.6rem;
              margin: 1.8rem 0;
              font-style: italic;
              color: #9a3412;
              border-radius: 0 1rem 1rem 0;
            }
            .article-rich-content img { border-radius: 1rem; max-width: 100%; margin: 1.6rem auto; display: block; }
            .article-rich-content a { color: #d97706; text-decoration: underline; font-weight: 600; }
          `}</style>
        </article>
      </>
    );
  }

  /* ══════════════════════════════════════════════════════════════
     VIEW B: CARDS GRID (Homepage Section OR Full /blogs Catalog)
     ══════════════════════════════════════════════════════════════ */
  return (
    <>
      {/* 🚀 Sirf dedicated /blogs route par Blog catalog schema inject kare */}
      {isFullPageDefault && (
        <SEOEngine 
          title={blogPageSEO.title}
          description={blogPageSEO.description}
          canonicalUrl={blogPageSEO.canonicalUrl}
          keywords={blogPageSEO.keywords}
          ogImage={blogPageSEO.ogImage}
          schemaJson={blogPageSEO.schema}
        />
      )}

      <section id="blog-section" className="py-20 bg-[#f8faff] relative overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

          {/* Back Navigation Bar if on Full Catalog Page */}
          {isFullPageDefault && (
            <div className="flex items-center justify-between gap-4 mb-10">
              <Link
                to="/#blog-section"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-200 hover:shadow-md transition-all duration-200 text-xs font-bold uppercase tracking-wider group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" size={11} />
                <span>Back to Home</span>
              </Link>
              <div className="text-xs font-medium text-slate-400 flex items-center gap-1">
                <FaHome size={12} /> Home / <span className="text-orange-600 font-bold">Islamic Articles</span>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-[2px] w-8 bg-amber-500 rounded-full"></span>
              <span className="text-amber-600 text-xs font-black uppercase tracking-[0.3em]">
                Knowledge Hub & Academic Journal
              </span>
              <span className="h-[2px] w-8 bg-amber-500 rounded-full"></span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-[#001f3f] tracking-tight leading-tight mb-4">
              {isFullPageDefault ? (
                <>Complete Library of <span className="text-orange-600 italic">Quranic Articles</span></>
              ) : (
                <>Islamic Insights & <span className="text-orange-600 italic">Tajweed Guides</span></>
              )}
            </h2>

            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              Authentic guidance, practical Tajweed principles, and Islamic educational insights authored by our qualified faculty.
            </p>
          </div>

          {/* Category & Search Controls (Only shown in Full Catalog Mode) */}
          {isFullPageDefault && (
            <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100 mb-12 space-y-5">
              <div className="relative max-w-md mx-auto">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title or keyword..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs md:text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-800"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 flex-wrap pt-2 border-t border-slate-100">
                {categoriesList.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Loading Spinner */}
          {loading && (
            <div className="py-24 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin"></div>
              <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">Loading Publications...</p>
            </div>
          )}

          {/* Cards Grid */}
          {!loading && (
            <>
              {displayedBlogs.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-slate-200 max-w-lg mx-auto">
                  <div className="text-4xl mb-3">📭</div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">No Articles Found</h3>
                  <p className="text-slate-500 text-xs">Try clearing filters or search queries.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(isFullPageDefault ? filteredCatalog : displayedBlogs).map(blog => {
                    const blogSlug = blog.slug || slugify(blog.title);

                    return (
                      <article
                        key={blog._id}
                        className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
                      >
                        {/* Thumbnail Container */}
                        <div className="relative h-52 bg-slate-950 overflow-hidden flex-shrink-0">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-4 left-4 bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                            {blog.category || 'General'}
                          </span>
                        </div>

                        {/* Content Card Body */}
                        <div className="p-6 sm:p-7 flex flex-col flex-1">
                          <div className="flex items-center gap-2.5 text-[11px] text-slate-400 font-semibold mb-3">
                            <span>📅 {fmtDate(blog.createdAt)}</span>
                            <span>•</span>
                            <span>⏱ {getReadTime(blog.content)}</span>
                          </div>

                          <h3 className="text-lg font-black text-[#001f3f] group-hover:text-orange-600 transition-colors leading-snug mb-3">
                            {blog.title}
                          </h3>

                          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 flex-1 font-normal">
                            {getPreview(blog.content)}
                          </p>

                          {/* Origin state preservation */}
                          <Link
                            to={`/blogs/${blogSlug}`}
                            state={{ from: isFullPageDefault ? 'catalog' : 'home' }}
                            className="mt-auto w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-wider hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            Read Full Article →
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Homepage CTA leading to full catalog */}
              {!isFullPageDefault && blogs.length > 3 && (
                <div className="mt-14 text-center">
                  <Link
                    to="/blogs"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-900/10 hover:shadow-orange-500/20 hover:from-orange-500 hover:to-orange-600 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    View All Articles ({blogs.length}) →
                  </Link>
                </div>
              )}
            </>
          )}

        </div>
      </section>
    </>
  );
};

export default BlogSection;