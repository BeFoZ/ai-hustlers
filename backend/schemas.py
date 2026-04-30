from pydantic import BaseModel
from typing import List, Optional


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    answer: str


class CalendarEvent(BaseModel):
    time: str
    title: str
    description: Optional[str] = None
    location: Optional[str] = None


class CalendarEventsResponse(BaseModel):
    date: str
    events: List[CalendarEvent]