from datetime import datetime
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime
from app.database import Base

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    user_id = Column(
        Integer,
        nullable=False
    )
    type = Column(
        String,
        nullable=False
    )
    subject = Column(
        String,
        nullable=False
    )
    message = Column(
        String,
        nullable=False
    )
    status = Column(
        String,
        default="PENDING"
    )
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
