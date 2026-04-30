import SourceBadge from "./SourceBadge"

export default function ChatMessage({ message }) {
  const isUser = message.author === "user"

  return (
    <div className={`chat-message ${isUser ? "user" : "assistant"}`}>
      <div className="message-content">
        <div className="message-author">{isUser ? "Ти" : "CampusMate AI"}</div>
        <div className="message-text">{message.text}</div>
        {message.source || message.category ? (
          <SourceBadge source={message.source} category={message.category} />
        ) : null}
      </div>
    </div>
  )
}
