import os
from pathlib import Path

from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document

# 🔹 ВАРІАНТ 1 (безкоштовний, локальний)
# from langchain_community.embeddings import HuggingFaceEmbeddings

# 🔹 ВАРІАНТ 2 (якщо хочеш OpenAI)
from langchain_openai import OpenAIEmbeddings
from dotenv import load_dotenv

from langchain_text_splitters import RecursiveCharacterTextSplitter


# =========================
# ⚙️ НАЛАШТУВАННЯ
# =========================

BASE_DIR = Path(__file__).parent
FILES = ["FAQ.txt", "ПО балах.txt"]

INDEX_DIR = "faiss_index"

USE_OPENAI = True  # ← поміняй на True якщо хочеш OpenAI


# =========================
# 📄 ЧИТАННЯ TXT
# =========================

def load_txt_files():
    docs = []

    for name in FILES:
        path = BASE_DIR / name

        if not path.exists():
            print(f"❌ Файл не знайдено: {path}")
            continue

        print(f"📄 Завантаження: {path}")

        text = path.read_text(encoding="utf-8")

        docs.append(
            Document(
                page_content=text,
                metadata={"source": name}
            )
        )

    return docs


# =========================
# ✂️ SPLIT
# =========================

def split_docs(docs):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )

    chunks = splitter.split_documents(docs)

    return chunks


# =========================
# 🧠 EMBEDDINGS
# =========================

def get_embeddings():
    if USE_OPENAI:
        # 🔹 OpenAI варіант
        from dotenv import load_dotenv
        load_dotenv()

        from langchain_openai import OpenAIEmbeddings

        return OpenAIEmbeddings(
            model="text-embedding-3-small"
        )
    # else:
    #     # 🔹 локальний варіант (рекомендую)
    #     return HuggingFaceEmbeddings(
    #         model_name="all-MiniLM-L6-v2"
    #     )


# =========================
# 🚀 MAIN
# =========================

def main():
    print("🚀 Старт створення індексу...")

    docs = load_txt_files()
    print("📊 DOCS:", len(docs))

    if not docs:
        print("❌ Немає документів")
        return

    chunks = split_docs(docs)
    print("📊 CHUNKS:", len(chunks))

    if not chunks:
        print("❌ Немає chunks")
        return

    embeddings = get_embeddings()

    print("🧠 Генерація embeddings...")

    vectorstore = FAISS.from_documents(chunks, embeddings)

    print("💾 Збереження індексу...")

    vectorstore.save_local(INDEX_DIR)

    print("✅ Готово! Індекс створено:", INDEX_DIR)


# =========================

if __name__ == "__main__":
    main()