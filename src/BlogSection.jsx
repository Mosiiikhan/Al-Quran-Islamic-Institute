import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  FaCalendarAlt, FaClock, FaArrowLeft, FaHome,
  FaWhatsapp, FaTwitter, FaBookOpen, FaUserGraduate,
  FaSearch, FaBookmark
} from 'react-icons/fa';

import SEOEngine from './SEO/SEOEngine';
import { blogPageSEO } from './SEO/blogPageSEO';

const SITE_URL = "https://www.alquranislamic.com";

/* ══════════════════════════════════════════════════════════════
   📷 IMAGES: yahan apne 6 image links paste karo
   Unsplash/Pexels pe image kholo, right click, "Copy image address".
   Link images.unsplash.com ya images.pexels.com se shuru hona chahiye.
   Unsplash ke end mein ?w=1200&q=70&auto=format laga do.
   Khali ("") chhoro to gradient placeholder dikhega.
   ══════════════════════════════════════════════════════════════ */
const IMAGES = {
  b1: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80",
  b2: "https://images.pexels.com/photos/8164742/pexels-photo-8164742.jpeg?auto=compress&cs=tinysrgb&w=1200",
  b3: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80",
  b4: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  b5: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80",
  b6: "https://images.pexels.com/photos/8164749/pexels-photo-8164749.jpeg?auto=compress&cs=tinysrgb&w=1200"
};
/* ══════════════════════════════════════════════════════════════
   👤 AUTHOR (sab blogs par automatically lagta hai)
   ══════════════════════════════════════════════════════════════ */
const AUTHOR = {
  author: "Mohsin Ishfaq",
  authorTitle: "Founder, Al Quran Islamic Institute"
};

/* ══════════════════════════════════════════════════════════════
   📚 BLOG DATA (static, backend ki zaroorat nahi)
   Naya blog: array mein ek object add karo.
   ══════════════════════════════════════════════════════════════ */
const RAW_BLOGS = [
  {
    _id: "b1",
    slug: "how-to-learn-quran-online-for-beginners",
    title: "How to Learn Quran Online for Beginners: A Complete Step-by-Step Guide",
    category: "Getting Started",
    status: "Published",
    homePosition: 1,
    createdAt: "2026-10-20T09:00:00.000Z",
    updatedAt: "2026-10-28T09:00:00.000Z",
    image: IMAGES.b1,
    imageAlt: "Open Quran on a wooden stand beside a laptop for online Quran lessons",
    metaDescription: "Learn how to start Quran lessons online as a beginner: set your goal, begin with Noorani Qaida, choose a live tutor and build a daily practice routine.",
    content: `
<p>Learning the Quran online has become a practical choice for children, working adults and families who live far from a local teacher. A good online lesson gives you a live teacher, a fixed schedule and the comfort of studying at home. This guide walks you through the whole path, from your first decision to steady recitation.</p>

<div class="key-takeaways">
  <h3>Key Takeaways</h3>
  <ul>
    <li>Decide your goal first: reading, Tajweed, memorization or understanding.</li>
    <li>If you cannot read Arabic yet, complete Noorani Qaida before anything else.</li>
    <li>Choose a live tutor who listens and corrects you, and use the trial class.</li>
    <li>Short daily practice works better than one long weekly session.</li>
  </ul>
</div>

<h2>Why the Quran is best learned with a teacher</h2>
<p>The Quran is learned by listening and repeating, a method passed from teacher to student for centuries. A book can explain a rule, but only a person can hear your pronunciation and tell you what to fix. A well-known hadith recorded in Sahih al-Bukhari teaches that the best of you are those who learn the Quran and teach it. Online classes let you follow this tradition with a live teacher even when no local teacher is available.</p>

<h2>Step 1: Decide your goal</h2>
<p>Your goal decides which course you need. Most beginners fall into one of these groups:</p>
<ul>
  <li><strong>Cannot read Arabic yet:</strong> start with Noorani Qaida.</li>
  <li><strong>Can read slowly:</strong> move to Quran reading with basic Tajweed.</li>
  <li><strong>Reads but makes mistakes:</strong> take a Tajweed course to correct pronunciation.</li>
  <li><strong>Wants to memorize:</strong> begin Hifz once your reading is correct.</li>
  <li><strong>Wants to understand:</strong> add translation and Tafseer lessons.</li>
</ul>

<h2>Step 2: Begin with Noorani Qaida if you are a true beginner</h2>
<p>Noorani Qaida is a foundation book. It teaches Arabic letters, how they join, short and long vowels, Tanween, Sukoon and Shaddah. Many adults feel embarrassed to start here, but this is exactly where good habits are formed. Mistakes made at this stage are harder to fix later, so a few extra weeks here save months afterwards.</p>

<h2>Step 3: Choose the right tutor and lesson format</h2>
<h3>One-to-one or group</h3>
<p>One-to-one lessons give you the tutor's full attention, so every mistake is heard. Group classes can cost less, but each learner gets less time to recite. Beginners and children usually progress better one-to-one.</p>
<h3>Lesson length and frequency</h3>
<p>Several shorter lessons in a week are often easier to sustain than one long lesson. Choose a schedule you can keep for months, not only for the first two weeks.</p>
<h3>Tutor fit</h3>
<p>Ask whether the tutor has experience with your age group. Sisters may prefer a female teacher, and parents of young children should ask how the tutor keeps a child engaged.</p>
<h3>Use the trial class</h3>
<p>A trial lesson lets you check audio quality, teaching style and your comfort level. Do not decide from a price list alone.</p>

<h2>Step 4: Prepare your learning space</h2>
<ul>
  <li>A stable internet connection and a device with a working microphone</li>
  <li>Headphones, so you can hear the tutor's pronunciation clearly</li>
  <li>A printed Qaida or Mushaf, so you follow the same page as your tutor</li>
  <li>A quiet place and a fixed time every day</li>
</ul>

<h2>Step 5: Build a practice routine</h2>
<p>Lessons show you how to recite; progress comes from repeating what you learned between classes. Fifteen to thirty minutes on most days is a realistic target. Record yourself reading the last lesson and compare it with your tutor's recitation. Write down the sounds you find difficult and ask about them in the next class.</p>

<h2>Step 6: Track your progress</h2>
<p>Ask your tutor for regular feedback. A good sign is that your reading becomes smoother, you need fewer corrections and you can read a new page with less help. If you feel stuck for a long time, talk to your tutor about changing the pace or method.</p>

<h2>Common mistakes beginners make</h2>
<ul>
  <li>Skipping Noorani Qaida and jumping straight to the Quran</li>
  <li>Choosing only by price and never taking a trial class</li>
  <li>Practising only on class days</li>
  <li>Comparing their speed with other learners</li>
  <li>Giving up in the first month, when progress feels slow</li>
</ul>

<h2>Frequently asked questions</h2>
<h3>Can adults learn Quran from zero?</h3>
<p>Yes. Adults can start with Noorani Qaida and progress steadily with regular practice and a patient teacher.</p>
<h3>Is online learning as good as in-person?</h3>
<p>It can be, if the lesson is live, the audio is clear and the tutor corrects your recitation. Self-study with videos alone does not replace correction.</p>
<h3>How long will it take?</h3>
<p>It depends on your starting level, lesson frequency and how much you practise. A tutor can give a realistic estimate after hearing you recite.</p>

<blockquote>Not sure where to start? Ask for a free trial class. Your tutor will hear your level and suggest the right course.</blockquote>

<p>Explore our <a href="/courses">Quran courses</a> for kids, adults and sisters, or read about <a href="/blogs/noorani-qaida-for-kids-parents-guide">Noorani Qaida for kids</a> and <a href="/blogs/tajweed-rules-for-beginners">Tajweed rules for beginners</a>.</p>
`
  },

  {
    _id: "b2",
    slug: "noorani-qaida-for-kids-parents-guide",
    title: "Noorani Qaida for Kids: A Complete Guide for Parents",
    category: "Kids Learning",
    status: "Published",
    homePosition: 2,
    createdAt: "2026-10-21T09:00:00.000Z",
    updatedAt: "2026-10-28T09:00:00.000Z",
    image: IMAGES.b2,
    imageAlt: "Child learning Arabic letters from a Noorani Qaida book",
    metaDescription: "A parent's guide to Noorani Qaida for kids: what it covers, the right age to start, how to practise at home and signs your child is ready for the Quran.",
    content: `
<p>Noorani Qaida is usually the first book a child uses on the way to reading the Quran. It builds the reading skills a child needs before opening the Mushaf. If you are a parent deciding where to begin, this guide explains what the book teaches, how to support your child and how to know when the next step is near.</p>

<div class="key-takeaways">
  <h3>Key Takeaways</h3>
  <ul>
    <li>Noorani Qaida teaches letters, sounds, vowels and basic reading rules.</li>
    <li>Correct habits at this stage make Quran reading much easier later.</li>
    <li>Ten minutes of daily practice at home helps more than a long weekly session.</li>
    <li>Every child has a different pace, so avoid comparing.</li>
  </ul>
</div>

<h2>What is Noorani Qaida?</h2>
<p>Noorani Qaida is a step-by-step primer for reading Arabic as it is used in the Quran. Lessons start with single letters and gradually add joined letters, vowels and reading rules. Because each lesson builds on the previous one, a child should not rush ahead until the current page is read smoothly.</p>

<h2>What does the Qaida cover?</h2>
<ul>
  <li>Arabic letters and their correct sounds</li>
  <li>Joined letters, and how a letter changes shape inside a word</li>
  <li>Short vowel marks: Fatha, Kasra and Damma</li>
  <li>Tanween (double vowel marks)</li>
  <li>Long vowels (Madd) and soft letters</li>
  <li>Sukoon and Shaddah</li>
  <li>Basic reading rules that prepare the child for Tajweed</li>
</ul>

<h2>Why this stage matters so much</h2>
<p>A child who learns letters and sounds correctly at the start finds Quran reading easier and more enjoyable. Wrong habits, such as mixing similar letters, are harder to correct after months of repetition. A few extra weeks spent on the basics usually save a lot of time later.</p>

<h2>What age can a child start?</h2>
<p>There is no single right age. Many families begin when a child can sit and focus for a short lesson, recognise shapes and follow simple instructions. A tutor can tell you quickly whether your child is ready or needs a little more time.</p>

<h2>How long does it take?</h2>
<p>It depends on the child's age, attention, lesson frequency and home practice. Some children move quickly through early pages and slow down on harder topics, which is normal. Steady progress matters more than speed.</p>

<h2>How parents can help at home</h2>
<ul>
  <li>Choose a fixed practice time, even if it is only ten minutes</li>
  <li>Ask your child to read the last lesson aloud to you</li>
  <li>Praise effort and improvement, not only correct answers</li>
  <li>Keep the Qaida clean and in a respectful place, so the child values it</li>
  <li>Tell the tutor which sounds your child finds difficult</li>
  <li>Keep sessions calm and short, and stop before the child is tired</li>
</ul>

<h2>How online lessons work for young children</h2>
<p>In a live one-to-one lesson, the tutor shows the page on screen, reads a line and asks the child to repeat it. The tutor corrects pronunciation straight away and repeats until the sound is right. Parents can sit nearby for the first lessons, help with the device and then step back once the child is comfortable.</p>

<h2>Signs your child is ready for the Quran</h2>
<ul>
  <li>Reads letters and vowel marks without long pauses</li>
  <li>Can read joined letters inside words</li>
  <li>Understands long vowels, Sukoon and Shaddah</li>
  <li>Reads a full page with few corrections</li>
</ul>

<h2>Common mistakes to avoid</h2>
<ul>
  <li>Pushing the child to move ahead before the page is clear</li>
  <li>Comparing the child with siblings or classmates</li>
  <li>Using harsh correction, which can make a child dislike lessons</li>
  <li>Skipping home practice for several days in a row</li>
</ul>

<h2>Frequently asked questions</h2>
<h3>Should my child learn Qaida before the Quran?</h3>
<p>Yes, in most cases. It builds the reading base so the child can read the Quran with fewer mistakes.</p>
<h3>Is online Qaida effective for kids?</h3>
<p>It can be, when the lesson is live, one-to-one and the tutor is patient with children. Check this in a trial class.</p>
<h3>What if my child loses interest?</h3>
<p>Shorter lessons, a better time of day and gentle encouragement help. Talk to the tutor, who may change the activities.</p>

<p>See our <a href="/courses">courses for kids</a> and ask for a free trial class. You can also read <a href="/blogs/how-to-choose-online-quran-classes-for-kids">how to choose online Quran classes for kids</a>.</p>
`
  },

  {
    _id: "b3",
    slug: "tajweed-rules-for-beginners",
    title: "Tajweed Rules for Beginners: A Simple Guide with Practice Tips",
    category: "Tajweed",
    status: "Published",
    homePosition: 3,
    createdAt: "2026-10-22T09:00:00.000Z",
    updatedAt: "2026-10-28T09:00:00.000Z",
    image: IMAGES.b3,
    imageAlt: "Quran open to a page of recitation with Tajweed colour markings",
    metaDescription: "Tajweed rules for beginners explained simply: makharij, noon sakinah, meem sakinah, madd, qalqalah and ghunnah, with a practical way to practise daily.",
    content: `
<p>Tajweed means reciting the Quran correctly, giving every letter its proper sound and every rule its right. For a beginner the subject can look large, but it becomes manageable when you learn one topic at a time. This guide explains the core rules in plain English and shows how to practise them.</p>

<div class="key-takeaways">
  <h3>Key Takeaways</h3>
  <ul>
    <li>Start with letter sounds (Makharij), then learn Noon Sakinah, Meem Sakinah and Madd.</li>
    <li>Learn one rule fully before moving to the next.</li>
    <li>Listening to a good reciter and being corrected by a teacher matters most.</li>
    <li>Daily short practice builds accuracy.</li>
  </ul>
</div>

<h2>What is Tajweed and why does it matter?</h2>
<p>The word Tajweed comes from an Arabic root meaning to make something excellent. In recitation it means pronouncing each letter from its correct place, with its correct qualities and following the rules that apply when letters meet. Many scholars teach that learning to recite properly is part of respecting the Quran, and a mistake in pronunciation can change a sound or, in some cases, a meaning.</p>

<h2>1. Makharij: where letters come from</h2>
<p>Every Arabic letter has a point of articulation: the throat, the tongue, the lips or the nasal passage. Learning these points is the base of Tajweed. A teacher will usually have you repeat similar letters, such as ث and س, or ح and ه, until your ear and tongue can tell them apart.</p>

<h2>2. Noon Sakinah and Tanween</h2>
<p>When a Noon with Sukoon, or a Tanween, is followed by a certain letter, the sound changes. There are four rules:</p>
<ul>
  <li><strong>Izhar:</strong> clear pronunciation, with no merging. It happens before the six throat letters ء ه ع ح غ خ.</li>
  <li><strong>Idgham:</strong> merging into the next letter. It happens before the letters of the word يرملون. Four of them (ي ن م و) merge with Ghunnah, and two (ل ر) merge without it.</li>
  <li><strong>Iqlab:</strong> the sound changes into a Meem before the letter ب, with Ghunnah.</li>
  <li><strong>Ikhfa:</strong> a light, hidden sound with Ghunnah, before the remaining fifteen letters.</li>
</ul>

<h2>3. Meem Sakinah</h2>
<p>A Meem with Sukoon has three rules based on the letter after it:</p>
<ul>
  <li><strong>Ikhfa Shafawi:</strong> before the letter ب</li>
  <li><strong>Idgham Shafawi:</strong> before another م</li>
  <li><strong>Izhar Shafawi:</strong> before all other letters</li>
</ul>

<h2>4. Ghunnah</h2>
<p>Ghunnah is a nasal sound produced from the nose. It is held for a short, measured time and is clearest on Noon and Meem with Shaddah.</p>

<h2>5. Madd: lengthening the sound</h2>
<p>Madd means stretching a vowel sound. Natural Madd (Madd Asli) is held for about two counts. Other types, such as Madd Muttasil, Munfasil and Lazim, are longer and depend on what follows the long vowel. Your teacher will show you the exact length used in your recitation style.</p>

<h2>6. Qalqalah</h2>
<p>Qalqalah is a light echo on five letters when they carry Sukoon: ق ط ب ج د. It should be clear but not exaggerated.</p>

<h2>How to practise Tajweed as a beginner</h2>
<ul>
  <li>Learn one rule at a time and revise it before moving on</li>
  <li>Find the rule in a few short verses and read them aloud slowly</li>
  <li>Record yourself and compare with a good reciter</li>
  <li>Read to a teacher who can correct your pronunciation</li>
  <li>Revise old rules every week so they stay fresh</li>
</ul>

<h2>Common beginner mistakes</h2>
<ul>
  <li>Reading too fast before the sounds are accurate</li>
  <li>Mixing up similar letters from the throat</li>
  <li>Over-stretching Madd or over-pressing Qalqalah</li>
  <li>Learning rules from a book only, without anyone to correct pronunciation</li>
</ul>

<h2>Frequently asked questions</h2>
<h3>Do I need Tajweed if I already read Quran?</h3>
<p>If you read without a teacher's correction, you may have small mistakes you cannot hear. A Tajweed course helps find and fix them.</p>
<h3>How long does it take to learn Tajweed?</h3>
<p>It depends on your starting level and practice. Learning the rules is quicker than applying them smoothly, which takes regular recitation.</p>
<h3>Can I learn Tajweed online?</h3>
<p>Yes, with a live teacher who can hear you and correct you during the lesson.</p>

<p>Tajweed is learned best by listening and correction. Our <a href="/courses">Tajweed courses</a> are taught live, so your tutor can fix your recitation as you read. New to reading? Start with <a href="/blogs/how-to-learn-quran-online-for-beginners">how to learn Quran online</a>.</p>
`
  },

  {
    _id: "b4",
    slug: "how-much-do-online-quran-classes-cost",
    title: "How Much Do Online Quran Classes Cost? What Affects the Price",
    category: "Guides",
    status: "Published",
    homePosition: 0,
    createdAt: "2026-10-23T09:00:00.000Z",
    updatedAt: "2026-10-28T09:00:00.000Z",
    image: IMAGES.b4,
    imageAlt: "Parent comparing online Quran class options on a laptop",
    metaDescription: "Online Quran classes cost about $25 to $85 per month depending on classes per week and lesson length. See what affects the price and what to ask before you pay.",
    content: `
<p>Prices for online Quran classes vary a lot between academies. Looking only at the lowest price can be misleading, because two offers may include very different things. This guide explains what changes the price, what to ask before paying and how to compare fairly.</p>

<h2>Typical price range</h2>
<p>At Al Quran Islamic Institute, private one-to-one plans cost between <strong>$25 and $85 per month</strong>. The price depends mainly on how many classes you take each week and how long each lesson is.</p>
<ul>
  <li><strong>Lighter plans (fewer classes a week):</strong> from about $25 a month</li>
  <li><strong>Intensive plans (such as Hifz, 5 days a week):</strong> up to $85 a month</li>
</ul>
<p>Divide the monthly fee by the number of classes to see the price per lesson. That is the fairest way to compare any two academies.</p>

<div class="key-takeaways">
  <h3>Key Takeaways</h3>
  <ul>
    <li>Compare the price for the same number of lessons and the same lesson length.</li>
    <li>One-to-one lessons usually cost more than group classes.</li>
    <li>Use a free trial class before you pay.</li>
    <li>Always ask about make-up classes, cancellation and refunds.</li>
  </ul>
</div>

<h2>Factors that change the price</h2>
<h3>One-to-one or group</h3>
<p>In a one-to-one class the tutor gives the whole lesson to one student, so it generally costs more than sharing a tutor with other learners. Group classes can work well for some students, but each learner recites less.</p>
<h3>Number of classes per week</h3>
<p>More lessons in a week usually mean a higher monthly fee. They also tend to bring faster, more consistent progress.</p>
<h3>Lesson length</h3>
<p>A 30-minute lesson and a 60-minute lesson are not priced the same. Young children often do better with shorter sessions.</p>
<h3>Course type</h3>
<p>Noorani Qaida, Quran reading, Tajweed, Hifz and translation courses have different needs and tutor skills, which can affect pricing.</p>
<h3>Tutor experience and qualification</h3>
<p>Tutors with more teaching experience or specialist training may charge more. Ask what qualifies a tutor to teach your course.</p>
<h3>Schedule and time zone</h3>
<p>Class timings that suit another country, early mornings or late evenings can affect availability and cost.</p>

<h2>Questions to ask before you pay</h2>
<ul>
  <li>What exactly is included in the monthly fee?</li>
  <li>Is there a free trial class, and is it with the tutor I will actually get?</li>
  <li>What happens if I miss a class? Are make-up classes offered?</li>
  <li>Can I change my tutor if the first one is not a good fit?</li>
  <li>Is there a contract, or can I stop whenever I want?</li>
  <li>Which payment methods are accepted, and in which currency?</li>
  <li>How will progress be shared with me or my child's parents?</li>
</ul>

<h2>Warning signs</h2>
<ul>
  <li>A very low price that does not say how many classes you receive</li>
  <li>No trial class and no way to meet the tutor first</li>
  <li>Unclear refund or cancellation rules</li>
  <li>Pressure to pay for many months in advance</li>
</ul>

<h2>How to compare academies fairly</h2>
<ul>
  <li>Write down classes per week, minutes per class and format (one-to-one or group) for each option</li>
  <li>Divide the monthly fee by the number of lessons to see the price per lesson</li>
  <li>Take a trial with your top two choices and compare how the tutors teach</li>
  <li>Choose the best value, not simply the lowest price</li>
</ul>

<h2>Frequently asked questions</h2>
<h3>Are cheaper classes worse?</h3>
<p>Not always, but low prices can mean larger groups, fewer lessons or less experienced tutors. Check what is included.</p>
<h3>Should I pay for several months at once?</h3>
<p>Try a trial and a first month before committing to a long payment, unless the terms and refund rules are clear.</p>
<h3>Do family members get a discount?</h3>
<p>Policies differ by academy. Ask directly before enrolling more than one student.</p>

<p>For current fees and plans, visit our <a href="/courses">courses page</a> or contact us. You can also read <a href="/blogs/how-to-choose-online-quran-classes-for-kids">how to choose online Quran classes for kids</a>.</p>
`
  },

  {
    _id: "b5",
    slug: "how-to-memorize-quran-tips-for-beginners",
    title: "How to Memorize the Quran: A Practical Guide for Beginners",
    category: "Hifz",
    status: "Published",
    homePosition: 0,
    createdAt: "2026-10-24T09:00:00.000Z",
    updatedAt: "2026-10-28T09:00:00.000Z",
    image: IMAGES.b5,
    imageAlt: "Student holding a Quran and prayer beads while memorizing a surah",
    metaDescription: "Practical guide to memorize the Quran as a beginner: daily routine, sabaq, sabqi and manzil revision, choosing a teacher and avoiding common mistakes.",
    content: `
<p>Memorizing the Quran (Hifz) rewards consistency more than speed. Many people begin with enthusiasm and lose momentum because they have no method. This guide gives beginners a clear structure: how to prepare, how to organise each day and how to keep what you have memorized.</p>

<div class="key-takeaways">
  <h3>Key Takeaways</h3>
  <ul>
    <li>Make sure your reading and Tajweed are correct before you start memorizing.</li>
    <li>Use the daily system of Sabaq, Sabqi and Manzil.</li>
    <li>Revision is as important as new memorization.</li>
    <li>Recite to a teacher regularly to catch small mistakes.</li>
  </ul>
</div>

<h2>Before you start: build the base</h2>
<p>Hifz works best when your reading is already accurate. If you still stumble on letters or Tajweed rules, spend time on those first. Memorizing a mistake is easy, and correcting it later takes much more effort.</p>

<h2>1. Set your intention and a daily time</h2>
<p>Choose a time when your mind is fresh, for example after Fajr, and keep it the same every day. A fixed time turns memorization into a habit instead of a decision you must make each day.</p>

<h2>2. Use one Mushaf</h2>
<p>Memorize from the same printed copy every time. Many students remember the visual position of a verse on the page, such as the top, the middle or the start of a new page, and this supports recall.</p>

<h2>3. Follow the three-part daily system</h2>
<ul>
  <li><strong>Sabaq:</strong> the new lesson you memorize today</li>
  <li><strong>Sabqi:</strong> revision of the last few lessons</li>
  <li><strong>Manzil:</strong> revision of older portions you have already memorized</li>
</ul>
<p>A lesson that is not revised fades quickly. Many teachers advise giving revision a protected place in the day, not leaving it for leftover time.</p>

<h2>4. Start small and grow slowly</h2>
<p>Begin with a few lines a day. Short surahs near the end of the Quran are a common starting point. Increase the amount only when your Sabqi and Manzil stay strong.</p>

<h2>5. A simple method for a new lesson</h2>
<ul>
  <li>Read the lines slowly with correct Tajweed several times, looking at the text</li>
  <li>Divide the lesson into small parts of one or two verses</li>
  <li>Repeat each part until you can say it without looking</li>
  <li>Join the parts together and repeat the full lesson</li>
  <li>Recite it again before sleep and after waking</li>
</ul>

<h2>6. Recite to a teacher</h2>
<p>A teacher listens to your recitation, notices small errors you cannot hear and keeps you on schedule. Online lessons allow regular recitation checks without travel.</p>

<h2>7. Listen and repeat</h2>
<p>Listening to a good reciter read the same portion helps your ear and memory. Repeat after the reciter, then try without the audio.</p>

<h2>8. Protect your health and routine</h2>
<p>Enough sleep, regular meals and a calm study space help memory. Avoid studying when you are very tired or distracted.</p>

<h2>Common mistakes</h2>
<ul>
  <li>Adding new lessons without revising old ones</li>
  <li>Changing the Mushaf or the schedule often</li>
  <li>Comparing your pace with other students</li>
  <li>Memorizing without a teacher to check recitation</li>
  <li>Quitting after a few missed days instead of restarting gently</li>
</ul>

<h2>Frequently asked questions</h2>
<h3>Can adults memorize the Quran?</h3>
<p>Yes. Adults can memorize with a steady routine, a teacher and patience. Progress may be slower for some, but regular revision makes a big difference.</p>
<h3>How much should I memorize each day?</h3>
<p>It depends on your level and time. Start with a small amount you can revise well, and let your teacher advise how to increase it.</p>
<h3>What if I forget what I memorized?</h3>
<p>Forgetting is normal. Return to revision, recite to your teacher and strengthen the weak parts with more repetition.</p>

<p>If you want teacher guidance, see our <a href="/courses">Hifz program</a> and ask for a trial class. Read <a href="/blogs/tajweed-rules-for-beginners">Tajweed rules for beginners</a> to strengthen your base first.</p>
`
  },

  {
    _id: "b6",
    slug: "how-to-choose-online-quran-classes-for-kids",
    title: "How to Choose Online Quran Classes for Kids: A Parent's Checklist",
    category: "Kids Learning",
    status: "Published",
    homePosition: 0,
    createdAt: "2026-10-25T09:00:00.000Z",
    updatedAt: "2026-10-28T09:00:00.000Z",
    image: IMAGES.b6,
    imageAlt: "Child attending an online Quran class on a tablet with a parent nearby",
    metaDescription: "How to choose online Quran classes for kids: tutor fit, lesson length, schedule, parent progress updates and questions to ask during a free trial.",
    content: `
<p>Choosing the right online Quran class for your child matters, because a good fit keeps the child interested and learning correctly, while a poor fit can make them dislike lessons. Use this checklist to compare options calmly and make a confident decision.</p>

<div class="key-takeaways">
  <h3>Key Takeaways</h3>
  <ul>
    <li>Look for a patient tutor with experience teaching children.</li>
    <li>Beginners usually benefit from one-to-one lessons.</li>
    <li>Pick a lesson length and time when your child is alert.</li>
    <li>Use the trial class and ask how progress is shared with parents.</li>
  </ul>
</div>

<h2>1. Check the teaching style</h2>
<p>Young children learn best with a patient, friendly tutor who uses short activities and repetition. A lesson that is too strict or too fast can reduce a child's confidence. Ask whether the tutor has experience with your child's age group.</p>

<h2>2. Decide between one-to-one and group</h2>
<p>In a one-to-one class, the tutor hears every mistake and can correct it at once. Group classes can feel social and motivating, but beginners may get little speaking time. For a new learner, one-to-one is often the safer start.</p>

<h2>3. Choose the right lesson length and time</h2>
<p>Children lose focus quickly, so shorter lessons often work better. Pick a time when your child is not hungry or tired, such as after school and a short rest. If you live abroad, check that the tutor's available times match your time zone.</p>

<h2>4. Confirm the course level</h2>
<p>The class should match your child's current level. A child who cannot read Arabic yet should begin with Noorani Qaida, and a child who reads should move to Quran reading and Tajweed. A good academy will test your child's level before suggesting a course.</p>

<h2>5. Ask about progress updates</h2>
<p>You should be able to see what your child has learned and what to practise at home. Ask how the academy reports progress, how often and whether you can speak to the tutor if you have concerns.</p>

<h2>6. Check technology and safety</h2>
<ul>
  <li>Clear audio and video during the lesson</li>
  <li>A simple platform that works on a laptop or tablet</li>
  <li>Parents are allowed to sit nearby or listen in</li>
  <li>Clear rules about lesson timings and recordings</li>
</ul>

<h2>7. Use the trial class wisely</h2>
<p>During the trial, watch these points:</p>
<ul>
  <li>Does your child feel comfortable with the tutor?</li>
  <li>Does the tutor listen carefully and correct gently?</li>
  <li>Is the lesson at the right level for your child?</li>
  <li>Does your child want to attend another lesson?</li>
</ul>

<h2>8. Support your child at home</h2>
<p>Classes work best with short daily revision. Sit nearby in the first lessons, set a regular practice time and encourage effort. A calm and positive routine matters more than long study hours.</p>

<h2>Parent checklist</h2>
<ul>
  <li>Tutor is patient and has experience with children</li>
  <li>Lesson is live and, for beginners, one-to-one</li>
  <li>Timing suits my child and my time zone</li>
  <li>Course level matches my child's reading</li>
  <li>Progress updates and parent contact are available</li>
  <li>Trial class completed, and my child felt comfortable</li>
  <li>Fees, make-up classes and cancellation are clear</li>
</ul>

<h2>Frequently asked questions</h2>
<h3>At what age can kids start online Quran classes?</h3>
<p>Many children start when they can sit and focus for a short lesson. The tutor can advise after a trial class.</p>
<h3>Should a parent stay during the lesson?</h3>
<p>For young children, staying nearby in the first lessons helps them settle. You can step back as they become confident.</p>
<h3>What if my child does not like the tutor?</h3>
<p>Speak to the academy. A different tutor may suit your child better, and a good academy will help with this.</p>

<p>We offer programs for children at different levels. See our <a href="/courses">courses</a> and ask for a free trial class. New to the Qaida? Read the <a href="/blogs/noorani-qaida-for-kids-parents-guide">parent's guide to Noorani Qaida</a>.</p>
`
  }
];

const BLOGS = RAW_BLOGS.map(b => ({ ...AUTHOR, ...b }));

/* ══════════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════════ */
const slugify = (text = '') =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getSlug = (b) => b.slug || slugify(b.title);

const stripHtml = (html = '') =>
  html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const getPreview = (html = '', max = 135) => {
  const text = stripHtml(html);
  return text.length > max ? text.slice(0, max) + '...' : text;
};

const fmtDate = (ds) => {
  if (!ds) return '';
  return new Date(ds).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getReadTime = (html = '') => {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

/* Image with gradient placeholder (logo kahin nahi lagta) */
const BlogImage = ({ src, alt, className = '', loading = 'lazy', fit = 'object-cover' }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-[#001f3f] via-blue-900 to-indigo-950 ${className}`}
      >
        <FaBookOpen className="text-amber-400/70" size={44} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setFailed(true)}
      className={`w-full h-full ${fit} ${className}`}
    />
  );
};

/* ══════════════════════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════════════════════ */
const BlogSection = ({ isFullPageDefault = false }) => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [readingProgress, setReadingProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const blogs = useMemo(
    () =>
      BLOGS.filter(b => b.status === 'Published').sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    []
  );

  const displayedBlogs = useMemo(() => {
    if (isFullPageDefault) return blogs;
    const pos1 = blogs.find(b => b.homePosition === 1);
    const pos2 = blogs.find(b => b.homePosition === 2);
    const pos3 = blogs.find(b => b.homePosition === 3);
    const regular = blogs.filter(b => !b.homePosition || b.homePosition === 0);

    const output = [];
    let regIndex = 0;
    [pos1, pos2, pos3].forEach(posBlog => {
      if (posBlog) output.push(posBlog);
      else if (regular[regIndex]) output.push(regular[regIndex++]);
    });
    return output;
  }, [blogs, isFullPageDefault]);

  const currentBlog = useMemo(
    () => (slug ? blogs.find(b => getSlug(b) === slug) || null : null),
    [slug, blogs]
  );

  // Reading progress bar
  useEffect(() => {
    if (!slug) return;
    setReadingProgress(0);
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setReadingProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  // Smart back navigation
  const cameFromHome = location.state?.from === 'home';
  const handleSmartBack = (e) => {
    e.preventDefault();
    if (cameFromHome) {
      navigate('/#blog-section');
      setTimeout(() => {
        const el = document.getElementById('blog-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    } else {
      navigate('/blogs');
    }
  };

  // Article ke andar internal links: page reload nahi hota
  const handleContentClick = (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      navigate(href);
    }
  };

  // Catalog filter
  const categoriesList = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))];
  const filteredCatalog = blogs.filter(b => {
    const q = searchQuery.toLowerCase();
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesQuery =
      b.title.toLowerCase().includes(q) ||
      stripHtml(b.content).toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const articleNotFound = Boolean(slug) && !currentBlog;

  /* ══════════ VIEW A: ARTICLE READER (/blogs/:slug) ══════════ */
  if (slug && currentBlog) {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : `${SITE_URL}/blogs/${slug}`;
    const description = currentBlog.metaDescription || getPreview(currentBlog.content, 155);
    const hasImage = Boolean(currentBlog.image);

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${SITE_URL}/blogs/${slug}`
      },
      "headline": currentBlog.title,
      "description": description,
      ...(hasImage ? { "image": [currentBlog.image] } : {}),
      "datePublished": currentBlog.createdAt,
      "dateModified": currentBlog.updatedAt || currentBlog.createdAt,
      "inLanguage": "en",
      "author": currentBlog.author
        ? {
            "@type": "Person",
            "name": currentBlog.author,
            ...(currentBlog.authorTitle ? { "jobTitle": currentBlog.authorTitle } : {}),
            "url": SITE_URL
          }
        : { "@type": "Organization", "name": "Al Quran Islamic Institute", "url": SITE_URL },
      "publisher": {
        "@type": "EducationalOrganization",
        "name": "Al Quran Islamic Institute",
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/logo.jpeg`
        }
      }
    };

    return (
      <>
        <SEOEngine
          title={`${currentBlog.title} | Al Quran Islamic Institute`}
          description={description}
          canonicalUrl={`${SITE_URL}/blogs/${slug}`}
          keywords={`${currentBlog.category ? currentBlog.category.toLowerCase() + ', ' : ''}quran learning, tajweed rules, islamic articles`}
          ogImage={hasImage ? currentBlog.image : undefined}
          ogType="article"
          schemaJson={articleSchema}
        />

        <article className="bg-[#fcfdff] min-h-screen py-8 md:py-14 font-sans selection:bg-orange-500 selection:text-white relative">
          <div
            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 z-[100] transition-all duration-150"
            style={{ width: `${readingProgress}%` }}
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6">

            {/* Navigation & Breadcrumbs */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <button
                type="button"
                onClick={handleSmartBack}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-200 hover:shadow-md transition-all duration-200 text-xs font-bold uppercase tracking-wider group cursor-pointer"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" size={11} />
                <span>{cameFromHome ? "Back to Featured Insights" : "Back to All Articles"}</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400">
                <Link to="/#blog-section" className="hover:text-slate-700 flex items-center gap-1">
                  <FaHome size={12} /> Home
                </Link>
                <span>/</span>
                <Link to="/blogs" className="hover:text-slate-700">Articles</Link>
                <span>/</span>
                <span className="text-orange-600 font-bold truncate max-w-[200px]">{currentBlog.title}</span>
              </div>
            </div>

            {/* Main Article */}
            <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-slate-100 mb-10 overflow-hidden">

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                  {currentBlog.category || 'General'}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                  <FaCalendarAlt size={12} className="text-slate-400" /> {fmtDate(currentBlog.createdAt)}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                  <FaClock size={12} className="text-slate-400" /> {getReadTime(currentBlog.content)}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#001f3f] tracking-tight leading-tight mb-8">
                {currentBlog.title}
              </h1>

              <div className="flex items-center justify-between border-y border-slate-100 py-4 mb-8 gap-4 flex-wrap">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-amber-400 flex items-center justify-center font-black text-sm shadow">
                    <FaUserGraduate size={17} />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      {currentBlog.author || "Al Quran Islamic Institute"}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {currentBlog.authorTitle || "Quran Learning Guides"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 hidden sm:inline mr-1">Share:</span>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${currentBlog.title} - Read more: ${shareUrl}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                    title="Share on WhatsApp"
                  >
                    <FaWhatsapp size={15} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentBlog.title)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
                    title="Share on X"
                  >
                    <FaTwitter size={14} />
                  </a>
                </div>
              </div>

              {/* Banner */}
              <div className="rounded-2xl overflow-hidden mb-10 shadow-inner h-56 sm:h-80 md:h-[420px] border border-slate-100">
                <BlogImage
                  key={currentBlog._id}
                  src={currentBlog.image}
                  alt={currentBlog.imageAlt || currentBlog.title}
                  loading="eager"
                />
              </div>

              {/* Body */}
              <div
                className="article-rich-content leading-relaxed text-slate-700 text-base sm:text-lg"
                onClick={handleContentClick}
                dangerouslySetInnerHTML={{ __html: currentBlog.content }}
              />

              {/* CTA */}
              <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#001f3f] via-blue-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 text-center md:text-left">
                  <div className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center justify-center md:justify-start gap-2">
                    <FaBookmark /> Transform Your Recitation
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">Learn Quran Online with 1-on-1 Tutors</h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
                    Individual programs for kids, adults, and sisters. Ask for a free trial class to see how lessons work.
                  </p>
                </div>
                <Link
                  to="/courses"
                  className="relative z-10 px-7 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:shadow-orange-500/30 flex items-center gap-2 whitespace-nowrap"
                >
                  <FaBookOpen size={14} /> View All Programs
                </Link>
              </div>

            </div>
          </div>

          <style>{`
            .article-rich-content h2, .article-rich-content h3 {
              color: #001f3f;
              font-weight: 800;
              line-height: 1.35;
            }
            .article-rich-content h2 {
              font-size: 1.6rem;
              margin-top: 2em;
              margin-bottom: 0.7em;
              border-bottom: 2px solid #f1f5f9;
              padding-bottom: 0.5rem;
            }
            .article-rich-content h3 { font-size: 1.2rem; margin-top: 1.5em; margin-bottom: 0.5em; }
            .article-rich-content p { margin-bottom: 1.3em; }
            .article-rich-content ul, .article-rich-content ol { margin-left: 1.6em; margin-bottom: 1.4em; list-style: disc; }
            .article-rich-content ol { list-style: decimal; }
            .article-rich-content li { margin-bottom: 0.5em; }
            .article-rich-content strong { color: #001f3f; font-weight: 700; }
            .article-rich-content blockquote {
              border-left: 4px solid #f97316;
              background: #fffaf0;
              padding: 1.2rem 1.6rem;
              margin: 1.8rem 0;
              font-style: italic;
              color: #9a3412;
              border-radius: 0 1rem 1rem 0;
            }
            .article-rich-content .key-takeaways {
              background: #f0f7ff;
              border: 1px solid #cfe3ff;
              border-left: 5px solid #1e3a8a;
              border-radius: 1rem;
              padding: 1.2rem 1.5rem;
              margin: 1.8rem 0 2rem;
            }
            .article-rich-content .key-takeaways h3 { margin-top: 0; font-size: 1.1rem; }
            .article-rich-content .key-takeaways ul { margin-bottom: 0; }
            .article-rich-content img { border-radius: 1rem; max-width: 100%; margin: 1.6rem auto; display: block; }
            .article-rich-content a { color: #d97706; text-decoration: underline; font-weight: 600; }
          `}</style>
        </article>
      </>
    );
  }

  /* ══════════ VIEW B: CARDS GRID ══════════ */
  const HeadingTag = isFullPageDefault ? 'h1' : 'h2';
  const listToShow = isFullPageDefault ? filteredCatalog : displayedBlogs;

  return (
    <>
      {articleNotFound && (
        <SEOEngine
          title="Article Not Found | Al Quran Islamic Institute"
          description="This article could not be found."
          noindex
        />
      )}

      {isFullPageDefault && !slug && (
        <SEOEngine
          title={blogPageSEO.title}
          description={blogPageSEO.description}
          canonicalUrl={blogPageSEO.canonicalUrl}
          keywords={blogPageSEO.keywords}
          ogImage={blogPageSEO.ogImage}
          schemaJson={blogPageSEO.schema}
        />
      )}

      <section id="blog-section" className="py-20 bg-[#f8faff] relative overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

          {isFullPageDefault && (
            <div className="flex items-center justify-between gap-4 mb-10">
              <Link
                to="/#blog-section"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-200 hover:shadow-md transition-all duration-200 text-xs font-bold uppercase tracking-wider group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" size={11} />
                <span>Back to Home</span>
              </Link>
              <div className="text-xs font-medium text-slate-400 flex items-center gap-1">
                <FaHome size={12} /> Home / <span className="text-orange-600 font-bold">Islamic Articles</span>
              </div>
            </div>
          )}

          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-[2px] w-8 bg-amber-500 rounded-full"></span>
              <span className="text-amber-600 text-xs font-black uppercase tracking-[0.3em]">
                Knowledge Hub
              </span>
              <span className="h-[2px] w-8 bg-amber-500 rounded-full"></span>
            </div>

            <HeadingTag className="text-4xl md:text-5xl font-black text-[#001f3f] tracking-tight leading-tight mb-4">
              {isFullPageDefault ? (
                <>Complete Library of <span className="text-orange-600 italic">Quranic Articles</span></>
              ) : (
                <>Islamic Insights & <span className="text-orange-600 italic">Tajweed Guides</span></>
              )}
            </HeadingTag>

            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              Practical guides on Tajweed, Noorani Qaida, Hifz and choosing the right Quran classes, written by our team.
            </p>
          </div>

          {isFullPageDefault && (
            <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100 mb-12 space-y-5">
              <div className="relative max-w-md mx-auto">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title or keyword..."
                  aria-label="Search articles"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs md:text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-800"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 flex-wrap pt-2 border-t border-slate-100">
                {categoriesList.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {listToShow.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-slate-200 max-w-lg mx-auto">
              <div className="text-4xl mb-3">📭</div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">No Articles Found</h3>
              <p className="text-slate-500 text-xs">Try clearing filters or search queries.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listToShow.map(blog => {
                const blogSlug = getSlug(blog);

                return (
                  <article
                    key={blog._id}
                    className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    <div className="relative h-52 bg-slate-100 overflow-hidden flex-shrink-0">
                      <BlogImage
                        key={blog._id}
                        src={blog.image}
                        alt={blog.imageAlt || blog.title}
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                        {blog.category || 'General'}
                      </span>
                    </div>

                    <div className="p-6 sm:p-7 flex flex-col flex-1">
                      <div className="flex items-center gap-2.5 text-[11px] text-slate-400 font-semibold mb-3">
                        <span>📅 {fmtDate(blog.createdAt)}</span>
                        <span>•</span>
                        <span>⏱ {getReadTime(blog.content)}</span>
                      </div>

                      <h3 className="text-lg font-black text-[#001f3f] group-hover:text-orange-600 transition-colors leading-snug mb-3">
                        {blog.title}
                      </h3>

                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 flex-1 font-normal">
                        {blog.metaDescription || getPreview(blog.content)}
                      </p>

                      <Link
                        to={`/blogs/${blogSlug}`}
                        state={{ from: isFullPageDefault ? 'catalog' : 'home' }}
                        className="mt-auto w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-wider hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        Read Full Article →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {!isFullPageDefault && blogs.length > 3 && (
            <div className="mt-14 text-center">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-900/10 hover:shadow-orange-500/20 hover:from-orange-500 hover:to-orange-600 transition-all duration-300 hover:-translate-y-0.5"
              >
                View All Articles ({blogs.length}) →
              </Link>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default BlogSection;