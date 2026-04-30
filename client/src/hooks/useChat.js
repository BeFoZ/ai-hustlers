import { useEffect, useState } from "react"
import { sendChatMessage } from "../api/chatApi"

const USE_MOCK = true
const MOCK_ANSWER =
  "Це тестова відповідь CampusMate AI. У повній версії відповідь буде сформована на основі RAG + FAISS бази знань."

function getIntroText(mode) {
  if (mode === "applicant") {
    return "Вітаю! Я CampusMate AI. Я допоможу відповісти на питання про вступ, спеціальності та документи."
  }

  if (mode === "freshman") {
    return "Вітаю! Я CampusMate AI. Я допоможу першокурснику з питаннями розкладу, сесії та адаптації."
  }

  return "Вітаю! Я CampusMate AI. Питайте про вступ, студентське життя та навчальні дати."
}

export default function useChat(mode) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!mode) {
      setMessages([])
      return
    }

    setMessages([
      {
        id: `intro-${mode}`,
        author: "assistant",
        text: getIntroText(mode),
        sources: [],
      },
    ])
    setError(null)
    setLoading(false)
  }, [mode])

  async function sendMessage(text) {
    if (!text?.trim()) return

    const userMessage = {
      id: `user-${Date.now()}`,
      author: "user",
      text,
    }

    setMessages((prev) => [...prev, userMessage])
    setLoading(true)
    setError(null)

    if (USE_MOCK) {
      setTimeout(() => {
        const assistantMessage = {
          id: `assistant-${Date.now()}`,
          author: "assistant",
          text: MOCK_ANSWER,
          sources: [
            {
              category: "База знань",
              question: "MVP mock source",
            },
          ],
        }
        setMessages((prev) => [...prev, assistantMessage])
        setLoading(false)
      }, 900)
      return
    }

    try {
      const response = await sendChatMessage(text, mode || "chat")
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        author: "assistant",
        text: response.answer || "Відповідь не знайдена. Спробуйте інше запитання.",
        sources: response.sources || [],
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError("Не вдалося отримати відповідь. Спробуйте пізніше.")
    } finally {
      setLoading(false)
    }
  }

  return {
    messages,
    loading,
    error,
    sendMessage,
  }
}
