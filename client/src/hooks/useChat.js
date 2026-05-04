import { useEffect, useRef, useState } from "react"
import { sendChatMessage } from "../api/chatApi"
import { loadChatMessages, saveChatMessages } from "../utils/chatStorage"

const STORAGE_KEY = "campusmate-chat-messages"

function getIntroText(mode) {
  if (mode === "applicant") {
    return "Вітаю! Я CampusMate AI. Я допоможу відповісти на питання про вступ, спеціальності та документи."
  }

  if (mode === "freshman") {
    return "Вітаю! Я CampusMate AI. Я допоможу першокурснику з питаннями розкладу, сесії та адаптації."
  }

  return "Вітаю! Я CampusMate AI. Питайте про вступ, студентське життя та навчальні дати."
}

function getIntroMessage(mode) {
  return {
    id: `intro-${mode}`,
    role: "assistant",
    content: getIntroText(mode),
    sources: [],
  }
}

function loadMessagesFromStorage(mode) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return [getIntroMessage(mode)]
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed) || parsed.length === 0) return [getIntroMessage(mode)]
    return parsed
  } catch (error) {
    console.warn("Failed to load messages from localStorage:", error)
    return [getIntroMessage(mode)]
  }
}

function saveMessagesToStorage(messages) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  } catch (error) {
    console.warn("Failed to save messages to localStorage:", error)
  }
}

export default function useChat(mode) {
  const [messages, setMessages] = useState(() => {
    if (!mode) {
      return []
    }

    const storedMessages = loadChatMessages(mode)
    return storedMessages.length > 0 ? storedMessages : [buildIntroMessage(mode)]
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const loadingRef = useRef(false)
  const [lastAnimatedId, setLastAnimatedId] = useState(null)

  useEffect(() => {
    if (!mode) {
      setMessages([])
      return
    }

    const loadedMessages = loadMessagesFromStorage(mode)
    setMessages(loadedMessages)
    setError(null)
    setLoading(false)
    setLastAnimatedId(null)
    loadingRef.current = false
  }, [mode])

  useEffect(() => {
    if (messages.length > 0) {
      saveMessagesToStorage(messages)
    }
  }, [messages])

  async function sendMessage(text) {
    if (loadingRef.current) return
    if (!text?.trim()) return

    setError(null)
    loadingRef.current = true
    setLoading(true)

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    }
    setMessages((prev) => [...prev, userMessage])

    try {
      const response = await sendChatMessage(text)
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.answer || "Відповідь не знайдена. Спробуйте інше запитання.",
        sources: response.sources || [],
      }
      setMessages((prev) => [...prev, assistantMessage])
      setLastAnimatedId(assistantMessage.id)
    } catch (err) {
      setError(
        "Не вдалося отримати відповідь від сервера. Перевірте, чи запущено backend та проксі /api."
      )
    } finally {
      loadingRef.current = false
      setLoading(false)
    }
  }

  function clearChat() {
    const introMessage = getIntroMessage(mode)
    setMessages([introMessage])
    localStorage.removeItem(STORAGE_KEY)
    setLastAnimatedId(null)
  }

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearChat,
    lastAnimatedId,
  }
}
