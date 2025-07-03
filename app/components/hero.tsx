"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Star, Users } from "lucide-react"
import { openGoogleCalendar } from "@/lib/calendar-utils"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768)
        setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    setIsLoaded(true)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  // Função para scroll suave para serviços
  const scrollToServices = () => {
    const servicesSection = document.getElementById("servicos")
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Função para agendar consulta
  const handleScheduleConsultation = () => {
    openGoogleCalendar({
      title: "Primeira Consulta - Dra. Kelly Amorim",
      details:
        "Primeira sessão de terapia com a Dra. Kelly Amorim. Por favor, confirme o horário por WhatsApp: (11) 95330-3112",
      duration: 50,
    })
  }

  // Configurações responsivas da foto
  const getPhotoConfig = () => {
    if (isMobile) {
      return {
        width: "260px", // Reduzido
        height: "320px", // Reduzido
        containerClass: "flex justify-center mb-4", // Margem menor
      }
    } else if (isTablet) {
      return {
        width: "320px",
        height: "400px",
        containerClass: "flex justify-center", // Mudou de justify-end para justify-center
      }
    } else {
      return {
        width: "400px",
        height: "480px",
        containerClass: "flex justify-end",
      }
    }
  }

  const photoConfig = getPhotoConfig()

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4 relative">
      <div className="container mx-auto">
        {/* 🎯 LAYOUT MOBILE OTIMIZADO */}
        <div
          className={`${isMobile ? "flex flex-col items-center space-y-6" : "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"}`}
        >
          {/* 🎯 FOTO PRIMEIRO NO MOBILE */}
          <div className={`${isMobile ? "order-1 w-full" : "order-1 lg:order-2"} ${photoConfig.containerClass}`}>
            <motion.div
              className="hero-photo relative"
              style={{
                width: photoConfig.width,
                height: photoConfig.height,
                zIndex: 1, // Z-index baixo para não interferir no menu
              }}
              // 🎯 ANIMAÇÃO DE ENTRADA ESPETACULAR
              initial={{
                opacity: 0,
                scale: 0.3,
                rotate: -45,
                y: -200,
                x: isMobile ? 0 : 200,
              }}
              animate={{
                opacity: isLoaded ? 1 : 0,
                scale: isLoaded ? 1 : 0.3,
                rotate: isLoaded ? 0 : -45,
                y: isLoaded ? 0 : -200,
                x: isLoaded ? 0 : isMobile ? 0 : 200,
              }}
              transition={{
                duration: 1.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.8,
              }}
            >
              <div className="relative w-full h-full">
                {/* Backgrounds decorativos */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl transform rotate-6 opacity-50"
                  style={{ zIndex: 1 }}
                  initial={{ rotate: 20, scale: 0.8 }}
                  animate={isLoaded ? { rotate: 6, scale: 1 } : {}}
                  transition={{ duration: 2, delay: 1.1 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-300 to-secondary-300 rounded-2xl transform -rotate-3 opacity-30"
                  style={{ zIndex: 1 }}
                  initial={{ rotate: -15, scale: 0.9 }}
                  animate={isLoaded ? { rotate: -3, scale: 1 } : {}}
                  transition={{ duration: 2.2, delay: 1.3 }}
                />

                {/* Foto principal */}
                <motion.div
                  className="relative w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden"
                  style={{ zIndex: 2 }}
                  initial={{ scale: 0.8, rotate: 10 }}
                  animate={isLoaded ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 1.5, delay: 1.2 }}
                >
                  <img
                    src="/assets/foto-kelly-amorim.jpeg"
                    alt="Dra. Kelly Amorim - Psicóloga"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/10 to-transparent"></div>

                  {/* Efeito de brilho */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    style={{ zIndex: 3 }}
                    initial={{ x: -100, opacity: 0 }}
                    animate={isLoaded ? { x: 100, opacity: 1 } : {}}
                    transition={{
                      duration: 2,
                      delay: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 4,
                      ease: "linear",
                    }}
                  />
                </motion.div>

                {/* Elementos flutuantes */}
                <motion.div
                  className={`absolute ${isMobile ? "-top-1 -right-1 w-6 h-6" : isTablet ? "-top-2 -right-2 w-12 h-12" : "-top-4 -right-4 w-20 h-20"} bg-primary-500 rounded-full opacity-30`}
                  style={{ zIndex: 4 }}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={isLoaded ? { scale: 1, rotate: 360 } : {}}
                  transition={{ duration: 2, delay: 1.8, ease: "backOut" }}
                >
                  <motion.div
                    className="w-full h-full rounded-full bg-gradient-to-br from-primary-400 to-primary-600"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                <motion.div
                  className={`absolute ${isMobile ? "-bottom-1 -left-1 w-5 h-5" : isTablet ? "-bottom-2 -left-2 w-10 h-10" : "-bottom-6 -left-6 w-16 h-16"} bg-secondary-500 rounded-full opacity-25`}
                  style={{ zIndex: 4 }}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={isLoaded ? { scale: 1, rotate: -360 } : {}}
                  transition={{ duration: 2.5, delay: 2.1, ease: "backOut" }}
                >
                  <motion.div
                    className="w-full h-full rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600"
                    animate={{ y: [0, 15, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </motion.div>

                {/* Badge CRP */}
                <motion.div
                  className={`absolute ${isMobile ? "top-1 -left-1 p-1.5" : isTablet ? "top-2 -left-2 p-3" : "top-6 -left-6 p-4"} bg-white rounded-full shadow-lg`}
                  style={{ zIndex: 5 }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isLoaded ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 1.5, delay: 2.3, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="text-center">
                    <div className={`text-primary-600 font-bold ${isMobile ? "text-xs" : "text-sm"}`}>CRP</div>
                    <div className="text-gray-600 text-xs">06/188296</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* 🎯 CONTEÚDO TEXTO - APROXIMADO NO MOBILE */}
          <motion.div
            className={`text-center lg:text-left ${isMobile ? "order-2 w-full px-4" : "order-2 lg:order-1 w-full mt-80 md:mt-0"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className={`font-bold text-gray-800 mb-4 lg:mb-6 ${isMobile ? "text-2xl" : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Cuidando da sua
              <span className="text-primary-600 block">Saúde Mental</span>
            </motion.h1>

            <motion.p
              className={`text-gray-600 mb-6 lg:mb-8 max-w-xl mx-auto lg:mx-0 ${isMobile ? "text-sm px-2" : "text-base sm:text-lg md:text-xl"}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Psicóloga especializada em terapia analitico-comportamental, oferecendo um espaço seguro para seu
              bem-estar emocional.
            </motion.p>

            <motion.div
              className={`flex flex-col sm:flex-row gap-3 lg:gap-4 mb-6 lg:mb-12 justify-center lg:justify-start ${isMobile ? "px-2" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button
                size={isMobile ? "default" : "lg"}
                onClick={handleScheduleConsultation}
                className={`bg-primary-600 hover:bg-primary-700 text-white w-full sm:w-auto ${isMobile ? "text-sm px-4 py-2" : "text-sm sm:text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4"}`}
              >
                Agendar Primeira Consulta
              </Button>
              <Button
                size={isMobile ? "default" : "lg"}
                variant="outline"
                onClick={scrollToServices}
                className={`border-primary-300 text-primary-700 hover:bg-primary-50 bg-transparent w-full sm:w-auto ${isMobile ? "text-sm px-4 py-2" : "text-sm sm:text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4"}`}
              >
                Conhecer Serviços
              </Button>
            </motion.div>

            <motion.div
              className={`grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 justify-items-center lg:justify-items-start ${isMobile ? "px-2" : ""}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.div
                className="text-center lg:text-left"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className={`bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 lg:mb-4 shadow-lg mx-auto lg:mx-0 ${isMobile ? "w-10 h-10" : "w-12 h-12 lg:w-16 lg:h-16"}`}
                >
                  <Heart className={`text-primary-500 ${isMobile ? "w-5 h-5" : "w-6 h-6 lg:w-8 lg:h-8"}`} />
                </div>
                <h3 className={`font-bold text-gray-800 ${isMobile ? "text-lg" : "text-xl lg:text-2xl"}`}>100+</h3>
                <p className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm lg:text-base"}`}>Pacientes Atendidos</p>
              </motion.div>

              <motion.div
                className="text-center lg:text-left"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className={`bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 lg:mb-4 shadow-lg mx-auto lg:mx-0 ${isMobile ? "w-10 h-10" : "w-12 h-12 lg:w-16 lg:h-16"}`}
                >
                  <Star className={`text-primary-500 ${isMobile ? "w-5 h-5" : "w-6 h-6 lg:w-8 lg:h-8"}`} />
                </div>
                <h3 className={`font-bold text-gray-800 ${isMobile ? "text-lg" : "text-xl lg:text-2xl"}`}>2+</h3>
                <p className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm lg:text-base"}`}>Anos de Experiência</p>
              </motion.div>

              <motion.div
                className="text-center lg:text-left"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className={`bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 lg:mb-4 shadow-lg mx-auto lg:mx-0 ${isMobile ? "w-10 h-10" : "w-12 h-12 lg:w-16 lg:h-16"}`}
                >
                  <Users className={`text-primary-500 ${isMobile ? "w-5 h-5" : "w-6 h-6 lg:w-8 lg:h-8"}`} />
                </div>
                <h3 className={`font-bold text-gray-800 ${isMobile ? "text-lg" : "text-xl lg:text-2xl"}`}>100%</h3>
                <p className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm lg:text-base"}`}>Taxa de Satisfação</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
