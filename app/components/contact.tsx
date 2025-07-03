"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Instagram, Linkedin, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { openGoogleCalendar } from "@/lib/calendar-utils"

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error"
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  })

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      info: "(11) 95330-3112",
      link: "tel:+551195330-3112",
    },
    {
      icon: Mail,
      title: "E-mail",
      info: "contato@kellyamorim.com.br",
      link: "mailto:contato@kellyamorim.com.br",
    },
    {
      icon: MapPin,
      title: "Endereço",
      info: "Rua Catequese, 1.171 - Santo André/SP",
      link: "https://maps.app.goo.gl/UjDc7zCeX6drD8mq8",
    },
    {
      icon: Clock,
      title: "Horário",
      info: "Seg-Sex: 8h às 20h",
      link: null,
    },
  ]

  const socialLinks = [
    { icon: Instagram, link: "https://www.instagram.com/kellyreis.psico/", label: "Instagram" },
    { icon: Linkedin, link: "https://www.linkedin.com/in/psico-kelly-reis/", label: "LinkedIn" },
  ]

  const handleScheduleConsultation = () => {
    openGoogleCalendar({
      title: "Consulta Psicológica - Dra. Kelly Amorim",
      details:
        "Consulta psicológica com a Dra. Kelly Amorim. Por favor, confirme o horário por WhatsApp: (11) 95330-3112",
      duration: 50,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica - apenas nome, email e mensagem são obrigatórios
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: "error",
        message: "Por favor, preencha os campos obrigatórios: Nome, E-mail e Mensagem.",
      })
      return
    }

    setStatus({ type: "loading", message: "Enviando mensagem..." })

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Mensagem enviada com sucesso! Retornarei o contato em breve.",
        })

        // Limpar formulário
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        setStatus({
          type: "error",
          message: result.error || "Erro ao enviar mensagem. Tente novamente.",
        })
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erro de conexão. Verifique sua internet e tente novamente.",
      })
    }
  }

  return (
    <section
      id="contato"
      className="py-12 sm:py-16 lg:py-20 bg-primary-50/50 backdrop-blur-sm px-4 pt-24 md:pt-24 lg:pt-20"
    >
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 lg:mb-6">Entre em Contato</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Estou aqui para ajudar você. Entre em contato para agendar sua consulta ou esclarecer suas dúvidas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            className="fade-in order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl text-gray-800">Envie uma Mensagem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 lg:space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome *"
                      className="custom-input text-sm lg:text-base"
                      required
                    />
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Seu e-mail *"
                      type="email"
                      className="custom-input text-sm lg:text-base"
                      required
                    />
                  </div>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Telefone (opcional)"
                    className="custom-input text-sm lg:text-base"
                  />
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Assunto (opcional)"
                    className="custom-input text-sm lg:text-base"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Sua mensagem... *"
                    className="custom-textarea min-h-[100px] lg:min-h-[120px] text-sm lg:text-base"
                    required
                  />

                  {/* Status Message */}
                  {status.type !== "idle" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                        status.type === "success"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : status.type === "error"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {status.type === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
                      {status.type === "success" && <CheckCircle className="w-4 h-4" />}
                      {status.type === "error" && <AlertCircle className="w-4 h-4" />}
                      {status.message}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={status.type === "loading"}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status.type === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Mensagem"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="fade-in space-y-4 lg:space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4 p-3 lg:p-4 bg-white/80 backdrop-blur-sm rounded-lg hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="bg-primary-100 rounded-full w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center flex-shrink-0">
                    {item.icon && <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary-600" />}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm lg:text-base">{item.title}</h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-gray-600 hover:text-primary-600 transition-colors text-sm lg:text-base break-words"
                      >
                        {item.info}
                      </a>
                    ) : (
                      <p className="text-gray-600 text-sm lg:text-base">{item.info}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-6 justify-center lg:justify-start">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  className="bg-primary-600 text-white rounded-full w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center hover:bg-primary-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon && <social.icon className="w-4 h-4 lg:w-5 lg:h-5" />}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Full Width */}
        <motion.div
          className="mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-8 lg:py-12 px-6 rounded-lg">
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">Pronto para começar?</h3>
              <p className="text-base sm:text-lg lg:text-xl mb-6 lg:mb-8 opacity-90">
                Agende sua primeira consulta e dê o primeiro passo para uma vida mais equilibrada.
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={handleScheduleConsultation}
                className="bg-white text-primary-600 hover:bg-gray-100 text-sm sm:text-base lg:text-lg px-8 lg:px-12 py-3 lg:py-4 font-semibold"
              >
                Agendar Agora
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
