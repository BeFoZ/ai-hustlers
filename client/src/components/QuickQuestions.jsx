export default function QuickQuestions({ questions, onQuestion }) {
  return (
    <div className="quick-questions">
      <div className="quick-title">Популярні теми</div>
      <div className="quick-buttons">
        {questions.map((question) => (
          <button key={question} type="button" className="topic-chip" onClick={() => onQuestion(question)}>
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}
