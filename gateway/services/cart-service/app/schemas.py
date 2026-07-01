from pydantic import BaseModel
from pydantic import Field


class CartCreate(BaseModel):

    product_id: int

    quantity: int = Field(
        gt=0
    )


class CartResponse(BaseModel):

    id: int

    user_id: int

    product_id: int

    quantity: int

    class Config:

        from_attributes = True
