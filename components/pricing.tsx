"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Zap } from "lucide-react"
import { useLanguage } from "@/lib/LanguageContext"
import { getTranslations, type Translations } from "@/lib/translations"

gsap.registerPlugin(ScrollTrigger)

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

  const { language } = useLanguage();
  const t = getTranslations(language);
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
  const buttonsRef = useRef<(HTMLDivElement | null)[]>([])

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
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
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
            <PricingCard
              key={index}
              data={card}
              cardRef={(el) => (cardsRef.current[index] = el)}
              buttonRef={(el) => (buttonsRef.current[index] = el)}
              translations={t}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCard({
  data,
  cardRef,
  buttonRef,
  translations,
}: {
  data: PricingCardData
  cardRef: (el: HTMLDivElement | null) => void
  buttonRef: (el: HTMLDivElement | null) => void
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
        className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
          plan === "subscription" ? "bg-[#054F56]" : "bg-gray-300"
        }`}
        aria-label="Toggle pricing plan"
      >
        <div
          className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
            plan === "subscription" ? "translate-x-8" : "translate-x-1"
          }`}
        />
      </button>
      <span
        className={`text-sm font-semibold transition-colors ${
          plan === "subscription" ? "text-foreground" : "text-muted"
        }`}
      >
        {translations.pricing.subscription}
      </span>
    </div>
  )

  return (
    <div className="flex flex-col h-full">
      <div ref={cardRef} className="h-full flex flex-col">
        <Card className="relative bg-white border-2 border-border hover:border-[#054F56]/30 overflow-hidden group hover:shadow-2xl transition-all duration-500 rounded-2xl p-8 md:p-10 flex flex-col h-full">
          <div className="flex flex-col h-full">
            <ToggleSwitch className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2" />

            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 tracking-tight leading-tight font-display">
              {data.title}
            </h3>

            <div className="flex gap-2 mb-10 flex-wrap min-h-[60px] items-start">
              {(Object.keys(data.packages) as PackageTier[]).map((tier) => {
                const pkg = data.packages[tier]
                const isSelected = selectedPackage === tier
                return (
                  <button
                    key={tier}
                    onClick={() => setSelectedPackage(tier)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isSelected ? "bg-[#054F56] text-white shadow-lg" : "bg-surface text-foreground hover:bg-border"
                    }`}
                  >
                    {pkg.icon && (
                      <span className={`w-4 h-4 ${isSelected ? "text-white" : "text-[#054F56]"}`}>{pkg.icon}</span>
                    )}
                    <span className="whitespace-nowrap">{pkg.name}</span>
                    {pkg.popular && (
                      <span className="absolute -top-3 -right-3 bg-teal-600 text-white text-xs px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg font-bold">
                        {translations.pricing.mostPopular}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="text-center mb-10 min-h-[140px] flex flex-col justify-center">
              <div className="text-5xl md:text-6xl font-black text-foreground mb-3 font-display tracking-tight">
                {currentPlan.price}
              </div>
              {currentPlan.priceRange && <div className="text-sm text-muted mb-2">{currentPlan.priceRange}</div>}
              <div className="text-text-secondary text-base font-semibold mb-4 tracking-wide">
                {plan === "subscription" ? translations.pricing.perMonth : currentPlan.period}
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 pr-2 flex-1 overflow-auto mb-10 min-h-[300px] max-h-[400px]">
              {currentPlan.features.map((feature, index) => (
                <div key={`${plan}-${selectedPackage}-${index}`} className="flex items-start gap-3 text-text-secondary">
                  <div className="w-5 h-5 rounded-full bg-[#054F56] flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-white font-bold" strokeWidth={3} />
                  </div>
                  <span className="text-sm md:text-base leading-relaxed font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <ToggleSwitch className="mt-10 md:hidden" />
          </div>
        </Card>
      </div>

      <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
        <Button
          asChild
          className="w-full sm:w-1/2 h-14 md:h-16 bg-[#054F56] hover:bg-[#043940] text-white font-bold text-base md:text-lg transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border-0"
        >
          <a
            href="https://wa.me/79778148423"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={translations.pricing.scheduleMeetingAria}
          >
            {translations.pricing.scheduleAMeeting}
          </a>
        </Button>

        <a href="https://t.me/itsslucki" target="_blank" rel="noopener noreferrer" className="w-full sm:w-1/2">
          <Button
            variant="outline"
            className="w-full h-14 md:h-16 bg-white border-2 border-[#054F56] hover:border-[#054F56] text-[#054F56] hover:text-white hover:bg-[#054F56] font-bold text-base md:text-lg transition-all duration-300 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            {translations.pricing.connectTelegram}
          </Button>
        </a>
      </div>
    </div>
  )
}
