from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ORDER_SERVICE_URL: str
    NOTIFICATION_SERVICE_URL: str
    RABBITMQ_URL: str

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
