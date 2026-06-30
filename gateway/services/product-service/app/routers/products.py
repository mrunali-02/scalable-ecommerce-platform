# Products endpoints
from fastapi import APIRouter
from fastapi import Depends
from fastapi import status

from sqlalchemy.orm import Session

from app.database import get_db

from app import crud
from app import schemas

router = APIRouter(

    prefix="/products",

    tags=["Products"]

)


@router.post(

    "",

    response_model=schemas.ProductResponse,

    status_code=status.HTTP_201_CREATED

)

def create_product(

    product: schemas.ProductCreate,

    db: Session = Depends(get_db)

):

    return crud.create_product(

        db,

        product

    )