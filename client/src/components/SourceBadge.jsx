export default function SourceBadge({ sources }) {
  if (!sources?.length) return null

  return (
    <div className="sources-row">
      <span className="src-tag">Відповідь сформована на основі бази знань</span>
      {sources.map((source, index) => (
        <span key={index} className="src-tag">
          {source.category ? `Категорія: ${source.category}` : null}
          {source.question ? `${source.category ? " · " : ""}Джерело: ${source.question}` : null}
          {source.source ? `${source.category || source.question ? " · " : ""}Деталі: ${source.source}` : null}
          {!source.category && !source.question && !source.source ? "Джерело" : null}
        </span>
      ))}
    </div>
  )
}
