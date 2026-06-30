# CRUD operations
from sqlalchemy.orm import Session

from app import models
from app import schemas


def create_product(
    db: Session,
    product: schemas.ProductCreate
):

    db_product = models.Product(

        name=product.name,

        description=product.description,

        price=product.price,

        stock=product.stock,

        category=product.category,

        image_url=product.image_url

    )

    db.add(db_product)

    db.commit()

    db.refresh(db_product)

    return db_product


def get_products(db: Session):

    return db.query(models.Product).all()


def get_product_by_id(
    db: Session,
    product_id: int
):
    return (
        db.query(models.Product)
        .filter(models.Product.id == product_id)
        .first()
    )


def update_product(
    db: Session,
    product_id: int,
    product: schemas.ProductUpdate
):

    db_product = get_product_by_id(
        db,
        product_id
    )

    if db_product is None:
        return None

    db_product.name = product.name
    db_product.description = product.description
    db_product.price = product.price
    db_product.stock = product.stock
    db_product.category = product.category
    db_product.image_url = product.image_url

    db.commit()

    db.refresh(db_product)

    return db_product


def delete_product(
    db: Session,
    product_id: int
):

    product = get_product_by_id(
        db,
        product_id
    )

    if product is None:
        return False

    db.delete(product)

    db.commit()

    return True


def search_products(
    db: Session,
    name: str
):

    return (
        db.query(models.Product)
        .filter(
            models.Product.name.ilike(f"%{name}%")
        )
        .all()
    )