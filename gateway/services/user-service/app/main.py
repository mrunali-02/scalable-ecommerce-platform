from fastapi import FastAPI

from app.database import Base
from app.database import engine

import app.models

from app.routers.users import router as user_router
from app.health import router as health_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="User Service",
    version="1.0.0"
)

app.include_router(user_router)
app.include_router(health_router)


@app.get("/")
def root():
    return {
        "message": "User Service is running!"
    }