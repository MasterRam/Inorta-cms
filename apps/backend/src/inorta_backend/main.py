from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from inorta_backend.api.routes import router as api_router
from inorta_backend.core.config import settings
from inorta_backend.db.session import init_db

app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
    version="0.1.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api")


@app.get("/")
def root():
    return {
        "service": settings.app_name,
        "version": "0.1.0",
        "status": "running"
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    init_db()
    print(f"✓ Database initialized")
    print(f"✓ {settings.app_name} is running on {settings.env} mode")
