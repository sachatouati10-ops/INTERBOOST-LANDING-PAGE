"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MousePointerClick,
  FileText,
  Sparkles,
  Target,
  Mail,
  CheckCircle,
  Loader2,
  Rocket,
  MapPin,
  Briefcase,
  Euro,
  Heart,
  X,
  Home as HomeIcon,
  Search,
  MessageCircle,
  User,
} from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

function CountUp() {
  const [count, setCount] = useState(0);
  const target = 523;

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    const timeout = setTimeout(() => requestAnimationFrame(step), 800);
    return () => clearTimeout(timeout);
  }, []);

  return <span className="text-2xl font-black bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">{count}</span>;
}

const jobCards = [
  {
    company: "Disney+",
    logo: "https://www.google.com/s2/favicons?domain=disneyplus.com&sz=128",
    logoBg: "#1a1d29",
    role: "Content Marketing",
    location: "Paris",
    experience: "Confirmé",
    remote: "Hybride",
    contract: "CDI",
    time: "Temps plein",
    salary: "55K à 65K€",
    tags: ["#Marketing", "#Streaming", "#SVOD", "#ContentStrategy"],
    description: "Rejoignez la magie Disney+ ! Participez à l'élaboration et à l'exécution des stratégies de lancement de nos nouvelles séries et films originaux sur le marché français.",
    match: 94,
  },
  {
    company: "Doctolib",
    logo: "https://www.google.com/s2/favicons?domain=doctolib.fr&sz=128",
    logoBg: "#0596de",
    role: "Développeur Full-Stack",
    location: "Paris",
    experience: "Senior",
    remote: "2j/semaine",
    contract: "CDI",
    time: "Temps plein",
    salary: "50K à 60K€",
    tags: ["#React", "#RubyOnRails", "#PostgreSQL"],
    description: "Améliorez l'expérience de prise de rendez-vous pour 80M de patients en Europe au sein de l'équipe Booking.",
    match: 91,
  },
  {
    company: "BlaBlaCar",
    logo: "https://www.google.com/s2/favicons?domain=blablacar.fr&sz=128",
    logoBg: "#00aff5",
    role: "Product Designer Senior",
    location: "Paris",
    experience: "Confirmé",
    remote: "Full flexible",
    contract: "CDI",
    time: "Temps plein",
    salary: "55K à 65K€",
    tags: ["#Figma", "#DesignSystem", "#UserResearch"],
    description: "Designez les futures expériences de covoiturage et bus pour une communauté de 100M de membres dans 22 pays.",
    match: 87,
  },
  {
    company: "Capgemini",
    logo: "https://www.google.com/s2/favicons?domain=capgemini.com&sz=128",
    logoBg: "#0070ad",
    role: "Consultant Data & IA",
    location: "Lyon",
    experience: "Junior",
    remote: "Hybride",
    contract: "Stage 6 mois",
    time: "Temps plein",
    salary: "1 400€/mois",
    tags: ["#Python", "#MachineLearning", "#Azure"],
    description: "Intégrez l'équipe Insights & Data pour accompagner des grands comptes dans leur transformation data-driven.",
    match: 78,
  },
  {
    company: "Datadog",
    logo: "https://www.google.com/s2/favicons?domain=datadoghq.com&sz=128",
    logoBg: "#632ca6",
    role: "Software Engineer Backend",
    location: "Paris",
    experience: "Senior",
    remote: "Hybride",
    contract: "CDI",
    time: "Temps plein",
    salary: "65K à 80K€",
    tags: ["#Go", "#Kubernetes", "#DistributedSystems"],
    description: "Construisez la plateforme d'observabilité utilisée par des milliers d'entreprises pour monitorer leur infrastructure cloud.",
    match: 92,
  },
];

// --- App dans l'iPhone ---
function IPhoneApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);

  const [showPostStatus, setShowPostStatus] = useState<"liked" | "rejected" | null>(null);

  const triggerSwipe = useCallback(() => {
    const dir = currentIndex % 2 === 0 ? "right" : "left";
    setSwipeDir(dir);
    setShowPostStatus(dir === "right" ? "liked" : "rejected");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % jobCards.length);
      setSwipeDir(null);
    }, 600);
    setTimeout(() => setShowPostStatus(null), 500);
  }, [currentIndex]);

  useEffect(() => {
    const id = setInterval(triggerSwipe, 1500);
    return () => clearInterval(id);
  }, [triggerSwipe]);

  const visible = [0, 1, 2].map((o) => jobCards[(currentIndex + o) % jobCards.length]);

  return (
    <div className="flex flex-col h-full" style={{ background: "linear-gradient(180deg, #f8f7ff 0%, #f1f0fb 100%)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-[14px] pb-1 text-[12px] font-semibold text-slate-900">
        <span>9:41</span>
        <div className="flex items-center gap-[3px]">
          <svg width="16" height="12" viewBox="0 0 16 12"><rect x="0" y="5" width="3" height="7" rx="1" fill="#1e293b"/><rect x="4.5" y="3" width="3" height="9" rx="1" fill="#1e293b"/><rect x="9" y="1" width="3" height="11" rx="1" fill="#1e293b"/><rect x="13" y="0" width="3" height="12" rx="1" fill="#1e293b"/></svg>
          <svg width="15" height="12" viewBox="0 0 15 12"><path d="M7.5 3C9.5 3 11.3 3.8 12.6 5.1L14 3.7C12.3 2 10 1 7.5 1S2.7 2 1 3.7L2.4 5.1C3.7 3.8 5.5 3 7.5 3Z" fill="#1e293b"/><path d="M7.5 7C8.6 7 9.6 7.4 10.4 8.1L11.8 6.7C10.6 5.6 9.1 5 7.5 5S4.4 5.6 3.2 6.7L4.6 8.1C5.4 7.4 6.4 7 7.5 7Z" fill="#1e293b"/><circle cx="7.5" cy="11" r="1.5" fill="#1e293b"/></svg>
          <div className="w-[22px] h-[11px] border-[1.5px] border-slate-900 rounded-[3px] relative ml-0.5">
            <div className="absolute inset-[1.5px] right-[3px] bg-slate-900 rounded-[1px]"/>
            <div className="absolute -right-[3px] top-[2.5px] w-[1.5px] h-[4px] bg-slate-900 rounded-r-sm"/>
          </div>
        </div>
      </div>

      {/* Dynamic island */}
      <div className="flex justify-center -mt-0.5 mb-1">
        <div className="w-[85px] h-[22px] bg-black rounded-full"/>
      </div>

      {/* App header */}
      <div className="px-5 pt-2 pb-3 flex items-center justify-between">
        <div>
          <p className="text-[18px] font-bold text-slate-900">Offres pour toi</p>
          <p className="text-[11px] text-violet-600 font-medium">5 nouvelles offres</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-[11px] font-bold">S</div>
      </div>

      {/* Zone cartes */}
      <div className="flex-1 relative px-3">
        <div className="relative w-full h-full">
          {visible.slice().reverse().map((card, ri) => {
            const idx = 2 - ri;
            const isTop = idx === 0;
            const exiting = isTop && swipeDir !== null;

            return (
              <motion.div
                key={`${card.company}-${currentIndex + idx}`}
                className="absolute inset-0"
                initial={false}
                animate={
                  exiting
                    ? { x: swipeDir === "right" ? 250 : -250, rotateY: swipeDir === "right" ? -25 : 25, rotate: swipeDir === "right" ? 8 : -8, opacity: 0 }
                    : { x: idx * 3, y: idx * 6, rotate: idx * -1, rotateY: 0, scale: 1 - idx * 0.025, opacity: 1 }
                }
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{ zIndex: 10 - idx, perspective: 1200 }}
              >
                {/* Overlay POSTULER/PASSER */}
                <AnimatePresence>
                  {exiting && swipeDir === "right" && (
                    <motion.div className="absolute inset-0 z-20 rounded-[20px] flex items-center justify-center"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.15))" }}>
                      <motion.div className="px-6 py-2.5 rounded-xl border-[3px] border-emerald-500 rotate-[-12deg]"
                        initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: -12 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        style={{ boxShadow: "0 0 20px rgba(16,185,129,0.3), 0 0 40px rgba(16,185,129,0.1)" }}>
                        <span className="text-emerald-500 font-black text-lg tracking-[0.2em]">POSTULER</span>
                      </motion.div>
                    </motion.div>
                  )}
                  {exiting && swipeDir === "left" && (
                    <motion.div className="absolute inset-0 z-20 rounded-[20px] flex items-center justify-center"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.15))" }}>
                      <motion.div className="px-6 py-2.5 rounded-xl border-[3px] border-red-500 rotate-[12deg]"
                        initial={{ scale: 0, rotate: 20 }} animate={{ scale: 1, rotate: 12 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        style={{ boxShadow: "0 0 20px rgba(239,68,68,0.3), 0 0 40px rgba(239,68,68,0.1)" }}>
                        <span className="text-red-500 font-black text-lg tracking-[0.2em]">PASSER</span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Carte */}
                <div className="bg-white rounded-[20px] shadow-lg shadow-slate-200/80 border border-slate-100 p-3.5 flex flex-col gap-2 overflow-hidden">
                  {/* Header: Logo + Company + Match */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden" style={{ background: card.logoBg }}>
                      <img src={card.logo} alt={card.company}
                        className="w-6 h-6 object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><text x="12" y="17" text-anchor="middle" fill="white" font-size="14" font-weight="bold">${card.company[0]}</text></svg>`; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-slate-500">{card.company}</p>
                      <p className="font-bold text-slate-900 text-[13px] leading-tight truncate">{card.role}</p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-100">
                      <Sparkles className="w-2.5 h-2.5 text-violet-600"/>
                      <span className="text-[9px] font-bold text-violet-700">{card.match}%</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <MapPin className="w-3 h-3"/>
                    <span>{card.location}</span>
                  </div>

                  {/* Info boxes: Experience + Remote */}
                  <div className="flex gap-2">
                    <div className="flex-1 px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50">
                      <p className="text-[8px] text-slate-400 uppercase font-medium">Expérience</p>
                      <p className="text-[10px] font-semibold text-slate-700">{card.experience}</p>
                    </div>
                    <div className="flex-1 px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50">
                      <p className="text-[8px] text-slate-400 uppercase font-medium">Remote</p>
                      <p className="text-[10px] font-semibold text-slate-700">{card.remote}</p>
                    </div>
                  </div>

                  {/* Salary + Contract badges */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[9px] font-semibold flex items-center gap-0.5">
                      <Euro className="w-2.5 h-2.5"/>{card.salary}
                    </span>
                    <span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-600 text-[9px] font-medium">{card.contract}</span>
                    <span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-600 text-[9px] font-medium">{card.time}</span>
                  </div>

                  {/* Compétences */}
                  <div>
                    <p className="text-[8px] uppercase font-semibold text-slate-400 tracking-wide mb-1">Compétences</p>
                    <div className="flex flex-wrap gap-1">
                      {card.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 text-[9px] font-medium">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-[8px] uppercase font-semibold text-slate-400 tracking-wide mb-0.5">À propos du poste</p>
                    <p className="text-[10px] text-slate-600 leading-[1.35] line-clamp-3">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Boutons action */}
      <div className="flex items-center justify-center gap-5 py-3">
        <motion.button
          className={`w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-md transition-colors ${
            swipeDir === "left" ? "bg-red-500 shadow-red-200" : "bg-white shadow-slate-200"
          }`}
          animate={swipeDir === "left" ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <X className={`w-5 h-5 ${swipeDir === "left" ? "text-white" : "text-red-400"}`}/>
        </motion.button>
        <motion.button
          className="w-[56px] h-[56px] rounded-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-blue-500 shadow-md shadow-violet-200"
        >
          <CheckCircle className="w-6 h-6 text-white"/>
        </motion.button>
        <motion.button
          className={`w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-md transition-colors ${
            swipeDir === "right" ? "bg-emerald-500 shadow-emerald-200" : "bg-white shadow-slate-200"
          }`}
          animate={swipeDir === "right" ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.3 }}
          style={{ boxShadow: swipeDir !== "right" ? "0 0 20px rgba(16,185,129,0.12), 0 0 40px rgba(16,185,129,0.05)" : undefined, animation: swipeDir !== "right" ? "goP 3s infinite" : undefined }}
        >
          <Heart className={`w-5 h-5 ${swipeDir === "right" ? "text-white" : "text-emerald-500"}`}/>
        </motion.button>
      </div>

      {/* Status overlay */}
      <AnimatePresence>
        {showPostStatus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0, rotate: showPostStatus === "liked" ? -15 : 15 }}
              animate={{ scale: 1, rotate: showPostStatus === "liked" ? -12 : 12 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 600, damping: 18 }}
              className={`px-8 py-3 rounded-2xl border-4 ${
                showPostStatus === "liked"
                  ? "border-emerald-500 bg-emerald-500/10 backdrop-blur-sm"
                  : "border-red-500 bg-red-500/10 backdrop-blur-sm"
              }`}
              style={{ boxShadow: showPostStatus === "liked"
                ? "0 0 30px rgba(16,185,129,0.3)"
                : "0 0 30px rgba(239,68,68,0.3)"
              }}
            >
              <span className={`text-2xl font-black tracking-widest ${
                showPostStatus === "liked" ? "text-emerald-500" : "text-red-500"
              }`}>
                {showPostStatus === "liked" ? "POSTULÉ" : "REJETÉ"}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab bar */}
      <div className="flex items-center justify-around px-4 py-2 border-t border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="flex flex-col items-center gap-0.5">
          <HomeIcon className="w-[18px] h-[18px] text-violet-600"/>
          <span className="text-[9px] font-medium text-violet-600">Offres</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <Search className="w-[18px] h-[18px] text-slate-400"/>
          <span className="text-[9px] text-slate-400">Recherche</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 relative">
          <MessageCircle className="w-[18px] h-[18px] text-slate-400"/>
          <div className="absolute -top-0.5 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"/>
          <span className="text-[9px] text-slate-400">Messages</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <User className="w-[18px] h-[18px] text-slate-400"/>
          <span className="text-[9px] text-slate-400">Profil</span>
        </div>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center pb-1.5 pt-1 bg-white/80">
        <div className="w-[100px] h-[4px] bg-slate-900 rounded-full"/>
      </div>
    </div>
  );
}

// --- Page ---
export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [ghostText, setGhostText] = useState("");
  const [ghostPhase, setGhostPhase] = useState<"typing" | "clicking" | "done" | "idle">("idle");
  const [userInteracted, setUserInteracted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [leftOffset, setLeftOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  // Load saved position
  useEffect(() => {
    const saved = localStorage.getItem("leftBlockOffset");
    if (saved) setLeftOffset(JSON.parse(saved));
  }, []);

  // Ghost typing animation — once
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
          setTimeout(() => { if (!cancelled) setGhostPhase("clicking"); }, 300);
          setTimeout(() => { if (!cancelled) setGhostPhase("done"); }, 600);
          // Efface puis remet le placeholder
          setTimeout(() => {
            if (cancelled) return;
            setGhostText("");
            setGhostPhase("idle");
          }, 900);
        }
      }, 70);
    }, 1500);
    return () => { cancelled = true; clearTimeout(startDelay); };
  }, [userInteracted, status]);

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwajbNbnkiuykNz4OU82Q99u0iZfyY70FRfMTDYibp_amxpuhYGT5hKVPGkak9RoRuv/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!isValidEmail(email)) { setErrorMsg("Merci d'entrer une adresse email valide."); setStatus("error"); return; }
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setErrorMsg("Une erreur est survenue. Réessayez.");
      setStatus("error");
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 overflow-hidden">
      {/* Fond blanc avec grille animée subtile */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.08) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}/>
      <motion.div
        animate={{ y: [0, -40] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          height: "200%",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-6 md:py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10 lg:gap-20 items-center min-h-screen">
        {/* GAUCHE */}
        <div
          style={{ transform: `translate(${leftOffset.x}px, ${leftOffset.y}px)`, transition: isDragging ? "none" : "transform 0.2s" }}
          className={editMode ? "ring-2 ring-dashed ring-violet-500 rounded-2xl relative cursor-move select-none" : ""}
          onMouseDown={(e) => {
            if (!editMode) return;
            e.preventDefault();
            setIsDragging(true);
            dragStart.current = { x: e.clientX, y: e.clientY, ox: leftOffset.x, oy: leftOffset.y };
            const onMove = (ev: MouseEvent) => {
              setLeftOffset({
                x: dragStart.current.ox + (ev.clientX - dragStart.current.x),
                y: dragStart.current.oy + (ev.clientY - dragStart.current.y),
              });
            };
            const onUp = () => {
              setIsDragging(false);
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
        >
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

          {/* --- MOBILE ONLY --- */}
          <div className="md:hidden flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[38px] font-extrabold tracking-tight text-slate-900 leading-[1.08] text-center mb-3"
            >
              Swipez. Postulez.<br/>
              <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">Décrochez.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-[15px] text-slate-900 text-center leading-relaxed px-4 mt-3 mb-2"
            >
              Un swipe et l&apos;IA s&apos;occupe de tout&nbsp;: CV adapté, lettre sur-mesure et candidature envoyée.
            </motion.p>
          </div>

          {/* --- DESKTOP ONLY: badge + titre --- */}
          <div className="hidden md:block">
            <div className="flex justify-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 text-sm font-semibold mb-8 border border-violet-200/50 shadow-sm"
              >
                <motion.div animate={{ rotate: [0, 15, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                  <Rocket className="w-4 h-4"/>
                </motion.div>
                Bientôt disponible
              </motion.div>
            </div>

            <h1 className="text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-5">
              Swipez. Postulez.{" "}
              <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">Décrochez.</span>
            </h1>
          </div>

          {/* 4 cartes desktop uniquement */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 mt-8 max-w-lg">
            {[
              { icon: MousePointerClick, title: "Swipe = candidature", desc: "Un geste suffit pour postuler à une offre." },
              { icon: Rocket, title: "Candidature automatisée", desc: "Tout est envoyé automatiquement pour vous." },
              { icon: FileText, title: "CV adapté par l'IA", desc: "Votre CV ajusté aux mots-clés de chaque offre." },
              { icon: Sparkles, title: "Lettre sur-mesure", desc: "Une LM personnalisée pour chaque entreprise." },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex gap-3 group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/15 to-blue-500/15 border border-violet-300/60 flex items-center justify-center group-hover:from-violet-500/25 group-hover:to-blue-500/25 transition-all shadow-sm">
                  <item.icon className="w-5 h-5 text-violet-700"/>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-0.5">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6, type: "spring", stiffness: 180 }}
            className="relative"
          >
            {status === "success" ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-3 bg-emerald-50 rounded-2xl border border-emerald-200 p-6"
              >
                <CheckCircle className="w-6 h-6 text-emerald-500"/>
                <p className="text-sm font-semibold text-emerald-700">Vous êtes sur la liste ! On vous contacte au lancement.</p>
              </motion.div>
            ) : (
              <>
                {/* ===== MOBILE CTA ===== */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.55, type: "spring", stiffness: 180 }}
                  className="md:hidden mt-5"
                >

                  {/* Input email full width */}
                  <form onSubmit={handleSubmit} className="relative flex flex-col gap-3">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-violet-400"/>
                      {!userInteracted && ghostText && (
                        <div className="absolute inset-0 flex items-center pl-11 pr-3 pointer-events-none">
                          <span className="text-[14px] text-slate-900">{ghostText}</span>
                          <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-[2px] h-4 bg-violet-500 ml-[1px]"/>
                          <span className="ml-auto text-[9px] text-slate-900 font-medium"><CountUp /> inscrits</span>
                        </div>
                      )}
                      <input type="email" required value={email}
                        onChange={(e) => { setEmail(e.target.value); setUserInteracted(true); if (status === "error") setStatus("idle"); }}
                        onFocus={() => setUserInteracted(true)}
                        placeholder={userInteracted || ghostText ? "" : "votreadresse@email.com"}
                        aria-label="Adresse email"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-violet-200/60 bg-white/80 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 text-[14px] transition-all shadow-sm"
                      />
                    </div>
                    <motion.button type="submit" disabled={status === "loading"}
                      whileTap={{ scale: 0.97 }}
                      animate={ghostPhase === "clicking"
                        ? { scale: [1, 0.94, 1.03, 1], boxShadow: "0 6px 30px -4px rgba(59,130,246,0.6)" }
                        : { boxShadow: ["0 6px 20px -4px rgba(139,92,246,0.4)", "0 6px 28px -4px rgba(59,130,246,0.5)", "0 6px 20px -4px rgba(139,92,246,0.4)"] }
                      }
                      transition={ghostPhase === "clicking"
                        ? { duration: 0.4 }
                        : { boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
                      }
                      className="w-full py-3 rounded-2xl font-bold text-white text-[15px] bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 disabled:opacity-70 shadow-xl shadow-violet-500/25"
                    >
                      {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin mx-auto"/> : "Rejoindre l'aventure"}
                    </motion.button>
                  </form>
                  {status === "error" && errorMsg && <p className="text-xs text-red-500 mt-2 text-center">{errorMsg}</p>}

                  <p className="text-[10px] text-slate-400 mt-3 text-center">Accès prioritaire · Gratuit · Sans spam</p>
                </motion.div>

                {/* ===== DESKTOP CTA ===== */}
                <div className="hidden md:block">
                  {/* Glow derrière */}
                  <div className="absolute -inset-3 rounded-[28px] pointer-events-none" style={{
                    background: "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(59,130,246,0.2), rgba(6,182,212,0.15))",
                    backgroundSize: "200% 200%",
                    animation: "glowPulse 3s ease-in-out infinite, gradientShift 4s ease infinite",
                    filter: "blur(20px)",
                  }}/>

                  {/* Bordure gradient animée */}
                  <div className="relative rounded-[24px] p-[2.5px] overflow-hidden">
                    <div className="absolute inset-0 rounded-[24px]" style={{
                      background: "linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4, #a855f7, #8b5cf6)",
                      backgroundSize: "400% 400%",
                      animation: "gradientShift 3s ease infinite",
                    }}/>

                    <div className="relative bg-white rounded-[22px] px-6 py-5 overflow-hidden">
                      {/* Shimmer dégradé */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none z-10 rounded-[22px]"
                        style={{
                          background: "linear-gradient(105deg, transparent, rgba(139,92,246,0.08), rgba(59,130,246,0.12), rgba(6,182,212,0.08), transparent)",
                          backgroundSize: "200% 100%",
                        }}
                        animate={{ backgroundPositionX: ["100%", "-100%"], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 8, ease: "easeInOut" }}
                      />

                      <div className="relative mb-4">
                        <p className="text-xl font-extrabold text-slate-900 mb-3 lg:text-left">Rejoignez l&apos;aventure</p>
                        <div className="flex items-center gap-3 lg:justify-start">
                          <div className="flex -space-x-2">
                            {["#8b5cf6", "#3b82f6", "#06b6d4", "#f59e0b"].map((color, i) => (
                              <motion.div key={i} initial={{ scale: 0, x: -10 }} animate={{ scale: 1, x: 0 }}
                                transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 300 }}
                                className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white"
                                style={{ background: color, zIndex: 4 - i }}>{["S", "A", "M", "L"][i]}</motion.div>
                            ))}
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4, type: "spring", stiffness: 300 }}
                              className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-500">+</motion.div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                              className="w-2 h-2 rounded-full bg-emerald-400"/>
                            <span className="text-sm font-bold text-slate-700"><CountUp /> personnes attendent</span>
                          </div>
                        </div>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
                        <div className="relative flex-1">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400"/>
                          {!userInteracted && ghostText && (
                            <div className="absolute inset-0 flex items-center pl-12 pr-4 pointer-events-none">
                              <span className="text-base text-slate-900">{ghostText}</span>
                              <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-[2px] h-5 bg-violet-500 ml-[1px]"/>
                            </div>
                          )}
                          <input type="email" required value={email}
                            onChange={(e) => { setEmail(e.target.value); setUserInteracted(true); if (status === "error") setStatus("idle"); }}
                            onFocus={() => setUserInteracted(true)}
                            placeholder={userInteracted || ghostText ? "" : "votreadresse@email.com"}
                            aria-label="Adresse email"
                            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-violet-200 bg-violet-50/40 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-violet-500/15 focus:border-violet-400 text-base transition-all"
                          />
                        </div>
                        <motion.button type="submit" disabled={status === "loading"}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          animate={ghostPhase === "clicking"
                            ? { scale: [1, 0.92, 1.05, 1], boxShadow: "0 8px 35px -5px rgba(59,130,246,0.6)" }
                            : { boxShadow: ["0 8px 25px -5px rgba(139,92,246,0.4)", "0 8px 35px -5px rgba(59,130,246,0.5)", "0 8px 25px -5px rgba(139,92,246,0.4)"] }
                          }
                          transition={ghostPhase === "clicking"
                            ? { duration: 0.4 }
                            : { boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
                          }
                          className="px-8 py-4 rounded-xl font-bold text-white text-lg bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 transition-all disabled:opacity-70 whitespace-nowrap"
                        >
                          {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin"/> : "Rejoindre →"}
                        </motion.button>
                      </form>
                      {status === "error" && errorMsg && <p className="text-xs text-red-500 mt-2">{errorMsg}</p>}
                      <p className="relative text-[11px] text-slate-400 mt-3 lg:text-left">Accès prioritaire · Gratuit · Sans spam</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>

        </motion.div>
        </div>

        {/* DROITE — iPhone */}
        <motion.div className="flex justify-center order-last lg:order-none" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 120 }}>
          <div className="relative scale-[0.55] -translate-y-[15px] -my-[180px] md:scale-100 md:my-0 md:translate-y-0 origin-center">
            {/* Glow derrière le phone */}
            <div className="absolute -inset-10 rounded-full pointer-events-none" style={{
              background: "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
              animation: "glowPulse 4s ease-in-out infinite",
            }}/>
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-6 -right-8 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-xl shadow-violet-500/30 z-20"
            >
              <Sparkles className="w-6 h-6 text-white"/>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-6 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/25 z-20"
            >
              <FileText className="w-5 h-5 text-white"/>
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/3 -left-10 w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25 z-20"
            >
              <Target className="w-4 h-4 text-white"/>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative"
              style={{
                width: 300,
                height: 620,
                borderRadius: 46,
                background: "linear-gradient(145deg, #2a2a2a, #1a1a1a, #111)",
                padding: 8,
                boxShadow: "0 30px 80px -15px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset, 0 0 0 2px rgba(0,0,0,0.5), 0 0 60px -20px rgba(139,92,246,0.15)",
              }}
            >
              {/* Reflet */}
              <div className="absolute inset-0 rounded-[46px] pointer-events-none z-10"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)" }}/>
              {/* Boutons physiques */}
              <div className="absolute -right-[2.5px] top-[100px] w-[3px] h-[32px] rounded-l-sm" style={{ background: "linear-gradient(180deg, #444, #333)" }}/>
              <div className="absolute -right-[2.5px] top-[142px] w-[3px] h-[32px] rounded-l-sm" style={{ background: "linear-gradient(180deg, #444, #333)" }}/>
              <div className="absolute -left-[2.5px] top-[80px] w-[3px] h-[24px] rounded-r-sm" style={{ background: "linear-gradient(180deg, #444, #333)" }}/>
              <div className="absolute -left-[2.5px] top-[120px] w-[3px] h-[44px] rounded-r-sm" style={{ background: "linear-gradient(180deg, #444, #333)" }}/>
              {/* Écran */}
              <div className="w-full h-full rounded-[36px] overflow-hidden">
                <IPhoneApp />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Edit mode toggle — desktop only */}
      <button
        onClick={() => {
          if (editMode) {
            // Save position to localStorage
            localStorage.setItem("leftBlockOffset", JSON.stringify(leftOffset));
          }
          setEditMode(!editMode);
        }}
        className={`hidden md:block fixed top-4 right-4 z-50 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg transition-all ${
          editMode
            ? "bg-emerald-500 text-white hover:bg-emerald-600"
            : "bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200 hover:bg-white"
        }`}
      >
        {editMode ? "Sauvegarder" : "Mode édition"}
      </button>

      {editMode && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-violet-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg flex items-center gap-2">
          <span>Glissez le bloc de gauche pour le repositionner</span>
          <button onClick={() => { setLeftOffset({ x: 0, y: 0 }); }} className="ml-2 px-2 py-0.5 rounded bg-white/20 text-xs hover:bg-white/30 transition-all">Reset</button>
        </div>
      )}
    </main>
  );
}
