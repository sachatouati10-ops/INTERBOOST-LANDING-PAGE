"use client";

import { useState, useEffect, useCallback } from "react";
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

  const triggerSwipe = useCallback(() => {
    const dir = currentIndex % 2 === 0 ? "right" : "left";
    setSwipeDir(dir);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % jobCards.length);
      setSwipeDir(null);
    }, 650);
  }, [currentIndex]);

  useEffect(() => {
    const id = setInterval(triggerSwipe, 4000);
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
                    ? { x: swipeDir === "right" ? 280 : -280, rotate: swipeDir === "right" ? 15 : -15, opacity: 0 }
                    : { x: idx * 3, y: idx * 6, rotate: idx * -1, scale: 1 - idx * 0.025, opacity: 1 }
                }
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                style={{ zIndex: 10 - idx }}
              >
                {/* Overlay LIKE/NOPE */}
                <AnimatePresence>
                  {exiting && swipeDir === "right" && (
                    <motion.div className="absolute inset-0 z-20 rounded-[20px] flex items-center justify-center"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <motion.div className="px-5 py-2 rounded-lg border-[3px] border-emerald-500 bg-emerald-500/10 rotate-[-12deg]"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400 }}>
                        <span className="text-emerald-500 font-black text-xl tracking-widest">LIKE</span>
                      </motion.div>
                    </motion.div>
                  )}
                  {exiting && swipeDir === "left" && (
                    <motion.div className="absolute inset-0 z-20 rounded-[20px] flex items-center justify-center"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <motion.div className="px-5 py-2 rounded-lg border-[3px] border-red-500 bg-red-500/10 rotate-[12deg]"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400 }}>
                        <span className="text-red-500 font-black text-xl tracking-widest">NOPE</span>
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
          animate={swipeDir === "left" ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.25 }}
        >
          <X className={`w-5 h-5 ${swipeDir === "left" ? "text-white" : "text-red-400"}`}/>
        </motion.button>
        <motion.button
          className={`w-[56px] h-[56px] rounded-full flex items-center justify-center shadow-md transition-colors ${
            swipeDir === "right" ? "bg-emerald-500 shadow-emerald-200" : "bg-gradient-to-br from-violet-500 to-blue-500 shadow-violet-200"
          }`}
          animate={swipeDir === "right" ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.25 }}
        >
          <CheckCircle className="w-6 h-6 text-white"/>
        </motion.button>
        <motion.button className="w-[50px] h-[50px] rounded-full bg-white shadow-md shadow-slate-200 flex items-center justify-center">
          <Heart className="w-5 h-5 text-amber-400"/>
        </motion.button>
      </div>

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

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!isValidEmail(email)) { setErrorMsg("Merci d'entrer une adresse email valide."); setStatus("error"); return; }
    setStatus("loading");
    // TODO: brancher l'API
    setTimeout(() => { console.log("Inscription:", { email }); setStatus("success"); }, 1200);
  };

  return (
    <main className="relative min-h-screen bg-slate-50 overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-200/40 blur-[120px] pointer-events-none"/>
      <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-200/30 blur-[100px] pointer-events-none"/>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        {/* GAUCHE */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-6">
            <Rocket className="w-4 h-4"/>
            Bientôt disponible
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-slate-900 leading-[1.08] mb-5">
            Swipez. Postulez.{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Décrochez.</span>
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
            Interboost automatise votre CV et votre lettre de motivation, personnalisés pour chaque offre. Vous n&apos;avez qu&apos;à swiper.
          </p>

          {/* Email CTA */}
          <div className="mb-6">
            {status === "success" ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-4 bg-emerald-50 rounded-3xl border-2 border-emerald-300 p-6"
              >
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <CheckCircle className="w-8 h-8 text-emerald-500"/>
                </motion.div>
                <div>
                  <p className="text-lg font-bold text-emerald-800">Vous êtes sur la liste !</p>
                  <p className="text-sm text-emerald-600 mt-0.5">On vous envoie un email dès le lancement.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="relative rounded-3xl p-[2px] overflow-hidden"
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-3xl" style={{
                  background: "linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4, #8b5cf6)",
                  backgroundSize: "300% 300%",
                  animation: "gradientShift 4s ease infinite",
                }}/>
                <div className="relative bg-white rounded-[22px] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-violet-500/30"
                    >
                      <Rocket className="w-6 h-6 text-white"/>
                    </motion.div>
                    <div>
                      <p className="text-xl font-bold text-slate-900">Rejoignez l&apos;aventure</p>
                      <p className="text-sm text-slate-500">Accès prioritaire + offres exclusives</p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400"/>
                      <input type="email" required value={email}
                        onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                        placeholder="votreadresse@email.com" aria-label="Adresse email"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-400 text-base transition-all"
                      />
                    </div>
                    <motion.button type="submit" disabled={status === "loading"}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-8 py-4 rounded-2xl font-bold text-white text-base bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 shadow-xl shadow-violet-500/30 transition-all disabled:opacity-70 whitespace-nowrap"
                    >
                      {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin mx-auto"/> : "Rejoindre la liste →"}
                    </motion.button>
                  </form>
                  {status === "error" && errorMsg && <p className="text-sm text-red-500 mt-3 font-medium">{errorMsg}</p>}
                  <div className="flex items-center gap-3 mt-4">
                    <span className="inline-flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>+500 inscrits
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-sm text-slate-400">100% gratuit, zéro spam</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* 4 points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {[
              { icon: MousePointerClick, title: "Swipe = candidature", desc: "Un geste suffit pour postuler à une offre." },
              { icon: FileText, title: "CV adapté par l'IA", desc: "Votre CV ajusté aux mots-clés de chaque offre." },
              { icon: Sparkles, title: "Lettre sur-mesure", desc: "Une LM personnalisée pour chaque entreprise." },
              { icon: Target, title: "Matching intelligent", desc: "Seules les offres pertinentes apparaissent." },
            ].map((item, i) => (
              <motion.div key={i} className="flex gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-violet-600"/>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-0.5">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* DROITE — iPhone */}
        <motion.div className="flex justify-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <div
            className="relative"
            style={{
              width: 280,
              height: 580,
              borderRadius: 44,
              background: "#1a1a1a",
              padding: 8,
              boxShadow: "0 25px 60px -12px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1) inset, 0 0 0 2px rgba(0,0,0,0.5)",
            }}
          >
            {/* Reflet */}
            <div className="absolute inset-0 rounded-[44px] pointer-events-none z-10"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%)" }}/>
            {/* Boutons physiques */}
            <div className="absolute -right-[2.5px] top-[100px] w-[3px] h-[32px] rounded-l-sm" style={{ background: "#333" }}/>
            <div className="absolute -right-[2.5px] top-[142px] w-[3px] h-[32px] rounded-l-sm" style={{ background: "#333" }}/>
            <div className="absolute -left-[2.5px] top-[80px] w-[3px] h-[24px] rounded-r-sm" style={{ background: "#333" }}/>
            <div className="absolute -left-[2.5px] top-[120px] w-[3px] h-[44px] rounded-r-sm" style={{ background: "#333" }}/>
            {/* Écran */}
            <div className="w-full h-full rounded-[36px] overflow-hidden">
              <IPhoneApp />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
