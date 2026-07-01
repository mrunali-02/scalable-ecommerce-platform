from fastapi import APIRouter
from sqlalchemy import text
from app.database import SessionLocal

router = APIRouter(
    tags=["Health"]
)


@router.get("/health")
def health():
    database = "disconnected"
    db = None
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        database = "connected"
    except Exception:
        database = "disconnected"
    finally:
        if db:
            db.close()

    status = "healthy" if database == "connected" else "unhealthy"

    return {
        "status": status,
        "service": "user-service",
        "database": database
    }
