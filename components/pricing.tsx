"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Zap } from "lucide-react"

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

const pricingData: PricingCardData[] = [
  {
    title: "Web Development",
    packages: {
      starter: {
        name: "Starter",
        oneTime: {
          price: "$1,200",
          priceRange: "$1,200 - $2,000",
          period: "One-Time Payment",
          description: "Simple portfolio / landing page (1-3 pages)",
          features: [
            "2 design concepts",
            "Responsive design (desktop, tablet, mobile)",
            "Wireframes + custom layout",
            "Framer development",
            "Source code ownership",
            "1 month free support",
            "+$200 per extra page",
          ],
        },
        subscription: {
          price: "$150",
          priceRange: "$150 - $200/mo",
          period: "per month",
          description: "Great entry point for freelancers",
          features: [
            "All one-time features+",
            "Weekly progress meetings",
            "Monthly updates",
            "Unlimited page additions",
            "Constant, fast support",
            "Source code ownership after 12 months",
          ],
        },
      },
      growth: {
        name: "Growth",
        popular: true,
        icon: <Zap className="w-4 h-4" />,
        oneTime: {
          price: "$2,200",
          priceRange: "$2,200 - $3,000",
          period: "One-Time Payment",
          description: "Small business site (4-7 pages)",
          features: [
            "2 design concepts",
            "Responsive design (desktop, tablet, mobile)",
            "Wireframes + custom layout",
            "Framer development",
            "Source code ownership",
            "1 month free support",
            "+$200 per extra page",
          ],
        },
        subscription: {
          price: "$250",
          priceRange: "$250 - $350/mo",
          period: "per month",
          description: "Most popular range for SMEs",
          features: [
            "All one-time features+",
            "Weekly progress meetings",
            "Monthly updates",
            "Unlimited page additions",
            "Constant, fast support",
            "Source code ownership after 12 months",
          ],
        },
      },
      professional: {
        name: "Professional",
        oneTime: {
          price: "$3,200",
          priceRange: "$3,200 - $6,000+",
          period: "One-Time Payment",
          description: "Corporate / advanced design (8+ pages)",
          features: [
            "2 design concepts",
            "Responsive design (desktop, tablet, mobile)",
            "Wireframes + custom layout",
            "Framer development",
            "Source code ownership",
            "1 month free support",
            "+$200 per extra page",
            "Advanced animations & interactions",
          ],
        },
        subscription: {
          price: "$400",
          priceRange: "$400 - $600/mo",
          period: "per month",
          description: "Ongoing dev & maintenance",
          features: [
            "All one-time features+",
            "Weekly progress meetings",
            "Monthly updates",
            "Unlimited page additions",
            "Constant, fast support",
            "Heavy support & design iteration",
            "Source code ownership after 12 months",
          ],
        },
      },
    },
  },
  {
    title: "Product Design",
    packages: {
      starter: {
        name: "Startup MVP",
        oneTime: {
          price: "$2,000",
          priceRange: "$2,000 - $4,000",
          period: "One-Time Payment",
          description: "Basic mobile app + admin panel",
          features: [
            "2 design concepts",
            "Weekly updates",
            "Mobile app plus admin dashboard",
            "1-3 Months delivery",
            "App Store + Play Store launch",
            "1 month support",
            "Slack, Loom, and meeting communication",
          ],
        },
        subscription: {
          price: "$100",
          priceRange: "$100 - $200/mo",
          period: "per month",
          description: "Design + minor dev support",
          features: [
            "All one-time features+",
            "Weekly progress meetings",
            "2 weekly updates",
            "Unlimited changes",
            "Constant support",
            "Source code ownership after 18 months",
          ],
        },
      },
      growth: {
        name: "Growth",
        popular: true,
        icon: <Zap className="w-4 h-4" />,
        oneTime: {
          price: "$5,000",
          priceRange: "$5,000 - $10,000",
          period: "One-Time Payment",
          description: "Complex UI + interactions for funded startups",
          features: [
            "2 design concepts",
            "Weekly updates",
            "Mobile app plus admin dashboard",
            "1-3 Months delivery",
            "App Store + Play Store launch",
            "1 month support",
            "Slack, Loom, and meeting communication",
            "Advanced UI/UX design",
          ],
        },
        subscription: {
          price: "$250",
          priceRange: "$250 - $550/mo",
          period: "per month",
          description: "Unlimited changes + fast delivery",
          features: [
            "All one-time features+",
            "Weekly progress meetings",
            "2 weekly updates",
            "Unlimited changes",
            "Constant support",
            "Fast delivery",
            "Source code ownership after 18 months",
          ],
        },
      },
      professional: {
        name: "Scale",
        oneTime: {
          price: "$12,000",
          priceRange: "$12,000 - $20,000+",
          period: "One-Time Payment",
          description: "Custom design systems / dashboards",
          features: [
            "2 design concepts",
            "Weekly updates",
            "Mobile app plus admin dashboard",
            "1-3 Months delivery",
            "App Store + Play Store launch",
            "1 month support",
            "Slack, Loom, and meeting communication",
            "Custom design systems",
            "Enterprise-level support",
          ],
        },
        subscription: {
          price: "$750",
          priceRange: "$750 - $1,000/mo",
          period: "per month",
          description: "Full product design partnership",
          features: [
            "All one-time features+",
            "Weekly progress meetings",
            "2 weekly updates",
            "Unlimited changes",
            "Constant support",
            "Multiple products support",
            "Source code ownership after 18 months",
          ],
        },
      },
    },
  },
]

export default function Pricing() {
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
      className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white pt-8 md:pt-12 pb-16 px-4 font-inter"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight leading-tight">
            Choose Your Plan
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Flexible pricing options designed for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {pricingData.map((card, index) => (
            <PricingCard
              key={index}
              data={card}
              cardRef={(el) => (cardsRef.current[index] = el)}
              buttonRef={(el) => (buttonsRef.current[index] = el)}
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
}: {
  data: PricingCardData
  cardRef: (el: HTMLDivElement | null) => void
  buttonRef: (el: HTMLDivElement | null) => void
}) {
  const [plan, setPlan] = useState<PricingPlan>("oneTime")
  const [selectedPackage, setSelectedPackage] = useState<PackageTier>("growth")

  const currentPackage = data.packages[selectedPackage]
  const currentPlan = currentPackage[plan]

  const ToggleSwitch = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center justify-center gap-2 md:gap-3 ${className}`}>
      <button
        onClick={() => setPlan(plan === "oneTime" ? "subscription" : "oneTime")}
        className={`relative w-14 h-7 md:w-16 md:h-8 rounded-full transition-colors duration-300 ${
          plan === "subscription" ? "bg-[#054F56]" : "bg-gray-300"
        }`}
        aria-label="Toggle pricing plan"
      >
        <div
          className={`absolute top-0.5 md:top-1 w-6 h-6 md:w-6 md:h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
            plan === "subscription" ? "translate-x-7 md:translate-x-9" : "translate-x-0.5 md:translate-x-1"
          }`}
        />
      </button>
      <span
        className={`text-xs md:text-sm font-medium transition-colors ${
          plan === "subscription" ? "text-gray-900" : "text-gray-400"
        }`}
      >
        Subscription
      </span>
    </div>
  )

  return (
    <div className="flex flex-col">
      <div ref={cardRef}>
        <Card className="relative bg-white border border-gray-200 overflow-hidden group hover:border-[#054F56]/30 hover:shadow-2xl transition-all duration-500 h-[750px] flex flex-col justify-between w-full">
          <div className="relative p-6 md:p-8 lg:p-10 flex flex-col h-full">

            <ToggleSwitch className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2" />

            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight leading-tight">
              {data.title}
            </h3>

            <div className="flex gap-1.5 md:gap-2 mb-6 md:mb-8 flex-wrap min-h-[50px] md:min-h-[60px] items-start">
              {(Object.keys(data.packages) as PackageTier[]).map((tier) => {
                const pkg = data.packages[tier]
                const isSelected = selectedPackage === tier
                return (
                  <button
                    key={tier}
                    onClick={() => setSelectedPackage(tier)}
                    className={`relative flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                      isSelected ? "bg-[#054F56] text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {pkg.icon && <span className={`w-3 h-3 md:w-4 md:h-4 ${isSelected ? "text-white" : "text-[#054F56]"}`}>{pkg.icon}</span>}
                    <span className="whitespace-nowrap">{pkg.name}</span>
                    {pkg.popular && (
                      <span className="absolute -top-1.5 md:-top-2 -right-1.5 md:-right-2 bg-teal-600 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                        Most Popular
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="text-center mb-6 md:mb-8">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 tracking-tight">
                {currentPlan.price}
              </div>
              {currentPlan.priceRange && (
                <div className="text-xs md:text-sm text-gray-500 mb-2">
                  {currentPlan.priceRange}
                </div>
              )}
              <div className="text-gray-500 text-sm md:text-base font-medium tracking-wide mb-3">
                {plan === "subscription" ? "per month" : currentPlan.period}
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 pr-2 flex-1 overflow-auto">
              {currentPlan.features.map((feature, index) => (
                <div key={`${plan}-${selectedPackage}-${index}`} className="flex items-start gap-2 md:gap-3 text-gray-700">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#054F56] flex items-center justify-center mt-0.5">
                    <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-xs md:text-sm leading-relaxed font-normal">{feature}</span>
                </div>
              ))}
            </div>

            <ToggleSwitch className="mt-6 md:hidden" />

          </div>
        </Card>
      </div>

      <div ref={buttonRef} className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 md:mt-2 w-full">
        <Button className="w-full sm:w-1/2 h-12 md:h-14 bg-[#054F56] text-white hover:bg-[#043940] font-semibold text-xs md:text-sm transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
          Schedule a Meeting
        </Button>
        <a href="https://t.me/itsslucki" target="_blank" rel="noopener noreferrer" className="w-full sm:w-1/2">
          <Button variant="outline" className="w-full h-12 md:h-14 bg-white border-2 border-[#054F56] text-[#054F56] hover:bg-[#054F56] hover:text-white font-semibold text-xs md:text-sm transition-all duration-300 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
            Connect on Telegram
          </Button>
        </a>
      </div>
    </div>
  )
}
