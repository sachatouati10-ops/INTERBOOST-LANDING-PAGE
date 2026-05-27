"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Sparkles,
  Target,
  Mail,
  CheckCircle,
  Loader2,
  Rocket,
  MapPin,
  Euro,
  Heart,
  X,
  Home as HomeIcon,
  Search,
  MessageCircle,
  User,
} from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

const COUNT_BASELINE = 519;

function useLiveCount() {
  const [target, setTarget] = useState<number>(COUNT_BASELINE + 4);
  useEffect(() => {
    let cancelled = false;
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/count", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const real = typeof data?.count === "number" ? data.count : 0;
        if (!cancelled) setTarget(COUNT_BASELINE + real);
      } catch { /* keep previous */ }
    };
    fetchCount();
    const id = setInterval(fetchCount, 60000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);
  return target;
}

function CountUp({ className = "" }: { className?: string }) {
  const target = useLiveCount();
  const [count, setCount] = useState(0);
  const prevTarget = useRef(0);
  useEffect(() => {
    const from = prevTarget.current;
    const to = target;
    prevTarget.current = to;
    const duration = from === 0 ? 1600 : 700;
    const startTime = Date.now();
    let raf = 0;
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(from + (to - from) * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return <span className={className || "font-black bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent"}>{count.toLocaleString("fr-FR")}</span>;
}

const jobCards = [
  { company: "Disney+", logo: "https://www.google.com/s2/favicons?domain=disneyplus.com&sz=128", logoBg: "#1a1d29", role: "Content Marketing", location: "Paris", experience: "Confirmé", remote: "Hybride", contract: "CDI", time: "Temps plein", salary: "55K à 65K€", tags: ["#Marketing", "#Streaming", "#SVOD", "#ContentStrategy"], description: "Rejoignez la magie Disney+ ! Participez à l'élaboration et à l'exécution des stratégies de lancement de nos nouvelles séries et films originaux sur le marché français.", match: 94 },
  { company: "Doctolib", logo: "https://www.google.com/s2/favicons?domain=doctolib.fr&sz=128", logoBg: "#0596de", role: "Développeur Full-Stack", location: "Paris", experience: "Senior", remote: "2j/semaine", contract: "CDI", time: "Temps plein", salary: "50K à 60K€", tags: ["#React", "#RubyOnRails", "#PostgreSQL"], description: "Améliorez l'expérience de prise de rendez-vous pour 80M de patients en Europe au sein de l'équipe Booking.", match: 91 },
  { company: "BlaBlaCar", logo: "https://www.google.com/s2/favicons?domain=blablacar.fr&sz=128", logoBg: "#00aff5", role: "Product Designer Senior", location: "Paris", experience: "Confirmé", remote: "Full flexible", contract: "CDI", time: "Temps plein", salary: "55K à 65K€", tags: ["#Figma", "#DesignSystem", "#UserResearch"], description: "Designez les futures expériences de covoiturage et bus pour une communauté de 100M de membres dans 22 pays.", match: 87 },
  { company: "Capgemini", logo: "https://www.google.com/s2/favicons?domain=capgemini.com&sz=128", logoBg: "#0070ad", role: "Consultant Data & IA", location: "Lyon", experience: "Junior", remote: "Hybride", contract: "Stage 6 mois", time: "Temps plein", salary: "1 400€/mois", tags: ["#Python", "#MachineLearning", "#Azure"], description: "Intégrez l'équipe Insights & Data pour accompagner des grands comptes dans leur transformation data-driven.", match: 78 },
  { company: "Datadog", logo: "https://www.google.com/s2/favicons?domain=datadoghq.com&sz=128", logoBg: "#632ca6", role: "Software Engineer Backend", location: "Paris", experience: "Senior", remote: "Hybride", contract: "CDI", time: "Temps plein", salary: "65K à 80K€", tags: ["#Go", "#Kubernetes", "#DistributedSystems"], description: "Construisez la plateforme d'observabilité utilisée par des milliers d'entreprises pour monitorer leur infrastructure cloud.", match: 92 },
];

function IPhoneApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);
  const [showPostStatus, setShowPostStatus] = useState<"liked" | "rejected" | null>(null);

  const triggerSwipe = useCallback(() => {
    const dir = currentIndex % 2 === 0 ? "right" : "left";
    setSwipeDir(dir);
    setShowPostStatus(dir === "right" ? "liked" : "rejected");
    setTimeout(() => { setCurrentIndex((prev) => (prev + 1) % jobCards.length); setSwipeDir(null); }, 900);
    setTimeout(() => setShowPostStatus(null), 700);
  }, [currentIndex]);

  useEffect(() => { const id = setInterval(triggerSwipe, 2500); return () => clearInterval(id); }, [triggerSwipe]);

  const visible = [0, 1, 2].map((o) => jobCards[(currentIndex + o) % jobCards.length]);

  return (
    <div className="flex flex-col h-full" style={{ background: "linear-gradient(180deg, #f8f7ff 0%, #f1f0fb 100%)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="flex items-center justify-between px-5 pt-[10px] pb-0.5 text-[10px] font-semibold text-slate-900">
        <span>9:41</span>
        <div className="flex items-center gap-[3px]">
          <svg width="14" height="10" viewBox="0 0 16 12"><rect x="0" y="5" width="3" height="7" rx="1" fill="#1e293b"/><rect x="4.5" y="3" width="3" height="9" rx="1" fill="#1e293b"/><rect x="9" y="1" width="3" height="11" rx="1" fill="#1e293b"/><rect x="13" y="0" width="3" height="12" rx="1" fill="#1e293b"/></svg>
          <div className="w-[18px] h-[9px] border-[1.5px] border-slate-900 rounded-[2px] relative ml-0.5">
            <div className="absolute inset-[1px] right-[2px] bg-slate-900 rounded-[1px]"/>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-0.5"><div className="w-[70px] h-[18px] bg-black rounded-full"/></div>
      <div className="px-4 pt-1 pb-1.5 flex items-center justify-between">
        <div>
          <p className="text-[14px] font-bold text-slate-900">Offres pour toi</p>
          <p className="text-[9px] text-violet-600 font-medium">5 nouvelles offres</p>
        </div>
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-[9px] font-bold">S</div>
      </div>
      <div className="flex-1 relative px-2.5">
        <div className="relative w-full h-full">
          {visible.slice().reverse().map((card, ri) => {
            const idx = 2 - ri;
            const isTop = idx === 0;
            const exiting = isTop && swipeDir !== null;
            return (
              <motion.div key={`${card.company}-${currentIndex + idx}`} className="absolute inset-0" initial={false}
                animate={exiting ? { x: swipeDir === "right" ? 200 : -200, rotateY: swipeDir === "right" ? -25 : 25, rotate: swipeDir === "right" ? 8 : -8, opacity: 0 } : { x: idx * 2, y: idx * 4, rotate: idx * -1, rotateY: 0, scale: 1 - idx * 0.025, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }} style={{ zIndex: 10 - idx, perspective: 1200 }}>
                <AnimatePresence>
                  {exiting && swipeDir === "right" && (
                    <motion.div className="absolute inset-0 z-20 rounded-[16px] flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.15))" }}>
                      <motion.div className="px-4 py-1.5 rounded-lg border-[2px] border-emerald-500 rotate-[-12deg]" initial={{ scale: 0 }} animate={{ scale: 1, rotate: -12 }} transition={{ type: "spring", stiffness: 500, damping: 15 }}>
                        <span className="text-emerald-500 font-black text-sm tracking-[0.15em]">POSTULER</span>
                      </motion.div>
                    </motion.div>
                  )}
                  {exiting && swipeDir === "left" && (
                    <motion.div className="absolute inset-0 z-20 rounded-[16px] flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.15))" }}>
                      <motion.div className="px-4 py-1.5 rounded-lg border-[2px] border-red-500 rotate-[12deg]" initial={{ scale: 0 }} animate={{ scale: 1, rotate: 12 }} transition={{ type: "spring", stiffness: 500, damping: 15 }}>
                        <span className="text-red-500 font-black text-sm tracking-[0.15em]">PASSER</span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="bg-white rounded-[16px] shadow-lg shadow-slate-200/80 border border-slate-100 p-2.5 flex flex-col gap-1.5 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden" style={{ background: card.logoBg }}>
                      <img src={card.logo} alt={card.company} className="w-5 h-5 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><text x="10" y="14" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${card.company[0]}</text></svg>`; }}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] text-slate-500">{card.company}</p>
                      <p className="font-bold text-slate-900 text-[11px] leading-tight truncate">{card.role}</p>
                    </div>
                    <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-violet-100">
                      <Sparkles className="w-2 h-2 text-violet-600"/><span className="text-[8px] font-bold text-violet-700">{card.match}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-slate-500"><MapPin className="w-2.5 h-2.5"/><span>{card.location}</span></div>
                  <div className="flex gap-1.5">
                    <div className="flex-1 px-1.5 py-1 rounded-md border border-slate-200 bg-slate-50"><p className="text-[7px] text-slate-400 uppercase font-medium">Expérience</p><p className="text-[9px] font-semibold text-slate-700">{card.experience}</p></div>
                    <div className="flex-1 px-1.5 py-1 rounded-md border border-slate-200 bg-slate-50"><p className="text-[7px] text-slate-400 uppercase font-medium">Remote</p><p className="text-[9px] font-semibold text-slate-700">{card.remote}</p></div>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[8px] font-semibold flex items-center gap-0.5"><Euro className="w-2 h-2"/>{card.salary}</span>
                    <span className="px-1.5 py-0.5 rounded-full border border-slate-200 text-slate-600 text-[8px] font-medium">{card.contract}</span>
                  </div>
                  <div>
                    <p className="text-[7px] uppercase font-semibold text-slate-400 tracking-wide mb-0.5">Compétences</p>
                    <div className="flex flex-wrap gap-0.5">{card.tags.slice(0, 3).map((t) => (<span key={t} className="px-1.5 py-0.5 rounded-full bg-violet-50 text-violet-600 text-[8px] font-medium">{t}</span>))}</div>
                  </div>
                  <div>
                    <p className="text-[7px] uppercase font-semibold text-slate-400 tracking-wide mb-0.5">À propos</p>
                    <p className="text-[8px] text-slate-600 leading-[1.3] line-clamp-2">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 py-2">
        <motion.button className={`w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-md transition-colors ${swipeDir === "left" ? "bg-red-500 shadow-red-200" : "bg-white shadow-slate-200"}`} animate={swipeDir === "left" ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
          <X className={`w-4 h-4 ${swipeDir === "left" ? "text-white" : "text-red-400"}`}/>
        </motion.button>
        <motion.button className="w-[44px] h-[44px] rounded-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-blue-500 shadow-md shadow-violet-200"><CheckCircle className="w-5 h-5 text-white"/></motion.button>
        <motion.button className={`w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-md transition-colors ${swipeDir === "right" ? "bg-emerald-500 shadow-emerald-200" : "bg-white shadow-slate-200"}`} animate={swipeDir === "right" ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }} style={{ animation: swipeDir !== "right" ? "goP 3s infinite" : undefined }}>
          <Heart className={`w-4 h-4 ${swipeDir === "right" ? "text-white" : "text-emerald-500"}`}/>
        </motion.button>
      </div>
      <AnimatePresence>
        {showPostStatus && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <motion.div initial={{ scale: 0, rotate: showPostStatus === "liked" ? -15 : 15 }} animate={{ scale: 1, rotate: showPostStatus === "liked" ? -12 : 12 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", stiffness: 600, damping: 18 }}
              className={`px-6 py-2 rounded-xl border-3 ${showPostStatus === "liked" ? "border-emerald-500 bg-emerald-500/10 backdrop-blur-sm" : "border-red-500 bg-red-500/10 backdrop-blur-sm"}`}>
              <span className={`text-xl font-black tracking-widest ${showPostStatus === "liked" ? "text-emerald-500" : "text-red-500"}`}>{showPostStatus === "liked" ? "POSTULÉ" : "REJETÉ"}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center justify-around px-3 py-1.5 border-t border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="flex flex-col items-center gap-0.5"><HomeIcon className="w-[14px] h-[14px] text-violet-600"/><span className="text-[8px] font-medium text-violet-600">Offres</span></div>
        <div className="flex flex-col items-center gap-0.5"><Search className="w-[14px] h-[14px] text-slate-400"/><span className="text-[8px] text-slate-400">Recherche</span></div>
        <div className="flex flex-col items-center gap-0.5 relative"><MessageCircle className="w-[14px] h-[14px] text-slate-400"/><div className="absolute -top-0.5 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"/><span className="text-[8px] text-slate-400">Messages</span></div>
        <div className="flex flex-col items-center gap-0.5"><User className="w-[14px] h-[14px] text-slate-400"/><span className="text-[8px] text-slate-400">Profil</span></div>
      </div>
      <div className="flex justify-center pb-1 pt-0.5 bg-white/80"><div className="w-[80px] h-[3px] bg-slate-900 rounded-full"/></div>
    </div>
  );
}

export default function MobilePreview() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [ghostText, setGhostText] = useState("");
  const [ghostPhase, setGhostPhase] = useState<"typing" | "clicking" | "done" | "idle">("idle");
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (userInteracted || status === "success") return;
    const demoEmail = "marie.dupont@gmail.com";
    let cancelled = false;
    const startDelay = setTimeout(() => {
      if (cancelled) return;
      setGhostPhase("typing");
      let i = 0;
      const typeInterval = setInterval(() => {
        if (cancelled) { clearInterval(typeInterval); return; }
        i++;
        setGhostText(demoEmail.slice(0, i));
        if (i >= demoEmail.length) {
          clearInterval(typeInterval);
          setTimeout(() => { if (!cancelled) setGhostPhase("clicking"); }, 500);
          setTimeout(() => { if (!cancelled) setGhostPhase("done"); }, 1200);
          setTimeout(() => { if (cancelled) return; setGhostText(""); setGhostPhase("idle"); }, 2000);
        }
      }, 70);
    }, 1500);
    return () => { cancelled = true; clearTimeout(startDelay); };
  }, [userInteracted, status]);

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!isValidEmail(email)) { setErrorMsg("Merci d'entrer une adresse email valide."); setStatus("error"); return; }
    setStatus("loading");
    setTimeout(() => { setStatus("success"); }, 1200);
  };

  return (
    <div className="h-[100svh] overflow-hidden bg-slate-900 flex items-center justify-center p-4 md:p-8">
      {/* Cadre iPhone */}
      <div className="relative" style={{ width: 390, height: 844, borderRadius: 50, background: "linear-gradient(145deg, #2a2a2a, #1a1a1a, #111)", padding: 10, boxShadow: "0 30px 80px -15px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1) inset, 0 0 0 2px rgba(0,0,0,0.5)" }}>
        <div className="absolute inset-0 rounded-[50px] pointer-events-none z-10" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)" }}/>
        <div className="absolute -right-[3px] top-[130px] w-[3px] h-[36px] rounded-l-sm" style={{ background: "linear-gradient(180deg, #444, #333)" }}/>
        <div className="absolute -right-[3px] top-[176px] w-[3px] h-[36px] rounded-l-sm" style={{ background: "linear-gradient(180deg, #444, #333)" }}/>
        <div className="absolute -left-[3px] top-[100px] w-[3px] h-[28px] rounded-r-sm" style={{ background: "linear-gradient(180deg, #444, #333)" }}/>
        <div className="absolute -left-[3px] top-[145px] w-[3px] h-[50px] rounded-r-sm" style={{ background: "linear-gradient(180deg, #444, #333)" }}/>

        {/* Écran — NO SCROLL, flex vertical — Option A (mesh + noise) */}
        <div className="w-full h-full rounded-[40px] overflow-hidden bg-mesh bg-noise flex flex-col relative">
          {/* Grille subtile par-dessus le mesh */}
          <div className="absolute inset-0 pointer-events-none rounded-[40px] z-[1]" style={{ backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px" }}/>

          {/* Status bar + island */}
          <div className="relative z-20 flex items-center justify-between px-8 pt-[14px] pb-0 text-[12px] font-semibold text-slate-900">
            <span>9:41</span>
            <div className="flex items-center gap-[3px]">
              <svg width="16" height="12" viewBox="0 0 16 12"><rect x="0" y="5" width="3" height="7" rx="1" fill="#1e293b"/><rect x="4.5" y="3" width="3" height="9" rx="1" fill="#1e293b"/><rect x="9" y="1" width="3" height="11" rx="1" fill="#1e293b"/><rect x="13" y="0" width="3" height="12" rx="1" fill="#1e293b"/></svg>
              <div className="w-[22px] h-[11px] border-[1.5px] border-slate-900 rounded-[3px] relative ml-0.5">
                <div className="absolute inset-[1.5px] right-[3px] bg-slate-900 rounded-[1px]"/>
              </div>
            </div>
          </div>
          <div className="relative z-20 flex justify-center mt-0.5 mb-2"><div className="w-[120px] h-[34px] bg-black rounded-full"/></div>

          {/* Contenu — flex-1 pour remplir, justify-between pour répartir */}
          <div className="relative z-10 flex-1 flex flex-col justify-between px-5 pb-3">

            {/* Haut : badge + titre + phrase */}
            <div className="flex flex-col items-center pt-1">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 text-[11px] font-semibold border border-violet-200/50 shadow-sm mb-4">
                <motion.div animate={{ rotate: [0, 15, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                  <Rocket className="w-3.5 h-3.5"/>
                </motion.div>
                Bientôt disponible
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[26px] font-extrabold tracking-tight text-slate-900 leading-[1.08] text-center mb-2.5">
                Swipez. Postulez.<br/>
                <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  {/* === MODIF 3 — OPTION B (commentée): ajouter className="underline-handwritten" sur ce span === */}
                  Décrochez.
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="text-[13px] text-slate-400 text-center leading-relaxed px-4">
                Un swipe et l&apos;IA s&apos;occupe de tout&nbsp;: CV adapté, lettre sur-mesure et candidature envoyée.
              </motion.p>
            </div>

            {/* Milieu : CTA */}
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }}
              className="relative my-1">
              {status === "success" ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2 bg-emerald-50 rounded-xl border border-emerald-200 p-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500"/>
                  <p className="text-xs font-semibold text-emerald-700">Vous êtes sur la liste !</p>
                </motion.div>
              ) : (
                <>
                  <div className="absolute -inset-2.5 rounded-[22px] pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(59,130,246,0.2), rgba(6,182,212,0.12))", filter: "blur(18px)", animation: "glowPulse 3s ease-in-out infinite, gradientShift 4s ease infinite", backgroundSize: "200% 200%" }}/>
                  <div className="relative rounded-[20px] p-[2px] overflow-hidden">
                    <div className="absolute inset-0 rounded-[20px]" style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4, #a855f7, #8b5cf6)", backgroundSize: "400% 400%", animation: "gradientShift 3s ease infinite" }}/>
                    <div className="relative bg-white rounded-[18px] px-4 py-3.5 overflow-hidden">
                      {/* Shimmer */}
                      <motion.div className="absolute inset-0 pointer-events-none z-10 rounded-[18px]"
                        style={{ background: "linear-gradient(105deg, transparent, rgba(139,92,246,0.08), rgba(59,130,246,0.12), rgba(6,182,212,0.08), transparent)", backgroundSize: "200% 100%" }}
                        animate={{ backgroundPositionX: ["100%", "-100%"], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 8, ease: "easeInOut" }}
                      />

                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[14px] font-extrabold text-slate-900">Rejoignez l&apos;aventure</p>
                        <div className="flex -space-x-1.5">
                          {["#8b5cf6", "#3b82f6", "#06b6d4", "#f59e0b"].map((color, i) => (
                            <motion.div key={i}
                              initial={{ scale: 0 }} animate={{ scale: 1 }}
                              transition={{ delay: 1 + i * 0.08, type: "spring", stiffness: 300 }}
                              className="rounded-full border-[1.5px] border-white flex items-center justify-center text-[7px] font-bold text-white shadow-sm" style={{ background: color, zIndex: 4 - i, width: 22, height: 22 }}>{["S", "A", "M", "L"][i]}</motion.div>
                          ))}
                        </div>
                      </div>
                      <form onSubmit={handleSubmit} className="flex gap-2">
                        <div className="relative flex-1">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400"/>
                          {!userInteracted && ghostText && (
                            <div className="absolute inset-0 flex items-center pl-9 pr-3 pointer-events-none">
                              <span className="text-[13px] text-slate-900">{ghostText}</span>
                              <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-[2px] h-4 bg-violet-500 ml-[1px]"/>
                            </div>
                          )}
                          <input type="email" required value={email}
                            onChange={(e) => { setEmail(e.target.value); setUserInteracted(true); if (status === "error") setStatus("idle"); }}
                            onFocus={() => setUserInteracted(true)}
                            placeholder={userInteracted || ghostText ? "" : "votre@email.com"}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl border-2 border-violet-200 bg-violet-50/30 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/15 focus:border-violet-400 text-[13px] transition-all"
                          />
                        </div>
                        <motion.button type="submit" disabled={status === "loading"}
                          whileTap={{ scale: 0.95 }}
                          animate={{ boxShadow: ["0 4px 15px -3px rgba(139,92,246,0.4)", "0 4px 20px -3px rgba(59,130,246,0.5)", "0 4px 15px -3px rgba(139,92,246,0.4)"] }}
                          transition={{ boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
                          className="px-3 py-2.5 rounded-xl font-bold text-white text-[12px] bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 disabled:opacity-70 whitespace-nowrap shadow-lg shadow-violet-500/25"
                        >
                          {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin"/> : "Je veux mon accès"}
                        </motion.button>
                      </form>

                      {/* Compteur permanent sous le CTA */}
                      <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-slate-700">
                        <motion.span
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
                        />
                        Rejoignez{" "}
                        <CountUp className="font-extrabold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent" />
                        {" "}candidats déjà inscrits
                      </div>

                      {status === "error" && errorMsg && <p className="text-[10px] text-red-500 mt-1 text-center">{errorMsg}</p>}
                    </div>
                  </div>
                </>
              )}
            </motion.div>

            {/* Bas : Mini iPhone mockup */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, type: "spring", stiffness: 120 }}
              className="flex justify-center">
              <div className="relative">
                {/* Glow derrière */}
                <div className="absolute -inset-6 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(59,130,246,0.08) 50%, transparent 70%)", animation: "glowPulse 4s ease-in-out infinite" }}/>

                <motion.div animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute -top-4 -right-5 w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/30 z-20">
                  <Sparkles className="w-4 h-4 text-white"/>
                </motion.div>
                <motion.div animate={{ y: [0, 6, 0], rotate: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-3 -left-4 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/25 z-20">
                  <FileText className="w-3.5 h-3.5 text-white"/>
                </motion.div>
                <motion.div animate={{ y: [0, -5, 0], x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
                  className="absolute top-1/3 -left-6 w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25 z-20">
                  <Target className="w-3 h-3 text-white"/>
                </motion.div>

                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="relative" style={{ width: 180, height: 370, borderRadius: 30, background: "linear-gradient(145deg, #2a2a2a, #1a1a1a, #111)", padding: 5, boxShadow: "0 25px 60px -10px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.1) inset, 0 0 40px -15px rgba(139,92,246,0.15)" }}>
                  <div className="absolute inset-0 rounded-[30px] pointer-events-none z-10" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)" }}/>
                  <div className="w-full h-full rounded-[25px] overflow-hidden">
                    <IPhoneApp />
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>

          {/* Home indicator */}
          <div className="relative z-20 flex justify-center pb-2 pt-1"><div className="w-[134px] h-[5px] bg-slate-900 rounded-full"/></div>
        </div>
      </div>
    </div>
  );
}
