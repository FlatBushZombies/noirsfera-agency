"use client"

import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye } from "lucide-react"

// ✅ Explicitly typed as Variants (this fixes the TypeScript error)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, x: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

export function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background pt-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
                Modernising business through <span className="text-[#0EC8F3]">futuristic</span> software
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0EC8F3] to-[#0EA5C8] border-2 border-background"
                  />
                ))}
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                Building Digital Experiences that moves Brands Forward
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-black/90 border-2 border-[#0EC8F3] hover:border-[#0EC8F3]/80 transition-all group"
              >
                Get Feedback
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-foreground hover:bg-foreground hover:text-background transition-all group bg-transparent"
              >
                <Eye className="mr-2 h-4 w-4" />
                See our Work
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Mockup */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#0EC8F3]/20">
              <div className="bg-gradient-to-br from-gray-900 to-black p-4 md:p-6">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 bg-gray-800 rounded px-3 py-1 text-xs text-gray-400">rareblocks.com</div>
                </div>

                {/* Code Editor Mockup */}
                <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs md:text-sm space-y-2">
                  <div className="text-gray-500">
                    <span className="text-purple-400">const</span> <span className="text-blue-400">User</span> ={" "}
                    <span className="text-yellow-400">{"{"}</span>
                  </div>
                  <div className="pl-4 text-gray-500">
                    <span className="text-green-400">name</span>: <span className="text-orange-400">'string'</span>,
                  </div>
                  <div className="pl-4 text-gray-500">
                    <span className="text-green-400">email</span>: <span className="text-orange-400">'string'</span>,
                  </div>
                  <div className="text-gray-500">
                    <span className="text-yellow-400">{"}"}</span>
                  </div>
                </div>

                {/* Chat Interface Mockup */}
                <div className="mt-4 space-y-3">
                  <div className="bg-gray-800 rounded-lg p-3 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0EC8F3] flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-400 mb-1">Martin Gray • 10:25 PM, Nov 10</div>
                      <div className="text-sm text-white">This works for every browser:</div>
                      <div className="mt-2 bg-gray-900 rounded px-2 py-1 text-xs text-[#0EC8F3] font-mono">
                        window.location.href = your_url;
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-3 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-400 mb-1">Darlene Robertson • 9 Jan, Nov 10</div>
                      <div className="text-sm text-white">Shouldn't do do-trust.org window.location</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-[#0EC8F3]/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#0EC8F3]/10 rounded-full blur-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
