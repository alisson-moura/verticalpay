import { NextResponse } from "next/server";
import { sendWhatsappMessage } from "@/lib/whats-app";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, email, telefone, pais, estado, cidade } = body;

    if (!nome || !email || !telefone || !pais || !estado || !cidade) {
      return NextResponse.json(
        {
          success: false,
          error: "Todos os campos do formulário são obrigatórios.",
        },
        { status: 400 }
      );
    }

    // --- 1. Mensagem para a Vertical Pay (Notificação Interna) ---
    const internalPhoneNumber = process.env.VERTICAL_PHONE;
    if (!internalPhoneNumber) {
      console.error("Variável de ambiente VERTICAL_PHONE não configurada.");
      return NextResponse.json(
        {
          success: false,
          error: "Número para notificação interna não configurado.",
        },
        { status: 500 }
      );
    }

    // Mensagem formatada com todos os dados recebidos do formulário
    const internalMessage = `
*🔔 Novo Contato Recebido pelo Site! 🔔*

Um novo lead preencheu o formulário de contato.

*Nome:* ${nome}
*Email:* ${email}
*Telefone/WhatsApp:* ${telefone}
*País:* ${pais}
*Estado:* ${estado}
*Cidade:* ${cidade}
    `.trim();

    // --- 2. Mensagem para o Cliente (Confirmação) ---
    const customerMessage = `
Olá, ${nome}! 👋

Recebemos sua mensagem e agradecemos pelo seu contato com a VerticalPay.

Nossa equipe já foi notificada e entrará em contato com você em breve.

Atenciosamente,
Equipe VerticalPay
    `.trim();

    // --- Envio das mensagens ---
    // Usamos Promise.all para enviar ambas as mensagens em paralelo
    await Promise.all([
      sendWhatsappMessage(internalPhoneNumber, internalMessage),
      sendWhatsappMessage(telefone, customerMessage),
    ]);

    // Retorna uma resposta de sucesso para o frontend
    return NextResponse.json({
      success: true,
      message: "Mensagens enviadas com sucesso!",
    });
  } catch (error) {
    console.error("Erro no endpoint /api/contact:", error);

    // Retorna uma resposta de erro genérica para o frontend
    return NextResponse.json(
      {
        success: false,
        error: "Ocorreu um erro ao processar sua solicitação.",
      },
      { status: 500 }
    );
  }
}
