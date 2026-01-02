"use client"

import type React from "react"
import { useState, useEffect, useRef, useMemo } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Zap } from "lucide-react"
import { useLanguage } from "@/lib/LanguageContext"
import { getTranslations, type Translations } from "@/lib/translations"

type PricingPlan = "oneTime" | "subscription"
type PackageTier = "starter" | "growth" | "professional"

interface PackageData {
  name: string
  icon?: React.ReactNode
  popular?: boolean
  oneTime: {
    price: string
    priceRange?: string
    period: string
    features: string[]
    description?: string
  }
  subscription: {
    price: string
    priceRange?: string
    period: string
    features: string[]
    description?: string
  }
}

interface PricingCardData {
  title: string
  packages: {
    starter: PackageData
    growth: PackageData
    professional: PackageData
  }
}

export default function Pricing() {
  const { language } = useLanguage()
  const t = getTranslations(language)

  const pricingData = useMemo<PricingCardData[]>(
    () => [
      {
        title: t.pricing.webDevelopment.title,
        packages: {
          starter: {
            name: t.pricing.webDevelopment.starter.name,
            oneTime: {
              price: "$1,200",
              priceRange: "$1,200 - $2,000",
              period: t.pricing.webDevelopment.starter.oneTime.period,
              description: t.pricing.webDevelopment.starter.oneTime.description,
              features: t.pricing.webDevelopment.starter.oneTime.features,
            },
            subscription: {
              price: "$150",
              priceRange: "$150 - $200/mo",
              period: t.pricing.perMonth,
              description: t.pricing.webDevelopment.starter.subscription.description,
              features: t.pricing.webDevelopment.starter.subscription.features,
            },
          },
          growth: {
            name: t.pricing.webDevelopment.growth.name,
            popular: true,
            icon: <Zap className="w-4 h-4" />,
            oneTime: {
              price: "$2,200",
              priceRange: "$2,200 - $3,000",
              period: t.pricing.webDevelopment.growth.oneTime.period,
              description: t.pricing.webDevelopment.growth.oneTime.description,
              features: t.pricing.webDevelopment.growth.oneTime.features,
            },
            subscription: {
              price: "$250",
              priceRange: "$250 - $350/mo",
              period: t.pricing.perMonth,
              description: t.pricing.webDevelopment.growth.subscription.description,
              features: t.pricing.webDevelopment.growth.subscription.features,
            },
          },
          professional: {
            name: t.pricing.webDevelopment.professional.name,
            oneTime: {
              price: "$3,200",
              priceRange: "$3,200 - $6,000+",
              period: t.pricing.webDevelopment.professional.oneTime.period,
              description: t.pricing.webDevelopment.professional.oneTime.description,
              features: t.pricing.webDevelopment.professional.oneTime.features,
            },
            subscription: {
              price: "$400",
              priceRange: "$400 - $600/mo",
              period: t.pricing.perMonth,
              description: t.pricing.webDevelopment.professional.subscription.description,
              features: t.pricing.webDevelopment.professional.subscription.features,
            },
          },
        },
      },
      {
        title: t.pricing.productDesign.title,
        packages: {
          starter: {
            name: t.pricing.productDesign.startupMvp.name,
            oneTime: {
              price: "$2,000",
              priceRange: "$2,000 - $4,000",
              period: t.pricing.productDesign.startupMvp.oneTime.period,
              description: t.pricing.productDesign.startupMvp.oneTime.description,
              features: t.pricing.productDesign.startupMvp.oneTime.features,
            },
            subscription: {
              price: "$100",
              priceRange: "$100 - $200/mo",
              period: t.pricing.perMonth,
              description: t.pricing.productDesign.startupMvp.subscription.description,
              features: t.pricing.productDesign.startupMvp.subscription.features,
            },
          },
          growth: {
            name: t.pricing.productDesign.growth.name,
            popular: true,
            icon: <Zap className="w-4 h-4" />,
            oneTime: {
              price: "$5,000",
              priceRange: "$5,000 - $10,000",
              period: t.pricing.productDesign.growth.oneTime.period,
              description: t.pricing.productDesign.growth.oneTime.description,
              features: t.pricing.productDesign.growth.oneTime.features,
            },
            subscription: {
              price: "$250",
              priceRange: "$250 - $550/mo",
              period: t.pricing.perMonth,
              description: t.pricing.productDesign.growth.subscription.description,
              features: t.pricing.productDesign.growth.subscription.features,
            },
          },
          professional: {
            name: t.pricing.productDesign.scale.name,
            oneTime: {
              price: "$12,000",
              priceRange: "$12,000 - $20,000+",
              period: t.pricing.productDesign.scale.oneTime.period,
              description: t.pricing.productDesign.scale.oneTime.description,
              features: t.pricing.productDesign.scale.oneTime.features,
            },
            subscription: {
              price: "$750",
              priceRange: "$750 - $1,000/mo",
              period: t.pricing.perMonth,
              description: t.pricing.productDesign.scale.subscription.description,
              features: t.pricing.productDesign.scale.subscription.features,
            },
          },
        },
      },
    ],
    [t],
  )

  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "back.out(1.2)",
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative min-h-screen bg-gradient-to-b from-background via-background to-surface py-20 md:py-28 lg:py-36 px-4 sm:px-6 lg:px-8"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <p className="text-sm md:text-base font-semibold text-primary uppercase tracking-widest mb-4">
            {t.pricing.badge}
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 tracking-tight leading-tight font-display text-balance">
            {t.pricing.heading}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
            {t.pricing.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {pricingData.map((card, index) => (
            <PricingCard key={index} data={card} cardRef={(el) => (cardsRef.current[index] = el)} translations={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCard({
  data,
  cardRef,
  translations,
}: {
  data: PricingCardData
  cardRef: (el: HTMLDivElement | null) => void
  translations: Translations
}) {
  const [plan, setPlan] = useState<PricingPlan>("oneTime")
  const [selectedPackage, setSelectedPackage] = useState<PackageTier>("growth")

  const currentPackage = data.packages[selectedPackage]
  const currentPlan = currentPackage[plan]

  const ToggleSwitch = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <button
        onClick={() => setPlan(plan === "oneTime" ? "subscription" : "oneTime")}
        className={`relative w-16 h-8 rounded-full transition-all duration-300 border backdrop-blur-xl shadow-md ${
          plan === "subscription" ? "bg-[#0EC8F3]/70 border-[#0EC8F3]/50" : "bg-white/20 border-primary"
        }`}
        aria-label="Toggle pricing plan"
      >
        <div
          className={`absolute top-1 w-6 h-6 rounded-full shadow-xl border border-white/50 transition-transform duration-300
          ${plan === "subscription" ? "translate-x-8 bg-white/80" : "translate-x-1 bg-black/80 shadow-[0_0_12px_2px_rgba(14,200,243,0.5)]"}
        `}
        />
      </button>
      {/* ✅ ALWAYS TEXT BLACK */}
      <span className="text-sm font-semibold text-black">{translations.pricing.subscription}</span>
    </div>
  )

  return (
    <div className="flex flex-col h-full">
      <div ref={cardRef} className="h-full flex flex-col">
        <Card className="relative bg-white/10 backdrop-blur-3xl border-2 border-white/30 hover:border-[#0EC8F3]/50 overflow-hidden group hover:shadow-[0_25px_60px_-15px_rgba(14,200,243,0.4),0_8px_32px_rgba(14,200,243,0.2)] transition-all duration-500 rounded-2xl p-8 md:p-10 flex flex-col h-full">
          <span className="liquid-noise rounded-2xl absolute inset-0" />
          <div className="flex flex-col h-full relative z-10">
            <div className="min-h-[80px] flex items-start mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight font-display">
                {data.title}
              </h3>
            </div>

            <div className="flex gap-2 mb-8 flex-wrap min-h-[60px] items-center justify-center">
              {(Object.keys(data.packages) as PackageTier[]).map((tier) => {
                const pkg = data.packages[tier]
                const isSelected = selectedPackage === tier
                return (
                  <button
                    key={tier}
                    onClick={() => setSelectedPackage(tier)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-xl ${
                      isSelected
                        ? "bg-[#0EC8F3]/40 text-white border border-[#0EC8F3]/50"
                        : "bg-white/10 text-foreground hover:bg-[#0EC8F3]/10 border border-white/20"
                    }`}
                  >
                    {pkg.icon && (
                      <span className={`w-4 h-4 ${isSelected ? "text-white drop-shadow-lg" : "text-[#054F56]"}`}>
                        {pkg.icon}
                      </span>
                    )}
                    <span className="whitespace-nowrap">{pkg.name}</span>
                    {pkg.popular && (
                      <span className="absolute -top-3 -right-3 bg-[#0EC8F3]/90 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg font-bold border border-white/30">
                        {translations.pricing.mostPopular}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="text-center mb-8 min-h-[140px] flex flex-col justify-center">
              <div className="text-5xl md:text-6xl font-black text-foreground mb-3 font-display tracking-tight">
                {currentPlan.price}
              </div>
              {currentPlan.priceRange && <div className="text-sm text-muted mb-2">{currentPlan.priceRange}</div>}
              <div className="text-text-secondary text-base font-semibold tracking-wide">
                {plan === "subscription" ? translations.pricing.perMonth : currentPlan.period}
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 pr-2 flex-1 overflow-auto min-h-[300px] max-h-[400px]">
              {currentPlan.features.map((feature, index) => (
                <div key={`${plan}-${selectedPackage}-${index}`} className="flex items-start gap-3 text-text-secondary">
                  <div className="w-5 h-5 rounded-full bg-[#0EC8F3]/50 backdrop-blur-md flex items-center justify-center mt-0.5 flex-shrink-0 shadow-md border border-white/20">
                    <Check className="w-3 h-3 text-white font-bold drop-shadow-sm" strokeWidth={3} />
                  </div>
                  <span className="text-sm md:text-base leading-relaxed font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <ToggleSwitch />
            </div>
          </div>
        </Card>

        {/* PRIMARY COLOR CTA BUTTONS BELOW CARD */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <a
            href="https://wa.me/79778148423"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group w-full sm:w-1/2"
          >
          
            <Button className="relative w-full h-14 md:h-16 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:via-blue-400 hover:to-cyan-400 text-white font-bold text-base md:text-lg rounded-full hover:scale-[1.03] transition-all duration-300 shadow-[0_0_40px_rgba(59,130,246,0.5),0_0_80px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.7),0_0_100px_rgba(59,130,246,0.4)] border-0 overflow-hidden">
              {/* Animated glow background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

              <span className="relative z-10">{translations.pricing.scheduleAMeeting}</span>
            </Button>
          </a>

          <a
            href="https://t.me/itsslucki"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group w-full sm:w-1/2"
          >
            
            <Button
  className="
    w-full h-14 md:h-16
    bg-transparent
    border-2 border-primary
    text-primary
    hover:bg-primary
    hover:text-primary-foreground
    rounded-full
    transition-colors
    shadow-none
  "
>
  {translations.pricing.connectTelegram}
</Button>
          </a>
        </div>
      </div>
    </div>
  )
}
