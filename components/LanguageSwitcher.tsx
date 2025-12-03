"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { Language } from '@/lib/translations';

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
    { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <>
      {/* Compact Globe Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-1 text-white hover:text-primary transition-colors rounded-md hover:bg-primary/10"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-xs mx-2"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-border">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-3 py-2 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      <h2 className="text-sm font-bold text-foreground font-display">
                        {language === 'en' ? 'Select Language' : 'Выберите язык'}
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-text-secondary hover:text-foreground transition-colors p-1"
                      aria-label="Close"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Language Options */}
                <div className="p-2 space-y-1">
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`w-full flex items-center justify-between p-2 rounded-md transition-all duration-200 text-sm ${
                        language === lang.code
                          ? 'bg-primary text-white shadow-md shadow-primary/20'
                          : 'bg-surface hover:bg-border text-foreground hover:shadow-sm'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                      </div>
                      {language === lang.code && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center justify-center w-4 h-4 rounded-full bg-white/20"
                        >
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
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
