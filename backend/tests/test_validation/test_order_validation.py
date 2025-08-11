import pytest
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from unittest.mock import AsyncMock, MagicMock

from app.constants import OrderItemResponseMsg, OrderResponseMsg, OrderStatus
from app.models import Order
from app.validation import validate_order_exists, validate_order_items
from tests.constants import EXISTING_ORDER_ID, NOT_EXISTING_ORDER_ID


@pytest.mark.asyncio
async def test_validate_order_exists():
    mock_session = AsyncMock(spec=AsyncSession)

    # ! Test for error
    mock_result = MagicMock()
    mock_result.scalar.return_value = None
    mock_session.execute.return_value = mock_result

    with pytest.raises(HTTPException) as exc_info:
        await validate_order_exists(NOT_EXISTING_ORDER_ID, mock_session)

    assert exc_info.value.status_code == status.HTTP_404_NOT_FOUND
    assert OrderResponseMsg.order_not_found in exc_info.value.detail

    # * Test for success result
    mock_result.scalar.return_value = Order(
        id=EXISTING_ORDER_ID, status=OrderStatus.IN_TRANSIT
    )
    mock_session.execute.return_value = mock_result

    await validate_order_exists(EXISTING_ORDER_ID, mock_session)


def test_validate_order_items():
    with pytest.raises(HTTPException) as exc_info:
        validate_order_items([])

    assert exc_info.value.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    assert OrderItemResponseMsg.order_items_list_is_empty in exc_info.value.detail
