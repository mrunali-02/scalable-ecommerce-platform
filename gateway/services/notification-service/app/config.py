from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    USER_SERVICE_URL: str
    RABBITMQ_URL: str

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
