from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    DATABASE_URL: str

    SECRET_KEY: str

    ALGORITHM: str

    PRODUCT_SERVICE_URL: str

    CART_SERVICE_URL: str

    class Config:

        env_file = ".env"


settings = Settings()
