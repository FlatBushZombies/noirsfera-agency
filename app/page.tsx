import Contact from '@/components/contact'
import FAQ from '@/components/faq'
import Footer from '@/components/footer'
import { Hero } from '@/components/hero'
import { NavBar } from '@/components/navbar'
import Portfolio from '@/components/portfolio'
import Pricing from '@/components/pricing'
import { Services } from '@/components/services'
import { Testimonials } from '@/components/testimonials'

import React from 'react'

const Home = () => {
  return (
    <main className='min-h-screen flex flex-col'>
      <NavBar />
      <div className='flex-1'>
      <Hero />
      <Services />
      <Portfolio />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      </div>
      <Footer />
    </main>
  )
}

export default Home
