
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Instagram, Facebook, Send, Globe2 } from "lucide-react";
import brandLogo from "./assets/brand-logo.jpg";
import whatsappIcon from "./assets/whatsapp.png";
import tiktokIcon from "./assets/tiktok.png";

// --- Contact links ---
const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=963986008935&text&context=Afc0KBO4bwwHvFi_D8ZupdB4AENHBwa8Mq73NKuK4sISOvgMaVCaz3PfLBrfifcXJVHlOrAlda216iEaOnHa_7gObtH88Yk0y5OPyN4ddEzctm6qxhSIS5wdWAx2VqeyrVl_ovApL6abvPPjio-LxzRhRA&source&app=facebook";
const TELEGRAM_URL = "https://t.me/frame_surge";

// === Your 10 Google Drive links (updated) ===
const initialVideos = [
  "https://drive.google.com/file/d/1Zl4bApnNsC3XqRD4fX3eiaUfxLuEX1Jx/view?usp=sharing",
  "https://drive.google.com/file/d/1dsZpOH1XvV1nX4qmimHZXIHR7a3nBk_E/view?usp=sharing",
  "https://drive.google.com/file/d/1JvukkuRWU1AQxA99dPSc-PDq7peBTNmN/view?usp=sharing",
  "https://drive.google.com/file/d/1prGDAL08mq8t6iS69IExnmCftXhZ0Xab/view?usp=sharing",
  "https://drive.google.com/file/d/1oLYUGEtc6OlwDOA0F9ZxQBgVXsgHQB2Z/view?usp=sharing",
  "https://drive.google.com/file/d/1Zl4bApnNsC3XqRD4fX3eiaUfxLuEX1Jx/view?usp=sharing",
  "https://drive.google.com/file/d/1dsZpOH1XvV1nX4qmimHZXIHR7a3nBk_E/view?usp=sharing",
  "https://drive.google.com/file/d/1JvukkuRWU1AQxA99dPSc-PDq7peBTNmN/view?usp=sharing",
  "https://drive.google.com/file/d/1prGDAL08mq8t6iS69IExnmCftXhZ0Xab/view?usp=sharing",
  "https://drive.google.com/file/d/1oLYUGEtc6OlwDOA0F9ZxQBgVXsgHQB2Z/view?usp=sharing",
];

function driveToEmbed(url) {
  if (!url) return "";
  try {
    const fileIdMatch = url.match(/\\/file\\/d\\/([^/]+)/);
    if (fileIdMatch) return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    const idParamMatch = url.match(/[?&]id=([^&]+)/);
    if (idParamMatch) return `https://drive.google.com/file/d/${idParamMatch[1]}/preview`;
    const ucMatch = url.match(/uc\\?id=([^&]+)/);
    if (ucMatch) return `https://drive.google.com/file/d/${ucMatch[1]}/preview`;
    return url;
  } catch (e) {
    return url;
  }
}

const strings = {
  ar: {
    tagline: "إعلانات بالذكاء الاصطناعي خلال 72 ساعة",
    sub: "نحوّل علامتك التجارية إلى قصة مؤثرة.",
    cta_brief: "احجز استشارة مجانية 15 دقيقة",
    whatWeDoTitle: "ماذا نفعل",
    whatWeDo1: "إنتاج إعلانات مدعومة بالذكاء الاصطناعي",
    whatWeDo2: "هويات بصرية وصور مبتكرة",
    whatWeDo3: "سرد قصصي إبداعي للأعمال",
    portfolioTitle: "أعمالنا (فيديو)",
    language: "English",
  },
  en: {
    tagline: "AI-powered ads that ship in 72h",
    sub: "We turn your brand into a futuristic story.",
    cta_brief: "Book a 15-min Brief",
    whatWeDoTitle: "What We Do",
    whatWeDo1: "AI-generated Ad Production",
    whatWeDo2: "Visual Branding & Imagery",
    whatWeDo3: "Creative Storytelling for Business",
    portfolioTitle: "Portfolio (Video)",
    language: "العربية",
  },
};

export default function FuturisticPortfolio() {
  const [lang, setLang] = useState("ar"); // default Arabic
  const t = strings[lang];
  const [videos] = useState(initialVideos);

  const dir = lang === "ar" ? "rtl" : "ltr";
  const gradient = "from-fuchsia-500 via-pink-500 to-amber-400";

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white" dir={dir}>
      {/* Top nav */}
      <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={brandLogo}
              alt="Frame Surge logo"
              className="h-9 w-9 rounded-xl ring-2 ring-white/20 object-cover"
            />
            <span className="text-lg font-semibold tracking-wide">Frame Surge</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex text-sm opacity-90 hover:opacity-100"
            >
              WhatsApp
            </a>
            <a
              href={"https://t.me/frame_surge"}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex text-sm opacity-90 hover:opacity-100"
            >
              Telegram
            </a>
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${gradient} text-black font-semibold shadow-[0_0_30px_rgba(255,0,128,.25)]`}
            >
              <Globe2 className="h-4 w-4" /> {t.language}
              <span className="absolute -inset-px rounded-xl blur-[6px] bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 -z-10 opacity-60" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-7xl px-4 py-20 md:py-28 relative"
        >
          <h1 className="text-3xl md:text-6xl font-extrabold leading-tight drop-shadow [text-shadow:0_4px_40px_rgba(255,0,128,.35)]">
            {t.tagline}
          </h1>
          <p className="mt-4 max-w-2xl text-white/80 text-lg md:text-xl">{t.sub}</p>
          <div className={`mt-8 flex ${dir==='rtl' ? 'flex-row-reverse' : ''} flex-wrap gap-3`}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className={`group relative inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r ${gradient} text-black font-bold`}
            >
              <MessageCircle className="h-5 w-5" /> {t.cta_brief}
              <span className="absolute -inset-px rounded-2xl blur-md bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 -z-10 opacity-70 group-hover:opacity-90 transition" />
            </a>
            <a
              href={"https://t.me/frame_surge"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/20 hover:border-white/40 transition"
            >
              <Send className="h-5 w-5" /> Telegram
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-70">
            {["AI Ads","Brand Visuals","Storytelling","Fast Delivery"].map((k, i)=> (
              <motion.div key={i} whileHover={{ scale: 1.03 }} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${gradient} mb-3`} />
                <p className="text-sm">{k}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
      </section>

      {/* What we do */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.whatWeDoTitle}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[t.whatWeDo1, t.whatWeDo2, t.whatWeDo3].map((txt, i) => (
            <motion.div key={i} whileHover={{ y: -4 }} className="relative p-6 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
              <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${gradient} opacity-30 blur-2xl`} />
              <div className={`flex items-center gap-3 ${dir==='rtl' ? 'flex-row-reverse text-right' : ''}`}>
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${gradient} shadow-[0_0_30px_rgba(255,0,128,.35)]`} />
                <p className="font-semibold leading-relaxed flex-1">{txt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio / Video Cards */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{t.portfolioTitle}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {videos.slice(0, 10).map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.03 }} className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={driveToEmbed(v)}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={`video-${i}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating Socials */}
      <aside className={`${dir==='rtl' ? 'left-4' : 'right-4'} fixed bottom-4 z-40 flex flex-col gap-2`}>
        <FloatingIcon href={WHATSAPP_URL} label="WhatsApp">
          <img src={whatsappIcon} alt="WhatsApp" className="h-5 w-5 object-contain" />
        </FloatingIcon>
        <FloatingIcon href={"https://www.facebook.com/profile.php?id=61574806036843"} label="Facebook">
          <Facebook className="h-5 w-5" />
        </FloatingIcon>
        <FloatingIcon href={"https://www.instagram.com/frame_surge/"} label="Instagram">
          <Instagram className="h-5 w-5" />
        </FloatingIcon>
        <FloatingIcon href={"https://www.tiktok.com/@frame_surge"} label="TikTok">
          <img src={tiktokIcon} alt="TikTok" className="h-5 w-5 object-contain" />
        </FloatingIcon>
      </aside>

      {/* Footer */}
      <footer className="mt-10 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 flex items-center justify-between">
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} Frame Surge. All rights reserved.</p>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="text-white/70 hover:text-white text-sm">{t.language}</button>
        </div>
      </footer>
    </div>
  );
}

function FloatingIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group relative grid place-items-center h-11 w-11 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition shadow-[0_0_24px_rgba(255,0,128,.25)]"
    >
      {children}
      <span className="pointer-events-none absolute -inset-px rounded-2xl blur-md bg-gradient-to-br from-fuchsia-500 via-pink-500 to-amber-400 opacity-0 group-hover:opacity-60 transition" />
    </a>
  );
}
