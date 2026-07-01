from fastapi import FastAPI
from app.database import Base
from app.database import engine
import app.models
from app.routers.notifications import (
    router as notification_router
)
from app.health import router as health_router

import threading
from app.consumer import start_consumer

Base.metadata.create_all(bind=engine)

consumer_thread = threading.Thread(
    target=start_consumer,
    daemon=True
)
consumer_thread.start()

app = FastAPI(
    title="Notification Service",
    version="1.0.0"
)

app.include_router(
    notification_router
)
app.include_router(health_router)

@app.get("/")
def root():
    return {
        "message": "Notification Service Running"
    }
