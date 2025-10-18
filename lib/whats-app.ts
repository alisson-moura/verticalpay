export async function sendWhatsappMessage(phoneNumber: string, text: string) {
  const url = process.env.EVOLUTION_API_URL;
  const apiKey = process.env.EVOLUTION_API_KEY;

  if (!url || !apiKey) {
    throw new Error("Variáveis de ambiente da API não configuradas.");
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey,
      },
      body: JSON.stringify({
        number: phoneNumber,
        text: text,
      }),
      cache: 'no-store', 
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error(`Falha ao enviar mensagem para ${phoneNumber}:`, errorBody.response);
      throw new Error(`A API da Evolution retornou o status ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Erro na função sendWhatsappMessage:", error);
    // Re-lança o erro para ser capturado no handler principal
    throw error;
  }
}