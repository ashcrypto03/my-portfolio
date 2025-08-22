import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Instagram, Facebook, Send, Music4, Globe2, Plus, X, ShieldCheck, LogOut } from "lucide-react";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=963986008935&text&context=Afc0KBO4bwwHvFi_D8ZupdB4AENHBwa8Mq73NKuK4sISOvgMaVCaz3PfLBrfifcXJVHlOrAlda216iEaOnHa_7gObtH88Yk0y5OPyN4ddEzctm6qxhSIS5wdWAx2VqeyrVl_ovApL6abvPPjio-LxzRhRA&source&app=facebook";
const TELEGRAM_URL = "https://t.me/frame_surge";

const initialVideos = [
  "https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9/view?usp=sharing",
  "https://drive.google.com/file/d/1bEXAMPLEid/view?usp=sharing",
  "https://drive.google.com/file/d/1cEXAMPLEid/view?usp=sharing",
  "https://drive.google.com/file/d/1dEXAMPLEid/view?usp=sharing",
  "https://drive.google.com/file/d/1eEXAMPLEid/view?usp=sharing",
  "https://drive.google.com/file/d/1fEXAMPLEid/view?usp=sharing",
  "https://drive.google.com/file/d/1gEXAMPLEid/view?usp=sharing",
  "https://drive.google.com/file/d/1hEXAMPLEid/view?usp=sharing",
  "https://drive.google.com/file/d/1iEXAMPLEid/view?usp=sharing",
  "https://drive.google.com/file/d/1jEXAMPLEid/view?usp=sharing",
];

function driveToEmbed(url) {
  if (!url) return "";
  try {
    const fileIdMatch = url.match(/\/file\/d\/([^/]+)/);
    if (fileIdMatch) return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    const idParamMatch = url.match(/[?&]id=([^&]+)/);
    if (idParamMatch) return `https://drive.google.com/file/d/${idParamMatch[1]}/preview`;
    const ucMatch = url.match(/uc\?id=([^&]+)/);
    if (ucMatch) return `https://drive.google.com/file/d/${ucMatch[1]}/preview`;
    return url;
  } catch (e) {
    return url;
  }
}

const strings = {
  ar: {
    tagline: "إعلانات بالذكاء الاصطناعي خلال 72 ساعة",
    sub: "نحوّل علامتك التجارية إلى قصة مستقبلية مؤثرة.",
    cta_brief: "احجز جلسة تعريف 15 دقيقة",
    whatWeDoTitle: "ماذا نفعل",
    whatWeDo1: "إنتاج إعلانات مدعومة بالذكاء الاصطناعي",
    whatWeDo2: "هويات بصرية وصور مبتكرة",
    whatWeDo3: "سرد قصصي إبداعي للأعمال",
    portfolioTitle: "أعمالنا (فيديو)",
    addVideo: "إضافة رابط فيديو من Google Drive",
    add: "إضافة",
    cancel: "إلغاء",
    language: "English",
    admin: "مسؤول",
    logout: "تسجيل الخروج",
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
    addVideo: "Add a Google Drive video link",
    add: "Add",
    cancel: "Cancel",
    language: "العربية",
    admin: "Admin",
    logout: "Log out",
  },
};

export default function FuturisticPortfolio() {
  const [lang, setLang] = useState("ar"); // default Arabic
  const t = strings[lang];
  const [videos, setVideos] = useState(initialVideos);
  const [showAdd, setShowAdd] = useState(false);
  const [newLink, setNewLink] = useState("");

  // ---- Admin gate ----
  // Set a secret key in Netlify (or Vite): VITE_ADMIN_KEY=yourSecret
  // Enable admin mode by visiting: https://yoursite/#admin=yourSecret
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    // Persisted session
    if (localStorage.getItem("fs_admin") === "1") {
      setAdmin(true);
    }
    // One-time activation via URL hash
    const hash = window.location.hash || "";
    const m = hash.match(/admin=([^&]+)/);
    if (m) {
      const supplied = decodeURIComponent(m[1]);
      const expected = import.meta.env.VITE_ADMIN_KEY || "";
      if (expected && supplied === expected) {
        localStorage.setItem("fs_admin", "1");
        setAdmin(true);
        // Clean the hash to avoid leaking the key
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
  }, []);

  const logoutAdmin = () => {
    localStorage.removeItem("fs_admin");
    setAdmin(false);
  };
  // --------------------

  const dir = lang === "ar" ? "rtl" : "ltr";
  const gradient = "from-fuchsia-500 via-pink-500 to-amber-400";

  const addVideo = () => {
    if (!newLink.trim()) return;
    setVideos((v) => [newLink.trim(), ...v].slice(0, 20));
    setNewLink("");
    setShowAdd(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white" dir={dir}>
      <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="h-9 w-9 rounded-full ring-2 ring-white/20" onError={(e)=>{e.currentTarget.style.display='none'}}/>
            <span className="text-lg font-semibold tracking-wide">Frame Surge</span>
          </div>
          <div className="flex items-center gap-3">
            {admin && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600/20 text-emerald-300 text-xs border border-emerald-400/30">
                <ShieldCheck className="h-4 w-4"/> {t.admin}
                <button onClick={logoutAdmin} className="ml-2 opacity-70 hover:opacity-100 underline decoration-dotted text-emerald-200 text-[11px] flex items-center gap-1"><LogOut className="h-3 w-3"/>{t.logout}</button>
              </span>
            )}
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hidden md:inline-flex text-sm opacity-90 hover:opacity-100">WhatsApp</a>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="hidden md:inline-flex text-sm opacity-90 hover:opacity-100">Telegram</a>
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

      {/* Hero + copy elided for brevity */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{t.portfolioTitle}</h2>
          {admin && (
            <button
              onClick={() => setShowAdd(true)}
              className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${"from-fuchsia-500 via-pink-500 to-amber-400"} text-black font-semibold`}
            >
              <Plus className="h-4 w-4" /> {t.addVideo}
              <span className="absolute -inset-px rounded-xl blur-[6px] bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 -z-10 opacity-60" />
            </button>
          )}
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

      <AnimatePresence>
        {admin && showAdd && (
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#161626] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{t.addVideo}</h3>
                <button onClick={() => setShowAdd(false)} className="p-2 rounded-full hover:bg-white/10"><X/></button>
              </div>
              <input
                type="url"
                placeholder="https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
              />
              <div className="mt-4 flex gap-2">
                <button onClick={addVideo} className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 text-black font-semibold`}>
                  <Plus className="h-4 w-4"/> {t.add}
                  <span className="absolute -inset-px rounded-xl blur-[6px] bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 -z-10 opacity-60" />
                </button>
                <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl border border-white/15 hover:border-white/30">{t.cancel}</button>
              </div>
              <p className="mt-3 text-xs text-white/50">Admin-only. Activation: add #admin=YOUR_KEY to the URL once.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
