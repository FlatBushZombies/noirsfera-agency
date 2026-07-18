"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Language } from "@/lib/translations";

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en" as Language, name: "English", flag: "🇬🇧" },
    { code: "ru" as Language, name: "Русский", flag: "🇷🇺" },
  ];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Globe trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-1.5 rounded-md text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <Globe className="w-5 h-5" />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 2, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 -translate-x-1/2 mt-2
                       bg-white/95 backdrop-blur-xl border border-border shadow-[0_12px_32px_rgba(0,0,0,0.12)] rounded-xl
                       w-40 z-50 py-1.5 overflow-hidden"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg mx-1
                  transition-colors ${
                    language === lang.code
                      ? "bg-primary text-white"
                      : "hover:bg-border"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{lang.flag}</span>
                  {lang.name}
                </div>

                {language === lang.code && (
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
