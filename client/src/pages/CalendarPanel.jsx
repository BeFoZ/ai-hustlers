import { useMemo, useEffect, useState } from "react"

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]

export default function CalendarPanel() {
  const today = useMemo(() => new Date(), [])
  const [selectedDate, setSelectedDate] = useState(today)
  const [events, setEvents] = useState([])
  const [eventsLoading, setEventsLoading] = useState(false)
  const [eventsError, setEventsError] = useState(null)

  const year = today.getFullYear()
  const month = today.getMonth()
  const monthName = today.toLocaleString("uk-UA", { month: "long" })
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7

  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1)

  const selectedDateKey = useMemo(() => {
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
    const day = String(selectedDate.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }, [selectedDate])

  useEffect(() => {
    let cancelled = false

    async function loadEvents() {
      setEventsLoading(true)
      setEventsError(null)

      try {
        const response = await fetch(`/api/calendar-events?date=${selectedDateKey}`)
        if (!response.ok) {
          throw new Error("Server error")
        }

        const payload = await response.json()
        if (!cancelled) {
          setEvents(payload.events ?? [])
        }
      } catch (error) {
        if (!cancelled) {
          setEventsError("Не вдалося завантажити події. Спробуйте пізніше.")
          setEvents([])
        }
      } finally {
        if (!cancelled) {
          setEventsLoading(false)
        }
      }
    }

    loadEvents()

    return () => {
      cancelled = true
    }
  }, [selectedDateKey])

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

      <div className="event-panel">
        <div className="event-panel-header">
          <div>
            <p className="eyebrow">Розклад дня</p>
            <h3>Події на обрану дату</h3>
          </div>
          <span className="calendar-month">{selectedDateKey}</span>
        </div>

        {eventsLoading ? (
          <p className="event-status">Завантаження подій…</p>
        ) : eventsError ? (
          <p className="event-status error">{eventsError}</p>
        ) : events.length === 0 ? (
          <div className="event-empty">
            <h3>Нічого не заплановано</h3>
            <p>На обрану дату немає жодних подій. Спробуйте обрати інший день або плануйте свій час.</p>
          </div>
        ) : (
          <div className="event-list">
            {events.map((event, index) => (
              <article key={`${selectedDateKey}-${event.time}-${index}`} className="event-item">
                <span className="event-time">{event.time}</span>
                <div className="event-details">
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                  {event.location && <p className="event-location">{event.location}</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
