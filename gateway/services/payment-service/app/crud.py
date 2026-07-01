from app import models


def create_payment(

    db,

    order_id,

    amount,

    payment_method,

    transaction_id

):

    payment = models.Payment(

        order_id=order_id,

        amount=amount,

        payment_method=payment_method,

        transaction_id=transaction_id,

        status="SUCCESS"

    )

    db.add(payment)

    db.commit()

    db.refresh(payment)

    return payment
