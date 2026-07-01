import uuid

from app.clients.order_client import (
    get_order,
    update_order_status
)

from app import crud


class PaymentService:

    def __init__(self, db):

        self.db = db

    def process_payment(

        self,

        order_id,

        payment_method

    ):

        order = get_order(order_id)

        if order["status"] == "PAID":

            raise Exception(
                "Order already paid"
            )

        transaction_id = str(
            uuid.uuid4()
        )

        payment = crud.create_payment(

            self.db,

            order_id,

            order["total_amount"],

            payment_method,

            transaction_id

        )

        update_order_status(

            order_id,

            "PAID"

        )

        return payment

