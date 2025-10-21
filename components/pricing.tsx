"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

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
    title: "Web Design + Development",
    oneTime: {
      price: "$5,000",
      period: "One-Time Payment",
      features: [
        "Custom responsive website design",
        "Modern React/Next.js development",
        "SEO optimization included",
        "Performance optimization",
        "3 months of support",
        "Source code ownership",
      ],
    },
    subscription: {
      price: "$500",
      period: "per month",
      features: [
        "Ongoing design updates",
        "Continuous development support",
        "Monthly performance reports",
        "Priority bug fixes",
        "Unlimited revisions",
        "Dedicated support channel",
      ],
    },
  },
  {
    title: "Product Design",
    oneTime: {
      price: "$3,500",
      period: "One-Time Payment",
      features: [
        "Complete UI/UX design system",
        "Interactive prototypes",
        "User research & testing",
        "Brand identity design",
        "Design documentation",
        "Figma file handoff",
      ],
    },
    subscription: {
      price: "$350",
      period: "per month",
      features: [
        "Monthly design iterations",
        "Continuous UX improvements",
        "A/B testing support",
        "Design system maintenance",
        "Quarterly user research",
        "Priority design requests",
      ],
    },
  },
]

export default function Pricing() {
  return (
    <section className="relative min-h-screen bg-white py-32 px-4">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Flexible pricing options designed for your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {pricingData.map((card, index) => (
            <PricingCard key={index} data={card} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCard({ data }: { data: PricingCardData }) {
  const [plan, setPlan] = useState<PricingPlan>("oneTime")
  const currentPlan = data[plan]

  return (
    <div className="flex flex-col">
      <Card className="relative bg-white border-2 border-[#054F56] overflow-hidden group hover:border-[#054F56]/80 hover:shadow-xl transition-all duration-500">
        <div className="relative p-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-8 tracking-tight leading-tight">{data.title}</h3>

          <div className="flex items-center gap-1 mb-10 bg-gray-100 rounded-full p-1 w-fit mx-auto">
            <button
              onClick={() => setPlan("oneTime")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                plan === "oneTime" ? "bg-[#054F56] text-white shadow-lg" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              One-Time
            </button>
            <button
              onClick={() => setPlan("subscription")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                plan === "subscription" ? "bg-[#054F56] text-white shadow-lg" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Subscription
            </button>
          </div>

          <div className="text-center mb-12">
            <div className="text-6xl font-bold text-gray-900 mb-3 transition-all duration-500 tracking-tight">
              {currentPlan.price}
            </div>
            <div className="text-gray-500 text-sm font-medium tracking-wide">{currentPlan.period}</div>
          </div>

          <div className="space-y-5 mb-10">
            {currentPlan.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 text-gray-700 transition-all duration-300"
                style={{
                  animation: `fadeIn 0.4s ease-out ${index * 0.06}s both`,
                }}
              >
                <div className="w-5 h-5 rounded-full bg-[#054F56] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm leading-relaxed text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button className="flex-1 bg-[#054F56] text-white hover:bg-[#054F56]/90 font-medium py-6 text-sm transition-all duration-300 rounded-lg">
          Schedule a Meeting
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-2 border-[#054F56] text-[#054F56] hover:bg-[#054F56]/5 hover:border-[#054F56]/80 font-medium py-6 text-sm transition-all duration-300 rounded-lg bg-transparent"
        >
          Connect on Telegram
        </Button>
      </div>
    </div>
  )
}
