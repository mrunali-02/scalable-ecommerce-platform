from fastapi import FastAPI

from app.database import Base
from app.database import engine

import app.models

from app.routers.payments import (
    router as payment_router
)
from app.health import router as health_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Payment Service",
    version="1.0.0"
)

app.include_router(payment_router)
app.include_router(health_router)


@app.get("/")
def root():


    return {
        "message": "Payment Service Running"
    }
