import { useEffect, useMemo, useRef } from "react"
import ChatInput from "./ChatInput"
import ChatMessage from "./ChatMessage"

export default function ChatContainer({ messages, loading, error, onSend }) {
  const chatWindowRef = useRef(null)

  const lastAssistantId = useMemo(() => {
    const reversed = [...messages].reverse()
    const item = reversed.find(
      (message) => message.author === "assistant" && message.id?.startsWith("assistant-")
    )
    return item?.id
  }, [messages])

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
    }
  }, [messages, loading])

  return (
    <div className="chat-container">
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((message) => {
          const animate =
            !loading &&
            message.author === "assistant" &&
            message.id === lastAssistantId

          return <ChatMessage key={message.id} message={message} animate={animate} />
        })}
        {loading && (
          <div className="assistant-loading" aria-live="polite">
            <div className="assistant-loading-text">
              CampusMate AI обробляє запит...
            </div>
            <div className="loading-dots">
              <span className="loading-dot" />
              <span className="loading-dot" />
              <span className="loading-dot" />
            </div>
          </div>
        )}
      </div>

      {error && <div className="error-bubble">{error}</div>}

      <div className="input-zone">
        <ChatInput onSend={onSend} loading={loading} />
      </div>
    </div>
  )
}
