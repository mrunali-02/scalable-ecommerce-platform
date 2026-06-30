from datetime import datetime

from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import DateTime

from app.database import Base


class CartItem(Base):

    __tablename__ = "cart_items"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        nullable=False
    )

    product_id = Column(
        Integer,
        nullable=False
    )

    quantity = Column(
        Integer,
        nullable=False,
        default=1
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
