async function sendZapApiMessage(phoneNumber: string, text: string) {
  const token = process.env.ZAP_API_TOKEN;
  const url = process.env.ZAP_API_URL;

  if (!token || !url) {
    throw new Error("Token da API ZAP não configurado.");
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        number: phoneNumber,
        body: text,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error(`Falha ao enviar mensagem para ${phoneNumber} pela ZAP API:`, errorBody);
      throw new Error(`A API da ZAP retornou o status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na função sendZapApiMessage:", error);
    throw error;
  }
}

async function sendEvolutionApiMessage(phoneNumber: string, text: string) {
  const url = process.env.EVOLUTION_API_URL;
  const apiKey = process.env.EVOLUTION_API_KEY;

  if (!url || !apiKey) {
    throw new Error("Variáveis de ambiente da API Evolution não configuradas.");
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
      console.error(`Falha ao enviar mensagem para ${phoneNumber} pela Evolution API:`, errorBody.response);
      throw new Error(`A API da Evolution retornou o status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na função sendEvolutionApiMessage:", error);
    throw error;
  }
}

export async function sendWhatsappMessage(phoneNumber: string, text: string) {
  try {
    console.log("Tentando enviar via ZAP API...");
    return await sendZapApiMessage(phoneNumber, text);
  } catch (error) {
    console.warn("Falha ao enviar pela ZAP API. Tentando fallback com Evolution API...", error);
    try {
      console.log("Tentando enviar via Evolution API...");
      return await sendEvolutionApiMessage(phoneNumber, text);
    } catch (fallbackError) {
      console.error("Falha ao enviar pela Evolution API também.", fallbackError);
      throw new Error("Ambas as APIs de envio de mensagem falharam.");
    }
  }
}