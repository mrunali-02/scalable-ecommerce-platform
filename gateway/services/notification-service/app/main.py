from fastapi import FastAPI
from app.database import Base
from app.database import engine
import app.models

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Notification Service",
    version="1.0.0"
)

@app.get("/")
def root():
    return {
        "message": "Notification Service Running"
    }
