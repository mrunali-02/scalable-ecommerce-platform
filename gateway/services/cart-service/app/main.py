from fastapi import FastAPI

from app.database import Base
from app.database import engine
from app.routers.cart import router as cart_router
from app.health import router as health_router

import app.models

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Cart Service",
    version="1.0.0"
)

app.include_router(cart_router)
app.include_router(health_router)


@app.get("/")
def root():

    return {
        "message": "Cart Service Running"
    }

