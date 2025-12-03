"use client"

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Language } from "@/lib/translations";

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en" as Language, name: "English", flag: "🇬🇧" },
    { code: "ru" as Language, name: "Русский", flag: "🇷🇺" },
  ];

  const closeWithDelay = () => {
    setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <div
      className="relative inline-block"
      onMouseLeave={closeWithDelay}
    >
      {/* Globe trigger */}
      <button
        onMouseEnter={() => setIsOpen(true)}
        className="p-1.5 rounded-md text-white hover:text-primary hover:bg-primary/10 transition"
      >
        <Globe className="w-6 h-6" />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 2, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onMouseEnter={() => setIsOpen(true)}
            className="absolute left-1/2 -translate-x-1/2 mt-1 
                       bg-white border border-border shadow-lg rounded-md 
                       w-40 z-50 py-1"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-sm 
                  transition ${
                    language === lang.code
                      ? "bg-primary text-white"
                      : "hover:bg-border"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{lang.flag}</span>
                  {lang.name}
                </div>

                {/* Checkmark */}
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
