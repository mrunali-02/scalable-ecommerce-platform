from sqlalchemy.orm import Session
from fastapi import HTTPException
from fastapi import status

from app import models
from app import schemas
from app.hashing import hash_password


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(
        models.User.email == email
    ).first()

def create_user(db: Session, user: schemas.UserCreate):

    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hashed = hash_password(user.password)

    db_user = models.User(
        full_name=user.full_name,
        email=user.email,
        hashed_password=hashed,
        phone=user.phone,
        role=user.role
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user
