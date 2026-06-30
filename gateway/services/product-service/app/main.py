from fastapi import FastAPI
from app.routers.products import router as product_router
from app.database import Base
from app.database import engine

import app.models

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Product Service",
    version="1.0.0"
)

app.include_router(product_router)


@app.get("/")
def root():

    return {
        "message": "Product Service Running"
    }