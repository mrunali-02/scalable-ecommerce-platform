from fastapi import APIRouter
from fastapi import Depends
from fastapi import status

from sqlalchemy.orm import Session

from app.database import get_db
from app.security import get_current_user
from app import crud
from app import schemas

router = APIRouter(
    prefix="/cart",
    tags=["Cart"]
)


@router.post(
    "",
    response_model=schemas.CartResponse,
    status_code=status.HTTP_201_CREATED
)
def add_to_cart(
    cart: schemas.CartCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return crud.add_to_cart(
        db,
        current_user["user_id"],
        cart
    )

