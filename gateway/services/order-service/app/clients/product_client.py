import httpx

from fastapi import HTTPException

from app.config import settings


def get_product(product_id: int):

    url = f"{settings.PRODUCT_SERVICE_URL}/products/{product_id}"

    try:
        response = httpx.get(url, timeout=5.0)

    except httpx.RequestError:
        raise HTTPException(
            status_code=503,
            detail="Product Service unavailable"
        )

    if response.status_code == 404:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=500,
            detail="Unable to fetch product"
        )

    return response.json()
