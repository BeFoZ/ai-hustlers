import { useState } from "react"

const checklistItems = [
  { id: "group", label: "Знайти свою групу" },
  { id: "schedule", label: "Дізнатися розклад" },
  { id: "starosta", label: "Познайомитися зі старостою" },
  { id: "curator", label: "Дізнатися контакти куратора" },
  { id: "platforms", label: "Перевірити доступ до навчальних платформ" },
  { id: "session", label: "Дізнатися правила сесії" },
]

const topics = [
  { id: "schedule", title: "Розклад", tip: "Перевіряйте розклад щотижня та приходьте на зустрічі вчасно." },
  { id: "ects", title: "ECTS", tip: "ECTS допомагає оцінювати навчальне навантаження й переписувати бали між університетами." },
  { id: "session", title: "Сесія", tip: "Плануйте підготовку заздалегідь і розбивайте заняття на невеликі блоки." },
  { id: "scholarship", title: "Стипендія", tip: "Перевіряйте умови стипендії: середній бал, відвідуваність та рейтингові критерії." },
  { id: "absences", title: "Пропуски", tip: "Ведіть облік пропусків та звертайтеся до викладачів за поясненнями." },
  { id: "dorm", title: "Гуртожиток", tip: "Пам’ятайте про правила проживання, черги на поселення та правила безпеки." },
]

export default function FreshmanPanel() {
  const [tasks, setTasks] = useState(
    checklistItems.map((item) => ({ ...item, done: false }))
  )
  const [activeTopic, setActiveTopic] = useState(topics[0].id)

  const completedCount = tasks.filter((item) => item.done).length
  const selectedTopic = topics.find((topic) => topic.id === activeTopic)

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    )
  }

  return (
    <section className="panel info-panel freshman-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Першокурснику</p>
          <h2>Швидка адаптація на факультеті</h2>
          <p className="panel-copy">
            Інтерактивний чеклист та прості поради для першого семестру.
          </p>
        </div>
      </div>

      <div className="panel-columns">
        <div className="freshman-left">
          <div className="section-head">Чеклист першокурсника</div>
          <div className="checklist-card">
            {tasks.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`check-item ${item.done ? "checked" : ""}`}
                onClick={() => toggleTask(item.id)}
              >
                <span>{item.label}</span>
                <span>{item.done ? "✅" : "○"}</span>
              </button>
            ))}
          </div>
          <div className="progress-summary">
            Виконано {completedCount} з {tasks.length}
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(completedCount / tasks.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="freshman-right">
          <div className="section-head">Швидка допомога першокурснику</div>
          <div className="help-grid">
            {topics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                className={`help-card ${topic.id === activeTopic ? "active" : ""}`}
                onClick={() => setActiveTopic(topic.id)}
              >
                {topic.title}
              </button>
            ))}
          </div>
          <div className="help-detail-card">
            <h3>{selectedTopic.title}</h3>
            <p>{selectedTopic.tip}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
