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
      // Animate pricing cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            scale: 0.95,
          },
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

      // Animate buttons
      buttonsRef.current.forEach((buttonContainer, index) => {
        if (!buttonContainer) return

        gsap.fromTo(
          buttonContainer,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.15 + 0.3,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: buttonContainer,
              start: "top 90%",
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
      className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white pt-2 md:pt-12 pb-16 px-4 font-inter"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
            Choose Your Plan
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Flexible pricing options designed for your needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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

  return (
    <div className="flex flex-col">
      <div ref={cardRef}>
        <Card className="relative bg-white border border-gray-200 overflow-hidden group hover:border-[#054F56]/30 hover:shadow-2xl transition-all duration-500 h-[750px] flex flex-col justify-between w-full">
          <div className="relative p-8 md:p-10 flex flex-col h-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">{data.title}</h3>

            <div className="flex gap-2 mb-8 flex-wrap h-[60px] items-start">
              {(Object.keys(data.packages) as PackageTier[]).map((tier) => {
                const pkg = data.packages[tier]
                const isSelected = selectedPackage === tier
                return (
                  <button
                    key={tier}
                    onClick={() => setSelectedPackage(tier)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isSelected ? "bg-[#054F56] text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {pkg.icon && <span className={isSelected ? "text-white" : "text-[#054F56]"}>{pkg.icon}</span>}
                    <span>{pkg.name}</span>
                    {pkg.popular && (
                      <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                        Most Popular
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="text-center mb-8 h-[140px] flex flex-col justify-center">
              <div
                key={`${selectedPackage}-${currentPlan.price}`}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-2 tracking-tight animate-in fade-in slide-in-from-top-4 duration-700"
              >
                {currentPlan.price}
              </div>
              {currentPlan.priceRange && <div className="text-sm text-gray-500 mb-2">{currentPlan.priceRange}</div>}
              <div className="text-gray-500 text-base font-medium tracking-wide mb-3">
                {plan === "subscription" ? "per month" : currentPlan.period}
              </div>
              {currentPlan.description && <p className="text-sm text-gray-600 italic">{currentPlan.description}</p>}
            </div>

            <div className="space-y-4 mb-10 flex-1 h-[280px] pr-2">
              {currentPlan.features.map((feature, index) => (
                <div
                  key={`${plan}-${selectedPackage}-${index}`}
                  className="flex items-start gap-3 text-gray-700 animate-in fade-in slide-in-from-left-2"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationDuration: "500ms",
                    animationFillMode: "both",
                  }}
                >
                  <div className="w-5 h-5 rounded-full bg-[#054F56] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-sm leading-relaxed font-normal">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-1 mb-8">
              <button
                onClick={() => setPlan(plan === "oneTime" ? "subscription" : "oneTime")}
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                  plan === "subscription" ? "bg-[#054F56]" : "bg-gray-300"
                }`}
                aria-label="Toggle pricing plan"
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    plan === "subscription" ? "translate-x-9" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium transition-colors ${
                  plan === "subscription" ? "text-gray-900" : "text-gray-400"
                }`}
              >
                Subscription
              </span>
            </div>
          </div>
        </Card>
      </div>

      <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
        <Button className="w-full sm:w-1/2 h-14 bg-[#054F56] text-white hover:bg-[#043940] font-semibold text-sm transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
          Schedule a Meeting
        </Button>

        <a href="https://t.me/itslucki" target="_blank" rel="noopener noreferrer" className="w-full sm:w-1/2">
          <Button
            variant="outline"
            className="w-full h-14 bg-white border-2 border-[#054F56] text-[#054F56] hover:bg-[#054F56] hover:text-white font-semibold text-sm transition-all duration-300 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            Connect on Telegram
          </Button>
        </a>
      </div>
    </div>
  )
}
