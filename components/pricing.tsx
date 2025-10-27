"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

type PricingPlan = "oneTime" | "subscription"

interface PricingCardData {
  title: string
  oneTime: {
    price: string
    period: string
    features: string[]
  }
  subscription: {
    price: string
    period: string
    features: string[]
  }
}

const pricingData: PricingCardData[] = [
  {
    title: "Web dev",
    oneTime: {
      price: "$5,000",
      period: "One-Time Payment",
      features: [
        "2 design concepts",
        "Updates every 48 hours",
        "Desktop, Tablet, Mobile Responsive Design",
        "1 month free support",
        "Source code ownership",
        "Wireframes + custom layout",
        "Framer development +",
        "+$200 for each extra page",
      ],
    },
    subscription: {
      price: "$500",
      period: "per month",
      features: [
        "All one time features+",
        "Weekly progress meetings",
        "Monthly updates",
        "Constant lightning fast support",
        "Source code ownership after 12 months",
        "No extra payments for adding pages",
      ],
    },
  },
  {
    title: "Product Design",
    oneTime: {
      price: "$3,500",
      period: "One-Time Payment",
      features: [
        "2 design concepts",
        "Weekly updates",
        "Mobile app plus admin dashboard",
        "1-3 Months delivery",
        "Launching your app on App Store and Play Store",
        "1 month free support",
        "Communication through Slack, Loom and Meetings",
      ],
    },
    subscription: {
      price: "$350",
      period: "per month",
      features: [
        "All one time features+",
        "Weekly progress meetings + 2 weekly updates",
        "Unlimited changes",
        "Monthly updates",
        "Constant lightning fast support",
        "Source code ownership after 18 months",
      ],
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
      // Animate pricing cards with upward shake/bounce effect
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

      // Animate buttons with upward bounce effect
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
  const currentPlan = data[plan]

  return (
    <div className="flex flex-col">
      <div ref={cardRef}>
        <Card className="relative bg-white border border-gray-200 overflow-hidden group hover:border-[#054F56]/30 hover:shadow-2xl transition-all duration-500 min-h-[700px] flex flex-col">
          <div className="relative p-8 md:p-10 flex flex-col h-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight leading-tight">{data.title}</h3>

            {/* Pricing */}
            <div className="text-center mb-12">
              <div
                key={currentPlan.price}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-3 tracking-tight animate-in fade-in slide-in-from-top-4 duration-700"
              >
                {currentPlan.price}
              </div>
              <div className="text-gray-500 text-base font-medium tracking-wide">
                {plan === "subscription" ? "per month" : "one time"}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-10 flex-1 min-h-[280px]">
              {currentPlan.features.map((feature, index) => (
                <div
                  key={`${plan}-${index}`}
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
            <div className="flex items-center justify-center gap-3 mb-8">
              <span
                className={`text-sm font-medium transition-colors ${plan === "oneTime" ? "text-gray-900" : "text-gray-400"}`}
              >
                One-Time
              </span>
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
                className={`text-sm font-medium transition-colors ${plan === "subscription" ? "text-gray-900" : "text-gray-400"}`}
              >
                Subscription
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
        {/* Schedule a Meeting Button */}
        <Button className="w-full sm:w-1/2 h-14 bg-[#054F56] text-white hover:bg-[#043940] font-semibold text-sm transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
          Schedule a Meeting
        </Button>

        {/* Connect on Telegram Button */}
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
