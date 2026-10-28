import React from 'react';
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLinkedinIn,
  FaPhoneAlt
} from 'react-icons/fa';

const TRIAL_LINK =
  "https://wa.me/923485654503?text=Assalam-o-Alaikum%20Al%20Quran%20Islamic%20Institute%2C%20I%20want%20to%20book%20a%203-Day%20Free%20Trial.";

// onTrialClick (optional): App.jsx se free-trial popup kholne ke liye. Na mile to WhatsApp khulta hai.
const TopBar = ({ onTrialClick = null }) => {
  const trialClass =
    "inline-block bg-orange-600 hover:bg-orange-500 text-white font-extrabold px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] uppercase tracking-wider transition-all duration-150 shadow-md shadow-orange-900/30 active:scale-95";

  return (
    <header className="bg-[#001f3f] text-white border-b border-white/10 relative z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 md:py-2.5">

        {/* Mobile par bhi ek hi patli line: phone left, Free Trial right */}
        <div className="flex flex-row items-center justify-between gap-3 text-xs">

          {/* ─── Left: Contact Info ─── */}
          <div className="flex items-center gap-3 sm:gap-6 font-medium text-slate-200 min-w-0">
            <a
              href="tel:+923485654503"
              className="inline-flex items-center gap-1.5 hover:text-orange-400 transition-colors duration-150 group"
              title="Call or WhatsApp Us"
            >
              <FaPhoneAlt className="text-orange-500 text-[10px] group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-xs tracking-wider">+92 348 5654503</span>
            </a>

            {/* Email: sirf desktop par */}
            <a
              href="mailto:alquranislamicinstitute.48@gmail.com"
              className="hidden md:inline-flex items-center gap-2 hover:text-orange-400 transition-colors duration-150 group"
            >
              <FaEnvelope className="text-orange-500 text-xs group-hover:rotate-12 transition-transform" />
              <span className="text-slate-300 group-hover:text-orange-300 transition-colors">
                alquranislamicinstitute.48@gmail.com
              </span>
            </a>
          </div>

          {/* ─── Right: Social Links & CTA ─── */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">

            {/* Social icons: mobile par chhupe hue (footer aur /contact page par maujood hain) */}
            <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
              <a
                href="https://www.facebook.com/share/1DQ27HhzLn/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Official Facebook"
                className="bg-[#1877F2] w-8 h-8 rounded-full flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform duration-150"
              >
                <FaFacebookF className="text-white text-sm" />
              </a>

              <a
                href="https://www.instagram.com/_al__quran_6?igsh=MWhyMm9sbWpzYmJhbg=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Official Instagram"
                className="bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] w-8 h-8 rounded-full flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform duration-150"
              >
                <FaInstagram className="text-white text-sm" />
              </a>

              <a
                href="https://youtube.com/@quranic.927?si=7t5k0yOg8Pql56dB"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Official YouTube"
                className="bg-[#FF0000] w-8 h-8 rounded-full flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform duration-150"
              >
                <FaYoutube className="text-white text-sm" />
              </a>

              <a
                href="https://www.tiktok.com/@quranic.a?_r=1&_t=ZS-93oPmOHesan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Official TikTok"
                className="bg-black border border-white/20 w-8 h-8 rounded-full flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform duration-150"
              >
                <FaTiktok className="text-white text-xs" />
              </a>

              <a
                href="https://www.linkedin.com/in/sundas-ishfaq-105503298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Official LinkedIn"
                className="bg-[#0A66C2] w-8 h-8 rounded-full flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform duration-150"
              >
                <FaLinkedinIn className="text-white text-sm" />
              </a>
            </div>

            {/* Trial button */}
            {onTrialClick ? (
              <button type="button" onClick={() => onTrialClick()} className={trialClass}>
                Free Trial
              </button>
            ) : (
              <a href={TRIAL_LINK} target="_blank" rel="noreferrer" className={trialClass}>
                Free Trial
              </a>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default TopBar;