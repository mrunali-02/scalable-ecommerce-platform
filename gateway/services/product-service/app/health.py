from fastapi import APIRouter
from sqlalchemy import text
from app.database import SessionLocal
from app.cache import redis_client

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

    try:
        redis_client.ping()
        redis_status = "connected"
    except Exception:
        redis_status = "disconnected"

    status = "healthy" if (database == "connected" and redis_status == "connected") else "unhealthy"

    return {
        "status": status,
        "service": "product-service",
        "database": database,
        "redis": redis_status
    }
