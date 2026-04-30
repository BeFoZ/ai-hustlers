import { useState } from "react"
import ChatContainer from "../components/ChatContainer"
import { quickQuestions } from "../data/quickQuestions"

const navItems = [
  { id: "chat", icon: "💬", title: "AI-Асистент", subtitle: "Запитай що завгодно" },
  { id: "applicant", icon: "🎓", title: "Абітурієнту", subtitle: "Вступ, спеціальності" },
  { id: "freshman", icon: "📚", title: "Першокурснику", subtitle: "Адаптація, навчання" },
  { id: "calendar", icon: "📅", title: "Календар", subtitle: "Сесії, події, дедлайни" },
]

export default function HomePage() {
  const [activePanel, setActivePanel] = useState("chat")
  const [chatMode, setChatMode] = useState(null)

  return (
    <div className="home-page">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-emblem">
            <div className="logo-circle">CM</div>
            <div className="logo-text">
              <h1>CampusMate</h1>
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
          </div>
        </div>
      </aside>

      <main className="main">
        <section
          className={`panel ${activePanel === "chat" ? "active" : ""}`}
          style={{ display: activePanel === "chat" ? "flex" : "none" }}
        >
          {chatMode ? (
            <ChatContainer mode={chatMode} questions={quickQuestions[chatMode]} />
          ) : (
            <div className="info-page" style={{ padding: "32px" }}>
              <div className="welcome-card" style={{ marginBottom: "24px" }}>
                <div className="welcome-tag">✦ AI-Помічник CampusMate</div>
                <h2>Вибери режим роботи</h2>
                <p>Обери, чи ти абітурієнт або першокурсник, щоб чат підлаштувався під твої питання.</p>
              </div>
              <div className="mode-select-grid">
                <button className="mode-card" type="button" onClick={() => setChatMode("applicant")}> 
                  <span className="mode-title">Я абітурієнт</span>
                  <span className="mode-subtitle">Отримуй відповіді про вступ, документи та спеціальності.</span>
                </button>
                <button className="mode-card" type="button" onClick={() => setChatMode("freshman")}> 
                  <span className="mode-title">Я першокурсник</span>
                  <span className="mode-subtitle">Отримуй відповіді про розклад, сесію та адаптацію.</span>
                </button>
              </div>
            </div>
          )}
        </section>

        <section
          className={`panel ${activePanel === "applicant" ? "active" : ""}`}
          style={{ display: activePanel === "applicant" ? "flex" : "none" }}
        >
          <div className="topbar">
            <div>
              <div className="topbar-title">Путівник абітурієнта</div>
              <div className="topbar-sub">Все про вступ до CampusMate AI</div>
            </div>
          </div>
          <div className="info-page">
            <div className="section-head">Загальна інформація</div>
            <div className="info-grid">
              <div className="info-card">
                <div className="info-card-icon">📅</div>
                <h3>Терміни вступу</h3>
                <p>Прийом заяв стартує з 1 липня, а основні дедлайни проходять у серпні.</p>
              </div>
              <div className="info-card">
                <div className="info-card-icon">📝</div>
                <h3>Документи</h3>
                <p>Атестат, сертифікати НМТ, паспорт та фото — основний пакет документів.</p>
              </div>
              <div className="info-card">
                <div className="info-card-icon">💰</div>
                <h3>Стипендія</h3>
                <p>Оцінюється за успішність. Також існують соціальні та президентські програми.</p>
              </div>
              <div className="info-card">
                <div className="info-card-icon">🏆</div>
                <h3>Бюджетні місця</h3>
                <p>Конкурсний бал залежить від спеціальності та кількості претендентів.</p>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`panel ${activePanel === "freshman" ? "active" : ""}`}
          style={{ display: activePanel === "freshman" ? "flex" : "none" }}
        >
          <div className="topbar">
            <div>
              <div className="topbar-title">Путівник першокурсника</div>
              <div className="topbar-sub">Ласкаво просимо до університету</div>
            </div>
          </div>
          <div className="info-page">
            <div className="info-grid">
              <div className="info-card">
                <div className="info-card-icon">🏠</div>
                <h3>Гуртожиток</h3>
                <p>Першокурсники мають пріоритет при розподілі місць у гуртожитку.</p>
              </div>
              <div className="info-card">
                <div className="info-card-icon">📚</div>
                <h3>Розклад</h3>
                <p>Розклад можна знайти в студентській системі або на порталі факультету.</p>
              </div>
              <div className="info-card">
                <div className="info-card-icon">🎓</div>
                <h3>Адаптація</h3>
                <p>Почни з академічного календаря, знайди одногрупників і плануй час.</p>
              </div>
              <div className="info-card">
                <div className="info-card-icon">🧑‍💻</div>
                <h3>Підтримка</h3>
                <p>Звертайся до деканату та студентського офісу за необхідними консультаціями.</p>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`panel ${activePanel === "calendar" ? "active" : ""}`}
          style={{ display: activePanel === "calendar" ? "flex" : "none" }}
        >
          <div className="topbar">
            <div>
              <div className="topbar-title">Академічний календар</div>
              <div className="topbar-sub">Важливі дати для абітурієнтів і першокурсників</div>
            </div>
          </div>
          <div className="calendar-page">
            <div className="section-head">Ключові дати</div>
            <div className="cal-events">
              <div className="cal-event">
                <div className="cal-date"><div className="cal-day">01</div><div className="cal-mon">Лип</div></div>
                <div className="cal-info"><h4>Початок вступу</h4><p>Реєстрація заяв та створення кабінету вступника.</p></div>
                <div className="cal-badge badge-warn">Вступ</div>
              </div>
              <div className="cal-event">
                <div className="cal-date"><div className="cal-day">22</div><div className="cal-mon">Лип</div></div>
                <div className="cal-info"><h4>Кінець подачі заяв</h4><p>Закінчення основного періоду прийому.</p></div>
                <div className="cal-badge badge-warn">Дедлайн</div>
              </div>
              <div className="cal-event">
                <div className="cal-date"><div className="cal-day">01</div><div className="cal-mon">Вер</div></div>
                <div className="cal-info"><h4>День знань</h4><p>Початок навчального року та знайомство з групою.</p></div>
                <div className="cal-badge badge-ok">Навчання</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
