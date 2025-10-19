import { Hero } from '@/components/hero'
import { NavBar } from '@/components/navbar'
import { Testimonials } from '@/components/testimonials'
import React from 'react'

const Home = () => {
  return (
    <main className='min-h-screen'>
      <NavBar />
      <Hero />
      <Testimonials />
    </main>
  )
}

export default Home
