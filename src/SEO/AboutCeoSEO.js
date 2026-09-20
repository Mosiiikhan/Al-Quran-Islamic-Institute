export const AboutCeoSEO = {
  title: "About Our Founder & CEO | Al Quran Islamic Institute",
  description: "Learn about the leadership behind Al Quran Islamic Institute. Discover our founder's mission to provide authentic, accessible online Quran education worldwide.",
  canonicalUrl: "https://alquranislamicinstitute.com/about-ceo",
  keywords: "quran academy founder, online quran institute ceo, islamic education leadership, certified quran scholars",
  ogImage: "https://alquranislamicinstitute.com/logo.jpeg",

  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://alquranislamicinstitute.com/about-ceo/#founder",
        "name": "Mohsin Ishfaq",
        "jobTitle": "Founder & Lead Software Engineer",
        "worksFor": {
          "@type": "EducationalOrganization",
          "name": "Al Quran Islamic Institute",
          "url": "https://alquranislamicinstitute.com"
        },
        "description": "Founder and software engineer dedicated to integrating modern technology with authentic Quranic education."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://alquranislamicinstitute.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About CEO",
            "item": "https://alquranislamicinstitute.com/about-ceo"
          }
        ]
      }
    ]
  }
};