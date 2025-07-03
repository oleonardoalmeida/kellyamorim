import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Nome, e-mail e mensagem são obrigatórios" }, { status: 400 })
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 })
    }

    // Email tamplate
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #B08968, #A8834A); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #B08968; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #B08968; }
            .footer { margin-top: 20px; padding: 15px; background: #e8d5c4; border-radius: 4px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📧 Nova Mensagem do Site - Kelly Amorim</h2>
              <p>Você recebeu uma nova mensagem através do formulário de contato</p>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">👤 Nome:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 E-mail:</div>
                <div class="value">${email}</div>
              </div>
              
              ${
                phone
                  ? `
                <div class="field">
                  <div class="label">📱 Telefone:</div>
                  <div class="value">${phone}</div>
                </div>
              `
                  : ""
              }
              
              ${
                subject
                  ? `
                <div class="field">
                  <div class="label">📋 Assunto:</div>
                  <div class="value">${subject}</div>
                </div>
              `
                  : ""
              }
              
              <div class="field">
                <div class="label">💬 Mensagem:</div>
                <div class="value">${message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>📅 Data:</strong> ${new Date().toLocaleString("pt-BR")}</p>
              <p><strong>🌐 Origem:</strong> Site Kelly Amorim - Formulário de Contato</p>
              <p><em>Para responder, utilize o e-mail: ${email}</em></p>
            </div>
          </div>
        </body>
      </html>
    `

    // Enviar e-mail
    const { data, error } = await resend.emails.send({
      from: "Contato Kelly Amorim <contato@kellyamorim.com.br>",
      to: ["kelly.amorim@kellyamorim.com.br"],
      subject: `Nova mensagem do site: ${subject || "Contato"}`,
      html: emailHtml,
      reply_to: email,
    })

    if (error) {
      console.error("Erro do Resend:", error)
      return NextResponse.json(
        {
          error: "Erro ao enviar e-mail. Tente novamente mais tarde.",
          details: process.env.NODE_ENV === "development" ? error : undefined,
        },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "E-mail enviado com sucesso!",
        emailId: data?.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error)

    return NextResponse.json(
      {
        error: "Erro interno do servidor. Tente novamente mais tarde.",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 },
    )
  }
}
