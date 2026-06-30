from fastapi import FastAPI

app = FastAPI(
    title="Product Service",
    version="1.0.0",
    description="Handles product catalog management."
)


@app.get("/")
def root():
    return {
        "message": "Product Service is running!"
    }
