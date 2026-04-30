export default function FreshmanPanel() {
  return (
    <section className="panel info-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Першокурснику</p>
          <h2>Життя на факультеті</h2>
          <p className="panel-copy">
            Поради з адаптації, розкладу, гуртожитку та студентського життя.
          </p>
        </div>
      </div>

      <div className="info-grid">
        <article>
          <h3>Гуртожиток</h3>
          <p>Дізнайтеся, як подати заявку на проживання та отримати перший пакет послуг.</p>
        </article>
        <article>
          <h3>Розклад</h3>
          <p>Початкові формати занять, консультації викладачів та важливі ресурси.</p>
        </article>
        <article>
          <h3>Підтримка</h3>
          <p>Як знайти наставника, студентські клуби і навчальні групи.</p>
        </article>
      </div>
    </section>
  )
}
