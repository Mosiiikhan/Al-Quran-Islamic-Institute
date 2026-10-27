 import React from 'react';
import CountryPage from './USA';

const canadaData = {
  path: "/online-quran-classes-canada",
  countryName: "Canada",
  lang: "en-CA",

  seo: {
    title: "Online Quran Classes Canada | 1-on-1 Tutors | Free Trial",
    description:
      "Live 1-on-1 online Quran classes for Canadian families, from Toronto to Vancouver. Certified Tajweed tutors, flexible time zones, free trial available.",
    keywords:
      "online quran classes canada, quran tutor canada, learn quran online canada, online tajweed classes canada, quran classes for kids canada, female quran teacher canada, online hifz classes canada",
  },

  hero: {
    h1: "Online Quran Classes in Canada",
    sub: "Live one-to-one Quran lessons with certified tutors, arranged in your own time zone, from the Atlantic coast to the Pacific.",
    trust: [
      "Every Canadian time zone",
      "Male & female tutors",
      "Tajweed & Hifz",
      "English, Urdu & Arabic",
    ],
  },

  intro: [
    "Canada is a huge country, and for many Muslim families the nearest mosque or Quran school is not a short walk away. In big cities the classes can be full, and in smaller towns there may be no regular Quran teaching at all. Online lessons remove the distance, so a qualified tutor can teach your child, or you, from your own kitchen table.",
    "Winter makes this even more practical. When it is dark by late afternoon and the roads are icy, staying home for a Quran lesson is far easier than driving across town. Your lesson happens live on Zoom or Google Meet, and all you need is a device, a stable internet connection and a quiet spot.",
    "Every class is one-to-one. Your tutor listens to your recitation, corrects each mistake as it happens and plans the next lesson around your level. Many Canadian families are raising children who speak English or French at school, so we teach in English, Urdu and Arabic and explain new ideas in simple words.",
  ],

  audiences: [
    {
      title: "Children Growing Up in Canada",
      text: "Children are busy with school, homework and activities, so we keep lessons short, around 30 to 45 minutes. Most begin with Noorani Qaida to learn the Arabic letters, then move on to reading the Quran. Tutors are patient and encouraging, which helps children build confidence rather than fear mistakes.",
    },
    {
      title: "Sisters and Young Girls",
      text: "Sisters and girls can learn with a female tutor in a private, comfortable setting at home. Mothers can sit in on early lessons to learn alongside their daughters if they wish.",
    },
    {
      title: "Adults, Students and New Muslims",
      text: "University students, shift workers and busy parents often need lesson times that change with their week. Adults who are new to Islam or new to Arabic can start from the very first letter without any pressure. Your tutor will check your level in the first class and plan a simple path forward.",
    },
  ],

  courses: [
    {
      title: "Noorani Qaida",
      text: "The first step for beginners: Arabic letters, sounds and how they join together.",
    },
    {
      title: "Quran Recitation",
      text: "Read the Quran with a tutor who corrects your pronunciation and flow in real time.",
    },
    {
      title: "Tajweed Course",
      text: "Learn Makharij and the main rules of Tajweed step by step, practising on real verses.",
    },
    {
      title: "Hifz (Memorization)",
      text: "A structured memorization plan with daily revision, so earlier lessons stay fresh.",
    },
    {
      title: "Duas & Islamic Manners",
      text: "Daily duas, the Kalimas and everyday manners, taught in a way children can remember.",
    },
  ],

  steps: [
    {
      title: "Share your time zone",
      text: "Message us on WhatsApp or fill in the form. Tell us your province or city, so we can plan lesson times in your local time.",
    },
    {
      title: "Join a free trial",
      text: "Your tutor checks your level, listens to a short recitation and explains how the lessons will run. You can ask for a male or female tutor.",
    },
    {
      title: "Pick your weekly plan",
      text: "Choose 2, 3 or 5 days a week and begin regular lessons at a fixed time that suits your household.",
    },
  ],

  schedule: {
    title: "Lesson Times Across Canadian Time Zones",
    text: "Canada spans six time zones, from Newfoundland to the Pacific, so a lesson time that suits Toronto will not suit Vancouver. We arrange every class in your own local time. Many families choose after-school hours, early evenings or weekend mornings, and shift workers or students can ask for a different slot.",
    points: [
      "Newfoundland, Atlantic, Eastern, Central, Mountain and Pacific time",
      "After-school, evening and weekend requests",
      "Sessions of 30 to 45 minutes",
      "Easy to reschedule by message",
    ],
  },

  why: [
    {
      title: "Good for smaller towns",
      text: "If there is no Quran teacher nearby, online lessons give you the same one-to-one teaching as anyone in a big city.",
    },
    {
      title: "No winter travel",
      text: "Learn from home, with no driving on icy roads or waiting in the cold.",
    },
    {
      title: "Male and female tutors",
      text: "Choose the tutor you and your family feel most comfortable with.",
    },
    {
      title: "Progress you can follow",
      text: "You get monthly performance evaluation reports, so you can see your child's improvement.",
    },
    {
      title: "Plans that flex",
      text: "Monthly fees depend on how many days a week you choose. See the fee structure before you decide.",
    },
  ],

  faq: [
    {
      q: "Do you teach Quran online to families across all of Canada?",
      a: "Yes. Lessons run live online, so you can join from any province. Tell us your location when you book and we will plan the class in your local time.",
    },
    {
      q: "I live in a small town with no Quran school nearby. Can I still learn?",
      a: "Yes. That is one of the most common reasons families choose online lessons. You only need a device, a stable internet connection and a quiet place to sit.",
    },
    {
      q: "Which time zone are lessons arranged in?",
      a: "Your own. Share your city or province when you book your free trial and we will set the lesson time to suit it.",
    },
    {
      q: "Can my daughter learn with a female Quran teacher?",
      a: "Yes. We have female tutors for girls, sisters and young children. Mention your preference when you book.",
    },
    {
      q: "My child speaks mostly English. Will they understand the lessons?",
      a: "Yes. Tutors teach in English, Urdu and Arabic, and they explain new ideas in simple English, which helps children who use English every day.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes. You can try a class for free before you commit. No credit card is required.",
    },
  ],

  cta: {
    title: "Start Quran Classes from Your Home in Canada",
    text: "Book your free trial and meet your tutor. No credit card required.",
  },
};

const Canada = ({ onDirectRegisterTrigger }) => (
  <CountryPage data={canadaData} onDirectRegisterTrigger={onDirectRegisterTrigger} />
);

export default Canada;