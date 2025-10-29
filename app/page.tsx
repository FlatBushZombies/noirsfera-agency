"use client"

import type React from "react"
import Contact from "@/components/contact"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"
import { Hero } from "@/components/hero"
import { NavBar } from "@/components/navbar"
import Portfolio from "@/components/portfolio"
import Pricing from "@/components/pricing"
import { Services } from "@/components/services"
import { Testimonials } from "@/components/testimonials"

const Home: React.FC = () => {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Navbar & Banner */}
      <NavBar />

      {/* Page Content Wrapper */}
      <div className="flex-1 flex flex-col w-full px-4 sm:px-6 lg:px-16">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center justify-center pt-8 md:pt-16">
          <Hero />
        </section>

        {/* Services Section */}
        <section className="w-full flex flex-col items-center justify-center py-16 md:py-24 lg:py-32">
          <Services />
        </section>

        {/* Portfolio Section - Full Width */}
        <section className="w-screen flex flex-col items-center justify-center py-16 md:py-24 lg:py-32 -ml-4 sm:-ml-6 lg:-ml-16 -mr-4 sm:-mr-6 lg:-mr-16">
          <Portfolio />
        </section>

        {/* Pricing Section */}
        <section className="w-full flex flex-col items-center justify-center py-8 md:py-16 lg:py-32">
          <Pricing />
        </section>

        {/* Testimonials Section - Full Width */}
        <section className="w-screen flex flex-col items-center justify-center py-8 md:py-16 lg:py-32 -ml-4 sm:-ml-6 lg:-ml-16 -mr-4 sm:-mr-6 lg:-mr-16">
          <Testimonials />
        </section>

        {/* FAQ Section */}
        <section className="w-full flex flex-col items-center justify-center py-16 md:py-24 lg:py-32">
          <FAQ />
        </section>

        {/* Contact Section */}
        <section className="w-full flex flex-col items-center justify-center pt-8 md:pt-16 lg:pt-24 pb-20 md:pb-18 lg:pb-24">
          <Contact />
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}

export default Home
