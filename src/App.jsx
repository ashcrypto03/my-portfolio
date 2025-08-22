import React, { useMemo, useState } from "react";
import { MessageCircle, Send, Globe2, X } from "lucide-react";

// ---------------- Helpers ----------------
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=963986008935&text&context=Afc0KBO4bwwHvFi_D8ZupdB4AENHBwa8Mq73NKuK4sISOvgMaVCaz3PfLBrfifcXJVHlOrAlda216iEaOnHa_7gObtH88Yk0y5OPyN4ddEzctm6qxhSIS5wdWAx2VqeyrVl_ovApL6abvPPjio-LxzRhRA&source&app=facebook";
const TELEGRAM_URL = "https://t.me/frame_surge";

function driveToEmbed(url) {
  if (!url) return "";
  try {
    const m1 = url.match(/\/file\/d\/([^/]+)/);
    if (m1) return `https://drive.google.com/file/d/${m1[1]}/preview`;
    const m2 = url.match(/[?&]id=([^&]+)/);
    if (m2) return `https://drive.google.com/file/d/${m2[1]}/preview`;
    const m3 = url.match(/uc\?id=([^&]+)/);
    if (m3) return `https://drive.google.com/file/d/${m3[1]}/preview`;
    return url;
  } catch { return url; }
}

// ---------------- Text strings ----------------
const STRINGS = {
  ar: {
    hero: "إعلانات بالذكاء الاصطناعي خلال 72 ساعة",
    sub: "نحوّل علامتك التجارية إلى قصة مستقبلية مؤثرة.",
    whatWeDo: "ماذا نفعل",
    do1: "إنتاج إعلانات مدعومة بالذكاء الاصطناعي",
    do2: "هويات بصرية وصور مبتكرة",
    do3: "سرد قصصي إبداعي للأعمال",
    portfolio: "أعمالنا (فيديو)",
    toggle: "English",
    watch: "مشاهدة",
  },
  en: {
    hero: "AI-powered ads that ship in 72h",
    sub: "We turn your brand into a futuristic story.",
    whatWeDo: "What We Do",
    do1: "AI-generated Ad Production",
    do2: "Visual Branding & Imagery",
    do3: "Creative Storytelling for Business",
    portfolio: "Our Work (Video)",
    toggle: "العربية",
    watch: "Watch",
  },
};

// ---------------- 5 video cards data ----------------
const CARDS = [
  {
    title_ar: "فيديو سرد قصة العلامة التجارية",
    desc_ar: "سرد عاطفي للعلامة التجارية مدعوم بإبداع الذكاء الاصطناعي.",
    url: "https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9/view?usp=sharing",
  },
  {
    title_ar: "حملة إطلاق منتج بالذكاء الاصطناعي",
    desc_ar: "إطلاق منتج يثري مبرّرات موثوقة بالذكاء الاصطناعي.",
    url: "https://drive.google.com/file/d/1bEXAMPLEid/view?usp=sharing",
  },
  {
    title_ar: "فيديو إعلان قصير (ريلز)",
    desc_ar: "تحويل الفكرة إلى ريلز ذكي يلفت الانتباه.",
    url: "https://drive.google.com/file/d/1cEXAMPLEid/view?usp=sharing",
  },
  {
    title_ar: "تعريف بالخدمة بأسلوب بصري",
    desc_ar: "شرح خدمة بأسلوب بصري متحرك وجاذب.",
    url: "https://drive.google.com/file/d/1dEXAMPLEid/view?usp=sharing",
  },
  {
    title_ar: "إعلان عروض موسمية",
    desc_ar: "عرض موسمي سريع الإقناع مُحسّن للتحويل.",
    url: "https://drive.google.com/file/d/1eEXAMPLEid/view?usp=sharing",
  },
];

// ---------------- Card component ----------------
function VideoCard({ title, desc, onOpen }) {
  return (
    <div className="card">
      <div className="thumb" onClick={onOpen}>
        <div className="play">&#9658;</div>
      </div>
      <div className="meta">
        <div className="title" title={title}>{title}</div>
        <div className="desc" title={desc}>{desc}</div>
      </div>
    </div>
  );
}

// ---------------- Modal ----------------
function Modal({ open, onClose, src }) {
  if (!open) return null;
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={(e)=>e.stopPropagation()}>
        <button className="close" onClick={onClose}><X size={18}/></button>
        <div className="ratio-9-16">
          <iframe src={driveToEmbed(src)} title="video" allow="autoplay; encrypted-media" allowFullScreen />
        </div>
      </div>
    </div>
  );
}

// ---------------- Full UI ----------------
export default function App() {
  const [lang, setLang] = useState("ar");
  const t = STRINGS[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  return (
    <div dir={dir} className="page">
      <style>{`
        :root { --bg:#0b0b12; --panel:rgba(255,255,255,.06); --border:rgba(255,255,255,.12); --muted:rgba(255,255,255,.65); --grad: linear-gradient(90deg,#ff00aa,#ff7a59,#ffc857); }
        *{box-sizing:border-box} body{margin:0}
        .page{min-height:100vh;background:var(--bg);color:#fff;font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif}
        header{position:sticky;top:0;background:rgba(0,0,0,.3);backdrop-filter:blur(6px);border-bottom:1px solid var(--border);z-index:50}
        .container{max-width:1200px;margin:0 auto;padding:12px 16px}
        .row{display:flex;justify-content:space-between;align-items:center}
        .switch{padding:8px 12px;border-radius:12px;background:var(--grad);color:#000;font-weight:800;border:none;cursor:pointer}
        h1{font-size:40px;margin:0;text-shadow:0 4px 40px rgba(255,0,128,.35)}
        p.lead{opacity:.85;font-size:18px;max-width:720px;margin:12px 0 0}
        section{padding:28px 16px}
        .grid{display:grid;grid-template-columns:1fr;gap:18px}
        @media(min-width:768px){.grid{grid-template-columns:1fr 1fr}}
        @media(min-width:1200px){.grid{grid-template-columns:1fr 1fr}}
        .card{background:var(--panel);border:1px solid var(--border);border-radius:18px;overflow:hidden;display:flex;flex-direction:column}
        .thumb{position:relative;background:radial-gradient(120% 120% at 30% 20%, #0c2b3a 0%, #2a1f33 60%, #1a1622 100%);height:0;padding-top:56.25%;cursor:pointer}
        .thumb .play{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);height:64px;width:64px;border-radius:999px;display:grid;place-items:center;color:#15a6ff;background:rgba(255,255,255,.08);border:1px solid var(--border);font-size:28px}
        .meta{padding:14px 16px}
        .title{font-weight:800;margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .desc{color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        /* Modal */
        .modal{position:fixed;inset:0;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;padding:16px;z-index:60}
        .modal-dialog{position:relative;background:#0d0f14;border:1px solid var(--border);border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,.4);max-width:480px;width:100%}
        .close{position:absolute;top:8px;right:8px;background:rgba(255,255,255,.06);border:1px solid var(--border);border-radius:8px;color:#fff;padding:6px;cursor:pointer}
        .ratio-9-16{width:100%;aspect-ratio:9/16}
        .ratio-9-16 iframe{width:100%;height:100%;border:0}
      `}</style>

      <header>
        <div className="container row">
          <strong>Frame Surge</strong>
          <button className="switch" onClick={()=>setLang(lang==='ar'?'en':'ar')}>🌐 {t.toggle}</button>
        </div>
      </header>

      <main>
        <section className="container">
          <h1>{t.hero}</h1>
          <p className="lead">{t.sub}</p>
        </section>

        {/* Cards Grid (5 cards) */}
        <section className="container">
          <h2 style={{fontSize:24,fontWeight:900,marginBottom:12}}>{t.portfolio}</h2>
          <div className="grid">
            {CARDS.map((c, i) => (
              <VideoCard
                key={i}
                title={c.title_ar}
                desc={c.desc_ar}
                onOpen={() => { setCurrent(c.url); setOpen(true); }}
              />
            ))}
          </div>
        </section>
      </main>

      <Modal open={open} src={current} onClose={()=>setOpen(false)} />

      <footer style={{borderTop:'1px solid var(--border)',marginTop:24}}>
        <div className="container" style={{display:'flex',justifyContent:'space-between',opacity:.75,fontSize:14}}>
          <span>© {new Date().getFullYear()} Frame Surge. All rights reserved.</span>
          <span>Built with AI ✨</span>
        </div>
      </footer>
    </div>
  );
}
