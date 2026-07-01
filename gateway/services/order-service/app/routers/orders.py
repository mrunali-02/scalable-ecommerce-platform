from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.security import get_current_user

from app.schemas import OrderResponse
from app import schemas, crud

from app.services.checkout_service import CheckoutService

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.post(
    "/checkout",
    response_model=OrderResponse
)
def checkout(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    service = CheckoutService(db)

    return service.checkout(
        current_user["user_id"]
    )


@router.get(

    "/{order_id}",

    response_model=OrderResponse

)

def get_order(

    order_id: int,

    db: Session = Depends(get_db)

):

    order = crud.get_order_by_id(
        db,
        order_id
    )

    if order is None:

        raise HTTPException(

            status_code=404,

            detail="Order not found"

        )

    return order


@router.put(

    "/{order_id}/status",

    response_model=OrderResponse

)

def update_status(

    order_id: int,

    update: schemas.OrderStatusUpdate,

    db: Session = Depends(get_db)

):

    order = crud.update_order_status(

        db,

        order_id,

        update.status

    )

    if order is None:

        raise HTTPException(

            status_code=404,

            detail="Order not found"

        )

    return order

