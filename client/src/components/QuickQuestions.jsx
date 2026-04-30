export default function QuickQuestions({ questions, onQuestion }) {
  return (
    <div className="quick-questions">
      <p>Швидкі запитання</p>
      <div className="quick-buttons">
        {questions.map((question) => (
          <button key={question} type="button" onClick={() => onQuestion(question)}>
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}
