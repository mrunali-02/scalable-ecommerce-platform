from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ORDER_SERVICE_URL: str

    class Config:
        env_file = ".env"


settings = Settings()
