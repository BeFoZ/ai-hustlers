export default function SourceBadge({ sources }) {
  if (!Array.isArray(sources) || sources.length === 0) return null

  const renderedSources = sources
    .map((source) => {
      const parts = []
      if (source?.category) parts.push(`Категорія: ${source.category}`)
      if (source?.question) parts.push(`Джерело: ${source.question}`)
      if (source?.source) parts.push(`Деталі: ${source.source}`)
      return parts.length ? parts.join(" · ") : null
    })
    .filter(Boolean)

  if (!renderedSources.length) return null

  return (
    <div className="sources-row">
      <span className="src-tag">Відповідь сформована на основі бази знань</span>
      {renderedSources.map((text, index) => (
        <span key={index} className="src-tag">
          {text}
        </span>
      ))}
    </div>
  )
}
