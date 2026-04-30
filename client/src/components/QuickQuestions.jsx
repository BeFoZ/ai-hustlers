export default function QuickQuestions({ questions, onQuestion, disabled }) {
  return (
    <div className="quick-questions">
      <div className="quick-title">Популярні теми</div>
      <div className="quick-buttons">
        {questions.map((question) => (
          <button
            key={question}
            type="button"
            className={`topic-chip${disabled ? " disabled" : ""}`}
            onClick={() => !disabled && onQuestion(question)}
            disabled={disabled}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}
