import { sendWhatsappMessage } from "@/lib/whats-app";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, email, telefone, mensagem } = body;

    // Validação dos dados recebidos do formulário de suporte
    if (!nome || !email || !telefone || !mensagem) {
      return NextResponse.json(
        {
          success: false,
          error: "Nome, e-mail, telefone e mensagem são obrigatórios.",
        },
        { status: 400 }
      );
    }

    // --- 1. Mensagem para a Equipe de Suporte (Notificação Interna) ---
    const internalPhoneNumber = process.env.VERTICAL_PHONE; // Ou use uma variável de ambiente específica para suporte, ex: process.env.VERTICAL_SUPPORT_PHONE
    if (!internalPhoneNumber) {
      console.error("Número para notificação de suporte não configurado.");
      return NextResponse.json(
        {
          success: false,
          error: "Número para notificação interna não configurado.",
        },
        { status: 500 }
      );
    }

    const internalMessage = `
*🆘 Novo Pedido de Suporte Recebido! 🆘*

Um cliente entrou em contato através do formulário de suporte do site.

*Nome:* ${nome}
*Email:* ${email}
*Telefone/WhatsApp:* ${telefone}

*Mensagem do Cliente:*
${mensagem}
    `.trim();

    // --- 2. Mensagem para o Cliente (Confirmação de Suporte) ---
    const customerMessage = `
Olá, ${nome}! 👋

Recebemos sua solicitação de suporte e agradecemos pelo contato.

Nossa equipe já foi notificada e analisará sua mensagem. Entraremos em contato com você o mais breve possível.

Atenciosamente,
Equipe de Suporte Verticalpay
    `.trim();

    // --- Envio das mensagens ---
    await Promise.all([
      sendWhatsappMessage(internalPhoneNumber, internalMessage),
      sendWhatsappMessage(telefone, customerMessage),
    ]);

    // Retorna uma resposta de sucesso para o frontend
    return NextResponse.json({
      success: true,
      message: "Mensagem de suporte enviada com sucesso!",
    });
  } catch (error) {
    console.error("Erro no endpoint /api/support:", error);

    // Retorna uma resposta de erro genérica para o frontend
    return NextResponse.json(
      {
        success: false,
        error: "Ocorreu um erro ao enviar sua solicitação de suporte.",
      },
      { status: 500 }
    );
  }
}
