import httpx

from fastapi import HTTPException

from app.config import settings


def get_cart(user_id: int):

    url = f"{settings.CART_SERVICE_URL}/cart"

    try:
        response = httpx.get(

            url,

            params={
                "user_id": user_id
            },

            timeout=5.0

        )

    except httpx.RequestError:
        raise HTTPException(
            status_code=503,
            detail="Cart Service unavailable"
        )

    if response.status_code != 200:

        raise HTTPException(

            status_code=500,

            detail="Unable to retrieve cart"

        )

    return response.json()
