"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function NavBar() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  const [pos, setPos] = useState({ x: "50%", y: "50%" });
  const [open, setOpen] = useState(false);

  const links = useMemo(
    () => [
      { label: t.navbar.services, id: "services" },
      { label: t.navbar.portfolio, id: "portfolio" },
      { label: t.navbar.pricing, id: "pricing" },
      { label: t.navbar.contact, id: "contact" },
    ],
    [t]
  );

  return (
    <>
      {/* NAV */}
      <motion.nav
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
          animation: "glassWobble 6s ease-in-out infinite",
          background: `
            radial-gradient(
              600px circle at var(--x) var(--y),
              rgba(255,255,255,0.28),
              transparent 35%
            ),
            radial-gradient(
              900px circle at calc(var(--x) - 100px) calc(var(--y) - 80px),
              rgba(255,255,255,0.12),
              transparent 50%
            ),
            linear-gradient(
              180deg,
              rgba(255,255,255,0.22),
              rgba(255,255,255,0.08)
            )
          `,
          backdropFilter: "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.65),
            inset 0 -1px 0 rgba(255,255,255,0.18),
            inset 1px 0 0 rgba(255,255,255,0.08),
            inset -1px 0 0 rgba(255,255,255,0.08),
            0 24px 70px rgba(0,0,0,0.35)
          `,
        }}
        className="
          fixed top-4 left-1/2 -translate-x-1/2 z-50
          flex items-center justify-between
          px-5 py-3
          w-[calc(100%-1.5rem)]
          rounded-full
          border border-white/25
          md:w-auto md:px-10 md:py-4 md:gap-10
        "
      >
        {/* Glass layers */}
        <span className="liquid-noise rounded-inherit" />
        <span className="liquid-refraction rounded-inherit" />

        {/* Logo */}
        <div className="relative z-10 font-semibold tracking-wide">
          noirsfera
        </div>

        {/* Desktop links */}
        <ul className="relative z-10 hidden md:flex gap-8 text-sm">
          {links.map(({ label, id }) => (
            <li
              key={id}
              className="cursor-pointer transition-opacity hover:opacity-70"
              onClick={() => {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {label}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="relative z-10 flex items-center gap-3">
          <LanguageSwitcher />

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-1.5 rounded-full hover:bg-white/10 transition"
            aria-label="Open menu"
          >
            <Menu size={20} />
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
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xl md:hidden"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="
                absolute inset-x-4 top-20
                rounded-3xl
                border border-white/20
                bg-white/10
                backdrop-blur-2xl
                p-8
                space-y-6
              "
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>

              {links.map(({ label, id }) => (
                <button
                  key={id}
                  className="block w-full text-left text-lg font-medium"
                  onClick={() => {
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    setOpen(false);
                  }}
                >
                  {label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
