# Products endpoints
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import Query
from fastapi import Response
from fastapi import status

from sqlalchemy.orm import Session

from app.database import get_db

from app import crud
from app import schemas
from app.security import require_admin

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

    db: Session = Depends(get_db),

    current_user = Depends(require_admin)

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
    "/catalog",
    response_model=list[schemas.ProductResponse]
)
def product_catalog(
    search: str | None = None,
    category: str | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    sort: str = "id",
    order: str = "asc",
    page: int = 1,
    size: int = 10,
    db: Session = Depends(get_db)
):

    return crud.get_catalog(
        db,
        search,
        category,
        min_price,
        max_price,
        sort,
        order,
        page,
        size
    )


@router.get(
    "/search",
    response_model=list[schemas.ProductResponse]
)
def search_products(
    name: str = Query(...),
    db: Session = Depends(get_db)
):

    return crud.search_products(
        db,
        name
    )


@router.get(
    "/page",
    response_model=list[schemas.ProductResponse]
)
def paginated_products(
    page: int = 1,
    size: int = 10,
    db: Session = Depends(get_db)
):

    return crud.get_products_paginated(
        db,
        page,
        size
    )


@router.get(
    "/category/{category}",
    response_model=list[schemas.ProductResponse]
)
def get_products_by_category(
    category: str,
    db: Session = Depends(get_db)
):

    return crud.get_products_by_category(
        db,
        category
    )


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


@router.put(
    "/{product_id}",
    response_model=schemas.ProductResponse
)
def update_product(
    product_id: int,
    product: schemas.ProductUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):

    updated_product = crud.update_product(
        db,
        product_id,
        product
    )

    if updated_product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return updated_product


@router.delete(
    "/{product_id}",
    status_code=204
)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):

    deleted = crud.delete_product(
        db,
        product_id
    )

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return Response(status_code=204)