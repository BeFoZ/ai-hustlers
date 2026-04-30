import ChatInput from "./ChatInput"
import ChatMessage from "./ChatMessage"
import QuickQuestions from "./QuickQuestions"
import useChat from "../hooks/useChat"
import quickQuestions from "../data/quickQuestions"

export default function ChatContainer() {
  const { messages, loading, error, sendMessage } = useChat()

  return (
    <section className="chat-shell">
      <div className="chat-header">
        <h2>CampusMate AI Chat</h2>
        <p>Напиши своє питання або обери одне з готових варіантів.</p>
      </div>
      <div className="chat-window">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      {error && <div className="chat-error">{error}</div>}
      <ChatInput onSend={sendMessage} loading={loading} />
      <QuickQuestions questions={quickQuestions} onQuestion={sendMessage} />
    </section>
  )
}
