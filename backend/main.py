from datetime import datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas import ChatRequest, ChatResponse, CalendarEventsResponse
from agents.agent import ask_agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health_check():
    return {"status": "ok"}


@app.post("/api/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    answer = ask_agent(req.message)
    return ChatResponse(answer=answer)


MOCK_CALENDAR_EVENTS = {
    "2026-04-01": [
        {
            "time": "09:30",
            "title": "Студентський воркшоп з React",
            "description": "Опрацювання API, маршрутизація та стан компонента.",
            "location": "Аудиторія 101",
        },
        {
            "time": "14:00",
            "title": "Зустріч команди про стартап",
            "description": "Обговорення ідей та розподіл задач.",
            "location": "Коворкінг",
        },
    ],
    "2026-04-04": [
        {
            "time": "12:00",
            "title": "Перевірка курсової роботи",
            "description": "Консультація з викладачем щодо структури документа.",
            "location": "Онлайн",
        },
    ],
    "2026-04-12": [
        {
            "time": "16:00",
            "title": "Мозковий штурм по AI-проєкту",
            "description": "Формування вимог та технічних задач.",
            "location": "Хакатон-зал",
        },
    ],
}


@app.get("/api/calendar-events", response_model=CalendarEventsResponse)
async def calendar_events(date: str):
    try:
        datetime.fromisoformat(date)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")

    events = MOCK_CALENDAR_EVENTS.get(date, [])
    return CalendarEventsResponse(date=date, events=events)
