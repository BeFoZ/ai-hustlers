const STORAGE_PREFIX = "campusmate-chat:"
const MOJIBAKE_MARKERS = ["Р’", "РЇ", "СЏ", "С–", "Рґ"]

function isValidMessage(message) {
  return (
    message &&
    typeof message === "object" &&
    typeof message.id === "string" &&
    typeof message.author === "string" &&
    typeof message.text === "string"
  )
}

export function getChatStorageKey(mode) {
  return `${STORAGE_PREFIX}${mode}`
}

export function loadChatMessages(mode) {
  if (!mode || typeof window === "undefined") {
    return []
  }

  try {
    const raw = window.localStorage.getItem(getChatStorageKey(mode))
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed
      .filter(isValidMessage)
      .map((message) => ({
        ...message,
        text: shouldResetBrokenText(message.text) ? "" : message.text,
        sources: Array.isArray(message.sources) ? message.sources : [],
      }))
      .filter((message) => message.text.trim().length > 0)
  } catch {
    return []
  }
}

function shouldResetBrokenText(text) {
  if (typeof text !== "string") {
    return false
  }

  return MOJIBAKE_MARKERS.some((marker) => text.includes(marker))
}

export function saveChatMessages(mode, messages) {
  if (!mode || typeof window === "undefined") {
    return
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    window.localStorage.removeItem(getChatStorageKey(mode))
    return
  }

  window.localStorage.setItem(getChatStorageKey(mode), JSON.stringify(messages))
}

export function clearChatMessages(mode) {
  if (!mode || typeof window === "undefined") {
    return
  }

  window.localStorage.removeItem(getChatStorageKey(mode))
}
