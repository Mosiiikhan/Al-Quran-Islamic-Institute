import React from 'react';
import CountryPage from './USA';

const australiaData = {
  path: "/online-quran-classes-australia",
  countryName: "Australia",
  lang: "en-AU",

  seo: {
    title: "Online Quran Classes Australia | 1-on-1 Tutors | Free Trial",
    description:
      "Live 1-on-1 online Quran classes for Australian families in Sydney, Melbourne, Brisbane, Perth and beyond. Certified tutors, local time slots, free trial.",
    keywords:
      "online quran classes australia, quran tutor australia, learn quran online australia, online quran classes sydney, online quran classes melbourne, quran classes for kids australia, online tajweed classes australia",
  },

  hero: {
    h1: "Online Quran Classes in Australia",
    sub: "Live one-to-one Quran lessons with certified male and female tutors, scheduled in Australian time for families in every state.",
    trust: [
      "Lessons in your local time",
      "Male & female tutors",
      "Tajweed & Hifz",
      "English, Urdu & Arabic",
    ],
  },

  intro: [
    "Australian Muslim families often live far apart. Sydney and Melbourne have many mosques, but even there the classes can be full, and in Perth, Adelaide, Brisbane, Canberra or regional towns, a good Quran teacher may be a long drive away. Online Quran classes bring a qualified tutor to you, wherever in Australia you live.",
    "Time is the thing families here worry about most. Australia sits on the other side of the world from many of the places Quran teachers come from, so a time that suits you may be an awkward hour for someone else. We plan this with you when you book, so your lessons land at a sensible local time instead of becoming a daily struggle.",
    "Every lesson is one-to-one. Your tutor listens to your recitation, corrects your pronunciation straight away and builds the next class around your level. Lessons run live on Zoom or Google Meet, so you can join from the lounge room with just a device, a stable internet connection and a quiet corner.",
  ],

  audiences: [
    {
      title: "Children Around the School Term",
      text: "Australian school terms are busy, with sport, homework and activities. We keep lessons to 30 to 45 minutes so children can concentrate, and many start with Noorani Qaida before moving to reading the Quran. Tutors are patient, and children are encouraged rather than rushed.",
    },
    {
      title: "Sisters and Young Girls",
      text: "Girls and sisters can learn with a female tutor in a private, comfortable setting. Mothers are welcome to join early classes to support their daughters or begin learning themselves.",
    },
    {
      title: "Adults, Students and Shift Workers",
      text: "Work, university and long commutes leave little room for a fixed class. Adults can choose early morning or evening lessons and begin from the first Arabic letter without feeling embarrassed. Your tutor checks your level in the first class and plans a simple path ahead.",
    },
  ],

  courses: [
    {
      title: "Noorani Qaida",
      text: "Start here if you are a beginner: Arabic letters, their sounds and how to read them.",
    },
    {
      title: "Quran Recitation",
      text: "Read the Quran with a tutor who corrects pronunciation and flow as you go.",
    },
    {
      title: "Tajweed Course",
      text: "Learn Makharij and Tajweed rules step by step, practising on real verses.",
    },
    {
      title: "Hifz (Memorisation)",
      text: "Structured memorisation with regular revision to help what you learn stay with you.",
    },
    {
      title: "Duas & Islamic Manners",
      text: "Everyday duas, the Kalimas and manners, explained simply for children.",
    },
  ],

  steps: [
    {
      title: "Tell us your state and hours",
      text: "Message us on WhatsApp or fill in the form. Share your state or city and the times you are free, such as early morning or after school.",
    },
    {
      title: "Take a free trial",
      text: "Your tutor will listen to a short recitation, assess your level and explain the plan. You can request a male or female tutor.",
    },
    {
      title: "Begin your weekly lessons",
      text: "Choose 2, 3 or 5 days a week and settle into a regular slot that works with your household.",
    },
  ],

  schedule: {
    title: "Class Times for Australian Families",
    text: "Australia runs on several time zones, and some states change their clocks for daylight saving while others do not. To avoid confusion we agree on lesson times in your own local time when you book, and we check again when the clocks change. Early morning before school and evenings after dinner tend to be the most requested slots, and weekends are popular too.",
    points: [
      "Eastern, Central and Western Australian time",
      "Daylight saving changes handled with you",
      "Early morning, evening and weekend requests",
      "Sessions of 30 to 45 minutes",
    ],
  },

  why: [
    {
      title: "Lessons without the long drive",
      text: "Learn from home, even if you live far from the nearest mosque or Quran school.",
    },
    {
      title: "Times planned with you",
      text: "We sort out a workable local time before your lessons begin, not after.",
    },
    {
      title: "Male and female tutors",
      text: "Pick the tutor your family is most comfortable with.",
    },
    {
      title: "Clear progress",
      text: "You receive monthly performance evaluation reports to see how your child is improving.",
    },
    {
      title: "Simple, flexible plans",
      text: "Monthly fees depend on how many days a week you choose. Check the fee structure before you decide.",
    },
  ],

  faq: [
    {
      q: "Can I get lesson times that suit Australian time zones?",
      a: "Yes. Tell us your state or city when you book your free trial and we will plan the class in your local time. If a time does not work out, message us and we will look for another slot.",
    },
    {
      q: "What happens when daylight saving starts or ends?",
      a: "Some Australian states change their clocks and others do not. If your lesson time shifts because of this, message us and we will agree a new time that works for you.",
    },
    {
      q: "Do you teach families outside Sydney and Melbourne?",
      a: "Yes. Lessons are live online, so you can join from any state or territory, including regional areas.",
    },
    {
      q: "Can my daughter learn with a female Quran teacher?",
      a: "Yes. We have female tutors for girls, sisters and young children. Mention your preference when you book.",
    },
    {
      q: "My child has never read Arabic. Can they still start?",
      a: "Yes. Beginners start with Noorani Qaida, which teaches the letters and how they join into words. Your tutor moves at your child's pace.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes. You can take a free trial class before you commit. No credit card is required.",
    },
  ],

  cta: {
    title: "Begin Quran Classes from Home in Australia",
    text: "Book your free trial and meet your tutor. No credit card required.",
  },
};

const Australia = ({ onDirectRegisterTrigger }) => (
  <CountryPage data={australiaData} onDirectRegisterTrigger={onDirectRegisterTrigger} />
);

export default Australia;