import os
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

# =========================
# ⚙️ ENV
# =========================

load_dotenv()

MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
EMBED_MODEL = os.getenv("OPENAI_EMBEDDING_MODEL", "text-embedding-3-small")

# =========================
# 🧠 LLM + EMBEDDINGS
# =========================

llm = ChatOpenAI(
    model=MODEL,
    temperature=0
)

embeddings = OpenAIEmbeddings(
    model=EMBED_MODEL
)

# =========================
# 📦 FAISS
# =========================

vectorstore = FAISS.load_local(
    "faiss_index",
    embeddings,
    allow_dangerous_deserialization=True
)

retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

# =========================
# 💬 HISTORY (масив)
# =========================

chat_history = []  # [{"role": "user", "content": "..."}]


# =========================
# 🚀 MAIN FUNCTION
# =========================

def ask_agent(question: str) -> str:
    global chat_history

    # 1. retrieve контекст
    docs = retriever.invoke(question)
    context = "\n\n".join([doc.page_content for doc in docs])

    # 2. формуємо messages
    messages = [
        {
            "role": "system",
            "content": "Відповідай тільки на основі контексту. Якщо відповіді немає — скажи, що не знаєш."
        }
    ]

    # додаємо історію
    messages.extend(chat_history)

    # додаємо контекст
    messages.append({
        "role": "system",
        "content": f"Контекст:\n{context}"
    })

    # додаємо нове питання
    messages.append({
        "role": "user",
        "content": question
    })

    # 3. виклик LLM
    response = llm.invoke(messages)

    answer = response.content

    # 4. оновлюємо history
    chat_history.append({"role": "user", "content": question})
    chat_history.append({"role": "assistant", "content": answer})

    # тримаємо тільки 10 останніх
    chat_history = chat_history[-10:]

    return answer

