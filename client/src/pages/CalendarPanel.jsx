import { useMemo, useState } from "react"

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]

export default function CalendarPanel() {
  const today = useMemo(() => new Date(), [])
  const [selectedDate, setSelectedDate] = useState(today)

  const year = today.getFullYear()
  const month = today.getMonth()
  const monthName = today.toLocaleString("uk-UA", { month: "long" })
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7

  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1)

  const selectedLabel = selectedDate.toLocaleDateString("uk-UA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <section className="panel info-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Календар</p>
          <h2>Головні дати</h2>
          <p className="panel-copy">
            Швидкий огляд подій, сесій та дедлайнів для студентів ІФНТУНГ.
          </p>
        </div>
        <div className="calendar-meta">
          <span className="calendar-month">
            {monthName} {year}
          </span>
          <p>Оберіть день, щоб виділити дату.</p>
        </div>
      </div>

      <div className="calendar-board">
        <div className="weekday-row">
          {weekdays.map((day) => (
            <div key={day} className="weekday-cell">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-grid">
          {Array.from({ length: firstWeekday }, (_, index) => (
            <div key={`empty-${index}`} className="calendar-cell empty" />
          ))}

          {days.map((day) => {
            const isSelected =
              selectedDate.getDate() === day &&
              selectedDate.getMonth() === month &&
              selectedDate.getFullYear() === year

            return (
              <button
                key={day}
                type="button"
                className={`calendar-cell day ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedDate(new Date(year, month, day))}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      <div className="selected-copy">
        <p>Обрана дата:</p>
        <strong>{selectedLabel}</strong>
      </div>
    </section>
  )
}
