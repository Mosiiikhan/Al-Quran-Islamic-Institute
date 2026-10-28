const SITE_URL = "https://www.alquranislamic.com";

export const homeSEO = {
  title: "Al Quran Islamic Institute | Online Quran Academy",
  description: "Learn Quran online with certified Tajweed tutors. 1-on-1 classes for kids, sisters and adults in USA, UK, Canada and Australia. Free trial available.",
  canonicalUrl: `${SITE_URL}/`,
  keywords: "online quran academy, learn quran online, quran classes for kids, female quran tutor uk, online tajweed classes usa",
  ogImage: `${SITE_URL}/logo.jpeg`,
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "name": "Al Quran Islamic Institute",
        "url": `${SITE_URL}/`,
        "logo": `${SITE_URL}/logo.jpeg`,
        "description": "Global online Quran academy offering 1-on-1 recitation, Tajweed, and Hifz classes for kids and adults worldwide."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do online Quran classes work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Classes are conducted 1-on-1 via Zoom or Google Meet with 30-minute or 45-minute daily sessions led by certified male and female tutors."
            }
          },
          {
            "@type": "Question",
            "name": "Are female Quran teachers available?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide certified female tutors specifically for kids, young girls, and adult sisters."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer a free trial?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide a 3-day free trial without any registration fee or credit card required."
            }
          }
        ]
      }
    ]
  }
};