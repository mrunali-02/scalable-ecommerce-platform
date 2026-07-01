from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas import (
    PaymentRequest,
    PaymentResponse
)

from app.services.payment_service import (
    PaymentService
)

router = APIRouter(

    prefix="/payments",

    tags=["Payments"]

)


@router.post(

    "/process",

    response_model=PaymentResponse

)

def process_payment(

    payment: PaymentRequest,

    db: Session = Depends(get_db)

):

    service = PaymentService(db)

    return service.process_payment(

        payment.order_id,

        payment.payment_method

    )
