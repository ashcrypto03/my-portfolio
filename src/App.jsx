import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Instagram, Facebook, Send, Music4, Globe2, ChevronLeft, ChevronRight } from "lucide-react";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=963986008935&text&context=Afc0KBO4bwwHvFi_D8ZupdB4AENHBwa8Mq73NKuK4sISOvgMaVCaz3PfLBrfifcXJVHlOrAlda216iEaOnHa_7gObtH88Yk0y5OPyN4ddEzctm6qxhSIS5wdWAx2VqeyrVl_ovApL6abvPPjio-LxzRhRA&source&app=facebook";
const TELEGRAM_URL = "https://t.me/frame_surge";

// Replace with your Drive links
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
    portfolioTitle: "أعمالنا (ريلز)",
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
    portfolioTitle: "Portfolio (Reels)",
    language: "العربية",
  },
};

export default function FuturisticPortfolio() {
  const [lang, setLang] = useState("ar");
  const t = strings[lang];
  const [videos] = useState(initialVideos);
  const [index, setIndex] = useState(0);

  const dir = lang === "ar" ? "rtl" : "ltr";
  const gradient = "from-fuchsia-500 via-pink-500 to-amber-400";

  // Swipe/drag logic
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const pos = useRef({ startX: 0, deltaX: 0, dragging: false });

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function handlePointerDown(e) {
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    pos.current = { startX: x, deltaX: 0, dragging: true };
  }
  function handlePointerMove(e) {
    if (!pos.current.dragging) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    pos.current.deltaX = x - pos.current.startX;
    const width = containerRef.current?.clientWidth || 320;
    const base = -index * width;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${base + pos.current.deltaX}px)`;
    }
  }
  function handlePointerUp() {
    if (!pos.current.dragging) return;
    const width = containerRef.current?.clientWidth || 320;
    const threshold = width * 0.2;
    let next = index;
    if (pos.current.deltaX < -threshold) next = clamp(index + 1, 0, videos.length - 1);
    else if (pos.current.deltaX > threshold) next = clamp(index - 1, 0, videos.length - 1);
    setIndex(next);
    if (trackRef.current) {
      trackRef.current.style.transition = "transform 280ms ease";
      trackRef.current.style.transform = `translateX(${-next * width}px)`;
      setTimeout(() => {
        if (trackRef.current) trackRef.current.style.transition = "";
      }, 300);
    }
    pos.current.dragging = false;
    pos.current.deltaX = 0;
  }

  useEffect(() => {
    const width = containerRef.current?.clientWidth || 320;
    if (trackRef.current) {
      trackRef.current.style.transition = "transform 280ms ease";
      trackRef.current.style.transform = `translateX(${-index * width}px)`;
      setTimeout(() => {
        if (trackRef.current) trackRef.current.style.transition = "";
      }, 300);
    }
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") setIndex((i) => clamp(i - 1, 0, videos.length - 1));
      if (e.key === "ArrowRight") setIndex((i) => clamp(i + 1, 0, videos.length - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [videos.length]);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      const width = containerRef.current?.clientWidth || 320;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-index * width}px)`;
      }
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [index]);

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white" dir={dir}>
      {/* Top nav */}
      <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="h-9 w-9 rounded-full ring-2 ring-white/20" onError={(e)=>{e.currentTarget.style.display='none'}}/>
            <span className="text-lg font-semibold tracking-wide">Frame Surge</span>
          </div>
          <div className="flex items-center gap-3">
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

      {/* ... Hero + WhatWeDo are same as previous patch omitted for brevity ... */}

      {/* Reels Carousel (compact on desktop) */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{t.portfolioTitle}</h2>
        </div>

        <div
          ref={containerRef}
          className="relative mx-auto w-full 
                     max-w-[78vw] xs:max-w-[86vw] sm:max-w-[420px] md:max-w-[440px] lg:max-w-[460px] xl:max-w-[480px]
                     select-none touch-pan-y"
          onMouseLeave={handlePointerUp}
          onMouseUp={handlePointerUp}
          onMouseMove={handlePointerMove}
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          <div ref={trackRef} className="flex items-center">
            {videos.map((v, i) => (
              <div key={i} className="shrink-0 w-full px-1 sm:px-2">
                <div className="group relative w-full rounded-[26px] overflow-hidden border border-white/10 bg-white/5">
                  {/* glow ring */}
                  <span className="pointer-events-none absolute -inset-px rounded-[26px] bg-gradient-to-br from-fuchsia-500/0 via-pink-500/10 to-amber-400/0 blur-2xl opacity-0 group-hover:opacity-60 transition" />
                  <div style={{ aspectRatio: '9 / 16' }} className="w-full">
                    <iframe
                      className="h-full w-full"
                      src={driveToEmbed(v)}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title={`reel-${i}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            aria-label="Prev"
            className="absolute -left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur"
            onClick={() => setIndex((i) => clamp(i - 1, 0, videos.length - 1))}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            className="absolute -right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur"
            onClick={() => setIndex((i) => clamp(i + 1, 0, videos.length - 1))}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="mt-3 flex justify-center gap-2">
            {videos.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-pink-500" : "w-2 bg-white/30"}`}
                onClick={() => setIndex(i)}
                role="button"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="mt-10 border-top border-white/10" />
    </div>
  );
}
