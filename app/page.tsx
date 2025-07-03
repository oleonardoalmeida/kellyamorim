"use client"

import { useEffect, useState } from "react"
import Hero from "./components/hero"
import About from "./components/about"
import Services from "./components/services"
import Testimonials from "./components/testimonials"
import Contact from "./components/contact"
import Navigation from "./components/navigation"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsLoaded(true)
  }, [])

  return (
    <div>
      <div id="inicio" className="absolute top-0 left-0 w-full"></div>

      <Navigation />

      <div id="main-content" style={{ paddingTop: "64px" }}>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </div>
    </div>
  )
}
