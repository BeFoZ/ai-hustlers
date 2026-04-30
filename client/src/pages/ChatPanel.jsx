import ChatContainer from "../components/ChatContainer"
import QuickQuestions from "../components/QuickQuestions"
import useChat from "../hooks/useChat"

const quickTopics = [
  "Як подати документи на вступ до ІФНТУНГ?",
  "Що потрібно знати першокурснику на перший день?",
  "Які спеціальності пропонує факультет?",
  "Дати початку семестру та сесій?",
]

export default function ChatPanel() {
  const { messages, sendMessage, loading, error } = useChat("chat")

  return (
    <section className="panel chat-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">CampusMate AI</p>
          <h2>AI-Асистент ІФНТУНГ</h2>
          <p className="panel-copy">
            Ваш швидкий помічник з відповідями про вступ, навчання та життя на кампусі.
          </p>
        </div>
        <div className="panel-chip">RAG-пошук + Безпечна логіка</div>
      </div>

      <div className="welcome-card">
        <div className="welcome-title">Почнемо?</div>
        <p>Оберіть тему або напишіть своє питання — CampusMate відповість одразу.</p>
      </div>

      <QuickQuestions questions={quickTopics} onQuestion={sendMessage} />

      <ChatContainer
        messages={messages}
        loading={loading}
        error={error}
        onSend={sendMessage}
      />
    </section>
  )
}
