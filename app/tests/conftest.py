import pytest
import pytest_asyncio
from fastapi.testclient import TestClient

from database import Base, engine, SessionLocal
from main import app


@pytest.fixture
def client():
    return TestClient(app)


@pytest_asyncio.fixture
async def session():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    db = SessionLocal()
    try:
        yield db
    finally:
        await db.close()
