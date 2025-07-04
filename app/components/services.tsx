"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Heart, Users, Zap, Clock, Shield } from "lucide-react"
import { openGoogleCalendar } from "@/lib/calendar-utils"

export default function Services() {
  const services = [
    {
      icon: Brain,
      title: "Terapia Individual (Online)",
      description: "Sessões personalizadas para tratar ansiedade, depressão, fobias e outros transtornos emocionais.",
      duration: "50 minutos",
      price: "R$ 120",
      features: ["Avaliação inicial", "Plano terapêutico", "Técnicas de TCC", "Acompanhamento contínuo"],
    },
    {
      icon: Zap,
      title: "Terapia Individual (Presencial)",
      description: "Atendimento psicológico por videoconferência com a mesma qualidade do presencial.",
      duration: "50 minutos",
      price: "R$ 150",
      features: ["Plataforma segura", "Flexibilidade de horários", "Mesma eficácia", "Conforto de casa"],
    },
    {
      icon: Heart,
      title: "Terapia de Casal",
      description: "Fortalecimento de relacionamentos através de comunicação efetiva e resolução de conflitos.",
      duration: "60 minutos",
      price: "R$ 200",
      features: ["Dinâmica relacional", "Comunicação assertiva", "Resolução de conflitos", "Planejamento conjunto"],
    },
  ]

  const handleScheduleService = (serviceTitle: string, duration: number, price: string) => {
    openGoogleCalendar({
      title: `${serviceTitle} - Dra. Kelly Amorim`,
      details: `Sessão de ${serviceTitle.toLowerCase()} com a Dra. Kelly Amorim. Valor: ${price}. Por favor, confirme o horário por WhatsApp: (11) 95330-3112`,
      duration: duration === 50 ? 50 : 60,
    })
  }

  return (
    <section id="servicos" className="py-12 sm:py-16 lg:py-20 px-4 pt-24 md:pt-24 lg:pt-20">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 lg:mb-6">Serviços Oferecidos</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Ofereço diferentes modalidades de atendimento psicológico, sempre com foco na sua necessidade específica e
            bem-estar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="fade-in"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm flex flex-col">
                <CardHeader className="text-center pb-4">
                  <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg lg:text-xl text-gray-800">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex flex-col flex-grow p-4 lg:p-6">
                  <p className="text-gray-600 text-sm">{service.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration}
                    </div>
                    <div className="text-primary-600 font-semibold">{service.price}</div>
                  </div>

                  <div className="space-y-2 flex-grow">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <Shield className="w-3 h-3 mr-2 text-secondary-500 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() =>
                      handleScheduleService(service.title, Number.parseInt(service.duration), service.price)
                    }
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white mt-auto text-sm lg:text-base"
                  >
                    Agendar Consulta
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
