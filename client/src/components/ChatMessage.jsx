import SourceBadge from "./SourceBadge"

export default function ChatMessage({ message }) {
  const isUser = message.author === "user"

  return (
    <div className={`msg ${isUser ? "user" : "bot"}`}>
      <div className={`msg-av ${isUser ? "user-av" : "bot-av"}`}>{isUser ? "Ти" : "AI"}</div>
      <div className="bubble">
        <div>{message.text}</div>
        {!isUser && message.sources?.length ? <SourceBadge sources={message.sources} /> : null}
      </div>
    </div>
  )
}
