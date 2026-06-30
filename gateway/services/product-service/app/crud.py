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