"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function Home() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const navLinks = ["Services", "Work", "About", "Contact"]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl font-bold tracking-tight"
          style={{ color: "#0B96B0" }}
        >
          noirsfera
        </motion.div>

        <div className="flex gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredLink(link)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative text-sm font-medium tracking-wide transition-colors"
              style={{
                color: hoveredLink === link ? "#0B96B0" : "white",
              }}
            >
              {link}
              {hoveredLink === link && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5"
                  style={{ backgroundColor: "#0B96B0" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <main className="flex items-center justify-center min-h-screen px-8">
        <div className="text-center">
          <motion.h1
            className="text-[12vw] md:text-[10vw] font-bold tracking-tighter leading-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {["n", "o", "i", "r", "s", "f", "e", "r", "a"].map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + index * 0.1,
                  ease: [0.6, 0.01, 0.05, 0.95],
                }}
                className="inline-block"
                style={{
                  color: index % 2 === 0 ? "white" : "#0B96B0",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.5, ease: "easeInOut" }}
            className="h-1 mx-auto mt-8 max-w-md origin-center"
            style={{ backgroundColor: "#0B96B0" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="mt-8 text-lg md:text-xl text-gray-400 tracking-wide"
          >
            Software Agency
          </motion.p>
        </div>
      </main>

      {/* Animated background elements */}
      <motion.div
        className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: "#0B96B0" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: "#0B96B0" }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  )
}
