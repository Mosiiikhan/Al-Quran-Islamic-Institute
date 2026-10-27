import React from 'react';
import CountryPage from './USA';

const ukData = {
  path: "/online-quran-classes-uk",
  countryName: "the UK",
  lang: "en-GB",

  seo: {
    title: "Online Quran Lessons UK | Live 1-on-1 Tutors | Free Trial",
    description:
      "Live 1-on-1 online Quran lessons for UK children, sisters and adults. Certified Tajweed tutors, after-school and weekend slots, free trial available.",
    keywords:
      "online quran classes uk, online quran lessons uk, quran tutor uk, learn quran online uk, online tajweed classes uk, female quran teacher uk, quran classes for kids uk",
  },

  hero: {
    h1: "Online Quran Lessons in the UK",
    sub: "Live one-to-one Quran lessons that fit around the school day, with certified male and female tutors for children, sisters and adults.",
    trust: [
      "After-school & weekend slots",
      "Male & female tutors",
      "Tajweed & Hifz",
      "English, Urdu & Arabic",
    ],
  },

  intro: [
    "Many families in the UK already send their children to a mosque madrasah, and it is a wonderful tradition. But classes can be crowded, the mosque may be a drive away, and after a full school day and homework, children are often tired by the time they arrive. Online Quran lessons give you another option: a tutor who comes to your living room, with no travel and no rushing out of the door.",
    "Our lessons are one-to-one, so your tutor hears every word you recite. If you pronounce a letter incorrectly, you are corrected straight away and shown how to fix it. Lessons are planned around your level, whether your child is meeting the Arabic alphabet for the first time or you want to refine your Tajweed after years of reading.",
    "Online learning can also sit alongside what you already do. Some families use our lessons to support the madrasah their children attend, giving extra practice on a weak area. Others use them as the main route to learning the Quran, especially where there is no suitable class nearby.",
  ],

  audiences: [
    {
      title: "Lessons for Children",
      text: "Young learners do best in short, focused sessions, so lessons are kept to 30 to 45 minutes. Children usually start with Noorani Qaida and move on to reading the Quran once the letters are secure. Tutors use gentle correction and encouragement, and parents are welcome to sit in during the first few lessons.",
    },
    {
      title: "Lessons for Sisters",
      text: "Sisters and girls can learn with a female tutor in a private, comfortable setting at home. This suits many families who prefer female-only teaching, and it works well for mothers who want to learn alongside their daughters.",
    },
    {
      title: "Lessons for Adults and New Muslims",
      text: "Work, commuting and family life leave little free time, and many adults never learned to read the Quran properly. Lessons can be planned for early mornings, lunch breaks or evenings. If you are new to Islam or new to Arabic, your tutor will start from the very beginning without any pressure.",
    },
  ],

  courses: [
    {
      title: "Noorani Qaida",
      text: "Learn the Arabic letters, their sounds and how to join them. The right first step for children and adult beginners.",
    },
    {
      title: "Quran Reading with Tajweed",
      text: "Read the Quran fluently while your tutor corrects pronunciation and the rules of recitation as you go.",
    },
    {
      title: "Hifz (Memorisation)",
      text: "A structured plan for memorising the Quran, with regular revision so earlier lessons are not forgotten.",
    },
    {
      title: "Tajweed Course",
      text: "Study Makharij and the core Tajweed rules step by step, with practice on real verses.",
    },
    {
      title: "Duas & Islamic Manners",
      text: "Everyday duas, the Kalimas and basic manners, taught in a simple way that children can remember.",
    },
  ],

  steps: [
    {
      title: "Tell us your week",
      text: "Message us on WhatsApp or fill in the registration form. Share your child's age, level and which days suit you after school or at weekends.",
    },
    {
      title: "Try a free lesson",
      text: "Your tutor will listen to the recitation, suggest where to begin and answer your questions. You can request a male or female tutor.",
    },
    {
      title: "Settle into a routine",
      text: "Choose 2, 3 or 5 days a week. A fixed weekly slot helps children build a habit, and you can message us if a plan needs to change.",
    },
  ],

  schedule: {
    title: "Timings That Work Around UK School Hours",
    text: "Most school days finish in the mid-afternoon, so the busiest requests are for late afternoon and early evening, plus weekend mornings. Winter evenings arrive early, which many families find useful for Quran time before dinner. Tell us your preferred hours when you book your free trial and we will try to match you with a tutor and a regular slot.",
    points: [
      "After-school lessons on weekdays",
      "Weekend morning and afternoon requests",
      "Times set in UK time (GMT or BST)",
      "Sessions of 30 to 45 minutes",
    ],
  },

  why: [
    {
      title: "Tutors who hear every word",
      text: "With one student per class, the whole lesson is spent on your recitation.",
    },
    {
      title: "Male and female tutors",
      text: "Pick the tutor your family feels most comfortable with.",
    },
    {
      title: "Works with madrasah study",
      text: "Use lessons for extra practice alongside a local mosque class, or as your main route to learning.",
    },
    {
      title: "Regular progress reports",
      text: "You receive monthly performance evaluation reports so you can see how your child is improving.",
    },
    {
      title: "Clear plans",
      text: "Monthly fees depend on how many days a week you choose. Check the fee structure before you decide.",
    },
  ],

  faq: [
    {
      q: "Can lessons be arranged after school in the UK?",
      a: "Yes. Many UK families prefer late afternoon or early evening, and weekends are popular too. Share your preferred hours when you book and we will try to match a tutor to them.",
    },
    {
      q: "Does the clock change between GMT and BST affect my lesson time?",
      a: "Lessons are arranged in your local UK time. If the clocks change and your slot needs adjusting, just message us and we will sort out a new time.",
    },
    {
      q: "Can my child take online lessons as well as going to a madrasah?",
      a: "Yes. Many children do both. Online lessons can give extra one-to-one attention on reading or Tajweed while the madrasah covers the wider routine.",
    },
    {
      q: "Can my daughter learn with a female tutor?",
      a: "Yes. Female tutors are available for girls and sisters. Mention it when you book your free trial.",
    },
    {
      q: "I am an adult who has never read Arabic. Where do I start?",
      a: "You will start with Noorani Qaida, which teaches the letters and how they join into words. Your tutor will set a pace you are comfortable with, so there is no need to feel embarrassed.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes. You can take a free trial lesson before you commit, and no credit card is required.",
    },
  ],

  cta: {
    title: "Begin Quran Lessons at Home in the UK",
    text: "Book a free trial lesson and meet your tutor. No credit card required.",
  },
};

const UK = ({ onDirectRegisterTrigger }) => (
  <CountryPage data={ukData} onDirectRegisterTrigger={onDirectRegisterTrigger} />
);

export default UK;