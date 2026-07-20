"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslations } from "@/lib/translations";

gsap.registerPlugin(ScrollTrigger);

export default function NavBar() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  const [pos, setPos] = useState({ x: "50%", y: "50%" });
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["services", "portfolio", "pricing", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -45% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Smart hide on scroll-down / reveal on scroll-up
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          if (window.scrollY < 80) {
            gsap.to(nav, { y: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
            return;
          }
          if (self.direction === 1) {
            gsap.to(nav, { y: -100, duration: 0.35, ease: "power2.inOut", overwrite: "auto" });
          } else {
            gsap.to(nav, { y: 0, duration: 0.45, ease: "power2.out", overwrite: "auto" });
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const links = useMemo(
    () => [
      { label: t.navbar.services, id: "services" },
      { label: t.navbar.portfolio, id: "portfolio" },
      { label: t.navbar.pricing, id: "pricing" },
      { label: t.navbar.contact, id: "contact" },
    ],
    [t]
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveId(id);
  };

  return (
    <>
      {/* NAV */}
      <motion.nav
        ref={navRef}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPos({
            x: `${((e.clientX - rect.left) / rect.width) * 100}%`,
            y: `${((e.clientY - rect.top) / rect.height) * 100}%`,
          });
        }}
        style={{
          ["--x" as any]: pos.x,
          ["--y" as any]: pos.y,
          background: `radial-gradient(280px circle at var(--x) var(--y), rgba(0,217,255,0.06), transparent 65%), rgba(8,8,8,0.80)`,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.5)",
        }}
        className="
          fixed top-4 left-1/2 -translate-x-1/2 z-50
          flex items-center justify-between
          px-5 py-3
          w-[calc(100%-2rem)] max-w-sm
          rounded-full
          md:max-w-none md:w-auto md:px-8 md:py-3.5 md:gap-12
        "
      >

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2 select-none">
          {/* Accent dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary,#00D9FF)] flex-shrink-0" />
          <span className="font-black tracking-[0.12em] uppercase text-sm text-foreground">
            noirsfera
          </span>
        </div>

        {/* Desktop links */}
        <ul className="relative z-10 hidden md:flex items-center gap-1 text-sm">
          {links.map(({ label, id }) => {
            const isActive = activeId === id;
            return (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`
                    relative cursor-pointer px-4 py-2 rounded-full font-medium tracking-wide transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                    ${isActive
                      ? "text-foreground"
                      : "text-foreground/50 hover:text-foreground hover:bg-white/[0.05]"
                    }
                  `}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.12]"
                      transition={{ type: "spring", stiffness: 380, damping: 36 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="relative z-10 flex items-center gap-2">
          <LanguageSwitcher />

          {/* Divider — only on desktop */}
          <div className="hidden md:block w-px h-4 bg-white/[0.12] mx-1" />

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/[0.06] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label="Open menu"
          >
            <Menu size={17} strokeWidth={2.5} />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xl md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="
                absolute inset-x-4 top-[4.5rem]
                rounded-3xl
                border border-white/[0.07]
                bg-[#0d0d0d]
                shadow-[0_24px_60px_rgba(0,0,0,0.8)]
                overflow-hidden
              "
            >
              {/* Header row inside menu */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/[0.07]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary,#00D9FF)]" />
                  <span className="font-black tracking-[0.12em] uppercase text-sm">noirsfera</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/[0.06] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  aria-label="Close menu"
                >
                  <X size={17} strokeWidth={2.5} />
                </button>
              </div>

              {/* Links */}
              <div className="px-3 py-3">
                {links.map(({ label, id }, i) => (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-medium text-foreground/70 hover:text-foreground hover:bg-white/[0.04] transition-all duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    onClick={() => {
                      scrollTo(id);
                      setOpen(false);
                    }}
                  >
                    <span>{label}</span>
                    <svg
                      className="w-4 h-4 text-foreground/25 group-hover:text-foreground/50 group-hover:translate-x-0.5 transition-all duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                    </svg>
                  </motion.button>
                ))}
              </div>

              {/* Bottom padding */}
              <div className="h-2" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}