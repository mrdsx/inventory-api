import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    DB_URL: str = os.getenv("DB_URL")  # type: ignore
    TEST_DB_URL: str = os.getenv("TEST_DB_URL")  # type: ignore


settings = Settings()
