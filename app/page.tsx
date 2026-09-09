"use client"

import type React from "react"
import NavBar from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Metrics } from "@/components/metrics"
import { Services } from "@/components/services"
import Portfolio from "@/components/portfolio"
import Pricing from "@/components/pricing"
import { Testimonials } from "@/components/testimonials"
import FAQ from "@/components/faq"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

const Page: React.FC = () => {
  return (
    <>
      <NavBar />
      <main id="top">
        <Hero />
        <Metrics />
        <Services />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default Page
