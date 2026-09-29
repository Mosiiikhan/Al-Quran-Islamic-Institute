import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  FaCalendarAlt, FaClock, FaArrowLeft, FaHome,
  FaWhatsapp, FaTwitter, FaBookOpen, FaUserGraduate,
  FaSearch, FaBookmark
} from 'react-icons/fa';

import SEOEngine from './SEO/SEOEngine';
import { blogPageSEO } from './SEO/blogPageSEO';

// ⚠️ Yahan apna ASAL live domain likho (canonical, share links aur schema sab isi se bante hain)
const SITE_URL = 'https://www.alquranislamic.com';
const SITE_NAME = 'Al Quran Islamic Institute';

const slugify = (text = '') => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const stripHtml = (html = '') => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

// ─── MASTER STATIC ARTICLES ──────────────────────────────────────────────────
// Images: Unsplash/Pexels ki free-license real photos (direct links, koi download zaroori nahi).
// metaTitle: 60 chars ke andar | metaDescription: 150-160 chars | keywords: high-intent search terms
export const STATIC_BLOGS = [
  {
    _id: "blog-1",
    title: "10 Essential Tajweed Rules Every Quran Reciter Must Master",
    slug: "essential-tajweed-rules-for-beginners",
    category: "Tajweed Guide",
    author: "Sheikh Qari Usman",
    createdAt: "2026-03-15",
    updatedAt: "2026-09-30",
    image: "https://images.unsplash.com/photo-1616422840391-fa670d4b2ae7?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Open Holy Quran with prayer beads for learning Tajweed rules and correct recitation",
    metaTitle: "Tajweed Rules for Beginners: Complete Guide | Learn Tajweed Online",
    metaDescription: "Learn the essential Tajweed rules for beginners: Makharij, Noon Sakin, Meem Sakin, Madd and Waqf. Simple guide to recite the Quran correctly with Tajweed.",
    keywords: "tajweed rules for beginners, learn tajweed online, tajweed rules with examples, noon sakin rules, meem sakin rules, makharij al huroof, quran recitation rules, online tajweed course",
    content: `
      <p>The Holy Quran is the direct speech of Allah ﷻ, revealed to Prophet Muhammad ﷺ through Angel Jibril (A.S). Learning <strong>Tajweed rules</strong> and reciting with proper pronunciation is essential for every Muslim. Allah commands in Surah Al-Muzzammil: <em>"And recite the Quran with measured recitation."</em> (73:4)</p>

      <h2>1. What is Tajweed and Why Does It Matter?</h2>
      <p>Tajweed means giving every letter of the Quran its right in pronunciation, characteristics, and rules. Whether you are a beginner or an adult who wants to <strong>learn Tajweed online</strong>, mastering these rules protects the meaning of the words of Allah and beautifies your recitation.</p>

      <h2>2. The Significance of Makharij (Points of Articulation)</h2>
      <p>Before understanding connecting rules, you must know where each Arabic letter originates. The 28 Arabic letters (29 counting Hamzah) are articulated from 17 specific points divided into five main areas: the throat, tongue, lips, nasal cavity, and the oral cavity. Confusing letters like <strong>ح (Hha)</strong> with <strong>ه (Haa)</strong> or <strong>ع (Ayn)</strong> with <strong>Hamzah</strong> can change the meaning.</p>

      <h2>3. The Four Rules of Noon Sakin &amp; Tanween</h2>
      <p>Whenever a Noon without a vowel (Noon Sakin) or Tanween (double Fathah, Kasrah, Dammah) appears, one of four rules applies:</p>
      <ul>
        <li><strong>Izhar (Clear Pronunciation):</strong> Pronounced clearly, without nasalization, before the six throat letters: Hamzah (ء), Haa (ه), Ayn (ع), Hha (ح), Ghayn (غ), Khaa (خ).</li>
        <li><strong>Idgham (Merging):</strong> Merged into the following letter when meeting the letters of <em>Yarmaloon</em> (ي, ر, م, ل, و, ن).</li>
        <li><strong>Iqlab (Conversion):</strong> Converted into a silent Meem with a slight Ghunnah when followed by the letter Baa (ب).</li>
        <li><strong>Ikhfa (Concealment):</strong> Lightly concealed with a nasal vibration before the remaining 15 letters.</li>
      </ul>

      <h2>4. The Rules of Meem Sakin</h2>
      <p>Meem Sakin carries three distinct rulings: <em>Ikhfa Shafawi</em> (when followed by Baa), <em>Idgham Shafawi</em> (when followed by another Meem), and <em>Izhar Shafawi</em> (when followed by any of the remaining 26 letters).</p>

      <h2>5. Madd (Elongation) and Waqf (Stopping)</h2>
      <p>Madd rules teach you how long to stretch certain vowels, while Waqf rules teach you where to pause and where not to. Both are essential for fluent, correct recitation and are taught step by step in every <strong>online Tajweed course</strong>.</p>

      <h2>6. Practical Tips to Improve Your Recitation Daily</h2>
      <p>Practice with a certified tutor 1-on-1 for 20 minutes daily. Listening to master reciters like Sheikh Mahmoud Khalil Al-Husary trains the ear to recognize rhythm, elongation (Madd), and proper stops (Waqf).</p>
    `
  },
  {
    _id: "blog-2",
    title: "Why Noorani Qaida is the Best Foundation for Kids Learning Quran",
    slug: "why-noorani-qaida-best-foundation-for-kids",
    category: "Kids Education",
    author: "Ustadh Muhammad Bilal",
    createdAt: "2026-03-22",
    updatedAt: "2026-09-30",
    image: "https://images.pexels.com/photos/8164747/pexels-photo-8164747.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Cute little Muslim girl in hijab reading the Quran, learning Noorani Qaida as a child",
    metaTitle: "Noorani Qaida for Kids: Best Way to Start Quran | Online Classes",
    metaDescription: "Why Noorani Qaida is the best first step for children learning the Quran online. Ideal age, lessons, and how 1-on-1 Qaida classes build fluent reading.",
    keywords: "noorani qaida for kids, online quran classes for kids, learn quran for children, noorani qaida online course, quran teacher for kids, best age to start quran, arabic alphabet for kids",
    content: `
      <p>For centuries, the <strong>Noorani Qaida</strong> has been the gold standard for teaching non-Arabic speaking children to read the Holy Quran. With its logical phonetic progression, it takes absolute beginners all the way to fluent Mushaf recitation. If you are looking for <strong>online Quran classes for kids</strong>, Noorani Qaida is the right place to begin.</p>

      <h2>1. Visual Letter Recognition &amp; Individual Phonics</h2>
      <p>Young minds learn through visual association. Noorani Qaida introduces each Arabic letter in its standalone form before showing how it changes shape in the initial, medial, and final positions of a word. This prevents confusion when reading connected Quranic script.</p>

      <h2>2. Step-by-Step Vowel (Harakat) Mastery</h2>
      <p>Children grasp sounds faster when taught systematically. Noorani Qaida teaches:</p>
      <ul>
        <li>Short vowels: Fathah (Zabar), Kasrah (Zer), and Dammah (Pesh).</li>
        <li>Letters of prolongation: Alif Maddah, Waw Maddah, and Yaa Maddah.</li>
        <li>Soft letters (Leen) and the sign of silence (Jazm / Sukoon).</li>
      </ul>

      <h2>3. Building Confidence Through Real Quranic Words</h2>
      <p>Unlike secular Arabic primers, exercises in Noorani Qaida are drawn from the Quran itself. By the time a child completes the final lesson, they can open a Surah and read words independently without anxiety.</p>

      <h2>4. Best Age to Start Learning Quran</h2>
      <p>Children between ages 4 and 6 have a strong ability to absorb new sounds. Starting Noorani Qaida with a patient, friendly tutor in these years builds accurate pronunciation from the very beginning.</p>

      <h2>5. Why 1-on-1 Online Classes Work Best</h2>
      <p>In a private online class the teacher can correct every mistake immediately and adjust the pace to your child. Many parents find it more effective and more convenient than a crowded local class.</p>
    `
  },
  {
    _id: "blog-3",
    title: "How to Build a Consistent Daily Quran Routine While Living in the West",
    slug: "build-consistent-daily-quran-routine-in-west",
    category: "Spiritual Life",
    author: "Sister Sundas Ishfaq",
    createdAt: "2026-03-28",
    updatedAt: "2026-09-30",
    image: "https://images.unsplash.com/photo-1574545640323-59dc7a2b4a6d?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Muslim reading the Quran as part of a daily Quran reading routine",
    metaTitle: "Daily Quran Reading Routine for Busy Muslims in the West",
    metaDescription: "Struggling to read the Quran daily? Build a simple 15-minute Quran routine with Fajr or Maghrib habits and online tutor accountability, wherever you live.",
    keywords: "daily quran routine, how to read quran daily, quran reading schedule, learn quran online usa uk canada, online quran classes for adults, quran habit, consistent quran recitation",
    content: `
      <p>Living in fast-paced Western societies such as the USA, UK, Canada, or Australia, Muslim professionals and students often feel overwhelmed. Between school, work, and family, <strong>daily Quran reading</strong> can slip down the priority list. Yet barakah in time begins with the Book of Allah.</p>

      <h2>1. The 15-Minute Rule: Quality Over Quantity</h2>
      <p>The Messenger of Allah ﷺ said: <em>"The most beloved of deeds to Allah are those that are most consistent, even if they are small."</em> (Sahih Bukhari). Commit to just 15 uninterrupted minutes daily. Reading half a page with reflection every morning is more powerful than reading a whole Juz once a month.</p>

      <h2>2. Anchor Your Quran Time to Fajr or Maghrib</h2>
      <p>Habit stacking is a proven way to build lasting routines. Connect your recitation to something you never skip: right after Fajr prayer before opening your phone, or right after Maghrib before dinner.</p>

      <h2>3. The Power of Accountability</h2>
      <p>When you learn alone it is easy to postpone. Enrolling in structured <strong>online 1-on-1 Quran classes</strong> two or three times a week puts a real appointment on your calendar. Knowing your tutor is waiting keeps you consistent through busy seasons.</p>

      <h2>4. Involve Your Household</h2>
      <p>Create a quiet corner in your home for Salah and Quran. When children see their parents reciting regularly, love for the Quran becomes a family value.</p>
    `
  },
  {
    _id: "blog-4",
    title: "The Proven Scientific & Spiritual Roadmap to Quran Memorization (Hifz)",
    slug: "scientific-roadmap-to-quran-memorization-hifz",
    category: "Hifz Guide",
    author: "Hafiz Bilal Ahmed",
    createdAt: "2026-04-02",
    updatedAt: "2026-09-30",
    image: "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Green Quran on a wooden stand (rehal) used for Quran memorization (Hifz)",
    metaTitle: "How to Memorize the Quran (Hifz): Step-by-Step Method",
    metaDescription: "A proven Hifz roadmap: Sabaq, Sabqi and Manzil revision system, tips to memorize the Quran faster and never forget it. Start online Hifz classes today.",
    keywords: "how to memorize quran, hifz course online, quran memorization tips, sabaq sabqi manzil, hifz classes online, become a hafiz, quran memorization for kids and adults",
    content: `
      <p>Becoming a Hafiz-e-Quran is one of the highest honors in Islam. On the Day of Judgment it will be said to the companion of the Quran: <em>"Recite and ascend, and recite measuredly as you used to recite in the world."</em> (Abu Dawood). If you want to know <strong>how to memorize the Quran</strong>, you need a method, not unstructured cramming.</p>

      <h2>1. The Three Pillars of Classical Hifz</h2>
      <p>Traditional madaris use a three-part revision system that keeps memorization strong for life:</p>
      <ul>
        <li><strong>Sabaq (New Lesson):</strong> The new lines or page memorized today under tutor supervision.</li>
        <li><strong>Sabqi (Recent Revision):</strong> Reciting the last 5 to 10 pages memorized over the past two weeks so they settle firmly.</li>
        <li><strong>Manzil / Dour (Old Revision):</strong> Daily review of previously memorized Juz in a continuous cycle so nothing is forgotten.</li>
      </ul>

      <h2>2. Use One Single Print of the Quran</h2>
      <p>Visual memory plays a big role in Hifz. Always use the same 15-line or 16-line Mushaf. Switching copies confuses your memory of where verses begin and end on the page.</p>

      <h2>3. Listen Before You Memorize</h2>
      <p>Never memorize an Ayah without first listening to a qualified Qari. Correcting a memorized mistake takes far more effort than learning it correctly the first time.</p>

      <h2>4. Learn Hifz Online With a Qualified Hafiz</h2>
      <p>With <strong>online Hifz classes</strong> you get daily sabaq checking, Tajweed correction, and a revision plan tailored to your pace, from anywhere in the world.</p>
    `
  },
  {
    _id: "blog-5",
    title: "Why Female Quran Tutors Are Essential for Young Girls and Muslim Women",
    slug: "benefits-of-female-quran-tutors-for-sisters",
    category: "Women in Islam",
    author: "Aalima Fatima Zahra",
    createdAt: "2026-04-06",
    updatedAt: "2026-09-30",
    image: "https://images.pexels.com/photos/36212007/pexels-photo-36212007.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Modest Muslim woman in white hijab reading the Quran, representing female Quran tutors for sisters",
    metaTitle: "Female Quran Tutors Online for Girls & Sisters | Benefits",
    metaDescription: "Why female Quran teachers matter for girls and Muslim women: comfort, modesty, flexible timings and women-specific fiqh guidance. Book a free trial class.",
    keywords: "female quran tutor online, female quran teacher for sisters, online quran classes for girls, quran classes for women, learn quran with female teacher, aalima online, quran for muslim sisters",
    content: `
      <p>Islam has a rich, unbroken tradition of female scholarship dating back to Aisha bint Abi Bakr (R.A) and the Mothers of the Believers. In modern online education, access to a certified <strong>female Quran tutor</strong> gives girls and women an environment of comfort, trust, and Islamic modesty (Haya).</p>

      <h2>1. Complete Comfort and Openness</h2>
      <p>Many adult sisters and teenage girls feel shy reciting aloud in front of a male teacher. A qualified female tutor removes that barrier, so students can freely ask about Tajweed, recitation, and rulings that concern women, such as the rules of Salah and Quran during menstruation.</p>

      <h2>2. Positive Role Models for Young Girls</h2>
      <p>Growing up in non-Muslim societies, young Muslim girls need relatable role models who reflect Islamic values, dress, and character. A female Aalima is not only a Quran teacher but also a mentor.</p>

      <h2>3. Flexible Schedules for Busy Mothers</h2>
      <p>Mothers manage homes, children, and careers. Our female tutors offer morning, evening, and weekend slots designed around family routines, making <strong>online Quran classes for women</strong> stress-free.</p>
    `
  }
];

const BlogSection = ({ isFullPageDefault = false }) => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [readingProgress, setReadingProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Reading progress scroll tracker
  useEffect(() => {
    if (!slug) return;
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setReadingProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  // Naye article par upar se start karo
  useEffect(() => {
    if (slug) window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  const currentBlog = slug ? STATIC_BLOGS.find(b => b.slug === slug || slugify(b.title) === slug) : null;

  const getPreview = (html = '', max = 135) => {
    const text = stripHtml(html);
    return text.length > max ? text.slice(0, max) + '...' : text;
  };

  const fmtDate = (ds) => {
    if (!ds) return '';
    return new Date(ds).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getReadTime = (html = '') => {
    const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  const getWordCount = (html = '') => stripHtml(html).split(/\s+/).filter(Boolean).length;

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

  // Image load fail ho to broken icon na dikhe
  const hideBrokenImage = (e) => { e.currentTarget.style.display = 'none'; };

  // Filter logic (ab HTML tags me search nahi hota, sirf real text me)
  const categoriesList = ['All', ...new Set(STATIC_BLOGS.map(b => b.category))];
  const q = searchQuery.toLowerCase().trim();
  const filteredCatalog = STATIC_BLOGS.filter(b => {
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesQuery =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.keywords.toLowerCase().includes(q) ||
      stripHtml(b.content).toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const displayedBlogs = isFullPageDefault ? filteredCatalog : STATIC_BLOGS.slice(0, 3);

  /* ══════════════════════════════════════════════════════════════
     VIEW A: SINGLE ARTICLE READER (/blogs/:slug)
     ══════════════════════════════════════════════════════════════ */
  if (slug) {
    if (!currentBlog) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#f8faff]">
          <div className="text-5xl mb-3">📰</div>
          <h2 className="text-2xl font-black text-[#001f3f] mb-2">Article Not Found</h2>
          <p className="text-slate-500 text-sm mb-6">The article you requested could not be located.</p>
          <Link to="/blogs" className="px-6 py-3 bg-[#001f3f] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors">
            Browse All Articles
          </Link>
        </div>
      );
    }

    // Canonical hamesha asli slug se (title-slug se aaye tab bhi duplicate URL na bane)
    const canonicalSlug = currentBlog.slug || slugify(currentBlog.title);
    const shareUrl = `${SITE_URL}/blogs/${canonicalSlug}`;
    const absImage = currentBlog.image.startsWith('http') ? currentBlog.image : `${SITE_URL}${currentBlog.image}`;

    const articleSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "mainEntityOfPage": { "@type": "WebPage", "@id": shareUrl },
          "headline": currentBlog.title,
          "description": currentBlog.metaDescription,
          "image": [absImage],
          "datePublished": currentBlog.createdAt,
          "dateModified": currentBlog.updatedAt || currentBlog.createdAt,
          "keywords": currentBlog.keywords,
          "articleSection": currentBlog.category,
          "wordCount": getWordCount(currentBlog.content),
          "inLanguage": "en",
          "author": { "@type": "Person", "name": currentBlog.author },
          "publisher": {
            "@type": "EducationalOrganization",
            "name": SITE_NAME,
            "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.jpeg` }
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
            { "@type": "ListItem", "position": 2, "name": "Articles", "item": `${SITE_URL}/blogs` },
            { "@type": "ListItem", "position": 3, "name": currentBlog.title, "item": shareUrl }
          ]
        }
      ]
    };

    const relatedBlogs = STATIC_BLOGS.filter(b => b._id !== currentBlog._id).slice(0, 3);

    return (
      <>
        <SEOEngine
          title={currentBlog.metaTitle || `${currentBlog.title} | ${SITE_NAME}`}
          description={currentBlog.metaDescription}
          canonicalUrl={shareUrl}
          keywords={currentBlog.keywords}
          ogImage={absImage}
          schemaJson={articleSchema}
        />

        <article className="bg-[#fcfdff] min-h-screen py-6 sm:py-10 md:py-14 font-sans selection:bg-orange-500 selection:text-white relative">
          <div
            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 z-[100] transition-all duration-150"
            style={{ width: `${readingProgress}%` }}
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6">

            <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
              <button
                type="button"
                onClick={handleSmartBack}
                className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-200 transition-all text-xs font-bold uppercase tracking-wider group cursor-pointer shadow-sm active:scale-95"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" size={10} />
                <span>{cameFromHome ? "Back to Featured" : "Back to All Articles"}</span>
              </button>

              <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400">
                <Link to="/" className="hover:text-slate-700 flex items-center gap-1">
                  <FaHome size={12} /> Home
                </Link>
                <span>/</span>
                <Link to="/blogs" className="hover:text-slate-700">Articles</Link>
                <span>/</span>
                <span className="text-orange-600 font-bold truncate max-w-[180px]">{currentBlog.title}</span>
              </nav>
            </div>

            <div className="bg-white rounded-3xl p-5 sm:p-8 md:p-12 shadow-sm border border-slate-100 mb-10 overflow-hidden">

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                <span className="bg-amber-50 border border-amber-200 text-amber-900 text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  {currentBlog.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                  <FaCalendarAlt size={11} />
                  <time dateTime={currentBlog.createdAt}>{fmtDate(currentBlog.createdAt)}</time>
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                  <FaClock size={11} /> {getReadTime(currentBlog.content)}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#001f3f] tracking-tight leading-tight mb-6">
                {currentBlog.title}
              </h1>

              <div className="flex items-center justify-between border-y border-slate-100 py-3.5 mb-6 sm:mb-8 gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 text-amber-400 flex items-center justify-center font-black text-sm shadow">
                    <FaUserGraduate size={15} />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-800 uppercase tracking-wider">{currentBlog.author}</div>
                    <div className="text-[10px] text-slate-400 font-medium">Faculty of Quranic Sciences</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 hidden sm:inline mr-1">Share:</span>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${currentBlog.title} - Read more: ${shareUrl}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center"
                    title="Share on WhatsApp"
                    aria-label="Share on WhatsApp"
                  >
                    <FaWhatsapp size={14} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentBlog.title)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white transition-all flex items-center justify-center"
                    title="Share on X"
                    aria-label="Share on X"
                  >
                    <FaTwitter size={13} />
                  </a>
                </div>
              </div>

              {/* Hero image: eager load (LCP), width/height se layout shift nahi hota */}
              <div className="rounded-2xl overflow-hidden bg-slate-900 mb-8 max-h-[380px] flex items-center justify-center border border-slate-100">
                <img
                  src={currentBlog.image}
                  alt={currentBlog.imageAlt || currentBlog.title}
                  width="1200"
                  height="630"
                  loading="eager"
                  fetchpriority="high"
                  onError={hideBrokenImage}
                  className="w-full h-full object-cover max-h-[380px]"
                />
              </div>

              <div
                className="article-rich-content leading-relaxed text-slate-700 text-sm sm:text-base md:text-lg"
                dangerouslySetInnerHTML={{ __html: currentBlog.content }}
              />

              <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#001f3f] via-blue-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                <div className="relative z-10 text-center md:text-left">
                  <div className="text-amber-400 font-bold text-[11px] uppercase tracking-widest mb-1 flex items-center justify-center md:justify-start gap-1.5">
                    <FaBookmark /> Transform Your Recitation
                  </div>
                  <h3 className="text-lg sm:text-xl font-black">Learn Quran Online with Certified Native Tutors</h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
                    Join our individualized 1-on-1 programs for kids, adults, and sisters. Start with 3 free trial sessions.
                  </p>
                </div>
                <Link
                  to="/courses"
                  className="relative z-10 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-2 whitespace-nowrap active:scale-95"
                >
                  <FaBookOpen size={13} /> View All Programs
                </Link>
              </div>
            </div>

            {/* Related Articles: internal linking = SEO boost + zyada time on site */}
            <section aria-labelledby="related-heading" className="mb-6">
              <h2 id="related-heading" className="text-xl sm:text-2xl font-black text-[#001f3f] mb-5">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedBlogs.map(rb => (
                  <Link
                    key={rb._id}
                    to={`/blogs/${rb.slug}`}
                    className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
                  >
                    <img
                      src={rb.image}
                      alt={rb.imageAlt || rb.title}
                      width="600"
                      height="315"
                      loading="lazy"
                      onError={hideBrokenImage}
                      className="w-full h-32 object-cover bg-slate-900"
                    />
                    <div className="p-4">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-600">{rb.category}</span>
                      <h3 className="text-sm font-black text-[#001f3f] group-hover:text-orange-600 transition-colors leading-snug mt-1">
                        {rb.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <style>{`
            .article-rich-content h2 {
              color: #001f3f;
              font-weight: 800;
              margin-top: 1.6em;
              margin-bottom: 0.5em;
              line-height: 1.3;
              font-size: 1.4rem;
              border-bottom: 2px solid #f1f5f9;
              padding-bottom: 0.4rem;
            }
            .article-rich-content p { margin-bottom: 1.2em; }
            .article-rich-content ul { margin-left: 1.4em; margin-bottom: 1.2em; list-style-type: disc; }
            .article-rich-content li { margin-bottom: 0.4em; }
            .article-rich-content strong { color: #001f3f; font-weight: 700; }
            .article-rich-content em { color: #c2410c; font-weight: 500; }
          `}</style>
        </article>
      </>
    );
  }

  /* ══════════════════════════════════════════════════════════════
     VIEW B: CARDS GRID (Homepage Section OR Full /blogs Catalog)
     ══════════════════════════════════════════════════════════════ */
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": `${SITE_NAME} Blog`,
    "url": `${SITE_URL}/blogs`,
    "blogPost": STATIC_BLOGS.map(b => ({
      "@type": "BlogPosting",
      "headline": b.title,
      "url": `${SITE_URL}/blogs/${b.slug}`,
      "datePublished": b.createdAt,
      "image": b.image.startsWith('http') ? b.image : `${SITE_URL}${b.image}`
    }))
  };

  return (
    <>
      {isFullPageDefault && (
        <SEOEngine
          title={blogPageSEO?.title || "Quran Learning Blog: Tajweed, Hifz & Noorani Qaida Guides | Al Quran Islamic Institute"}
          description={blogPageSEO?.description || "Read authentic Islamic articles, Tajweed rules, Hifz tips, Noorani Qaida guides and advice for learning the Quran online with certified tutors."}
          canonicalUrl={`${SITE_URL}/blogs`}
          keywords={blogPageSEO?.keywords || "quran blog, tajweed rules guide, how to memorize quran, noorani qaida for kids, learn quran online, islamic articles"}
          ogImage={blogPageSEO?.ogImage}
          schemaJson={blogPageSEO?.schema || listSchema}
        />
      )}

      <section id="blog-section" className="py-12 sm:py-16 md:py-20 bg-[#f8faff] relative overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {isFullPageDefault && (
            <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
              <Link
                to="/#blog-section"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-200 transition-all text-xs font-bold uppercase tracking-wider group shadow-sm active:scale-95"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" size={10} />
                <span>Back to Home</span>
              </Link>
              <div className="text-xs font-medium text-slate-400 flex items-center gap-1">
                <FaHome size={12} /> Home / <span className="text-orange-600 font-bold">Islamic Articles</span>
              </div>
            </div>
          )}

          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
              <span className="h-[2px] w-6 sm:w-8 bg-amber-500 rounded-full"></span>
              <span className="text-amber-600 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em]">
                Knowledge Hub & Academic Journal
              </span>
              <span className="h-[2px] w-6 sm:w-8 bg-amber-500 rounded-full"></span>
            </div>

            {/* Full page par ek hi H1 (SEO rule), homepage par H2 */}
            {isFullPageDefault ? (
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#001f3f] tracking-tight leading-tight mb-3">
                Learn Quran Online: <span className="text-orange-600 italic">Tajweed, Hifz & Qaida Articles</span>
              </h1>
            ) : (
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#001f3f] tracking-tight leading-tight mb-3">
                Islamic Insights & <span className="text-orange-600 italic">Tajweed Guides</span>
              </h2>
            )}

            <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed">
              Authentic guidance on Tajweed rules, Quran memorization, Noorani Qaida and online Quran classes, written by our qualified faculty.
            </p>
          </div>

          {isFullPageDefault && (
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-100 mb-8 sm:mb-10 space-y-4">
              <div className="relative max-w-md mx-auto">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title or keyword..."
                  aria-label="Search articles"
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-800"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar justify-start sm:justify-center pt-1 border-t border-slate-100">
                {categoriesList.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-blue-900 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Koi result na mile to message */}
          {isFullPageDefault && displayedBlogs.length === 0 && (
            <div className="text-center py-16 text-slate-500 text-sm">
              No articles match your search. Try a different keyword or category.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedBlogs.map((blog, idx) => {
              const blogSlug = blog.slug || slugify(blog.title);
              const blogUrl = `/blogs/${blogSlug}`;
              const linkState = { from: isFullPageDefault ? 'catalog' : 'home' };

              return (
                <article
                  key={blog._id}
                  className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="relative h-48 sm:h-52 bg-slate-900 overflow-hidden shrink-0">
                    <Link to={blogUrl} state={linkState} tabIndex={-1} aria-hidden="true">
                      <img
                        src={blog.image}
                        alt={blog.imageAlt || blog.title}
                        width="600"
                        height="400"
                        loading={idx < 3 ? 'eager' : 'lazy'}
                        onError={hideBrokenImage}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <span className="absolute top-3.5 left-3.5 bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
                      {blog.category}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold mb-2.5">
                      <span>📅 <time dateTime={blog.createdAt}>{fmtDate(blog.createdAt)}</time></span>
                      <span>•</span>
                      <span>⏱ {getReadTime(blog.content)}</span>
                    </div>

                    {/* Title ab clickable link hai (Google ko anchor text milta hai) */}
                    <h3 className="text-base sm:text-lg font-black text-[#001f3f] group-hover:text-orange-600 transition-colors leading-snug mb-2.5">
                      <Link to={blogUrl} state={linkState}>{blog.title}</Link>
                    </h3>

                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 flex-1 font-normal">
                      {blog.metaDescription || getPreview(blog.content)}
                    </p>

                    <Link
                      to={blogUrl}
                      state={linkState}
                      className="mt-auto w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-wider hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2 active:scale-95"
                    >
                      Read Full Article →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {!isFullPageDefault && (
            <div className="mt-10 sm:mt-14 text-center">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-900/10 hover:shadow-orange-500/20 hover:from-orange-500 hover:to-orange-600 transition-all duration-300 active:scale-95"
              >
                <span>View All Articles ({STATIC_BLOGS.length})</span>
                <span>→</span>
              </Link>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default BlogSection;