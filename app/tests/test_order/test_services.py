import pytest
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from unittest.mock import AsyncMock

from tests.test_order.constants import (
    EXISTING_ORDER_ID,
    MOCK_ORDER_ID,
    MOCK_ORDER_SUPPLIER_ID,
    NOT_EXISTING_ORDER_ID,
)
from order.constants import OrderStatuses
from order.models import Order
from order.services import find_order_by_id, save_order


@pytest.mark.asyncio
async def test_find_order_by_id(session: AsyncSession):
    with pytest.raises(HTTPException) as exc_info:
        await find_order_by_id(NOT_EXISTING_ORDER_ID, session)

    assert exc_info.value.status_code == status.HTTP_404_NOT_FOUND
    assert "Order not found" in str(exc_info.value.detail)

    found_order = await find_order_by_id(EXISTING_ORDER_ID, session)
    assert found_order.id == EXISTING_ORDER_ID
    assert found_order.status in OrderStatuses


@pytest.mark.asyncio
async def test_save_order():
    mock_session = AsyncMock(spec=AsyncSession)

    mock_session.commit = AsyncMock()
    mock_session.refresh = AsyncMock(
        side_effect=lambda x: setattr(x, "id", MOCK_ORDER_ID)  # type: ignore
    )

    result = await save_order(supplier_id=MOCK_ORDER_SUPPLIER_ID, session=mock_session)

    assert isinstance(result, Order)
    assert result.id == MOCK_ORDER_ID
    assert result.supplier_id == MOCK_ORDER_SUPPLIER_ID

    mock_session.commit.assert_awaited_once()
    mock_session.refresh.assert_awaited_once_with(result)
