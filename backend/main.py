from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    mode: str = "chat"


class ChatResponse(BaseModel):
    answer: str
    sources: list[dict] = []


@app.get("/api/health")
async def health_check():
    return {"status": "ok"}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message is required")

    # Тимчасовий mock-відповідь. Замінити на реальний RAG / LLM у наступному кроці.
    answer = (
        "CampusMate AI готовий допомагати! "
        "Ваш запит: '" + request.message + "'. "
        "Поки що використовується mock-відповідь, але структура API готова."
    )

    sources = [
        {"category": "MVP mock", "question": request.message},
        {"category": "Режим", "question": request.mode},
    ]

    return {"answer": answer, "sources": sources}

