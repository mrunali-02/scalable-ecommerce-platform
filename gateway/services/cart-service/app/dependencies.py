import httpx

from fastapi import HTTPException

from app.config import settings


def verify_product(
    product_id: int
):

    response = httpx.get(

        f"{settings.PRODUCT_SERVICE_URL}/products/{product_id}"

    )

    if response.status_code != 200:

        raise HTTPException(

            status_code=404,

            detail="Product not found"

        )

    return response.json()
