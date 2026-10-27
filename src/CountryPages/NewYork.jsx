import React from 'react';
import CountryPage from './USA';

const newYorkData = {
  path: "/online-quran-classes-new-york",
  countryName: "New York",
  lang: "en-US",

  seo: {
    title: "Online Quran Classes New York | 1-on-1 Tutors | Free Trial",
    description:
      "Live 1-on-1 online Quran classes for New York families, from NYC to upstate. Certified Tajweed tutors, Eastern time slots, free trial available.",
    keywords:
      "online quran classes new york, quran tutor new york, online quran classes nyc, learn quran online new york, quran classes for kids new york, female quran teacher new york, online tajweed classes new york",
  },

  hero: {
    h1: "Online Quran Classes in New York",
    sub: "Live one-to-one Quran lessons for busy New York families, with certified tutors and lesson times arranged in Eastern time.",
    trust: [
      "Eastern time slots",
      "Male & female tutors",
      "Tajweed & Hifz",
      "English, Urdu & Arabic",
    ],
  },

  intro: [
    "New York is full of mosques and Islamic centers, yet many families still struggle to find a class that fits. Getting across the city by subway or bus after school can take an hour, weekend classes fill up quickly, and a packed schedule leaves little room for another commute. Online Quran lessons let your child learn at home instead of travelling for the class.",
    "Smaller apartments are common in New York, so finding a quiet place for a lesson matters. A bedroom corner, a desk or a spot in the living room is enough. Lessons run live on Zoom or Google Meet, and your tutor will help you set the camera so your recitation can be heard and, where needed, your reading can be followed on the page.",
    "Every class is one-to-one, so your tutor can focus on your pronunciation and correct it immediately. Whether you are in Queens, Brooklyn, the Bronx, Long Island or upstate, the lesson is the same: personal attention, a pace that suits your level and a plan built around your goals.",
  ],

  audiences: [
    {
      title: "Kids with Packed Weekdays",
      text: "Between school, homework and activities, children get tired quickly. Lessons last 30 to 45 minutes, and a regular time helps build a habit. Most young beginners start with Noorani Qaida, and tutors keep a warm, encouraging tone.",
    },
    {
      title: "Sisters and Young Girls",
      text: "Sisters and girls can learn with a female tutor from home, with no extra travelling. Mothers are welcome to sit in on early lessons and learn alongside their daughters.",
    },
    {
      title: "Working Adults and Students",
      text: "A long commute, shift work or university timetable makes a fixed class hard to keep. Adults can ask for early morning, lunch-hour or late evening lessons. Beginners and new Muslims start from the very first letter, with no pressure.",
    },
  ],

  courses: [
    {
      title: "Noorani Qaida",
      text: "The first step for beginners: Arabic letters, their sounds and how to join them.",
    },
    {
      title: "Quran Recitation",
      text: "Read the Quran with a tutor who corrects your pronunciation as you read.",
    },
    {
      title: "Tajweed Course",
      text: "Step-by-step Makharij and Tajweed rules, practised on real verses.",
    },
    {
      title: "Hifz (Memorization)",
      text: "A structured plan with daily revision, so you keep what you memorize.",
    },
    {
      title: "Duas & Islamic Manners",
      text: "Daily duas, the Kalimas and manners, taught simply for children.",
    },
  ],

  steps: [
    {
      title: "Tell us your schedule",
      text: "Message us on WhatsApp or fill in the form. Share your child's age, level and the times that work around school and activities.",
    },
    {
      title: "Try a free class",
      text: "In the trial your tutor checks your level and goals. You can ask for a male or female tutor.",
    },
    {
      title: "Start your routine",
      text: "Pick 2, 3 or 5 days a week and fix a regular slot, so Quran time becomes a normal part of the week.",
    },
  ],

  schedule: {
    title: "Class Times for New York Families",
    text: "New York follows Eastern time, so we arrange every lesson in Eastern time and check again when the clocks change in spring and autumn. Many families pick the hour after school, early evening or weekend mornings. If your week changes, you can message us to move a lesson.",
    points: [
      "Lessons planned in Eastern time (EST or EDT)",
      "After-school, evening and weekend requests",
      "Sessions of 30 to 45 minutes",
      "Easy to reschedule by message",
    ],
  },

  why: [
    {
      title: "No commute",
      text: "Skip the subway or the drive. Your tutor joins you at home, so the whole session goes to learning.",
    },
    {
      title: "Works in small spaces",
      text: "All you need is a device, a stable internet connection and a quiet corner.",
    },
    {
      title: "Male and female tutors",
      text: "Pick the tutor your family feels most comfortable with.",
    },
    {
      title: "Progress you can follow",
      text: "You get monthly performance evaluation reports, so you can see your child's improvement.",
    },
    {
      title: "Clear plans",
      text: "Monthly fees depend on how many days a week you choose. See the fee structure before you decide.",
    },
  ],

  faq: [
    {
      q: "Do you teach families across New York or only in the city?",
      a: "Lessons are live online, so you can join from New York City, Long Island, upstate or anywhere else in the state. All you need is a stable internet connection.",
    },
    {
      q: "What time zone are classes arranged in?",
      a: "Eastern time. We plan your lesson in your local time and adjust if the clocks change, so you do not need to convert anything yourself.",
    },
    {
      q: "My apartment is small. Is that a problem?",
      a: "No. A quiet corner with a device is enough. Try to sit away from noise so your tutor can hear your recitation clearly.",
    },
    {
      q: "Can my daughter learn with a female Quran teacher?",
      a: "Yes. We have female tutors for girls, sisters and young children. Mention your preference when you book.",
    },
    {
      q: "Can online lessons fit around school and activities?",
      a: "Yes. Many families choose a slot right after school, early evening or the weekend. Share your preferred times when you book and we will try to match them.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes. You can try a class for free before you commit. No credit card is required.",
    },
  ],

  cta: {
    title: "Start Quran Classes from Home in New York",
    text: "Book your free trial and meet your tutor. No credit card required.",
  },
};

const NewYork = ({ onDirectRegisterTrigger }) => (
  <CountryPage data={newYorkData} onDirectRegisterTrigger={onDirectRegisterTrigger} />
);

export default NewYork;