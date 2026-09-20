import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOEngine = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = "https://alquranislamicinstitute.com/preview-banner.jpg",
  schemaJson = null
}) => {
  return (
    <Helmet>
      {/* ─── 1. CORE SEO ─── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />

      {/* ─── 2. SOCIAL & WHATSAPP CARD ─── */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Al Quran Islamic Institute" />

      {/* ─── 3. AEO / GEO STRUCTURED DATA (JSON-LD) ─── */}
      {schemaJson && (
        <script type="application/ld+json">
          {JSON.stringify(schemaJson)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOEngine;