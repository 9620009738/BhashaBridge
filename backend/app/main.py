
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="BhashaBridge API",
    description="Real-Time Multilingual Communication Platform",
    version="0.1.0",
)

# Allow the local React/Vite frontend to access this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "app": "BhashaBridge",
        "status": "running",
        "stage": "Stage 1",
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "service": "bhashabridge-api",
        "translation_engine": "not_configured",
    }
