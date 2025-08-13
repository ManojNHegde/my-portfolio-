from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv

from langchain_groq import ChatGroq

# ---------- LOAD ENV ----------
print("🔹 Loading environment variables...")
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("Please set GROQ_API_KEY in environment variables")
print("✅ GROQ_API_KEY loaded")

# ---------- FASTAPI APP ----------
print("🔹 Initializing FastAPI app...")
app = FastAPI(title="RAG Chat API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://my-portfolio-xi-one-25.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print("✅ CORS middleware added")

# ---------- LLM SETUP ----------
print("🔹 Initializing LLM...")
llm = ChatGroq(
    groq_api_key=GROQ_API_KEY,
    model_name="llama-3.3-70b-versatile"
)
print("✅ LLM initialized")

# ---------- API MODELS ----------
class AskRequest(BaseModel):
    question: str

class AskResponse(BaseModel):
    answer: str

# ---------- HELPER FUNCTION ----------
def load_github_content():
    print("🔹 Fetching GitHub content...")
    url = "https://manojnhegde.github.io/data/site-content.json"
    try:
        resp = requests.get(url)
        resp.raise_for_status()
        print(f"✅ GitHub content fetched, status code: {resp.status_code}")

        data = resp.json()
        print(f"🔹 JSON keys: {list(data.keys())}")

        context_text = "\n".join(f"{key}: {value}" for key, value in data.items())
        print(f"✅ Context prepared, length: {len(context_text)} characters")
        return context_text
    except Exception as e:
        print(f"❌ Error fetching GitHub content: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to load content.json: {e}")

# ---------- ROUTES ----------
@app.get("/health")
def health():
    print("🔹 Health check requested")
    return {"status": "ok"}

@app.post("/ask", response_model=AskResponse)
def ask_question(payload: AskRequest):
    print("🔹 /ask endpoint called")
    question = payload.question.strip()
    print(f"🔹 Received question: {question}")

    if not question:
        print("❌ Question is empty")
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    context = load_github_content()

    prompt = f"""
You are Manoj, a friendly and helpful software engineer. Use the following context to answer the question as if you are chatting personally.

Context:
{context}

Question: {question}
"""
    print(f"🔹 Prompt prepared, length: {len(prompt)} characters")

    try:
        print("🔹 Sending prompt to LLM...")
        answer = llm.invoke(prompt)

        # Extract text from AIMessage
        if hasattr(answer, "content"):
            answer_text = answer.content
        else:
            answer_text = str(answer)

        print("✅ Received answer from LLM")
        print(f"🔹 Answer preview: {answer_text[:100]}...")
    except Exception as e:
        print(f"❌ LLM error: {e}")
        raise HTTPException(status_code=500, detail=f"LLM error: {e}")

    return AskResponse(answer=answer_text)

