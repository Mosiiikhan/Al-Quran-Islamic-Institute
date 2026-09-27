import React, { useState, useEffect, lazy, Suspense } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  useNavigate, 
  useLocation, 
  Outlet 
} from 'react-router-dom';
import './App.css';

// ─── 📊 VERCEL WEB ANALYTICS & SPEED INSIGHTS ───────────────────────────────
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// ─── CRITICAL CORE COMPONENTS (Eager Loaded for Instant Paint) ──────────────
import TopBar from './TopBar';
import Navbar from './NavBar';
import Footer from './Footer';
import FloatingRegister from './RegisterFoam';

// Homepage Core Sections
import Hero from './Hero';
import Courses from './Courses';
import FeeStructure from './Fee';
import FAQ from './FAQ';
import AboutAcademy from './AboutAcademy';
import Gallery from './Gallery';
import AboutOwner from './AboutOwner';
import ContactUs from './ContactUs';
import BlogSection from './BlogSection';

// ─── 🚀 SEO, AEO & GEO IMPORTS ──────────────────────────────────────────────
import { homeSEO } from './SEO/homeSEO';
import SEOEngine from './SEO/SEOEngine';

// ─── CODE SPLITTING (Matching Current Folder Structure) ─────────────────────
const CoursesPage = lazy(() => import('./CoursesPage'));
const CourseDetailPage = lazy(() => import('./assets/CourseDetailPage'));

// Admin Modules
const AdminLogin = lazy(() => import('./assets/Admin/Adminlogin'));
const ResetPassword = lazy(() => import('./assets/Admin/ResetPassword'));
const AdminDashboard = lazy(() => import('./assets/Admin/AdminDashboard'));
const AdminAddBlog = lazy(() => import('./assets/Admin/AdminAddBlog'));
const SecurityDashboard = lazy(() => import('./assets/Admin/SecurityDashboard'));

// ─── 🎯 SMART SCROLL CONTROLLER & AUTO-CLEAN HASH ───────────────────────────
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      let attempts = 0;

      const scrollToElement = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });

          setTimeout(() => {
            window.history.replaceState(null, '', window.location.pathname);
          }, 450);
        } else if (attempts < 10) {
          attempts++;
          setTimeout(scrollToElement, 100);
        }
      };

      const timer = setTimeout(scrollToElement, 120);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
};

// ─── ENTERPRISE PROTECTED ROUTE ─────────────────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = sessionStorage.getItem('adminToken') || localStorage.getItem('adminToken');
  const isValid = token && token !== 'undefined' && token !== 'null' && token.trim().length > 10;

  useEffect(() => {
    if (!isValid) {
      navigate('/admin/login', { replace: true, state: { from: location } });
    }
  }, [isValid, location.pathname, navigate]);

  if (!isValid) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
};

// ─── BRANDED LAZY SUSPENSE FALLBACK ─────────────────────────────────────────
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 bg-[#f8faff]">
    <div className="w-10 h-10 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin"></div>
    <span className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Loading Content...</span>
  </div>
);

// ─── UNIFIED PUBLIC LAYOUT ──────────────────────────────────────────────────
const PublicLayout = ({ targetedCourse, isFormOpen, onOpenForm, onCloseForm }) => {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-[#f8faff] selection:bg-orange-500 selection:text-white">
      <TopBar />
      <Navbar />
      
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Outlet context={{ onDirectRegisterTrigger: onOpenForm }} />
        </Suspense>
      </main>

      <Footer />

      {/* Floating Free Trial Registration Form Modal */}
      <FloatingRegister 
        selectedCourseName={targetedCourse}
        isFormOpen={isFormOpen}
        onCloseForm={onCloseForm}
      />

      {/* Floating Direct WhatsApp Support */}
      <a 
        href="https://wa.me/923485654503?text=Assalam-o-Alaikum%2C%20I%20want%20to%20know%20more%20about%20your%20Quran%20courses." 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-2xl z-[90] hover:scale-110 hover:shadow-green-500/30 transition-all duration-300"
        aria-label="Direct WhatsApp Contact"
      >
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="28" width="28" xmlns="http://www.w3.org/2000/svg">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.1 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-10.8-5.4-44.9-16.5-66.5-35.9-16.8-15-28.1-33.5-31.4-39.1-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.8 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
        </svg>
      </a>
    </div>
  );
};

// ─── HOMEPAGE COMPOSED VIEW ──────────────────────────────────────────────────
const HomePage = ({ onDirectRegisterTrigger }) => (
  <>
    {/* 🚀 Dynamic SEO, AEO & GEO Metadata Injection */}
    <SEOEngine 
      title={homeSEO.title}
      description={homeSEO.description}
      canonicalUrl={homeSEO.canonicalUrl}
      keywords={homeSEO.keywords}
      ogImage={homeSEO.ogImage}
      schemaJson={homeSEO.schema}
    />

    <Hero />
    <AboutAcademy />
    <Courses isHomePage={true} onDirectRegisterTrigger={onDirectRegisterTrigger} />
    <FeeStructure />
    <Gallery />
    <BlogSection isFullPageDefault={false} />
    <ContactUs />
    <FAQ />
  </>
);

function App() {
  const [targetedCourse, setTargetedCourse] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleTriggerRegistration = (courseName = "") => {
    setTargetedCourse(courseName);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setTargetedCourse("");
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        
        {/* ─── PUBLIC USER ROUTES ─── */}
        <Route 
          element={
            <PublicLayout 
              targetedCourse={targetedCourse}
              isFormOpen={isFormOpen}
              onOpenForm={handleTriggerRegistration}
              onCloseForm={handleCloseForm}
            />
          }
        >
          {/* 1. Main Home */}
          <Route path="/" element={<HomePage onDirectRegisterTrigger={handleTriggerRegistration} />} />
          
          {/* 2. Isolated Dedicated Page for About Owner / CEO */}
          <Route path="/about-ceo" element={<AboutOwner />} />

          {/* 3. All Courses Catalog (/courses) */}
          <Route path="/courses" element={<CoursesPage onDirectRegisterTrigger={handleTriggerRegistration} />} />
          
          {/* 4. Individual SEO Course Page (/courses/:slug) */}
          <Route path="/courses/:slug" element={<CourseDetailPage onDirectRegisterTrigger={handleTriggerRegistration} />} />
          
          {/* 5. Complete Blogs Catalog */}
          <Route path="/blogs" element={<BlogSection isFullPageDefault={true} />} />

          {/* 6. Individual SEO Dynamic Blog Article Page (/blogs/:slug) */}
          <Route path="/blogs/:slug" element={<BlogSection />} />
        </Route>

        {/* ─── ADMIN AUTHENTICATION ROUTES ─── */}
        <Route 
          path="/admin/login" 
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminLogin />
            </Suspense>
          } 
        />
        <Route 
          path="/admin/reset-password/:token" 
          element={
            <Suspense fallback={<PageLoader />}>
              <ResetPassword />
            </Suspense>
          } 
        />

        {/* ─── 🔐 PROTECTED ADMIN ROUTES ─── */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/add-blog" 
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <AdminAddBlog />
              </Suspense>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/security" 
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <SecurityDashboard />
              </Suspense>
            </ProtectedRoute>
          } 
        />

        {/* ─── 404 FALLBACK ─── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      {/* ─── VERCEL ANALYTICS & SPEED INSIGHTS ─── */}
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;