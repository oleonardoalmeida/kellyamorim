import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Psicóloga Kelly Amorim",
  description:
    "Psicóloga especializada em terapia analitico-comportamental. Cuidando da sua saúde mental com profissionalismo e acolhimento.",
  icons: {
    icon: [
      { url: "/assets/icons/favicon.ico", sizes: "any" }
    ],
  },
  keywords: "psicóloga, terapia, ansiedade, depressão, TCC, saúde mental",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
