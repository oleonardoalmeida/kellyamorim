// Função para gerar link do Google Calendar
export function generateGoogleCalendarLink({
  title = "Consulta Psicológica - Dra. Kelly Amorim",
  details = "Sessão de terapia com a Dra. Kelly Amorim, psicóloga especializada em terapia analítico-comportamental.",
  location = "Rua Catequese, 1.171 - Santo André/SP",
  duration = 50,
}: {
  title?: string
  details?: string
  location?: string
  duration?: number
} = {}) {
  const nextMonday = new Date()
  const daysUntilMonday = (1 + 7 - nextMonday.getDay()) % 7 || 7
  nextMonday.setDate(nextMonday.getDate() + daysUntilMonday)
  nextMonday.setHours(14, 0, 0, 0)

  const endDate = new Date(nextMonday.getTime() + duration * 60000)

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  const startTime = formatDate(nextMonday)
  const endTime = formatDate(endDate)

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${startTime}/${endTime}`,
    details: details,
    location: location,
    trp: "false",
  })

  return `https://calendar.app.google/3qXxtzemqAufMVhB9`
}

// Função para abrir o Google Calendar
export function openGoogleCalendar(options?: Parameters<typeof generateGoogleCalendarLink>[0]) {
  const url = generateGoogleCalendarLink(options)
  window.open(url, "_blank", "noopener,noreferrer")
}
