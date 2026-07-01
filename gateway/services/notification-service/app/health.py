from fastapi import APIRouter
from sqlalchemy import text
import pika

from app.database import SessionLocal
from app.config import settings

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
        connection = pika.BlockingConnection(
            pika.URLParameters(settings.RABBITMQ_URL)
        )
        connection.close()
        rabbitmq = "connected"
    except Exception:
        rabbitmq = "disconnected"

    status = "healthy" if (database == "connected" and rabbitmq == "connected") else "unhealthy"

    return {
        "status": status,
        "service": "notification-service",
        "database": database,
        "rabbitmq": rabbitmq
    }
