import ChatContainer from "../components/ChatContainer"

export default function HomePage() {
  return (
    <main className="app-shell">
      <section className="hero-section">
        <h1>CampusMate AI</h1>
        <p>Інтелектуальний помічник для першокурсників: відповіді на питання, поради та швидка навігація.</p>
      </section>
      <ChatContainer />
    </main>
  )
}
