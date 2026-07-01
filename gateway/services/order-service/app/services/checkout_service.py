from app.clients.cart_client import get_cart
from app.clients.product_client import get_product

from app import crud


class CheckoutService:

    def __init__(self, db):
        self.db = db

    def checkout(self, user_id: int):

        cart_items = get_cart(user_id)

        if not cart_items:
            raise Exception("Cart is empty")

        total = 0

        order_items = []

        for item in cart_items:

            product = get_product(item["product_id"])

            subtotal = (
                product["price"] *
                item["quantity"]
            )

            total += subtotal

            order_items.append({
                "product_id": item["product_id"],
                "quantity": item["quantity"],
                "price": product["price"]
            })

        try:

            order = crud.create_order(

                self.db,

                user_id,

                total

            )

            for item in order_items:

                crud.create_order_item(

                    self.db,

                    order.id,

                    item["product_id"],

                    item["quantity"],

                    item["price"]

                )

            self.db.commit()

            self.db.refresh(order)

            return order

        except Exception:

            self.db.rollback()

            raise
