"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const links = ["Home", "Services", "Portfolio", "Pricing", "Contact"];

export default function NavBar() {
  const [pos, setPos] = useState({ x: "50%", y: "50%" });

  return (
    <motion.nav
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: `${((e.clientX - rect.left) / rect.width) * 100}%`,
          y: `${((e.clientY - rect.top) / rect.height) * 100}%`,
        });
      }}
      animate={{
        opacity: 1,
        filter: ["blur(0px)", "blur(0.25px)", "blur(0px)"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
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
        fixed top-6 left-1/2 -translate-x-1/2 z-50
        flex items-center gap-10
        px-10 py-4
        rounded-full
        border border-white/25
      "
    >
      {/* Liquid layers */}
      <span className="liquid-noise rounded-inherit" />
      <span className="liquid-refraction rounded-inherit" />

      {/* Logo */}
      <div className="relative z-10 font-semibold tracking-wide">
        noirsfera
      </div>

      {/* Links */}
      <ul className="relative z-10 flex gap-8 text-sm">
        {links.map((link) => {
          // Map link text to section ID
          const idMap: Record<string, string> = {
            Home: "#",
            Services: "services",
            Portfolio: "portfolio",
            Pricing: "pricing",
            Contact: "contact",
          };

          return (
            <li
              key={link}
              className="cursor-pointer transition-opacity hover:opacity-70"
              onClick={() => {
                const section = document.getElementById(idMap[link]);
                section?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {link}
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
