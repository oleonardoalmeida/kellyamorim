"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { openGoogleCalendar } from "@/lib/calendar-utils"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    setMounted(true)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const navItems = [
    { href: "#inicio", label: "Início" },
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#contato", label: "Contato" },
  ]

  const handleMenuClick = (href: string) => {
    setIsOpen(false)
    setTimeout(() => {
      if (href === "#inicio") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      } else {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }, 300)
  }

  // Configuração do botão baseada no dispositivo
  const getButtonConfig = () => {
    if (isTablet) {
      return {
        padding: "px-2 py-1.5",
        fontSize: "text-xs",
        text: "Agendar",
      }
    } else {
      return {
        padding: "px-4 py-2",
        fontSize: "text-sm",
        text: "Agendar Consulta",
      }
    }
  }

  const buttonConfig = getButtonConfig()

  const handleScheduleConsultation = () => {
    openGoogleCalendar({
      title: "Consulta Psicológica - Dra. Kelly Amorim",
      details:
        "Consulta psicológica com a Dra. Kelly Amorim. Por favor, confirme o horário por WhatsApp: (11) 95330-3112",
      duration: 50,
    })
  }

  return (
    <>
      {/* OVERLAY */}
      <AnimatePresence>
        {mounted && isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* NAVIGATION BAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50"
      >
        <div className="flex items-center justify-between h-full px-4 max-w-6xl mx-auto">
          {/* LOGO */}
          <motion.div whileHover={{ scale: 1.05 }} className="text-xl font-bold text-primary-600 cursor-pointer">
            Kelly Amorim
          </motion.div>

          {mounted && !isMobile && (
            <div className="flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.button
                onClick={handleScheduleConsultation}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className={`${buttonConfig.padding} ${buttonConfig.fontSize} bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors`}
              >
                {buttonConfig.text}
              </motion.button>
            </div>
          )}

          {mounted && isMobile && (
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 border-2 border-primary-600 rounded-lg text-primary-600 font-bold"
            >
              {isOpen ? "✕" : "☰"}
            </motion.button>
          )}
        </div>
      </motion.nav>

      <AnimatePresence>
        {mounted && isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-20 left-4 right-4 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-50"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => handleMenuClick(item.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
                className="block py-3 px-4 text-gray-700 font-medium text-center rounded-lg mb-2 transition-all"
              >
                {item.label}
              </motion.a>
            ))}

            <motion.button
              onClick={handleScheduleConsultation}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="w-full mt-4 py-3 px-4 bg-primary-600 text-white text-center rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Agendar Consulta
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
