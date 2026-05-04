import { useMemo, useState } from "react"
import calendarEvents from "../data/calendarEvents.json"

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]

function toDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export default function CalendarPanel() {
  const today = useMemo(() => new Date(), [])
  const [selectedDate, setSelectedDate] = useState(today)

  const year = today.getFullYear()
  const month = today.getMonth()
  const monthName = today.toLocaleString("uk-UA", { month: "long" })
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1)

  const selectedDateKey = useMemo(() => toDateKey(selectedDate), [selectedDate])

  const eventsByDate = useMemo(() => {
    return calendarEvents.reduce((accumulator, item) => {
      accumulator[item.date] = item.events ?? []
      return accumulator
    }, {})
  }, [])

  const events = eventsByDate[selectedDateKey] ?? []

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
            Швидкий огляд подій, дедлайнів та важливих активностей для студентів ІФНТУНГ.
          </p>
        </div>
        <div className="calendar-meta">
          <span className="calendar-month">
            {monthName} {year}
          </span>
          <p>Оберіть день, щоб переглянути заплановані події.</p>
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
            const currentDate = new Date(year, month, day)
            const currentKey = toDateKey(currentDate)
            const isSelected = currentKey === selectedDateKey
            const hasEvents = (eventsByDate[currentKey] ?? []).length > 0

            return (
              <button
                key={day}
                type="button"
                className={`calendar-cell day ${isSelected ? "selected" : ""} ${hasEvents ? "has-events" : ""}`}
                onClick={() => setSelectedDate(currentDate)}
              >
                <span>{day}</span>
                {hasEvents ? <span className="calendar-dot" aria-hidden="true" /> : null}
              </button>
            )
          })}
        </div>
      </div>

      <div className="selected-copy">
        <p>Обрана дата:</p>
        <strong>{selectedLabel}</strong>
      </div>

      <div className="event-panel">
        <div className="event-panel-header">
          <div>
            <p className="eyebrow">Розклад дня</p>
            <h3>Події на обрану дату</h3>
          </div>
          <span className="calendar-month">{selectedDateKey}</span>
        </div>

        {events.length === 0 ? (
          <div className="event-empty">
            <h3>Нічого не заплановано</h3>
            <p>На цю дату подій немає. Оберіть інший день, щоб переглянути розклад.</p>
          </div>
        ) : (
          <div className="event-list">
            {events.map((event, index) => (
              <article key={`${selectedDateKey}-${event.time}-${index}`} className="event-item">
                <span className="event-time">{event.time}</span>
                <div className="event-details">
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                  {event.location ? <p className="event-location">{event.location}</p> : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
