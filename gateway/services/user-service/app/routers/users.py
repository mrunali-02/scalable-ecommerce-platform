from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from fastapi import HTTPException
from fastapi import status

from app.security import verify_password
from app.security import create_access_token
from app.security import get_current_user
from app.database import get_db
from app import schemas
from app import crud
from app import models

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post(
    "/register",
    response_model=schemas.UserResponse,
    status_code=status.HTTP_201_CREATED
)

def register_user(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):
    return crud.create_user(db, user)


@router.get(
    "/profile",
    response_model=schemas.UserResponse
)
def profile(
    current_user: models.User = Depends(get_current_user)
):
    return current_user
