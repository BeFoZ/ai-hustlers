export default function CalendarPanel() {
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
      </div>

      <div className="calendar-list">
        <div className="calendar-item">
          <span>1 вересня</span>
          <p>Початок навчального семестру</p>
        </div>
        <div className="calendar-item">
          <span>15 грудня</span>
          <p>Закінчення семестру та початок сесії</p>
        </div>
        <div className="calendar-item">
          <span>10 січня</span>
          <p>Відновлення навчання після канікул</p>
        </div>
      </div>
    </section>
  )
}
