import ChatInput from "./ChatInput"
import ChatMessage from "./ChatMessage"

export default function ChatContainer({ messages, loading, error, onSend }) {
  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {loading && (
          <div className="assistant-loading">
            <div className="loading-dot" />
            <div className="loading-dot" />
            <div className="loading-dot" />
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
