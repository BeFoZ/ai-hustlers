import { useState } from "react"

export default function ChatInput({ onSend, loading }) {
  const [value, setValue] = useState("")
  const disabled = Boolean(loading)

  function handleSubmit(event) {
    event.preventDefault()
    if (disabled || !value.trim()) return
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
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || !value.trim()}>
        {loading ? "Надсилаю..." : "Відправити"}
      </button>
    </form>
  )
}
