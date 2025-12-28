"use client"

import type React from "react"
import  NavBar  from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import Portfolio from "@/components/portfolio"
import Pricing from "@/components/pricing"
import { Testimonials } from "@/components/testimonials"
import FAQ from "@/components/faq"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

const Page: React.FC = () => {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <section className="w-full">
        <Hero />
      </section>

      {/* Services Section */}
      <section className="w-full">
        <Services />
      </section>

      {/* Portfolio Section */}
      <section className="w-full">
        <Portfolio />
      </section>

      {/* Pricing Section */}
      <section className="w-full">
        <Pricing />
      </section>

      {/* Testimonials Section */}
      <section className="w-full">
        <Testimonials />
      </section>

      {/* FAQ Section */}
      <section className="w-full">
        <FAQ />
      </section>

      {/* Contact Section */}
      <section className="w-full">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

export default Page
