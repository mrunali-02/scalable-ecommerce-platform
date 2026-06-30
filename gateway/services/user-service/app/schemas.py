from dataclasses import Field
from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    phone: str
    role: str = "CUSTOMER"


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str
    role: str

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email: EmailStr
    from pydantic import Field

    password: str = Field(
    min_length=8,
    max_length=32
)   


class Token(BaseModel):
    access_token: str
    token_type: str