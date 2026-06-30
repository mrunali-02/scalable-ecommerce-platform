# Products endpoints
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
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


@router.get(
    "",
    response_model=list[schemas.ProductResponse]
)
def get_products(
    db: Session = Depends(get_db)
):

    return crud.get_products(db)


@router.get(
    "/{product_id}",
    response_model=schemas.ProductResponse
)
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = crud.get_product_by_id(
        db,
        product_id
    )

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product