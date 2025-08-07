import pytest
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from unittest.mock import AsyncMock, MagicMock

from order import find_order_by_id, Order, OrderStatus, ResponseMsg, save_order
from tests.constants import (
    EXISTING_ORDER_ID,
    MOCK_ORDER_ID,
    MOCK_ORDER_SUPPLIER_ID,
    NOT_EXISTING_ORDER_ID,
)


@pytest.mark.asyncio
async def test_find_order_by_id():
    mock_session = AsyncMock()

    # ! Test for error
    mock_result = MagicMock()
    mock_result.scalar.return_value = None
    mock_session.execute.return_value = mock_result

    with pytest.raises(HTTPException) as exc_info:
        await find_order_by_id(NOT_EXISTING_ORDER_ID, mock_session)

    assert exc_info.value.status_code == status.HTTP_404_NOT_FOUND
    assert ResponseMsg.order_not_found in exc_info.value.detail

    # * Test for success
    mock_result.scalar.return_value = Order(
        id=EXISTING_ORDER_ID, status=OrderStatus.IN_TRANSIT
    )

    found_order = await find_order_by_id(EXISTING_ORDER_ID, mock_session)
    assert found_order.id == EXISTING_ORDER_ID
    assert found_order.status in OrderStatus


@pytest.mark.asyncio
async def test_save_order():
    mock_session = AsyncMock(spec=AsyncSession)

    mock_session.commit = AsyncMock()
    mock_session.refresh = AsyncMock(
        side_effect=lambda x: setattr(x, "id", MOCK_ORDER_ID)  # type: ignore
    )

    result = await save_order(MOCK_ORDER_SUPPLIER_ID, mock_session)

    assert isinstance(result, Order)
    assert result.id == MOCK_ORDER_ID
    assert result.supplier_id == MOCK_ORDER_SUPPLIER_ID

    mock_session.commit.assert_awaited_once()
    mock_session.refresh.assert_awaited_once_with(result)
