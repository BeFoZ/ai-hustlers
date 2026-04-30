export async function sendChatMessage(message, mode) {
  const response = await fetch("http://localhost:8000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, mode }),
  })

  if (!response.ok) {
    throw new Error("Не вдалося надіслати повідомлення")
  }

  return response.json()
}
