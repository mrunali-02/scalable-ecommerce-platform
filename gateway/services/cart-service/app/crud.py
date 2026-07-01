from fastapi import HTTPException
from sqlalchemy.orm import Session

from app import models
from app import schemas

from app.clients.product_client import get_product


def add_to_cart(
    db: Session,
    user_id: int,
    cart: schemas.CartCreate
):

    product = get_product(cart.product_id)

    if cart.quantity > product["stock"]:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock available"
        )

    existing_item = (
        db.query(models.CartItem)
        .filter(
            models.CartItem.user_id == user_id,
            models.CartItem.product_id == cart.product_id
        )
        .first()
    )

    if existing_item:

        new_quantity = existing_item.quantity + cart.quantity

        if new_quantity > product["stock"]:
            raise HTTPException(
                status_code=400,
                detail="Insufficient stock available"
            )

        existing_item.quantity = new_quantity

        db.commit()
        db.refresh(existing_item)

        return existing_item

    item = models.CartItem(
        user_id=user_id,
        product_id=cart.product_id,
        quantity=cart.quantity
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return item
