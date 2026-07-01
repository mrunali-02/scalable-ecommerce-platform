from app import models


def create_order(
    db,
    user_id: int,
    total_amount: float
):

    order = models.Order(
        user_id=user_id,
        total_amount=total_amount,
        status="PENDING"
    )

    db.add(order)
    db.flush()

    return order


def create_order_item(
    db,
    order_id,
    product_id,
    quantity,
    price
):

    item = models.OrderItem(
        order_id=order_id,
        product_id=product_id,
        quantity=quantity,
        price=price
    )

    db.add(item)


def get_order_by_id(
    db,
    order_id: int
):

    return (

        db.query(models.Order)

        .filter(
            models.Order.id == order_id
        )

        .first()

    )


def update_order_status(

    db,

    order_id: int,

    status: str

):

    order = get_order_by_id(
        db,
        order_id
    )

    if order is None:

        return None

    order.status = status

    db.commit()

    db.refresh(order)

    return order

