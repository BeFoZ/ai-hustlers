import { useState } from "react"
import { sendMessage as sendMessageApi } from "../api/chatApi"

const initialMessages = [
  {
    id: 1,
    author: "assistant",
    text: "Привіт! Я CampusMate AI. Став мені питання або обери швидке питання.",
  },
]

export default function useChat() {
  const [messages, setMessages] = useState(initialMessages)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function sendMessage(text) {
    if (!text?.trim()) return

    const userMessage = {
      id: Date.now(),
      author: "user",
      text,
    }

    setMessages((prev) => [...prev, userMessage])
    setLoading(true)
    setError(null)

    try {
      const response = await sendMessageApi(text)
      const assistantMessage = {
        id: Date.now() + 1,
        author: "assistant",
        text: response.message,
        source: response.source,
        category: response.category,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError(err.message || "Сталася помилка")
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
