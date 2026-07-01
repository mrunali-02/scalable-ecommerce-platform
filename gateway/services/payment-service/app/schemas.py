from datetime import datetime

from pydantic import BaseModel


class PaymentRequest(BaseModel):

    order_id: int

    payment_method: str


class PaymentResponse(BaseModel):

    id: int

    order_id: int

    amount: float

    payment_method: str

    status: str

    transaction_id: str

    created_at: datetime

    class Config:

        from_attributes = True
