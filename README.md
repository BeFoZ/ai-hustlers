# CampusMate AI

CampusMate AI — full-stack MVP для хакатону, який допомагає першокурсникам знаходити відповіді на питання про університетське життя.

## Стек технологій

- Frontend: React + Vite
- Backend: FastAPI
- Python: FastAPI, Uvicorn

## Як запускати

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API

- `GET /api/health` — перевірка стану
- `POST /api/chat` — надсилає повідомлення та отримує mock-відповідь
