import httpx

from fastapi import HTTPException

from app.config import settings


def get_order(order_id: int):

    response = httpx.get(
        f"{settings.ORDER_SERVICE_URL}/orders/{order_id}"
    )

    if response.status_code == 404:

        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    if response.status_code != 200:

        raise HTTPException(
            status_code=500,
            detail="Unable to contact Order Service"
        )

    return response.json()


def update_order_status(

    order_id: int,

    status: str

):

    response = httpx.put(

        f"{settings.ORDER_SERVICE_URL}/orders/{order_id}/status",

        json={

            "status": status

        }

    )

    if response.status_code != 200:

        raise HTTPException(

            status_code=500,

            detail="Unable to update order"

        )

    return response.json()

