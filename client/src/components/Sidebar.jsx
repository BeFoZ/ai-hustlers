export default function Sidebar({ activePanel, setActivePanel }) {
  const navItems = [
    { id: "chat", icon: "💬", title: "AI-Асистент", subtitle: "Запитай що завгодно" },
    { id: "applicant", icon: "🎓", title: "Абітурієнту", subtitle: "Вступ, спеціальності" },
    { id: "freshman", icon: "📚", title: "Першокурснику", subtitle: "Адаптація, навчання" },
    { id: "calendar", icon: "📅", title: "Календар", subtitle: "Сесії, події, дедлайни" },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-emblem">
          <div className="logo-circle">ІФ</div>
          <div className="logo-text">
            <h1>ІФНТУНГ</h1>
            <p>AI-путівник</p>
          </div>
        </div>
        <div className="ai-badge">RAG AI Online</div>
      </div>

      <div className="nav-section">
        <div className="nav-label">Навігація</div>
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-btn ${activePanel === item.id ? "active" : ""}`}
            onClick={() => setActivePanel(item.id)}
          >
            <div className="nav-icon">{item.icon}</div>
            <div className="nav-btn-text">
              <span className="nav-btn-title">{item.title}</span>
              <span className="nav-btn-sub">{item.subtitle}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="sidebar-bottom">
        <div className="quick-contacts">
          <h4>Контакти</h4>
          <div className="contact-row">📍 вул. Карпатська, 15</div>
          <div className="contact-row">📞 +38 (0342) 72-71-01</div>
          <div className="contact-row">🌐 nung.edu.ua</div>
          <div className="contact-row">✉️ vstuppua@gmail.com</div>
        </div>
      </div>
    </aside>
  )
}
