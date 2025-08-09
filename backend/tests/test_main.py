import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.mark.asyncio
async def test_root():
    async with AsyncClient(transport=ASGITransport(app), base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json()["api"] == "Inventory API Backend"
    assert response.json()["status"] == "running"
    assert type(response.json()["timestamp"]) is str
