import { useState } from "react"
import Sidebar from "./components/Sidebar"
import ChatPanel from "./pages/ChatPanel"
import ApplicantPanel from "./pages/ApplicantPanel"
import FreshmanPanel from "./pages/FreshmanPanel"
import CalendarPanel from "./pages/CalendarPanel"
import "./App.css"

function App() {
  const [activePanel, setActivePanel] = useState("chat")

  return (
    <div className="app-shell">
      <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
      <main className="main-content">
        {activePanel === "chat" && <ChatPanel />}
        {activePanel === "applicant" && <ApplicantPanel />}
        {activePanel === "freshman" && <FreshmanPanel />}
        {activePanel === "calendar" && <CalendarPanel />}
      </main>
    </div>
  )
}

export default App
