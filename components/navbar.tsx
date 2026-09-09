"use client"

import { useEffect, useState } from "react"

export default function NavBar() {
  const [lifted, setLifted] = useState(false)

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="nav" data-lifted={lifted} id="nav">
      <div className="wrap nav-inner">
        <a className="mark" href="#top">
          <span className="orb" aria-hidden="true" /> Noirsfera
        </a>
        <nav className="nav-links">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="btn btn-primary btn-sm" href="#contact">
          Start a project
        </a>
      </div>
    </header>
  )
}
