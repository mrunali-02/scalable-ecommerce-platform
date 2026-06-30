from fastapi import Depends
from fastapi import HTTPException
from fastapi.security import OAuth2PasswordBearer

from jose import jwt
from jose import JWTError

from app.config import settings

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/users/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme)
):

    credentials_exception = HTTPException(
        status_code=401,
        detail="Invalid token"
    )

    try:

        payload = jwt.decode(

            token,

            settings.SECRET_KEY,

            algorithms=[settings.ALGORITHM]

        )

        return payload

    except JWTError:

        raise credentials_exception


def require_admin(
    current_user = Depends(get_current_user)
):

    if current_user["role"] != "ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return current_user
