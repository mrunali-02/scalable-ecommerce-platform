# Pydantic schemas
from pydantic import BaseModel
from pydantic import Field


class ProductCreate(BaseModel):

    name: str = Field(..., min_length=2)

    description: str

    price: float = Field(..., gt=0)

    stock: int = Field(..., ge=0)

    category: str

    image_url: str


class ProductResponse(BaseModel):

    id: int

    name: str

    description: str

    price: float

    stock: int

    category: str

    image_url: str

    class Config:

        from_attributes = True