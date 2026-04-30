import { useState } from "react"

const categories = [
  {
    id: "documents",
    title: "Документи",
    details:
      "Підготуйте сертифікати, заяву, медичну довідку та копії документів для вступної комісії.",
    points: [
      "Перевірити перелік необхідних паперів.",
      "Зібрати оригінали та ксерокопії.",
      "Підписати заяву правильно." ,
    ],
    prompt: "Які документи потрібні для вступу до ІФНТУНГ на комп'ютерні науки?",
  },
  {
    id: "majors",
    title: "Спеціальності",
    details:
      "Оберіть напрямок з урахуванням своїх сильних сторін: програмування, інженерія або математика.",
    points: [
      "Переглянути перелік спеціальностей факультету.",
      "Оцінити майбутні перспективи та працевлаштування.",
      "Порадитися з наставником або викладачем.",
    ],
    prompt: "Які спеціальності найпопулярніші в ІФНТУНГ?",
  },
  {
    id: "score",
    title: "Конкурсний бал",
    details:
      "Дізнайтеся, які бали мінімальні та які результати потрібні для бюджетних місць.",
    points: [
      "Перевірити минулорічні прохідні бали.",
      "Порахувати свій бал за формулою.",
      "Підготувати резервний варіант спеціальності.",
    ],
    prompt: "Як розрахувати конкурсний бал для вступу?",
  },
  {
    id: "budget",
    title: "Бюджет / контракт",
    details:
      "Розберіться, які спеціальності доступні на бюджеті, а які — на контракті, та які є ставки.",
    points: [
      "Перевірити наявність бюджетних місць.",
      "З'ясувати вартість контракту.",
      "Порівняти умови навчання для обох варіантів.",
    ],
    prompt: "Чим відрізняється бюджетна та контрактна форма навчання?",
  },
  {
    id: "dorm",
    title: "Гуртожиток",
    details:
      "Дізнайтеся правила подачі заявки на гуртожиток, умови проживання та терміни реєстрації.",
    points: [
      "Подати заявку на поселення у гуртожиток.",
      "Підготувати список речей для першого дня.",
      "Дізнатися правила користування кімнатою.",
    ],
    prompt: "Як отримати місце в гуртожитку ІФНТУНГ?",
  },
  {
    id: "committee",
    title: "Приймальна комісія",
    details:
      "Знайдіть контакти приймальної комісії, години роботи та важливі телефони для консультацій.",
    points: [
      "Зберегти контактні дані комісії.",
      "Дізнатися графік прийому.",
      "Запитати про додаткові документи.",
    ],
    prompt: "Як зв’язатися з приймальною комісією ІФНТУНГ?",
  },
]

const initialChecklist = [
  { id: "cabinet", label: "Створити електронний кабінет", done: false },
  { id: "documents", label: "Підготувати документи", done: false },
  { id: "application", label: "Подати заяву", done: false },
  { id: "ranking", label: "Перевірити рейтинговий список", done: false },
  { id: "confirm", label: "Підтвердити місце навчання", done: false },
]

export default function ApplicantPanel() {
  const [selectedId, setSelectedId] = useState(categories[0].id)
  const [checklist, setChecklist] = useState(initialChecklist)
  const [aiPrompt, setAiPrompt] = useState("")

  const selected = categories.find((category) => category.id === selectedId)
  const completedCount = checklist.filter((item) => item.done).length

  function toggleChecklist(id) {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    )
  }

  function handleAskAI() {
    setAiPrompt(selected?.prompt || "")
  }

  return (
    <section className="panel info-panel applicant-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Абітурієнту</p>
          <h2>План вступу та підготовки</h2>
          <p className="panel-copy">
            Підбір ключової інформації для вступника, чеклист та швидкі поради для ІФНТУНГ.
          </p>
        </div>
      </div>

      <div className="panel-columns">
        <div className="applicant-main">
          <div className="section-head">Підбір інформації для абітурієнта</div>
          <div className="category-grid">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`category-card ${category.id === selectedId ? "active" : ""}`}
                onClick={() => setSelectedId(category.id)}
              >
                <span>{category.title}</span>
              </button>
            ))}
          </div>

          <div className="category-detail-card">
            <div className="category-detail-header">
              <h3>{selected.title}</h3>
              <button className="secondary-btn" type="button" onClick={handleAskAI}>
                Запитати AI про цю тему
              </button>
            </div>
            <p>{selected.details}</p>
            <ul className="detail-list">
              {selected.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            {aiPrompt ? (
              <div className="prompt-box">
                <strong>Готове питання:</strong> {aiPrompt}
              </div>
            ) : null}
          </div>
        </div>

        <aside className="info-aside">
          <div className="section-head">Чеклист вступника</div>
          <div className="checklist-card">
            {checklist.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`check-item ${item.done ? "checked" : ""}`}
                onClick={() => toggleChecklist(item.id)}
              >
                <span>{item.label}</span>
                <span>{item.done ? "✅" : "○"}</span>
              </button>
            ))}
          </div>
          <div className="progress-summary">
            Виконано {completedCount} із {checklist.length}
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(completedCount / checklist.length) * 100}%` }}
            />
          </div>
        </aside>
      </div>
    </section>
  )
}
