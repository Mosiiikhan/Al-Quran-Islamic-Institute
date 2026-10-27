import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = "https://www.alquranislamic.com";

const SEOEngine = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = `${SITE_URL}/logo.jpeg`,
  ogImageAlt = "Al Quran Islamic Institute - Online Quran Classes",
  ogType = "website",
  noindex = false,
  schemaJson = null
}) => {
  return (
    <Helmet>
      {/* ─── 1. CORE SEO ─── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow"} />

      {/* ─── 2. SOCIAL & WHATSAPP CARD ─── */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:site_name" content="Al Quran Islamic Institute" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

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