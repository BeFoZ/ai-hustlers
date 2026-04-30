const USE_MOCK_API = true
const MOCK_RESPONSE = {
  answer:
    "Це mock-відповідь CampusMate AI. У реальному режимі відповідь буде сформована через RAG + FAISS.",
  sources: [
    {
      category: "Mock RAG",
      question: "Тестове джерело",
      source: "Frontend mock endpoint",
    },
  ],
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function sendChatMessage(message, mode) {
  if (USE_MOCK_API) {
    await delay(900)
    return MOCK_RESPONSE
  }

  // const response = await fetch("http://localhost:8000/api/chat", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ message, mode }),
  // })
  //
  // if (!response.ok) {
  //   throw new Error("Не вдалося надіслати повідомлення")
  // }
  //
  // return response.json()
}
