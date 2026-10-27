import React from 'react';
import { Link } from 'react-router-dom';
import SEOEngine from './SEO/SEOEngine';

const NotFound = () => (
  <>
    <SEOEngine
      title="Page Not Found | Al Quran Islamic Institute"
      description="This page could not be found."
      noindex
    />
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-[#f8faff]">
      <h1 className="text-3xl font-black text-blue-900 mb-2">Page Not Found</h1>
      <p className="text-slate-500 mb-6 text-sm">The page you are looking for does not exist.</p>
      <Link to="/" className="px-6 py-3 bg-blue-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider">
        Back to Home
      </Link>
    </div>
  </>
);

export default NotFound;