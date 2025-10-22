"use client";

import React from "react";
import Contact from "@/components/contact";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import { Hero } from "@/components/hero";
import { NavBar } from "@/components/navbar";
import Portfolio from "@/components/portfolio";
import Pricing from "@/components/pricing";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";

const Home: React.FC = () => {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <NavBar />

      {/* Page Content */}
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="w-full min-h-[60vh] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-16">
          <Hero />
        </section>

        {/* Services Section */}
        <section className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16 py-12">
          <Services />
        </section>

        {/* Portfolio Section */}
        <section className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16 py-12">
          <Portfolio />
        </section>

        {/* Pricing Section */}
        <section className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16 py-12">
          <Pricing />
        </section>

        {/* Testimonials Section */}
        <section className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16 py-12">
          <Testimonials />
        </section>

        {/* FAQ Section */}
        <section className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16 py-12">
          <FAQ />
        </section>

        
        <section className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16 py-12">
          <Contact />
        </section>
      </div>

      
      <Footer />
    </main>
  );
};

export default Home;
