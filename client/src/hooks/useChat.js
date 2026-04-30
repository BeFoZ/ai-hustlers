import { useEffect, useRef, useState } from "react"
import { sendChatMessage } from "../api/chatApi"

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
  const loadingRef = useRef(false)

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
    loadingRef.current = false
  }, [mode])

  async function sendMessage(text) {
    if (loadingRef.current) return
    if (!text?.trim()) return

    setError(null)
    loadingRef.current = true
    setLoading(true)

    const userMessage = {
      id: `user-${Date.now()}`,
      author: "user",
      text,
    }
    setMessages((prev) => [...prev, userMessage])

    try {
      const response = await sendChatMessage(text)
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        author: "assistant",
        text: response.answer || "Відповідь не знайдена. Спробуйте інше запитання.",
        sources: response.sources || [],
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError(
        "Не вдалося отримати відповідь від сервера. Перевірте, чи запущено backend на localhost:8000."
      )
    } finally {
      loadingRef.current = false
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
