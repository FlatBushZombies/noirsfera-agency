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
import Banner from "@/components/banner";

const Home: React.FC = () => {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Navbar & Banner */}
      <NavBar />
      <Banner />

      {/* Page Content Wrapper */}
      <div className="flex-1 flex flex-col w-full px-4 sm:px-6 lg:px-16">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center justify-center">
          <Hero />
        </section>

        {/* Services Section */}
        <section className="w-full flex flex-col items-center justify-center pt-6 md:pt-12 pb-16">
          <Services />
        </section>

        {/* Portfolio Section */}
        <section className="w-full flex flex-col items-center justify-center pt-12 pb-16">
          <Portfolio />
        </section>

        
        <section className="w-full flex flex-col items-center justify-center pt-12 pb-16">
          <Pricing />
        </section>

        
        <section className="w-full flex flex-col items-center justify-center pt-12 pb-16">
          <Testimonials />
        </section>

        
        <section className="w-full flex flex-col items-center justify-center pt-12 pb-16">
          <FAQ />
        </section>

        
        <section className="w-full flex flex-col items-center justify-center pt-12 pb-20">
          <Contact />
        </section>
      </div>

      
      <Footer />
    </main>
  );
};

export default Home;
