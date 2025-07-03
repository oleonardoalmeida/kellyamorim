"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Miguel Leonardo",
      age: 32,
      text: "O atendimento da Dra. Kelly foi excepcional. Desde a primeira sessão, senti-me acolhido, ouvido e respeitado. Sua escuta atenta, empática e profissionalismo fizeram toda a diferença no meu processo de autoconhecimento e superação. Recomendo com total confiança!",
      rating: 5,
    },
    {
      name: "José Vitor",
      age: 28,
      text: "A melhor psicologa! Cada sessão é uma reflexão e um insight diferente. Quando comecei o atendimento há 2 anos, nunca achei que estaria bem do jeito que estou hoje e, com a ajuda dela, a cada dia mais estou evoluindo e me entendendo melhor!",
      rating: 5,
    },
    {
      name: "Yuri Morais",
      age: 45,
      text: "Encontrar Kelly como profissional foi um divisor de águas, eu não tinha o hábito de partilhar ou vontade de tratar a mente, hoje a terapia é atividade significativa na minha construção pessoal. Kelly é uma excelente profissional, extremamente competente e interativa!",
      rating: 5,
    },
    {
      name: "Viviane Araujo",
      age: 35,
      text: "Conheci a Kelly através de uma postagem no Instagram de uma 3ª pessoa. Mandei mensagem questionando de como era a terapia, ela sanou todas as minhas dúvidas e marcamos nossa primeira sessão.E que sessão maravilhosa, acolhedora, paciente, e carinhosa.",
      rating: 5,
    },
  ]

  return (
    <section
      id="depoimentos"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary-50 to-secondary-50 px-4 pt-24 md:pt-24 lg:pt-20"
    >
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 lg:mb-6">Depoimentos</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Veja o que meus pacientes dizem sobre o tratamento e como a terapia transformou suas vidas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="fade-in"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="h-full bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="w-6 h-6 lg:w-8 lg:h-8 text-primary-500 mr-2" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 italic text-sm lg:text-base">"{testimonial.text}"</p>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-800 text-sm lg:text-base">{testimonial.name}</h4>
                    <p className="text-xs lg:text-sm text-gray-500">{testimonial.age} anos</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
