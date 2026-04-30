export default function SourceBadge({ sources }) {
  if (!sources?.length) return null

  return (
    <div className="sources-row">
      <span className="src-tag">Відповідь сформована на основі бази знань</span>
      {sources.map((source, index) => (
        <span key={index} className="src-tag">
          {source.category
            ? `Категорія: ${source.category}`
            : source.question
            ? `Джерело: ${source.question}`
            : "Джерело"}
        </span>
      ))}
    </div>
  )
}
