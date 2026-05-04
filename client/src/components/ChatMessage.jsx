import { useEffect, useRef, useState } from "react"
import SourceBadge from "./SourceBadge"

export default function ChatMessage({ message, animate }) {
  const isUser = message.role === "user"
  const [displayText, setDisplayText] = useState(
    !animate || isUser ? message.content : ""
  )
  const [showSources, setShowSources] = useState(!animate || isUser)
  const messageRef = useRef(null)

  useEffect(() => {
    if (!animate || isUser) {
      setDisplayText(message.content)
      setShowSources(true)
      return
    }

    let index = 0
    setDisplayText("")
    setShowSources(false)
    const interval = window.setInterval(() => {
      index += 1
      setDisplayText(message.content.slice(0, index))
      if (index >= message.content.length) {
        window.clearInterval(interval)
        setShowSources(true)
      }
    }, 18)

    return () => {
      window.clearInterval(interval)
    }
  }, [animate, isUser, message.content])

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [displayText])

  return (
    <div className={`msg ${isUser ? "user" : "bot"}`} ref={messageRef}>
      <div className={`msg-av ${isUser ? "user-av" : "bot-av"}`}>{isUser ? "Ти" : "AI"}</div>
      <div className="bubble">
        <div className={animate && !isUser ? "typewriter-text" : undefined}>
          {displayText}
        </div>
        {!isUser && showSources && message.sources?.length ? (
          <SourceBadge sources={message.sources} />
        ) : null}
      </div>
    </div>
  )
}
