from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    USER_SERVICE: str
    PRODUCT_SERVICE: str
    CART_SERVICE: str
    ORDER_SERVICE: str
    PAYMENT_SERVICE: str

    class Config:
        env_file = ".env"

settings = Settings()
