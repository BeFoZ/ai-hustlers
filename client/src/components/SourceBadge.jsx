export default function SourceBadge({ source, category }) {
  return (
    <div className="source-badge">
      {category ? <span>{category}</span> : null}
      {source ? <small>{source}</small> : null}
    </div>
  )
}
