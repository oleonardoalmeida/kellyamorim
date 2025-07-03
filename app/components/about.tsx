"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Award, BookOpen, Users } from "lucide-react"

export default function About() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    const checkScreenSize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768)
        setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  const qualifications = [
    {
      icon: GraduationCap,
      title: "Formação Acadêmica",
      description:
        "Graduada em Psicologia pela Universidade Nove de Julho, com especialização em terapia analítico-comportamental e ABA (Applied Behavior Analysis) pelo CBI of Miami.",
    },
    {
      icon: Award,
      title: "Certificações",
      description: "Certificada em ABA no TEA pelo Instituto Neuro, também em Professional Crisis Management pela PCM Association.",
    },
    {
      icon: BookOpen,
      title: "Abordagem Terapêutica",
      description: "Utilizo técnicas baseadas em evidências científicas, focando no presente e em soluções práticas.",
    },
    {
      icon: Users,
      title: "Experiência Clínica",
      description: "Mais de 2 anos atendendo adolescentes e adultos em consultório particular e clínicas.",
    },
  ]

  // Configurações responsivas da foto
  const getPhotoConfig = () => {
    if (isMobile) {
      return {
        width: "300px",
        height: "380px",
        containerClass: "flex justify-center mb-8",
      }
    } else if (isTablet) {
      return {
        width: "350px",
        height: "420px",
        containerClass: "flex justify-center", // Centralizado no tablet
      }
    } else {
      return {
        width: "420px",
        height: "500px",
        containerClass: "flex justify-end pr-12",
      }
    }
  }

  const photoConfig = getPhotoConfig()

  return (
    <section
      id="sobre"
      className="py-12 sm:py-16 lg:py-20 bg-primary-50/50 backdrop-blur-sm relative px-4 pt-24 md:pt-24 lg:pt-20"
    >
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 lg:mb-6">Sobre Mim</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Sou Kelly Amorim, psicóloga dedicada a ajudar pessoas a superarem desafios emocionais e desenvolverem uma
            vida mais equilibrada e significativa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* 🎯 FOTO INTEGRADA NO ABOUT */}
          <div ref={ref} className={`order-1 lg:order-1 ${photoConfig.containerClass}`}>
            <motion.div
              className="about-photo relative"
              style={{
                width: photoConfig.width,
                height: photoConfig.height,
              }}
              // 🎯 ANIMAÇÃO DE ENTRADA DIFERENTE - SLIDE + FADE
              initial={{
                opacity: 0,
                x: isMobile ? 0 : 150,
                y: isMobile ? 100 : 0,
                scale: 0.8,
                rotateY: isMobile ? 0 : 25,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                      rotateY: 0,
                    }
                  : {}
              }
              transition={{
                duration: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 80,
                damping: 20,
              }}
            >
              <div className="relative w-full h-full">
                {/* Backgrounds decorativos com animação diferente */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tl from-secondary-200 to-primary-200 rounded-3xl transform -rotate-3 opacity-40"
                  initial={{ rotate: -20, scale: 0.7, opacity: 0 }}
                  animate={isInView ? { rotate: -3, scale: 1, opacity: 0.4 } : {}}
                  transition={{ duration: 2, delay: 0.2 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-primary-300 to-secondary-300 rounded-3xl transform rotate-2 opacity-25"
                  initial={{ rotate: 15, scale: 0.8, opacity: 0 }}
                  animate={isInView ? { rotate: 2, scale: 1, opacity: 0.25 } : {}}
                  transition={{ duration: 2.2, delay: 0.4 }}
                />

                {/* Foto principal */}
                <motion.div
                  className="relative w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden"
                  initial={{ scale: 0.7, rotate: isMobile ? 0 : -5 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 1.8, delay: 0.3 }}
                >
                  <img
                    src="/assets/foto-kelly-amorim.jpeg"
                    alt="Dra. Kelly Amorim - Psicóloga"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-900/15"></div>

                  {/* Efeito de ondas */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent"
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: "-100%" } : {}}
                    transition={{
                      duration: 3,
                      delay: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 5,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                {/* Elementos decorativos únicos */}
                <motion.div
                  className={`absolute ${isMobile ? "top-2 right-2 w-10 h-10" : isTablet ? "top-3 right-3 w-14 h-14" : "top-4 right-4 w-18 h-18"}`}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={isInView ? { scale: 1, rotate: 180 } : {}}
                  transition={{ duration: 2, delay: 1.2, type: "spring" }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-70">
                    <motion.div
                      className="w-full h-full rounded-full"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className={`absolute ${isMobile ? "bottom-2 left-2 w-8 h-8" : isTablet ? "bottom-3 left-3 w-12 h-12" : "bottom-4 left-4 w-16 h-16"}`}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={isInView ? { scale: 1, rotate: -180 } : {}}
                  transition={{ duration: 2.5, delay: 1.5, type: "spring" }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-400 to-purple-500 opacity-60">
                    <motion.div
                      className="w-full h-full rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>

                {/* Info card com animação diferente */}
                <motion.div
                  className={`absolute ${isMobile ? "bottom-3 left-3 right-3 p-3" : isTablet ? "bottom-4 left-4 right-4 p-4" : "bottom-6 left-6 right-6 p-5"} bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg`}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 1, delay: 1.8 }}
                >
                  <h3
                    className={`font-bold text-gray-800 mb-1 ${isMobile ? "text-base" : isTablet ? "text-lg" : "text-xl"}`}
                  >
                    Dra. Kelly Amorim
                  </h3>
                  <p className={`text-primary-600 font-medium mb-2 ${isMobile ? "text-sm" : "text-base"}`}>
                    CRP 06/188296
                  </p>
                  <p className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}>
                    Especialista em Terapia Analítico-Comportamental
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Cards de qualificações */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 order-2 lg:order-2">
            {qualifications.map((qual, index) => (
              <motion.div
                key={index}
                className="fade-in"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 lg:p-6 flex flex-col items-center text-center">
                    <div className="bg-primary-100 rounded-full w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center mb-3 lg:mb-4">
                      <qual.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary-600" />
                    </div>
                    <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">
                      {qual.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{qual.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
