import Contact from '@/components/contact'
import Footer from '@/components/footer'
import { Hero } from '@/components/hero'
import { NavBar } from '@/components/navbar'
import { Testimonials } from '@/components/testimonials'

import React from 'react'

const Home = () => {
  return (
    <main className='min-h-screen flex flex-col'>
      <NavBar />
      <div className='flex-1'>
      <Hero />
      <Testimonials />
      <Contact />
      </div>
      <Footer />
    </main>
  )
}

export default Home
