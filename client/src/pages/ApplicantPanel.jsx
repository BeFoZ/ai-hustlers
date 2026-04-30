export default function ApplicantPanel() {
  return (
    <section className="panel info-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Абітурієнту</p>
          <h2>План вступу та спеціальності</h2>
          <p className="panel-copy">
            Відповіді про документи, дедлайни та вибір спеціальності з урахуванням ІФНТУНГ.
          </p>
        </div>
      </div>

      <div className="info-grid">
        <article>
          <h3>Як вступити</h3>
          <p>Дізнайтеся про етапи реєстрації, сертифікати та мотиваційний лист.</p>
        </article>
        <article>
          <h3>Спеціальності</h3>
          <p>Обрати напрямок: комп'ютерні науки, інженерія або прикладна математика.</p>
        </article>
        <article>
          <h3>Терміни</h3>
          <p>Терміни подачі документів, вступні випробування, оголошення зарахування.</p>
        </article>
      </div>
    </section>
  )
}
