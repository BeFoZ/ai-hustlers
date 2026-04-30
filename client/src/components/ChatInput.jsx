import { useState } from "react"

export default function ChatInput({ onSend, loading }) {
  const [value, setValue] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    if (!value.trim()) return
    onSend(value)
    setValue("")
  }

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Напишіть повідомлення..."
        disabled={loading}
      />
      <button type="submit" disabled={loading || !value.trim()}>
        {loading ? "Надсилаю..." : "Відправити"}
      </button>
    </form>
  )
}
