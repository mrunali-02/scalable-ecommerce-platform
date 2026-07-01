from datetime import datetime

from sqlalchemy import Column, Integer, Float, String, DateTime

from app.database import Base


class Payment(Base):

    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)

    order_id = Column(Integer, nullable=False)

    amount = Column(Float, nullable=False)

    payment_method = Column(String, nullable=False)

    status = Column(String, default="PENDING")

    transaction_id = Column(String, unique=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
